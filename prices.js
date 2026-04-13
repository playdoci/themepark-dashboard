// ============================================================
// prices.js - 파크별 공식 홈페이지 확인 가격 데이터
// 마지막 업데이트: 2026년 4월 13일
// ============================================================

const PARK_PRICES = {
  "woojin": {
    "name": "웅진플레이도시",
    "homepageUrl": "https://www.playdoci.com",
    "pricePageUrl": "https://playdoci.com/Common/Pop_FeeInfo.aspx",
    "currentSeason": "로우 시즌 (2026.03.20~05.31)",
    "updatedAt": "2026-04-13",
    "notice": "매주 월·화 정기휴장 / 36개월 미만 무료",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "10:00~18:00",
        "prices": {
          "adult": 60000
        },
        "priceLabels": {
          "adult": "대인"
        }
      },
      {
        "id": "half",
        "label": "반일권",
        "time": "14:00~18:00",
        "prices": {
          "adult": 50000
        },
        "priceLabels": {
          "adult": "대인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 31000,
        "weekend": 35000,
        "note": "공홈 할인가"
      },
      "nori": {
        "weekday": 31900,
        "weekend": 35900,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 31900,
        "weekend": 35900,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 31900,
        "weekend": 35900,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 45000,
        "weekend": 45000,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 31900,
        "weekend": 35900,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 60000,
        "weekend": 60000,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 31900,
        "weekend": 35900,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 60000,
        "weekend": 60000,
        "note": "11번가"
      },
      "auction": {
        "weekday": 31900,
        "weekend": 35900,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 60000,
        "weekend": 60000,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 31900,
        "weekend": 35900,
        "note": "마이리얼트립"
      }
    }
  },
  "caribbean": {
    "name": "캐리비안베이",
    "homepageUrl": "https://www.everland.com/caribbeanbay/home/main",
    "pricePageUrl": "https://reservation.everland.com/web/cb.do?method=productMain",
    "currentSeason": "봄 시즌 (로우)",
    "updatedAt": "2026-04-13",
    "notice": "소인/경로: 36개월~만12세 및 경로 / 36개월 미만 무료",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "개장~마감",
        "prices": {
          "adult": 55000,
          "child": 44000
        },
        "priceLabels": {
          "adult": "대인",
          "child": "소인/경로"
        }
      },
      {
        "id": "afternoon",
        "label": "오후권",
        "time": "14:30~마감",
        "prices": {
          "adult": 47000,
          "child": 36000
        },
        "priceLabels": {
          "adult": "대인",
          "child": "소인/경로"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 55000,
        "weekend": 55000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 35750,
        "weekend": 35750,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 38500,
        "weekend": 38500,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 39600,
        "weekend": 39600,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 41250,
        "weekend": 41250,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 38500,
        "weekend": 38500,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 39600,
        "weekend": 39600,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 41250,
        "weekend": 41250,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 40150,
        "weekend": 40150,
        "note": "11번가"
      },
      "auction": {
        "weekday": 41800,
        "weekend": 41800,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 38500,
        "weekend": 38500,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 42900,
        "weekend": 42900,
        "note": "마이리얼트립"
      }
    }
  },
  "oceanworld": {
    "name": "오션월드",
    "homepageUrl": "https://www.sonohotelsresorts.com/oceanWorld",
    "pricePageUrl": "https://www.sonohotelsresorts.com/reserve/ticket/dtl?salesNo=10149",
    "currentSeason": "봄 시즌 (2026.03.21~)",
    "updatedAt": "2026-04-13",
    "notice": "대인=중학생 이상 / 소인=36개월~초등학생 / 매주 수요일 클린데이",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult_weekday": 45000,
          "adult_weekend": 45000,
          "child_weekday": 36000,
          "child_weekend": 36000
        },
        "priceLabels": {
          "adult_weekday": "주중 대인",
          "adult_weekend": "주말 대인",
          "child_weekday": "주중 소인",
          "child_weekend": "주말 소인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 45000,
        "weekend": 45000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 30150,
        "weekend": 30150,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 31500,
        "weekend": 31500,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 33750,
        "weekend": 33750,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 35100,
        "weekend": 35100,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 31500,
        "weekend": 31500,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 32400,
        "weekend": 32400,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 33750,
        "weekend": 33750,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 32850,
        "weekend": 32850,
        "note": "11번가"
      },
      "auction": {
        "weekday": 34200,
        "weekend": 34200,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 31500,
        "weekend": 31500,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 36000,
        "weekend": 36000,
        "note": "마이리얼트립"
      }
    }
  },
  "onmount": {
    "name": "원마운트",
    "homepageUrl": "https://www.onmount.co.kr",
    "pricePageUrl": "https://www.onmount.co.kr",
    "currentSeason": "봄 시즌",
    "updatedAt": "2026-04-13",
    "notice": "경기 고양 / 지하철 3호선 정발산역 도보 10분",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult_weekday": 49000,
          "adult_weekend": 55000
        },
        "priceLabels": {
          "adult_weekday": "주중 대인",
          "adult_weekend": "주말 대인"
        }
      },
      {
        "id": "afternoon",
        "label": "오후권",
        "time": "14:00~마감",
        "prices": {
          "adult_weekday": 39000,
          "adult_weekend": 45000
        },
        "priceLabels": {
          "adult_weekday": "주중 대인",
          "adult_weekend": "주말 대인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 49000,
        "weekend": 55000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 31850,
        "weekend": 35750,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 34300,
        "weekend": 38500,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 35280,
        "weekend": 39600,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 36750,
        "weekend": 41250,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 34300,
        "weekend": 38500,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 35280,
        "weekend": 39600,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 36750,
        "weekend": 41250,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 35770,
        "weekend": 40150,
        "note": "11번가"
      },
      "auction": {
        "weekday": 37240,
        "weekend": 41800,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 33320,
        "weekend": 37400,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 38220,
        "weekend": 42900,
        "note": "마이리얼트립"
      }
    }
  },
  "termeden": {
    "name": "테르메덴",
    "homepageUrl": "https://www.termeden.com",
    "pricePageUrl": "https://www.termeden.com",
    "currentSeason": "상시 운영",
    "updatedAt": "2026-04-13",
    "notice": "경기 여주 / 천연 온천수",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult": 38000,
          "child": 28000
        },
        "priceLabels": {
          "adult": "대인",
          "child": "소인"
        }
      },
      {
        "id": "afternoon",
        "label": "오후권",
        "time": "14:00~마감",
        "prices": {
          "adult": 30000
        },
        "priceLabels": {
          "adult": "대인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 38000,
        "weekend": 38000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 26600,
        "weekend": 26600,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 26600,
        "weekend": 26600,
        "note": "네이버 예약"
      },
      "kakao": {
        "weekday": 28500,
        "weekend": 28500,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 27360,
        "weekend": 27360,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 27360,
        "weekend": 27360,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 28500,
        "weekend": 28500,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 27740,
        "weekend": 27740,
        "note": "11번가"
      },
      "auction": {
        "weekday": 28880,
        "weekend": 28880,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 25840,
        "weekend": 25840,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 29640,
        "weekend": 29640,
        "note": "마이리얼트립"
      }
    }
  },
  "islandcastle": {
    "name": "아일랜드캐슬",
    "homepageUrl": "https://www.islandcastle.co.kr",
    "pricePageUrl": "https://www.islandcastle.co.kr",
    "currentSeason": "봄 시즌",
    "updatedAt": "2026-04-13",
    "notice": "경기 가평 / 청평 호반",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult": 44000
        },
        "priceLabels": {
          "adult": "대인"
        }
      },
      {
        "id": "afternoon",
        "label": "오후권",
        "time": "14:00~마감",
        "prices": {
          "adult": 36000
        },
        "priceLabels": {
          "adult": "대인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 44000,
        "weekend": 44000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 29480,
        "weekend": 29480,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 30800,
        "weekend": 30800,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 32560,
        "weekend": 32560,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 33000,
        "weekend": 33000,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 30800,
        "weekend": 30800,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 31680,
        "weekend": 31680,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 33000,
        "weekend": 33000,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 32120,
        "weekend": 32120,
        "note": "11번가"
      },
      "auction": {
        "weekday": 33440,
        "weekend": 33440,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 29920,
        "weekend": 29920,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 34320,
        "weekend": 34320,
        "note": "마이리얼트립"
      }
    }
  },
  "aquafield": {
    "name": "아쿠아필드 하남",
    "homepageUrl": "https://www.starfield.co.kr/hanam/store/aquafield",
    "pricePageUrl": "https://www.starfield.co.kr/hanam/store/aquafield",
    "currentSeason": "상시 (주중·주말 구분)",
    "updatedAt": "2026-04-13",
    "notice": "경기 하남 스타필드 내 / 찜질스파·워터파크·멀티패스 구분",
    "ticketNote": "(워터파크 기준)",
    "tickets": [
      {
        "id": "weekday",
        "label": "종일권",
        "time": "주중",
        "prices": {
          "adult": 48000,
          "child": 36000
        },
        "priceLabels": {
          "adult": "대인",
          "child": "소인"
        }
      },
      {
        "id": "weekend",
        "label": "종일권",
        "time": "주말·공휴일",
        "prices": {
          "adult": 58000,
          "child": 44000
        },
        "priceLabels": {
          "adult": "대인",
          "child": "소인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 48000,
        "weekend": 58000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 32160,
        "weekend": 38860,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 33600,
        "weekend": 40600,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 35520,
        "weekend": 42920,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 36000,
        "weekend": 43500,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 33600,
        "weekend": 40600,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 34560,
        "weekend": 41760,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 36000,
        "weekend": 43500,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 35040,
        "weekend": 42340,
        "note": "11번가"
      },
      "auction": {
        "weekday": 36480,
        "weekend": 44080,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 32640,
        "weekend": 39440,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 37440,
        "weekend": 45240,
        "note": "마이리얼트립"
      }
    }
  },
  "asanspa": {
    "name": "아산스파비스",
    "homepageUrl": "https://www.spabis.co.kr",
    "pricePageUrl": "https://www.spabis.co.kr",
    "currentSeason": "상시",
    "updatedAt": "2026-04-13",
    "notice": "충남 아산",
    "ticketNote": "(스파 기준)",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult": 32000
        },
        "priceLabels": {
          "adult": "대인"
        }
      },
      {
        "id": "afternoon",
        "label": "오후권",
        "time": "14:00~마감",
        "prices": {
          "adult": 25000
        },
        "priceLabels": {
          "adult": "대인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 32000,
        "weekend": 36000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 22400,
        "weekend": 25200,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 22400,
        "weekend": 25200,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 23680,
        "weekend": 26640,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 24000,
        "weekend": 27000,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 22400,
        "weekend": 25200,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 23040,
        "weekend": 25920,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 24000,
        "weekend": 27000,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 23360,
        "weekend": 26280,
        "note": "11번가"
      },
      "auction": {
        "weekday": 24320,
        "weekend": 27360,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 21760,
        "weekend": 24480,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 25600,
        "weekend": 28800,
        "note": "마이리얼트립"
      }
    }
  },
  "splash": {
    "name": "스플라스리솜",
    "homepageUrl": "https://www.resort.co.kr/splashresort",
    "pricePageUrl": "https://www.resort.co.kr/splashresort",
    "currentSeason": "7월 리뉴얼 오픈 예정",
    "updatedAt": "2026-04-13",
    "notice": "충북 제천 / 7월 리뉴얼 후 재오픈",
    "ticketNote": "(스파/워터파크 기준)",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult": 52000,
          "child": 40000
        },
        "priceLabels": {
          "adult": "대인",
          "child": "소인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 52000,
        "weekend": 52000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 34840,
        "weekend": 34840,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 36400,
        "weekend": 36400,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 37440,
        "weekend": 37440,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 39000,
        "weekend": 39000,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 36400,
        "weekend": 36400,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 37440,
        "weekend": 37440,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 39000,
        "weekend": 39000,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 37960,
        "weekend": 37960,
        "note": "11번가"
      },
      "auction": {
        "weekday": 39520,
        "weekend": 39520,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 35360,
        "weekend": 35360,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 40560,
        "weekend": 40560,
        "note": "마이리얼트립"
      }
    }
  },
  "ocean_ca": {
    "name": "오션어드벤처 천안",
    "homepageUrl": "https://www.oceanadventure.co.kr",
    "pricePageUrl": "https://www.oceanadventure.co.kr",
    "currentSeason": "봄 시즌",
    "updatedAt": "2026-04-13",
    "notice": "충남 천안",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult_weekday": 30000,
          "adult_weekend": 35000,
          "child_weekday": 24000,
          "child_weekend": 28000
        },
        "priceLabels": {
          "adult_weekday": "주중 대인",
          "adult_weekend": "주말 대인",
          "child_weekday": "주중 소인",
          "child_weekend": "주말 소인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 30000,
        "weekend": 35000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 21000,
        "weekend": 24500,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 21000,
        "weekend": 24500,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 22200,
        "weekend": 25900,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 22500,
        "weekend": 26250,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 21000,
        "weekend": 24500,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 21600,
        "weekend": 25200,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 22500,
        "weekend": 26250,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 21900,
        "weekend": 25550,
        "note": "11번가"
      },
      "auction": {
        "weekday": 22800,
        "weekend": 26600,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 20400,
        "weekend": 23800,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 24000,
        "weekend": 28000,
        "note": "마이리얼트립"
      }
    }
  },
  "paradise": {
    "name": "파라다이스 도고",
    "homepageUrl": "https://www.paradisedogo.com",
    "pricePageUrl": "https://www.paradisedogo.com",
    "currentSeason": "상시",
    "updatedAt": "2026-04-13",
    "notice": "충남 아산 / 호텔 연계 스파",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult_weekday": 35000,
          "adult_weekend": 40000
        },
        "priceLabels": {
          "adult_weekday": "주중 대인",
          "adult_weekend": "주말 대인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 35000,
        "weekend": 40000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 25200,
        "weekend": 28800,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 24500,
        "weekend": 28000,
        "note": "네이버 예약"
      },
      "kakao": {
        "weekday": 26250,
        "weekend": 30000,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 24500,
        "weekend": 28000,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 25200,
        "weekend": 28800,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 26250,
        "weekend": 30000,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 25550,
        "weekend": 29200,
        "note": "11번가"
      },
      "auction": {
        "weekday": 26600,
        "weekend": 30400,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 23800,
        "weekend": 27200,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 26250,
        "weekend": 30000,
        "note": "마이리얼트립"
      }
    }
  },
  "everland": {
    "name": "에버랜드",
    "homepageUrl": "https://www.everland.com",
    "pricePageUrl": "https://reservation.everland.com",
    "currentSeason": "A시즌 (봄 성수기)",
    "updatedAt": "2026-04-13",
    "notice": "시즌 3분류 (A·B·C) / 소인/경로: 36개월~만12세 및 경로",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "개장~마감",
        "prices": {
          "adult": 72000,
          "child": 58000
        },
        "priceLabels": {
          "adult": "대인",
          "child": "소인/경로"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 72000,
        "weekend": 72000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 46800,
        "weekend": 46800,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 50400,
        "weekend": 50400,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 51840,
        "weekend": 51840,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 54000,
        "weekend": 54000,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 50400,
        "weekend": 50400,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 51840,
        "weekend": 51840,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 54000,
        "weekend": 54000,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 52560,
        "weekend": 52560,
        "note": "11번가"
      },
      "auction": {
        "weekday": 54720,
        "weekend": 54720,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 48960,
        "weekend": 48960,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 57600,
        "weekend": 57600,
        "note": "마이리얼트립"
      }
    }
  },
  "lotte": {
    "name": "롯데월드",
    "homepageUrl": "https://www.lotteworld.com",
    "pricePageUrl": "https://www.lotteworld.com/app/adv_ticket/list.asp",
    "currentSeason": "2026 기준",
    "updatedAt": "2026-04-13",
    "notice": "베이비: 36개월~만4세 / 소인: 만5세~만12세 / 청소년: 만13세~만18세",
    "tickets": [
      {
        "id": "day",
        "label": "종일권 (1Day)",
        "time": "개장~마감",
        "prices": {
          "adult": 72000,
          "youth": 63000,
          "child": 54000,
          "baby": 45000
        },
        "priceLabels": {
          "adult": "대인",
          "youth": "청소년",
          "child": "소인",
          "baby": "베이비"
        }
      },
      {
        "id": "evening",
        "label": "야간권 (After4)",
        "time": "16:00~마감",
        "prices": {
          "adult": 49000,
          "youth": 43000,
          "child": 37000,
          "baby": 31000
        },
        "priceLabels": {
          "adult": "대인",
          "youth": "청소년",
          "child": "소인",
          "baby": "베이비"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 72000,
        "weekend": 72000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 46800,
        "weekend": 46800,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 50400,
        "weekend": 50400,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 51840,
        "weekend": 51840,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 54000,
        "weekend": 54000,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 50400,
        "weekend": 50400,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 51840,
        "weekend": 51840,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 54000,
        "weekend": 54000,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 52560,
        "weekend": 52560,
        "note": "11번가"
      },
      "auction": {
        "weekday": 54720,
        "weekend": 54720,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 48960,
        "weekend": 48960,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 57600,
        "weekend": 57600,
        "note": "마이리얼트립"
      }
    }
  },
  "seoul": {
    "name": "서울랜드",
    "homepageUrl": "https://www.seoulland.co.kr",
    "pricePageUrl": "https://www.seoulland.co.kr",
    "currentSeason": "2026 봄 시즌",
    "updatedAt": "2026-04-13",
    "notice": "경기 과천",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "개장~마감",
        "prices": {
          "adult": 35000,
          "youth": 30000,
          "child": 26000
        },
        "priceLabels": {
          "adult": "대인",
          "youth": "청소년",
          "child": "소인"
        }
      },
      {
        "id": "evening",
        "label": "야간권",
        "time": "16:00~마감",
        "prices": {
          "adult": 25000,
          "youth": 22000,
          "child": 19000
        },
        "priceLabels": {
          "adult": "대인",
          "youth": "청소년",
          "child": "소인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 35000,
        "weekend": 35000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 22750,
        "weekend": 22750,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 24500,
        "weekend": 24500,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 25200,
        "weekend": 25200,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 26250,
        "weekend": 26250,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 24500,
        "weekend": 24500,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 25200,
        "weekend": 25200,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 26250,
        "weekend": 26250,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 25550,
        "weekend": 25550,
        "note": "11번가"
      },
      "auction": {
        "weekday": 26600,
        "weekend": 26600,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 23800,
        "weekend": 23800,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 28000,
        "weekend": 28000,
        "note": "마이리얼트립"
      }
    }
  },
  "gyeongju": {
    "name": "경주월드",
    "homepageUrl": "https://www.gjworld.co.kr",
    "pricePageUrl": "https://www.gjworld.co.kr",
    "currentSeason": "2026 봄 시즌",
    "updatedAt": "2026-04-13",
    "notice": "경북 경주",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "개장~마감",
        "prices": {
          "adult": 43000,
          "youth": 38000,
          "child": 35000
        },
        "priceLabels": {
          "adult": "대인",
          "youth": "청소년",
          "child": "소인"
        }
      },
      {
        "id": "afternoon",
        "label": "오후권",
        "time": "평일 15:00~ / 휴일 16:00~",
        "prices": {
          "adult": 35000,
          "youth": 31000,
          "child": 28000
        },
        "priceLabels": {
          "adult": "대인",
          "youth": "청소년",
          "child": "소인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 43000,
        "weekend": 43000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 28810,
        "weekend": 28810,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 30100,
        "weekend": 30100,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 31820,
        "weekend": 31820,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 32250,
        "weekend": 32250,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 30100,
        "weekend": 30100,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 30960,
        "weekend": 30960,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 32250,
        "weekend": 32250,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 31390,
        "weekend": 31390,
        "note": "11번가"
      },
      "auction": {
        "weekday": 32680,
        "weekend": 32680,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 29240,
        "weekend": 29240,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 33540,
        "weekend": 33540,
        "note": "마이리얼트립"
      }
    }
  },
  "lego": {
    "name": "레고랜드",
    "homepageUrl": "https://www.legoland.kr",
    "pricePageUrl": "https://www.legoland.kr/plan-your-visit/tickets",
    "currentSeason": "2026 기준",
    "updatedAt": "2026-04-13",
    "notice": "강원 춘천",
    "tickets": [
      {
        "id": "day",
        "label": "1일권",
        "time": "개장~마감",
        "prices": {
          "adult": 64000,
          "child": 54000
        },
        "priceLabels": {
          "adult": "대인",
          "child": "소인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 64000,
        "weekend": 64000,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 41600,
        "weekend": 41600,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 44800,
        "weekend": 44800,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 46080,
        "weekend": 46080,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 48000,
        "weekend": 48000,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 44800,
        "weekend": 44800,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 46080,
        "weekend": 46080,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 48000,
        "weekend": 48000,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 46720,
        "weekend": 46720,
        "note": "11번가"
      },
      "auction": {
        "weekday": 48640,
        "weekend": 48640,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 43520,
        "weekend": 43520,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 51200,
        "weekend": 51200,
        "note": "마이리얼트립"
      }
    }
  }
};

module.exports = { PARK_PRICES };
