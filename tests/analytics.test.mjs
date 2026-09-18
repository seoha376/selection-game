import assert from "node:assert/strict";
import {
  buildResultPayload,
  createAnalyticsClient,
  getDeviceType,
  getOrCreateSessionId,
  summarizeResultEvents,
} from "../src/analytics.js";

function createStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
  };
}

assert.equal(getDeviceType("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)"), "mobile");
assert.equal(getDeviceType("Mozilla/5.0 (Windows NT 10.0; Win64; x64)"), "desktop");

const storage = createStorage();
const sessionId = getOrCreateSessionId(storage, () => "fixed-id");
assert.equal(sessionId, "selection-game-fixed-id");
assert.equal(getOrCreateSessionId(storage, () => "next-id"), "selection-game-fixed-id");

const payload = buildResultPayload({
  sessionId: "session-1",
  resultCode: "VALUE",
  answers: ["A", "B", "A", "B", "A", "B", "A", "B"],
  startedAt: 1000,
  now: () => 43210,
  userAgent: "Mozilla/5.0 (Android 14; Mobile)",
});
assert.deepEqual(payload, {
  session_id: "session-1",
  result_code: "VALUE",
  answers: "ABABABAB",
  duration_seconds: 42,
  device_type: "mobile",
});

assert.deepEqual(summarizeResultEvents([], "PEOPLE"), {
  total: 0,
  sameResult: 0,
  distribution: [],
});

assert.deepEqual(summarizeResultEvents(
  [
    { result_code: "VALUE" },
    { result_code: "VALUE" },
    { result_code: "CHANGE" },
    { result_code: "PEOPLE" },
  ],
  "VALUE",
), {
  total: 4,
  sameResult: 2,
  distribution: [
    { code: "VALUE", name: "가치 중심형", count: 2, percent: 50 },
    { code: "PEOPLE", name: "사람 연결형", count: 1, percent: 25 },
    { code: "CHANGE", name: "변화 개척형", count: 1, percent: 25 },
    { code: "EXECUTION", name: "실행 추진형", count: 0, percent: 0 },
  ],
});

const calls = [];
const client = createAnalyticsClient({
  url: "https://example.supabase.co",
  publishableKey: "sb_publishable_test",
  storage: createStorage({ "selection-game-started-at": "1000" }),
  randomId: () => "abc",
  now: () => 2000,
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  fetchImpl: async (url, options) => {
    calls.push({ url, options });
    if (url.includes("result_events?select=result_code")) {
      return {
        ok: true,
        json: async () => [{ result_code: "VALUE" }],
      };
    }
    return {
      ok: true,
      json: async () => ({}),
    };
  },
});

await client.recordSessionEvent("question_view", 3);
await client.recordResultAndLoadStats("VALUE", ["A", "A", "B", "B", "A", "B", "A", "B"]);

assert.equal(calls.length, 3, "session insert, result insert, and stats read should be requested");
assert.ok(calls[0].url.endsWith("/rest/v1/session_events"));
assert.ok(calls[1].url.endsWith("/rest/v1/result_events"));
assert.ok(calls[2].url.includes("/rest/v1/result_events?select=result_code"));
assert.equal(JSON.parse(calls[1].options.body).duration_seconds, 1);

console.log("All analytics tests passed.");
