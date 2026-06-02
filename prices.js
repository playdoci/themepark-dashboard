// ============================================================
// prices.js - 파크별 실제 가격 데이터
// 마지막 업데이트: 2026년 6월 2일
// ============================================================

const PARK_PRICES = {
  "woojin": {
    "name": "웅진플레이도시",
    "homepageUrl": "https://www.playdoci.com",
    "pricePageUrl": "https://www.playdoci.com/water/info_charge.aspx",
    "currentSeason": "하이시즌 (2026.06.03.~07.16)  / 골드시즌(2026.07.17.~08.17.)",
    "updatedAt": "2026-06-02",
    "notice": "매주 월·화 정기휴장 / 36개월 미만 무료",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "10:00~18:00",
        "prices": {
          "adult": 65000
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
          "adult": 55000
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
        "active": true,
        "note": "공홈 할인가",
        "alwaysShow": true,
        "ticketPrices": {
          "half": {
            "weekday": 26000,
            "weekend": 32000
          }
        },
        "startDate": "2026-06-03",
        "endDate": "2026-07-16",
        "isSale": false
      },
      "nori": {
        "weekday": 37200,
        "weekend": 37200,
        "active": false,
        "note": "놀이의발견",
        "alwaysShow": false,
        "ticketPrices": {
          "half": {
            "weekday": 0,
            "weekend": 0
          }
        },
        "isSale": false
      },
      "naver": {
        "weekday": 32900,
        "weekend": 36900,
        "active": true,
        "note": "네이버 예약",
        "alwaysShow": true,
        "ticketPrices": {
          "half": {
            "weekday": 26900,
            "weekend": 32900
          }
        },
        "startDate": "2026-06-03",
        "endDate": "2026-07-16",
        "isSale": false
      },
      "coupang": {
        "weekday": 35000,
        "weekend": 35000,
        "active": true,
        "note": "쿠팡",
        "alwaysShow": false,
        "startDate": "2026-06-18",
        "endDate": "2026-06-20",
        "ticketPrices": {
          "half": {
            "weekday": 31000,
            "weekend": 31000
          }
        },
        "isSale": true
      },
      "kakao": {
        "weekday": 45000,
        "weekend": 45000,
        "active": false,
        "note": "카카오",
        "alwaysShow": false,
        "ticketPrices": {
          "half": {
            "weekday": 0,
            "weekend": 0
          }
        },
        "isSale": false
      },
      "yanolja": {
        "weekday": 42000,
        "weekend": 42000,
        "active": false,
        "note": "야놀자",
        "alwaysShow": false,
        "ticketPrices": {
          "half": {
            "weekday": 0,
            "weekend": 0
          }
        },
        "isSale": false
      },
      "yeogi": {
        "weekday": 43200,
        "weekend": 43200,
        "active": false,
        "note": "여기어때",
        "alwaysShow": false,
        "ticketPrices": {
          "half": {
            "weekday": 0,
            "weekend": 0
          }
        },
        "isSale": false
      },
      "gmarket": {
        "weekday": 45000,
        "weekend": 45000,
        "active": false,
        "note": "지마켓",
        "alwaysShow": false,
        "ticketPrices": {
          "half": {
            "weekday": 0,
            "weekend": 0
          }
        },
        "isSale": false
      },
      "11st": {
        "weekday": 43800,
        "weekend": 43800,
        "active": false,
        "note": "11번가",
        "alwaysShow": false,
        "ticketPrices": {
          "half": {
            "weekday": 0,
            "weekend": 0
          }
        },
        "isSale": false
      },
      "auction": {
        "weekday": 45600,
        "weekend": 45600,
        "active": false,
        "note": "옥션",
        "alwaysShow": false,
        "ticketPrices": {
          "half": {
            "weekday": 0,
            "weekend": 0
          }
        },
        "isSale": false
      },
      "kidsnote": {
        "weekday": 40800,
        "weekend": 40800,
        "active": false,
        "note": "키즈노트",
        "alwaysShow": false,
        "ticketPrices": {
          "half": {
            "weekday": 0,
            "weekend": 0
          }
        },
        "isSale": false
      },
      "mrt": {
        "weekday": 46800,
        "weekend": 46800,
        "active": false,
        "note": "마이리얼트립",
        "alwaysShow": false,
        "ticketPrices": {
          "half": {
            "weekday": 0,
            "weekend": 0
          }
        },
        "isSale": false
      },
      "custom_1780275214268": {
        "weekday": 29900,
        "weekend": 29900,
        "active": true,
        "alwaysShow": false,
        "note": "네이버라이브",
        "ticketPrices": {
          "half": {
            "weekday": 24900,
            "weekend": 24900
          }
        },
        "startDate": "2026-06-02",
        "endDate": "2026-06-07",
        "isSale": true
      }
    },
    "operatingHours": {
      "weekday": "",
      "weekend": ""
    }
  },
  "caribbean": {
    "name": "캐리비안베이",
    "homepageUrl": "https://www.everland.com/caribbeanbay/home/main",
    "pricePageUrl": "https://www.everland.com/caribbeanbay/promotion/usage-fee",
    "currentSeason": "봄 시즌 (로우)",
    "updatedAt": "2026-04-14",
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
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 35750,
        "weekend": 35750,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 38500,
        "weekend": 38500,
        "active": true,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 39600,
        "weekend": 39600,
        "active": false,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 41250,
        "weekend": 41250,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 38500,
        "weekend": 38500,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 39600,
        "weekend": 39600,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 41250,
        "weekend": 41250,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 40150,
        "weekend": 40150,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 41800,
        "weekend": 41800,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 38500,
        "weekend": 38500,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 42900,
        "weekend": 42900,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "oceanworld": {
    "name": "오션월드",
    "homepageUrl": "https://www.sonohotelsresorts.com/oceanWorld",
    "pricePageUrl": "https://www.sonohotelsresorts.com/reserve/ticket/dtl?salesNo=10149",
    "currentSeason": "봄 시즌 (2026.03.21~)",
    "updatedAt": "2026-04-14",
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
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 30150,
        "weekend": 30150,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 31500,
        "weekend": 31500,
        "active": true,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 33750,
        "weekend": 33750,
        "active": false,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 35100,
        "weekend": 35100,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 31500,
        "weekend": 31500,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 32400,
        "weekend": 32400,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 33750,
        "weekend": 33750,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 32850,
        "weekend": 32850,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 34200,
        "weekend": 34200,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 31500,
        "weekend": 31500,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 36000,
        "weekend": 36000,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "onmount": {
    "name": "원마운트",
    "homepageUrl": "https://onemount.co.kr/ko/",
    "pricePageUrl": "https://onemount.co.kr/ko/page/theme/water/fee.php",
    "currentSeason": "봄 시즌",
    "updatedAt": "2026-04-14",
    "notice": "경기 일산 / 지하철 3호선 정발산역 도보 10분",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult_weekday": 65000,
          "adult_weekend": 65000
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
          "adult_weekday": 50000,
          "adult_weekend": 50000
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
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 31850,
        "weekend": 35750,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 34300,
        "weekend": 38500,
        "active": false,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 35280,
        "weekend": 39600,
        "active": false,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 36750,
        "weekend": 41250,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 34300,
        "weekend": 38500,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 35280,
        "weekend": 39600,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 36750,
        "weekend": 41250,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 35770,
        "weekend": 40150,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 37240,
        "weekend": 41800,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 33320,
        "weekend": 37400,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 38220,
        "weekend": 42900,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "islandcastle": {
    "name": "아일랜드캐슬",
    "homepageUrl": "https://island-castle.com/",
    "pricePageUrl": "https://island-castle.com/bbs/board.php?bo_table=free",
    "currentSeason": "봄 시즌",
    "updatedAt": "2026-04-14",
    "notice": "경기 의정부",
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
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 29480,
        "weekend": 29480,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 30800,
        "weekend": 30800,
        "active": true,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 32560,
        "weekend": 32560,
        "active": false,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 33000,
        "weekend": 33000,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 30800,
        "weekend": 30800,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 31680,
        "weekend": 31680,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 33000,
        "weekend": 33000,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 32120,
        "weekend": 32120,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 33440,
        "weekend": 33440,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 29920,
        "weekend": 29920,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 34320,
        "weekend": 34320,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "termeden": {
    "name": "테르메덴",
    "homepageUrl": "https://www.termeden.com",
    "pricePageUrl": "https://termeden.com/poolspa_infomation_use.html",
    "currentSeason": "미들시즌(2026.04.24.~06.30.)",
    "updatedAt": "2026-06-01",
    "notice": "경기 이천 / 천연 온천수",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult": 49000,
          "child": 40000
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
          "adult": 27000
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
        "active": true,
        "note": "공홈 정가",
        "alwaysShow": false,
        "ticketPrices": {
          "afternoon": {
            "weekday": 0,
            "weekend": 0
          }
        }
      },
      "nori": {
        "weekday": 26600,
        "weekend": 26600,
        "active": false,
        "note": "놀이의발견",
        "alwaysShow": false,
        "ticketPrices": {
          "afternoon": {
            "weekday": 0,
            "weekend": 0
          }
        }
      },
      "naver": {
        "weekday": 26600,
        "weekend": 26600,
        "active": true,
        "note": "네이버 예약",
        "alwaysShow": false,
        "ticketPrices": {
          "afternoon": {
            "weekday": 0,
            "weekend": 0
          }
        }
      },
      "kakao": {
        "weekday": 29400,
        "weekend": 29400,
        "active": true,
        "note": "카카오",
        "alwaysShow": true,
        "startDate": "2026-06-01",
        "endDate": "2026-06-02",
        "ticketPrices": {
          "afternoon": {
            "weekday": 0,
            "weekend": 0
          }
        }
      },
      "yanolja": {
        "weekday": 27360,
        "weekend": 27360,
        "active": false,
        "note": "야놀자",
        "alwaysShow": false,
        "ticketPrices": {
          "afternoon": {
            "weekday": 0,
            "weekend": 0
          }
        }
      },
      "yeogi": {
        "weekday": 27360,
        "weekend": 27360,
        "active": false,
        "note": "여기어때",
        "alwaysShow": false,
        "ticketPrices": {
          "afternoon": {
            "weekday": 0,
            "weekend": 0
          }
        }
      },
      "gmarket": {
        "weekday": 28500,
        "weekend": 28500,
        "active": false,
        "note": "지마켓",
        "alwaysShow": false,
        "ticketPrices": {
          "afternoon": {
            "weekday": 0,
            "weekend": 0
          }
        }
      },
      "11st": {
        "weekday": 27740,
        "weekend": 27740,
        "active": false,
        "note": "11번가",
        "alwaysShow": false,
        "ticketPrices": {
          "afternoon": {
            "weekday": 0,
            "weekend": 0
          }
        }
      },
      "auction": {
        "weekday": 28880,
        "weekend": 28880,
        "active": false,
        "note": "옥션",
        "alwaysShow": false,
        "ticketPrices": {
          "afternoon": {
            "weekday": 0,
            "weekend": 0
          }
        }
      },
      "kidsnote": {
        "weekday": 25840,
        "weekend": 25840,
        "active": false,
        "note": "키즈노트",
        "alwaysShow": false,
        "ticketPrices": {
          "afternoon": {
            "weekday": 0,
            "weekend": 0
          }
        }
      },
      "mrt": {
        "weekday": 29640,
        "weekend": 29640,
        "active": false,
        "note": "마이리얼트립",
        "alwaysShow": false,
        "ticketPrices": {
          "afternoon": {
            "weekday": 0,
            "weekend": 0
          }
        }
      }
    },
    "operatingHours": {
      "weekday": "",
      "weekend": ""
    }
  },
  "paradise_city": {
    "name": "파라다이스시티 씨메르",
    "homepageUrl": "https://www.p-city.com/front/cimer/overview",
    "pricePageUrl": "https://www.p-city.com/front/cimer/operation",
    "currentSeason": "상시",
    "updatedAt": "2026-04-14",
    "notice": "인천 영종도 / 파라다이스시티 호텔 내",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult": 55000,
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
        "weekday": 55000,
        "weekend": 65000,
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 38500,
        "weekend": 45500,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 38500,
        "weekend": 45500,
        "active": true,
        "note": "네이버 예약"
      },
      "yanolja": {
        "weekday": 38500,
        "weekend": 45500,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 40000,
        "weekend": 47000,
        "active": false,
        "note": "여기어때"
      },
      "mrt": {
        "weekday": 41000,
        "weekend": 48000,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "inspire": {
    "name": "인스파이어 스플래시 베이",
    "homepageUrl": "https://www.inspireresorts.com/ko/splash-bay",
    "pricePageUrl": "https://www.inspireresorts.com/ko/splash-bay/facilities/splash-bay-dome",
    "currentSeason": "상시",
    "updatedAt": "2026-04-14",
    "notice": "인천 영종도 / 인스파이어 엔터테인먼트 리조트 내",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult": 60000,
          "child": 45000
        },
        "priceLabels": {
          "adult": "대인",
          "child": "소인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 60000,
        "weekend": 70000,
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 42000,
        "weekend": 49000,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 42000,
        "weekend": 49000,
        "active": true,
        "note": "네이버 예약"
      },
      "yanolja": {
        "weekday": 42000,
        "weekend": 49000,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 43500,
        "weekend": 50500,
        "active": false,
        "note": "여기어때"
      },
      "mrt": {
        "weekday": 45000,
        "weekend": 52000,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "aquafield": {
    "name": "아쿠아필드 하남",
    "homepageUrl": "https://www.aquafield.co.kr/index.html",
    "pricePageUrl": "https://www.aquafield.co.kr/usage.html",
    "currentSeason": "상시 (주중·주말 구분)",
    "updatedAt": "2026-04-14",
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
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 32160,
        "weekend": 38860,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 33600,
        "weekend": 40600,
        "active": true,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 35520,
        "weekend": 42920,
        "active": false,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 36000,
        "weekend": 43500,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 33600,
        "weekend": 40600,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 34560,
        "weekend": 41760,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 36000,
        "weekend": 43500,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 35040,
        "weekend": 42340,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 36480,
        "weekend": 44080,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 32640,
        "weekend": 39440,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 37440,
        "weekend": 45240,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "asanspa": {
    "name": "아산스파비스",
    "homepageUrl": "https://www.spavis.co.kr",
    "pricePageUrl": "https://www.spavis.co.kr/reservation.guide.asp",
    "currentSeason": "상시",
    "updatedAt": "2026-04-14",
    "notice": "충남 아산",
    "ticketNote": "(스파 기준)",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult": 50000
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
          "adult": 20000
        },
        "priceLabels": {
          "adult": "대인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 50000,
        "weekend": 50000,
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 22400,
        "weekend": 25200,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 28000,
        "weekend": 28000,
        "active": true,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 23680,
        "weekend": 26640,
        "active": false,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 24000,
        "weekend": 27000,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 22400,
        "weekend": 25200,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 23040,
        "weekend": 25920,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 24000,
        "weekend": 27000,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 23360,
        "weekend": 26280,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 24320,
        "weekend": 27360,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 21760,
        "weekend": 24480,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 25600,
        "weekend": 28800,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "splash": {
    "name": "스플라스리솜",
    "homepageUrl": "https://www.resom.co.kr/spa/water/intd.asp",
    "pricePageUrl": "https://www.resom.co.kr/spa/water/usage_fee.asp",
    "currentSeason": "7월 리뉴얼 오픈 예정",
    "updatedAt": "2026-04-14",
    "notice": "충북 제천 / 7월 리뉴얼 후 재오픈",
    "ticketNote": "(스파/워터파크 기준)",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult": 55000,
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
        "weekday": 55000,
        "weekend": 55000,
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 34840,
        "weekend": 34840,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 36400,
        "weekend": 36400,
        "active": false,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 37440,
        "weekend": 37440,
        "active": false,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 39000,
        "weekend": 39000,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 36400,
        "weekend": 36400,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 37440,
        "weekend": 37440,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 39000,
        "weekend": 39000,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 37960,
        "weekend": 37960,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 39520,
        "weekend": 39520,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 35360,
        "weekend": 35360,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 40560,
        "weekend": 40560,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "ocean_ca": {
    "name": "오션어드벤처 천안",
    "homepageUrl": "https://www.sonohotelsresorts.com/oceanadventure_car",
    "pricePageUrl": "https://www.sonohotelsresorts.com/oceanadventure_ca/discount",
    "currentSeason": "미들시즌 (2026.04.25.~06.19.)  / 하이시즌 (2026.06.20.~07.10.)",
    "updatedAt": "2026-06-01",
    "notice": "충남 천안",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult_weekday": 55000,
          "adult_weekend": 60000,
          "child_weekday": 45000,
          "child_weekend": 50000
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
        "weekday": 55000,
        "weekend": 60000,
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 21000,
        "weekend": 24500,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 37000,
        "weekend": 41000,
        "active": true,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 22200,
        "weekend": 25900,
        "active": false,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 22500,
        "weekend": 26250,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 21000,
        "weekend": 24500,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 21600,
        "weekend": 25200,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 22500,
        "weekend": 26250,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 21900,
        "weekend": 25550,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 22800,
        "weekend": 26600,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 20400,
        "weekend": 23800,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 24000,
        "weekend": 28000,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "paradise": {
    "name": "파라다이스 도고",
    "homepageUrl": "https://www.paradisespa.co.kr/",
    "pricePageUrl": "https://www.paradisespa.co.kr/Guidance/ServiceTime.do?MM=202",
    "currentSeason": "상시",
    "updatedAt": "2026-04-14",
    "notice": "충남 아산 / 호텔 연계 스파",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "오픈~마감",
        "prices": {
          "adult_weekday": 45000,
          "adult_weekend": 53000
        },
        "priceLabels": {
          "adult_weekday": "주중 대인",
          "adult_weekend": "주말 대인"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 45000,
        "weekend": 53000,
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 25200,
        "weekend": 28800,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 36500,
        "weekend": 43500,
        "active": true,
        "note": "네이버 예약"
      },
      "kakao": {
        "weekday": 26250,
        "weekend": 30000,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 24500,
        "weekend": 28000,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 25200,
        "weekend": 28800,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 26250,
        "weekend": 30000,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 25550,
        "weekend": 29200,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 26600,
        "weekend": 30400,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 23800,
        "weekend": 27200,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 26250,
        "weekend": 30000,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "everland": {
    "name": "에버랜드",
    "homepageUrl": "https://www.everland.com/everland/home/main",
    "pricePageUrl": "https://reservation.everland.com/web/el.do?method=productMain&",
    "currentSeason": "A시즌 (봄 성수기)",
    "updatedAt": "2026-04-14",
    "notice": "시즌 3분류 (A·B·C) / 소인/경로: 36개월~만12세 및 경로",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "개장~마감",
        "prices": {
          "adult": 62000,
          "child": 52000
        },
        "priceLabels": {
          "adult": "대인",
          "child": "소인/경로"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 43000,
        "weekend": 36000,
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 46800,
        "weekend": 46800,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 41000,
        "weekend": 41000,
        "active": true,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 51840,
        "weekend": 51840,
        "active": false,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 54000,
        "weekend": 54000,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 50400,
        "weekend": 50400,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 51840,
        "weekend": 51840,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 54000,
        "weekend": 54000,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 52560,
        "weekend": 52560,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 54720,
        "weekend": 54720,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 48960,
        "weekend": 48960,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 57600,
        "weekend": 57600,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "lotte": {
    "name": "롯데월드",
    "homepageUrl": "https://adventure.lotteworld.com",
    "pricePageUrl": "https://adventure.lotteworld.com/price/price",
    "currentSeason": "2026 기준",
    "updatedAt": "2026-04-14",
    "notice": "베이비: 36개월~만4세 / 어린이: 만5세~만12세 / 청소년: 만13세~만18세",
    "tickets": [
      {
        "id": "day",
        "label": "종일권 (1Day)",
        "time": "개장~마감",
        "prices": {
          "adult": 67000,
          "youth": 58000,
          "child": 50000,
          "baby": 17000
        },
        "priceLabels": {
          "adult": "대인",
          "youth": "청소년",
          "child": "어린이",
          "baby": "베이비"
        }
      },
      {
        "id": "evening",
        "label": "야간권 (After4)",
        "time": "16:00~마감",
        "prices": {
          "adult": 55000,
          "youth": 47000,
          "child": 39000,
          "baby": 17000
        },
        "priceLabels": {
          "adult": "대인",
          "youth": "청소년",
          "child": "어린이",
          "baby": "베이비"
        }
      }
    ],
    "channelDiscounts": {
      "home": {
        "weekday": 67000,
        "weekend": 67000,
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 46800,
        "weekend": 46800,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 41000,
        "weekend": 41000,
        "active": true,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 51840,
        "weekend": 51840,
        "active": false,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 54000,
        "weekend": 54000,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 50400,
        "weekend": 50400,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 51840,
        "weekend": 51840,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 54000,
        "weekend": 54000,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 52560,
        "weekend": 52560,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 54720,
        "weekend": 54720,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 48960,
        "weekend": 48960,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 57600,
        "weekend": 57600,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "seoul": {
    "name": "서울랜드",
    "homepageUrl": "https://www.seoulland.co.kr",
    "pricePageUrl": "https://seoulland.co.kr/?p=38",
    "currentSeason": "2026 봄 시즌",
    "updatedAt": "2026-04-14",
    "notice": "경기 과천",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "개장~마감",
        "prices": {
          "adult": 52000,
          "youth": 46000,
          "child": 43000
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
          "adult": 45000,
          "youth": 39000,
          "child": 36000
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
        "weekday": 52000,
        "weekend": 52000,
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 22750,
        "weekend": 22750,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 34900,
        "weekend": 34900,
        "active": true,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 25200,
        "weekend": 25200,
        "active": false,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 26250,
        "weekend": 26250,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 24500,
        "weekend": 24500,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 25200,
        "weekend": 25200,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 26250,
        "weekend": 26250,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 25550,
        "weekend": 25550,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 26600,
        "weekend": 26600,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 23800,
        "weekend": 23800,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 28000,
        "weekend": 28000,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "gyeongju": {
    "name": "경주월드",
    "homepageUrl": "https://www.gjw.co.kr/Contents/contents.php",
    "pricePageUrl": "https://www.gjw.co.kr/Contents/contents.php?cmsNo=DA0300",
    "currentSeason": "2026 봄 시즌",
    "updatedAt": "2026-04-14",
    "notice": "경북 경주",
    "tickets": [
      {
        "id": "day",
        "label": "종일권",
        "time": "개장~마감",
        "prices": {
          "adult": 54000,
          "youth": 47000,
          "child": 39000
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
          "adult": 39000,
          "youth": 35000,
          "child": 29000
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
        "weekday": 54000,
        "weekend": 54000,
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 28810,
        "weekend": 28810,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 39900,
        "weekend": 30900,
        "active": true,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 31820,
        "weekend": 31820,
        "active": false,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 32250,
        "weekend": 32250,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 30100,
        "weekend": 30100,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 30960,
        "weekend": 30960,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 32250,
        "weekend": 32250,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 31390,
        "weekend": 31390,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 32680,
        "weekend": 32680,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 29240,
        "weekend": 29240,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 33540,
        "weekend": 33540,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  },
  "lego": {
    "name": "레고랜드",
    "homepageUrl": "https://www.legoland.kr",
    "pricePageUrl": "https://www.legoland.kr",
    "currentSeason": "2026 기준",
    "updatedAt": "2026-04-14",
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
        "active": true,
        "note": "공홈 정가"
      },
      "nori": {
        "weekday": 41600,
        "weekend": 41600,
        "active": false,
        "note": "놀이의발견"
      },
      "naver": {
        "weekday": 47000,
        "weekend": 47000,
        "active": true,
        "note": "네이버 예약"
      },
      "coupang": {
        "weekday": 46080,
        "weekend": 46080,
        "active": false,
        "note": "쿠팡"
      },
      "kakao": {
        "weekday": 48000,
        "weekend": 48000,
        "active": false,
        "note": "카카오"
      },
      "yanolja": {
        "weekday": 44800,
        "weekend": 44800,
        "active": false,
        "note": "야놀자"
      },
      "yeogi": {
        "weekday": 46080,
        "weekend": 46080,
        "active": false,
        "note": "여기어때"
      },
      "gmarket": {
        "weekday": 48000,
        "weekend": 48000,
        "active": false,
        "note": "지마켓"
      },
      "11st": {
        "weekday": 46720,
        "weekend": 46720,
        "active": false,
        "note": "11번가"
      },
      "auction": {
        "weekday": 48640,
        "weekend": 48640,
        "active": false,
        "note": "옥션"
      },
      "kidsnote": {
        "weekday": 43520,
        "weekend": 43520,
        "active": false,
        "note": "키즈노트"
      },
      "mrt": {
        "weekday": 51200,
        "weekend": 51200,
        "active": false,
        "note": "마이리얼트립"
      }
    }
  }
};

module.exports = { PARK_PRICES };
