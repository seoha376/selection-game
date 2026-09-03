import {
  backToPreviousQuestion,
  calculateResult,
  createGameState,
  getPagePath,
  getProgress,
  revealResult,
  selectAnswer as selectGameAnswer,
  startGame,
} from "./results.js";

const questions = [
  {
    title: "프로젝트가 늦어지고 있을 때",
    options: {
      A: "빠르게 방향을 정하고 실행한다",
      B: "구성원 의견을 다시 모은다",
    },
  },
  {
    title: "기존 방식으로도 해결 가능하지만 새로운 방법이 떠올랐을 때",
    options: {
      A: "검증된 방식을 선택한다",
      B: "새로운 방식을 시도한다",
    },
  },
  {
    title: "팀에서 한 사람의 성과가 매우 뛰어날 때",
    options: {
      A: "뛰어난 개인에게 더 큰 역할을 맡긴다",
      B: "팀 전체가 함께 성장할 방법을 만든다",
    },
  },
];

let state = createGameState();

const coverScreen = document.querySelector("#cover-screen");
const gameScreen = document.querySelector("#game-screen");
const resultScreen = document.querySelector("#result-screen");
const startButton = document.querySelector("#start-button");
const questionCard = document.querySelector("#question-card");
const progressWrap = document.querySelector(".progress-wrap");
const progressText = document.querySelector("#progress-text");
const resultName = document.querySelector("#result-name");
const resultCode = document.querySelector("#result-code");
const resultCatchphrase = document.querySelector("#result-catchphrase");
const resultKeywords = document.querySelector("#result-keywords");
const resultDescription = document.querySelector("#result-description");
const backButton = document.querySelector("#back-button");
const showResultButton = document.querySelector("#show-result-button");
const resetButton = document.querySelector("#reset-button");

function syncRoute(replace = false) {
  const nextPath = getPagePath(state);
  if (window.location.hash === nextPath) {
    return;
  }

  if (replace) {
    window.location.replace(nextPath);
    return;
  }

  window.location.hash = nextPath;
}

function renderQuestion() {
  questionCard.innerHTML = "";

  const question = questions[state.currentQuestionIndex];
  const questionNumber = document.createElement("p");
  questionNumber.className = "question-number";
  questionNumber.textContent = `Q${state.currentQuestionIndex + 1}`;

  const heading = document.createElement("h2");
  heading.textContent = question.title;

  const options = document.createElement("div");
  options.className = "options";

  for (const optionCode of ["A", "B"]) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.dataset.selected = state.answers[state.currentQuestionIndex] === optionCode ? "true" : "false";
    button.textContent = `${optionCode}. ${question.options[optionCode]}`;
    button.addEventListener("click", () => {
      state = selectGameAnswer(state, optionCode);
      render();
    });
    options.append(button);
  }

  questionCard.append(questionNumber, heading, options);
}

function renderProgress() {
  const progress = getProgress(state);
  progressText.textContent = progress.label;
  progressWrap.style.setProperty("--progress", `${(progress.current / progress.total) * 100}%`);
}

function renderResult() {
  const result = calculateResult(state.answers);
  resultName.textContent = result.name;
  resultCode.textContent = result.code;
  resultCatchphrase.textContent = result.catchphrase;
  resultKeywords.textContent = result.keywords;
  resultDescription.innerHTML = "";

  for (const sentence of result.description) {
    const paragraph = document.createElement("p");
    paragraph.textContent = sentence;
    resultDescription.append(paragraph);
  }
}

function render() {
  coverScreen.hidden = state.screen !== "cover";
  gameScreen.hidden = state.screen !== "question" && state.screen !== "review";
  resultScreen.hidden = state.screen !== "result";
  renderProgress();

  if (state.screen === "question" || state.screen === "review") {
    renderQuestion();
    backButton.disabled = state.currentQuestionIndex === 0;
    showResultButton.hidden = state.screen !== "review";
  }

  if (state.screen === "result") {
    renderResult();
  }
}

startButton.addEventListener("click", () => {
  state = startGame(state);
  syncRoute();
  render();
});

backButton.addEventListener("click", () => {
  state = backToPreviousQuestion(state);
  syncRoute();
  render();
});

showResultButton.addEventListener("click", () => {
  state = revealResult(state);
  syncRoute();
  render();
});

resetButton.addEventListener("click", () => {
  state = createGameState();
  syncRoute();
  render();
});

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#/intro" || window.location.hash === "") {
    state = createGameState();
    render();
  }
});

syncRoute(true);
render();
