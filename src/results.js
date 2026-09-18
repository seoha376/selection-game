const SECTION_TITLES = {
  attitude: "당신의 선택이 닿아 있는 태도",
  moment: "함께할 때 빛나는 순간",
  growth: "더 멀리 가려면",
  line: "오늘의 한 문장",
};

export const QUESTIONS = [
  {
    title: "단체 채팅방에서 의견이 계속 오가는데, 아직 결론이 나지 않는다. 이럴 때 더 가까운 쪽은?",
    options: {
      A: { text: "나온 의견을 정리해서 선택지를 좁혀준다", resultCode: "EXECUTION" },
      B: { text: "각자 어떤 쪽이 좋은지 다시 물어보고 맞춰본다", resultCode: "PEOPLE" },
    },
  },
  {
    title: "늘 가던 길로 가면 늦지 않게 도착할 수 있다. 그런데 오늘은 처음 보는 골목길이 눈에 들어왔다.",
    options: {
      A: { text: "아는 길이 확실하니 익숙한 길로 간다", resultCode: "VALUE" },
      B: { text: "시간이 괜찮다면 새로운 길로 가본다", resultCode: "CHANGE" },
    },
  },
  {
    title: "사고 싶은 물건을 고르는데 마음에 드는 후보가 몇 개 있다. 이럴 때 나는?",
    options: {
      A: { text: "조건이 맞는 걸 고르고 빨리 결정하는 편", resultCode: "EXECUTION" },
      B: { text: "오래 써도 후회 없을지 한 번 더 따져보는 편", resultCode: "VALUE" },
    },
  },
  {
    title: "모임 분위기가 어딘가 가라앉아 있다. 이럴 때 나는?",
    options: {
      A: { text: "말이 적어진 사람을 살피며 자연스럽게 챙긴다", resultCode: "PEOPLE" },
      B: { text: "새로운 이야기나 활동을 꺼내 분위기를 바꿔본다", resultCode: "CHANGE" },
    },
  },
  {
    title: "친구들끼리 만나기로 한 날, 아직 아무도 뭘 할지 정하지 않았다. 이럴 때 나는 보통?",
    options: {
      A: { text: "후보를 몇 개 골라서 “이 중에서 고르자”고 말한다", resultCode: "EXECUTION" },
      B: { text: "다들 뭘 하고 싶은지 먼저 물어보고 분위기를 본다", resultCode: "PEOPLE" },
    },
  },
  {
    title: "다 같이 준비한 결과물이 거의 완성됐다. 마지막으로 시간이 조금 남았다면?",
    options: {
      A: { text: "빠진 게 없는지 확인하고 깔끔하게 마무리한다", resultCode: "EXECUTION" },
      B: { text: "더 재밌어 보일 수 있는 포인트를 하나 넣어본다", resultCode: "CHANGE" },
    },
  },
  {
    title: "여럿이 함께 준비한 행사가 끝났다. 이럴 때 더 만족스러운 쪽은?",
    options: {
      A: { text: "함께한 사람들이 즐겁게 참여하고 잘 마무리된 것", resultCode: "PEOPLE" },
      B: { text: "처음 세운 계획과 방향이 끝까지 잘 지켜진 것", resultCode: "VALUE" },
    },
  },
  {
    title: "새로운 일을 시작할 기회가 생겼다. 그때 나를 더 움직이게 하는 건?",
    options: {
      A: { text: "오래 두고 봐도 납득할 만한 이유가 있는 일", resultCode: "VALUE" },
      B: { text: "지금까지 해보지 않은 방식으로 시도해볼 수 있는 일", resultCode: "CHANGE" },
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
