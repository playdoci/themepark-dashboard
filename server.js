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

let manualNews = [];

const DEFAULT_CATEGORIES = [
  { id:'cat_all',   name:'전체',    isDefault:true },
  { id:'cat_water', name:'워터파크', isDefault:true },
  { id:'cat_spa',   name:'스파/온천', isDefault:true },
  { id:'cat_event', name:'이벤트',   isDefault:true },
  { id:'cat_price', name:'가격/할인', isDefault:true },
  { id:'cat_new',   name:'신규시설', isDefault:true },
  { id:'cat_open',  name:'개장/폐장', isDefault:true },
];
let categories = [...DEFAULT_CATEGORIES];

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function loadPrices() {
  delete require.cache[require.resolve('./prices')];
  return require('./prices').PARK_PRICES;
}

const PARK_LIST = [
  { key:'woojin',       name:'웅진플레이도시',          keyword:'웅진플레이도시',          parkType:'waterpark' },
  { key:'caribbean',    name:'캐리비안베이',             keyword:'캐리비안베이',             parkType:'waterpark' },
  { key:'oceanworld',   name:'오션월드',                 keyword:'비발디파크 오션월드',      parkType:'waterpark' },
  { key:'onmount',      name:'원마운트',                 keyword:'원마운트 워터파크',        parkType:'waterpark' },
  { key:'islandcastle', name:'아일랜드캐슬',             keyword:'아일랜드캐슬',             parkType:'waterpark' },
  { key:'termeden',     name:'테르메덴',                 keyword:'테르메덴',                 parkType:'spa' },
  { key:'paradise_city',name:'파라다이스시티 씨메르',    keyword:'파라다이스시티 씨메르',    parkType:'spa' },
  { key:'inspire',      name:'인스파이어 스플래시 베이', keyword:'인스파이어 스플래시베이',  parkType:'waterpark' },
  { key:'aquafield',    name:'아쿠아필드 하남',          keyword:'아쿠아필드 하남',          parkType:'waterpark' },
  { key:'asanspa',      name:'아산스파비스',             keyword:'아산스파비스',             parkType:'spa' },
  { key:'splash',       name:'스플라스리솜',             keyword:'스플라스 리솜',            parkType:'waterpark' },
  { key:'ocean_ca',     name:'오션어드벤처 천안',        keyword:'오션어드벤처 천안',        parkType:'waterpark' },
  { key:'paradise',     name:'파라다이스 도고',          keyword:'파라다이스 도고',          parkType:'spa' },
  { key:'everland',     name:'에버랜드',                 keyword:'에버랜드',                 parkType:'themepark' },
  { key:'lotte',        name:'롯데월드',                 keyword:'롯데월드',                 parkType:'themepark' },
  { key:'lego',         name:'레고랜드',                 keyword:'레고랜드 코리아',          parkType:'themepark' },
  { key:'seoul',        name:'서울랜드',                 keyword:'서울랜드',                 parkType:'themepark' },
  { key:'gyeongju',     name:'경주월드',                 keyword:'경주월드',                 parkType:'themepark' },
  // 장르 키워드 — 특정 파크가 아닌 워터파크 전체 기사 수집용
  { key:'waterpark_kw', name:'워터파크',                 keyword:'워터파크',                 parkType:'waterpark', isKeyword: true },
];

app.get('/api/parks', (req, res) => res.json(PARK_LIST.filter(p => !p.isKeyword)));

// ── 가격 API ──────────────────────────────────────────────────
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

// ── 가격 수정 API ─────────────────────────────────────────────
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

// ── 카테고리 API ──────────────────────────────────────────────
app.get('/api/categories', (req, res) => res.json(categories));

// 일반 사용자용 카테고리 추가 (인증 불필요) - 항상 isDefault:false로 생성됨
app.post('/api/categories/add', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: '카테고리명 필요' });
  if (categories.find(c => c.name === name))
    return res.status(400).json({ error: '이미 존재하는 카테고리입니다' });
  const item = { id: 'cat_' + Date.now(), name, isDefault: false };
  categories.push(item);
  res.json({ success: true, item });
});

// 일반 사용자용 카테고리 삭제 (인증 불필요) - 기본 카테고리는 삭제 불가
app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const cat = categories.find(c => c.id === id);
  if (!cat) return res.status(404).json({ error: '카테고리를 찾을 수 없습니다' });
  if (cat.isDefault) return res.status(403).json({ error: '기본 카테고리는 삭제할 수 없습니다' });
  categories = categories.filter(c => c.id !== id);
  res.json({ success: true });
});

app.post('/api/admin/categories', adminAuth, (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: '카테고리명 필요' });
  if (categories.find(c => c.name === name))
    return res.status(400).json({ error: '이미 존재하는 카테고리입니다' });
  const item = { id: 'cat_' + Date.now(), name, isDefault: false };
  categories.push(item);
  res.json({ success: true, item });
});

// 관리자용 카테고리 삭제 - 기본 카테고리도 삭제 가능
app.delete('/api/admin/categories/:id', adminAuth, (req, res) => {
  const { id } = req.params;
  const cat = categories.find(c => c.id === id);
  if (!cat) return res.status(404).json({ error: '카테고리를 찾을 수 없습니다' });
  categories = categories.filter(c => c.id !== id);
  res.json({ success: true });
});

// ── 수동 뉴스 API ─────────────────────────────────────────────
app.get('/api/manual-news', (req, res) => {
  const sorted = [...manualNews].sort((a, b) => {
    const da = new Date(a.date.replace(/\./g, '-'));
    const db = new Date(b.date.replace(/\./g, '-'));
    return db - da;
  });
  res.json(sorted);
});

app.post('/api/admin/manual-news', adminAuth, (req, res) => {
  const { title, summary, url, source, tag } = req.body;
  if (!title || !url) return res.status(400).json({ error: '제목과 URL은 필수입니다' });
  const item = {
    id: Date.now().toString(),
    title, summary: summary || '', url,
    source: source || '협회',
    tag: tag || '협회',
    date: new Date().toISOString().slice(0,10).replace(/-/g,'.'),
    isManual: true
  };
  manualNews.unshift(item);
  if (manualNews.length > 50) manualNews = manualNews.slice(0, 50);
  newsCache.flushAll();
  res.json({ success: true, item });
});

app.delete('/api/admin/manual-news/:id', adminAuth, (req, res) => {
  const { id } = req.params;
  const before = manualNews.length;
  manualNews = manualNews.filter(n => n.id !== id);
  if (manualNews.length === before) return res.status(404).json({ error: '뉴스를 찾을 수 없습니다' });
  newsCache.flushAll();
  res.json({ success: true });
});

// ── 네이버 데이터랩 트렌드 API ───────────────────────────────
app.get('/api/trend', async (req, res) => {
  const parksParam = req.query.parks;
  const keywords = parksParam ? parksParam.split(',').filter(Boolean) : [];

  if (keywords.length === 0)
    return res.json({ results: [], source: 'no_params' });
  if (keywords.length > 5)
    return res.status(400).json({ error: '최대 5개까지 조회 가능합니다' });

  const cacheKey = 'trend_' + keywords.sort().join('_');
  const cached = priceCache.get(cacheKey);
  if (cached) return res.json({ ...cached, cached: true });

  if (!process.env.NAVER_CLIENT_ID || !process.env.NAVER_CLIENT_SECRET)
    return res.json({ results: [], source: 'no_api_key' });

  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const fmt = d => d.toISOString().slice(0,10);

    const body = {
      startDate: fmt(startDate), endDate: fmt(endDate), timeUnit: 'week',
      keywordGroups: keywords.map(name => ({ groupName: name, keywords: [name] }))
    };

    const resp = await axios.post('https://openapi.naver.com/v1/datalab/search', body, {
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
        'Content-Type': 'application/json'
      }
    });

    const allResults = [];
    for (const r of (resp.data.results || [])) {
      const data = r.data || [];
      const recent = data.slice(-2);
      const prev = data.slice(-4,-2);
      const avg = recent.length ? Math.round(recent.reduce((s,d)=>s+d.ratio,0)/recent.length*10)/10 : 0;
      const prevAvg = prev.length ? prev.reduce((s,d)=>s+d.ratio,0)/prev.length : avg;
      const change = prevAvg > 0 ? Math.round((avg-prevAvg)/prevAvg*100) : 0;
      allResults.push({ name:r.title, ratio:avg, change, trend:data.map(d=>({date:d.period,ratio:d.ratio})) });
    }

    allResults.sort((a,b) => b.ratio - a.ratio);
    const result = {
      results: allResults,
      fetchedAt: new Date().toISOString(),
      period: `${fmt(startDate)} ~ ${fmt(endDate)}`,
      source: 'naver_datalab'
    };
    priceCache.set(cacheKey, result, 3600);
    res.json(result);

  } catch (err) {
    console.error('데이터랩 오류:', err.response?.data || err.message);
    res.json({ results:[], source:'error', error:err.message });
  }
});

// ── 네이버 쇼핑 실시간 가격 ──────────────────────────────────
app.get('/api/naver-price', async (req, res) => {
  const parkKey = req.query.park;
  if (!parkKey) return res.status(400).json({ error: 'park 파라미터 필요' });
  const park = PARK_LIST.find(p => p.key === parkKey);
  if (!park) return res.status(404).json({ error: '파크 없음' });
  if (!process.env.NAVER_CLIENT_ID || !process.env.NAVER_CLIENT_SECRET)
    return res.json({ price: null, source: 'no_api_key' });
  const cacheKey = `naver_price_${parkKey}`;
  const cached = priceCache.get(cacheKey);
  if (cached) return res.json({ ...cached, cached: true });
  try {
    const queries = [`${park.name} 입장권 종일권`, `${park.name} 이용권`, `${park.name} 입장권`];
    let bestItem = null;
    for (const query of queries) {
      const response = await axios.get('https://openapi.naver.com/v1/search/shop.json', {
        params: { query, display: 10, sort: 'asc' },
        headers: { 'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID, 'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET }
      });
      const parkKeywords = park.keyword.split(' ');
      const filtered = (response.data.items || []).filter(item => {
        const title = item.title.replace(/<[^>]*>/g, '');
        return parkKeywords.some(kw => title.includes(kw)) && /입장|이용권|종일|티켓|자유/.test(title);
      });
      if (filtered.length > 0) {
        filtered.sort((a,b) => parseInt(a.lprice) - parseInt(b.lprice));
        bestItem = filtered[0];
        break;
      }
    }
    if (!bestItem) return res.json({ price: null, source: 'not_found' });
    const result = {
      price: parseInt(bestItem.lprice),
      title: bestItem.title.replace(/<[^>]*>/g, ''),
      mallName: bestItem.mallName,
      link: bestItem.link,
      fetchedAt: new Date().toISOString(),
      source: 'naver_shopping'
    };
    priceCache.set(cacheKey, result, 3600);
    res.json(result);
  } catch (err) {
    console.error('네이버 쇼핑 오류:', err.message);
    res.json({ price: null, source: 'error', error: err.message });
  }
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
              headers: { 'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID, 'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET }
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
            const fullText = title + ' ' + (item.description||'').replace(/<[^>]*>/g,'');
            naverArticles.push({
              title,
              summary: item.description.replace(/<[^>]*>/g, ''),
              source: item.originallink ? new URL(item.originallink).hostname.replace('www.','') : '네이버뉴스',
              date: formatDate(item.pubDate),
              pubDate: new Date(item.pubDate).getTime(),
              url: item.originallink || item.link,
              tag: guessTag(fullText),
              subTag: guessSubTag(fullText) || (park.parkType === 'waterpark' ? '워터파크' : park.parkType === 'spa' ? '스파' : null),
              parkName: park.isKeyword ? null : park.name,
              isKeyword: park.isKeyword || false,
            });
          }
        }
        naverArticles.sort((a,b) => b.pubDate - a.pubDate);
        naverArticles = naverArticles.map(({pubDate,...r})=>r).slice(0, 50);
      } else {
        const park = PARK_LIST.find(p => p.key === parkKey);
        if (park) {
          const r = await axios.get('https://openapi.naver.com/v1/search/news.json', {
            params: { query: park.keyword, display: 10, sort: 'date' },
            headers: { 'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID, 'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET }
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
// 파크명 → 파크타입 매핑
const WATERPARK_NAMES = ['웅진플레이도시','캐리비안베이','오션월드','원마운트','아일랜드캐슬','인스파이어','아쿠아필드','스플라스','오션어드벤처'];
const SPA_NAMES = ['테르메덴','씨메르','아산스파비스','파라다이스 도고'];

function getParkTypeTag(text) {
  if (WATERPARK_NAMES.some(n => text.includes(n))) return '워터파크';
  if (SPA_NAMES.some(n => text.includes(n))) return '스파';
  if (/워터파크|물놀이|슬라이드|워터슬라이드/.test(text)) return '워터파크';
  if (/스파|온천|사우나|찜질/.test(text)) return '스파';
  return null;
}

function guessTag(text) {
  // 콘텐츠 성격 태그 (우선)
  let contentTag = '뉴스';
  if (/개장|오픈|재개|폐장/.test(text)) contentTag = '개장';
  else if (/할인|특가|쿠폰|프로모션/.test(text)) contentTag = '가격';
  else if (/입장료|요금|가격|인상|인하/.test(text)) contentTag = '가격';
  else if (/이벤트|행사|축제|공연/.test(text)) contentTag = '이벤트';
  else if (/신규|새로|리뉴얼|신설/.test(text)) contentTag = '신규시설';

  // 파크타입 태그 (파크명 or 장르 키워드 기반)
  const parkTypeTag = getParkTypeTag(text);

  // 콘텐츠 태그가 뉴스(기본값)면 파크타입으로 대체, 아니면 콘텐츠 태그 유지 + 파크타입 서브태그
  if (contentTag === '뉴스' && parkTypeTag) return parkTypeTag;
  return contentTag;
}

// 서브태그 — 카테고리 필터용 (워터파크/스파 파크 기사에 항상 추가)
function guessSubTag(text) {
  return getParkTypeTag(text);
}

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중 - 포트 ${PORT}`);
});
