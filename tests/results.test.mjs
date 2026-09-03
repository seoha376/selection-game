import assert from "node:assert/strict";
import {
  backToPreviousQuestion,
  calculateResult,
  createGameState,
  getPagePath,
  getProgress,
  RESULT_CONTENT,
  revealResult,
  selectAnswer,
  startGame,
} from "../src/results.js";

const expectedMappings = {
  AAA: "EXECUTION",
  AAB: "VALUE",
  ABA: "CHANGE",
  ABB: "CHANGE",
  BAA: "EXECUTION",
  BAB: "PEOPLE",
  BBA: "PEOPLE",
  BBB: "VALUE",
};

for (const [answers, expectedCode] of Object.entries(expectedMappings)) {
  const result = calculateResult(answers.split(""));
  assert.equal(result.code, expectedCode, `${answers} should map to ${expectedCode}`);
}

for (const code of ["EXECUTION", "PEOPLE", "VALUE", "CHANGE"]) {
  assert.ok(RESULT_CONTENT[code], `${code} content should exist`);
  assert.ok(RESULT_CONTENT[code].name, `${code} should have a name`);
  assert.ok(RESULT_CONTENT[code].catchphrase, `${code} should have a catchphrase`);
  assert.ok(RESULT_CONTENT[code].keywords, `${code} should have keywords`);
  assert.ok(RESULT_CONTENT[code].description.length >= 2, `${code} should have at least two description sentences`);
  assert.ok(RESULT_CONTENT[code].culturalNote.includes("김구"), `${code} should connect the result to Kim Gu`);
  assert.ok(RESULT_CONTENT[code].culturalNote.length >= 70, `${code} should have a richer cultural note`);
}

assert.throws(() => calculateResult(["A", "A"]), /exactly three/i);
assert.throws(() => calculateResult(["A", "C", "A"]), /A or B/i);

let state = createGameState();
assert.equal(state.screen, "cover");
assert.equal(state.currentQuestionIndex, 0);
assert.equal(getPagePath(state), "#/intro");

state = startGame(state);
assert.equal(state.screen, "question");
assert.equal(state.currentQuestionIndex, 0);
assert.equal(getPagePath(state), "#/q/1");
assert.deepEqual(getProgress(state), { current: 1, total: 3, label: "1 / 3" });

state = selectAnswer(state, "A");
assert.deepEqual(state.answers, ["A", null, null]);
assert.equal(state.currentQuestionIndex, 1);
assert.equal(state.screen, "question");
assert.equal(getPagePath(state), "#/q/2");
assert.deepEqual(getProgress(state), { current: 2, total: 3, label: "2 / 3" });

state = backToPreviousQuestion(state);
assert.equal(state.currentQuestionIndex, 0);
assert.equal(state.screen, "question");
assert.equal(getPagePath(state), "#/q/1");
assert.deepEqual(getProgress(state), { current: 1, total: 3, label: "1 / 3" });

state = selectAnswer(state, "B");
state = selectAnswer(state, "A");
state = selectAnswer(state, "B");
assert.deepEqual(state.answers, ["B", "A", "B"]);
assert.equal(state.currentQuestionIndex, 2);
assert.equal(state.screen, "review");
assert.equal(getPagePath(state), "#/q/3");
assert.deepEqual(getProgress(state), { current: 3, total: 3, label: "3 / 3" });

state = revealResult(state);
assert.equal(state.screen, "result");
assert.equal(getPagePath(state), "#/result");
assert.equal(calculateResult(state.answers).code, "PEOPLE");

console.log("All result mapping tests passed.");
