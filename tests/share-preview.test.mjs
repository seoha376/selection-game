import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const indexSource = readFileSync("index.html", "utf8");
const buildSource = readFileSync("scripts/build.mjs", "utf8");
const ogImageUrl = "https://seoha376.github.io/selection-game/assets/og-image.png";

assert.ok(existsSync("assets/og-image.png"), "Representative image should be available at assets/og-image.png");

assert.ok(indexSource.includes("<title>나의 리더십 방향은?</title>"), "Title should be share-ready");
assert.ok(
  indexSource.includes('name="description"') &&
    indexSource.includes('content="8개의 선택으로 알아보는 나의 리더십 유형 테스트"'),
  "Description metadata should be present",
);
assert.ok(indexSource.includes('property="og:type" content="website"'), "Open Graph type should be website");
assert.ok(indexSource.includes('property="og:title" content="나의 리더십 방향은?"'), "Open Graph title should be present");
assert.ok(indexSource.includes(`property="og:image" content="${ogImageUrl}"`), "Open Graph image should be an absolute HTTPS URL");
assert.ok(indexSource.includes('property="og:site_name" content="김구 탄생 150주년 기념 체험"'), "Event name should be available to crawlers");
assert.ok(indexSource.includes('name="twitter:card" content="summary_large_image"'), "Twitter card should use a large image");
assert.ok(indexSource.includes(`name="twitter:image" content="${ogImageUrl}"`), "Twitter image should be an absolute HTTPS URL");

assert.ok(buildSource.includes('"/assets/og-image.png"'), "Build output should route the OG image asset");
assert.ok(buildSource.includes("readFileSync(\"assets/og-image.png\")"), "Build script should read the OG image as bytes");
assert.ok(buildSource.includes("Uint8Array"), "Build script should decode binary assets before responding");

console.log("All share preview tests passed.");
