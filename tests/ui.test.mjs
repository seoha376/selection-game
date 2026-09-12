import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync("src/app.js", "utf8");
const styles = readFileSync("src/styles.css", "utf8");

assert.ok(appSource.includes('data-result="${result.code}"'), "Result card should expose the result code to CSS");

for (const code of ["EXECUTION", "PEOPLE", "VALUE", "CHANGE"]) {
  assert.ok(styles.includes(`.result-card[data-result="${code}"]`), `${code} should have a result-specific theme`);
}

console.log("All UI theme tests passed.");
