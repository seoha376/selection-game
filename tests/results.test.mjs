import assert from "node:assert/strict";
import {
  backToPreviousQuestion,
  calculateResult,
  createGameState,
  getPagePath,
  getProgress,
  QUESTIONS,
  RESULT_CONTENT,
  revealResult,
  selectAnswer,
  startGame,
} from "../src/results.js";

assert.equal(QUESTIONS.length, 8, "The production test should have eight questions");
for (const question of QUESTIONS) {
  assert.ok(question.title, "Each question should have a title");
  assert.ok(question.options.A.text, "Each A option should have text");
  assert.ok(question.options.B.text, "Each B option should have text");
  assert.ok(["EXECUTION", "PEOPLE", "VALUE", "CHANGE"].includes(question.options.A.resultCode));
  assert.ok(["EXECUTION", "PEOPLE", "VALUE", "CHANGE"].includes(question.options.B.resultCode));
}

const expectedResults = {
  AAAAAAAA: "EXECUTION",
  BABABAAB: "PEOPLE",
  AABBABBA: "VALUE",
  BBBBBBBB: "CHANGE",
  AAAABBBB: "CHANGE",
};

for (const [answers, expectedCode] of Object.entries(expectedResults)) {
  const result = calculateResult(answers.split(""));
  assert.equal(result.code, expectedCode, `${answers} should map to ${expectedCode}`);
  assert.equal(result.answers.length, 8, `${answers} should keep eight interpreted answers`);
  assert.ok(result.reasonSummary.includes(result.name), `${answers} should include the winning result in summary`);
}

for (const code of ["EXECUTION", "PEOPLE", "VALUE", "CHANGE"]) {
  const content = RESULT_CONTENT[code];
  assert.ok(content, `${code} content should exist`);
  assert.ok(content.name, `${code} should have a name`);
  assert.ok(content.catchphrase, `${code} should have a catchphrase`);
  assert.ok(content.keywords, `${code} should have keywords`);
  assert.ok(content.description.length >= 2, `${code} should have at least two description sentences`);
  assert.equal(content.expandedSections.length, 4, `${code} should have four expanded result sections`);
  assert.deepEqual(
    content.expandedSections.map((section) => section.title),
    ["당신의 선택이 닿아 있는 태도", "함께할 때 빛나는 순간", "더 멀리 가려면", "오늘의 한 문장"],
  );
  assert.ok(content.expandedSections.every((section) => section.body.length >= 24), `${code} sections should be substantial`);
}

assert.throws(() => calculateResult(["A", "A"]), /exactly eight/i);
assert.throws(() => calculateResult(["A", "C", "A", "A", "A", "A", "A", "A"]), /A or B/i);

let state = createGameState();
assert.equal(state.screen, "cover");
assert.equal(state.currentQuestionIndex, 0);
assert.equal(getPagePath(state), "#/intro");

state = startGame(state);
assert.equal(state.screen, "question");
assert.equal(state.currentQuestionIndex, 0);
assert.equal(getPagePath(state), "#/q/1");
assert.deepEqual(getProgress(state), { current: 1, total: 8, label: "1 / 8" });

state = selectAnswer(state, "A");
assert.deepEqual(state.answers, ["A", null, null, null, null, null, null, null]);
assert.equal(state.currentQuestionIndex, 1);
assert.equal(state.screen, "question");
assert.equal(getPagePath(state), "#/q/2");
assert.deepEqual(getProgress(state), { current: 2, total: 8, label: "2 / 8" });

state = backToPreviousQuestion(state);
assert.equal(state.currentQuestionIndex, 0);
assert.equal(state.screen, "question");
assert.equal(getPagePath(state), "#/q/1");
assert.deepEqual(getProgress(state), { current: 1, total: 8, label: "1 / 8" });

for (const answer of ["B", "A", "B", "A", "B", "A", "A", "A"]) {
  state = selectAnswer(state, answer);
}
assert.deepEqual(state.answers, ["B", "A", "B", "A", "B", "A", "A", "A"]);
assert.equal(state.currentQuestionIndex, 7);
assert.equal(state.screen, "review");
assert.equal(getPagePath(state), "#/q/8");
assert.deepEqual(getProgress(state), { current: 8, total: 8, label: "8 / 8" });

state = revealResult(state);
assert.equal(state.screen, "result");
assert.equal(getPagePath(state), "#/result");
assert.equal(calculateResult(state.answers).code, "PEOPLE");

console.log("All result mapping tests passed.");
