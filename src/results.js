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
  },
};

const RESULT_MAP = {
  AAA: "EXECUTION",
  AAB: "VALUE",
  ABA: "CHANGE",
  ABB: "CHANGE",
  BAA: "EXECUTION",
  BAB: "PEOPLE",
  BBA: "PEOPLE",
  BBB: "VALUE",
};

export function calculateResult(answers) {
  if (!Array.isArray(answers) || answers.length !== 3) {
    throw new Error("Result calculation requires exactly three answers.");
  }

  if (!answers.every((answer) => answer === "A" || answer === "B")) {
    throw new Error("Each answer must be A or B.");
  }

  const key = answers.join("");
  return RESULT_CONTENT[RESULT_MAP[key]];
}

export function createGameState() {
  return {
    screen: "cover",
    currentQuestionIndex: 0,
    answers: [null, null, null],
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
    total: 3,
    label: state.screen === "cover" ? "시작 전" : `${current} / 3`,
  };
}

export function startGame(state) {
  return {
    ...state,
    screen: "question",
    currentQuestionIndex: 0,
    answers: [null, null, null],
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
