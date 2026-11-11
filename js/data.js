/* =====================================================================
   OSULLOC — data.js
   [수정가이드] 상품·콘텐츠 데이터는 이 파일에서만 수정합니다. 이미지는 img/img2 경로를 실제 사진 주소로 바꾸면 됩니다.
   (현재 이미지는 AI로 생성한 사진 스타일 이미지이며 assets/photos/ 에 있습니다. 공식 상품 사진이 아닙니다)
   ===================================================================== */
const PRODUCTS=[
  {
    "id": "t1",
    "cat": "teabag",
    "name": "제주 그린티 티백",
    "short": "JEJU GREEN",
    "desc": "제주 햇차의 맑고 부드러운 맛을 담은 데일리 티백. 20입",
    "price": 9900,
    "orig": 11000,
    "unit": "티백 1개당 495원",
    "badge": "BEST",
    "img": "assets/photos/p-t1.jpg",
    "img2": "assets/photos/p-t1-2.jpg",
    "best": true
  },
  {
    "id": "t2",
    "cat": "teabag",
    "name": "제주 유자차 티백",
    "short": "YUJA TEA",
    "desc": "제주 유자의 상큼한 향을 담은 티백. 20입",
    "price": 9900,
    "orig": 9900,
    "unit": "티백 1개당 495원",
    "badge": "",
    "img": "assets/photos/p-t2.jpg",
    "img2": "assets/photos/p-t2-2.jpg",
    "best": false
  },
  {
    "id": "t3",
    "cat": "teabag",
    "name": "제주 삼다귤 티백",
    "short": "SAMDAGYUL",
    "desc": "삼다귤의 달콤새콤한 향이 가득한 티백. 20입",
    "price": 11000,
    "orig": 12000,
    "unit": "티백 1개당 550원",
    "badge": "NEW",
    "img": "assets/photos/p-t3.jpg",
    "img2": "assets/photos/p-t3-2.jpg",
    "best": false
  },
  {
    "id": "t4",
    "cat": "teabag",
    "name": "제주 벚꽃 블렌드 티백",
    "short": "CHERRY BLOSSOM",
    "desc": "벚꽃 향이 은은하게 퍼지는 봄 블렌드 티백. 20입",
    "price": 10500,
    "orig": 10500,
    "unit": "티백 1개당 525원",
    "badge": "",
    "img": "assets/photos/p-t4.jpg",
    "img2": "assets/photos/p-t4-2.jpg",
    "best": false
  },
  {
    "id": "l1",
    "cat": "leaf",
    "name": "우전 잎차 50g",
    "short": "UJEON",
    "desc": "이른 봄 가장 먼저 딴 어린 찻잎으로 만든 섬세한 잎차",
    "price": 24000,
    "orig": 26000,
    "unit": "100g당 48,000원",
    "badge": "BEST",
    "img": "assets/photos/p-l1.jpg",
    "img2": "assets/photos/p-l1-2.jpg",
    "best": true
  },
  {
    "id": "l2",
    "cat": "leaf",
    "name": "세작 잎차 80g",
    "short": "SEJAK",
    "desc": "균형 잡힌 향과 감칠맛의 데일리 잎차",
    "price": 18000,
    "orig": 18000,
    "unit": "100g당 22,500원",
    "badge": "",
    "img": "assets/photos/p-l2.jpg",
    "img2": "assets/photos/p-l2-2.jpg",
    "best": false
  },
  {
    "id": "l3",
    "cat": "leaf",
    "name": "제주 녹차 잎차 60g",
    "short": "JEJU GREEN LEAF",
    "desc": "맑고 깔끔한 맛의 제주 녹차 잎차",
    "price": 22000,
    "orig": 24000,
    "unit": "100g당 36,667원",
    "badge": "NEW",
    "img": "assets/photos/p-l3.jpg",
    "img2": "assets/photos/p-l3-2.jpg",
    "best": false
  },
  {
    "id": "l4",
    "cat": "leaf",
    "name": "호지차 잎차 60g",
    "short": "HOJICHA",
    "desc": "볶은 향이 고소하고 따뜻한 호지차 잎차",
    "price": 20000,
    "orig": 20000,
    "unit": "100g당 33,333원",
    "badge": "",
    "img": "assets/photos/p-l4.jpg",
    "img2": "assets/photos/p-l4-2.jpg",
    "best": false
  },
  {
    "id": "m1",
    "cat": "matcha",
    "name": "제주 말차 파우더 40g",
    "short": "MATCHA",
    "desc": "곱게 갈아 거품이 부드럽게 올라오는 데일리 말차",
    "price": 19000,
    "orig": 21000,
    "unit": "100g당 47,500원",
    "badge": "BEST",
    "img": "assets/photos/p-m1.jpg",
    "img2": "assets/photos/p-m1-2.jpg",
    "best": true
  },
  {
    "id": "m2",
    "cat": "matcha",
    "name": "말차 라떼 스틱 10입",
    "short": "MATCHA LATTE",
    "desc": "물이나 우유에 타기만 하면 되는 말차 라떼 스틱",
    "price": 14800,
    "orig": 14800,
    "unit": "스틱 1개당 1,480원",
    "badge": "",
    "img": "assets/photos/p-m2.jpg",
    "img2": "assets/photos/p-m2-2.jpg",
    "best": false
  },
  {
    "id": "m3",
    "cat": "matcha",
    "name": "프리미엄 말차 30g",
    "short": "PREMIUM",
    "desc": "진한 색과 깊은 감칠맛의 의식용 등급 말차",
    "price": 28000,
    "orig": 30000,
    "unit": "100g당 93,333원",
    "badge": "BEST",
    "img": "assets/photos/p-m3.jpg",
    "img2": "",
    "best": true
  },
  {
    "id": "m4",
    "cat": "blend",
    "name": "호지차 라떼 스틱 12입",
    "short": "HOJICHA LATTE",
    "desc": "고소한 호지차에 우유를 더한 라떼 스틱",
    "price": 9500,
    "orig": 9500,
    "unit": "스틱 1개당 792원",
    "badge": "NEW",
    "img": "assets/photos/p-m4.jpg",
    "img2": "assets/photos/p-m4-2.jpg",
    "best": false
  },
  {
    "id": "b1",
    "cat": "blend",
    "name": "제주 감귤차",
    "short": "TANGERINE",
    "desc": "제주 감귤의 달콤새콤함을 담은 감귤차. 스틱과 병 구성",
    "price": 13000,
    "orig": 14000,
    "unit": "스틱 1개당 1,300원",
    "badge": "BEST",
    "img": "assets/photos/p-b1.jpg",
    "img2": "assets/photos/p-b1-2.jpg",
    "best": true
  },
  {
    "id": "b2",
    "cat": "blend",
    "name": "제주 레몬차",
    "short": "LEMON",
    "desc": "상큼한 레몬 향의 레몬차. 따뜻하게도 차갑게도",
    "price": 14000,
    "orig": 14000,
    "unit": "스틱 1개당 1,400원",
    "badge": "",
    "img": "assets/photos/p-b2.jpg",
    "img2": "assets/photos/p-b2-2.jpg",
    "best": false
  },
  {
    "id": "b3",
    "cat": "blend",
    "name": "제주 유자차",
    "short": "YUJA",
    "desc": "달콤새콤한 유자의 맛을 담은 유자차. 스틱과 병 구성",
    "price": 12500,
    "orig": 13500,
    "unit": "스틱 1개당 1,250원",
    "badge": "NEW",
    "img": "assets/photos/p-b3.jpg",
    "img2": "assets/photos/p-b3-2.jpg",
    "best": false
  },
  {
    "id": "b4",
    "cat": "blend",
    "name": "라벤더 카모마일",
    "short": "LAVENDER",
    "desc": "잠들기 전 편안한 향의 카페인 프리 블렌드",
    "price": 13500,
    "orig": 13500,
    "unit": "티백 1개당 675원",
    "badge": "",
    "img": "assets/photos/p-b4.jpg",
    "img2": "assets/photos/p-b4-2.jpg",
    "best": false
  },
  {
    "id": "g1",
    "cat": "gift",
    "name": "티타임 선물세트 No.1",
    "short": "TEA TIME",
    "desc": "티백 3종과 잎차 1종을 담은 입문용 선물세트",
    "price": 39000,
    "orig": 42000,
    "unit": "",
    "badge": "BEST",
    "img": "assets/photos/p-g1.jpg",
    "img2": "assets/photos/p-g1-2.jpg",
    "best": true
  },
  {
    "id": "g2",
    "cat": "gift",
    "name": "프리미엄 티 선물세트",
    "short": "PREMIUM SET",
    "desc": "세 가지 차와 유리 머그, 인퓨저를 담은 프리미엄 구성",
    "price": 45000,
    "orig": 48000,
    "unit": "",
    "badge": "",
    "img": "assets/photos/p-g2.jpg",
    "img2": "assets/photos/p-g2-2.jpg",
    "best": false
  },
  {
    "id": "g3",
    "cat": "gift",
    "name": "시그니처 티 컬렉션",
    "short": "SIGNATURE",
    "desc": "여섯 가지 차를 한 번에 맛보는 컬렉션",
    "price": 58000,
    "orig": 62000,
    "unit": "",
    "badge": "BEST",
    "img": "assets/photos/p-g3.jpg",
    "img2": "assets/photos/p-g3-2.jpg",
    "best": true
  },
  {
    "id": "g4",
    "cat": "gift",
    "name": "스페셜 티 선물세트",
    "short": "SPECIAL SET",
    "desc": "네 가지 차와 티 도구를 담은 스페셜 구성",
    "price": 49000,
    "orig": 55000,
    "unit": "",
    "badge": "NEW",
    "img": "assets/photos/p-g4.jpg",
    "img2": "assets/photos/p-g4-2.jpg",
    "best": false
  }
];
const CATS=[
 {
  "id": "teabag",
  "name": "티백"
 },
 {
  "id": "leaf",
  "name": "잎차"
 },
 {
  "id": "matcha",
  "name": "말차"
 },
 {
  "id": "blend",
  "name": "블렌디드 티"
 },
 {
  "id": "gift",
  "name": "선물세트"
 }
];
const LIFE=[
 {
  "id": "life1",
  "type": "HOW TO ENJOY",
  "title": "녹차, 맛있게 우리는 법",
  "img": "assets/photos/life-1.jpg",
  "lead": "온도와 시간만 맞춰도 같은 찻잎이 전혀 다른 맛을 냅니다.",
  "steps": [
   "찻잎 2g(티스푼 한 숟갈)을 다관에 넣습니다.",
   "물을 끓인 뒤 70~80℃로 식힙니다. 어린 잎일수록 낮은 온도가 좋아요.",
   "물을 붓고 1~2분 기다립니다.",
   "마지막 한 방울까지 따라 내면 두 번째 잔이 더 깊어집니다."
  ]
 },
 {
  "id": "life2",
  "type": "RECIPE",
  "title": "유자 아이스티 레시피",
  "img": "assets/photos/life-2.jpg",
  "lead": "유자차에 얼음과 레몬 한 조각만 더하면 완성되는 청량한 티.",
  "steps": [
   "유자차 2큰술을 뜨거운 물 100ml에 잘 풀어 줍니다.",
   "얼음을 가득 채운 잔에 붓고 차가운 물 50ml를 더합니다.",
   "레몬 슬라이스 2~3조각과 민트 잎을 올립니다.",
   "가볍게 저어 차갑게 마십니다."
  ]
 },
 {
  "id": "life3",
  "type": "PAIRING",
  "title": "녹차와 어울리는 간식",
  "img": "assets/photos/life-3.jpg",
  "lead": "산뜻한 녹차에는 단맛이 은은하고 고소한 간식이 좋아요.",
  "steps": [
   "우전·세작 같은 녹차: 약과, 인절미, 쌀과자처럼 고소하고 담백한 간식",
   "호지차: 견과류 쿠키, 다크초콜릿처럼 깊은 단맛",
   "말차: 팥과 크림치즈를 곁들인 디저트",
   "귤·유자차: 치즈케이크처럼 부드럽고 산뜻한 디저트"
  ]
 },
 {
  "id": "life4",
  "type": "RECIPE",
  "title": "말차 라떼 만들기",
  "img": "assets/photos/life-4.jpg",
  "lead": "덩어리 없이 부드럽게 푸는 것이 핵심입니다.",
  "steps": [
   "말차 파우더 2g을 체에 내려 그릇에 담습니다.",
   "80℃ 물 40ml를 붓고 차선(또는 작은 거품기)으로 W자를 그리며 풉니다.",
   "따뜻하게 데운 우유 150ml를 부어 섞습니다.",
   "차갑게 마시려면 얼음 잔에 우유를 먼저 붓고 말차를 올립니다."
  ]
 }
];
const JOURNAL=[
 {
  "img": "assets/photos/j-1.jpg",
  "tag": "STORY",
  "title": "제주의 가을 차밭, 두 번째 수확을 기다리며",
  "date": "2026.11.08",
  "body": "두 번째 수확을 앞둔 가을 차밭은 한 해 중 가장 조용한 시간을 보냅니다. 여름 동안 자란 잎이 단단해지고, 바람이 지날 때마다 이랑이 물결처럼 흔들립니다."
 },
 {
  "img": "assets/photos/j-2.jpg",
  "tag": "TEA 101",
  "title": "찻잎이 말해주는 차의 종류 한눈에 보기",
  "date": "2026.11.01",
  "body": "찻잎은 만드는 방법에 따라 녹차, 청차, 홍차로 나뉩니다. 같은 나무의 잎이라도 발효 정도가 다르면 색과 향이 전혀 달라집니다."
 },
 {
  "img": "assets/photos/j-3.jpg",
  "tag": "SPACE",
  "title": "티뮤지엄에서 보내는 느린 오후",
  "date": "2026.10.24",
  "body": "느리게 걷고, 차 한 잔을 앞에 두고 앉아 있는 것만으로도 충분한 공간. 계절마다 다른 풍경을 창밖에서 만날 수 있어요."
 },
 {
  "img": "assets/photos/j-4.jpg",
  "tag": "RECIPE",
  "title": "쌀쌀한 날, 따뜻한 차 한 잔의 순서",
  "date": "2026.10.18",
  "body": "추운 날에는 물 온도를 조금 높이고 우리는 시간을 늘려 보세요. 따뜻한 잔을 먼저 데워 두면 향이 오래 머뭅니다."
 },
 {
  "img": "assets/photos/j-5.jpg",
  "tag": "GIFT",
  "title": "가을 선물세트 고르는 법",
  "date": "2026.10.10",
  "body": "선물은 받는 사람의 취향을 먼저 떠올려 보세요. 차를 처음 접하는 분께는 티백 구성이, 즐겨 마시는 분께는 잎차 구성이 잘 어울립니다."
 },
 {
  "img": "assets/photos/j-6.jpg",
  "tag": "NATURE",
  "title": "녹차밭의 이랑은 왜 곡선일까",
  "date": "2026.10.02",
  "body": "차밭 이랑을 곡선으로 만드는 건 비가 올 때 물이 천천히 빠지게 하고 바람을 부드럽게 흘려보내기 위해서입니다."
 }
];
