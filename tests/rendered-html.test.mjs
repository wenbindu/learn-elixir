import assert from "node:assert/strict";
import { once } from "node:events";
import { access, readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import next from "next";

const projectRoot = new URL("../", import.meta.url);
const projectDirectory = fileURLToPath(projectRoot);
let app;
let server;
let origin;

before(async () => {
  app = next({
    dev: false,
    dir: projectDirectory,
    hostname: "127.0.0.1",
  });
  await app.prepare();

  const requestHandler = app.getRequestHandler();
  server = createServer((request, response) => {
    void requestHandler(request, response);
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");

  const address = server.address();
  assert.ok(address && typeof address !== "string");
  origin = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
      server.closeAllConnections();
    });
  }
  if (app) await app.close();
});

async function render(pathname = "/") {
  return fetch(new URL(pathname, origin), {
    headers: { accept: "text/html" },
  });
}

test("server-renders the complete Chinese tutorial homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.match(html, /<title>BEAM Path — Erlang \+ Elixir 交互式学习路径<\/title>/i);
  assert.match(html, /学透/);
  assert.match(html, /Erlang/);
  assert.match(html, /Elixir/);
  assert.match(html, /12[^<]*模块/);
  assert.match(html, /46[^<]*检查点/);
  assert.match(html, /学习系统，而不只是教程/);
  assert.match(html, /语义模拟器/);
  assert.match(html, /可靠任务调度器/);
  assert.match(
    html,
    /<meta(?=[^>]*property="og:image")(?=[^>]*content="https?:\/\/[^"]+\/og\.png")[^>]*>/i,
  );
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /Your site is taking shape|Starter Project/i);
});

test("homepage includes every explicitly requested resource link", async () => {
  const response = await render("/");
  const html = await response.text();

  for (const href of [
    "https://hex.pm/",
    "https://elixirforum.com/",
    "https://elixir-lang.org/install/",
    "https://www.erlang.org/downloads",
  ]) {
    assert.match(html, new RegExp(`href="${href.replaceAll("/", "\\/")}"`));
  }

  assert.match(html, /HexDocs/);
  assert.match(html, /Erlang Forums/);
  assert.match(html, /Exercism/);
});

test("renders a shareable lesson route with the full teaching template", async () => {
  const response = await render("/learn/processes-and-mailboxes");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /从裸进程理解并发/);
  assert.match(html, /为什么先学这个/);
  assert.match(html, /双语代码桥/);
  assert.match(html, /可运行实验/);
  assert.match(html, /故意弄坏/);
  assert.match(html, /这个实验能证明/);
  assert.match(html, /这个实验不能证明/);
  assert.match(html, /快速自测/);
  assert.match(html, /提示 4/);
  assert.match(html, /复习卡/);
  assert.match(html, /href="\/learn\/otp-behaviours"/);
});

test("ships branded assets and keeps a native Next.js-only project", async () => {
  const [layout, packageJson, courseData, localScript, localConfig] =
    await Promise.all([
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
      readFile(new URL("../app/course-data.ts", import.meta.url), "utf8"),
      readFile(new URL("../scripts/start-local.sh", import.meta.url), "utf8"),
      readFile(new URL("../config/local.env", import.meta.url), "utf8"),
    ]);

  for (const path of [
    "../public/brand-icon.png",
    "../public/icon-512.png",
    "../public/apple-touch-icon.png",
    "../public/favicon.ico",
    "../public/favicon-32x32.png",
    "../public/og.png",
  ]) {
    await access(new URL(path, import.meta.url));
  }

  assert.match(layout, /\/favicon\.ico/);
  assert.match(layout, /\/apple-touch-icon\.png/);
  assert.match(layout, /themeColor:\s*"#07182d"/);
  assert.match(courseData, /https:\/\/elixir-lang\.org\/install\//);
  assert.match(courseData, /https:\/\/www\.erlang\.org\/downloads/);
  assert.match(packageJson, /"dev": "next dev"/);
  assert.doesNotMatch(packageJson, /vite|vinext|wrangler/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(localScript, /exec npm run dev/);
  assert.match(localConfig, /BEAM_PATH_PORT=3000/);

  for (const path of [
    "../app/_sites-preview/SkeletonPreview.tsx",
    "../vite.config.ts",
    "../worker/index.ts",
    "../drizzle.config.ts",
  ]) {
    await assert.rejects(access(new URL(path, import.meta.url)));
  }
  await access(projectRoot);
});
