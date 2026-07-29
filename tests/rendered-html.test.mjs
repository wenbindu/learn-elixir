import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${pathname.replaceAll("/", "-")}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
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
    /<meta(?=[^>]*property="og:image")(?=[^>]*content="http:\/\/localhost(?::3000)?\/og\.png")[^>]*>/i,
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

test("ships branded favicon assets and removes disposable starter code", async () => {
  const [layout, packageJson, courseData] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/course-data.ts", import.meta.url), "utf8"),
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
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
  await access(projectRoot);
});
