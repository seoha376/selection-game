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
const app = document.querySelector("#app");

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

function setScreen(markup) {
  app.innerHTML = markup;
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

function renderCover() {
  setScreen(`
    <section class="cover-screen">
      <p class="eyebrow">김구 탄생 150주년 기념 체험</p>
      <h1>나의 선택으로<br />리더십 방향</h1>
      <p class="cover-copy">
        백범 김구의 삶에서 떠올릴 수 있는 결정, 사람, 가치, 변화의 감각을 가볍게 체험해보는 행사형 테스트입니다.
      </p>
      <p class="notice">본 테스트는 의학적·심리학적 진단 도구가 아니며, 행사 참여를 위한 체험 콘텐츠입니다.</p>
      <button id="start-button" class="primary-button" type="button">시작하기</button>
    </section>
  `);

  document.querySelector("#start-button").addEventListener("click", () => {
    state = startGame(state);
    syncRoute();
    render();
  });
}

function renderQuestion() {
  const question = questions[state.currentQuestionIndex];
  const progress = getProgress(state);
  const progressPercent = (progress.current / progress.total) * 100;

  setScreen(`
    <section class="game-screen">
      <div class="top-bar">
        <button id="back-button" class="icon-button" type="button" aria-label="이전 질문으로 돌아가기">←</button>
        <div class="progress-wrap" style="--progress: ${progressPercent}%" aria-label="진행도">
          <p class="progress-text">${progress.label}</p>
        </div>
      </div>
      <section class="question" aria-label="선택 질문">
        <p class="question-number">Q${state.currentQuestionIndex + 1}</p>
        <h2>${question.title}</h2>
        <div class="options">
          <button class="option-button" type="button" data-answer="A">A. ${question.options.A}</button>
          <button class="option-button" type="button" data-answer="B">B. ${question.options.B}</button>
        </div>
      </section>
      ${state.screen === "review" ? '<button id="show-result-button" class="primary-button result-button" type="button">결과보기</button>' : ""}
    </section>
  `);

  const backButton = document.querySelector("#back-button");
  backButton.disabled = state.currentQuestionIndex === 0;
  backButton.addEventListener("click", () => {
    state = backToPreviousQuestion(state);
    syncRoute();
    render();
  });

  document.querySelectorAll(".option-button").forEach((button) => {
    button.addEventListener("click", () => {
      state = selectGameAnswer(state, button.dataset.answer);
      syncRoute();
      render();
    });
  });

  const showResultButton = document.querySelector("#show-result-button");
  if (showResultButton) {
    showResultButton.addEventListener("click", () => {
      state = revealResult(state);
      syncRoute();
      render();
    });
  }
}

function renderResult() {
  const result = calculateResult(state.answers);
  const description = result.description.map((sentence) => `<p>${sentence}</p>`).join("");

  setScreen(`
    <section class="result-card">
      <p class="result-code">${result.code}</p>
      <h2>${result.name}</h2>
      <p class="catchphrase">${result.catchphrase}</p>
      <p class="keywords">${result.keywords}</p>
      <div class="description">${description}</div>
      <div class="cultural-note">
        <h3>김구 정신으로 읽어보기</h3>
        <p>${result.culturalNote}</p>
      </div>
      <button id="reset-button" class="reset-button" type="button">처음으로</button>
    </section>
  `);

  document.querySelector("#reset-button").addEventListener("click", () => {
    state = createGameState();
    syncRoute();
    render();
  });
}

function render() {
  document.body.dataset.screen = state.screen;

  if (state.screen === "cover") {
    renderCover();
    return;
  }

  if (state.screen === "result") {
    renderResult();
    return;
  }

  renderQuestion();
}

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#/intro" || window.location.hash === "") {
    state = createGameState();
    render();
  }
});

syncRoute(true);
render();
