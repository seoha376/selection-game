const SUPABASE_URL = "https://bpyhldihyozgnjwknema.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_tUCK2TFNuh_6s18KkOdYFg_sTc0ovYP";

const STORAGE_KEYS = {
  sessionId: "selection-game-session-id",
  startedAt: "selection-game-started-at",
  recordedResult: "selection-game-recorded-result",
};

const RESULT_NAMES = {
  EXECUTION: "실행 추진형",
  PEOPLE: "사람 연결형",
  VALUE: "가치 중심형",
  CHANGE: "변화 개척형",
};

const RESULT_ORDER = ["VALUE", "PEOPLE", "CHANGE", "EXECUTION"];

function getStorage(storage) {
  if (storage) {
    return storage;
  }

  return typeof window === "undefined" ? null : window.localStorage;
}

function getNavigatorUserAgent(userAgent) {
  if (userAgent) {
    return userAgent;
  }

  if (typeof navigator === "undefined") {
    return "";
  }

  return navigator.userAgent;
}

export function getDeviceType(userAgent = "") {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent) ? "mobile" : "desktop";
}

export function getOrCreateSessionId(storage, randomId = () => crypto.randomUUID()) {
  const existing = storage?.getItem(STORAGE_KEYS.sessionId);
  if (existing) {
    return existing;
  }

  const sessionId = `selection-game-${randomId()}`;
  storage?.setItem(STORAGE_KEYS.sessionId, sessionId);
  return sessionId;
}

export function buildResultPayload({ sessionId, resultCode, answers, startedAt, now, userAgent }) {
  const elapsed = Math.max(0, Math.round((now() - Number(startedAt || now())) / 1000));

  return {
    session_id: sessionId,
    result_code: resultCode,
    answers: answers.join(""),
    duration_seconds: elapsed,
    device_type: getDeviceType(userAgent),
  };
}

export function summarizeResultEvents(events, currentResultCode) {
  const counts = Object.fromEntries(Object.keys(RESULT_NAMES).map((code) => [code, 0]));

  for (const event of events) {
    if (event?.result_code in counts) {
      counts[event.result_code] += 1;
    }
  }

  const total = events.length;
  if (total === 0) {
    return {
      total: 0,
      sameResult: 0,
      distribution: [],
    };
  }

  const distribution = RESULT_ORDER.map((code) => ({
    code,
    name: RESULT_NAMES[code],
    count: counts[code],
    percent: total === 0 ? 0 : Math.round((counts[code] / total) * 100),
  }));

  return {
    total,
    sameResult: counts[currentResultCode] || 0,
    distribution,
  };
}

export function createAnalyticsClient({
  url = SUPABASE_URL,
  publishableKey = SUPABASE_PUBLISHABLE_KEY,
  storage,
  randomId,
  now = () => Date.now(),
  userAgent,
  fetchImpl = globalThis.fetch,
} = {}) {
  const localStorage = getStorage(storage);
  const sessionId = getOrCreateSessionId(localStorage, randomId);
  const headers = {
    apikey: publishableKey,
    Authorization: `Bearer ${publishableKey}`,
    "Content-Type": "application/json",
  };

  async function request(path, options = {}) {
    if (!fetchImpl || !url || !publishableKey) {
      return null;
    }

    const response = await fetchImpl(`${url}${path}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Supabase request failed: ${response.status}`);
    }

    return response;
  }

  function markStarted() {
    localStorage?.setItem(STORAGE_KEYS.startedAt, String(now()));
  }

  async function recordSessionEvent(eventType, questionIndex = null) {
    await request("/rest/v1/session_events", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        session_id: sessionId,
        event_type: eventType,
        question_index: questionIndex,
      }),
    });
  }

  async function loadResultStats(resultCode) {
    const response = await request("/rest/v1/result_events?select=result_code", {
      method: "GET",
    });
    const events = response ? await response.json() : [];
    return summarizeResultEvents(events, resultCode);
  }

  async function recordResultAndLoadStats(resultCode, answers) {
    const recordedKey = `${STORAGE_KEYS.recordedResult}:${sessionId}`;
    const hasRecorded = localStorage?.getItem(recordedKey) === resultCode;

    if (!hasRecorded) {
      await request("/rest/v1/result_events", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify(
          buildResultPayload({
            sessionId,
            resultCode,
            answers,
            startedAt: localStorage?.getItem(STORAGE_KEYS.startedAt),
            now,
            userAgent: getNavigatorUserAgent(userAgent),
          }),
        ),
      });
      localStorage?.setItem(recordedKey, resultCode);
    }

    return loadResultStats(resultCode);
  }

  return {
    markStarted,
    recordSessionEvent,
    recordResultAndLoadStats,
    loadResultStats,
  };
}
