export type CourseStage =
  | "foundation"
  | "languages"
  | "concurrency"
  | "production";

export type CourseModule = {
  number: string;
  slug: string;
  stage: CourseStage;
  stageLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  duration: string;
  lessons: number;
  level: string;
  languages: string[];
  why: string;
  outcomes: string[];
  prerequisites: string[];
  concepts: Array<{
    term: string;
    definition: string;
  }>;
  elixirCode: string;
  erlangCode: string;
  codeCaption: string;
  experiment: {
    title: string;
    intro: string;
    steps: string[];
    command: string;
    expected: string[];
    breakIt: string;
    canProve: string;
    cannotProve: string;
  };
  quiz: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
  challenge: {
    title: string;
    brief: string;
    hints: string[];
    acceptance: string[];
  };
  takeaways: string[];
  references: Array<{
    label: string;
    href: string;
  }>;
};

export type ResourceLink = {
  label: string;
  shortLabel: string;
  href: string;
  category: "官方文档" | "包与工具" | "社区" | "练习";
  description: string;
  accent: "elixir" | "erlang" | "beam" | "tool";
};

export const stages: Array<{
  id: CourseStage;
  number: string;
  title: string;
  description: string;
}> = [
  {
    id: "foundation",
    number: "01",
    title: "先看见运行时",
    description: "把 Erlang、Elixir、BEAM 与 OTP 放进同一张地图。",
  },
  {
    id: "languages",
    number: "02",
    title: "掌握两种语言",
    description: "分别练熟语法，再建立一套可来回翻译的语义。",
  },
  {
    id: "concurrency",
    number: "03",
    title: "并发与容错",
    description: "从裸进程一路推导到 OTP、监督树与背压。",
  },
  {
    id: "production",
    number: "04",
    title: "走向生产",
    description: "节点、可观测性、互操作，以及一个完整混合项目。",
  },
];

export const courseModules: CourseModule[] = [
  {
    number: "00",
    slug: "start-line",
    stage: "foundation",
    stageLabel: "地基",
    title: "起跑线：两门语言，一台机器",
    subtitle: "先把 Erlang、Elixir、BEAM、OTP 的关系说清楚。",
    summary:
      "完成环境检查，在 erl 与 iex 中运行同一段思想等价的代码，并知道遇到问题该查哪一层。",
    duration: "2 小时",
    lessons: 2,
    level: "零基础",
    languages: ["BEAM", "Elixir", "Erlang"],
    why:
      "很多初学者把 Elixir 当作“换了语法的 Ruby”，或者把 OTP 当成一个可以随时补学的库。这样会在并发、错误处理和项目结构上不断用错心智模型。本章先固定地图：Erlang 与 Elixir 是语言，BEAM 是运行时，OTP 是构建可靠系统的一组设计原则与组件。",
    outcomes: [
      "能画出“源码 → BEAM 字节码 → BEAM VM → OTP 应用”的关系",
      "能分别启动 erl、iex，并解释两者提示符的差异",
      "能用版本输出定位安装层、语言层与 OTP 层的问题",
    ],
    prerequisites: ["会使用终端执行命令", "知道函数和变量的基本含义"],
    concepts: [
      {
        term: "BEAM",
        definition:
          "Erlang/OTP 的虚拟机。它负责调度轻量进程、隔离堆、投递消息和装载代码。",
      },
      {
        term: "OTP",
        definition:
          "不是另一门语言，而是一套库、behaviour 与系统设计原则；Supervisor、GenServer 都属于它。",
      },
      {
        term: "term",
        definition:
          "BEAM 世界里可被消息发送和模式匹配的数据统称。两门语言共享大部分底层 term。",
      },
    ],
    elixirCode: `# 在 IEx 中
parent = self()

spawn(fn ->
  send(parent, {:hello, :from_elixir})
end)

receive do
  {:hello, source} -> {:received, source}
end`,
    erlangCode: `%% 在 erl 中
Parent = self(),

spawn(fun() ->
  Parent ! {hello, from_erlang}
end),

receive
  {hello, Source} -> {received, Source}
end.`,
    codeCaption:
      "两段语法不同，但都在创建一个 BEAM 进程、发送一个 tuple，再用模式匹配接收它。",
    experiment: {
      title: "确认你真的运行在同一套 VM 上",
      intro:
        "不要从安装成功的提示猜结论。直接让两种 shell 报告 OTP release，并观察它们都能看到同一个版本。",
      steps: [
        "运行 `erl`，输入 `erlang:system_info(otp_release).`",
        "运行 `iex`，输入 `:erlang.system_info(:otp_release)`",
        "比较结果，并用自己的话解释 `:erlang` 前缀意味着什么",
      ],
      command: `erl -noshell -eval 'io:format("OTP ~s~n", [erlang:system_info(otp_release)]), halt().'`,
      expected: [
        "两种入口报告同一个 OTP release",
        "Elixir 可以直接调用 Erlang 的 `erlang` 模块",
      ],
      breakIt:
        "删掉 Erlang 表达式末尾的句点，或把 Elixir atom `:otp_release` 写成字符串。记录错误发生在哪一层。",
      canProve: "你安装的 Erlang 与 Elixir 当前共享同一套 OTP 运行时。",
      cannotProve:
        "版本一致不代表所有第三方包兼容，也不代表你已经理解了 BEAM 的进程模型。",
    },
    quiz: {
      question: "下面哪一项最准确地描述 OTP？",
      options: [
        "Elixir 的包管理器",
        "BEAM 上的库、behaviour 与系统设计原则集合",
        "Erlang 的编译器后端",
        "只能在分布式系统中使用的数据库",
      ],
      answer: 1,
      explanation:
        "OTP 横跨 Erlang 与 Elixir。Hex 是包生态，编译器只是工具链的一部分，Mnesia 才是 OTP 中的数据库组件之一。",
    },
    challenge: {
      title: "环境诊断卡",
      brief:
        "写一份不超过 12 行的诊断输出，包含 Erlang/OTP、Elixir、Mix 版本，并为“命令不存在”和“版本不兼容”各写一个排查动作。",
      hints: [
        "先运行 `elixir --version` 和 `mix --version`。",
        "区分 shell 找不到命令与 VM 能启动但版本不满足。",
        "把输出保存下来，它会成为后续提问时最有价值的上下文。",
      ],
      acceptance: [
        "能看到 OTP、Elixir、Mix 三类版本信息",
        "两种故障分别对应不同排查路径",
        "没有把操作系统线程称作 BEAM 进程",
      ],
    },
    takeaways: [
      "语言是入口，BEAM 是运行的地方，OTP 是构建可靠系统的方法。",
      "Elixir 调 Erlang 不是跨语言 RPC，而是同一 VM 内的普通模块调用。",
      "从第一天起就把版本、运行时和工具链分层诊断。",
    ],
    references: [
      {
        label: "Elixir Getting Started",
        href: "https://elixir-lang.org/getting-started/introduction.html",
      },
      {
        label: "Erlang Getting Started",
        href: "https://www.erlang.org/doc/system/getting_started.html",
      },
    ],
  },
  {
    number: "01",
    slug: "beam-mental-model",
    stage: "foundation",
    stageLabel: "地基",
    title: "先建立 BEAM 心智模型",
    subtitle: "不可变数据、轻量进程与故障隔离，是后续所有章节的坐标系。",
    summary:
      "用一个最小消息系统理解独立堆、mailbox、调度与“让它崩”的真正含义。",
    duration: "3 小时",
    lessons: 3,
    level: "零基础",
    languages: ["BEAM", "OTP"],
    why:
      "如果把 BEAM 进程等同于操作系统进程，就会高估创建成本；如果把它等同于共享内存线程，又会错误地寻找锁。BEAM 的选择是：大量隔离的小进程，以消息通信，让局部失败可以被观察、重启和限制。",
    outcomes: [
      "能区分 BEAM 进程、OS 进程和线程",
      "能解释 mailbox、独立堆和抢占式调度之间的关系",
      "能预测不可变更新和模式匹配的结果",
    ],
    prerequisites: ["完成起跑线", "见过 tuple、list、map"],
    concepts: [
      {
        term: "轻量进程",
        definition:
          "由 BEAM 调度的隔离执行单元。它不是 OS 进程，创建和切换成本都更低。",
      },
      {
        term: "mailbox",
        definition:
          "每个进程自己的消息队列。发送是异步的，接收方通过模式选择下一条可处理消息。",
      },
      {
        term: "reduction",
        definition:
          "BEAM 衡量进程工作量的近似单位。调度器用它避免单个进程长期霸占执行权。",
      },
    ],
    elixirCode: `counter = fn loop, total ->
  receive do
    {:add, n} -> loop.(loop, total + n)
    {:read, caller} ->
      send(caller, {:total, total})
      loop.(loop, total)
  end
end

pid = spawn(fn -> counter.(counter, 0) end)`,
    erlangCode: `Counter = fun Loop(Total) ->
  receive
    {add, N} -> Loop(Total + N);
    {read, Caller} ->
      Caller ! {total, Total},
      Loop(Total)
  end
end,

Pid = spawn(fun() -> Counter(0) end).`,
    codeCaption:
      "状态不是被原地修改；每次收到消息，进程都以一个新参数进入下一轮递归。",
    experiment: {
      title: "看见 mailbox，而不是想象共享变量",
      intro:
        "启动计数器，连续发送三条消息，再询问状态。重点不是答案 6，而是状态如何只存在于那个进程的下一次递归参数里。",
      steps: [
        "向进程连续发送 `{:add, 1}`、`{:add, 2}`、`{:add, 3}`",
        "发送带自己 PID 的 `{:read, self()}`",
        "用 `Process.info(pid, :message_queue_len)` 观察队列长度",
      ],
      command: `send(pid, {:add, 1}); send(pid, {:add, 2}); send(pid, {:add, 3})`,
      expected: [
        "最终回复为 `{:total, 6}`",
        "计数器没有暴露可被其他进程直接修改的内存地址",
      ],
      breakIt:
        "删除 `{:read, caller}` 分支，再发送读取消息。进程不会自动报错；消息会留在 mailbox 中。",
      canProve: "这个递归循环可以通过消息串行化自己的状态更新。",
      cannotProve:
        "它不能证明系统没有竞态，也不能证明任意 mailbox 都不会无限增长。",
    },
    quiz: {
      question: "一个进程收到无法匹配当前 receive 子句的消息时，通常会怎样？",
      options: [
        "消息立即丢失",
        "整个 VM 崩溃",
        "消息保留在 mailbox，接收会继续寻找可匹配消息",
        "发送者被自动阻塞",
      ],
      answer: 2,
      explanation:
        "选择性接收会扫描 mailbox。长期无法匹配的消息会积压，这正是需要协议设计和可观测性的原因之一。",
    },
    challenge: {
      title: "画出三进程天气站",
      brief:
        "只用纸或文本画出 collector、sensor、dashboard 三个进程和它们的消息协议，并标明每条消息由谁创建、谁消费。",
      hints: [
        "消息名称应表达业务含义，不要只写 `data`。",
        "查询类消息需要返回地址或引用。",
        "考虑 dashboard 暂时离线时，collector 的 mailbox 会发生什么。",
      ],
      acceptance: [
        "每条消息都有明确发送者与接收者",
        "状态归属到具体进程",
        "至少指出一个队列可能增长的位置",
      ],
    },
    takeaways: [
      "BEAM 进程通过隔离降低共享状态的复杂度，但不会自动消灭协议错误。",
      "递归参数是进程状态的一种常见表达。",
      "无法匹配的消息会留下来；mailbox 长度是重要运行指标。",
    ],
    references: [
      {
        label: "Erlang Processes",
        href: "https://www.erlang.org/doc/system/conc_prog.html",
      },
      {
        label: "Elixir Processes",
        href: "https://hexdocs.pm/elixir/processes.html",
      },
    ],
  },
  {
    number: "02",
    slug: "elixir-foundations",
    stage: "languages",
    stageLabel: "语言",
    title: "Elixir 基础：让数据流过函数",
    subtitle: "模式匹配、多子句函数、Enum 与管道，不是四个孤立语法点。",
    summary:
      "从一组脏日志出发，写出可组合、可测试的数据转换模块。",
    duration: "6 小时",
    lessons: 5,
    level: "入门",
    languages: ["Elixir"],
    why:
      "Elixir 最容易被写成带管道符的命令式代码：到处 if、在一条长管道里混合解析与副作用。更稳的做法是先用模式匹配定义数据形状，再让每个小函数只承担一个转换。",
    outcomes: [
      "能使用模式匹配、guard 与多子句函数表达分支",
      "能在 Enum 与 Stream 之间做有理由的选择",
      "能为纯函数编写最小 ExUnit 测试",
    ],
    prerequisites: ["完成 BEAM 心智模型", "知道 list 与 map 的用途"],
    concepts: [
      {
        term: "模式匹配",
        definition:
          "`=` 不是普通赋值。它要求右侧数据符合左侧形状，并把未绑定变量绑定到对应位置。",
      },
      {
        term: "多子句函数",
        definition:
          "同名同元数的函数可按模式和 guard 分成多条路径，调用时从上到下匹配。",
      },
      {
        term: "管道",
        definition:
          "`|>` 把左侧结果作为右侧函数的第一个参数；它改善数据流可读性，但不会自动改善函数边界。",
      },
    ],
    elixirCode: `defmodule LogSummary do
  def summarize(lines) do
    lines
    |> Stream.map(&String.trim/1)
    |> Stream.reject(&(&1 == ""))
    |> Enum.map(&parse_line/1)
    |> Enum.frequencies_by(& &1.level)
  end

  defp parse_line("ERROR " <> message),
    do: %{level: :error, message: message}

  defp parse_line("INFO " <> message),
    do: %{level: :info, message: message}
end`,
    erlangCode: `%% 同一数据流的 Erlang 轮廓
summarize(Lines) ->
  Clean = [string:trim(L) || L <- Lines, L =/= <<>>],
  Parsed = [parse_line(L) || L <- Clean],
  frequencies(Parsed).

parse_line(<<"ERROR ", Message/binary>>) ->
  #{level => error, message => Message};
parse_line(<<"INFO ", Message/binary>>) ->
  #{level => info, message => Message}.`,
    codeCaption:
      "先看 Elixir 主实现，再用右侧 Erlang 轮廓确认：真正共享的是模式与数据，不是标点。",
    experiment: {
      title: "管道顺序为什么是语义，不是排版",
      intro:
        "给解析器加入空行和前后空格。交换 trim 与 reject 的顺序，看一条看似无害的调整如何改变结果。",
      steps: [
        "准备 `[' INFO boot ', ' ', 'ERROR timeout']` 对应的 Elixir 字符串列表",
        "运行原顺序并记录频次",
        "把 reject 移到 trim 之前，再运行同一输入",
      ],
      command: `mix test --trace`,
      expected: [
        "先 trim 再 reject 时，纯空格行被删除",
        "先 reject 再 trim 时，纯空格行会进入解析器",
      ],
      breakIt:
        "把兜底 `parse_line/1` 删掉，再传入 `WARN slow`。观察 FunctionClauseError 中保留了哪些定位信息。",
      canProve: "数据转换顺序会改变可匹配的数据集合。",
      cannotProve:
        "这个小样本不能证明 Stream 一定更快；是否受益取决于数据量、终止条件与后续消费方式。",
    },
    quiz: {
      question: "什么时候优先使用 Stream 而不是 Enum？",
      options: [
        "任何时候，因为 Stream 总是更快",
        "需要惰性组合，尤其数据很大或只消费一部分时",
        "需要把结果立即变成 list 时",
        "需要修改原列表时",
      ],
      answer: 1,
      explanation:
        "Stream 延迟执行并融合遍历，但不是免费加速。最终仍需消费者触发计算；小集合上 Enum 往往更直接。",
    },
    challenge: {
      title: "命令行日志分析器",
      brief:
        "实现一个 Mix 项目：读取日志文件，忽略空行，统计 INFO/WARN/ERROR，并列出出现次数最多的三个消息。",
      hints: [
        "先让解析函数保持纯净，再把文件 I/O 放到边界。",
        "为未知级别返回 `{:error, line}`，不要悄悄丢弃。",
        "至少写一个带空格、一个未知级别、一个空文件测试。",
      ],
      acceptance: [
        "解析与文件读取分离",
        "未知行有显式错误结果",
        "ExUnit 覆盖正常、边界与错误路径",
      ],
    },
    takeaways: [
      "先定义数据形状，再定义转换流水线。",
      "管道只是参数传递语法；好设计仍依赖小而清晰的函数。",
      "Stream 是惰性工具，不是“更快版 Enum”。",
    ],
    references: [
      {
        label: "Elixir 基础类型",
        href: "https://elixir-lang.org/getting-started/basic-types.html",
      },
      {
        label: "Enum",
        href: "https://hexdocs.pm/elixir/Enum.html",
      },
      {
        label: "ExUnit",
        href: "https://hexdocs.pm/ex_unit/ExUnit.html",
      },
    ],
  },
  {
    number: "03",
    slug: "erlang-foundations",
    stage: "languages",
    stageLabel: "语言",
    title: "Erlang 基础：读懂 BEAM 的母语",
    subtitle: "变量大小写、句点、分号和逗号，背后都有结构。",
    summary:
      "把同一个日志分析器改写为 Erlang 模块，用 EUnit 验证语法与语义。",
    duration: "6 小时",
    lessons: 5,
    level: "入门",
    languages: ["Erlang"],
    why:
      "只学 Elixir 也能做大量工作，但 Erlang 文档、错误报告与 OTP 原生 API 会一直出现。能读写基础 Erlang，才不会在遇到 `:gen_tcp`、observer 输出或 Erlang 依赖时失去判断力。",
    outcomes: [
      "能解释 atom、变量、tuple、list、map 与 binary 的写法",
      "能正确使用逗号、分号和句点组织表达式与函数子句",
      "能创建 Rebar3 项目并用 EUnit 运行测试",
    ],
    prerequisites: ["完成 Elixir 基础", "理解模式匹配与递归"],
    concepts: [
      {
        term: "大写变量",
        definition:
          "Erlang 中以大写字母或下划线开头的是变量；小写裸词通常是 atom。",
      },
      {
        term: "标点结构",
        definition:
          "逗号连接顺序表达式，分号分隔函数子句或分支，句点结束一个完整函数定义或 shell 表达式。",
      },
      {
        term: "binary",
        definition:
          "`<<...>>` 表示二进制。UTF-8 文本通常用 binary；传统 charlist 本质是整数列表。",
      },
    ],
    elixirCode: `defmodule Orders do
  def total(items) do
    items
    |> Enum.filter(&(&1.status == :paid))
    |> Enum.map(& &1.amount)
    |> Enum.sum()
  end
end`,
    erlangCode: `-module(orders).
-export([total/1]).

total(Items) ->
  Paid = [Item || Item = #{status := paid} <- Items],
  Amounts = [Amount || #{amount := Amount} <- Paid],
  lists:sum(Amounts).`,
    codeCaption:
      "Erlang 的模块名是 atom，导出项带元数。列表推导里的模式同时完成筛选与解构。",
    experiment: {
      title: "三种标点，三种边界",
      intro:
        "复制一个两子句函数，然后分别破坏逗号、分号和句点。不要只记报错文字，要指出解析器以为哪一段还没结束。",
      steps: [
        "创建 `classify/1` 的正数与零/负数两个子句",
        "把第一子句末尾分号改为句点，编译",
        "把函数体中的逗号改为分号，再编译",
      ],
      command: `rebar3 eunit`,
      expected: [
        "分号连接同名同元数的多个子句",
        "句点结束整个函数定义",
        "逗号让同一函数体中的表达式按顺序求值",
      ],
      breakIt:
        "删除 `-export([total/1]).` 后，从 shell 调用 `orders:total/1`。模块内部函数仍能存在，但外部入口消失。",
      canProve: "Erlang 标点表达的是结构边界，而不是可随意替换的风格。",
      cannotProve:
        "通过编译只说明语法与部分静态约束成立，不说明业务结果正确。",
    },
    quiz: {
      question: "Erlang 中 `user_name` 默认是什么？",
      options: ["变量", "atom", "字符串", "模块属性"],
      answer: 1,
      explanation:
        "小写开头的裸词是 atom。变量必须大写或以下划线开头；字符串与 binary 需要引号或 `<<>>`。",
    },
    challenge: {
      title: "Erlang 版日志分析器",
      brief:
        "用 Rebar3 重写上一章项目。保持输入输出协议一致，让同一组 fixture 同时验证两种实现。",
      hints: [
        "用 binary pattern 拆分级别前缀。",
        "把 I/O 留在单独模块，核心模块只接收 binary 列表。",
        "EUnit 测试函数可用 `_test` 或 generator 形式。",
      ],
      acceptance: [
        "模块导出最小公开 API",
        "binary 与 charlist 的边界被显式处理",
        "EUnit 覆盖与 Elixir 版相同的场景",
      ],
    },
    takeaways: [
      "Erlang 的语法更直接地暴露模块、元数与 OTP 约定。",
      "binary 和 charlist 不是一回事；跨语言边界要主动转换。",
      "标点是语法树的边界标记，不只是书写习惯。",
    ],
    references: [
      {
        label: "Erlang Reference Manual",
        href: "https://www.erlang.org/doc/system/reference_manual.html",
      },
      {
        label: "Rebar3",
        href: "https://rebar3.org/docs/",
      },
      {
        label: "EUnit",
        href: "https://www.erlang.org/doc/apps/eunit/chapter.html",
      },
    ],
  },
  {
    number: "04",
    slug: "shared-semantics",
    stage: "languages",
    stageLabel: "桥接",
    title: "两种语法，一套语义",
    subtitle: "把语法糖剥开，建立一张长期可用的互译表。",
    summary:
      "同一个订单状态机写两版纯函数，补齐 typespec、测试与错误边界。",
    duration: "5 小时",
    lessons: 4,
    level: "进阶入门",
    languages: ["Elixir", "Erlang", "BEAM"],
    why:
      "如果把两门语言分别背一遍，你会重复学习并在互操作时迷失。更高效的方法是只讲一次 BEAM 语义，再明确语法映射与少数真实差异：协议/behaviour 表达、字符串约定、异常语法、工具链。",
    outcomes: [
      "能在常见数据、函数和模块调用之间双向翻译",
      "能区分 Elixir 语法便利与 BEAM 底层语义",
      "能用 spec 与测试固定跨语言协议",
    ],
    prerequisites: ["完成 Elixir 与 Erlang 基础", "会写纯函数测试"],
    concepts: [
      {
        term: "atom 映射",
        definition:
          "Elixir 的 `:ok` 与 Erlang 的 `ok` 是同一个 atom；Elixir 模块名本身也是带 `Elixir.` 前缀的 atom。",
      },
      {
        term: "模块调用",
        definition:
          "`Foo.bar()`、`:lists.reverse/1` 与 `foo:bar()` 最终都指向“模块 atom + 函数 + 元数”。",
      },
      {
        term: "协议边界",
        definition:
          "跨模块、跨语言传递的数据形状与错误返回。稳定协议比选择哪种表面语法更重要。",
      },
    ],
    elixirCode: `defmodule Order do
  @type state :: :new | :paid | :shipped

  @spec transition(state(), atom()) ::
          {:ok, state()} | {:error, :invalid_transition}
  def transition(:new, :pay), do: {:ok, :paid}
  def transition(:paid, :ship), do: {:ok, :shipped}
  def transition(_, _), do: {:error, :invalid_transition}
end`,
    erlangCode: `-module(order).
-export([transition/2]).

-type state() :: new | paid | shipped.
-spec transition(state(), atom()) ->
  {ok, state()} | {error, invalid_transition}.

transition(new, pay) -> {ok, paid};
transition(paid, ship) -> {ok, shipped};
transition(_, _) -> {error, invalid_transition}.`,
    codeCaption:
      "数据协议完全一致：输入两个 atom，输出带标签的 tuple。两边测试甚至可以共享 fixture。",
    experiment: {
      title: "证明 term 能穿过语言边界",
      intro:
        "从 Elixir 调 Erlang 模块，再从 Erlang 调 Elixir 模块。比较返回值的 inspect 输出。",
      steps: [
        "在 Mix 项目的 `src/` 放入 `order.erl` 并编译",
        "在 IEx 调用 `:order.transition(:new, :pay)`",
        "在 Erlang 代码调用 `'Elixir.Order':transition(new, pay)`",
      ],
      command: `iex -S mix`,
      expected: [
        "两边都得到 `{ok, paid}` 对应的同一个 tuple term",
        "Elixir 模块可通过其底层 atom 从 Erlang 访问",
      ],
      breakIt:
        "让一边返回字符串 `\"paid\"`，另一边仍匹配 atom `paid`。观察接口在语法相似时仍会因 term 不同而失败。",
      canProve: "普通 BEAM term 可在两种语言模块之间直接传递。",
      cannotProve:
        "term 可传递不等于所有异常、struct、record 或字符串约定都能无摩擦互用。",
    },
    quiz: {
      question: "Elixir 的 `Foo` 模块在 Erlang 中通常如何引用？",
      options: ["foo", "'Foo'", "'Elixir.Foo'", ":Foo"],
      answer: 2,
      explanation:
        "Elixir 别名编译为带 `Elixir.` 前缀的模块 atom。Erlang 中因包含大写和句点，需要使用单引号 atom。",
    },
    challenge: {
      title: "订单状态机双实现",
      brief:
        "扩展取消、退款与重复事件，分别写 Elixir/Erlang 纯函数实现，并用同一张状态转换表验证。",
      hints: [
        "先写状态 × 事件表，再写代码。",
        "对重复事件决定幂等还是错误，并写进协议。",
        "不要用进程隐藏不清楚的状态转换。",
      ],
      acceptance: [
        "两版实现返回相同 term 形状",
        "非法转换有明确错误标签",
        "spec 与测试覆盖所有状态边",
      ],
    },
    takeaways: [
      "先固定 term 协议，再选择语言表达。",
      "Elixir 模块名和 alias 最终仍落到 module atom。",
      "真正危险的边界常在 string/charlist、struct/record 与异常约定。",
    ],
    references: [
      {
        label: "Erlang interoperability",
        href: "https://hexdocs.pm/elixir/erlang-and-elixir.html",
      },
      {
        label: "Typespecs",
        href: "https://hexdocs.pm/elixir/typespecs.html",
      },
    ],
  },
  {
    number: "05",
    slug: "processes-and-mailboxes",
    stage: "concurrency",
    stageLabel: "并发",
    title: "从裸进程理解并发",
    subtitle: "先亲手写消息循环，才知道 GenServer 替你处理了什么。",
    summary:
      "设计 request/reply 协议，理解 link、monitor、timeout 与选择性接收。",
    duration: "6 小时",
    lessons: 4,
    level: "中级",
    languages: ["Elixir", "Erlang", "BEAM"],
    why:
      "直接从 GenServer 开始，容易把 callback 当作框架魔法。裸进程暴露了关键事实：call 只是带引用的消息与等待回复；状态只是循环参数；超时、崩溃和陈旧回复都必须进入协议设计。",
    outcomes: [
      "能设计带唯一引用的 request/reply 协议",
      "能解释 link 与 monitor 的不同故障语义",
      "能识别同步死锁、陈旧回复与 mailbox 堆积",
    ],
    prerequisites: ["掌握两种语言的模式匹配", "理解 BEAM mailbox"],
    concepts: [
      {
        term: "reference",
        definition:
          "VM 生成的高概率唯一值，常用于把某个 reply 与对应 request 配对。",
      },
      {
        term: "link",
        definition:
          "双向故障关系。默认情况下，一个非 normal exit 会沿 link 传播。",
      },
      {
        term: "monitor",
        definition:
          "单向观察关系。被观察进程退出时，观察者收到 `DOWN` 消息而不会自动退出。",
      },
    ],
    elixirCode: `def call(server, request, timeout \\\\ 1_000) do
  ref = make_ref()
  send(server, {:call, self(), ref, request})

  receive do
    {:reply, ^ref, response} -> {:ok, response}
  after
    timeout -> {:error, :timeout}
  end
end`,
    erlangCode: `call(Server, Request, Timeout) ->
  Ref = make_ref(),
  Server ! {call, self(), Ref, Request},
  receive
    {reply, Ref, Response} -> {ok, Response}
  after Timeout ->
    {error, timeout}
  end.`,
    codeCaption:
      "唯一引用避免把旧回复当成新请求的结果；timeout 只停止等待，并不会撤回已经发送的消息。",
    experiment: {
      title: "制造一条过期回复",
      intro:
        "让服务器睡眠 1500ms，客户端 500ms 超时。随后检查客户端 mailbox：你会看到超时之后到达的 reply。",
      steps: [
        "实现一个收到请求后延迟回复的 server",
        "以 500ms timeout 发起 call",
        "等待两秒后运行 `Process.info(self(), :messages)`",
      ],
      command: `Process.info(self(), :messages)`,
      expected: [
        "call 返回 `{:error, :timeout}`",
        "迟到的 reply 仍可能出现在调用者 mailbox",
      ],
      breakIt:
        "删除 ref，只按 `{:reply, response}` 匹配。连续发送两个不同延迟的请求，观察回复如何可能错配。",
      canProve: "客户端超时与服务端工作取消是两件不同的事。",
      cannotProve:
        "一次错配演示不能覆盖所有调度顺序，也不能证明固定 timeout 适合生产流量。",
    },
    quiz: {
      question: "客户端 timeout 后，已经发给服务端的消息会怎样？",
      options: [
        "VM 自动撤回消息",
        "服务端进程自动终止",
        "消息仍可能被处理，回复也可能迟到",
        "发送者会一直阻塞直到服务端完成",
      ],
      answer: 2,
      explanation:
        "receive 的 after 只控制调用者等待多久。取消需要额外协议，而且服务端必须支持并正确实现。",
    },
    challenge: {
      title: "手写可靠 KV 进程",
      brief:
        "实现 get/put/delete，所有同步请求带 ref，支持 timeout；再提供 monitor 版本让调用者能区分超时与服务端崩溃。",
      hints: [
        "先写消息协议，再写 loop。",
        "把 `DOWN` 与 reply 放进同一个 receive。",
        "思考 monitor 在正常回复后何时 demonitor。",
      ],
      acceptance: [
        "并发请求不会因回复顺序不同而错配",
        "调用方能区分 timeout 与服务端退出",
        "测试覆盖迟到回复",
      ],
    },
    takeaways: [
      "timeout 不是取消。",
      "reference 是 request/reply 配对的核心工具。",
      "link 用于共同生死，monitor 用于观察并做决定。",
    ],
    references: [
      {
        label: "Process",
        href: "https://hexdocs.pm/elixir/Process.html",
      },
      {
        label: "Erlang concurrent programming",
        href: "https://www.erlang.org/doc/system/conc_prog.html",
      },
    ],
  },
  {
    number: "06",
    slug: "otp-behaviours",
    stage: "concurrency",
    stageLabel: "OTP",
    title: "从手写循环推导 OTP",
    subtitle: "GenServer 不是“放状态的盒子”，而是一套经过约束的协议。",
    summary:
      "把 KV 循环分别重构为 GenServer 与 gen_server，并比较 call、cast、reply。",
    duration: "7 小时",
    lessons: 5,
    level: "中级",
    languages: ["Elixir", "Erlang", "OTP"],
    why:
      "OTP behaviour 把经过反复验证的消息循环、系统消息、调试与升级钩子统一起来。它减少样板，但不会替你决定 API、状态归属、背压和超时策略。",
    outcomes: [
      "能区分客户端 API 与 callback 实现",
      "能为一致性要求选择 call 或 cast",
      "能把长期进程正确放进监督树",
    ],
    prerequisites: ["完成裸进程章节", "写过 request/reply 协议"],
    concepts: [
      {
        term: "behaviour",
        definition:
          "一组 callback 合约。实现模块遵守合约，通用运行框架负责循环、系统消息与调试。",
      },
      {
        term: "call",
        definition:
          "同步请求。调用者等待 reply，天然形成等待，但并不等同于完整背压。",
      },
      {
        term: "cast",
        definition:
          "异步消息。调用者不知道是否已处理，过量 cast 可能让 mailbox 无界增长。",
      },
    ],
    elixirCode: `defmodule KV do
  use GenServer

  def start_link(opts), do: GenServer.start_link(__MODULE__, %{}, opts)
  def get(server, key), do: GenServer.call(server, {:get, key})
  def put(server, key, value), do: GenServer.call(server, {:put, key, value})

  @impl true
  def init(state), do: {:ok, state}

  @impl true
  def handle_call({:get, key}, _from, state),
    do: {:reply, Map.fetch(state, key), state}

  def handle_call({:put, key, value}, _from, state),
    do: {:reply, :ok, Map.put(state, key, value)}
end`,
    erlangCode: `-module(kv).
-behaviour(gen_server).
-export([start_link/0, get/2, put/3]).
-export([init/1, handle_call/3]).

start_link() -> gen_server:start_link(?MODULE, #{}, []).
get(Server, Key) -> gen_server:call(Server, {get, Key}).
put(Server, Key, Value) ->
  gen_server:call(Server, {put, Key, Value}).

init(State) -> {ok, State}.
handle_call({get, Key}, _From, State) ->
  {reply, maps:find(Key, State), State};
handle_call({put, Key, Value}, _From, State) ->
  {reply, ok, State#{Key => Value}, State}.`,
    codeCaption:
      "客户端函数隐藏消息形状；callback 只处理协议。两边的返回 tuple 语义一一对应。",
    experiment: {
      title: "cast 为什么不是免费吞吐",
      intro:
        "把 put 改为 cast，然后快速发送十万条更新。观察 mailbox 与响应性，而不是只看发送循环有多快。",
      steps: [
        "暴露 `put_async/3` 使用 cast",
        "批量发送大量更新",
        "并行调用一个同步 get，记录延迟和 message_queue_len",
      ],
      command: `:erlang.process_info(pid, :message_queue_len)`,
      expected: [
        "发送者很快结束不代表服务端已完成",
        "同步 get 可能排在大量 cast 后面",
      ],
      breakIt:
        "在 handle_cast 中加入慢 I/O，继续提升发送速率。观察 mailbox 是否持续增长。",
      canProve: "异步 API 会把等待从调用者转移到服务端队列。",
      cannotProve:
        "单机压测不能给出生产安全阈值；调度器、消息大小和外部 I/O 都会改变结果。",
    },
    quiz: {
      question: "下面哪个理由最适合使用 cast？",
      options: [
        "所有写操作都应使用 cast",
        "调用者不需要确认结果，并且系统有明确的过载策略",
        "cast 能保证消息立即执行",
        "cast 会自动丢弃旧消息",
      ],
      answer: 1,
      explanation:
        "是否需要确认与如何处理过载必须明确。cast 保证发送语义的一部分，不保证立即执行，也不自带队列上限。",
    },
    challenge: {
      title: "双语限流任务队列",
      brief:
        "任选一种语言写公开 API，另一种语言写 worker。最多并发 N 个任务，超出部分进入有界队列，满时返回 `busy`。",
      hints: [
        "长期状态由一个进程拥有，但任务本身用独立进程执行。",
        "用 monitor 回收 worker 完成与崩溃。",
        "不要让 API 静默接受无限任务。",
      ],
      acceptance: [
        "并发数与队列长度都有上限",
        "worker 崩溃不会丢失容量计数",
        "拒绝策略对调用者可见",
      ],
    },
    takeaways: [
      "behaviour 固定循环合约，不替代业务协议设计。",
      "客户端 API 应隐藏消息格式。",
      "cast 把压力移进 mailbox；过载策略仍需显式设计。",
    ],
    references: [
      {
        label: "Elixir GenServer",
        href: "https://hexdocs.pm/elixir/GenServer.html",
      },
      {
        label: "Erlang gen_server",
        href: "https://www.erlang.org/doc/apps/stdlib/gen_server.html",
      },
    ],
  },
  {
    number: "07",
    slug: "supervision-trees",
    stage: "concurrency",
    stageLabel: "OTP",
    title: "监督树与应用",
    subtitle: "可靠性来自清楚的故障域，不是“进程会自动重启”。",
    summary:
      "用 child spec、restart strategy 与 Application 设计一个可预测恢复的系统。",
    duration: "6 小时",
    lessons: 4,
    level: "中级",
    languages: ["Elixir", "Erlang", "OTP"],
    why:
      "“Let it crash” 经常被误解为不处理错误。真正的含义是：在合适边界把不可恢复的局部状态交给监督者，由预先定义的策略恢复；可预期的业务错误仍应正常返回。",
    outcomes: [
      "能按故障依赖划分监督树",
      "能解释 one_for_one、one_for_all、rest_for_one",
      "能选择 permanent、transient、temporary restart",
    ],
    prerequisites: ["会实现 GenServer/gen_server", "理解 link 与 exit"],
    concepts: [
      {
        term: "故障域",
        definition:
          "一组需要共同恢复或彼此隔离的组件。监督树结构应表达这种恢复关系。",
      },
      {
        term: "restart intensity",
        definition:
          "在时间窗口内允许的最大重启次数。超过阈值，监督者自身退出，把问题上推。",
      },
      {
        term: "Application",
        definition:
          "OTP 中可启动、可配置、可依赖的组件单元；根监督树通常从 application callback 启动。",
      },
    ],
    elixirCode: `children = [
  {Registry, keys: :unique, name: Jobs.Registry},
  {DynamicSupervisor,
   strategy: :one_for_one,
   name: Jobs.Workers},
  Jobs.Dispatcher
]

Supervisor.start_link(
  children,
  strategy: :rest_for_one,
  name: Jobs.Supervisor
)`,
    erlangCode: `init([]) ->
  Registry = #{
    id => jobs_registry,
    start => {jobs_registry, start_link, []}
  },
  Workers = #{
    id => jobs_workers_sup,
    start => {jobs_workers_sup, start_link, []},
    type => supervisor
  },
  Dispatcher = #{
    id => jobs_dispatcher,
    start => {jobs_dispatcher, start_link, []}
  },
  {ok, {{rest_for_one, 3, 5},
        [Registry, Workers, Dispatcher]}}.`,
    codeCaption:
      "子进程顺序在 rest_for_one 下有恢复含义：前面的基础设施崩溃，会重启其后的依赖者。",
    experiment: {
      title: "杀掉不同位置，观察不同恢复半径",
      intro:
        "记录三个子进程 PID，分别终止 dispatcher 与 registry。比较哪些 PID 改变。",
      steps: [
        "启动监督树并记录所有 child PID",
        "让最后一个 child 异常退出",
        "让第一个 child 异常退出，再次记录 PID",
      ],
      command: `Supervisor.which_children(Jobs.Supervisor)`,
      expected: [
        "最后 child 崩溃时只重启自己",
        "第一个 child 崩溃时，其后的依赖 child 都重启",
      ],
      breakIt:
        "把 strategy 改为 one_for_all。再杀最后一个无关 child，观察过大的恢复半径。",
      canProve: "restart strategy 与 child 顺序共同定义恢复范围。",
      cannotProve:
        "PID 重建不代表业务状态已经正确恢复；外部副作用、持久化和幂等仍需单独设计。",
    },
    quiz: {
      question: "什么时候 rest_for_one 最合适？",
      options: [
        "所有 child 完全独立",
        "后面的 child 依赖前面 child 的初始化或状态",
        "只希望崩溃 child 自己重启",
        "任何 Web 应用都应该默认使用",
      ],
      answer: 1,
      explanation:
        "rest_for_one 用 child 顺序表达依赖方向。独立子进程更适合 one_for_one；策略不应脱离故障关系机械选择。",
    },
    challenge: {
      title: "监督树答辩",
      brief:
        "为任务队列画出监督树，逐个说明每个 child 为什么是 permanent/transient/temporary，以及它与兄弟节点是否需要共同恢复。",
      hints: [
        "从“谁拥有长期状态”开始。",
        "动态任务与基础设施通常不使用同一 child spec。",
        "加入超过 restart intensity 时的系统行为。",
      ],
      acceptance: [
        "每条父子关系都有故障理由",
        "重启类型与正常退出语义匹配",
        "明确指出一个不应自动重试的业务错误",
      ],
    },
    takeaways: [
      "监督树首先是故障依赖图。",
      "Let it crash 不等于忽略可预期错误。",
      "进程重启只是恢复动作的一部分，状态与副作用仍需设计。",
    ],
    references: [
      {
        label: "OTP Design Principles",
        href: "https://www.erlang.org/doc/system/design_principles.html",
      },
      {
        label: "Elixir Supervisor",
        href: "https://hexdocs.pm/elixir/Supervisor.html",
      },
    ],
  },
  {
    number: "08",
    slug: "state-and-backpressure",
    stage: "concurrency",
    stageLabel: "容量",
    title: "状态、吞吐与背压",
    subtitle: "不是每段状态都要进 GenServer，也不是每个并发都要无限展开。",
    summary:
      "在纯函数、Process、ETS、Registry 与有界任务之间做容量驱动的选择。",
    duration: "5 小时",
    lessons: 3,
    level: "中高级",
    languages: ["Elixir", "Erlang", "BEAM"],
    why:
      "进程是架构工具，不是代码组织工具。把纯计算塞进单个 GenServer 会制造瓶颈；无限 `Task.async` 会制造资源风暴；把所有读写放 ETS 又可能失去不变量。",
    outcomes: [
      "能选择纯函数、进程状态或 ETS",
      "能使用有界并发处理工作集",
      "能用 mailbox、延迟与拒绝率判断过载",
    ],
    prerequisites: ["理解 GenServer 与监督树", "会写基本并发任务"],
    concepts: [
      {
        term: "背压",
        definition:
          "让上游感知下游容量不足的机制。等待、拒绝、限速、有界队列都可能是实现手段。",
      },
      {
        term: "ETS",
        definition:
          "VM 内的并发表存储，适合高读写共享数据；表所有者退出时默认会删除表。",
      },
      {
        term: "有界并发",
        definition:
          "同时运行的任务数有上限，让 CPU、连接和内存消耗可预测。",
      },
    ],
    elixirCode: `urls
|> Task.async_stream(
  &check_url/1,
  max_concurrency: System.schedulers_online() * 2,
  timeout: 3_000,
  on_timeout: :kill_task,
  ordered: false
)
|> Enum.reduce(%{ok: 0, error: 0}, &count_result/2)`,
    erlangCode: `%% 一个固定大小 worker 池的核心思想
run_bounded(Jobs, Limit) ->
  {Running, Pending} = start_first(Jobs, Limit),
  collect(Running, Pending, Limit).

collect(Running, Pending, Limit) ->
  receive
    {'DOWN', Ref, process, _Pid, Result} ->
      collect(start_next(remove(Ref, Running), Pending, Limit))
  end.`,
    codeCaption:
      "Elixir 标准工具把有界并发封装得更直接；Erlang 版本展示其本质仍是 monitor、运行集合与待处理队列。",
    experiment: {
      title: "把 Calculator GenServer 拆掉",
      intro:
        "对比纯函数并行调用与单 GenServer 串行计算。计算没有长期状态时，进程只会增加排队。",
      steps: [
        "实现一个做 CPU 小计算的 Calculator GenServer",
        "从多个 Task 并发 call 同一个 server",
        "改成普通函数，重复测量总时间和 mailbox",
      ],
      command: `:timer.tc(fn -> workload.() end)`,
      expected: [
        "单 server 把原本独立的计算串行化",
        "纯函数更容易利用调用者所在调度器",
      ],
      breakIt:
        "把 async_stream 的 `max_concurrency` 调到输入长度，并让每个任务占用连接。记录资源峰值。",
      canProve: "无共享状态的计算不需要通过单一进程串行化。",
      cannotProve:
        "一次基准不能证明所有 GenServer 都慢；它们的价值通常是状态所有权与协议，而不是算术吞吐。",
    },
    quiz: {
      question: "下面哪种情况最不需要 GenServer？",
      options: [
        "拥有一个必须串行更新的连接状态",
        "维护有生命周期的协议会话",
        "把两个数字相加并返回结果",
        "协调受限外部资源",
      ],
      answer: 2,
      explanation:
        "纯计算没有长期状态或生命周期，用普通函数更清楚。进程应表达并发与故障边界，而不是仅仅容纳函数。",
    },
    challenge: {
      title: "有界 URL 检查器",
      brief:
        "检查一组 URL，限制并发、单任务 timeout 和总队列长度；输出成功率、P95 延迟与被拒绝数。",
      hints: [
        "先固定容量预算，再选 API。",
        "把 timeout 与 HTTP 错误分开统计。",
        "ordered: false 可避免慢任务阻塞结果消费。",
      ],
      acceptance: [
        "最大并发与待处理量可配置",
        "过载不会无限占用内存",
        "指标能区分失败、超时和拒绝",
      ],
    },
    takeaways: [
      "进程用来表达状态所有权、生命周期与故障边界。",
      "异步不等于有界；容量限制必须显式。",
      "背压的目标是让过载可见、可控、可恢复。",
    ],
    references: [
      {
        label: "Task.async_stream",
        href: "https://hexdocs.pm/elixir/Task.html#async_stream/3",
      },
      {
        label: "ETS User's Guide",
        href: "https://www.erlang.org/doc/apps/stdlib/ets.html",
      },
    ],
  },
  {
    number: "09",
    slug: "distributed-operations",
    stage: "production",
    stageLabel: "生产",
    title: "分布式与可运维性",
    subtitle: "节点能连上，不代表系统自动获得一致性与可靠性。",
    summary:
      "连接两个节点，模拟断网，并用日志、Telemetry 与 Observer 解释系统状态。",
    duration: "6 小时",
    lessons: 4,
    level: "高级",
    languages: ["BEAM", "OTP"],
    why:
      "分布式 Erlang 让节点通信极其自然，也因此容易掩盖网络边界。节点名、cookie 和消息透明性解决了连接体验，却没有解决分区、一致性、容量和安全。",
    outcomes: [
      "能启动并连接两个命名节点",
      "能解释 nodedown、远程 PID 与注册名边界",
      "能用结构化日志和指标定位 mailbox 增长",
    ],
    prerequisites: ["理解进程协议、监督树与背压", "会打包基本 OTP 应用"],
    concepts: [
      {
        term: "node",
        definition:
          "运行中的分布式 BEAM 实例，名称通常形如 `name@host`。进程 PID 包含节点身份。",
      },
      {
        term: "cookie",
        definition:
          "节点建立分布式连接时使用的共享秘密之一，不应当作完整的网络安全边界。",
      },
      {
        term: "Telemetry",
        definition:
          "Elixir 生态常用的事件度量库。业务代码发事件，handler 决定如何聚合或导出。",
      },
    ],
    elixirCode: `:net_kernel.monitor_nodes(true)

receive do
  {:nodeup, node} ->
    Logger.info("node connected", node: node)

  {:nodedown, node} ->
    Logger.warning("node disconnected", node: node)
end`,
    erlangCode: `net_kernel:monitor_nodes(true),

receive
  {nodeup, Node} ->
    logger:info("node connected", #{node => Node});
  {nodedown, Node} ->
    logger:warning("node disconnected", #{node => Node})
end.`,
    codeCaption:
      "节点事件也是消息。收到 nodedown 后如何降级、重试或拒绝请求，是应用协议的一部分。",
    experiment: {
      title: "亲手制造网络分区",
      intro:
        "启动两个本地节点，建立连接后停掉其中一个。观察 monitor、远程进程和未完成请求分别如何表现。",
      steps: [
        "以相同 cookie 启动 `a@127.0.0.1` 与 `b@127.0.0.1`",
        "从 A ping B，并 monitor_nodes",
        "停止 B，记录 A 收到的事件与未完成请求结果",
      ],
      command: `Node.ping(:"b@127.0.0.1")`,
      expected: [
        "连接成功返回 `:pong`",
        "B 停止后 A 收到 nodedown",
        "应用必须决定请求是否重试或失败",
      ],
      breakIt:
        "给两个节点配置不同 cookie。确认失败发生在连接认证，而不是你的业务消息 handler。",
      canProve: "节点连接状态可被观察并转化为应用事件。",
      cannotProve:
        "本机停节点不能模拟真实网络的丢包、延迟、半开连接与脑裂组合。",
    },
    quiz: {
      question: "分布式 Erlang 的透明 PID 消息发送自动提供了什么？",
      options: [
        "跨节点强一致事务",
        "网络分区下恰好一次投递",
        "统一的消息发送编程模型",
        "面向公网的完整零信任安全",
      ],
      answer: 2,
      explanation:
        "透明性降低了编程摩擦，但一致性、投递语义、分区处理和网络安全仍需要系统设计。",
    },
    challenge: {
      title: "双节点健康采集器",
      brief:
        "每个节点定期上报 scheduler、内存与关键 mailbox。聚合节点断开时标记 stale，不伪造 0。",
      hints: [
        "指标值与采样时间一起传递。",
        "断开后保留最后值和 stale 标记。",
        "为 mailbox 设置趋势告警，不只看单点阈值。",
      ],
      acceptance: [
        "节点断开不会被显示为健康零值",
        "日志包含 node、process、request/reference 上下文",
        "重连后状态能恢复且不重复注册",
      ],
    },
    takeaways: [
      "分布式透明性简化调用，不消除网络事实。",
      "断连、超时与陈旧数据必须进入协议。",
      "mailbox、延迟、重启和拒绝率是比“进程还活着”更有用的信号。",
    ],
    references: [
      {
        label: "Distributed Erlang",
        href: "https://www.erlang.org/doc/system/distributed.html",
      },
      {
        label: "Elixir Logger",
        href: "https://hexdocs.pm/logger/Logger.html",
      },
      {
        label: "Telemetry",
        href: "https://hexdocs.pm/telemetry/",
      },
    ],
  },
  {
    number: "10",
    slug: "interoperability",
    stage: "production",
    stageLabel: "桥接",
    title: "Erlang ↔ Elixir 互操作",
    subtitle: "共享 VM 很容易；设计清楚边界，仍然需要刻意。",
    summary:
      "让 Elixir API 调用 Erlang worker，处理 binary/charlist、record/map 与异常边界。",
    duration: "4 小时",
    lessons: 3,
    level: "高级",
    languages: ["Elixir", "Erlang"],
    why:
      "同一 VM 内互调几乎没有仪式感，这很强大，也容易让边界失控。最常见的坑不是函数找不到，而是字符串表示、record 形状、struct 假设和不同异常约定。",
    outcomes: [
      "能双向调用模块并处理 module atom",
      "能显式转换 binary、String 与 charlist",
      "能为跨语言异常和返回值建立稳定协议",
    ],
    prerequisites: ["完成共享语义", "会用 Mix 与 Rebar3"],
    concepts: [
      {
        term: "charlist",
        definition:
          "整数 code point 的 list，Erlang 旧 API 中常见；Elixir 中用 `~c\"text\"` 表示。",
      },
      {
        term: "record",
        definition:
          "Erlang 编译期 tuple 语法糖。跨语言直接依赖 tuple 位置很脆弱，优先使用公开访问函数或 map 协议。",
      },
      {
        term: "exception boundary",
        definition:
          "一边抛出 exception/exit/throw 时，另一边如何捕获并转为稳定错误 tuple 的约定。",
      },
    ],
    elixirCode: `defmodule Scheduler do
  @spec submit(binary(), map()) ::
          {:ok, reference()} | {:error, atom()}
  def submit(queue, payload) when is_binary(queue) do
    :job_worker.submit(
      String.to_charlist(queue),
      Map.to_list(payload)
    )
  catch
    :exit, reason -> {:error, normalize_exit(reason)}
  end
end`,
    erlangCode: `-module(job_worker).
-export([submit/2, call_elixir/1]).

submit(Queue, Payload)
    when is_list(Queue), is_list(Payload) ->
  {ok, make_ref()}.

call_elixir(Value) ->
  'Elixir.Scheduler':normalize(Value).`,
    codeCaption:
      "转换发生在边界，核心协议使用带标签 tuple。不要让 charlist 假设渗透整个 Elixir 代码库。",
    experiment: {
      title: "把字符串陷阱变成测试",
      intro:
        "让 Erlang worker 只接受 charlist；先直接传 Elixir String 触发错误，再在边界转换并固定测试。",
      steps: [
        "从 Elixir 传入 `\"jobs\"`，记录 guard 或 function clause 错误",
        "改用 `String.to_charlist/1`",
        "为中文队列名加入 round-trip 测试",
      ],
      command: `mix test test/interoperability_test.exs`,
      expected: [
        "binary 与 charlist 匹配不同 guard",
        "显式转换后协议通过",
        "Unicode 测试防止按字节错误处理",
      ],
      breakIt:
        "从 Erlang 返回一个内部 record tuple，让 Elixir 按位置取值；随后给 record 增加字段，观察脆弱耦合。",
      canProve: "显式边界转换可让两边对字符串 term 达成一致。",
      cannotProve:
        "一个成功转换不证明第三方库所有返回路径都遵守同一字符串约定。",
    },
    quiz: {
      question: "跨语言调用中，最稳妥的长期返回协议通常是什么？",
      options: [
        "依赖私有 record 的 tuple 位置",
        "带标签的简单 term，例如 `{ok, Value}` / `{error, Reason}`",
        "任何异常都直接向上传播",
        "把所有值转成可打印字符串",
      ],
      answer: 1,
      explanation:
        "简单、显式、可模式匹配的 term 易于两边测试。私有 record、任意异常和字符串化都会丢失边界稳定性。",
    },
    challenge: {
      title: "混合语言 worker",
      brief:
        "Elixir 提供公共 API 与验证，Erlang gen_server 承担队列状态；两边各自写测试，并互相穿过边界。",
      hints: [
        "先写 term 协议文档。",
        "所有转换集中在 adapter 模块。",
        "让 ExUnit 覆盖 Erlang worker，EUnit 覆盖 Elixir normalize 函数。",
      ],
      acceptance: [
        "两种语言都承担真实职责",
        "binary/charlist 和异常转换集中在边界",
        "双向测试能发现协议漂移",
      ],
    },
    takeaways: [
      "共享 VM 让调用简单，稳定协议让维护简单。",
      "字符串、record 与异常是最常见摩擦面。",
      "adapter 应该薄、集中、双向可测试。",
    ],
    references: [
      {
        label: "Erlang libraries from Elixir",
        href: "https://hexdocs.pm/elixir/erlang-libraries.html",
      },
      {
        label: "String and binaries",
        href: "https://hexdocs.pm/elixir/binaries-strings-and-charlists.html",
      },
    ],
  },
  {
    number: "11",
    slug: "reliable-scheduler",
    stage: "production",
    stageLabel: "实战",
    title: "综合项目：可靠任务调度器",
    subtitle: "把函数式建模、进程协议、OTP、互操作、容量与运维串成一个系统。",
    summary:
      "Elixir 提供 CLI/API，Erlang gen_server 调度 worker；支持超时、重试、有界队列与故障注入。",
    duration: "10 小时",
    lessons: 4,
    level: "项目",
    languages: ["Elixir", "Erlang", "OTP"],
    why:
      "零散练习容易把每个 API 都做对，却没有面对系统级取舍。这个项目刻意加入容量、失败和语言边界，让你必须说明：谁拥有状态、什么能重试、恢复半径多大、过载如何暴露。",
    outcomes: [
      "能从业务不变量推导进程与监督树",
      "能让 Erlang 与 Elixir 在同一发布包中承担真实职责",
      "能通过故障注入验证恢复，而不是只跑 happy path",
    ],
    prerequisites: [
      "完成前 11 个模块",
      "能独立编写 GenServer/gen_server 与 Supervisor",
    ],
    concepts: [
      {
        term: "at-least-once",
        definition:
          "任务可能重复执行。系统需要幂等键或去重策略，不能用“重试”假装恰好一次。",
      },
      {
        term: "bounded queue",
        definition:
          "队列有固定容量；满时系统必须阻塞、拒绝或降级，而不是继续承诺。",
      },
      {
        term: "runbook",
        definition:
          "面向运行者的诊断与处置说明：看什么指标、如何判断、可以执行什么安全动作。",
      },
    ],
    elixirCode: `defmodule Scheduler.API do
  def submit(payload, opts \\\\ []) do
    with :ok <- validate(payload),
         {:ok, id} <- :scheduler_core.enqueue(payload, opts) do
      {:accepted, id}
    else
      {:error, :queue_full} -> {:rejected, :busy}
      {:error, reason} -> {:rejected, reason}
    end
  end
end`,
    erlangCode: `handle_call({enqueue, Job, Opts}, _From,
            State = #state{queued = Queue, max = Max}) ->
  case queue:len(Queue) < Max of
    true ->
      {Id, Next} = add_job(Job, Opts, State),
      {reply, {ok, Id}, dispatch(Next)};
    false ->
      {reply, {error, queue_full}, State}
  end.`,
    codeCaption:
      "Elixir 管理易用 API 与输入验证；Erlang worker 明确掌控队列容量和调度状态。",
    experiment: {
      title: "四次故障注入",
      intro:
        "不要把“进程重启了”当作验收。对 worker 崩溃、非法消息、任务超时、节点断开分别定义期望状态。",
      steps: [
        "执行中的 worker 主动 exit，检查任务重试与容量计数",
        "发送不符合协议的消息，确认服务不中断且有观测信号",
        "让任务超过 timeout，检查取消/隔离与迟到结果",
        "断开远程节点，检查 stale 状态与重连",
      ],
      command: `mix test --only fault_injection --trace`,
      expected: [
        "所有长期进程仍在监督树中",
        "任务不会无限重试",
        "队列与并发计数最终恢复一致",
        "每次恢复都有结构化日志或指标",
      ],
      breakIt:
        "删除重试上限并让任务稳定失败。观察 restart/重试风暴如何放大原始故障。",
      canProve: "指定故障下，系统按已定义策略恢复或拒绝。",
      cannotProve:
        "四个场景不能穷尽生产故障；尤其不能证明恰好一次、跨节点一致性或外部副作用安全。",
    },
    quiz: {
      question: "任务失败后自动重试，最先必须明确什么？",
      options: [
        "按钮使用什么颜色",
        "任务是否幂等，以及最大尝试次数",
        "worker 使用 Elixir 还是 Erlang",
        "日志是否打印完整 payload",
      ],
      answer: 1,
      explanation:
        "重试可能重复外部副作用。幂等性、退避、最大次数和死信去向都应先于实现语言选择。",
    },
    challenge: {
      title: "毕业答辩",
      brief:
        "交付源码、监督树图、消息协议、容量预算、故障实验记录、release 与一页 runbook；用 10 分钟解释三个最重要取舍。",
      hints: [
        "取舍必须包含一个你明确没有实现的保证。",
        "演示 queue_full，而不是只演示成功提交。",
        "runbook 从“用户看到什么”反推需要的信号。",
      ],
      acceptance: [
        "Elixir 与 Erlang 都有真实且合理职责",
        "并发、队列、timeout、retry 全部有上限",
        "ExUnit 与 EUnit 穿过互操作边界",
        "release 可启动，runbook 可由他人执行",
      ],
    },
    takeaways: [
      "可靠系统先定义不变量、容量和失败语义，再选择进程结构。",
      "重试扩大副作用；幂等与上限必须成对出现。",
      "可运维性不是最后加日志，而是从协议开始保留证据。",
    ],
    references: [
      {
        label: "Mix and OTP",
        href: "https://elixir-lang.org/getting-started/mix-otp/introduction-to-mix.html",
      },
      {
        label: "Erlang Applications",
        href: "https://www.erlang.org/doc/system/applications.html",
      },
      {
        label: "Elixir Releases",
        href: "https://hexdocs.pm/mix/Mix.Tasks.Release.html",
      },
    ],
  },
];

export const resources: ResourceLink[] = [
  {
    label: "Elixir 官方文档",
    shortLabel: "Elixir Docs",
    href: "https://elixir-lang.org/docs/",
    category: "官方文档",
    description: "查语言指南、标准库与当前版本入口。",
    accent: "elixir",
  },
  {
    label: "安装 Elixir",
    shortLabel: "Elixir Install",
    href: "https://elixir-lang.org/install/",
    category: "官方文档",
    description: "按操作系统选择安装方式并核对版本要求。",
    accent: "elixir",
  },
  {
    label: "Erlang/OTP 系统文档",
    shortLabel: "Erlang Docs",
    href: "https://www.erlang.org/doc/system/readme.html",
    category: "官方文档",
    description: "查 OTP 设计原则、参考手册与效率指南。",
    accent: "erlang",
  },
  {
    label: "下载 Erlang/OTP",
    shortLabel: "OTP Downloads",
    href: "https://www.erlang.org/downloads",
    category: "官方文档",
    description: "获取 Erlang/OTP，并查看当前与历史发布版本。",
    accent: "erlang",
  },
  {
    label: "Hex",
    shortLabel: "hex.pm",
    href: "https://hex.pm/",
    category: "包与工具",
    description: "寻找 Erlang/Elixir 包、版本与依赖信息。",
    accent: "tool",
  },
  {
    label: "HexDocs",
    shortLabel: "hexdocs.pm",
    href: "https://hexdocs.pm/",
    category: "包与工具",
    description: "直接进入包文档与模块 API。",
    accent: "tool",
  },
  {
    label: "Elixir Forum",
    shortLabel: "Elixir Forum",
    href: "https://elixirforum.com/",
    category: "社区",
    description: "遇到真实工程问题时，先搜索社区讨论与案例。",
    accent: "elixir",
  },
  {
    label: "Erlang Forums",
    shortLabel: "Erlang Forums",
    href: "https://erlangforums.com/",
    category: "社区",
    description: "跟进 OTP、虚拟机、库与生产经验。",
    accent: "erlang",
  },
  {
    label: "Exercism · Elixir",
    shortLabel: "Elixir 练习",
    href: "https://exercism.org/tracks/elixir",
    category: "练习",
    description: "用小题练模式匹配、递归与惯用写法。",
    accent: "elixir",
  },
  {
    label: "Exercism · Erlang",
    shortLabel: "Erlang 练习",
    href: "https://exercism.org/tracks/erlang",
    category: "练习",
    description: "把相同概念换成 Erlang 再做一遍。",
    accent: "erlang",
  },
  {
    label: "Elixir School 中文",
    shortLabel: "Elixir School",
    href: "https://elixirschool.com/zh-hans/",
    category: "练习",
    description: "适合补充中文语法解释与专题阅读。",
    accent: "beam",
  },
  {
    label: "Learn You Some Erlang",
    shortLabel: "LYSE",
    href: "https://learnyousomeerlang.com/",
    category: "练习",
    description: "用经典长文深入 Erlang、并发与 OTP。",
    accent: "beam",
  },
  {
    label: "Livebook",
    shortLabel: "Livebook",
    href: "https://livebook.dev/",
    category: "包与工具",
    description: "把 Elixir 代码、讲解与可运行实验放在一起。",
    accent: "tool",
  },
  {
    label: "Phoenix",
    shortLabel: "Phoenix",
    href: "https://www.phoenixframework.org/",
    category: "包与工具",
    description: "完成 BEAM/OTP 地基后，再进入实时 Web 开发。",
    accent: "tool",
  },
];

export function getModule(slug: string) {
  return courseModules.find((module) => module.slug === slug);
}

export function getAdjacentModules(slug: string) {
  const index = courseModules.findIndex((module) => module.slug === slug);
  return {
    previous: index > 0 ? courseModules[index - 1] : undefined,
    next:
      index >= 0 && index < courseModules.length - 1
        ? courseModules[index + 1]
        : undefined,
  };
}
