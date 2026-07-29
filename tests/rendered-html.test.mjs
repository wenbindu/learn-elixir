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

test("start line introduces Mix as a project build tool", async () => {
  const response = await render("/learn/start-line");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /随 Elixir 安装的构建工具/);
  assert.match(html, /mix\.exs/);
  assert.match(html, /mix new beam_probe/);
  assert.match(html, /mix test/);
  assert.match(html, /Mix 与 IEx、OTP、Hex 的职责边界/);
  assert.match(
    html,
    /https:\/\/elixir-lang\.org\/getting-started\/mix-otp\/introduction-to-mix\.html/,
  );
});

test("renders an embedded Elixir playground with safe fallback guidance", async () => {
  const response = await render("/playground");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Elixir 在线 Playground/);
  assert.match(html, /codapi\.org\/embed/);
  assert.match(html, /sandbox="allow-scripts allow-same-origin"/);
  assert.match(html, /管道与 Enum/);
  assert.match(html, /模式匹配/);
  assert.match(html, /进程与消息/);
  assert.match(html, /这是第三方运行环境/);
  assert.match(html, /不要粘贴密码/);
  assert.match(html, /在新窗口打开/);
});

test("renders a complete Elixir and Erlang keyword dictionary", async () => {
  const response = await render("/keywords");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Elixir \+ Erlang 关键字字典/);
  assert.match(html, /<strong>15<\/strong>.*Elixir 严格保留字/s);
  assert.match(html, /<strong>29<\/strong>.*Erlang 严格保留字/s);
  assert.match(html, /<b>44<\/b>.*个词法保留字/s);
  assert.match(html, /严格保留字/);
  assert.match(html, /Elixir 特殊形式/);
  assert.match(html, /常用宏与声明/);
  assert.match(html, /搜索 when、receive、模式匹配/);
  assert.match(html, />when</);
  assert.match(html, />receive</);
  assert.match(html, />maybe</);
  assert.match(html, /cond.*let.*已保留但未使用/s);
  assert.match(html, /keyword list 是另一件事/);

  const reservedWords = [
    "true",
    "false",
    "nil",
    "when",
    "and",
    "or",
    "not",
    "in",
    "fn",
    "do",
    "end",
    "catch",
    "rescue",
    "after",
    "else",
    "andalso",
    "band",
    "begin",
    "bnot",
    "bor",
    "bsl",
    "bsr",
    "bxor",
    "case",
    "cond",
    "div",
    "fun",
    "if",
    "let",
    "maybe",
    "of",
    "orelse",
    "receive",
    "rem",
    "try",
    "xor",
  ];
  for (const word of reservedWords) {
    assert.match(html, new RegExp(`>${word}<\\/code>`));
  }

  assert.equal(
    (html.match(/keyword-entry keyword-entry--reserved/g) ?? []).length,
    44,
  );
  assert.match(
    html,
    /https:\/\/hexdocs\.pm\/elixir\/syntax-reference\.html#reserved-words/,
  );
  assert.match(
    html,
    /https:\/\/www\.erlang\.org\/doc\/system\/reference_manual\.html/,
  );
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
  assert.match(localScript, /start\).*start_server/s);
  assert.match(localScript, /stop\).*stop_server/s);
  assert.match(localScript, /restart\).*stop_server.*start_server/s);
  assert.match(localScript, /status\).*show_status/s);
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
