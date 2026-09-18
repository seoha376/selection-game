import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const buildSource = readFileSync("scripts/build.mjs", "utf8");
const indexSource = readFileSync("index.html", "utf8");
const appSource = readFileSync("src/app.js", "utf8");

assert.ok(buildSource.includes('"/src/analytics.js"'), "Build output should include the analytics module");
assert.ok(indexSource.includes("./src/app.js?v=6"), "Index should request the latest app module version");
assert.ok(appSource.includes("./results.js?v=6"), "App should request the latest question module version");
assert.ok(appSource.includes("./analytics.js?v=6"), "App should request the latest analytics module version");

console.log("All build tests passed.");
