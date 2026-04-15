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

// 수동 등록 뉴스 메모리 저장 (서버 재시작 시 초기화됨 — 중요 뉴스는 prices.js처럼 GitHub 저장도 가능)
let manualNews = [];

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function loadPrices() {
  delete require.cache[require.resolve('./prices')];
  return require('./prices').PARK_PRICES;
}

// ── 파크 목록 (순서: 워터파크군 → 영종도 → 기타 → 테마파크) ─
const PARK_LIST = [
  { key:'woojin',       name:'웅진플레이도시',         keyword:'웅진플레이도시' },
  { key:'caribbean',    name:'캐리비안베이',            keyword:'캐리비안베이' },
  { key:'oceanworld',   name:'오션월드',                keyword:'비발디파크 오션월드' },
  { key:'onmount',      name:'원마운트',                keyword:'원마운트 워터파크' },
  { key:'islandcastle', name:'아일랜드캐슬',            keyword:'아일랜드캐슬' },
  { key:'termeden',     name:'테르메덴',                keyword:'테르메덴' },
  { key:'paradise_city',name:'파라다이스시티 씨메르',   keyword:'파라다이스시티 씨메르' },
  { key:'inspire',      name:'인스파이어 스플래시 베이',keyword:'인스파이어 스플래시베이' },
  { key:'aquafield',    name:'아쿠아필드 하남',         keyword:'아쿠아필드 하남' },
  { key:'asanspa',      name:'아산스파비스',            keyword:'아산스파비스' },
  { key:'splash',       name:'스플라스리솜',            keyword:'스플라스 리솜' },
  { key:'ocean_ca',     name:'오션어드벤처 천안',       keyword:'오션어드벤처 천안' },
  { key:'paradise',     name:'파라다이스 도고',         keyword:'파라다이스 도고' },
  { key:'everland',     name:'에버랜드',                keyword:'에버랜드' },
  { key:'lotte',        name:'롯데월드',                keyword:'롯데월드' },
  { key:'lego',         name:'레고랜드',                keyword:'레고랜드 코리아' },
  { key:'seoul',        name:'서울랜드',                keyword:'서울랜드' },
  { key:'gyeongju',     name:'경주월드',                keyword:'경주월드' },
];

app.get('/api/parks', (req, res) => res.json(PARK_LIST));

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
    id: key, name: p.name, currentSeason: p.currentSeason, updatedAt: p.updatedAt
  }));
  res.json({ parks: summary, updatedAt: new Date().toISOString() });
});

// ── 관리자 로그인 ─────────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PASSWORD) return res.status(500).json({ error: 'ADMIN_PASSWORD 환경변수가 없습니다' });
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: '비밀번호가 틀렸습니다' });
  res.json({ success: true, token: Buffer.from(`admin:${ADMIN_PASSWORD}`).toString('base64') });
});

function adminAuth(req, res, next) {
  const auth = req.headers['x-admin-token'];
  const expected = Buffer.from(`admin:${process.env.ADMIN_PASSWORD}`).toString('base64');
  if (!auth || auth !== expected) return res.status(401).json({ error: '인증 필요' });
  next();
}

// ── 가격 수정 API (GitHub prices.js 업데이트) ─────────────────
app.post('/api/admin/update-price', adminAuth, async (req, res) => {
  const { parkKey, updatedData } = req.body;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO  = process.env.GITHUB_REPO;

  if (!GITHUB_TOKEN || !GITHUB_REPO)
    return res.status(500).json({ error: 'GITHUB_TOKEN 또는 GITHUB_REPO 환경변수 없음' });
  if (!parkKey || !updatedData)
    return res.status(400).json({ error: 'parkKey와 updatedData 필요' });

  try {
    const fileRes = await axios.get(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/prices.js`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } }
    );
    const sha = fileRes.data.sha;
    const PARK_PRICES = loadPrices();
    PARK_PRICES[parkKey] = updatedData;
    const newContent = generatePricesJs(PARK_PRICES);
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
    console.error('GitHub 오류:', err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data?.message || err.message });
  }
});

function generatePricesJs(PARK_PRICES) {
  const today = new Date().toLocaleDateString('ko-KR', {year:'numeric',month:'long',day:'numeric'});
  return `// ============================================================\n// prices.js - 파크별 실제 가격 데이터\n// 마지막 업데이트: ${today}\n// ============================================================\n\nconst PARK_PRICES = ${JSON.stringify(PARK_PRICES, null, 2)};\n\nmodule.exports = { PARK_PRICES };\n`;
}

// ── 수동 뉴스 API ─────────────────────────────────────────────
// 조회
app.get('/api/manual-news', (req, res) => {
  res.json(manualNews);
});

// 등록 (관리자 전용)
app.post('/api/admin/manual-news', adminAuth, (req, res) => {
  const { title, summary, url, source, tag } = req.body;
  if (!title || !url) return res.status(400).json({ error: '제목과 URL은 필수입니다' });
  const item = {
    id: Date.now().toString(),
    title,
    summary: summary || '',
    url,
    source: source || '협회',
    tag: tag || '협회',
    date: new Date().toISOString().slice(0,10).replace(/-/g,'.'),
    isManual: true
  };
  manualNews.unshift(item); // 최신순으로 앞에 추가
  if (manualNews.length > 50) manualNews = manualNews.slice(0, 50); // 최대 50개
  newsCache.flushAll(); // 뉴스 캐시 초기화
  res.json({ success: true, item });
});

// 삭제 (관리자 전용)
app.delete('/api/admin/manual-news/:id', adminAuth, (req, res) => {
  const { id } = req.params;
  const before = manualNews.length;
  manualNews = manualNews.filter(n => n.id !== id);
  if (manualNews.length === before) return res.status(404).json({ error: '뉴스를 찾을 수 없습니다' });
  newsCache.flushAll();
  res.json({ success: true });
});

// ── 뉴스 API ─────────────────────────────────────────────────
app.get('/api/news', async (req, res) => {
  const parkKey = req.query.park || 'all';
  const cacheKey = `news_${parkKey}`;
  const cached = newsCache.get(cacheKey);
  if (cached) return res.json({ ...cached, cached: true });

  let naverArticles = [];

  if (process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET) {
    try {
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
            naverArticles.push({
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
        naverArticles.sort((a,b) => b.pubDate - a.pubDate);
        naverArticles = naverArticles.map(({pubDate,...r})=>r).slice(0, 30);
      } else {
        const park = PARK_LIST.find(p => p.key === parkKey);
        if (park) {
          const r = await axios.get('https://openapi.naver.com/v1/search/news.json', {
            params: { query: park.keyword, display: 10, sort: 'date' },
            headers: {
              'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
              'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
            }
          });
          naverArticles = (r.data.items||[]).map(item => ({
            title: item.title.replace(/<[^>]*>/g,''),
            summary: item.description.replace(/<[^>]*>/g,''),
            source: item.originallink ? new URL(item.originallink).hostname.replace('www.','') : '네이버뉴스',
            date: formatDate(item.pubDate),
            url: item.originallink || item.link,
            tag: guessTag(item.title),
            parkName: park.name
          }));
        }
      }
    } catch(err) {
      console.error('네이버 뉴스 오류:', err.message);
    }
  }

  // 수동 등록 뉴스를 맨 앞에 합치기
  const articles = [...manualNews, ...naverArticles];

  const result = {
    articles,
    fetchedAt: new Date().toISOString(),
    source: process.env.NAVER_CLIENT_ID ? 'naver' : 'fallback',
    manualCount: manualNews.length
  };
  newsCache.set(cacheKey, result);
  res.json(result);
});

app.get('/api/health', (req, res) => res.json({ status:'ok', time:new Date().toISOString() }));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public/admin.html')));
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

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중 - 포트 ${PORT}`);
});
