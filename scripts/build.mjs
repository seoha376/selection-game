import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const sourceFiles = {
  "/": {
    contentType: "text/html; charset=utf-8",
    body: readFileSync("index.html", "utf8"),
  },
  "/index.html": {
    contentType: "text/html; charset=utf-8",
    body: readFileSync("index.html", "utf8"),
  },
  "/src/styles.css": {
    contentType: "text/css; charset=utf-8",
    body: readFileSync("src/styles.css", "utf8"),
  },
  "/src/app.js": {
    contentType: "text/javascript; charset=utf-8",
    body: readFileSync("src/app.js", "utf8"),
  },
  "/src/results.js": {
    contentType: "text/javascript; charset=utf-8",
    body: readFileSync("src/results.js", "utf8"),
  },
  "/src/analytics.js": {
    contentType: "text/javascript; charset=utf-8",
    body: readFileSync("src/analytics.js", "utf8"),
  },
};

const binaryFiles = {
  "/assets/og-image.png": {
    contentType: "image/png",
    body: readFileSync("assets/og-image.png").toString("base64"),
  },
};

const worker = `const files = ${JSON.stringify(sourceFiles)};
const binaryFiles = ${JSON.stringify(binaryFiles)};

function decodeBase64(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const binaryFile = binaryFiles[url.pathname];
    if (binaryFile) {
      return new Response(decodeBase64(binaryFile.body), {
        headers: {
          "Content-Type": binaryFile.contentType,
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    const file = files[url.pathname] || files["/"];

    return new Response(file.body, {
      headers: {
        "Content-Type": file.contentType,
        "Cache-Control": "public, max-age=60",
      },
    });
  },
};
`;

rmSync("dist", { recursive: true, force: true });
mkdirSync(dirname(join("dist", "server", "index.js")), { recursive: true });
writeFileSync(join("dist", "server", "index.js"), worker);
