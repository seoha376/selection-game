import {
  backToPreviousQuestion,
  calculateResult,
  createGameState,
  createShareState,
  getPagePath,
  getProgress,
  QUESTIONS,
  RESULT_CONTENT,
  revealResult,
  selectAnswer as selectGameAnswer,
  startGame,
} from "./results.js?v=8";
import { createAnalyticsClient } from "./analytics.js?v=8";

let state = createGameState();
const app = document.querySelector("#app");
const analytics = createAnalyticsClient();

const RESULT_VISUALS = {
  EXECUTION: {
    lead: "뜻을 움직임으로 바꾸는 사람",
  },
  PEOPLE: {
    lead: "서로 다른 마음을 한 방향으로 잇는 사람",
  },
  VALUE: {
    lead: "오래 남을 기준을 먼저 세우는 사람",
  },
  CHANGE: {
    lead: "익숙한 답 너머의 가능성을 여는 사람",
  },
};
const SITE_URL = "https://seoha376.github.io/selection-game/";
const RESULT_IMAGES = {
  EXECUTION: "./assets/result-execution.png",
  PEOPLE: "./assets/result-people.png",
  VALUE: "./assets/result-value.png",
  CHANGE: "./assets/result-change.png",
};
const SHARE_SLUGS = {
  EXECUTION: "execution",
  PEOPLE: "people",
  VALUE: "value",
  CHANGE: "change",
};
const COMPASS_POINTS = [
  { code: "EXECUTION", label: "움직임" },
  { code: "PEOPLE", label: "연결" },
  { code: "VALUE", label: "기준" },
  { code: "CHANGE", label: "새로움" },
];
const INSIGHT_LABELS = ["이런 순간에 빛나요", "사람들이 기억하는 나", "같이 가면 좋은 타입"];
const INSIGHT_ICONS = ["🚩", "💬", "🎒"];

function createShareText(result) {
  return `내 리더십 방향은 ${result.name}.\n당신의 방향도 한번 확인해보세요!`;
}

function createShareUrl(result) {
  return `${SITE_URL}share/${SHARE_SLUGS[result.code]}/`;
}

function createStateFromHash(hash) {
  const shareMatch = hash.match(/^#\/share\/([A-Z]+)$/);
  if (shareMatch) {
    return createShareState(shareMatch[1]);
  }

  return createGameState();
}

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

function updateShareFeedback(message) {
  const feedback = document.querySelector("#share-feedback");
  if (!feedback) {
    return;
  }

  feedback.textContent = message;
}

async function shareResult(result) {
  const text = createShareText(result);
  const url = createShareUrl(result);
  const shareData = {
    title: "나의 리더십 방향은?",
    text,
    url,
  };

  if (navigator.share) {
    await navigator.share(shareData);
    updateShareFeedback("공유 창을 열었어요.");
    return;
  }

  await navigator.clipboard.writeText(`${text}\n${url}`);
  updateShareFeedback("공유 문구를 복사했어요.");
}

function renderCover() {
  setScreen(`
    <section class="cover-screen paper-panel">
      <div class="travel-sticker sticker-plane" aria-hidden="true">✈</div>
      <div class="travel-sticker sticker-leaf" aria-hidden="true">🍁</div>
      <div class="travel-sticker sticker-stamp" aria-hidden="true">WORLD TOUR</div>
      <span class="tag-hole" aria-hidden="true"></span>
      <p class="eyebrow">김구 탄생 150주년 기념 체험</p>
      <h1><span>월드투어에서 발견하는</span><br />나의 리더십</h1>
      <p class="cover-copy">
        8개의 선택을 따라가며 내 안의 결정, 사람, 가치, 변화 감각을 찾아보는 월드투어형 리더십 테스트입니다.
      </p>
      <p class="notice">본 테스트는 의학적·심리학적 진단 도구가 아니며, 행사 참여를 위한 체험 콘텐츠입니다. 참여 흐름과 결과는 익명 통계로 저장될 수 있습니다.</p>
      <button id="start-button" class="primary-button" type="button">리더십 태그 찾기</button>
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
        <span class="tag-hole" aria-hidden="true"></span>
        <div class="travel-sticker sticker-ticket" aria-hidden="true">CHECKPOINT</div>
        <p class="question-number">Q${state.currentQuestionIndex + 1}</p>
        <h2>${question.title}</h2>
        <div class="options">
          <button class="option-button" type="button" data-answer="A" data-selected="${state.answers[state.currentQuestionIndex] === "A"}">
            <span class="option-choice-mark">A</span>
            <span class="option-choice-text">${question.options.A.text}</span>
          </button>
          <button class="option-button" type="button" data-answer="B" data-selected="${state.answers[state.currentQuestionIndex] === "B"}">
            <span class="option-choice-mark">B</span>
            <span class="option-choice-text">${question.options.B.text}</span>
          </button>
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
  const imageSrc = RESULT_IMAGES[result.code];
  const keywordChips = result.keywords
    .split(" · ")
    .map((keyword) => `<span>${keyword}</span>`)
    .join("");
  const summaryLines = result.description.map((sentence) => `<p>${sentence}</p>`).join("");
  const compassPoints = COMPASS_POINTS.map(
    (point) => `
      <li class="compass-point" data-active="${point.code === result.code}">
        <span>${point.label}</span>
      </li>
    `,
  ).join("");
  const primaryInsightSections = result.expandedSections.slice(0, 3);
  const bonusSections = result.expandedSections.slice(3);
  const insightCards = primaryInsightSections
    .map(
      (section, index) => `
        <button class="result-insight-card" type="button" data-insight-index="${index}" aria-expanded="${index === 0}">
          <span class="insight-icon" aria-hidden="true">${INSIGHT_ICONS[index]}</span>
          <span>${INSIGHT_LABELS[index]}</span>
        </button>
      `,
    )
    .join("");
  const bonusStamps = bonusSections
    .map(
      (section) => `
        <article class="bonus-stamp">
          <span aria-hidden="true">✦</span>
          <div>
            <h4>${section.title}</h4>
            <p>${section.body}</p>
          </div>
        </article>
      `,
    )
    .join("");

  setScreen(`
    <section class="result-card paper-panel" data-result="${result.code}">
      <div class="result-profile-shell">
        <div class="travel-sticker sticker-ticket" aria-hidden="true">LEADERSHIP TAG</div>
        <span class="tag-hole" aria-hidden="true"></span>
        <p class="result-kicker">월드투어에서 발견한</p>
        <div class="result-hero">
          <div class="result-image-wrap">
            <img class="result-image" src="${imageSrc}" alt="${result.name} 상징 이미지" />
          </div>
          <div class="result-identity">
            <p class="result-code">나의 리더십 태그</p>
            <h2>${result.name}</h2>
            <p class="result-lead">${visual.lead}</p>
            <p class="catchphrase">${result.catchphrase}</p>
            <div class="keyword-chips" aria-label="결과 키워드">${keywordChips}</div>
          </div>
        </div>
        <div class="result-summary-card">
          <div class="summary-icon" aria-hidden="true">✦</div>
          <div>
            <h3>당신은 이런 사람에 가까워요</h3>
            ${summaryLines}
          </div>
        </div>
      </div>
      <div class="result-reward-stage">
        <div class="result-postcard">
          <img src="${imageSrc}" alt="" />
          <p>생각을 행동으로,<br />지금 어디든 길을 만듭니다.</p>
        </div>
        <div class="result-insight-grid" aria-label="결과 상세 선택">
          ${insightCards}
        </div>
        <section class="result-insight-panel" id="result-insight-panel" aria-live="polite">
          <h3>${INSIGHT_LABELS[0]}</h3>
          <p>${primaryInsightSections[0].body}</p>
        </section>
      </div>
      <div class="reason-box">
        <h3>당신의 선택은 이런 방향을 가리켜요</h3>
        <p>${result.compassSummary}</p>
        <ul class="leadership-compass" aria-label="리더십 방향 나침반">${compassPoints}</ul>
      </div>
      <section class="bonus-stamps" aria-label="보너스 스탬프">
        <h3>보너스 스탬프</h3>
        ${bonusStamps}
      </section>
      <section class="stats-box" aria-label="참여 통계">
        <h3>참여 현황</h3>
        <div id="stats-panel">
          <p class="stats-empty">참여 통계를 불러오는 중입니다.</p>
        </div>
      </section>
      <section class="share-preview-card" aria-label="공유 카드 미리보기">
        <div class="share-preview-image">
          <img src="${imageSrc}" alt="" />
        </div>
        <div class="share-preview-copy">
          <p>공유 카드</p>
          <h3>${result.name}</h3>
          <span>${result.catchphrase}</span>
        </div>
      </section>
      <div class="share-actions">
        <button id="share-button" class="primary-button share-button" type="button">결과 공유하기</button>
        <p id="share-feedback" class="share-feedback" role="status" aria-live="polite"></p>
      </div>
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

  function setActiveInsight(nextIndex) {
    const section = primaryInsightSections[nextIndex];
    const panel = document.querySelector("#result-insight-panel");

    document.querySelectorAll(".result-insight-card").forEach((button) => {
      button.setAttribute("aria-expanded", String(Number(button.dataset.insightIndex) === nextIndex));
    });

    panel.innerHTML = `
      <h3>${INSIGHT_LABELS[nextIndex]}</h3>
      <p>${section.body}</p>
    `;
  }

  document.querySelectorAll(".result-insight-card").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveInsight(Number(button.dataset.insightIndex));
    });
  });

  document.querySelector("#share-button").addEventListener("click", () => {
    shareResult(result).catch(() => {
      updateShareFeedback("공유 문구를 복사하지 못했어요. 링크를 직접 복사해 주세요.");
    });
  });
}

function renderSharedResult() {
  const result = RESULT_CONTENT[state.shareResultCode] || RESULT_CONTENT.VALUE;
  const visual = RESULT_VISUALS[result.code];
  const imageSrc = RESULT_IMAGES[result.code];
  const description = result.description.map((sentence) => `<p>${sentence}</p>`).join("");

  setScreen(`
    <section class="result-card shared-result paper-panel" data-result="${result.code}">
      <p class="eyebrow">김구 탄생 150주년 기념 체험</p>
      <div class="result-hero">
        <div class="result-image-wrap">
          <img class="result-image" src="${imageSrc}" alt="${result.name} 상징 이미지" />
        </div>
        <div class="result-identity">
          <p class="result-code">공유된 리더십 방향은</p>
          <h2>${result.name}</h2>
          <p class="result-lead">${visual.lead}</p>
          <p class="catchphrase">${result.catchphrase}</p>
          <p class="keywords">${result.keywords}</p>
        </div>
      </div>
      <div class="description">${description}</div>
      <section class="shared-invite">
        <h3>당신의 방향도 확인해볼까요?</h3>
        <p>8개의 선택을 따라가면 나의 리더십 방향을 가볍게 확인할 수 있습니다.</p>
        <button id="take-test-button" class="primary-button" type="button">나도 테스트 해보기</button>
      </section>
    </section>
  `);

  document.querySelector("#take-test-button").addEventListener("click", () => {
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

  if (state.screen === "share") {
    renderSharedResult();
    return;
  }

  renderQuestion();
}

window.addEventListener("hashchange", () => {
  if (window.location.hash.startsWith("#/share/")) {
    state = createStateFromHash(window.location.hash);
    render();
    return;
  }

  if (window.location.hash === "#/intro" || window.location.hash === "") {
    state = createGameState();
    render();
  }
});

state = createStateFromHash(window.location.hash);
syncRoute(true);
render();
