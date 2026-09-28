const SECTION_TITLES = {
  moment: "당신이 빛나는 순간",
  presence: "사람들 사이에서 보이는 모습",
  growth: "조금 더 단단해지는 방법",
  question: "백범의 질문으로 바꿔보기",
  line: "오늘 가져갈 문장",
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
    compassLabel: "움직임",
    description: [
      "뜻을 오래 붙잡기보다, 지금 할 수 있는 움직임으로 바꾸는 사람입니다.",
      "모두가 아직 망설이고 있을 때 흐름을 정리하고 다음 행동을 만들어내는 힘이 있어요.",
      "좋은 방향도 결국 누군가의 첫 걸음에서 시작된다고 믿는 쪽에 가깝습니다.",
    ],
    expandedSections: [
      {
        title: SECTION_TITLES.moment,
        body:
          "의견은 많은데 결정이 나지 않을 때, 일이 늘어지고 분위기가 느슨해질 때, 누군가 “그래서 이제 뭐 하지?”라고 묻는 순간에 당신의 감각이 살아납니다. 완벽한 답을 기다리기보다 일단 방향을 잡고 팀이 움직일 수 있게 만드는 편입니다.",
      },
      {
        title: SECTION_TITLES.presence,
        body:
          "당신은 회의적인 공기를 오래 두지 않고, 할 수 있는 일부터 꺼내는 사람으로 보입니다. 주변 사람들은 당신을 통해 막연한 생각이 실제 일정과 행동으로 바뀌는 경험을 하게 됩니다.",
      },
      {
        title: SECTION_TITLES.growth,
        body:
          "속도가 빠른 만큼, 아직 말하지 못한 사람의 생각이 뒤에 남을 수 있습니다. 잠깐 멈춰 주변을 확인하면 당신의 추진력은 더 오래 가는 힘이 됩니다.",
      },
      {
        title: SECTION_TITLES.question,
        body: "내가 믿는 뜻을 오늘의 자리에서 어떤 행동으로 증명할 수 있을까?",
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
    compassLabel: "연결",
    description: [
      "서로 다른 마음을 살피고, 함께 갈 수 있는 길을 찾는 사람입니다.",
      "누가 맞는지를 빠르게 가르기보다 각자의 생각이 어떻게 함께 놓일 수 있는지 바라보는 편이에요.",
      "혼자 앞서가는 힘보다 함께 움직이는 힘을 더 믿는 사람에 가깝습니다.",
    ],
    expandedSections: [
      {
        title: SECTION_TITLES.moment,
        body:
          "의견이 갈려 분위기가 어색해질 때, 조용한 사람이 말할 자리가 필요할 때, 함께 만든 결과가 중요해지는 순간에 당신의 감각이 빛납니다. 말과 말 사이의 빈틈을 메우며 모두가 같은 방향을 바라보게 만드는 편입니다.",
      },
      {
        title: SECTION_TITLES.presence,
        body:
          "당신은 사람들 사이의 온도를 읽는 사람으로 보입니다. 주변 사람들은 당신 곁에서 자신의 의견이 쉽게 지워지지 않는다는 느낌을 받고, 그 안정감이 협력의 시작점이 됩니다.",
      },
      {
        title: SECTION_TITLES.growth,
        body:
          "모두를 고려하려는 마음이 깊을수록 결정이 늦어질 수 있습니다. 충분히 들었다면, 때로는 선택하는 용기도 필요합니다.",
      },
      {
        title: SECTION_TITLES.question,
        body: "내가 지키고 싶은 뜻은 누구와 함께할 때 더 큰 힘이 될까?",
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
    compassLabel: "기준",
    description: [
      "빠른 답보다 오래 남을 기준을 먼저 세우는 사람입니다.",
      "당장 눈에 보이는 결과보다 시간이 지나도 스스로 납득할 수 있는 방향을 중요하게 생각해요.",
      "그래서 당신은 속도를 늦추는 사람이 아니라, 방향이 흐려지지 않게 잡아주는 사람에 가깝습니다.",
    ],
    expandedSections: [
      {
        title: SECTION_TITLES.moment,
        body:
          "빠른 결정 앞에서 기준이 필요할 때, 결과보다 과정의 의미가 중요할 때, 모두가 편한 길을 택하려는 순간에 당신의 감각이 드러납니다. 잠깐 멈춰서 이 선택이 우리에게 어떤 의미로 남을지 묻는 편입니다.",
      },
      {
        title: SECTION_TITLES.presence,
        body:
          "당신은 쉽게 흔들리지 않는 기준을 가진 사람으로 보입니다. 주변 사람들은 당신을 통해 지금의 선택이 단순한 효율을 넘어 어떤 방향으로 남을지 다시 생각하게 됩니다.",
      },
      {
        title: SECTION_TITLES.growth,
        body:
          "원칙은 큰 힘이지만, 모든 상황이 같은 답을 요구하지는 않습니다. 기준을 지키되 상황을 읽는 유연함이 더해지면 훨씬 단단해집니다.",
      },
      {
        title: SECTION_TITLES.question,
        body: "지금의 선택이 시간이 지난 뒤에도 부끄럽지 않으려면 무엇을 지켜야 할까?",
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
    compassLabel: "새로움",
    description: [
      "익숙한 답 너머에서 새로운 가능성을 먼저 발견하는 사람입니다.",
      "이미 있는 답을 그대로 따르기보다, 다르게 해볼 수 있는 가능성을 그냥 지나치지 않는 편이에요.",
      "아직 확실하지 않아도 의미가 보이면 직접 시도해보고 싶은 사람에 가깝습니다.",
    ],
    expandedSections: [
      {
        title: SECTION_TITLES.moment,
        body:
          "모두가 늘 하던 방식만 떠올릴 때, 새로운 아이디어가 필요한 순간, 익숙한 행사를 다른 경험으로 바꾸고 싶을 때 당신의 감각이 살아납니다. 다르게 해볼 수 없을까라는 질문으로 팀의 상상력을 깨우는 편입니다.",
      },
      {
        title: SECTION_TITLES.presence,
        body:
          "당신은 익숙한 장면에 작은 균열을 내는 사람으로 보입니다. 주변 사람들은 당신을 통해 당연하다고 생각했던 방식 밖에도 선택지가 있다는 사실을 발견하게 됩니다.",
      },
      {
        title: SECTION_TITLES.growth,
        body:
          "새로운 시도는 시작만큼 마무리도 중요합니다. 가능성을 발견한 뒤에는 그것이 실제 결과로 이어지도록 계획과 책임을 함께 챙길 필요가 있습니다.",
      },
      {
        title: SECTION_TITLES.question,
        body: "지금의 시대에 맞게 뜻을 다시 전한다면, 어떤 새로운 방식이 가능할까?",
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
const TARGET_RESULT_COUNT = 2 ** QUESTIONS.length / RESULT_CODES.length;

function buildResultInterpretation(answers) {
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

  return {
    scores,
    interpretedAnswers,
    tiedCodes,
  };
}

function createBalancedTieBreakerMap() {
  const fixedCounts = Object.fromEntries(RESULT_CODES.map((code) => [code, 0]));
  const ties = [];

  for (let index = 0; index < 2 ** QUESTIONS.length; index += 1) {
    const answers = index
      .toString(2)
      .padStart(QUESTIONS.length, "0")
      .split("")
      .map((bit) => (bit === "0" ? "A" : "B"));
    const { tiedCodes } = buildResultInterpretation(answers);

    if (tiedCodes.length === 1) {
      fixedCounts[tiedCodes[0]] += 1;
    } else {
      ties.push({
        key: answers.join(""),
        tiedCodes,
      });
    }
  }

  const remainingCounts = Object.fromEntries(
    RESULT_CODES.map((code) => [code, TARGET_RESULT_COUNT - fixedCounts[code]]),
  );
  const tieBreakerMap = {};

  ties
    .sort((a, b) => a.tiedCodes.length - b.tiedCodes.length || a.key.localeCompare(b.key))
    .forEach((tie) => {
      const winner = tie.tiedCodes
        .filter((code) => remainingCounts[code] > 0)
        .sort((a, b) => remainingCounts[b] - remainingCounts[a] || RESULT_CODES.indexOf(a) - RESULT_CODES.indexOf(b))[0];

      if (!winner) {
        tieBreakerMap[tie.key] = FALLBACK_PRIORITY.find((code) => tie.tiedCodes.includes(code)) || tie.tiedCodes[0];
        return;
      }

      tieBreakerMap[tie.key] = winner;
      remainingCounts[winner] -= 1;
    });

  return tieBreakerMap;
}

const BALANCED_TIE_BREAKER_MAP = createBalancedTieBreakerMap();

export function calculateResult(answers) {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) {
    throw new Error("Result calculation requires exactly eight answers.");
  }

  if (!answers.every((answer) => answer === "A" || answer === "B")) {
    throw new Error("Each answer must be A or B.");
  }

  const { scores, interpretedAnswers, tiedCodes } = buildResultInterpretation(answers);
  const answerKey = answers.join("");
  const winnerCode =
    tiedCodes.length === 1
      ? tiedCodes[0]
      : BALANCED_TIE_BREAKER_MAP[answerKey] || FALLBACK_PRIORITY.find((code) => tiedCodes.includes(code)) || "VALUE";
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
    compassSummary: `${result.name}의 방향은 ${result.compassLabel} 쪽에 닿아 있습니다. 숫자로 줄 세우기보다, 당신의 선택이 자주 향한 태도를 하나의 방향으로 읽어낸 결과입니다.`,
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
