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

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── 16개 파크 목록 (검색 키워드 포함) ────────────────────────
const PARK_LIST = [
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

// 파크 이름 목록 (뉴스 필터링용)
const PARK_NAMES = PARK_LIST.map(p => p.name);
const PARK_KEYWORDS = PARK_LIST.map(p => p.keyword.split(' ')[0]); // 첫 키워드만

// ── 파크 목록 API ─────────────────────────────────────────────
app.get('/api/parks', (req, res) => {
  res.json(PARK_LIST);
});

// ── 네이버 뉴스 단일 검색 함수 ────────────────────────────────
async function searchNaverNews(keyword, display = 5) {
  const res = await axios.get('https://openapi.naver.com/v1/search/news.json', {
    params: { query: keyword, display, sort: 'date' },
    headers: {
      'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
    }
  });
  return res.data.items || [];
}

// 네이버 날짜 포맷 변환
function formatDate(pubDate) {
  const d = new Date(pubDate);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}

// 태그 자동 분류
function guessTag(text) {
  if (/개장|오픈|재개|폐장/.test(text)) return '개장';
  if (/할인|특가|쿠폰|프로모션/.test(text)) return '가격';
  if (/입장료|요금|가격|인상|인하/.test(text)) return '가격';
  if (/이벤트|행사|축제|공연|페스티벌/.test(text)) return '이벤트';
  if (/신규|새로|리뉴얼|신설|증설/.test(text)) return '신규시설';
  if (/워터파크|물놀이|슬라이드|파도풀/.test(text)) return '워터파크';
  if (/스파|온천|사우나|찜질|온욕/.test(text)) return '스파';
  return '뉴스';
}

// 어떤 파크 뉴스인지 찾기
function detectParkName(text) {
  for (const park of PARK_LIST) {
    const keywords = park.keyword.split(' ');
    for (const kw of keywords) {
      if (text.includes(kw)) return park.name;
    }
  }
  return null;
}

// 이 뉴스가 16개 파크 중 하나와 관련있는지 확인
function isRelevantNews(title, description) {
  const text = title + ' ' + description;
  for (const park of PARK_LIST) {
    const keywords = park.keyword.split(' ');
    for (const kw of keywords) {
      if (text.includes(kw)) return true;
    }
  }
  return false;
}

// ── 뉴스 API ─────────────────────────────────────────────────
app.get('/api/news', async (req, res) => {
  const parkKey = req.query.park || 'all';
  const cacheKey = `news_${parkKey}`;

  const cached = newsCache.get(cacheKey);
  if (cached) return res.json({ ...cached, cached: true });

  // 네이버 API 없으면 Claude로 대체
  if (!process.env.NAVER_CLIENT_ID || !process.env.NAVER_CLIENT_SECRET) {
    return res.json({
      articles: getFallbackNews(),
      fetchedAt: new Date().toISOString(),
      source: 'fallback',
      fallback: true
    });
  }

  try {
    let articles = [];

    if (parkKey === 'all') {
      // 전체: 16개 파크를 각각 검색 → 합치기 → 날짜순 정렬
      // 한 번에 너무 많은 요청 방지: 파크당 3개씩, 병렬 처리
      const results = await Promise.allSettled(
        PARK_LIST.map(park => searchNaverNews(park.keyword, 3))
      );

      const seen = new Set(); // 중복 제거용

      for (let i = 0; i < results.length; i++) {
        if (results[i].status !== 'fulfilled') continue;
        const items = results[i].value;
        const park = PARK_LIST[i];

        for (const item of items) {
          const title = item.title.replace(/<[^>]*>/g, '');
          const desc = item.description.replace(/<[^>]*>/g, '');
          const url = item.originallink || item.link;

          // 중복 제거 (제목 기준)
          if (seen.has(title)) continue;
          seen.add(title);

          // 관련 없는 뉴스 필터링
          if (!isRelevantNews(title, desc)) continue;

          articles.push({
            title,
            summary: desc,
            source: item.originallink
              ? new URL(item.originallink).hostname.replace('www.', '')
              : '네이버뉴스',
            date: formatDate(item.pubDate),
            pubDate: new Date(item.pubDate).getTime(), // 정렬용
            url,
            tag: guessTag(title + desc),
            parkName: park.name
          });
        }
      }

      // 날짜 최신순 정렬
      articles.sort((a, b) => b.pubDate - a.pubDate);

      // pubDate 필드 제거 (클라이언트에 불필요)
      articles = articles.map(({ pubDate, ...rest }) => rest);

      // 최대 30개
      articles = articles.slice(0, 30);

    } else {
      // 특정 파크: 해당 파크만 검색
      const park = PARK_LIST.find(p => p.key === parkKey);
      if (!park) return res.status(404).json({ error: '파크를 찾을 수 없습니다' });

      const items = await searchNaverNews(park.keyword, 10);

      articles = items
        .filter(item => {
          const text = item.title + item.description;
          return isRelevantNews(text, '');
        })
        .map(item => {
          const title = item.title.replace(/<[^>]*>/g, '');
          const desc = item.description.replace(/<[^>]*>/g, '');
          return {
            title,
            summary: desc,
            source: item.originallink
              ? new URL(item.originallink).hostname.replace('www.', '')
              : '네이버뉴스',
            date: formatDate(item.pubDate),
            url: item.originallink || item.link,
            tag: guessTag(title + desc),
            parkName: park.name
          };
        });
    }

    const result = {
      articles,
      fetchedAt: new Date().toISOString(),
      source: 'naver',
      total: articles.length
    };

    newsCache.set(cacheKey, result);
    return res.json(result);

  } catch (err) {
    console.error('네이버 뉴스 오류:', err.message);
    return res.json({
      articles: getFallbackNews(),
      fetchedAt: new Date().toISOString(),
      source: 'fallback',
      fallback: true,
      error: err.message
    });
  }
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
    id: key, name: p.name, currentSeason: p.currentSeason, updatedAt: p.updatedAt,
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

// ── Fallback 뉴스 ─────────────────────────────────────────────
function getFallbackNews() {
  return PARK_LIST.slice(0, 5).map(park => ({
    title: `${park.name} 관련 최신 뉴스`,
    summary: 'NAVER_CLIENT_ID / NAVER_CLIENT_SECRET을 Railway Variables에 설정하면 실시간 뉴스가 표시됩니다.',
    source: '안내',
    date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
    url: `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(park.keyword)}`,
    tag: '안내',
    parkName: park.name
  }));
}

app.listen(PORT, () => {
  console.log(`✅ 테마파크 인사이트 서버 실행 중 - 포트 ${PORT}`);
  console.log(`📰 뉴스: http://localhost:${PORT}/api/news`);
  console.log(`💰 가격: http://localhost:${PORT}/api/prices`);
});
