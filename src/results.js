const SECTION_TITLES = {
  attitude: "당신의 선택이 닿아 있는 태도",
  moment: "함께할 때 빛나는 순간",
  growth: "더 멀리 가려면",
  line: "오늘의 한 문장",
};

export const QUESTIONS = [
  {
    title: "기념 행사의 준비 일정이 예상보다 늦어지고 있다. 당신에게 더 가까운 선택은?",
    options: {
      A: { text: "지금 가능한 기준을 정하고 바로 실행에 들어간다", resultCode: "EXECUTION" },
      B: { text: "팀원들의 의견을 다시 모아 함께 납득할 방향을 찾는다", resultCode: "PEOPLE" },
    },
  },
  {
    title: "김구의 문장을 현대적으로 소개해야 한다. 더 끌리는 방식은?",
    options: {
      A: { text: "원문이 가진 뜻과 품격을 최대한 지켜 전달한다", resultCode: "VALUE" },
      B: { text: "요즘 사람들이 반응할 새로운 표현과 형식으로 바꿔본다", resultCode: "CHANGE" },
    },
  },
  {
    title: "굿즈 디자인 후보를 고르는 회의에서 반응이 갈린다. 당신은?",
    options: {
      A: { text: "가장 완성도 높고 일정 안에 제작 가능한 안을 고른다", resultCode: "EXECUTION" },
      B: { text: "행사의 의미가 오래 남을 수 있는 안을 다시 살핀다", resultCode: "VALUE" },
    },
  },
  {
    title: "행사의 메시지를 한 문장으로 정해야 한다. 당신이 더 중요하게 보는 것은?",
    options: {
      A: { text: "서로 다른 세대가 함께 공감할 수 있는 문장", resultCode: "PEOPLE" },
      B: { text: "낯설지만 사람들이 다시 보게 만드는 문장", resultCode: "CHANGE" },
    },
  },
  {
    title: "현장에서 갑자기 동선 문제가 생겼다. 당신이 먼저 할 일은?",
    options: {
      A: { text: "역할을 나누고 바로 움직여 혼선을 줄인다", resultCode: "EXECUTION" },
      B: { text: "당황한 사람들을 안정시키고 안내가 닿게 만든다", resultCode: "PEOPLE" },
    },
  },
  {
    title: "전시 코너에 새로운 체험 요소를 넣자는 의견이 나왔다. 당신은?",
    options: {
      A: { text: "현장에서 바로 운영 가능한 형태로 다듬어본다", resultCode: "EXECUTION" },
      B: { text: "작게라도 시도해보고 관람객 반응을 확인해본다", resultCode: "CHANGE" },
    },
  },
  {
    title: "팀 안에서 한 사람의 아이디어가 유독 돋보인다. 당신의 선택은?",
    options: {
      A: { text: "그 아이디어를 팀 전체가 함께 발전시키게 한다", resultCode: "PEOPLE" },
      B: { text: "행사의 기준과 어긋나지 않게 의미를 더 정리한다", resultCode: "VALUE" },
    },
  },
  {
    title: "김구 150주년을 오늘의 감각으로 기억하게 하려면 무엇이 더 필요할까?",
    options: {
      A: { text: "시간이 지나도 흐려지지 않을 가치와 기준", resultCode: "VALUE" },
      B: { text: "지금 세대가 자기 방식으로 다시 해석할 여지", resultCode: "CHANGE" },
    },
  },
];

export const RESULT_CONTENT = {
  EXECUTION: {
    code: "EXECUTION",
    name: "실행 추진형",
    catchphrase: "방향을 정하면 움직임으로 증명하는 리더",
    keywords: "결정 · 추진 · 성과",
    description: [
      "결정을 오래 미루기보다 방향을 정하고 움직이는 데 강점이 있습니다.",
      "불확실한 상황에서도 팀에 속도와 추진력을 만들어냅니다.",
      "다만 속도가 중요한 만큼 주변의 의견을 놓치지 않는 균형도 필요합니다.",
    ],
    expandedSections: [
      {
        title: SECTION_TITLES.attitude,
        body:
          "당신은 생각을 오래 붙잡아두기보다, 지금 할 수 있는 일을 정하고 움직이는 쪽에 가깝습니다. 좋은 뜻도 결국 누군가의 첫 행동을 통해 현실이 된다고 믿는 편이에요. 백범 김구의 삶을 오늘의 언어로 다시 읽는다면, 당신의 선택은 뜻을 품는 것에서 멈추지 않고 움직임으로 증명하는 태도와 닿아 있습니다.",
      },
      {
        title: SECTION_TITLES.moment,
        body:
          "분위기가 늘어지거나 모두가 결정을 미루는 순간, 당신은 흐름을 다시 앞으로 밀어냅니다. 완벽한 답을 기다리기보다 일단 방향을 잡고 팀이 움직일 수 있게 만드는 사람입니다.",
      },
      {
        title: SECTION_TITLES.growth,
        body:
          "속도는 큰 힘이지만, 때로는 누군가가 아직 말하지 못한 생각을 기다려주는 시간이 필요합니다. 더 많은 목소리를 들을수록 당신의 추진력은 더 오래 가는 힘이 됩니다.",
      },
      {
        title: SECTION_TITLES.line,
        body: "뜻이 있다면, 나는 먼저 움직이는 쪽을 택한다.",
      },
    ],
  },
  PEOPLE: {
    code: "PEOPLE",
    name: "사람 연결형",
    catchphrase: "서로 다른 사람의 힘을 하나로 모으는 리더",
    keywords: "공감 · 조율 · 연결",
    description: [
      "각자의 의견을 듣고 서로 다른 사람들을 함께 움직이게 하는 데 강점이 있습니다.",
      "혼자 앞서기보다 관계와 협력을 통해 더 큰 힘을 만듭니다.",
      "다만 모두의 의견을 고려하다 보면 결정이 늦어질 수 있습니다.",
    ],
    expandedSections: [
      {
        title: SECTION_TITLES.attitude,
        body:
          "당신은 한 사람의 뛰어남보다 여러 사람이 함께 움직일 때 생기는 힘을 더 크게 봅니다. 의견이 다를 때도 누가 맞는지보다 어떻게 함께 갈 수 있을지를 먼저 생각하는 편이에요. 백범 김구를 둘러싼 수많은 관계와 연대의 장면처럼, 당신의 선택은 혼자 앞서는 힘보다 사람을 잇는 힘에 가깝습니다.",
      },
      {
        title: SECTION_TITLES.moment,
        body:
          "사람들 사이에 온도 차가 생기거나 의견이 갈릴 때, 당신은 말과 말 사이의 빈틈을 메웁니다. 각자의 마음을 살피면서도 모두가 같은 방향을 바라보게 만드는 조율자에 가깝습니다.",
      },
      {
        title: SECTION_TITLES.growth,
        body:
          "모두를 이해하려는 마음이 깊을수록 결정은 늦어질 수 있습니다. 때로는 충분히 들은 뒤 선택하는 용기도 필요합니다.",
      },
      {
        title: SECTION_TITLES.line,
        body: "사람이 모이면, 혼자서는 만들 수 없는 길이 열린다.",
      },
    ],
  },
  VALUE: {
    code: "VALUE",
    name: "가치 중심형",
    catchphrase: "당장의 결과보다 오래 남을 기준을 세우는 리더",
    keywords: "원칙 · 지속 · 공동체",
    description: [
      "무엇을 빨리 이루느냐보다 어떤 기준으로 움직이느냐를 중요하게 생각합니다.",
      "팀이 오래 유지할 수 있는 방향과 공동체 전체의 성장을 바라봅니다.",
      "다만 원칙을 지키는 과정에서도 상황에 따라 유연하게 판단할 필요가 있습니다.",
    ],
    expandedSections: [
      {
        title: SECTION_TITLES.attitude,
        body:
          "당신은 빠른 성과보다 왜 이 일을 하는가를 더 중요하게 보는 사람입니다. 눈앞의 이득이 있어도 오래 남을 기준과 스스로 납득할 수 있는 방향을 쉽게 놓지 않습니다. 백범 김구의 삶을 하나의 문화적 상징으로 바라본다면, 당신의 선택은 결과보다 먼저 기준을 세우는 태도와 닿아 있습니다.",
      },
      {
        title: SECTION_TITLES.moment,
        body:
          "팀이 빠른 선택을 요구받을 때, 당신은 잠깐 멈춰서 이 선택이 우리에게 어떤 의미로 남을지 묻습니다. 그래서 당신은 속도를 늦추는 사람이 아니라, 방향이 흐려지지 않게 잡아주는 사람입니다.",
      },
      {
        title: SECTION_TITLES.growth,
        body:
          "기준을 지키는 힘은 중요하지만, 모든 상황이 같은 답을 요구하지는 않습니다. 원칙과 유연함이 만날 때 당신의 선택은 더 단단해집니다.",
      },
      {
        title: SECTION_TITLES.line,
        body: "빨리 닿는 길보다, 오래 부끄럽지 않을 길을 본다.",
      },
    ],
  },
  CHANGE: {
    code: "CHANGE",
    name: "변화 개척형",
    catchphrase: "익숙한 답보다 새로운 가능성을 먼저 보는 리더",
    keywords: "도전 · 실험 · 변화",
    description: [
      "익숙한 방식에 머무르기보다 새로운 가능성을 발견하고 직접 시도하는 편입니다.",
      "불확실성을 두려워하기보다 변화의 기회로 받아들입니다.",
      "다만 새로운 시도가 실제 성과로 이어지도록 실행 계획을 함께 챙기는 것이 중요합니다.",
    ],
    expandedSections: [
      {
        title: SECTION_TITLES.attitude,
        body:
          "당신은 익숙한 답이 있어도 다른 가능성을 그냥 지나치지 않는 사람입니다. 아직 증명되지 않은 길이라도 의미가 보이면 직접 시험해보고 싶어하는 편이에요. 백범 김구를 과거의 인물로만 두지 않고 오늘의 감각으로 다시 만난다면, 당신의 선택은 새로운 시대에 맞게 뜻을 다시 번역하는 태도와 닿아 있습니다.",
      },
      {
        title: SECTION_TITLES.moment,
        body:
          "모두가 기존 방식에 머무를 때, 당신은 다르게 해볼 수 없을까라는 질문을 꺼냅니다. 그 질문 하나가 팀의 상상력을 깨우고, 익숙한 행사를 새로운 경험으로 바꾸는 출발점이 됩니다.",
      },
      {
        title: SECTION_TITLES.growth,
        body:
          "새로운 시도는 시작만큼 마무리도 중요합니다. 가능성을 발견한 뒤에는 그것이 실제 결과로 이어지도록 계획과 책임을 함께 챙길 필요가 있습니다.",
      },
      {
        title: SECTION_TITLES.line,
        body: "익숙한 답 너머에, 아직 열리지 않은 장면이 있다.",
      },
    ],
  },
};

const RESULT_CODES = ["EXECUTION", "PEOPLE", "VALUE", "CHANGE"];
const FALLBACK_PRIORITY = ["VALUE", "PEOPLE", "EXECUTION", "CHANGE"];

export function calculateResult(answers) {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) {
    throw new Error("Result calculation requires exactly eight answers.");
  }

  if (!answers.every((answer) => answer === "A" || answer === "B")) {
    throw new Error("Each answer must be A or B.");
  }

  const scores = Object.fromEntries(RESULT_CODES.map((code) => [code, 0]));
  const interpretedAnswers = answers.map((answer, index) => {
    const question = QUESTIONS[index];
    const selectedOption = question.options[answer];
    scores[selectedOption.resultCode] += 1;
    return {
      questionIndex: index,
      answer,
      resultCode: selectedOption.resultCode,
      optionText: selectedOption.text,
    };
  });

  const highScore = Math.max(...Object.values(scores));
  const tiedCodes = RESULT_CODES.filter((code) => scores[code] === highScore);
  const recentTieBreaker = [...interpretedAnswers].reverse().find((entry) => tiedCodes.includes(entry.resultCode));
  const winnerCode =
    recentTieBreaker?.resultCode || FALLBACK_PRIORITY.find((code) => tiedCodes.includes(code)) || "VALUE";
  const result = RESULT_CONTENT[winnerCode];
  const sortedScores = RESULT_CODES.map((code) => ({
    code,
    name: RESULT_CONTENT[code].name,
    score: scores[code],
  })).sort((a, b) => b.score - a.score);

  return {
    ...result,
    scores,
    scoreSummary: sortedScores,
    answers: interpretedAnswers,
    reasonSummary: `${result.name} 선택이 가장 두드러졌습니다. ${sortedScores
      .map((entry) => `${entry.name} ${entry.score}회`)
      .join(" · ")}`,
  };
}

export function createGameState() {
  return {
    screen: "cover",
      currentQuestionIndex: 0,
    answers: Array(QUESTIONS.length).fill(null),
  };
}

export function getPagePath(state) {
  if (state.screen === "result") {
    return "#/result";
  }

  if (state.screen === "question" || state.screen === "review") {
    return `#/q/${state.currentQuestionIndex + 1}`;
  }

  return "#/intro";
}

export function getProgress(state) {
  const current = state.screen === "cover" ? 0 : state.currentQuestionIndex + 1;

  return {
    current,
    total: QUESTIONS.length,
    label: state.screen === "cover" ? "시작 전" : `${current} / ${QUESTIONS.length}`,
  };
}

export function startGame(state) {
  return {
    ...state,
    screen: "question",
    currentQuestionIndex: 0,
    answers: Array(QUESTIONS.length).fill(null),
  };
}

export function selectAnswer(state, answer) {
  if (answer !== "A" && answer !== "B") {
    throw new Error("Each answer must be A or B.");
  }

  const answers = [...state.answers];
  answers[state.currentQuestionIndex] = answer;
  const isLastQuestion = state.currentQuestionIndex === answers.length - 1;

  return {
    ...state,
    answers,
    screen: isLastQuestion ? "review" : "question",
    currentQuestionIndex: isLastQuestion ? state.currentQuestionIndex : state.currentQuestionIndex + 1,
  };
}

export function backToPreviousQuestion(state) {
  if (state.screen === "cover") {
    return state;
  }

  if (state.screen === "result") {
    return {
      ...state,
      screen: "review",
    };
  }

  return {
    ...state,
    screen: "question",
    currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
  };
}

export function revealResult(state) {
  if (state.answers.some((answer) => answer === null)) {
    throw new Error("Result calculation requires exactly three answers.");
  }

  return {
    ...state,
    screen: "result",
  };
}
