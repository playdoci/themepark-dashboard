require('dotenv').config();
const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const axios = require('axios');
const path = require('path');
const { PARK_PRICES } = require('./prices');

const app = express();
const PORT = process.env.PORT || 3000;

const newsCache  = new NodeCache({ stdTTL: 1800 });  // 30분
const priceCache = new NodeCache({ stdTTL: 3600 });  // 1시간

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

// 채널별 직접 구매 링크 (네이버 쇼핑에 없는 채널용)
const CHANNEL_LINKS = {
  woojin:       { home:'https://www.playdoci.com/Water/info_charge.aspx', nori:'https://www.nolda.co.kr/search?keyword=웅진플레이도시', yanolja:'https://www.yanolja.com/search?keyword=웅진플레이도시', yeogi:'https://www.goodchoice.kr/product/search?keyword=웅진플레이도시' },
  caribbean:    { home:'https://reservation.everland.com/web/cb.do', nori:'https://www.nolda.co.kr/search?keyword=캐리비안베이', yanolja:'https://www.yanolja.com/search?keyword=캐리비안베이', yeogi:'https://www.goodchoice.kr/product/search?keyword=캐리비안베이' },
  oceanworld:   { home:'https://www.sonohotelsresorts.com/reserve/ticket', nori:'https://www.nolda.co.kr/search?keyword=오션월드', yanolja:'https://www.yanolja.com/search?keyword=오션월드', yeogi:'https://www.goodchoice.kr/product/search?keyword=오션월드' },
  onmount:      { home:'https://www.onmount.co.kr', nori:'https://www.nolda.co.kr/search?keyword=원마운트', yanolja:'https://www.yanolja.com/search?keyword=원마운트', yeogi:'https://www.goodchoice.kr/product/search?keyword=원마운트' },
  termeden:     { home:'https://www.termeden.com', nori:'https://www.nolda.co.kr/search?keyword=테르메덴', yanolja:'https://www.yanolja.com/search?keyword=테르메덴', yeogi:'https://www.goodchoice.kr/product/search?keyword=테르메덴' },
  islandcastle: { home:'https://www.islandcastle.co.kr', nori:'https://www.nolda.co.kr/search?keyword=아일랜드캐슬', yanolja:'https://www.yanolja.com/search?keyword=아일랜드캐슬', yeogi:'https://www.goodchoice.kr/product/search?keyword=아일랜드캐슬' },
  aquafield:    { home:'https://www.starfield.co.kr/hanam/store/aquafield', nori:'https://www.nolda.co.kr/search?keyword=아쿠아필드', yanolja:'https://www.yanolja.com/search?keyword=아쿠아필드', yeogi:'https://www.goodchoice.kr/product/search?keyword=아쿠아필드' },
  asanspa:      { home:'https://www.spabis.co.kr', nori:'https://www.nolda.co.kr/search?keyword=아산스파비스', yanolja:'https://www.yanolja.com/search?keyword=아산스파비스', yeogi:'https://www.goodchoice.kr/product/search?keyword=아산스파비스' },
  splash:       { home:'https://www.resort.co.kr/splashresort', nori:'https://www.nolda.co.kr/search?keyword=스플라스리솜', yanolja:'https://www.yanolja.com/search?keyword=스플라스리솜', yeogi:'https://www.goodchoice.kr/product/search?keyword=스플라스리솜' },
  ocean_ca:     { home:'https://www.oceanadventure.co.kr', nori:'https://www.nolda.co.kr/search?keyword=오션어드벤처', yanolja:'https://www.yanolja.com/search?keyword=오션어드벤처', yeogi:'https://www.goodchoice.kr/product/search?keyword=오션어드벤처' },
  paradise:     { home:'https://www.paradisedogo.com', nori:'https://www.nolda.co.kr/search?keyword=파라다이스도고', yanolja:'https://www.yanolja.com/search?keyword=파라다이스도고', yeogi:'https://www.goodchoice.kr/product/search?keyword=파라다이스도고' },
  everland:     { home:'https://reservation.everland.com', nori:'https://www.nolda.co.kr/search?keyword=에버랜드', yanolja:'https://www.yanolja.com/search?keyword=에버랜드', yeogi:'https://www.goodchoice.kr/product/search?keyword=에버랜드' },
  lotte:        { home:'https://www.lotteworld.com/app/adv_ticket/list.asp', nori:'https://www.nolda.co.kr/search?keyword=롯데월드', yanolja:'https://www.yanolja.com/search?keyword=롯데월드', yeogi:'https://www.goodchoice.kr/product/search?keyword=롯데월드' },
  lego:         { home:'https://www.legoland.kr/plan-your-visit/tickets', nori:'https://www.nolda.co.kr/search?keyword=레고랜드', yanolja:'https://www.yanolja.com/search?keyword=레고랜드', yeogi:'https://www.goodchoice.kr/product/search?keyword=레고랜드' },
  seoul:        { home:'https://www.seoulland.co.kr', nori:'https://www.nolda.co.kr/search?keyword=서울랜드', yanolja:'https://www.yanolja.com/search?keyword=서울랜드', yeogi:'https://www.goodchoice.kr/product/search?keyword=서울랜드' },
  gyeongju:     { home:'https://www.gjworld.co.kr', nori:'https://www.nolda.co.kr/search?keyword=경주월드', yanolja:'https://www.yanolja.com/search?keyword=경주월드', yeogi:'https://www.goodchoice.kr/product/search?keyword=경주월드' },
};

app.get('/api/parks', (req, res) => res.json(PARK_LIST));

// ── 네이버 쇼핑 API로 실시간 가격 조회 ───────────────────────
app.get('/api/shopping-prices', async (req, res) => {
  const parkKey = req.query.park;
  if (!parkKey) return res.status(400).json({ error: 'park 파라미터 필요' });

  const cacheKey = `shop_${parkKey}`;
  const cached = priceCache.get(cacheKey);
  if (cached) return res.json({ ...cached, cached: true });

  const park = PARK_LIST.find(p => p.key === parkKey);
  if (!park) return res.status(404).json({ error: '파크를 찾을 수 없습니다' });

  if (!process.env.NAVER_CLIENT_ID || !process.env.NAVER_CLIENT_SECRET) {
    return res.json({ items: [], source: 'no_api_key' });
  }

  try {
    // 입장권/이용권으로 검색
    const queries = [
      `${park.name} 입장권`,
      `${park.name} 이용권`,
    ];

    let allItems = [];
    for (const query of queries) {
      const response = await axios.get('https://openapi.naver.com/v1/search/shop.json', {
        params: { query, display: 10, sort: 'asc' }, // asc = 낮은 가격순
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
        }
      });
      allItems = allItems.concat(response.data.items || []);
    }

    // 파크 이름이 포함된 상품만 필터링
    const keywords = park.keyword.split(' ');
    const filtered = allItems.filter(item => {
      const title = item.title.replace(/<[^>]*>/g, '');
      return keywords.some(kw => title.includes(kw)) &&
             (title.includes('입장') || title.includes('이용권') || title.includes('티켓'));
    });

    // 중복 제거 (상품명 기준) + 가격순 정렬
    const seen = new Set();
    const items = filtered
      .filter(item => {
        const key = item.title.replace(/<[^>]*>/g, '').slice(0, 20);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => parseInt(a.lprice) - parseInt(b.lprice))
      .slice(0, 8)
      .map(item => ({
        title: item.title.replace(/<[^>]*>/g, ''),
        price: parseInt(item.lprice),
        mallName: item.mallName,
        link: item.link,
        image: item.image,
        productId: item.productId
      }));

    const result = {
      items,
      fetchedAt: new Date().toISOString(),
      source: 'naver_shopping',
      parkName: park.name,
      links: CHANNEL_LINKS[parkKey] || {}
    };

    priceCache.set(cacheKey, result);
    res.json(result);

  } catch (err) {
    console.error('네이버 쇼핑 오류:', err.message);
    res.json({
      items: [],
      source: 'error',
      error: err.message,
      links: CHANNEL_LINKS[parkKey] || {}
    });
  }
});

// ── 기존 가격 API (공식 홈페이지 기준 가격) ──────────────────
app.get('/api/prices', (req, res) => {
  const parkId = req.query.park;
  if (parkId) {
    const park = PARK_PRICES[parkId];
    if (!park) return res.status(404).json({ error: '파크를 찾을 수 없습니다' });
    // 채널 링크도 함께 반환
    return res.json({ ...park, links: CHANNEL_LINKS[parkId] || {} });
  }
  const summary = Object.entries(PARK_PRICES).map(([key, p]) => ({
    id: key, name: p.name, currentSeason: p.currentSeason, updatedAt: p.updatedAt,
    lowestPrice: Math.min(...p.tickets.map(t => t.prices.adult).filter(Boolean))
  }));
  res.json({ parks: summary, updatedAt: new Date().toISOString() });
});

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
        headers: { 'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID, 'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET }
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
