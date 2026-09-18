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
assert.deepEqual(
  QUESTIONS.map((question) => ({
    title: question.title,
    A: question.options.A.text,
    B: question.options.B.text,
  })),
  [
    {
      title: "단체 채팅방에서 의견이 계속 오가는데, 아직 결론이 나지 않는다. 이럴 때 더 가까운 쪽은?",
      A: "나온 의견을 정리해서 선택지를 좁혀준다",
      B: "각자 어떤 쪽이 좋은지 다시 물어보고 맞춰본다",
    },
    {
      title: "늘 가던 길로 가면 늦지 않게 도착할 수 있다. 그런데 오늘은 처음 보는 골목길이 눈에 들어왔다.",
      A: "아는 길이 확실하니 익숙한 길로 간다",
      B: "시간이 괜찮다면 새로운 길로 가본다",
    },
    {
      title: "사고 싶은 물건을 고르는데 마음에 드는 후보가 몇 개 있다. 이럴 때 나는?",
      A: "조건이 맞는 걸 고르고 빨리 결정하는 편",
      B: "오래 써도 후회 없을지 한 번 더 따져보는 편",
    },
    {
      title: "모임 분위기가 어딘가 가라앉아 있다. 이럴 때 나는?",
      A: "말이 적어진 사람을 살피며 자연스럽게 챙긴다",
      B: "새로운 이야기나 활동을 꺼내 분위기를 바꿔본다",
    },
    {
      title: "친구들끼리 만나기로 한 날, 아직 아무도 뭘 할지 정하지 않았다. 이럴 때 나는 보통?",
      A: "후보를 몇 개 골라서 “이 중에서 고르자”고 말한다",
      B: "다들 뭘 하고 싶은지 먼저 물어보고 분위기를 본다",
    },
    {
      title: "다 같이 준비한 결과물이 거의 완성됐다. 마지막으로 시간이 조금 남았다면?",
      A: "빠진 게 없는지 확인하고 깔끔하게 마무리한다",
      B: "더 재밌어 보일 수 있는 포인트를 하나 넣어본다",
    },
    {
      title: "여럿이 함께 준비한 행사가 끝났다. 이럴 때 더 만족스러운 쪽은?",
      A: "함께한 사람들이 즐겁게 참여하고 잘 마무리된 것",
      B: "처음 세운 계획과 방향이 끝까지 잘 지켜진 것",
    },
    {
      title: "새로운 일을 시작할 기회가 생겼다. 그때 나를 더 움직이게 하는 건?",
      A: "오래 두고 봐도 납득할 만한 이유가 있는 일",
      B: "지금까지 해보지 않은 방식으로 시도해볼 수 있는 일",
    },
  ],
);
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
