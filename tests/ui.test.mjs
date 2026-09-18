import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync("src/app.js", "utf8");
const styles = readFileSync("src/styles.css", "utf8");

assert.ok(appSource.includes('data-result="${result.code}"'), "Result card should expose the result code to CSS");
assert.ok(appSource.includes("result-hero"), "Result screen should have a strong hero area");
assert.ok(appSource.includes("result-symbol"), "Result screen should show a visible type symbol");
assert.ok(appSource.includes("score-bars"), "Result screen should visualize score distribution");
assert.ok(appSource.includes("stats-box"), "Result screen should show participation statistics");
assert.ok(appSource.includes("recordResultAndLoadStats"), "Result screen should load Supabase-backed statistics");
assert.ok(appSource.includes('data-selected="${state.answers[state.currentQuestionIndex] === "A"}'), "A option should show when it is selected");
assert.ok(appSource.includes('data-selected="${state.answers[state.currentQuestionIndex] === "B"}'), "B option should show when it is selected");

for (const code of ["EXECUTION", "PEOPLE", "VALUE", "CHANGE"]) {
  assert.ok(styles.includes(`.result-card[data-result="${code}"]`), `${code} should have a result-specific theme`);
}
assert.ok(styles.includes(".result-hero"), "Result hero should be styled");
assert.ok(styles.includes(".score-bar-fill"), "Score bars should be styled");
assert.ok(styles.includes(".stats-box"), "Participation statistics should be styled");
assert.ok(styles.includes(".result-stats-bars"), "Result distribution statistics should be styled");

console.log("All UI theme tests passed.");
