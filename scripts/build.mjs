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
};

const worker = `const files = ${JSON.stringify(sourceFiles)};

export default {
  async fetch(request) {
    const url = new URL(request.url);
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
