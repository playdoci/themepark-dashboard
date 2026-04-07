// ============================================================
// server.js - 테마파크 인사이트 대시보드 백엔드 서버
// 네이버 뉴스 API + Claude AI 웹검색 연동
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

const newsCache = new NodeCache({ stdTTL: parseInt(process.env.NEWS_CACHE_TTL) || 1800 });
const priceCache = new NodeCache({ stdTTL: parseInt(process.env.PRICE_CACHE_TTL) || 3600 });

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── 파크 목록 (뉴스 검색용 키워드 포함) ──────────────────────
const PARK_LIST = [
  { key: 'all',          name: '전체',            keyword: '테마파크 워터파크 스파' },
  { key: 'woojin',       name: '웅진플레이도시',   keyword: '웅진플레이도시' },
  { key: 'caribbean',    name: '캐리비안베이',      keyword: '캐리비안베이' },
  { key: 'oceanworld',   name: '오션월드',          keyword: '비발디파크 오션월드' },
  { key: 'onmount',      name: '원마운트',          keyword: '원마운트 워터파크' },
  { key: 'termeden',     name: '테르메덴',          keyword: '테르메덴' },
  { key: 'islandcastle', name: '아일랜드캐슬',      keyword: '아일랜드캐슬 가평' },
  { key: 'aquafield',    name: '아쿠아필드 하남',   keyword: '아쿠아필드 하남' },
  { key: 'asanspa',      name: '아산스파비스',      keyword: '아산스파비스' },
  { key: 'splash',       name: '스플라스리솜',      keyword: '스플라스 리솜' },
  { key: 'ocean_ca',     name: '오션어드벤처 천안', keyword: '오션어드벤처 천안' },
  { key: 'paradise',     name: '파라다이스 도고',   keyword: '파라다이스 도고' },
  { key: 'everland',     name: '에버랜드',          keyword: '에버랜드' },
  { key: 'lotte',        name: '롯데월드',          keyword: '롯데월드' },
  { key: 'lego',         name: '레고랜드',          keyword: '레고랜드 코리아' },
  { key: 'seoul',        name: '서울랜드',          keyword: '서울랜드' },
  { key: 'gyeongju',     name: '경주월드',          keyword: '경주월드' },
];

// ── 파크 목록 API ─────────────────────────────────────────────
app.get('/api/parks', (req, res) => {
  res.json(PARK_LIST);
});

// ── 뉴스 API (네이버 우선 → Claude AI 대체) ──────────────────
app.get('/api/news', async (req, res) => {
  const parkKey = req.query.park || 'all';
  const cacheKey = `news_${parkKey}`;

  const cached = newsCache.get(cacheKey);
  if (cached) return res.json({ ...cached, cached: true });

  const park = PARK_LIST.find(p => p.key === parkKey) || PARK_LIST[0];
  const keyword = park.keyword;

  // 네이버 API 키가 있으면 네이버 뉴스 사용
  if (process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET) {
    try {
      const naverRes = await axios.get('https://openapi.naver.com/v1/search/news.json', {
        params: { query: keyword, display: 10, sort: 'date' },
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
        }
      });

      const articles = naverRes.data.items.map(item => ({
        title: item.title.replace(/<[^>]*>/g, ''),
        summary: item.description.replace(/<[^>]*>/g, ''),
        source: item.originallink
          ? new URL(item.originallink).hostname.replace('www.', '')
          : '네이버뉴스',
        date: formatNaverDate(item.pubDate),
        url: item.originallink || item.link,
        tag: guessTag(item.title + item.description),
        parkName: parkKey === 'all'
          ? guessParkName(item.title + item.description)
          : park.name
      }));

      const result = {
        articles,
        fetchedAt: new Date().toISOString(),
        park: park.name,
        source: 'naver'
      };
      newsCache.set(cacheKey, result);
      return res.json(result);

    } catch (err) {
      console.error('네이버 뉴스 API 오류:', err.message);
    }
  }

  // Claude AI 웹검색으로 대체
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const today = new Date();
      const dateStr = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일`;

      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          tools: [{ type: 'web_search_20250305', name: 'web_search' }],
          messages: [{
            role: 'user',
            content: `오늘(${dateStr}) 기준으로 "${keyword}" 관련 최신 뉴스를 검색해서 JSON으로만 반환해줘. 다른 텍스트 없이 JSON만.
{
  "articles": [
    {
      "title": "기사 제목",
      "summary": "1~2줄 요약",
      "source": "출처",
      "date": "2026.04.06",
      "url": "실제 기사 URL",
      "tag": "이벤트/가격/개장/신규시설/워터파크/스파 중 하나",
      "parkName": "${park.name}"
    }
  ]
}
최대 8개, URL은 실제 링크로.`
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

      const content = response.data.content;
      let jsonText = '';
      for (const block of content) {
        if (block.type === 'text') jsonText += block.text;
      }
      const clean = jsonText.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      const result = {
        articles: parsed.articles || [],
        fetchedAt: new Date().toISOString(),
        park: park.name,
        source: 'claude'
      };
      newsCache.set(cacheKey, result);
      return res.json(result);

    } catch (err) {
      console.error('Claude 뉴스 오류:', err.message);
    }
  }

  // 둘 다 실패 시 fallback
  res.json({
    articles: getFallbackNews(park.name),
    fetchedAt: new Date().toISOString(),
    park: park.name,
    source: 'fallback',
    fallback: true
  });
});

// ── 가격 API ─────────────────────────────────────────────────
app.get('/api/prices', (req, res) => {
  const parkId = req.query.park;
  if (parkId) {
    const park = PARK_PRICES[parkId];
    if (!park) return res.status(404).json({ error: '파크를 찾을 수 없습니다' });
    return res.json(park);
  }
  const summary = Object.entries(PARK_PRICES).map(([key, p]) => ({
    id: key,
    name: p.name,
    currentSeason: p.currentSeason,
    updatedAt: p.updatedAt,
    lowestPrice: Math.min(...p.tickets.map(t => t.prices.adult).filter(Boolean))
  }));
  res.json({ parks: summary, updatedAt: new Date().toISOString() });
});

// ── 채널 API ─────────────────────────────────────────────────
app.get('/api/channels', (req, res) => {
  res.json([
    { key: 'home',     name: '공식 홈페이지', logo: '홈',  type: '공식가/문화비소득공제' },
    { key: 'nori',     name: '놀이의발견',    logo: '놀발', type: '전문 레저 앱' },
    { key: 'naver',    name: '네이버',        logo: 'N',   type: '포인트 적립' },
    { key: 'coupang',  name: '쿠팡',          logo: 'C',   type: '로켓배송' },
    { key: 'kakao',    name: '카카오',        logo: 'K',   type: '모바일 바로사용' },
    { key: 'yanolja',  name: '야놀자',        logo: '야',   type: '숙박 연계' },
    { key: 'yeogi',    name: '여기어때',      logo: '여',   type: '숙박 연계' },
    { key: 'gmarket',  name: '지마켓',        logo: 'G',   type: '스마일페이' },
    { key: '11st',     name: '11번가',        logo: '11',  type: 'SK페이' },
    { key: 'auction',  name: '옥션',          logo: 'A',   type: 'G마켓 통합' },
    { key: 'kidsnote', name: '키즈노트',      logo: '키',   type: '영유아 전용' },
    { key: 'mrt',      name: '마이리얼트립',  logo: 'M',   type: '외국인 패키지' }
  ]);
});

// ── 헬스체크 ─────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// ── 유틸 함수 ─────────────────────────────────────────────────
function formatNaverDate(pubDate) {
  const d = new Date(pubDate);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}

function guessTag(text) {
  if (/개장|오픈|재개|폐장/.test(text)) return '개장';
  if (/할인|특가|이벤트|프로모션|쿠폰/.test(text)) return '이벤트';
  if (/입장료|가격|요금|인상|인하/.test(text)) return '가격';
  if (/신규|새로|리뉴얼|신설/.test(text)) return '신규시설';
  if (/워터파크|물놀이|슬라이드|파도풀/.test(text)) return '워터파크';
  if (/스파|온천|사우나|찜질/.test(text)) return '스파';
  return '뉴스';
}

function guessParkName(text) {
  const parks = [
    '웅진플레이도시','캐리비안베이','오션월드','원마운트','테르메덴',
    '아일랜드캐슬','아쿠아필드','아산스파비스','스플라스','오션어드벤처',
    '파라다이스도고','에버랜드','롯데월드','레고랜드','서울랜드','경주월드'
  ];
  for (const p of parks) {
    if (text.includes(p)) return p;
  }
  return null;
}

function getFallbackNews(parkName) {
  return [{
    title: `${parkName} 뉴스를 불러오려면 API 키 설정이 필요합니다`,
    summary: 'Railway Variables에 NAVER_CLIENT_ID / NAVER_CLIENT_SECRET 또는 ANTHROPIC_API_KEY를 설정해주세요.',
    source: '안내',
    date: formatNaverDate(new Date()),
    url: `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(parkName)}`,
    tag: '안내',
    parkName
  }];
}

app.listen(PORT, () => {
  console.log(`✅ 테마파크 인사이트 서버 실행 중`);
  console.log(`📍 로컬 접속: http://localhost:${PORT}`);
  console.log(`📰 뉴스 API: http://localhost:${PORT}/api/news`);
  console.log(`💰 가격 API: http://localhost:${PORT}/api/prices`);
  console.log(`⚙️  NAVER 또는 ANTHROPIC API 키 설정 필요`);
});
