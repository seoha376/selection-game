import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync("src/app.js", "utf8");
const resultsSource = readFileSync("src/results.js", "utf8");
const styles = readFileSync("src/styles.css", "utf8");

assert.ok(appSource.includes('data-result="${result.code}"'), "Result card should expose the result code to CSS");
assert.ok(appSource.includes("result-hero"), "Result screen should have a strong hero area");
assert.ok(appSource.includes("result-symbol"), "Result screen should show a visible type symbol");
assert.ok(appSource.includes("leadership-compass"), "Result screen should use a non-numeric leadership compass");
assert.ok(!appSource.includes("score-bars"), "Result screen should not expose personal score counts");
assert.ok(!appSource.includes("scoreSummary"), "Result screen should not render personal score summaries");
assert.ok(appSource.includes("stats-box"), "Result screen should show participation statistics");
assert.ok(appSource.includes("recordResultAndLoadStats"), "Result screen should load Supabase-backed statistics");
assert.ok(appSource.includes("당신의 선택은 이런 방향을 가리켜요"), "Result screen should explain the compass without counts");
assert.ok(appSource.includes('data-selected="${state.answers[state.currentQuestionIndex] === "A"}'), "A option should show when it is selected");
assert.ok(appSource.includes('data-selected="${state.answers[state.currentQuestionIndex] === "B"}'), "B option should show when it is selected");
assert.ok(appSource.includes("option-choice-mark"), "Option cards should show a small choice mark");
assert.ok(appSource.includes("option-choice-text"), "Option cards should separate the answer text from the mark");
assert.ok(appSource.includes("選"), "Option cards should use a subtle selection seal");
assert.ok(appSource.includes("createShareText"), "Result screen should build a result-specific share message");
assert.ok(appSource.includes("navigator.share"), "Result share should use the native share sheet when available");
assert.ok(appSource.includes("navigator.clipboard.writeText"), "Result share should fall back to copying text");
assert.ok(appSource.includes("share-button"), "Result screen should include a share button");
assert.ok(appSource.includes("공유 문구를 복사했어요."), "Share fallback should tell users when text is copied");
assert.ok(resultsSource.includes("당신이 빛나는 순간"), "Result content should include richer personality-test style sections");
assert.ok(resultsSource.includes("조금 더 단단해지는 방법"), "Result content should include a balanced growth section");

for (const code of ["EXECUTION", "PEOPLE", "VALUE", "CHANGE"]) {
  assert.ok(styles.includes(`.result-card[data-result="${code}"]`), `${code} should have a result-specific theme`);
}
assert.ok(styles.includes(".result-hero"), "Result hero should be styled");
assert.ok(styles.includes(".leadership-compass"), "Leadership compass should be styled");
assert.ok(styles.includes(".compass-point"), "Compass points should be styled");
assert.ok(!styles.includes(".score-bar-fill"), "Personal score bar styling should be removed");
assert.ok(styles.includes(".stats-box"), "Participation statistics should be styled");
assert.ok(styles.includes(".result-stats-bars"), "Result distribution statistics should be styled");
assert.ok(styles.includes(".share-actions"), "Share actions should be styled");
assert.ok(styles.includes(".share-feedback"), "Share feedback should be styled");
assert.ok(styles.includes(".option-choice-mark"), "Option choice marks should be styled");
assert.ok(styles.includes(".option-choice-text"), "Option text should be styled");
assert.ok(styles.includes("box-shadow"), "Option cards should have tactile depth");
assert.ok(styles.includes("scale(0.99)"), "Option cards should have a pressed state");
assert.ok(styles.includes("Gowun Batang"), "Headings should use Gowun Batang");
assert.ok(styles.includes("Pretendard"), "Body and controls should use Pretendard");
assert.ok(!styles.includes("GungSeo"), "GungSeo should not remain in the font stack");
assert.ok(!styles.includes("궁서"), "궁서체 should not remain in the font stack");

console.log("All UI theme tests passed.");
