export type BreadType = 'sweet' | 'buttery' | 'classic' | 'savory';

export interface Answer {
  id: string;
  text: string;
  emoji: string;
  scores: Partial<Record<BreadType, number>>;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export interface BreadPersonality {
  type: BreadType;
  title: string;
  subtitle: string;
  emoji: string;
  description: string;
  summary: { icon: string; text: string }[];
  keywords: string[];
  recommendedBreads: { name: string; emoji: string }[];
  gradient: string;
  cardGradient: string;
  accent: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "나의 빵먹빵 스타일은?",
    answers: [
      {
        id: "A",
        emoji: "🛍️",
        text: "지나간 빵은 다시 돌아오지 않아\n두손가득 무겁게",
        scores: { classic: 1 },
      },
      {
        id: "B",
        emoji: "✨",
        text: "오늘구운 빵이 제일 맛있어\n먹고싶은 만큼만!",
        scores: { sweet: 1 },
      },
    ],
  },
  {
    id: 2,
    question: "발걸음을 멈추게 하는 향긋한 빵내음\n나를 유혹한 향기는?",
    answers: [
      {
        id: "A",
        emoji: "🧈",
        text: "나는 고소해!! 소리치는\n버터와 밀가루 그 자체의 풍미",
        scores: { buttery: 1, classic: 1 },
      },
      {
        id: "B",
        emoji: "🍫",
        text: "코를 찌르는 달콤한\n과일과 초콜릿 향기",
        scores: { sweet: 2 },
      },
    ],
  },
  {
    id: 3,
    question: "나의 도파민을 폭발하게 하는 한입은?",
    answers: [
      {
        id: "A",
        emoji: "🧂",
        text: "소금 알갱이가 혀 끝에 닿는 순간의 짜릿함\n씹을수록 올라오는 담백한 풍미",
        scores: { savory: 1, classic: 1 },
      },
      {
        id: "B",
        emoji: "🍦",
        text: "첫 입부터 뇌를 때리는 강력한 달콤함\n부드러운 크림의 파도",
        scores: { sweet: 2 },
      },
    ],
  },
  {
    id: 4,
    question: "집 앞 따끈한 신상 베이커리,\n나의 시선이 가장 먼저 향한 곳은?",
    answers: [
      {
        id: "A",
        emoji: "🥖",
        text: "빵집의 실력을 알 수 있는 기본 빵\n(바게트, 식빵, 소금빵)",
        scores: { classic: 2 },
      },
      {
        id: "B",
        emoji: "🎂",
        text: "비주얼로 압도하는 화려한 빵\n(과일 타르트, 크림 듬뿍, 초코 범벅)",
        scores: { sweet: 2 },
      },
      {
        id: "C",
        emoji: "🌶️",
        text: "냄새로 기선을 제압하는 자극적인 빵\n(피자빵, 소시지빵, 명란 바게트)",
        scores: { savory: 2 },
      },
    ],
  },
  {
    id: 5,
    question: "한시간 대기 끝! 어렵게 들어온\n베이글 맛집 기본베이글에...!!",
    answers: [
      {
        id: "A",
        emoji: "🫙",
        text: "크림치즈 없이 주세요",
        scores: { classic: 2 },
      },
      {
        id: "B",
        emoji: "🍫",
        text: "누텔라초코 듬뿍이요",
        scores: { sweet: 2 },
      },
      {
        id: "C",
        emoji: "🍁",
        text: "메이플월넛이요",
        scores: { sweet: 1, buttery: 1 },
      },
      {
        id: "D",
        emoji: "🧅",
        text: "대파크림치즈요",
        scores: { savory: 2 },
      },
    ],
  },
  {
    id: 6,
    question: "밸런스 게임 시작!\n평생 단 한종류의 빵만 먹는\n무인도에 떨어져야 한다면?",
    answers: [
      {
        id: "A",
        emoji: "🏝️",
        text: "은은해 극락도",
        scores: { classic: 2 },
      },
      {
        id: "B",
        emoji: "🍭",
        text: "당충전해 행복도",
        scores: { sweet: 2 },
      },
      {
        id: "C",
        emoji: "🧂",
        text: "짭짤해 만족도",
        scores: { savory: 2 },
      },
    ],
  },
  {
    id: 7,
    question: "ㅇㅇ야 빵먹어~\n이게 웬빵! 한입 깨문 빵속\n나를 기쁘게 하는 모먼트는?",
    answers: [
      {
        id: "A",
        emoji: "✨",
        text: "겉바속쫄 식감",
        scores: { classic: 2 },
      },
      {
        id: "B",
        emoji: "🧈",
        text: "고소한 버터향",
        scores: { buttery: 2 },
      },
      {
        id: "C",
        emoji: "🍓",
        text: "과일과 크림의 달콤함",
        scores: { sweet: 2 },
      },
      {
        id: "D",
        emoji: "🍫",
        text: "초코의 꾸덕함",
        scores: { sweet: 1, buttery: 1 },
      },
    ],
  },
  {
    id: 8,
    question: "늦은밤 갑자기 빵이 너무 먹고싶어\n나도모르게 킨 배달앱\n단 한가지 빵만 주문할 수 있다면?",
    answers: [
      {
        id: "A",
        emoji: "🥐",
        text: "버터듬뿍 크로와상",
        scores: { buttery: 2 },
      },
      {
        id: "B",
        emoji: "🍮",
        text: "겉바속촉 휘낭시에",
        scores: { classic: 1, buttery: 1 },
      },
      {
        id: "C",
        emoji: "🎂",
        text: "우유크림 롤케이크",
        scores: { sweet: 2 },
      },
      {
        id: "D",
        emoji: "🍞",
        text: "담백고소 생식빵",
        scores: { classic: 2 },
      },
    ],
  },
  {
    id: 9,
    question: "호텔 조식에서 빵이 빠질 순 없지!\n식사에 곁들일 나의 빵선택은?",
    answers: [
      {
        id: "A",
        emoji: "🍞",
        text: "통실통실 브리오슈",
        scores: { buttery: 1, sweet: 1 },
      },
      {
        id: "B",
        emoji: "🥐",
        text: "버터듬뿍 페이스트리",
        scores: { buttery: 2 },
      },
      {
        id: "C",
        emoji: "🥖",
        text: "고소담백 치아바타",
        scores: { classic: 2 },
      },
      {
        id: "D",
        emoji: "🫐",
        text: "블루베리 머핀",
        scores: { sweet: 2 },
      },
    ],
  },
  {
    id: 10,
    question: "이제 마지막 선택 😈\n나에게 빵이란",
    answers: [
      {
        id: "A",
        emoji: "⚡",
        text: "도파민",
        scores: { sweet: 2 },
      },
      {
        id: "B",
        emoji: "🌿",
        text: "힐링",
        scores: { classic: 2 },
      },
      {
        id: "C",
        emoji: "💎",
        text: "사치",
        scores: { buttery: 2 },
      },
      {
        id: "D",
        emoji: "☀️",
        text: "일상",
        scores: { classic: 1, savory: 1 },
      },
    ],
  },
];

export const breadPersonalities: Record<BreadType, BreadPersonality> = {
  sweet: {
    type: "sweet",
    title: "달콤 몽상가",
    subtitle: "세상 모든 단 빵을 사랑하는 당신",
    emoji: "🍓",
    description:
      "빵을 먹는 순간만큼은 현실을 잊고 싶은 당신! 달콤한 크림과 과일의 조화에 눈이 반짝이고, 초콜릿 향기만 맡아도 행복해지는 타입이에요. 비주얼이 예쁜 빵을 발견하면 사진부터 찍고 싶어지고, 디저트 카페 투어가 취미일 것 같아요. 빵으로 도파민을 충전하는 달콤한 인생을 살고 있는 당신 ✨",
    summary: [
      { icon: "🎨", text: "비주얼 빵에 첫눈에 반함" },
      { icon: "🍫", text: "달콤 크림 & 과일 러버" },
      { icon: "⚡", text: "빵으로 도파민 충전 타입" },
    ],
    keywords: ["달콤함", "화려한 비주얼", "크림 러버", "SNS 감성"],
    recommendedBreads: [
      { name: "딸기 생크림빵", emoji: "🍓" },
      { name: "누텔라 크로와상", emoji: "🥐" },
      { name: "과일 타르트", emoji: "🎂" },
      { name: "초코 크림빵", emoji: "🍫" },
    ],
    gradient: "linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #a855f7 100%)",
    cardGradient: "linear-gradient(135deg, #fff1f2 0%, #fdf4ff 100%)",
    accent: "#f43f5e",
  },
  buttery: {
    type: "buttery",
    title: "버터 요정",
    subtitle: "고소함의 끝판왕, 버터의 화신",
    emoji: "🥐",
    description:
      "갓 구운 크로와상의 버터 향기에 발걸음이 저절로 멈추는 당신! 겉은 바삭하고 속은 촉촉한 빵의 완벽한 조화를 누구보다 잘 알아요. 사치스럽고 풍부한 맛을 즐기는 미식가 기질이 있으며, 빵 하나를 먹어도 제대로 된 퀄리티를 원하는 까다로운 입맛의 소유자예요 🧈",
    summary: [
      { icon: "👃", text: "버터향에 발걸음 STOP" },
      { icon: "✨", text: "겉바속촉 식감 추구러" },
      { icon: "💎", text: "프리미엄 빵 미식가" },
    ],
    keywords: ["고소한 버터향", "풍부한 식감", "미식가 기질", "프리미엄 취향"],
    recommendedBreads: [
      { name: "버터 크로와상", emoji: "🥐" },
      { name: "브리오슈", emoji: "🍞" },
      { name: "휘낭시에", emoji: "🍮" },
      { name: "버터 스콘", emoji: "✨" },
    ],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)",
    cardGradient: "linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%)",
    accent: "#f59e0b",
  },
  classic: {
    type: "classic",
    title: "담백 장인",
    subtitle: "기본 빵의 진정한 가치를 아는 사람",
    emoji: "🥖",
    description:
      "화려한 것보다 본질에 집중하는 당신! 갓 구운 바게트 하나에서 진정한 행복을 찾고, 빵집에 들어서면 가장 먼저 기본 빵의 퀄리티를 살펴봐요. 유행에 흔들리지 않는 확고한 취향의 소유자이며, 심플한 것에서 깊은 맛을 끌어내는 진정한 빵 감정가예요 🌾",
    summary: [
      { icon: "🌾", text: "본질을 추구하는 감정가" },
      { icon: "🥖", text: "기본 빵 퀄리티로 평가" },
      { icon: "🧘", text: "유행 안 타는 확고한 취향" },
    ],
    keywords: ["담백한 맛", "본질 추구", "확고한 취향", "심플 이즈 베스트"],
    recommendedBreads: [
      { name: "바게트", emoji: "🥖" },
      { name: "소금빵", emoji: "🧂" },
      { name: "치아바타", emoji: "✨" },
      { name: "생식빵", emoji: "🍞" },
    ],
    gradient: "linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)",
    cardGradient: "linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%)",
    accent: "#92400e",
  },
  savory: {
    type: "savory",
    title: "짭짤 탐험가",
    subtitle: "자극적인 풍미를 쫓는 미식 모험가",
    emoji: "🧀",
    description:
      "달콤한 것보다 짭조름하고 자극적인 빵에 눈이 번쩍 뜨이는 당신! 명란 바게트, 대파 크림치즈 베이글 같은 개성 넘치는 빵을 발굴하는 것을 즐겨요. 남들이 잘 모르는 숨은 맛집을 찾아다니는 미식 탐험가 스타일이며, 빵과 어울리는 다양한 토핑 조합을 연구하는 진정한 푸드 모험가예요 🗺️",
    summary: [
      { icon: "🧂", text: "짭조름·자극적인 빵 러버" },
      { icon: "🧪", text: "이색 조합 발굴이 취미" },
      { icon: "🗺️", text: "숨은 맛집 찾는 모험가" },
    ],
    keywords: ["자극적인 풍미", "이색 조합", "숨은 맛집 탐방", "푸드 어드벤처"],
    recommendedBreads: [
      { name: "명란 바게트", emoji: "🥖" },
      { name: "대파 크림치즈 베이글", emoji: "🧅" },
      { name: "소시지 빵", emoji: "🌭" },
      { name: "피자 빵", emoji: "🍕" },
    ],
    gradient: "linear-gradient(135deg, #ea580c 0%, #dc2626 50%, #9f1239 100%)",
    cardGradient: "linear-gradient(135deg, #fff7ed 0%, #fef2f2 100%)",
    accent: "#ea580c",
  },
};

export const BREAD_TYPE_ORDER: BreadType[] = ["sweet", "buttery", "savory", "classic"];

export function calculateResult(
  scores: Record<BreadType, number>
): BreadType {
  return BREAD_TYPE_ORDER.reduce((best, type) =>
    scores[type] > scores[best] ? type : best
  );
}
