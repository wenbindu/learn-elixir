import type { BasicLesson } from "../../app/basic-path-data";
import type { LessonMetadata } from "../../app/lesson-metadata";

export const meetIexMetadata: LessonMetadata = {
  id: "meet-iex",
  title: "先让代码说话",
  core_concept: ["return-value"],
  prerequisites: ["iex-session", "prompt"],
  reused_in: ["values-and-types", "functions-and-arity", "package-and-observe"],
  related: [],
  project_contribution: "给“行迹”文字统计工具打印第一行结果。",
  ability_after: "能区分 IO.puts 打印的文字和 IEx 显示的返回值",
  depth_pages: ["/from-scratch/elixir/meet-iex/deeper"],
};

export const meetIexLesson: BasicLesson = {
  metadata: meetIexMetadata,
  number: "02",
  slug: "meet-iex",
  stage: "scratch",
  title: meetIexMetadata.title,
  summary: "屏幕上的内容，都是 IO.puts 打印的吗？",
  duration: "5 分钟",
  goal: "运行一句打印代码。完成标准：说清屏幕上每一行是谁显示的。",
  plain: [
    "`lines=2` 是 `IO.puts` 打印的文字。`:ok` 是它交回的结果，叫返回值，由 IEx 显示，表示打印完成。",
  ],
  concepts: [
    { term: "IEx", explanation: "Elixir 的交互窗口，输入一小段代码就能看到结果。" },
    { term: "表达式", explanation: "一段会产生结果的代码。" },
    { term: "返回值", explanation: "代码算完后交回的结果。" },
  ],
  symbols: [
    { token: "iex", reading: "在终端输入它，打开 IEx。" },
    { token: "iex>", reading: "这是提示符。只输入它后面的代码，不要复制提示符。实际窗口也可能显示 `iex(1)>`。" },
    { token: "#", reading: "这一行是注释。Elixir 不会执行它。" },
    { token: "+ / *", reading: "加法用 `+`，乘法用 `*`，例如 `2 + 3` 得到 `5`，`7 * 6` 得到 `42`。" },
    { token: "String.upcase(\"cat\")", reading: "`String` 是模块名，模块把相关函数放在一起；`upcase` 是把文字转成大写的函数名；括号里放要处理的文字。" },
  ],
  example: {
    label: "输入这一行，按回车",
    code: 'IO.puts("lines=2")',
    caption: "在 IEx 中运行。",
    output: [
      "`IO.puts` 打印 `lines=2`，IEx 显示返回值 `:ok`。",
    ],
  },
  steps: [
    "先找报错中的 `String.upcas/1`，它指出出错的名字；`undefined or private` 表示这个名字不能这样调用。",
    "这里容易写错：`upcas` 少了末尾的 `e`。只改这一处，再运行下面一行，应该得到 `\"CAT\"`。",
  ],
  practice: {
    task: "去掉 `IO.puts(...)`，只留下文字。先猜：还会出现 `:ok` 吗？再运行验证，说出原因。",
    starter: '"lines=2"',
    expected: "能说明这次是否还会出现 :ok，以及原因。",
    hint: "这次还调用了 `IO.puts` 吗？",
    answer: '"lines=2"',
  },
  check: {
    question: "运行 `IO.puts(\"lines=2\")` 后，会出现一行还是两行？不数输入和提示符。",
    answer: "两行：`lines=2` 和 `:ok`。前者由 `IO.puts` 打印，后者是 IEx 显示的返回值。",
  },
  takeaways: [
    "`IO.puts` 负责打印文字。",
    "`:ok` 是这次打印完成后交回的结果。",
    "IEx 会显示代码交回的结果。",
  ],
};

export const meetIexActivity = {
  problem: "你要让文字统计工具显示 `lines=2`。运行一句打印代码，屏幕上会出现什么？",
  projectPreview: `输入文件 poem.txt：
长安 春风
又一程

成品的使用方式：
./trail_stats poem.txt
lines=2
words=3
chars=8`,
  transcript: "lines=2\n:ok",
  repair: 'String.upcase("cat")',
  secondHint: "IEx 会显示交回的结果；这次代码里只有一段文字。",
  answerExplanation: '只显示 `"lines=2"`，没有 `:ok`。这段代码直接交回文字，由 IEx 显示；没有调用 `IO.puts`。',
  depthQuestion: "为什么在 IEx 里多出 :ok，运行成品时却看不到它？",
};
