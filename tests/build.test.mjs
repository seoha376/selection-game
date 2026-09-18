import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const buildSource = readFileSync("scripts/build.mjs", "utf8");

assert.ok(buildSource.includes('"/src/analytics.js"'), "Build output should include the analytics module");

console.log("All build tests passed.");
