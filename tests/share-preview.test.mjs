import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const indexSource = readFileSync("index.html", "utf8");
const buildSource = readFileSync("scripts/build.mjs", "utf8");
const ogImageUrl = "https://seoha376.github.io/selection-game/assets/og-image.png";
const qrImageUrl = "https://seoha376.github.io/selection-game/assets/selection-game-qr.png";
const resultImagePaths = [
  "assets/result-execution.png",
  "assets/result-people.png",
  "assets/result-value.png",
  "assets/result-change.png",
];
const sharePages = [
  {
    path: "share/execution/index.html",
    route: "/share/execution/",
    name: "실행 추진형",
    image: "https://seoha376.github.io/selection-game/assets/result-execution.png",
  },
  {
    path: "share/people/index.html",
    route: "/share/people/",
    name: "사람 연결형",
    image: "https://seoha376.github.io/selection-game/assets/result-people.png",
  },
  {
    path: "share/value/index.html",
    route: "/share/value/",
    name: "가치 중심형",
    image: "https://seoha376.github.io/selection-game/assets/result-value.png",
  },
  {
    path: "share/change/index.html",
    route: "/share/change/",
    name: "변화 개척형",
    image: "https://seoha376.github.io/selection-game/assets/result-change.png",
  },
];

assert.ok(existsSync("assets/og-image.png"), "Representative image should be available at assets/og-image.png");
assert.ok(existsSync("assets/selection-game-qr.png"), "Printable QR image should be available at assets/selection-game-qr.png");
for (const imagePath of resultImagePaths) {
  assert.ok(existsSync(imagePath), `${imagePath} should be available for result pages`);
}
for (const page of sharePages) {
  assert.ok(existsSync(page.path), `${page.path} should exist as a static share page`);
  const pageSource = readFileSync(page.path, "utf8");
  assert.ok(pageSource.includes('property="og:title" content="나의 리더십 방향은?"'), `${page.name} page should keep the common OG title`);
  assert.ok(
    pageSource.includes('property="og:description" content="8개의 선택이 가리킨 리더십 방향을 확인하고, 나의 방향도 알아보세요."'),
    `${page.name} page should have the shared OG description`,
  );
  assert.ok(pageSource.includes(`property="og:image" content="${page.image}"`), `${page.name} page should have a result-specific OG image`);
  assert.ok(pageSource.includes('name="twitter:title" content="나의 리더십 방향은?"'), `${page.name} page should keep the common Twitter title`);
  assert.ok(pageSource.includes(`name="twitter:image" content="${page.image}"`), `${page.name} page should have a result-specific Twitter image`);
  assert.ok(pageSource.includes("공유된 리더십 방향은"), `${page.name} page should use neutral page wording`);
  assert.ok(pageSource.includes("나도 테스트 해보기"), `${page.name} page should invite visitors to take the test`);
  assert.ok(pageSource.includes("../.."), `${page.name} page should link back to the main test`);
}

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
assert.ok(buildSource.includes('"/assets/selection-game-qr.png"'), "Build output should route the QR image asset");
for (const page of sharePages) {
  assert.ok(buildSource.includes(`"${page.route}"`), `${page.route} should be routed by the build output`);
  assert.ok(buildSource.includes(`readFileSync("${page.path}"`), `${page.path} should be included in the build output`);
}
for (const imagePath of resultImagePaths) {
  assert.ok(buildSource.includes(`"/${imagePath}"`), `${imagePath} should be routed by the build output`);
  assert.ok(buildSource.includes(`readFileSync("${imagePath}")`), `${imagePath} should be read as bytes`);
}
assert.ok(buildSource.includes("readFileSync(\"assets/og-image.png\")"), "Build script should read the OG image as bytes");
assert.ok(buildSource.includes("readFileSync(\"assets/selection-game-qr.png\")"), "Build script should read the QR image as bytes");
assert.ok(buildSource.includes("Uint8Array"), "Build script should decode binary assets before responding");
assert.ok(qrImageUrl.endsWith("/assets/selection-game-qr.png"), "QR image should have a stable public URL");

console.log("All share preview tests passed.");
