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

const lessonSlugs = [
  "start-line",
  "beam-mental-model",
  "elixir-foundations",
  "erlang-foundations",
  "shared-semantics",
  "processes-and-mailboxes",
  "otp-behaviours",
  "supervision-trees",
  "state-and-backpressure",
  "distributed-operations",
  "interoperability",
  "reliable-scheduler",
];

test("server-renders the complete Chinese tutorial homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.match(html, /<title>BEAM Path — 学 Erlang 和 Elixir<\/title>/i);
  assert.match(html, /动手学/);
  assert.match(html, /Erlang/);
  assert.match(html, /Elixir/);
  assert.match(html, /12<\/strong><span>学习小站/);
  assert.match(html, /46<\/strong><span>次练习与自查/);
  assert.match(html, /先猜，再运行/);
  assert.match(html, />怎么学</);
  assert.match(html, />消息实验</);
  assert.match(html, /做一个任务调度器/);
  assert.match(html, /process · mailbox<br\/>scheduler · isolation/);
  for (const title of [
    "起跑线",
    "进程与信箱",
    "Elixir 数据流水线",
    "读懂 Erlang",
    "两种语言对暗号",
    "消息与超时",
    "OTP 消息章法",
    "会重启的监督树",
    "给并发设上限",
    "BEAM 节点失联",
    "双语搭档",
    "可靠任务小队",
  ]) {
    assert.match(html, new RegExp(`>${title}<`));
  }
  assert.match(
    html,
    /<meta(?=[^>]*property="og:image")(?=[^>]*content="https?:\/\/[^"]+\/og\.png")[^>]*>/i,
  );
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /Your site is taking shape|Starter Project/i);
});

test("homepage previews requested resources and links to the full directory", async () => {
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
  assert.match(html, /href="\/resources"/);
  assert.match(html, /打开学习工具箱/);
});

test("renders the Markdown-driven resource directory", async () => {
  const response = await render("/resources");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Elixir \+ Erlang 学习工具箱/);
  assert.match(html, /BEAM 学习工具箱/);
  assert.match(html, /可搜索目录/);
  assert.match(html, /搜索 Elixir School、安装、练习/);

  for (const category of [
    "官方文档",
    "教程与课程",
    "包与工具",
    "社区",
    "在线练习",
  ]) {
    assert.match(html, new RegExp(`>${category}<`));
  }

  for (const href of [
    "https://elixirschool.com/zh-hans/",
    "https://elixir-lang.org/install/",
    "https://www.erlang.org/downloads",
    "https://hex.pm/",
    "https://elixirforum.com/",
    "https://exercism.org/tracks/elixir",
  ]) {
    assert.match(html, new RegExp(`href="${href.replaceAll("/", "\\/")}"`));
  }

  assert.equal(
    (
      html.match(
        /resource-directory-card resource-directory-card--(?:elixir|erlang|beam|tool)/g,
      ) ?? []
    ).length,
    14,
  );
});

test("renders a shareable lesson route with the full teaching template", async () => {
  const response = await render("/learn/processes-and-mailboxes");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /消息与超时/);
  assert.match(html, /为什么学这一站/);
  assert.match(html, /借一个故事/);
  assert.match(html, /镖局回执/);
  assert.match(html, /比喻到这里/);
  assert.match(html, /同一件事，两种写法/);
  assert.match(html, />动手</);
  assert.match(html, /故意弄坏/);
  assert.match(html, /这次能看清/);
  assert.match(html, /这次还不能说明/);
  assert.match(html, /想一想/);
  assert.match(html, /提示 4/);
  assert.match(html, /记住三句话/);
  assert.match(html, /href="\/learn\/otp-behaviours"/);
});

test("gives every lesson a story bridge with an explicit analogy boundary", async () => {
  const pages = await Promise.all(
    lessonSlugs.map(async (slug) => {
      const response = await render(`/learn/${slug}`);
      assert.equal(response.status, 200, slug);
      return response.text();
    }),
  );

  for (const [index, html] of pages.entries()) {
    assert.equal(
      (html.match(/class="lesson-story-bridge"/g) ?? []).length,
      1,
      lessonSlugs[index],
    );
    assert.match(html, /回到代码/, lessonSlugs[index]);
    assert.match(html, /比喻到这里/, lessonSlugs[index]);
  }

  const allLessons = pages.join("\n");
  for (const story of [
    "大闹天宫",
    "古代驿站",
    "唐诗",
    "古文句读",
    "唐代驿路",
    "三国演义",
    "都江堰",
    "长城烽火台",
    "文言与白话",
  ]) {
    assert.match(allLessons, new RegExp(story));
  }
});

test("start line introduces Mix as a project build tool", async () => {
  const response = await render("/learn/start-line");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Elixir 的项目工具/);
  assert.match(html, /《大闹天宫》/);
  assert.match(html, /mix\.exs/);
  assert.match(html, /mix new beam_probe/);
  assert.match(html, /mix test/);
  assert.match(html, /Mix 不等于 BEAM、OTP 或 Hex/);
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
  assert.match(html, /Codapi 是第三方服务/);
  assert.match(html, /不要放密码/);
  assert.match(html, /输出和报错都在下方/);
  assert.match(html, /在新窗口打开/);
});

test("renders a complete Elixir and Erlang keyword dictionary", async () => {
  const response = await render("/keywords");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Elixir \+ Erlang 关键字字典/);
  assert.match(html, /<strong>15<\/strong>.*Elixir 严格保留字/s);
  assert.match(html, /<strong>29<\/strong>.*Erlang 严格保留字/s);
  assert.match(html, /<b>44<\/b>.*个语言保留字/s);
  assert.match(html, /严格保留字/);
  assert.match(html, /Elixir 特殊形式/);
  assert.match(html, /常用宏与声明/);
  assert.match(html, /搜索 when、receive、模式匹配/);
  assert.match(html, />when</);
  assert.match(html, />receive</);
  assert.match(html, />maybe</);
  assert.match(html, /cond.*let.*虽然被保留/s);
  assert.match(html, /关键字列表不是保留字/);
  assert.match(html, /帮助理解/);
  assert.match(html, /城门先核对姓名/);

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
  const [
    layout,
    packageJson,
    courseData,
    resourceData,
    resourceMarkdown,
    localScript,
    localConfig,
    globalStyles,
    keywordData,
    contentStyleGuide,
  ] =
    await Promise.all([
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
      readFile(new URL("../app/course-data.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/resource-data.ts", import.meta.url), "utf8"),
      readFile(new URL("../content/resources.md", import.meta.url), "utf8"),
      readFile(new URL("../scripts/start-local.sh", import.meta.url), "utf8"),
      readFile(new URL("../config/local.env", import.meta.url), "utf8"),
      readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
      readFile(new URL("../app/keywords/keyword-data.ts", import.meta.url), "utf8"),
      readFile(new URL("../docs/content-style-guide.md", import.meta.url), "utf8"),
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
  assert.match(layout, /@vercel\/analytics\/next/);
  assert.match(layout, /@vercel\/speed-insights\/next/);
  assert.match(layout, /<Analytics\s*\/>/);
  assert.match(layout, /<SpeedInsights\s*\/>/);
  assert.doesNotMatch(courseData, /export const resources/);
  assert.match(resourceData, /import "server-only"/);
  assert.match(resourceData, /content", "resources\.md"/);
  assert.match(resourceData, /parseResourceMarkdown/);
  assert.match(resourceMarkdown, /https:\/\/elixir-lang\.org\/install\//);
  assert.match(resourceMarkdown, /https:\/\/www\.erlang\.org\/downloads/);
  assert.match(
    resourceMarkdown,
    /- \[Elixir School 中文\]\(https:\/\/elixirschool\.com\/zh-hans\/\) — 中文教程，涵盖 Elixir 语法、工具和常见主题。/,
  );
  assert.match(resourceMarkdown, /- featured: true/);
  assert.equal(
    (courseData.match(/storyBridge:\s*\{/g) ?? []).length,
    13,
  );
  assert.equal((keywordData.match(/\n\s+analogy:/g) ?? []).length, 13);
  assert.ok(
    courseData.includes('[\\" INFO boot \\", \\" \\", \\"ERROR timeout\\"]'),
  );
  assert.doesNotMatch(courseData, /\[' INFO boot ', ' ', 'ERROR timeout'\]/);
  assert.match(contentStyleGuide, /比喻只用于引出概念，不能代替技术定义/);
  assert.match(contentStyleGuide, /把报错写成可以观察和处理的结果/);
  assert.match(packageJson, /"dev": "next dev"/);
  assert.match(packageJson, /"@vercel\/analytics"/);
  assert.match(packageJson, /"@vercel\/speed-insights"/);
  assert.doesNotMatch(packageJson, /vite|vinext|wrangler/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(localScript, /exec npm run dev/);
  assert.match(localScript, /start\).*start_server/s);
  assert.match(localScript, /stop\).*stop_server/s);
  assert.match(localScript, /restart\).*stop_server.*start_server/s);
  assert.match(localScript, /status\).*show_status/s);
  assert.match(localConfig, /BEAM_PATH_PORT=3000/);
  assert.match(globalStyles, /--text-micro:\s*11px/);
  assert.match(globalStyles, /--text-code:\s*14px/);
  assert.doesNotMatch(globalStyles, /font-size:\s*(?:[7-9]|10)px/);
  assert.match(
    globalStyles,
    /\.hero-visual\s*\{[^}]*overflow:\s*hidden/s,
  );
  assert.match(
    globalStyles,
    /\.beam-core small\s*\{[^}]*width:\s*124px[^}]*text-align:\s*center/s,
  );
  assert.match(
    globalStyles,
    /\.keyword-entry-copy p\s*\{[^}]*font-size:\s*var\(--text-control\)/s,
  );
  assert.match(
    globalStyles,
    /\.keyword-entry > pre code\s*\{[^}]*font-size:\s*var\(--text-code\)/s,
  );

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
