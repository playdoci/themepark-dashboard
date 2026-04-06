// ============================================================
// prices.js - 파크별 공식 홈페이지 확인 가격 데이터
// 마지막 업데이트: 2026년 4월 3일
// ============================================================
// 수정 방법: 각 파크 공식 홈페이지에서 현재 시즌 요금 확인 후
// 해당 파크의 tickets 배열을 업데이트하세요.
// ============================================================

const PARK_PRICES = {

  // ─── 웅진플레이도시 ───────────────────────────────────────
  // 출처: https://playdoci.com/Common/Pop_FeeInfo.aspx
  // 현재 시즌: 로우 시즌 2026.03.20 ~ 2026.05.31
  woojin: {
    name: "웅진플레이도시",
    homepageUrl: "https://www.playdoci.com",
    pricePageUrl: "https://playdoci.com/Common/Pop_FeeInfo.aspx",
    currentSeason: "로우 시즌 (2026.03.20~05.31)",
    updatedAt: "2026-04-03",
    notice: "매주 월·화 정기휴장 / 36개월 미만 무료",
    tickets: [
      {
        id: "day",
        label: "종일권",
        time: "10:00~18:00",
        prices: { adult: 60000, child: 60000, youth: 60000 },
        note: "대인·소인·청소년 동일가 / 1인 기준"
      },
      {
        id: "half",
        label: "반일권",
        time: "14:00~18:00",
        prices: { adult: 50000, child: 50000, youth: 50000 },
        note: "대인·소인·청소년 동일가 / 1인 기준"
      }
    ],
    // 외부 채널 특가 (확인된 할인율 기반 — 실제 판매가는 각 채널에서 확인)
    channelDiscounts: {
      nori:     { rate: 0.38, note: "놀이의발견 앱 특가" },
      naver:    { rate: 0.30, note: "네이버 예약" },
      coupang:  { rate: 0.28, note: "쿠팡" },
      kakao:    { rate: 0.25, note: "카카오 선물하기" },
      yanolja:  { rate: 0.30, note: "야놀자" },
      yeogi:    { rate: 0.28, note: "여기어때" },
      gmarket:  { rate: 0.25, note: "지마켓" },
      "11st":   { rate: 0.27, note: "11번가" },
      auction:  { rate: 0.24, note: "옥션" },
      kidsnote: { rate: 0.32, note: "키즈노트" },
      mrt:      { rate: 0.22, note: "마이리얼트립" }
    }
  },

  // ─── 캐리비안베이 ─────────────────────────────────────────
  // 출처: https://www.everland.com/caribbeanbay
  // 현재 시즌: 봄 로우시즌 (2026 기준)
  caribbean: {
    name: "캐리비안베이",
    homepageUrl: "https://www.everland.com/caribbeanbay/home/main",
    pricePageUrl: "https://reservation.everland.com/web/cb.do?method=productMain",
    currentSeason: "봄 시즌 (로우)",
    updatedAt: "2026-04-03",
    notice: "소인: 36개월~만12세 / 36개월 미만 무료 / 스마트예약 권장",
    tickets: [
      {
        id: "day",
        label: "종일권",
        time: "개장~마감",
        prices: { adult: 55000, child: 44000, youth: 44000 },
        note: "소인·경로 동일가"
      },
      {
        id: "afternoon",
        label: "오후권",
        time: "14:30~마감",
        prices: { adult: 47000, child: 36000, youth: 36000 },
        note: "오후 14:30 이후 입장"
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.35, note: "놀이의발견" },
      naver:    { rate: 0.30, note: "네이버 예약" },
      coupang:  { rate: 0.28, note: "쿠팡" },
      kakao:    { rate: 0.25, note: "카카오" },
      yanolja:  { rate: 0.30, note: "야놀자" },
      yeogi:    { rate: 0.27, note: "여기어때" },
      gmarket:  { rate: 0.25, note: "지마켓" },
      "11st":   { rate: 0.27, note: "11번가" },
      auction:  { rate: 0.24, note: "옥션" },
      kidsnote: { rate: 0.30, note: "키즈노트" },
      mrt:      { rate: 0.22, note: "마이리얼트립" }
    }
  },

  // ─── 오션월드 ─────────────────────────────────────────────
  // 출처: https://www.sonohotelsresorts.com/reserve/ticket
  // 현재 시즌: 봄 시즌 (3/21~)
  oceanworld: {
    name: "오션월드",
    homepageUrl: "https://www.sonohotelsresorts.com/oceanWorld",
    pricePageUrl: "https://www.sonohotelsresorts.com/reserve/ticket/dtl?salesNo=10149",
    currentSeason: "봄 시즌 (2026.03.21~)",
    updatedAt: "2026-04-03",
    notice: "대인=중학생 이상 / 소인=36개월~초등학생 / 36개월 미만 무료 / 매주 수요일 클린데이",
    tickets: [
      {
        id: "day",
        label: "종일권",
        time: "오픈~마감",
        prices: { adult: 45000, child: 36000, youth: 45000 },
        note: "대인/소인 구분 (주중·주말 동일)"
      },
      {
        id: "season",
        label: "시즌권",
        time: "시즌 내 무제한",
        prices: { adult: 199000, child: 159000, youth: 199000 },
        note: "시즌 내 횟수 제한 없음"
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.33, note: "놀이의발견" },
      naver:    { rate: 0.28, note: "네이버 예약" },
      coupang:  { rate: 0.25, note: "쿠팡" },
      kakao:    { rate: 0.22, note: "카카오" },
      yanolja:  { rate: 0.28, note: "야놀자" },
      yeogi:    { rate: 0.25, note: "여기어때" },
      gmarket:  { rate: 0.23, note: "지마켓" },
      "11st":   { rate: 0.24, note: "11번가" },
      auction:  { rate: 0.22, note: "옥션" },
      kidsnote: { rate: 0.28, note: "키즈노트" },
      mrt:      { rate: 0.20, note: "마이리얼트립" }
    }
  },

  // ─── 원마운트 ─────────────────────────────────────────────
  onmount: {
    name: "원마운트",
    homepageUrl: "https://www.onmount.co.kr",
    pricePageUrl: "https://www.onmount.co.kr",
    currentSeason: "봄 시즌",
    updatedAt: "2026-04-03",
    notice: "경기 고양 / 지하철 3호선 정발산역 도보 10분",
    tickets: [
      {
        id: "day",
        label: "대인 종일권",
        time: "오픈~마감",
        prices: { adult: 49000, child: 39000, youth: 44000 },
        note: ""
      },
      {
        id: "half",
        label: "반일권",
        time: "14:00~마감",
        prices: { adult: 39000, child: 31000, youth: 35000 },
        note: "오후 14:00 이후 입장"
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.35, note: "놀이의발견" },
      naver:    { rate: 0.30, note: "네이버 예약" },
      coupang:  { rate: 0.28, note: "쿠팡" },
      kakao:    { rate: 0.25, note: "카카오" },
      yanolja:  { rate: 0.30, note: "야놀자" },
      yeogi:    { rate: 0.27, note: "여기어때" },
      gmarket:  { rate: 0.25, note: "지마켓" },
      "11st":   { rate: 0.27, note: "11번가" },
      auction:  { rate: 0.22, note: "옥션" },
      kidsnote: { rate: 0.32, note: "키즈노트" },
      mrt:      { rate: 0.20, note: "마이리얼트립" }
    }
  },

  // ─── 테르메덴 ─────────────────────────────────────────────
  termeden: {
    name: "테르메덴",
    homepageUrl: "https://www.termeden.com",
    pricePageUrl: "https://www.termeden.com",
    currentSeason: "상시 운영",
    updatedAt: "2026-04-03",
    notice: "경기 여주 / 천연 온천수 / 주중·주말 요금 상이",
    tickets: [
      {
        id: "weekday",
        label: "주중 (월~금)",
        time: "오픈~마감",
        prices: { adult: 38000, child: 28000, youth: 33000 },
        note: "공휴일 제외"
      },
      {
        id: "weekend",
        label: "주말·공휴일",
        time: "오픈~마감",
        prices: { adult: 44000, child: 32000, youth: 38000 },
        note: ""
      },
      {
        id: "couple",
        label: "커플 패키지 (2인)",
        time: "주중 한정",
        prices: { adult: 72000, child: null, youth: null },
        note: "2인 묶음 / 주중 한정"
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.30, note: "놀이의발견" },
      naver:    { rate: 0.25, note: "네이버 예약" },
      kakao:    { rate: 0.22, note: "카카오" },
      yanolja:  { rate: 0.28, note: "야놀자" },
      yeogi:    { rate: 0.25, note: "여기어때" },
      gmarket:  { rate: 0.22, note: "지마켓" },
      "11st":   { rate: 0.24, note: "11번가" },
      auction:  { rate: 0.20, note: "옥션" },
      kidsnote: { rate: 0.28, note: "키즈노트" },
      mrt:      { rate: 0.20, note: "마이리얼트립" }
    }
  },

  // ─── 아일랜드캐슬 ─────────────────────────────────────────
  islandcastle: {
    name: "아일랜드캐슬",
    homepageUrl: "https://www.islandcastle.co.kr",
    pricePageUrl: "https://www.islandcastle.co.kr",
    currentSeason: "봄 시즌",
    updatedAt: "2026-04-03",
    notice: "경기 가평 / 청평 호반",
    tickets: [
      {
        id: "day",
        label: "종일권",
        time: "오픈~마감",
        prices: { adult: 44000, child: 35000, youth: 40000 },
        note: ""
      },
      {
        id: "half",
        label: "반일권",
        time: "14:00~마감",
        prices: { adult: 36000, child: 29000, youth: 33000 },
        note: ""
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.33, note: "놀이의발견" },
      naver:    { rate: 0.28, note: "네이버 예약" },
      coupang:  { rate: 0.26, note: "쿠팡" },
      kakao:    { rate: 0.23, note: "카카오" },
      yanolja:  { rate: 0.28, note: "야놀자" },
      yeogi:    { rate: 0.25, note: "여기어때" },
      gmarket:  { rate: 0.22, note: "지마켓" },
      "11st":   { rate: 0.24, note: "11번가" },
      auction:  { rate: 0.20, note: "옥션" },
      kidsnote: { rate: 0.28, note: "키즈노트" },
      mrt:      { rate: 0.18, note: "마이리얼트립" }
    }
  },

  // ─── 아쿠아필드 하남 ──────────────────────────────────────
  aquafield: {
    name: "아쿠아필드 하남",
    homepageUrl: "https://www.starfield.co.kr/hanam/store/aquafield",
    pricePageUrl: "https://www.starfield.co.kr/hanam/store/aquafield",
    currentSeason: "상시 (주중·주말 구분)",
    updatedAt: "2026-04-03",
    notice: "경기 하남 스타필드 내 / 주중·주말 요금 상이",
    tickets: [
      {
        id: "weekday",
        label: "주중 대인",
        time: "오픈~마감",
        prices: { adult: 48000, child: 36000, youth: 42000 },
        note: ""
      },
      {
        id: "weekend",
        label: "주말·공휴일",
        time: "오픈~마감",
        prices: { adult: 58000, child: 44000, youth: 52000 },
        note: ""
      },
      {
        id: "half",
        label: "반일권 (주중)",
        time: "15:00~마감",
        prices: { adult: 38000, child: 28000, youth: 33000 },
        note: "주중 15:00 이후 입장"
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.33, note: "놀이의발견" },
      naver:    { rate: 0.28, note: "네이버 예약" },
      coupang:  { rate: 0.25, note: "쿠팡" },
      kakao:    { rate: 0.22, note: "카카오" },
      yanolja:  { rate: 0.28, note: "야놀자" },
      yeogi:    { rate: 0.25, note: "여기어때" },
      gmarket:  { rate: 0.22, note: "지마켓" },
      "11st":   { rate: 0.24, note: "11번가" },
      auction:  { rate: 0.20, note: "옥션" },
      kidsnote: { rate: 0.30, note: "키즈노트" },
      mrt:      { rate: 0.18, note: "마이리얼트립" }
    }
  },

  // ─── 아산스파비스 ─────────────────────────────────────────
  asanspa: {
    name: "아산스파비스",
    homepageUrl: "https://www.spabis.co.kr",
    pricePageUrl: "https://www.spabis.co.kr",
    currentSeason: "상시",
    updatedAt: "2026-04-03",
    notice: "충남 아산 / 주중·주말 요금 상이",
    tickets: [
      {
        id: "weekday",
        label: "주중 대인",
        time: "오픈~마감",
        prices: { adult: 32000, child: 22000, youth: 27000 },
        note: ""
      },
      {
        id: "weekend",
        label: "주말·공휴일",
        time: "오픈~마감",
        prices: { adult: 36000, child: 24000, youth: 30000 },
        note: ""
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.30, note: "놀이의발견" },
      naver:    { rate: 0.25, note: "네이버 예약" },
      coupang:  { rate: 0.23, note: "쿠팡" },
      kakao:    { rate: 0.20, note: "카카오" },
      yanolja:  { rate: 0.28, note: "야놀자" },
      yeogi:    { rate: 0.25, note: "여기어때" },
      gmarket:  { rate: 0.20, note: "지마켓" },
      "11st":   { rate: 0.22, note: "11번가" },
      auction:  { rate: 0.18, note: "옥션" },
      kidsnote: { rate: 0.28, note: "키즈노트" },
      mrt:      { rate: 0.15, note: "마이리얼트립" }
    }
  },

  // ─── 스플라스리솜 ─────────────────────────────────────────
  splash: {
    name: "스플라스리솜",
    homepageUrl: "https://www.resort.co.kr/splashresort",
    pricePageUrl: "https://www.resort.co.kr/splashresort",
    currentSeason: "2026 시즌 (7월 리뉴얼 오픈 예정)",
    updatedAt: "2026-04-03",
    notice: "충북 제천 / 7월 리뉴얼 후 재오픈 예정 — 아래 가격은 리뉴얼 후 예상가",
    tickets: [
      {
        id: "day",
        label: "종일권",
        time: "오픈~마감",
        prices: { adult: 52000, child: 40000, youth: 46000 },
        note: "리뉴얼 후 예상가"
      },
      {
        id: "season",
        label: "시즌권",
        time: "시즌 내 무제한",
        prices: { adult: 180000, child: 140000, youth: 160000 },
        note: "얼리버드 40% 할인 진행 중"
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.33, note: "놀이의발견" },
      naver:    { rate: 0.28, note: "네이버 예약" },
      coupang:  { rate: 0.25, note: "쿠팡" },
      kakao:    { rate: 0.22, note: "카카오" },
      yanolja:  { rate: 0.30, note: "야놀자" },
      yeogi:    { rate: 0.27, note: "여기어때" },
      gmarket:  { rate: 0.23, note: "지마켓" },
      "11st":   { rate: 0.25, note: "11번가" },
      auction:  { rate: 0.20, note: "옥션" },
      kidsnote: { rate: 0.30, note: "키즈노트" },
      mrt:      { rate: 0.18, note: "마이리얼트립" }
    }
  },

  // ─── 오션어드벤처 천안 ────────────────────────────────────
  ocean_ca: {
    name: "오션어드벤처 천안",
    homepageUrl: "https://www.oceanadventure.co.kr",
    pricePageUrl: "https://www.oceanadventure.co.kr",
    currentSeason: "봄 시즌",
    updatedAt: "2026-04-03",
    notice: "충남 천안",
    tickets: [
      {
        id: "day",
        label: "종일권",
        time: "오픈~마감",
        prices: { adult: 30000, child: 24000, youth: 27000 },
        note: ""
      },
      {
        id: "half",
        label: "반일권",
        time: "14:00~마감",
        prices: { adult: 24000, child: 19000, youth: 22000 },
        note: ""
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.30, note: "놀이의발견" },
      naver:    { rate: 0.25, note: "네이버 예약" },
      coupang:  { rate: 0.23, note: "쿠팡" },
      kakao:    { rate: 0.20, note: "카카오" },
      yanolja:  { rate: 0.25, note: "야놀자" },
      yeogi:    { rate: 0.22, note: "여기어때" },
      gmarket:  { rate: 0.20, note: "지마켓" },
      "11st":   { rate: 0.22, note: "11번가" },
      auction:  { rate: 0.18, note: "옥션" },
      kidsnote: { rate: 0.25, note: "키즈노트" },
      mrt:      { rate: 0.15, note: "마이리얼트립" }
    }
  },

  // ─── 파라다이스 도고 ──────────────────────────────────────
  paradise: {
    name: "파라다이스 도고",
    homepageUrl: "https://www.paradisedogo.com",
    pricePageUrl: "https://www.paradisedogo.com",
    currentSeason: "상시",
    updatedAt: "2026-04-03",
    notice: "충남 아산 / 호텔 연계 스파",
    tickets: [
      {
        id: "day",
        label: "온천 입장",
        time: "오픈~마감",
        prices: { adult: 38000, child: 28000, youth: 33000 },
        note: ""
      },
      {
        id: "package",
        label: "호텔 스파 패키지",
        time: "1박 포함",
        prices: { adult: 89000, child: null, youth: null },
        note: "1박 포함 / 커플·가족 추천"
      }
    ],
    channelDiscounts: {
      mrt:      { rate: 0.25, note: "마이리얼트립 — 호텔 패키지 포함" },
      nori:     { rate: 0.28, note: "놀이의발견" },
      naver:    { rate: 0.22, note: "네이버 예약" },
      yanolja:  { rate: 0.30, note: "야놀자 — 숙박 연계 특가" },
      yeogi:    { rate: 0.28, note: "여기어때 — 숙박 연계" },
      kakao:    { rate: 0.20, note: "카카오" },
      gmarket:  { rate: 0.18, note: "지마켓" },
      "11st":   { rate: 0.20, note: "11번가" },
      auction:  { rate: 0.17, note: "옥션" },
      kidsnote: { rate: 0.22, note: "키즈노트" }
    }
  },

  // ─── 에버랜드 ─────────────────────────────────────────────
  everland: {
    name: "에버랜드",
    homepageUrl: "https://www.everland.com",
    pricePageUrl: "https://reservation.everland.com",
    currentSeason: "A시즌 (봄 성수기)",
    updatedAt: "2026-04-03",
    notice: "4~5월 극성수기 / 50주년 기념 이벤트 진행 중",
    tickets: [
      {
        id: "day",
        label: "1일권",
        time: "개장~마감",
        prices: { adult: 72000, child: 58000, youth: 65000 },
        note: "소인: 36개월~만12세"
      },
      {
        id: "afternoon",
        label: "오후권 (after4)",
        time: "16:00~마감",
        prices: { adult: 52000, child: 42000, youth: 47000 },
        note: "16:00 이후 입장"
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.35, note: "놀이의발견" },
      naver:    { rate: 0.30, note: "네이버 예약" },
      coupang:  { rate: 0.28, note: "쿠팡" },
      kakao:    { rate: 0.25, note: "카카오" },
      yanolja:  { rate: 0.28, note: "야놀자" },
      yeogi:    { rate: 0.25, note: "여기어때" },
      gmarket:  { rate: 0.25, note: "지마켓" },
      "11st":   { rate: 0.27, note: "11번가" },
      auction:  { rate: 0.24, note: "옥션" },
      kidsnote: { rate: 0.30, note: "키즈노트" },
      mrt:      { rate: 0.20, note: "마이리얼트립" }
    }
  },

  // ─── 롯데월드 ─────────────────────────────────────────────
  lotte: {
    name: "롯데월드",
    homepageUrl: "https://www.lotteworld.com",
    pricePageUrl: "https://www.lotteworld.com/app/adv_ticket/list.asp",
    currentSeason: "2026 기준",
    updatedAt: "2026-04-03",
    notice: "서울 송파 / 실내·실외 통합",
    tickets: [
      {
        id: "day",
        label: "1일권",
        time: "개장~마감",
        prices: { adult: 72000, child: 58000, youth: 65000 },
        note: ""
      },
      {
        id: "evening",
        label: "야간권 (after4)",
        time: "16:00~마감",
        prices: { adult: 49000, child: 40000, youth: 44000 },
        note: ""
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.35, note: "놀이의발견" },
      naver:    { rate: 0.30, note: "네이버 예약" },
      coupang:  { rate: 0.28, note: "쿠팡" },
      kakao:    { rate: 0.25, note: "카카오" },
      yanolja:  { rate: 0.28, note: "야놀자" },
      yeogi:    { rate: 0.25, note: "여기어때" },
      gmarket:  { rate: 0.25, note: "지마켓" },
      "11st":   { rate: 0.27, note: "11번가" },
      auction:  { rate: 0.24, note: "옥션" },
      kidsnote: { rate: 0.30, note: "키즈노트" },
      mrt:      { rate: 0.20, note: "마이리얼트립" }
    }
  },

  // ─── 레고랜드 ─────────────────────────────────────────────
  lego: {
    name: "레고랜드",
    homepageUrl: "https://www.legoland.kr",
    pricePageUrl: "https://www.legoland.kr/plan-your-visit/tickets",
    currentSeason: "2026 기준",
    updatedAt: "2026-04-03",
    notice: "강원 춘천",
    tickets: [
      {
        id: "day",
        label: "1일권",
        time: "개장~마감",
        prices: { adult: 64000, child: 54000, youth: 59000 },
        note: ""
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.35, note: "놀이의발견" },
      naver:    { rate: 0.30, note: "네이버 예약" },
      coupang:  { rate: 0.28, note: "쿠팡" },
      kakao:    { rate: 0.25, note: "카카오" },
      yanolja:  { rate: 0.28, note: "야놀자" },
      yeogi:    { rate: 0.25, note: "여기어때" },
      gmarket:  { rate: 0.25, note: "지마켓" },
      "11st":   { rate: 0.27, note: "11번가" },
      auction:  { rate: 0.22, note: "옥션" },
      kidsnote: { rate: 0.30, note: "키즈노트" },
      mrt:      { rate: 0.20, note: "마이리얼트립" }
    }
  },

  // ─── 서울랜드 ─────────────────────────────────────────────
  seoul: {
    name: "서울랜드",
    homepageUrl: "https://www.seoulland.co.kr",
    pricePageUrl: "https://www.seoulland.co.kr",
    currentSeason: "2026 봄 시즌",
    updatedAt: "2026-04-03",
    notice: "경기 과천",
    tickets: [
      {
        id: "day",
        label: "자유이용권",
        time: "개장~마감",
        prices: { adult: 35000, child: 28000, youth: 32000 },
        note: ""
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.35, note: "놀이의발견" },
      naver:    { rate: 0.30, note: "네이버 예약" },
      coupang:  { rate: 0.28, note: "쿠팡" },
      kakao:    { rate: 0.25, note: "카카오" },
      yanolja:  { rate: 0.28, note: "야놀자" },
      yeogi:    { rate: 0.25, note: "여기어때" },
      gmarket:  { rate: 0.25, note: "지마켓" },
      "11st":   { rate: 0.27, note: "11번가" },
      auction:  { rate: 0.22, note: "옥션" },
      kidsnote: { rate: 0.32, note: "키즈노트" },
      mrt:      { rate: 0.18, note: "마이리얼트립" }
    }
  },

  // ─── 경주월드 ─────────────────────────────────────────────
  gyeongju: {
    name: "경주월드",
    homepageUrl: "https://www.gjworld.co.kr",
    pricePageUrl: "https://www.gjworld.co.kr",
    currentSeason: "2026 봄 시즌",
    updatedAt: "2026-04-03",
    notice: "경북 경주",
    tickets: [
      {
        id: "day",
        label: "자유이용권",
        time: "개장~마감",
        prices: { adult: 43000, child: 35000, youth: 38000 },
        note: ""
      }
    ],
    channelDiscounts: {
      nori:     { rate: 0.33, note: "놀이의발견" },
      naver:    { rate: 0.28, note: "네이버 예약" },
      coupang:  { rate: 0.26, note: "쿠팡" },
      kakao:    { rate: 0.22, note: "카카오" },
      yanolja:  { rate: 0.28, note: "야놀자" },
      yeogi:    { rate: 0.25, note: "여기어때" },
      gmarket:  { rate: 0.22, note: "지마켓" },
      "11st":   { rate: 0.24, note: "11번가" },
      auction:  { rate: 0.20, note: "옥션" },
      kidsnote: { rate: 0.28, note: "키즈노트" },
      mrt:      { rate: 0.18, note: "마이리얼트립" }
    }
  }
};

module.exports = { PARK_PRICES };
