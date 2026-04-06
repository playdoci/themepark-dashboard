// ============================================================
// server.js - 테마파크 인사이트 대시보드 백엔드 서버
// ============================================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const axios = require('axios');
const path = require('path');
const { PARK_PRICES } = require('./prices');

const app = express();
const PORT = process.env.PORT || 3000;

// 캐시 설정
const newsCache = new NodeCache({ stdTTL: parseInt(process.env.NEWS_CACHE_TTL) || 1800 });
const priceCache = new NodeCache({ stdTTL: parseInt(process.env.PRICE_CACHE_TTL) || 3600 });

// 미들웨어
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());

// 정적 파일 서빙 (프론트엔드)
app.use(express.static(path.join(__dirname, 'public')));

// ─────────────────────────────────────────────────────────────
// 뉴스 API: Claude AI 웹검색으로 실시간 뉴스 수집
// ─────────────────────────────────────────────────────────────
app.get('/api/news', async (req, res) => {
  const category = req.query.category || '전체';
  const cacheKey = `news_${category}`;

  // 캐시 확인
  const cached = newsCache.get(cacheKey);
  if (cached) {
    return res.json({ ...cached, cached: true });
  }

  try {
    const today = new Date();
    const dateStr = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일`;

    // 카테고리별 검색 쿼리
    const queryMap = {
      '전체': '테마파크 워터파크 스파 뉴스',
      '워터파크': '워터파크 개장 이벤트',
      '스파/온천': '스파 온천 입장료 이벤트',
      '이벤트': '테마파크 이벤트 행사 2026',
      '가격/할인': '테마파크 입장료 할인 특가',
      '신규시설': '테마파크 신규 시설 오픈',
      '개장/폐장': '워터파크 개장 2026'
    };
    const searchQuery = queryMap[category] || queryMap['전체'];

    // Claude API 호출 (web_search 포함)
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{
          role: 'user',
          content: `오늘(${dateStr}) 기준으로 한국 테마파크/워터파크/스파 관련 "${searchQuery}" 최신 뉴스를 웹에서 검색해서 JSON으로 반환해줘.

반드시 JSON만 반환하고 다른 텍스트는 넣지 마.
형식:
{
  "articles": [
    {
      "title": "기사 제목",
      "summary": "1~2줄 요약",
      "source": "출처 (예: 연합뉴스)",
      "date": "날짜 (예: 2026.04.03)",
      "url": "기사 URL (실제 URL)",
      "tag": "태그 (워터파크/이벤트/가격/신규시설/개장/스파 중 하나)",
      "parkName": "관련 파크명 (예: 에버랜드, 없으면 null)"
    }
  ]
}
최대 8개까지 수집해줘. URL은 반드시 실제 기사 링크로 넣어줘.`
        }]
      },
      {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-beta': 'web-search-2025-03-05'
        }
      }
    );

    // 응답에서 텍스트 추출
    const content = response.data.content;
    let jsonText = '';
    for (const block of content) {
      if (block.type === 'text') {
        jsonText += block.text;
      }
    }

    // JSON 파싱
    const clean = jsonText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    const result = {
      articles: parsed.articles || [],
      fetchedAt: new Date().toISOString(),
      category
    };

    newsCache.set(cacheKey, result);
    res.json(result);

  } catch (err) {
    console.error('뉴스 API 오류:', err.message);
    // 오류 시 fallback 뉴스 반환
    res.json({
      articles: getFallbackNews(),
      fetchedAt: new Date().toISOString(),
      category,
      fallback: true,
      error: '실시간 뉴스 로딩 실패 — 캐시된 데이터를 표시합니다'
    });
  }
});

// ─────────────────────────────────────────────────────────────
// 가격 API: prices.js 데이터 제공
// ─────────────────────────────────────────────────────────────
app.get('/api/prices', (req, res) => {
  const parkId = req.query.park;

  if (parkId) {
    const park = PARK_PRICES[parkId];
    if (!park) return res.status(404).json({ error: '파크를 찾을 수 없습니다' });
    return res.json(park);
  }

  // 전체 파크 목록 (상세 가격 제외한 요약)
  const summary = Object.entries(PARK_PRICES).map(([key, p]) => ({
    id: key,
    name: p.name,
    currentSeason: p.currentSeason,
    updatedAt: p.updatedAt,
    lowestPrice: Math.min(...p.tickets.map(t => t.prices.adult).filter(Boolean))
  }));

  res.json({ parks: summary, updatedAt: new Date().toISOString() });
});

// ─────────────────────────────────────────────────────────────
// 채널 정보 API
// ─────────────────────────────────────────────────────────────
app.get('/api/channels', (req, res) => {
  const CHANNELS = [
    { key: 'home',     name: '공식 홈페이지', logo: '홈',  type: '공식가 / 문화비 소득공제' },
    { key: 'nori',     name: '놀이의발견',    logo: '놀발', type: '전문 레저 앱' },
    { key: 'naver',    name: '네이버',        logo: 'N',   type: '포인트 적립' },
    { key: 'coupang',  name: '쿠팡',          logo: 'C',   type: '로켓배송/로켓직구' },
    { key: 'kakao',    name: '카카오',        logo: 'K',   type: '모바일 바로사용' },
    { key: 'yanolja',  name: '야놀자',        logo: '야',   type: '숙박 연계 할인' },
    { key: 'yeogi',    name: '여기어때',      logo: '여',   type: '숙박 연계 할인' },
    { key: 'gmarket',  name: '지마켓',        logo: 'G',   type: '스마일페이 혜택' },
    { key: '11st',     name: '11번가',        logo: '11',  type: 'SK페이 혜택' },
    { key: 'auction',  name: '옥션',          logo: 'A',   type: 'G마켓 통합' },
    { key: 'kidsnote', name: '키즈노트',      logo: '키',   type: '영유아 가족 전용' },
    { key: 'mrt',      name: '마이리얼트립',  logo: 'M',   type: '외국인 패키지 포함' }
  ];
  res.json(CHANNELS);
});

// ─────────────────────────────────────────────────────────────
// 헬스체크
// ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// SPA 라우팅
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// ─────────────────────────────────────────────────────────────
// Fallback 뉴스 (API 오류 시)
// ─────────────────────────────────────────────────────────────
function getFallbackNews() {
  return [
    {
      title: '웅진플레이도시, 2026 봄 시즌 로우시즌 가격 확정 — 종일권 60,000원',
      summary: '2026년 3월 20일부터 5월 31일까지 로우 시즌 운영, 종일권 60,000원 / 반일권 50,000원 (대인·소인 동일)',
      source: '웅진플레이도시 공식',
      date: '2026.03.20',
      url: 'https://playdoci.com/Common/Pop_FeeInfo.aspx',
      tag: '가격',
      parkName: '웅진플레이도시'
    },
    {
      title: '에버랜드, 개원 50주년 기념 특별 이벤트 봄 시즌 진행',
      summary: '2026년 에버랜드 개원 50주년을 맞아 봄 특별 이벤트 및 신규 시설 오픈 예정, 4~5월 극성수기로 사전 예매 필수',
      source: '에버랜드 공식',
      date: '2026.04.01',
      url: 'https://www.everland.com/everland/event',
      tag: '이벤트',
      parkName: '에버랜드'
    },
    {
      title: '스플라스리솜, 7월 대규모 리뉴얼 오픈 예정 — 얼리버드 시즌권 40% 할인',
      summary: '충북 제천 스플라스리솜 7월 리뉴얼 오픈 확정, 얼리버드 시즌권 현재 40% 할인 판매 중',
      source: '리조트뉴스',
      date: '2026.04.02',
      url: 'https://www.resort.co.kr/splashresort',
      tag: '가격',
      parkName: '스플라스리솜'
    }
  ];
}

app.listen(PORT, () => {
  console.log(`\n✅ 테마파크 인사이트 서버 실행 중`);
  console.log(`📍 로컬 접속: http://localhost:${PORT}`);
  console.log(`📰 뉴스 API: http://localhost:${PORT}/api/news`);
  console.log(`💰 가격 API: http://localhost:${PORT}/api/prices`);
  console.log(`\n⚙️  .env 파일에 ANTHROPIC_API_KEY를 설정해야 실시간 뉴스가 작동합니다.\n`);
});
