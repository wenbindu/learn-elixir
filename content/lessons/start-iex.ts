import type { BasicLesson } from "../../app/basic-path-data";
import type { LessonMetadata } from "../../app/lesson-metadata";

export const startIexMetadata: LessonMetadata = {
  id: "start-iex",
  title: "打开 IEx，再退出来",
  core_concept: ["iex-session", "prompt"],
  prerequisites: [],
  reused_in: ["meet-iex"],
  related: [],
  project_contribution: "准备好试跑代码的窗口，后面用它检查“行迹”的统计结果。",
  ability_after: "能进入 IEx，认出提示符，再退出回到终端命令行",
  depth_pages: ["/learn/install-toolchain"],
};

export const startIexLesson: BasicLesson = {
  metadata: startIexMetadata,
  number: "01",
  slug: "start-iex",
  stage: "scratch",
  title: startIexMetadata.title,
  summary: "在哪里输入 Elixir 代码？输完后怎么退出来？",
  duration: "3 分钟",
  goal: "进入 IEx，再退出；能指出屏幕上哪段提示表示已经进入。",
  plain: [
    "终端是输入命令的窗口。运行 `iex` 后，这个窗口里就启动了 IEx，用来试跑 Elixir 代码。",
    "`iex(1)>` 是提示符，表示 IEx 在等你输入代码；不用把它一起输入。",
    "第一次按 Ctrl+C 会出现 BREAK 菜单。再按一次 Ctrl+C，退出 IEx，回到原来的终端命令行。",
  ],
  concepts: [
    { term: "IEx", explanation: "试跑 Elixir 代码的窗口。" },
    { term: "提示符", explanation: "屏幕上提示你可以输入内容的标记。" },
  ],
  symbols: [
    { token: "iex", reading: "在 macOS 或 Linux 终端输入，再按回车。" },
    { token: "iex.bat", reading: "在 Windows PowerShell 输入，再按回车。" },
    { token: "Ctrl+C", reading: "按住 Ctrl 再按 C，松开后再重复一次。macOS 也用 Control，不用 Command。" },
  ],
  example: {
    label: "进入 IEx",
    code: "iex",
    caption: "在终端输入命令，按回车。Windows PowerShell 用 iex.bat。",
    output: ["出现 iex(1)>，说明你已经进入 IEx。启动时的版本信息可以先略过。"],
  },
  steps: [
    "macOS 打开“终端”；Windows 打开 PowerShell；Linux 打开终端应用。",
    "输入启动命令，看到 iex(1)> 后停下，这课先不输入 Elixir 代码。",
    "按两次 Ctrl+C，看到原来的终端提示符，说明已经退出。",
  ],
  practice: {
    task: "关掉提示，在自己的终端进入 IEx，再退出来。每一步都指出：现在是在 IEx，还是原来的命令行？",
    starter: "iex",
    expected: "看到 iex(1)>，然后按两次 Ctrl+C 回到原来的命令行。",
    hint: "先看提示符。出现 BREAK 时，还需要再按一次 Ctrl+C。",
    answer: "进入：iex（PowerShell 用 iex.bat）并回车。退出：Ctrl+C，松开，再按 Ctrl+C。",
  },
  check: {
    question: "在 iex(1)> 后按一次 Ctrl+C，会直接回到原来的命令行吗？",
    answer: "不会。先出现 BREAK 菜单；再按一次 Ctrl+C 才退出。",
  },
  takeaways: [
    "在终端运行 `iex`；Windows PowerShell 用 `iex.bat`。",
    "看到 `iex(1)>` 就已进入 IEx，提示符不用输入。",
    "按两次 Ctrl+C 退出 IEx，终端窗口会保留。",
  ],
};
