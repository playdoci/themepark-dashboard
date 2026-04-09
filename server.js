require('dotenv').config();
const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const newsCache  = new NodeCache({ stdTTL: 1800 });
const priceCache = new NodeCache({ stdTTL: 3600 });

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── prices.js 동적 로드 (수정 후 재로드 가능하도록) ──────────
function loadPrices() {
  delete require.cache[require.resolve('./prices')];
  return require('./prices').PARK_PRICES;
}

// ── 파크 목록 ─────────────────────────────────────────────────
const PARK_LIST = [
  { key:'woojin',       name:'웅진플레이도시',   keyword:'웅진플레이도시' },
  { key:'caribbean',    name:'캐리비안베이',      keyword:'캐리비안베이' },
  { key:'oceanworld',   name:'오션월드',          keyword:'비발디파크 오션월드' },
  { key:'onmount',      name:'원마운트',          keyword:'원마운트 워터파크' },
  { key:'termeden',     name:'테르메덴',          keyword:'테르메덴' },
  { key:'islandcastle', name:'아일랜드캐슬',      keyword:'아일랜드캐슬 가평' },
  { key:'aquafield',    name:'아쿠아필드 하남',   keyword:'아쿠아필드 하남' },
  { key:'asanspa',      name:'아산스파비스',      keyword:'아산스파비스' },
  { key:'splash',       name:'스플라스리솜',      keyword:'스플라스 리솜' },
  { key:'ocean_ca',     name:'오션어드벤처 천안', keyword:'오션어드벤처 천안' },
  { key:'paradise',     name:'파라다이스 도고',   keyword:'파라다이스 도고' },
  { key:'everland',     name:'에버랜드',          keyword:'에버랜드' },
  { key:'lotte',        name:'롯데월드',          keyword:'롯데월드' },
  { key:'lego',         name:'레고랜드',          keyword:'레고랜드 코리아' },
  { key:'seoul',        name:'서울랜드',          keyword:'서울랜드' },
  { key:'gyeongju',     name:'경주월드',          keyword:'경주월드' },
];

const CHANNELS = [
  { key:'home',     name:'공식 홈페이지', cls:'l-home',    s:'홈',  type:'공식가/문화비소득공제' },
  { key:'nori',     name:'놀이의발견',    cls:'l-nori',    s:'놀발', type:'전문 레저 앱' },
  { key:'naver',    name:'네이버',        cls:'l-naver',   s:'N',   type:'포인트 적립' },
  { key:'coupang',  name:'쿠팡',          cls:'l-coupang', s:'C',   type:'로켓배송' },
  { key:'kakao',    name:'카카오',        cls:'l-kakao',   s:'K',   type:'모바일 바로사용' },
  { key:'yanolja',  name:'야놀자',        cls:'l-yanolja', s:'야',   type:'숙박 연계' },
  { key:'yeogi',    name:'여기어때',      cls:'l-yeogi',   s:'여',   type:'숙박 연계' },
  { key:'gmarket',  name:'지마켓',        cls:'l-gmarket', s:'G',   type:'스마일페이' },
  { key:'11st',     name:'11번가',        cls:'l-11st',    s:'11',  type:'SK페이' },
  { key:'auction',  name:'옥션',          cls:'l-auction', s:'A',   type:'G마켓 통합' },
  { key:'kidsnote', name:'키즈노트',      cls:'l-kidsnote',s:'키',   type:'영유아 전용' },
  { key:'mrt',      name:'마이리얼트립',  cls:'l-mrt',     s:'M',   type:'외국인 패키지' },
];

app.get('/api/parks', (req, res) => res.json(PARK_LIST));
app.get('/api/channels', (req, res) => res.json(CHANNELS));

// ── 가격 API ─────────────────────────────────────────────────
app.get('/api/prices', (req, res) => {
  const PARK_PRICES = loadPrices();
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

// ── 관리자 로그인 API ─────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PASSWORD) return res.status(500).json({ error: 'ADMIN_PASSWORD 환경변수가 설정되지 않았습니다' });
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: '비밀번호가 틀렸습니다' });
  res.json({ success: true, token: Buffer.from(`admin:${ADMIN_PASSWORD}`).toString('base64') });
});

// ── 관리자 인증 미들웨어 ──────────────────────────────────────
function adminAuth(req, res, next) {
  const auth = req.headers['x-admin-token'];
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const expected = Buffer.from(`admin:${ADMIN_PASSWORD}`).toString('base64');
  if (!auth || auth !== expected) return res.status(401).json({ error: '인증이 필요합니다' });
  next();
}

// ── 가격 수정 API (GitHub prices.js 자동 업데이트) ───────────
app.post('/api/admin/update-price', adminAuth, async (req, res) => {
  const { parkKey, updatedData } = req.body;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO  = process.env.GITHUB_REPO;

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return res.status(500).json({ error: 'GITHUB_TOKEN 또는 GITHUB_REPO 환경변수가 없습니다' });
  }
  if (!parkKey || !updatedData) {
    return res.status(400).json({ error: 'parkKey와 updatedData가 필요합니다' });
  }

  try {
    // 1. 현재 prices.js 가져오기
    const fileRes = await axios.get(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/prices.js`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } }
    );
    const sha = fileRes.data.sha;

    // 2. 현재 전체 데이터 로드 후 해당 파크만 교체
    const PARK_PRICES = loadPrices();
    PARK_PRICES[parkKey] = updatedData;

    // 3. 새 prices.js 생성
    const newContent = generatePricesJs(PARK_PRICES);

    // 4. GitHub 업데이트
    await axios.put(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/prices.js`,
      {
        message: `가격 업데이트: ${updatedData.name} - ${new Date().toLocaleString('ko-KR')}`,
        content: Buffer.from(newContent).toString('base64'),
        sha
      },
      { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } }
    );

    priceCache.flushAll();
    res.json({ success: true, message: 'GitHub 업데이트 완료! 2~3분 후 앱에 반영됩니다.' });

  } catch (err) {
    console.error('GitHub 업데이트 오류:', err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data?.message || err.message });
  }
});

// ── prices.js 파일 내용 생성 함수 ────────────────────────────
function generatePricesJs(PARK_PRICES) {
  const today = new Date().toLocaleDateString('ko-KR', {year:'numeric',month:'long',day:'numeric'});
  let js = `// ============================================================\n`;
  js += `// prices.js - 파크별 공식 홈페이지 확인 가격 데이터\n`;
  js += `// 마지막 업데이트: ${today}\n`;
  js += `// ============================================================\n\n`;
  js += `const PARK_PRICES = `;
  js += JSON.stringify(PARK_PRICES, null, 2);
  js += `;\n\nmodule.exports = { PARK_PRICES };\n`;
  return js;
}

// ── 뉴스 API ─────────────────────────────────────────────────
app.get('/api/news', async (req, res) => {
  const parkKey = req.query.park || 'all';
  const cacheKey = `news_${parkKey}`;
  const cached = newsCache.get(cacheKey);
  if (cached) return res.json({ ...cached, cached: true });

  if (!process.env.NAVER_CLIENT_ID || !process.env.NAVER_CLIENT_SECRET) {
    return res.json({ articles: getFallbackNews(), source: 'fallback' });
  }

  try {
    let articles = [];
    if (parkKey === 'all') {
      const results = await Promise.allSettled(
        PARK_LIST.map(park =>
          axios.get('https://openapi.naver.com/v1/search/news.json', {
            params: { query: park.keyword, display: 3, sort: 'date' },
            headers: {
              'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
              'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
            }
          }).then(r => ({ items: r.data.items || [], park }))
        )
      );
      const seen = new Set();
      for (const result of results) {
        if (result.status !== 'fulfilled') continue;
        const { items, park } = result.value;
        for (const item of items) {
          const title = item.title.replace(/<[^>]*>/g, '');
          if (seen.has(title)) continue;
          seen.add(title);
          articles.push({
            title,
            summary: item.description.replace(/<[^>]*>/g, ''),
            source: item.originallink ? new URL(item.originallink).hostname.replace('www.','') : '네이버뉴스',
            date: formatDate(item.pubDate),
            pubDate: new Date(item.pubDate).getTime(),
            url: item.originallink || item.link,
            tag: guessTag(title),
            parkName: park.name
          });
        }
      }
      articles.sort((a,b) => b.pubDate - a.pubDate);
      articles = articles.map(({pubDate,...r})=>r).slice(0, 30);
    } else {
      const park = PARK_LIST.find(p => p.key === parkKey);
      if (!park) return res.status(404).json({ error: '파크 없음' });
      const r = await axios.get('https://openapi.naver.com/v1/search/news.json', {
        params: { query: park.keyword, display: 10, sort: 'date' },
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
        }
      });
      articles = (r.data.items||[]).map(item => ({
        title: item.title.replace(/<[^>]*>/g,''),
        summary: item.description.replace(/<[^>]*>/g,''),
        source: item.originallink ? new URL(item.originallink).hostname.replace('www.','') : '네이버뉴스',
        date: formatDate(item.pubDate),
        url: item.originallink || item.link,
        tag: guessTag(item.title),
        parkName: park.name
      }));
    }
    const result = { articles, fetchedAt: new Date().toISOString(), source: 'naver' };
    newsCache.set(cacheKey, result);
    res.json(result);
  } catch(err) {
    console.error('뉴스 오류:', err.message);
    res.json({ articles: getFallbackNews(), source: 'fallback' });
  }
});

app.get('/api/health', (req, res) => res.json({ status:'ok', time:new Date().toISOString() }));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

function formatDate(pubDate) {
  const d = new Date(pubDate);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}
function guessTag(text) {
  if (/개장|오픈|재개|폐장/.test(text)) return '개장';
  if (/할인|특가|쿠폰|프로모션/.test(text)) return '가격';
  if (/입장료|요금|가격|인상|인하/.test(text)) return '가격';
  if (/이벤트|행사|축제|공연/.test(text)) return '이벤트';
  if (/신규|새로|리뉴얼|신설/.test(text)) return '신규시설';
  if (/워터파크|물놀이|슬라이드/.test(text)) return '워터파크';
  if (/스파|온천|사우나|찜질/.test(text)) return '스파';
  return '뉴스';
}
function getFallbackNews() {
  return PARK_LIST.slice(0,3).map(park => ({
    title: `${park.name} 최신 뉴스`,
    summary: 'NAVER API 키를 Railway Variables에 설정하면 실시간 뉴스가 표시됩니다.',
    source:'안내', date: new Date().toISOString().slice(0,10).replace(/-/g,'.'),
    url:`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(park.keyword)}`,
    tag:'안내', parkName: park.name
  }));
}

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중 - 포트 ${PORT}`);
});
