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
  "install-toolchain",
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

const basicLessonSlugs = {
  elixir: [
    "meet-iex",
    "values-and-types",
    "collections",
    "names-and-operators",
    "pattern-matching",
    "choices-and-guards",
    "functions-and-arity",
    "capture-enum-pipe",
    "modules-and-mix",
  ],
  erlang: [
    "meet-erl",
    "terms-and-types",
    "text-and-binaries",
    "variables-and-matching",
    "lists-and-patterns",
    "functions-and-arity",
    "clauses-and-guards",
    "recursion",
    "modules-and-beam",
  ],
};

test("keeps both From Scratch paths complete and independent", () => {
  assert.equal(Object.keys(basicLessonSlugs).length, 2);

  for (const [language, slugs] of Object.entries(basicLessonSlugs)) {
    assert.equal(slugs.length, 9, language);
    assert.equal(new Set(slugs).size, slugs.length, language);
  }
});

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
  assert.match(html, /2<\/strong><span>条从零路线/);
  assert.match(html, /18<\/strong><span>节基础语法/);
  assert.match(html, /11<\/strong><span>站 BEAM 主线/);
  assert.match(html, /2<\/strong><span>站可选复习/);
  assert.match(html, /FROM SCRATCH/);
  assert.match(html, /INTERMEDIATE/);
  assert.match(html, /ADVANCED/);
  assert.match(html, /从值和类型开始/);
  assert.match(html, /让进程合作/);
  assert.match(html, /让系统扛住故障/);
  assert.match(html, /先猜结果，再运行代码/);
  assert.match(html, />怎么学</);
  assert.match(html, />消息实验</);
  assert.match(html, /做一个任务调度器/);
  assert.match(html, /process · mailbox<br\/>scheduler · isolation/);
  for (const title of [
    "装好工具",
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
  assert.match(html, /href="\/from-scratch\/elixir"/);
  assert.match(html, /href="\/from-scratch\/erlang"/);
  assert.match(html, /href="\/learn\/start-line"/);
  assert.match(html, /href="\/learn\/shared-semantics"/);
  assert.match(html, /写法不同，骨架相通/);
  assert.match(html, /class="optional-review-badge">可选复习/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /Your site is taking shape|Starter Project/i);
});

test("renders an accessible light, dark and system theme control", async () => {
  for (const pathname of ["/", "/learn/start-line"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();

    assert.match(
      html,
      /<html(?=[^>]*lang="zh-CN")(?=[^>]*data-theme="system")(?=[^>]*data-theme-preference="system")[^>]*>/i,
      pathname,
    );
    assert.match(html, /role="group" aria-label="显示主题"/, pathname);
    assert.match(html, /aria-label="浅色模式"/, pathname);
    assert.match(html, /aria-label="深色模式"/, pathname);
    assert.match(html, /aria-label="跟随系统"/, pathname);
    assert.equal(
      (
        html.match(/class="theme-option(?: is-active)?"/g) ?? []
      ).length,
      3,
      pathname,
    );
    assert.match(
      html,
      /class="theme-option is-active"[^>]*aria-label="跟随系统"[^>]*aria-pressed="true"/,
      pathname,
    );
  }
});

test("renders two independent From Scratch path overviews", async () => {
  const overviewResponse = await render("/from-scratch");
  assert.equal(overviewResponse.status, 200);
  const overview = await overviewResponse.text();

  assert.match(overview, /先学会读代码/);
  assert.match(overview, /再走进 BEAM/);
  assert.match(overview, /不必两条都学完/);
  assert.match(overview, /2<\/strong><span>条独立路线/);
  assert.match(overview, /18<\/strong><span>节基础课/);
  assert.match(overview, /第 0 步：安装 Erlang \/ Elixir \/ Mix/);
  assert.match(overview, /href="\/learn\/install-toolchain"/);
  assert.match(overview, /href="\/from-scratch\/elixir"/);
  assert.match(overview, /href="\/from-scratch\/erlang"/);
  assert.match(overview, /href="\/learn\/start-line"/);

  for (const [language, slugs] of Object.entries(basicLessonSlugs)) {
    const response = await render(`/from-scratch/${language}`);
    assert.equal(response.status, 200, language);
    const html = await response.text();

    assert.match(html, /一课只解决一个问题/);
    assert.match(html, /还没安装？看安装步骤/);
    assert.match(html, /走上 BEAM 起跑线/);
    assert.match(html, /课程依据/);
    for (const slug of slugs) {
      assert.match(
        html,
        new RegExp(`href="\\/from-scratch\\/${language}\\/${slug}"`),
      );
    }
  }
});

test("renders all 18 beginner lessons with the slow-reading template", async () => {
  for (const [language, slugs] of Object.entries(basicLessonSlugs)) {
    for (const slug of slugs) {
      const response = await render(`/from-scratch/${language}/${slug}`);
      assert.equal(response.status, 200, `${language}/${slug}`);
      const html = await response.text();

      assert.match(html, /这一课只做一件事/, `${language}/${slug}`);
      assert.match(html, /符号拆解/, `${language}/${slug}`);
      assert.match(html, /先猜，再运行/, `${language}/${slug}`);
      assert.match(html, /按行读/, `${language}/${slug}`);
      assert.match(html, /轮到你改一处/, `${language}/${slug}`);
      assert.match(html, /目标结果/, `${language}/${slug}`);
      assert.match(html, /想一想/, `${language}/${slug}`);
      assert.match(html, /记住三句/, `${language}/${slug}`);
      assert.match(html, /aria-current="page"/, `${language}/${slug}`);
      assert.match(html, /aria-pressed="false"/, `${language}/${slug}`);
      assert.match(html, /标记学完/, `${language}/${slug}`);
    }
  }

  const badLanguage = await render("/from-scratch/ruby");
  assert.equal(badLanguage.status, 404);
  const badLesson = await render("/from-scratch/elixir/not-a-lesson");
  assert.equal(badLesson.status, 404);
});

test("explains arity, trim and capture shorthand before using them as magic", async () => {
  const elixirChoices = await (
    await render("/from-scratch/elixir/choices-and-guards")
  ).text();
  assert.match(elixirChoices, /打开分支块/);
  assert.match(elixirChoices, /结束整个 <code[^>]*>case<\/code>/);

  const elixirFunctions = await (
    await render("/from-scratch/elixir/functions-and-arity")
  ).text();
  assert.match(elixirFunctions, /String\.trim\/1/);
  assert.match(elixirFunctions, /String\.trim\(text\)/);
  assert.match(elixirFunctions, /是除以 1 吗/);
  assert.match(elixirFunctions, /不是。这里的/);
  assert.match(elixirFunctions, /fn number -&gt; number \* 2 end/);
  assert.match(elixirFunctions, /匿名函数调用时/);
  assert.match(elixirFunctions, /把花括号中表达式的结果放进字符串/);

  const elixirCapture = await (
    await render("/from-scratch/elixir/capture-enum-pipe")
  ).text();
  assert.match(elixirCapture, /不是一个独立变量/);
  assert.match(elixirCapture, /fn number -&gt; number \* 2 end/);
  assert.match(elixirCapture, /&amp;\(&amp;1 \* 2\)/);
  assert.match(elixirCapture, /&amp;String\.trim\/1/);
  assert.match(elixirCapture, /管道把左边结果放到右边的第一个参数/);

  const erlangFunctions = await (
    await render("/from-scratch/erlang/functions-and-arity")
  ).text();
  assert.match(erlangFunctions, /string:trim\/1/);
  assert.match(erlangFunctions, /string:trim\(Text\)/);
  assert.match(erlangFunctions, /叫 arity，不是除法/);
  assert.match(erlangFunctions, /冒号连接模块与函数/);

  const erlangText = await (
    await render("/from-scratch/erlang/text-and-binaries")
  ).text();
  assert.match(erlangText, /得到 <code[^>]*>6<\/code>/);
  assert.match(erlangText, /6 个字节，不是 2 个汉字/);

  const erlangRecursion = await (
    await render("/from-scratch/erlang/recursion")
  ).text();
  assert.match(erlangRecursion, /fun Loop\(\[\]\) -&gt;/);
  assert.match(erlangRecursion, /Double\(\[1, 2, 3\]\)/);
  assert.match(erlangRecursion, /function_clause/);
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
  assert.match(html, /href="\/learn\/install-toolchain"/);
  assert.match(html, /打开安装准备/);
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
  assert.match(html, /发出请求前，先生成本次调用专用的 reference/);
  assert.match(html, /只接收带有同一 reference 的回复/);
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
  assert.match(html, /href="\/learn\/install-toolchain"/);
  assert.match(html, /值、模式、函数(?:或|和)模块还陌生/);
  assert.doesNotMatch(html, /看到 <code>\/1<\/code>、<code>&amp;1<\/code>/);
  assert.match(html, /href="\/from-scratch\/elixir"/);
  assert.match(html, /href="\/from-scratch\/erlang"/);
  assert.match(
    html,
    /https:\/\/hexdocs\.pm\/elixir\/introduction-to-mix\.html/,
  );
});

test("recommended BEAM navigation skips optional language reviews", async () => {
  const cases = [
    {
      slug: "beam-mental-model",
      previous: "start-line",
      next: "shared-semantics",
    },
    {
      slug: "elixir-foundations",
      previous: "beam-mental-model",
      next: "shared-semantics",
    },
    {
      slug: "erlang-foundations",
      previous: "beam-mental-model",
      next: "shared-semantics",
    },
    {
      slug: "shared-semantics",
      previous: "beam-mental-model",
      next: "processes-and-mailboxes",
    },
  ];

  for (const item of cases) {
    const response = await render(`/learn/${item.slug}`);
    assert.equal(response.status, 200, item.slug);
    const html = await response.text();
    const pagination = html.match(
      /<nav class="lesson-pagination"[\s\S]*?<\/nav>/,
    )?.[0];

    assert.ok(pagination, `${item.slug} pagination`);
    assert.match(
      pagination,
      new RegExp(`href="\\/learn\\/${item.previous}"`),
      `${item.slug} previous`,
    );
    assert.match(
      pagination,
      new RegExp(`href="\\/learn\\/${item.next}"`),
      `${item.slug} next`,
    );
  }

  const optionalReview = await (
    await render("/learn/elixir-foundations")
  ).text();
  assert.match(optionalReview, /可选复习/);
  assert.match(optionalReview, /href="\/#beam-roadmap"/);
});

test("puts a three-platform installation guide before the start line", async () => {
  const response = await render("/learn/install-toolchain");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /装好工具/);
  assert.match(html, /Mix 已包含在 Elixir 里/);
  assert.match(html, /只走你电脑这一条路/);
  assert.match(html, /11(?:<!-- -->)? 站主线/);
  assert.match(html, /2(?:<!-- -->)? 站可选复习/);
  assert.match(html, />macOS</);
  assert.match(html, />Linux</);
  assert.match(html, />Windows</);
  assert.match(html, /brew install elixir/);
  assert.match(html, /install\.sh elixir@1\.20\.2 otp@28\.4/);
  assert.match(html, /64-bit Windows Installer/);
  assert.match(html, /iex\.bat/);
  assert.match(html, /erl -s erlang halt/);
  assert.match(html, /elixir --version/);
  assert.match(html, /mix --version/);
  assert.equal(
    (
      html.match(
        /<article class="installation-guide-card installation-guide-card--/g,
      ) ?? []
    ).length,
    3,
  );
  assert.match(html, /href="https:\/\/elixir-lang\.org\/install\/"/);
  assert.match(html, /href="https:\/\/www\.erlang\.org\/downloads"/);
  assert.match(html, /href="\/from-scratch"/);
  assert.match(html, /选择一条从零路线/);

  const startLine = await (await render("/learn/start-line")).text();
  assert.match(startLine, /如果值、模式、函数(?:或|和)模块还陌生/);
  assert.match(startLine, /Elixir 和 Erlang 任选一条/);
  assert.doesNotMatch(startLine, /看到 .*&amp;1.*模式匹配/s);
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
  assert.match(html, /href="\/learn\/install-toolchain"/);
  assert.match(html, /安装本地工具/);
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
    playgroundSource,
    basicPathData,
    basicProgressSource,
    themeSwitcherSource,
    fromScratchStyles,
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
      readFile(
        new URL("../app/components/ElixirPlayground.tsx", import.meta.url),
        "utf8",
      ),
      readFile(new URL("../app/basic-path-data.ts", import.meta.url), "utf8"),
      readFile(
        new URL("../app/components/BasicProgress.tsx", import.meta.url),
        "utf8",
      ),
      readFile(
        new URL("../app/components/ThemeSwitcher.tsx", import.meta.url),
        "utf8",
      ),
      readFile(
        new URL(
          "../app/from-scratch/from-scratch.module.css",
          import.meta.url,
        ),
        "utf8",
      ),
    ]);

  const elixirLessonBlocks = [
    ...courseData.matchAll(
      /\n\s+elixirCode:\s*`([\s\S]*?)`,\n\s+erlangCode:/g,
    ),
  ].map((match) => match[1]);
  const erlangLessonBlocks = [
    ...courseData.matchAll(
      /\n\s+erlangCode:\s*`([\s\S]*?)`,\n\s+codeCaption:/g,
    ),
  ].map((match) => match[1]);
  const experimentCommands = [
    ...courseData.matchAll(
      /\n\s+command:\s*`([\s\S]*?)`,\n\s+expected:/g,
    ),
  ].map((match) => match[1]);
  const playgroundBlocks = [
    ...playgroundSource.matchAll(/\n\s+code:\s*`([\s\S]*?)`,/g),
  ].map((match) => match[1]);

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
  assert.match(layout, /colorScheme:\s*"light dark"/);
  assert.match(layout, /prefers-color-scheme: dark/);
  assert.match(layout, /localStorage\.getItem\("beam-path-theme"\)/);
  assert.match(layout, /suppressHydrationWarning/);
  assert.ok(layout.indexOf("<script") < layout.indexOf("<body"));
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
    14,
  );
  assert.equal((keywordData.match(/\n\s+analogy:/g) ?? []).length, 13);
  assert.ok(
    courseData.includes('[\\" INFO boot \\", \\" \\", \\"ERROR timeout\\"]'),
  );
  assert.doesNotMatch(courseData, /\[' INFO boot ', ' ', 'ERROR timeout'\]/);
  assert.match(contentStyleGuide, /比喻只用于引出概念，不能代替技术定义/);
  assert.match(contentStyleGuide, /把报错写成可以观察和处理的结果/);
  assert.match(contentStyleGuide, /注释只解释意图、数据流、消息去向和失败边界/);
  assert.equal((basicPathData.match(/\n    number: "\d\d",/g) ?? []).length, 18);
  assert.match(basicPathData, /String\.trim\/1/);
  assert.match(basicPathData, /`&1` 不是一个独立变量/);
  assert.match(basicPathData, /string:trim\/1/);
  assert.match(basicPathData, /Erlang 没有单独的 string 类型/);
  assert.match(basicProgressSource, /beam-path-basics-progress\.v1/);
  assert.doesNotMatch(basicProgressSource, /beam-path-progress\.v1/);
  assert.match(basicProgressSource, /`\$\{language\}:\$\{slug\}`/);
  assert.match(themeSwitcherSource, /"light" \| "dark" \| "system"/);
  assert.match(themeSwitcherSource, /localStorage\.setItem\(STORAGE_KEY/);
  assert.match(themeSwitcherSource, /matchMedia\(DARK_MODE_QUERY\)/);
  assert.match(themeSwitcherSource, /addEventListener\("change", syncTheme\)/);
  assert.match(themeSwitcherSource, /root\.dataset\.themePreference/);
  assert.doesNotMatch(themeSwitcherSource, /<svg\b/);
  const elixirBasicsStart = basicPathData.indexOf(
    "const elixirLessons: BasicLesson[]",
  );
  const elixirArityLesson = basicPathData.indexOf(
    'slug: "functions-and-arity"',
    elixirBasicsStart,
  );
  const elixirCaptureLesson = basicPathData.indexOf(
    'slug: "capture-enum-pipe"',
    elixirBasicsStart,
  );
  const erlangBasicsStart = basicPathData.indexOf(
    "const erlangLessons: BasicLesson[]",
  );
  const erlangArityLesson = basicPathData.indexOf(
    'slug: "functions-and-arity"',
    erlangBasicsStart,
  );
  const erlangVariablesLesson = basicPathData.indexOf(
    'slug: "variables-and-matching"',
    erlangBasicsStart,
  );
  assert.doesNotMatch(
    basicPathData.slice(elixirBasicsStart, elixirArityLesson),
    /\/\d/,
  );
  assert.doesNotMatch(
    basicPathData.slice(elixirBasicsStart, elixirCaptureLesson),
    /&1/,
  );
  assert.doesNotMatch(
    basicPathData.slice(erlangBasicsStart, erlangArityLesson),
    /\/\d/,
  );
  assert.doesNotMatch(
    basicPathData.slice(erlangBasicsStart, erlangVariablesLesson),
    /^\s*[A-Z][A-Za-z0-9_]*\s*=/m,
  );
  assert.match(courseData, /stations:\s*courseModules\.length/);
  assert.equal((courseData.match(/optionalReview:\s*true/g) ?? []).length, 2);
  assert.match(courseData, /mainlineStations:\s*recommendedCourseModules\.length/);
  assert.match(
    courseData,
    /\.find\(\(courseModule\) => !courseModule\.optionalReview\)/,
  );
  assert.equal(elixirLessonBlocks.length, 13);
  assert.equal(erlangLessonBlocks.length, 13);
  assert.equal(experimentCommands.length, 13);
  assert.equal(playgroundBlocks.length, 3);
  for (const [index, block] of elixirLessonBlocks.entries()) {
    assert.ok(
      (block.match(/^\s*#\s+\S/gm) ?? []).length >= 2,
      `Elixir lesson ${index + 1} needs explanatory comments`,
    );
    assert.doesNotMatch(
      block,
      /^\s*%%?\s+\S/m,
      `Elixir lesson ${index + 1} uses Erlang comments`,
    );
  }
  for (const [index, block] of erlangLessonBlocks.entries()) {
    assert.ok(
      (block.match(/^\s*%%\s+\S/gm) ?? []).length >= 2,
      `Erlang lesson ${index + 1} needs explanatory comments`,
    );
    assert.doesNotMatch(
      block,
      /^\s*#\s+\S/m,
      `Erlang lesson ${index + 1} uses Elixir comments`,
    );
  }
  for (const [index, block] of experimentCommands.entries()) {
    assert.match(
      block,
      /^\s*#\s+\S/m,
      `experiment ${index + 1} needs an explanatory comment`,
    );
  }
  for (const [index, block] of playgroundBlocks.entries()) {
    assert.ok(
      (block.match(/^\s*#\s+\S/gm) ?? []).length >= 3,
      `Playground example ${index + 1} needs explanatory comments`,
    );
  }
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
  assert.match(globalStyles, /html\[data-theme="dark"\]/);
  assert.match(
    globalStyles,
    /@media \(prefers-color-scheme:\s*dark\)[\s\S]*html\[data-theme="system"\]/,
  );
  assert.match(globalStyles, /\.theme-option\.is-active/);
  assert.match(
    fromScratchStyles,
    /:global\(html\[data-theme="dark"\]\) \.lessonPage/,
  );
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
  assert.match(
    globalStyles,
    /\.acceptance-card ul\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s,
  );
  assert.match(
    globalStyles,
    /\.acceptance-card \.inline-code-text\s*\{[^}]*white-space:\s*nowrap/s,
  );
  assert.match(
    globalStyles,
    /@media \(max-width:\s*1120px\)[\s\S]*?\.installation-heading,\s*\.installation-guide-card\s*\{[^}]*grid-template-columns:\s*1fr/s,
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
