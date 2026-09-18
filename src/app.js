import {
  backToPreviousQuestion,
  calculateResult,
  createGameState,
  getPagePath,
  getProgress,
  QUESTIONS,
  revealResult,
  selectAnswer as selectGameAnswer,
  startGame,
} from "./results.js?v=6";
import { createAnalyticsClient } from "./analytics.js?v=6";

let state = createGameState();
const app = document.querySelector("#app");
const analytics = createAnalyticsClient();

const RESULT_VISUALS = {
  EXECUTION: {
    symbol: "動",
    lead: "뜻을 움직임으로 바꾸는 사람",
  },
  PEOPLE: {
    symbol: "和",
    lead: "서로 다른 마음을 한 방향으로 잇는 사람",
  },
  VALUE: {
    symbol: "志",
    lead: "오래 남을 기준을 먼저 세우는 사람",
  },
  CHANGE: {
    symbol: "新",
    lead: "익숙한 답 너머의 가능성을 여는 사람",
  },
};

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

function track(promise) {
  promise.catch(() => {
    // Analytics should never interrupt the event experience.
  });
}

function renderStats(stats, result) {
  if (!stats || stats.total === 0) {
    return `
      <p class="stats-empty">아직 집계된 참여 통계가 없습니다. 당신의 결과가 첫 기록이 될 수 있어요.</p>
    `;
  }

  const bars = stats.distribution
    .map(
      (entry) => `
        <li>
          <div class="stats-row">
            <span>${entry.name}</span>
            <strong>${entry.count}명 · ${entry.percent}%</strong>
          </div>
          <div class="stats-bar" aria-hidden="true">
            <span class="stats-bar-fill" style="width: ${entry.percent}%"></span>
          </div>
        </li>
      `,
    )
    .join("");

  return `
    <div class="stats-highlight">
      <p><strong>${stats.total}명</strong>이 지금까지 참여했어요.</p>
      <p>당신과 같은 <strong>${result.name}</strong>은 <strong>${stats.sameResult}명</strong>입니다.</p>
    </div>
    <ul class="result-stats-bars">${bars}</ul>
  `;
}

function updateStatsPanel(stats, result) {
  const panel = document.querySelector("#stats-panel");
  if (!panel) {
    return;
  }

  panel.innerHTML = renderStats(stats, result);
}

function showStatsError() {
  const panel = document.querySelector("#stats-panel");
  if (!panel) {
    return;
  }

  panel.innerHTML = `<p class="stats-empty">참여 통계는 잠시 불러오지 못했어요. 결과 내용은 정상적으로 확인할 수 있습니다.</p>`;
}

function renderCover() {
  setScreen(`
    <section class="cover-screen paper-panel">
      <p class="eyebrow">김구 탄생 150주년 기념 체험</p>
      <h1>나의 선택으로<br />리더십 방향</h1>
      <p class="cover-copy">
        백범 김구의 삶에서 떠올릴 수 있는 결정, 사람, 가치, 변화의 감각을 가볍게 체험해보는 행사형 테스트입니다.
      </p>
      <p class="notice">본 테스트는 의학적·심리학적 진단 도구가 아니며, 행사 참여를 위한 체험 콘텐츠입니다. 참여 흐름과 결과는 익명 통계로 저장될 수 있습니다.</p>
      <button id="start-button" class="primary-button" type="button">시작하기</button>
    </section>
  `);

  document.querySelector("#start-button").addEventListener("click", () => {
    state = startGame(state);
    analytics.markStarted();
    track(analytics.recordSessionEvent("start"));
    syncRoute();
    render();
  });
}

function renderQuestion() {
  const question = QUESTIONS[state.currentQuestionIndex];
  const progress = getProgress(state);
  const progressPercent = (progress.current / progress.total) * 100;
  track(analytics.recordSessionEvent("question_view", state.currentQuestionIndex + 1));

  setScreen(`
    <section class="game-screen">
      <div class="top-bar">
        <button id="back-button" class="icon-button" type="button" aria-label="이전 질문으로 돌아가기">←</button>
        <div class="progress-wrap" style="--progress: ${progressPercent}%" aria-label="진행도">
          <p class="progress-text">${progress.label}</p>
        </div>
      </div>
      <section class="question paper-panel" aria-label="선택 질문">
        <p class="question-number">Q${state.currentQuestionIndex + 1}</p>
        <h2>${question.title}</h2>
        <div class="options">
          <button class="option-button" type="button" data-answer="A" data-selected="${state.answers[state.currentQuestionIndex] === "A"}">A. ${question.options.A.text}</button>
          <button class="option-button" type="button" data-answer="B" data-selected="${state.answers[state.currentQuestionIndex] === "B"}">B. ${question.options.B.text}</button>
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
  const visual = RESULT_VISUALS[result.code];
  const description = result.description.map((sentence) => `<p>${sentence}</p>`).join("");
  const scoreSummary = result.scoreSummary
    .map(
      (entry) => `
        <li>
          <div class="score-row">
            <span>${entry.name}</span>
            <strong>${entry.score}</strong>
          </div>
          <div class="score-bar" aria-hidden="true">
            <span class="score-bar-fill" style="width: ${(entry.score / 8) * 100}%"></span>
          </div>
        </li>
      `,
    )
    .join("");
  const expandedSections = result.expandedSections
    .map(
      (section) => `
        <section class="expanded-section">
          <h3>${section.title}</h3>
          <p>${section.body}</p>
        </section>
      `,
    )
    .join("");

  setScreen(`
    <section class="result-card paper-panel" data-result="${result.code}">
      <div class="result-hero">
        <div class="result-symbol" aria-hidden="true">${visual.symbol}</div>
        <div class="result-identity">
          <p class="result-code">${result.code}</p>
          <h2>${result.name}</h2>
          <p class="result-lead">${visual.lead}</p>
          <p class="catchphrase">${result.catchphrase}</p>
          <p class="keywords">${result.keywords}</p>
        </div>
      </div>
      <div class="reason-box">
        <h3>이 결과가 나온 이유</h3>
        <p>${result.reasonSummary}</p>
        <ul class="score-bars">${scoreSummary}</ul>
      </div>
      <div class="description">${description}</div>
      <div class="expanded-results">${expandedSections}</div>
      <section class="stats-box" aria-label="참여 통계">
        <h3>참여 현황</h3>
        <div id="stats-panel">
          <p class="stats-empty">참여 통계를 불러오는 중입니다.</p>
        </div>
      </section>
      <button id="reset-button" class="reset-button" type="button">처음으로</button>
    </section>
  `);

  analytics
    .recordResultAndLoadStats(result.code, state.answers)
    .then((stats) => updateStatsPanel(stats, result))
    .catch(showStatsError);

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
