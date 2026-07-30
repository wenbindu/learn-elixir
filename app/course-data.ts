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
  storyBridge: {
    label: string;
    title: string;
    story: string;
    connection: string;
    boundary: string;
  };
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

export const stages: Array<{
  id: CourseStage;
  number: string;
  title: string;
  description: string;
}> = [
  {
    id: "foundation",
    number: "01",
    title: "先让代码跑起来",
    description: "认识 Erlang、Elixir、BEAM、OTP 和 Mix 分别在忙什么。",
  },
  {
    id: "languages",
    number: "02",
    title: "两种写法轮流试",
    description: "把同一个小任务写两遍，慢慢看懂它们哪里相同、哪里不同。",
  },
  {
    id: "concurrency",
    number: "03",
    title: "让小进程一起合作",
    description: "从收信和回信开始，再认识 OTP、监督树与背压。",
  },
  {
    id: "production",
    number: "04",
    title: "把作品带到更大的世界",
    description: "让节点联网、两门语言合作，再完成一件能应对小故障的作品。",
  },
];

export const courseModules: CourseModule[] = [
  {
    number: "00",
    slug: "start-line",
    stage: "foundation",
    stageLabel: "地基",
    title: "起跑线：两门语言，一台机器",
    subtitle:
      "先认识五位伙伴：谁写代码，谁让代码跑，谁提供可靠做法，谁帮你建项目。",
    summary:
      "打开 erl 和 iex，让它们各说一句话；再用 Mix 创建、运行和测试你的第一个 Elixir 小项目。",
    duration: "约 2 小时 · 建议分 2 次",
    lessons: 2,
    level: "零基础",
    languages: ["BEAM", "Elixir", "Erlang"],
    why:
      "刚开始时，Erlang、Elixir、BEAM、OTP 和 Mix 像五个同时出现的新同学，名字多，但不用一次全背下来。我们先让它们各做一件事：Erlang 和 Elixir 用来写代码，BEAM 让代码运行，OTP 提供许多可靠的现成做法，Mix 帮你创建、测试和整理项目。亲手跑一遍后，这张地图自然就清楚了。",
    storyBridge: {
      label: "中国戏台",
      title: "同一出《大闹天宫》，谁在台前，谁在幕后？",
      story:
        "想象大家正在排演《大闹天宫》：可以用不同的剧本写法安排台词，演员却站在同一座舞台上。后台还有一套排练规矩、道具和工具，帮助整场戏稳定地演下去。",
      connection:
        "Erlang 和 Elixir 像两套剧本写法，BEAM 像共同的舞台，OTP 像剧团长期积累的后台规矩和道具，Mix 则像排练、搭台和检查演出的工具箱。",
      boundary:
        "这个比喻只帮助我们分清它们的角色，不能说明源码怎样编译、程序跑得多快，也不能代替真正的版本和项目检查。",
    },
    outcomes: [
      "能用自己的话说清 Erlang、Elixir、BEAM、OTP 和 Mix 各做什么",
      "能分别打开 erl 和 iex，并让它们运行一小段代码",
      "能从版本信息中找到 Erlang/OTP、Elixir 和 Mix",
      "能用 Mix 创建项目、运行代码并跑通第一项测试",
    ],
    prerequisites: [
      "会打开终端并输入命令；暂时不熟练也没关系",
      "知道变量和函数大致是什么；说不清楚也可以边做边认识",
    ],
    concepts: [
      {
        term: "BEAM",
        definition:
          "让 Erlang 和 Elixir 程序真正跑起来的虚拟机。它会安排许多小进程轮流工作，并把消息送到正确的进程。",
      },
      {
        term: "OTP",
        definition:
          "它不是另一门语言，而是一套经过长期使用的工具和做法，帮助程序发现、隔离并恢复错误。以后会遇到的 Supervisor 和 GenServer 都来自这里。",
      },
      {
        term: "Mix",
        definition:
          "Elixir 项目的工具管家。它能创建、编译、格式化和测试项目，也会帮助管理依赖；`mix.exs` 就像项目的说明书。Mix 不是 BEAM 或 OTP，也不等于 Hex 包仓库。",
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
      "两段代码写法不同，做的事却一样：请一个 BEAM 小进程送来一个 tuple，再用模式匹配把消息接住。",
    experiment: {
      title: "先跟工具打个招呼，再创建第一个项目",
      intro:
        "先不背定义，让 Erlang、Elixir 和 Mix 依次“自报家门”。接着请 Mix 搭好一个小项目，看看它准备了哪些文件，还能不能通过第一项测试。",
      steps: [
        "先运行 `erl`，输入 `erlang:system_info(otp_release).`，请 Erlang 报出 OTP 版本",
        "运行 `elixir --version` 和 `mix --version`，找出 Erlang/OTP、Elixir、Mix 三类版本",
        "执行 `mix new beam_probe`，看看 `mix.exs`、`lib/` 和 `test/` 分别装着什么",
        "进入项目运行 `mix test`，再用 `mix run -e` 从同一项目读取 OTP release",
      ],
      command: `erl -noshell -eval 'io:format("OTP ~s~n", [erlang:system_info(otp_release)]), halt().'
elixir --version
mix --version

mix new beam_probe
cd beam_probe
mix test
mix run -e 'IO.puts("OTP #{:erlang.system_info(:otp_release)}")'`,
      expected: [
        "三个命令会报出彼此能够配合工作的 Erlang/OTP、Elixir 和 Mix 版本",
        "Mix 会准备 `mix.exs`、源码目录和测试目录，但不会另外创造一台虚拟机",
        "示例测试能够通过，`mix run` 也能直接调用 Erlang 的 `erlang` 模块",
      ],
      breakIt:
        "现在故意走出 `beam_probe` 文件夹，再运行 `mix test`。别急着修，先看清错误是在说“这里没有项目”，还是在说“代码写错了”。会读错误信息，也是编程本领。",
      canProve:
        "这台电脑已经能使用 Erlang、Elixir 和 Mix，也能创建、编译和测试一个小项目。",
      cannotProve:
        "这还不能说明所有外部软件包都能使用，也不代表这个小项目已经适合放到真正的服务器上。",
    },
    quiz: {
      question: "下面哪句话最准确？OTP 是……",
      options: [
        "给 Elixir 下载软件包的商店",
        "BEAM 世界里一套经过长期使用的库、behaviour 和可靠设计方法",
        "只负责把 Erlang 代码变成机器码的工具",
        "只有许多电脑连在一起时才能使用的数据库",
      ],
      answer: 1,
      explanation:
        "OTP 同时服务 Erlang 和 Elixir。Mix 是项目工具，Hex 是软件包生态；编译器只是工具链的一部分，而数据库也只是 OTP 能提供的众多组件之一。",
    },
    challenge: {
      title: "给电脑做一张“编程体检卡”",
      brief:
        "用不超过 12 行记录 Erlang/OTP、Elixir 和 Mix 的版本，再写下三种情况该先检查哪里：找不到命令、找不到 `mix.exs`、版本对不上。",
      hints: [
        "先让 `elixir --version`、`mix --version` 和 `mix help` 分别说出自己的信息。",
        "看到错误时，先判断是“找不到工具”“不在项目里”，还是“版本不合适”。",
        "把结果保存好，以后请别人帮忙时，这张体检卡会很有用。",
      ],
      acceptance: [
        "体检卡上能看到 OTP、Elixir 和 Mix 三类版本",
        "能说明 `mix.exs` 是项目说明书，并分清 Mix 与 Hex",
        "三种情况各有一个清楚的下一步",
        "能分清电脑的操作系统进程与 BEAM 小进程",
      ],
    },
    takeaways: [
      "Erlang 和 Elixir 用来表达想法，BEAM 让代码运行，OTP 提供可靠做法。",
      "Elixir 调用 Erlang，通常是在同一台 BEAM 虚拟机里直接调用模块，不需要跨网络喊话。",
      "Mix 管项目和构建任务，Hex 提供软件包；遇到问题时，先看看出错的是哪一位伙伴。",
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
      {
        label: "Introduction to Mix",
        href: "https://elixir-lang.org/getting-started/mix-otp/introduction-to-mix.html",
      },
    ],
  },
  {
    number: "01",
    slug: "beam-mental-model",
    stage: "foundation",
    stageLabel: "地基",
    title: "每个小进程，都有自己的信箱",
    subtitle: "每个小进程都有自己的数据和信箱，需要合作时就互相发消息。",
    summary:
      "做一个会收消息的计数器，亲眼看看状态放在哪里，消息又会在哪里等待。",
    duration: "约 3 小时 · 建议分 3 次",
    lessons: 3,
    level: "零基础",
    languages: ["BEAM", "OTP"],
    why:
      "电脑程序常常需要同时做许多事。BEAM 的办法很特别：让许多小进程各自保管自己的数据，需要合作时就发送消息。这样，一个小进程出错时，通常不用把所有伙伴都拖下水。我们先做一个小计数器，看看这种合作是怎样发生的。",
    storyBridge: {
      label: "古代驿站",
      title: "每座驿站，都有自己的公文匣",
      story:
        "唐代驿路上，每座驿站都有自己的人员、记录和公文匣。信使可以把公文送到下一站，却不能直接跑进去改掉对方的账本。驿站收到公文后，再决定当前能办理哪一件事。",
      connection:
        "一座驿站像一个 BEAM 进程，公文匣像 mailbox，送公文就是发送消息，各自保管的账本则像进程自己的状态。",
      boundary:
        "真实 mailbox 不只是从头拿走第一封信：选择性接收可以先跳过暂时不匹配的消息。BEAM 的调度也比现实中的驿站轮班更快、更精细。",
    },
    outcomes: [
      "能分清 BEAM 小进程、操作系统进程和线程不是同一种东西",
      "能说清每个进程怎样保管自己的数据，又怎样从 mailbox 收消息",
      "能根据消息循环，猜出下一轮状态和模式匹配的结果",
    ],
    prerequisites: [
      "完成起跑线，并成功运行过一小段 Erlang 或 Elixir 代码",
      "见过 tuple、list 和 map；暂时记不牢写法也没关系",
    ],
    concepts: [
      {
        term: "轻量进程",
        definition:
          "BEAM 里面的一个小工作者。它不是任务管理器里看到的完整应用，而是由 BEAM 安排的独立工作单元，所以可以同时创建很多个。",
      },
      {
        term: "mailbox",
        definition:
          "每个进程自己的收件箱。别人发来的消息先在这里等待，进程会用模式匹配寻找当前能够处理的消息；发送者通常不用站在原地等它取走。",
      },
      {
        term: "reduction",
        definition:
          "BEAM 使用的一种“大致工作步数”。一个进程做了一小段工作后，调度器会给其他进程机会，避免某一位一直占着舞台。",
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
      "计数器没有擦掉旧数字再写新数字。它每收到一条消息，就带着新的总数进入下一轮等待。",
    experiment: {
      title: "给计数器寄三封信",
      intro:
        "先猜一猜：依次寄出“加 1”“加 2”“加 3”，最后询问总数，会收到什么？答案不只在数字 6，还在这个数字究竟由谁保管。",
      steps: [
        "向计数器连续发送 `{:add, 1}`、`{:add, 2}` 和 `{:add, 3}`",
        "发送带着自己 PID 的 `{:read, self()}`，让计数器知道回信地址",
        "用 `Process.info(pid, :message_queue_len)` 看看它的收件箱里还有几封信",
      ],
      command: `send(pid, {:add, 1}); send(pid, {:add, 2}); send(pid, {:add, 3})`,
      expected: [
        "最后会收到 `{:total, 6}`",
        "其他进程只能发消息，不能伸手直接改掉计数器保管的数字",
      ],
      breakIt:
        "现在故意删掉 `{:read, caller}` 这一条处理方法，再寄出读取消息。进程不会立刻报错，这封“暂时听不懂的信”会留在 mailbox 里。",
      canProve:
        "这个小进程可以按收到消息的顺序更新计数，并由自己保管状态。",
      cannotProve:
        "这还不能保证所有消息设计都不会互相抢先，也不能保证每个 mailbox 永远不会越积越多。",
    },
    quiz: {
      question: "进程的收件箱里有一封当前无法匹配的消息，通常会怎样？",
      options: [
        "这封消息会马上消失",
        "整台 BEAM 虚拟机会立刻停止",
        "消息会留在 mailbox，进程继续寻找当前能处理的消息",
        "发送者一定会被卡住，什么也做不了",
      ],
      answer: 2,
      explanation:
        "这种做法叫选择性接收：进程会在 mailbox 中寻找能匹配的消息。一直没有处理方法的消息可能越积越多，所以消息名称和处理规则要写清楚。",
    },
    challenge: {
      title: "画一张“三座驿站”的传信图",
      brief:
        "用纸或文本画出测量员 `sensor`、收集员 `collector` 和展示板 `dashboard`。给每封消息起一个看得懂的名字，再用箭头标出它从哪里出发、送到哪里。",
      hints: [
        "不要只把消息叫 `data`，要写清它带来的是温度、查询还是回复。",
        "如果一封信需要回信，别忘了带上回信地址或 reference。",
        "想一想：展示板暂时不工作时，哪些信可能越积越多？",
      ],
      acceptance: [
        "每封消息都能看出是谁发送、谁接收",
        "每一份状态都有明确的保管者",
        "图上至少标出一个 mailbox 可能变长的位置",
      ],
    },
    takeaways: [
      "每个 BEAM 进程管好自己的状态，再通过消息和伙伴合作。",
      "消息循环常常把下一轮要记住的状态放在递归参数里。",
      "暂时无法匹配的消息会留下来，因此 mailbox 有多长值得我们留意。",
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
    title: "Elixir 基础：把数据送上流水线",
    subtitle: "先修剪，再筛选，再分类；每个小函数只做好一件事。",
    summary:
      "拿一份夹着空行和多余空格的日志，写出一条看得懂、也测得准的整理流水线。",
    duration: "约 6 小时 · 建议分 5 次",
    lessons: 5,
    level: "入门探索",
    languages: ["Elixir"],
    why:
      "一件大事如果全塞进一个长函数，就像把书坊里的抄写、校对、分类和装订都堆给一个人。Elixir 鼓励我们先认出数据的形状，再把工作拆成几个小步骤。管道会把上一步的结果交给下一步，让代码读起来像一条清楚的路线。",
    storyBridge: {
      label: "古代书坊",
      title: "一册《唐诗》，要经过几双手？",
      story:
        "想象古代书坊正在整理一册《唐诗》稿页：第一位学徒擦掉多余空白，第二位挑出空页，第三位按题材分类，第四位负责计数。每个人只做一件小事，稿页却会一步步变整齐。",
      connection:
        "稿页像输入数据，书坊里的工序像小函数，`|>` 管道像把稿页交给下一位学徒。工序换了顺序，最后留下的内容也可能不同。",
      boundary:
        "这个故事能解释管道、步骤顺序和小函数分工，却不能说明 Stream 为什么延后计算，也不能告诉我们哪种写法一定更快。",
    },
    outcomes: [
      "能先用模式认出数据，再用 guard（附加条件）和多子句函数选择处理方法",
      "能说清 Enum 是马上完成一批工作，Stream 是等到结果被需要时再逐步处理",
      "能给不读文件、不发消息的纯函数写出一组小而清楚的 ExUnit 测试",
    ],
    prerequisites: [
      "知道 BEAM 里有小进程和 mailbox，并见过一次模式匹配",
      "知道 list 用来排一列数据，map 用键找到对应的值",
    ],
    concepts: [
      {
        term: "模式匹配",
        definition:
          "把左边当作一块形状模板，把右边的数据放进去试一试。形状对得上，就能取出其中的部分；对不上，就需要换另一种处理方法。这里的 `=` 不只是普通赋值。",
      },
      {
        term: "多子句函数",
        definition:
          "同一个函数可以准备几种入口。程序会从上往下尝试，找到第一条形状和 guard 条件都合适的路；“同元数”表示这些入口接收同样多的参数。",
      },
      {
        term: "管道",
        definition:
          "`|>` 会把左边得到的结果交给右边函数，作为它的第一个参数。它能让步骤更好读，但每一步仍然要写得清楚。",
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
      "先看 Elixir 怎样一步步整理日志，再看看 Erlang 的另一种写法。标点不同，但它们都在识别相同的数据形状。",
    experiment: {
      title: "交换两道工序，会发生什么？",
      intro:
        "书坊先擦掉空白，再丢掉空页；如果把顺序反过来，会不会漏掉一张“看起来有内容，其实只有空格”的纸？先猜答案，再运行同一组数据。",
      steps: [
        "准备 Elixir 字符串列表 `[\" INFO boot \", \" \", \"ERROR timeout\"]`",
        "先运行“去掉两端空格，再删除空字符串”的顺序，记下结果",
        "把 `reject` 移到 `trim` 前面，再用完全相同的输入运行一次",
      ],
      command: `mix test --trace`,
      expected: [
        "先 `trim` 再 `reject` 时，只有空格的那一行会被删掉",
        "先 `reject` 再 `trim` 时，那一行一开始还不是空字符串，随后可能闯进解析器",
      ],
      breakIt:
        "现在传入 `WARN slow`，并暂时删掉处理未知级别的那条路。读一读 `FunctionClauseError`，看看它有没有告诉你是哪一份数据没有找到合适入口。",
      canProve:
        "数据经过步骤的先后顺序，会改变最后能被模式匹配识别的内容。",
      cannotProve:
        "这几个小样例还不能说明 Stream 一定比 Enum 快。数据有多少、是否只取其中一部分，都会影响选择。",
    },
    quiz: {
      question: "哪种情况更适合先考虑 Stream？",
      options: [
        "任何时候，因为 Stream 一定更快",
        "数据很多，或者最后只需要其中一部分，希望等到用时再逐步处理",
        "现在就要把全部结果变成一个 list",
        "想把原来的 list 就地改掉",
      ],
      answer: 1,
      explanation:
        "Stream 会先记住要做的步骤，等结果真正被需要时才计算；这叫惰性执行。它不是免费的加速按钮，小集合上直接用 Enum 往往更明白。",
    },
    challenge: {
      title: "成为一回“日志小侦探”",
      brief:
        "做一个 Mix 小工具：读取日志文件，跳过空行，统计 INFO、WARN 和 ERROR，还要找出出现次数最多的三条消息。",
      hints: [
        "先只写“看懂一行日志”的纯函数，再把读取文件放在最外面。",
        "遇到不认识的行，不要偷偷扔掉，把它作为线索用 `{:error, line}` 返回。",
        "准备三种测试：带空格的内容、未知级别和空文件。",
      ],
      acceptance: [
        "整理日志和读取文件是两个分开的步骤",
        "遇到未知行时会留下清楚的错误结果",
        "ExUnit 测试照顾到正常情况、边角情况和错误情况",
      ],
    },
    takeaways: [
      "先看清数据长什么样，再安排它要经过哪些步骤。",
      "管道负责把结果交给下一步；真正让代码好懂的，仍是小而清楚的函数。",
      "Stream 会延后工作，但不是“更快版 Enum”，要根据数据和目标来选。",
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
    title: "Erlang 基础：学会读懂另一种写法",
    subtitle: "从大小写开始，再读懂逗号、分号和句点给出的路标。",
    summary:
      "用 Erlang 重做上一关的日志工具，让同一组样例在两种语言中都得到相同结果。",
    duration: "约 6 小时 · 建议分 5 次",
    lessons: 5,
    level: "入门探索",
    languages: ["Erlang"],
    why:
      "很多 BEAM 文档和现成工具使用 Erlang。学会读基础 Erlang，就像多拿到一份原版地图：遇到错误信息、`:gen_tcp` 或 observer 时，不必绕开它。今天不用背下整本语法，只要先认出数据、函数和三种重要标点。",
    storyBridge: {
      label: "古文句读",
      title: "没有标点的文章，应该在哪里停？",
      story:
        "古人读文章时，要先分清一句在哪里暂停、在哪里结束，这叫“句读（jù dòu）”。停错位置，同一串字就可能读出完全不同的意思。",
      connection:
        "Erlang 的逗号表示同一条路上接着做，分号常常隔开另一个函数入口或分支，句点表示一个完整定义结束。它们都在给代码划边界。",
      boundary:
        "古文句读和 Erlang 语法不是一一对应的。这个故事只说明标点会改变结构；真正写代码时，仍要遵守编译器的严格规则。",
    },
    outcomes: [
      "能认出 Erlang 中的 atom、变量、tuple、list、map 和 binary",
      "能用逗号、分号和句点写清“接着做”“换条路”和“到这里结束”",
      "能创建 Rebar3 项目，并用 EUnit 检查自己的函数",
    ],
    prerequisites: [
      "完成 Elixir 基础，能看懂上一关的日志处理步骤",
      "知道模式匹配是在检查数据形状，并见过函数再次调用自己",
    ],
    concepts: [
      {
        term: "大写变量",
        definition:
          "在 Erlang 中，大写字母或下划线开头的名字表示变量；小写裸词通常是一个固定标签，叫 atom。",
      },
      {
        term: "标点结构",
        definition:
          "逗号表示“同一条路上接着做”，分号常用来隔开同一函数的另一种入口或一个新分支，句点表示“这个完整定义或 shell 表达式到这里结束”。",
      },
      {
        term: "binary",
        definition:
          "装着一串字节的数据盒子，写作 `<<...>>`。UTF-8 文本通常放在 binary 中；传统 charlist 则是一串代表字符的整数。",
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
      "Erlang 的模块名是 atom，`total/1` 中的 1 表示它接收一个参数。列表推导里的形状模板会挑出已付款的订单，再取出金额。",
    experiment: {
      title: "像给古文断句一样，给代码找边界",
      intro:
        "分别把逗号、分号和句点改错一次，看看编译器误会了什么。不要背报错原文，试着用自己的话说出：它以为哪一段还没结束？",
      steps: [
        "创建 `classify/1`，为正数和零或负数准备两个入口",
        "把第一条入口末尾的分号改成句点，再编译一次",
        "把同一个函数体中表示“接着做”的逗号改成分号，再编译一次",
      ],
      command: `rebar3 eunit`,
      expected: [
        "分号能隔开同名、同参数个数的多个函数入口",
        "句点会告诉编译器：整个函数定义到这里结束",
        "逗号会让同一函数体中的表达式按顺序继续",
      ],
      breakIt:
        "现在删掉 `-export([total/1]).`，再从 shell 调用 `orders:total/1`。函数还在模块里面，但模块外面已经看不到这扇门了。",
      canProve:
        "Erlang 的逗号、分号和句点都在表达代码结构，不能只按好看与否互换。",
      cannotProve:
        "成功编译只说明结构基本正确，还不能说明程序算出的答案一定正确。",
    },
    quiz: {
      question: "Erlang 看到没有引号的 `user_name` 时，会把它当成什么？",
      options: ["可以变化的变量", "固定标签 atom", "一段文字字符串", "模块说明"],
      answer: 1,
      explanation:
        "小写开头、没有引号的词通常是 atom。变量要用大写字母或下划线开头；文本和 binary 还需要各自的写法。",
    },
    challenge: {
      title: "来一次 Erlang 翻译接力",
      brief:
        "用 Rebar3 重写上一关的日志工具，并让 Elixir 版和 Erlang 版读取同一组样例文件、得到相同结果。",
      hints: [
        "可以用 binary 的形状模板拆出 INFO、WARN 和 ERROR 前缀。",
        "读取文件放在单独模块里，整理日志的核心函数只接收 binary 列表。",
        "把上一关的测试场景带过来；EUnit 测试可以使用 `_test` 或 generator 写法。",
      ],
      acceptance: [
        "模块只打开真正需要从外部进入的函数入口",
        "代码会明确分清 binary 和 charlist，并在需要时转换",
        "EUnit 检查了与 Elixir 版相同的正常、边角和错误场景",
      ],
    },
    takeaways: [
      "Erlang 会直接写出模块、函数和参数个数，这些信息就像函数的完整地址。",
      "binary 和 charlist 不是同一种数据；两种语言交换文本时，要主动看清并转换。",
      "逗号、分号和句点都是结构路标，不只是书写习惯。",
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
    title: "两种写法，能不能对上暗号？",
    subtitle: "Elixir 和 Erlang 穿着不同的外衣，却常常传递同样的数据。",
    summary:
      "用两种语言写同一个订单小游戏：下单、付款、发货；再检查它们的输入和回答能不能完全对上。",
    duration: "约 5 小时 · 建议分 4 次",
    lessons: 4,
    level: "双语挑战",
    languages: ["Elixir", "Erlang", "BEAM"],
    why:
      "与其把两门语言从头各背一遍，不如把同一件事并排写两次。你会发现，Elixir 的 `:ok` 和 Erlang 的 `ok` 看起来不同，在 BEAM 里却是同一个标签。我们先找到共同规则，再认识字符串、模块名、异常和工具这些真正不同的地方。",
    storyBridge: {
      label: "军令与虎符",
      title: "字迹可以不同，暗号必须对得上",
      story:
        "同一道军令可以用不同字体抄写，但地点、行动、回执和印信的格式必须一致。将领核对虎符时，也不在乎握法是否漂亮，只在乎两半的形状能不能严丝合缝。",
      connection:
        "Elixir 和 Erlang 的语法像不同字迹，双方约好的 BEAM 数据形状像军令格式。输入与返回值对得上，两边就能直接合作。",
      boundary:
        "两门语言不只是字体不同：模块命名、常用工具、异常写法、struct、record 和字符串习惯仍有真实差异，不能把所有代码逐字替换。",
    },
    outcomes: [
      "能把常见数据、函数和模块调用从 Elixir 写法换成 Erlang 写法，也能换回来",
      "能说清哪些只是表面写法不同，哪些数据交给 BEAM 后本来就是同一个 term",
      "能用 spec 写下双方约定的数据形状，再用测试检查约定有没有走样",
    ],
    prerequisites: [
      "完成 Elixir 与 Erlang 基础，并能读懂两边的简单函数",
      "会给同样的输入检查同样的输出",
    ],
    concepts: [
      {
        term: "atom 映射",
        definition:
          "atom 是一个固定标签。Elixir 写作 `:ok`，Erlang 写作 `ok`；交给 BEAM 后，它们代表同一个标签。Elixir 模块名本身也是带 `Elixir.` 前缀的 atom。",
      },
      {
        term: "模块调用",
        definition:
          "一次调用可以看成一个完整地址：模块名、函数名，再加参数个数。`Foo.bar()`、`:lists.reverse/1` 和 `foo:bar()` 最终都能拆成这三部分；参数个数也叫元数（arity）。",
      },
      {
        term: "约好的数据格式",
        definition:
          "两个模块事先约好“你要给我什么形状的数据，我会回给你什么”。跨模块、跨语言时，清楚的数据形状和错误标签比表面写法更重要。",
      },
      {
        term: "term",
        definition:
          "BEAM 能直接认识的一份数据都可以叫 term，例如数字、atom、tuple、list 和 map。普通 term 可以直接在 Erlang 与 Elixir 模块之间传递。",
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
      "两边都接收两个 atom，并返回一个带标签的 tuple：成功时给出新状态，失败时说明这次变化不允许。同一组测试样例可以检查两种实现。",
    experiment: {
      title: "让两种语言交换同一封“军令”",
      intro:
        "先从 Elixir 调用 Erlang，再从 Erlang 调用 Elixir。观察 `:ok`、`ok` 和 tuple 穿过语言边界后，是否仍代表同一份 BEAM 数据。",
      steps: [
        "把 `order.erl` 放进 Mix 项目的 `src/`，然后编译项目",
        "在 IEx 中调用 `:order.transition(:new, :pay)`，记下返回值",
        "再从 Erlang 调用 `'Elixir.Order':transition(new, pay)`，比较两边的数据形状",
      ],
      command: `iex -S mix`,
      expected: [
        "两边都会得到与 `{ok, paid}` 对应的同一个 tuple term",
        "Erlang 可以用 Elixir 模块真正的 module atom 找到并调用它",
      ],
      breakIt:
        "把一边的 atom `paid` 改成字符串 `\"paid\"`，另一边仍然等待 atom `paid`。它们看起来都写着 paid，数据种类却不同，因此暗号对不上。",
      canProve:
        "数字、atom、tuple 等普通 BEAM term 可以直接在两种语言的模块之间传递。",
      cannotProve:
        "能传递普通 term，不代表字符串、Elixir struct、Erlang record 和异常都不需要额外约定。",
    },
    quiz: {
      question: "Erlang 想找到 Elixir 的 `Foo` 模块，通常要使用哪个真正的模块名？",
      options: ["foo", "'Foo'", "'Elixir.Foo'", ":Foo"],
      answer: 2,
      explanation:
        "Elixir 的模块别名编译后会变成带 `Elixir.` 前缀的 module atom。这个名字含有大写字母和句点，所以 Erlang 要用单引号把它写成 atom。",
    },
    challenge: {
      title: "订单状态接力赛",
      brief:
        "给订单增加取消、退款和重复点击，分别用 Elixir 与 Erlang 实现。先画一张“当前状态 + 发生事件 = 新状态”的表，再让两边按同一张表回答。",
      hints: [
        "先画状态与事件表，不要急着写代码。",
        "想清楚第二次收到同一个事件时，是保持原状，还是明确返回错误；这就是在决定是否幂等。",
        "先用纯函数把规则说清楚，不要急着用进程藏住还没想明白的变化。",
      ],
      acceptance: [
        "两种实现返回相同形状的 term",
        "不允许的状态变化会给出清楚的错误标签",
        "spec 和测试检查了状态表中的每一条变化路线",
      ],
    },
    takeaways: [
      "先约好输入与返回的 term 形状，再选择用哪门语言来表达。",
      "Elixir 的模块名和 alias 交给 BEAM 后，仍会变成 module atom。",
      "文字数据、struct、record 和异常最容易让两边产生误会，需要明确约定并测试。",
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
    title: "消息会迟到：亲手写一个并发小服务",
    subtitle: "先自己收信和回信，再揭开 GenServer 帮我们做了什么。",
    summary:
      "给每个请求贴上独一无二的小票，看看超时、迟到的回复和服务停止时分别会发生什么。",
    duration: "约 6 小时 · 建议分 4 次",
    lessons: 4,
    level: "进阶探索",
    languages: ["Elixir", "Erlang", "BEAM"],
    why:
      "GenServer 已经替我们准备了许多方便的规则，但先写一次短小的消息循环，会更容易看清里面发生的事：请求发出去时带着编号，回复回来时也带着同一个编号；等待时间到了，并不表示路上的消息自动消失。",
    storyBridge: {
      label: "镖局回执",
      title: "客人不再等，镖会不会瞬间回来？",
      story:
        "镖局接下一趟货时，会给它一个镖号。客人等得不耐烦先回家，并不会让已经出发的镖师瞬间折返；回执仍可能晚些送到。掌柜要靠镖号判断回执属于哪一趟货。",
      connection:
        "镖号像 reference，托镖像 request，回执像 reply。timeout 只表示调用者停止等待，不等于服务端已经取消工作。",
      boundary:
        "这个故事能解释请求编号和迟到回复，却不能完整解释 link、monitor、进程退出原因或 `trap_exit`；这些仍要直接用代码观察。",
    },
    outcomes: [
      "能给每个 request 加上不会混淆的 reference，并让 reply 带着同一编号回来",
      "能说清 link 和 monitor 都在关注进程退出，但方向和反应不同",
      "能认出三种常见情况：互相等待、迟到回复、mailbox 越积越多",
    ],
    prerequisites: [
      "能用 Elixir 或 Erlang 的模式匹配认出一条消息",
      "知道每个 BEAM 进程都有自己的 mailbox",
    ],
    concepts: [
      {
        term: "reference",
        definition:
          "BEAM 生成的一张几乎不会重复的小票，常用来确认“这封 reply 属于哪一个 request”。",
      },
      {
        term: "link",
        definition:
          "两个进程之间的双向故障联系。默认情况下，一边不是正常结束，而是异常退出，这个退出信号会沿 link 传过去，另一边也可能退出。",
      },
      {
        term: "monitor",
        definition:
          "一个进程单向观察另一个进程。被观察者退出时，观察者会收到一条 `DOWN` 消息，但不会因此自动退出，可以自己决定下一步。",
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
      "reference 像请求编号，能防止把旧回复认成新答案。timeout 只表示“我不再等了”，不会把已经寄出的消息追回来。",
    experiment: {
      title: "让一封回信故意迟到",
      intro:
        "让服务端 1.5 秒后回信，但客户端只等 0.5 秒。先猜一猜：客户端说“等太久了”以后，那封回信会不会继续赶路？",
      steps: [
        "写一个收到 request 后稍等 1.5 秒再 reply 的小服务",
        "发起一次只愿意等待 500 毫秒的 call",
        "两秒后运行 `Process.info(self(), :messages)`，看看自己的 mailbox",
      ],
      command: `Process.info(self(), :messages)`,
      expected: [
        "call 会先返回 `{:error, :timeout}`",
        "服务端仍可能完成工作，迟到的 reply 也可能出现在调用者的 mailbox",
      ],
      breakIt:
        "现在去掉 reference，只按 `{:reply, response}` 接收。连续发出两个速度不同的请求，看看先到的回复会不会被认错。",
      canProve:
        "调用者停止等待和服务端停止工作，是两件不同的事；reference 能帮助回复找到自己的请求。",
      cannotProve:
        "一次实验只能展示几种到达顺序，还不能告诉我们真正服务中该把 timeout 设成多少。",
    },
    quiz: {
      question: "调用者等到 timeout 以后，已经发给服务端的消息通常会怎样？",
      options: [
        "BEAM 会自动把消息追回来",
        "服务端进程会立刻自动停止",
        "消息仍可能被处理，reply 也可能晚些到达",
        "调用者一定会继续卡住，直到服务端完成",
      ],
      answer: 2,
      explanation:
        "`receive` 的 `after` 只决定调用者愿意等多久。想要真正取消，还要另外约好取消消息，并让服务端愿意识别和执行它。",
    },
    challenge: {
      title: "开一间会给回执的 KV 小铺",
      brief:
        "KV 就像一排寄存柜：用一个 key 找到对应的 value。请实现存入 `put`、取出 `get` 和删除 `delete`；每次同步请求都带 reference，也能分清等待超时和小铺已经停止。",
      hints: [
        "先把所有来信和回信的形状写在纸上，再写 loop。",
        "等待 reply 时，也要在同一个 `receive` 中留意 `DOWN` 消息。",
        "正常收到 reply 后，想一想何时用 `demonitor` 停止已经不需要的观察。",
      ],
      acceptance: [
        "多个请求即使回复顺序不同，也不会互相认错",
        "调用者能分清“等太久”和“服务已经退出”",
        "测试中确实制造并检查了一封迟到的 reply",
      ],
    },
    takeaways: [
      "timeout 只表示停止等待，不会自动取消已经开始的工作。",
      "reference 像回执编号，让 request 和 reply 不会认错彼此。",
      "link 建立双向的退出联系；monitor 只负责观察并把消息送回来，由观察者决定下一步。",
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
    title: "给消息循环一套可靠章法",
    subtitle: "GenServer 把收信、回信和系统消息整理成大家都认识的规则。",
    summary:
      "把上一关的 KV 小铺改造成 GenServer 和 gen_server，再比较需要回执的 call 与不用等待的 cast。",
    duration: "约 7 小时 · 建议分 5 次",
    lessons: 5,
    level: "进阶探索",
    languages: ["Elixir", "Erlang", "OTP"],
    why:
      "手写消息循环能帮助我们看清原理，但每个项目都从头处理启动、系统消息、调试和回复，很容易漏掉细节。OTP behaviour 把这些反复使用的部分整理成一套章法。不过，它不会替我们决定哪些消息需要回复、状态该由谁保管，以及忙不过来时该等待还是拒绝。",
    storyBridge: {
      label: "唐代驿路",
      title: "驿站有章程，公文也分要不要回执",
      story:
        "唐代驿路不是让每位驿卒随意传信：交接、换马和登记都有共同章程。有些公文必须等回执，确认对方已经接到；有些只需尽快送出，送信人不会停在原地等待。",
      connection:
        "behaviour 像驿站共同遵守的章程，callback 是每座驿站必须完成的职责。call 像需要回执的公文，cast 像送出后不等待答复的通知。",
      boundary:
        "真实的 call 和 cast 都是在 BEAM 中发送消息，不是骑马送信。cast 只表示调用者不等待，并不保证消息已经处理，也不会自动限制 mailbox 的长度。",
    },
    outcomes: [
      "能分清给使用者调用的 API，和进程内部收到消息后执行的 callback",
      "能根据“是否必须知道结果”和“忙不过来怎么办”选择 call 或 cast",
      "能让需要长期工作的 GenServer 或 gen_server 由监督树照看",
    ],
    prerequisites: [
      "完成消息与 mailbox 章节，亲手写过一次消息循环",
      "知道 request、reply、reference 和 timeout 各自做什么",
    ],
    concepts: [
      {
        term: "behaviour",
        definition:
          "一张大家共同遵守的职责清单，也叫 callback 合约。实现模块负责填好指定 callback，通用框架则负责消息循环、系统消息和调试等重复工作。",
      },
      {
        term: "call",
        definition:
          "一封需要回信的同步请求。调用者会等待 reply，因此发送速度会受到等待影响；但只有等待还不等于完整的背压方案。",
      },
      {
        term: "cast",
        definition:
          "一封发出后不等回信的异步消息。调用者不知道它何时处理；如果发得比服务端做得快，消息可能不断堆进 mailbox。",
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
      "外面的 `get` 和 `put` 把消息细节藏起来，里面的 callback 专心处理约定。Elixir 与 Erlang 写法不同，返回 tuple 表达的意思一一对应。",
    experiment: {
      title: "发得快，不等于做得完",
      intro:
        "把 `put` 改成 cast，再快速送出许多更新。发送者也许一下就结束了，但服务端真的做完了吗？一起观察 mailbox 和同步查询要等多久。",
      steps: [
        "新增使用 cast 的 `put_async/3`",
        "连续送出一大批更新，并分别记录发送结束与处理结束的时间",
        "同时发起一个同步 `get`，记录它的等待时间和 `message_queue_len`",
      ],
      command: `:erlang.process_info(pid, :message_queue_len)`,
      expected: [
        "发送循环很快结束，不代表服务端已经处理完",
        "同步 `get` 可能排在许多 cast 后面，等待时间明显变长",
      ],
      breakIt:
        "在 `handle_cast` 中加入一次慢 I/O，再继续加快发送。看看 mailbox 是短暂变长后恢复，还是一直越积越多。",
      canProve:
        "异步 API 可以让调用者不等待，但等待并没有消失，而是可能转移到了服务端的 mailbox。",
      cannotProve:
        "这次本地实验不能告诉我们真实服务的安全上限；电脑性能、消息大小和外部 I/O 都会改变结果。",
    },
    quiz: {
      question: "下面哪种情况最适合考虑使用 cast？",
      options: [
        "只要是写操作，就一律使用 cast",
        "调用者不需要确认结果，而且系统已经决定忙不过来时怎么办",
        "希望消息发出后立刻执行完",
        "希望 BEAM 自动丢掉旧消息",
      ],
      answer: 1,
      explanation:
        "选择 cast 前，要先回答“真的不需要结果吗”和“消息太多怎么办”。cast 不保证立即执行，也不会自动给 mailbox 加上容量上限。",
    },
    challenge: {
      title: "搭一座有闸门的双语任务驿站",
      brief:
        "任选一种语言写对外 API，另一种语言写 worker。驿站一次最多派出 N 个任务，其余任务进入有上限的等待队列；队列满时，要清楚返回 `busy`。",
      hints: [
        "让一个进程保管队列和容量，但每个真正的任务交给独立进程执行。",
        "用 monitor 同时发现 worker 完成和异常退出，别忘了归还容量。",
        "不要悄悄接收无限任务；满了就把情况告诉调用者。",
      ],
      acceptance: [
        "能看见并发数和等待队列各自的上限",
        "worker 即使异常退出，容量计数最后也会恢复正确",
        "调用者能清楚知道任务被接收还是因为繁忙被拒绝",
      ],
    },
    takeaways: [
      "behaviour 提供可靠的消息循环章法，但具体业务约定仍要自己想清楚。",
      "好用的客户端 API 会把内部消息形状藏起来，让调用者专心表达目的。",
      "cast 能让发送者先走，却可能把压力留在 mailbox；容量和过载处理必须明确设计。",
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
    title: "搭一棵会照看伙伴的监督树",
    subtitle: "先弄清谁依赖谁，再决定一个伙伴倒下时该重启哪些进程。",
    summary:
      "用 child spec、重启策略和 Application 搭出监督树，再亲手观察不同位置出错时谁会重新开始。",
    duration: "约 6 小时 · 建议分 4 次",
    lessons: 4,
    level: "进阶探索",
    languages: ["Elixir", "Erlang", "OTP"],
    why:
      "“Let it crash” 不是遇到错误就不管，而是先划好安全范围：一个进程遇到无法继续的错误时，让监督者按事先写好的策略重新开始。密码不对、库存不足这类可以预料的情况，仍要正常返回答案，不能都靠崩溃处理。",
    storyBridge: {
      label: "《三国演义》行军营寨",
      title: "粮草营出问题，哪些营寨需要重新安排？",
      story:
        "借《三国演义》的行军场景想象一座营寨：有的小营独立守卫，有的要等粮草和道路准备好才能行动。若一个独立小营受损，未必需要全军重新扎营；若前方供应出了问题，后面依赖它的营寨就要一起重新安排。",
      connection:
        "`one_for_one` 像只重整出问题的小营，`one_for_all` 像所有营寨必须一起重整，`rest_for_one` 则会重启出问题的 child 和排在它后面的依赖者。",
      boundary:
        "监督树只根据进程关系和退出信号行动，不会像将领一样理解业务。进程重新启动也不等于丢失的数据、外部付款或已经发出的消息自动恢复。",
    },
    outcomes: [
      "能从“谁依赖谁、谁应一起恢复”画出监督树",
      "能用自己的话比较 `one_for_one`、`one_for_all` 和 `rest_for_one`",
      "能根据进程正常或异常退出时的期待，选择 permanent、transient 或 temporary",
    ],
    prerequisites: [
      "会写一个简单的 GenServer 或 gen_server",
      "知道 link 会传递退出信号，也知道进程可能正常或异常结束",
    ],
    concepts: [
      {
        term: "故障域",
        definition:
          "先画出的“出错影响范围”。有些组件应该一起恢复，有些应彼此隔离；监督树要把这种关系表达出来。",
      },
      {
        term: "restart intensity",
        definition:
          "监督者的重启警戒线：在一小段时间内最多允许重启多少次。超过这条线，说明问题不是偶发的，监督者会自己退出，把情况交给上一级。",
      },
      {
        term: "Application",
        definition:
          "OTP 中一个可以启动、停止、配置并声明依赖的完整组件。它通常会从 application callback 启动自己的根监督树。",
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
      "在 `rest_for_one` 中，child 的顺序不是装饰：前面的基础设施异常退出时，排在后面、依赖它的伙伴也会重新开始。",
    experiment: {
      title: "让不同位置暂时离队，看看谁会重新集合",
      intro:
        "先记下三个 child 的 PID，再分别让最后面的 dispatcher 和最前面的 registry 异常退出。比较哪些 PID 换了，就能看见恢复范围。",
      steps: [
        "启动监督树，用 `which_children` 记录所有 child 的 PID",
        "让最后一个 child 异常退出，重新查看 PID",
        "再让第一个 child 异常退出，比较这次有多少 PID 改变",
      ],
      command: `Supervisor.which_children(Jobs.Supervisor)`,
      expected: [
        "最后一个 child 出错时，通常只有它自己重新启动",
        "第一个 child 出错时，`rest_for_one` 会让它和后面的依赖者都重新启动",
      ],
      breakIt:
        "把 strategy 改成 `one_for_all`，再让最后一个、与其他伙伴关系不大的 child 异常退出。看看是否出现了没有必要的全体重启。",
      canProve:
        "restart strategy 和 child 顺序会一起决定哪些进程重新开始。",
      cannotProve:
        "PID 变成新的，只说明进程重新启动；业务状态、写入磁盘的数据和已经发生的外部操作是否正确，仍要另外检查。",
    },
    quiz: {
      question: "哪种伙伴关系更适合使用 `rest_for_one`？",
      options: [
        "所有 child 完全独立，彼此不需要对方",
        "排在后面的 child 依赖前面 child 的初始化结果或状态",
        "无论谁出错，都只想重启它自己",
        "只要是 Web 应用就默认使用",
      ],
      answer: 1,
      explanation:
        "`rest_for_one` 用 child 顺序表达依赖方向。彼此独立的 child 通常更适合 `one_for_one`；要先看关系，再选择策略。",
    },
    challenge: {
      title: "画出一棵有理由的监督树",
      brief:
        "为任务队列画一棵监督树。给每个 child 标出 permanent、transient 或 temporary，并用一句话说明：它退出后为什么要重启或不重启，兄弟节点要不要一起恢复。",
      hints: [
        "先找出谁保管长期状态，再画它与其他进程的依赖。",
        "短暂执行的任务和长期基础设施，通常不该使用完全相同的 child spec。",
        "别忘了写下超过 restart intensity 后，问题会交给谁。",
      ],
      acceptance: [
        "每一条父子关系都能说出恢复理由",
        "重启类型与正常、异常退出时的期待相符",
        "图中明确指出至少一个不该靠崩溃或自动重试处理的业务错误",
      ],
    },
    takeaways: [
      "监督树首先在回答：谁依赖谁，出错时影响应该停在哪里。",
      "“Let it crash” 不是忽略可以预料的错误，而是把无法继续的局部问题交给监督者。",
      "进程重新启动只是恢复的一步；数据、外部操作和幂等仍要认真设计。",
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
    title: "别让任务把门口挤满",
    subtitle: "该用普通函数时就直接计算，需要并发时也要给任务数量画一条线。",
    summary:
      "比较纯函数、进程状态、ETS 和有界任务，学会让忙碌变得看得见、停得住。",
    duration: "约 5 小时 · 建议分 3 次",
    lessons: 3,
    level: "容量挑战",
    languages: ["Elixir", "Erlang", "BEAM"],
    why:
      "进程适合保管状态、陪伴一段生命周期或隔离错误，却不必用来包住每一次普通计算。把所有算术塞进一个 GenServer，大家只好排成一队；一次启动无限多 Task，又可能很快用光连接和内存。我们要学的是：根据状态和容量选择工具，而不是追求“越多并发越快”。",
    storyBridge: {
      label: "都江堰",
      title: "水再多，也不能一下全挤进宝瓶口",
      story:
        "岷江水有丰有枯。都江堰用鱼嘴分流，让飞沙堰帮助泄洪排沙，再由宝瓶口限制进入成都平原的水量。它不是把所有水都堵住，而是让水量超过承受能力时有别的去路。",
      connection:
        "有界并发像给入口规定宽度，等待、限速或拒绝像为过多任务安排不同去路；让上游知道下游已经忙不过来，就是背压。",
      boundary:
        "水会按地势自然流动，软件任务却要由程序明确等待、拒绝或降级。都江堰也不能直接解释 mailbox 顺序、CPU 调度和 ETS 的读写规则。",
    },
    outcomes: [
      "能根据有没有长期状态、谁需要读写，选择普通函数、进程状态或 ETS",
      "能给同时运行的任务设上限，并处理 timeout 和等待队列",
      "能从 mailbox 长度、等待时间和拒绝率看出系统是否忙不过来",
    ],
    prerequisites: [
      "知道 GenServer 怎样保管状态，也知道监督树怎样照看进程",
      "用 Task 跑过至少一个可以独立完成的小任务",
    ],
    concepts: [
      {
        term: "背压",
        definition:
          "下游忙不过来时，主动把这个信号传回上游。上游可以等待、减速、被拒绝或进入有上限的队列，而不是继续无止境地塞任务。",
      },
      {
        term: "ETS",
        definition:
          "BEAM 虚拟机里一张可以被许多进程快速读写的表，适合共享且读写频繁的数据。它仍有所有者，所有者退出时，这张表默认也会被删除。",
      },
      {
        term: "有界并发",
        definition:
          "同时运行的任务数有明确上限。这样 CPU、网络连接和内存不会因为任务突然变多而一起失去控制。",
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
      "Elixir 用标准工具直接设置最大并发数；Erlang 轮廓把里面的做法摊开：monitor 正在工作的进程，记录运行集合，再从等待队列补上新任务。",
    experiment: {
      title: "一加一，也需要排队找 GenServer 吗？",
      intro:
        "做同一批彼此独立的小计算：一版全部 call 同一个 Calculator GenServer，另一版直接调用普通函数。先猜哪一版会排队，再测量时间和 mailbox。",
      steps: [
        "实现一个只做 CPU 小计算、没有长期状态的 Calculator GenServer",
        "从多个 Task 同时 call 这一个 server，记录总时间和 mailbox",
        "把计算改成普通函数，用同一批输入再测一次",
      ],
      command: `:timer.tc(fn -> workload.() end)`,
      expected: [
        "单个 server 会让原本互不依赖的计算排队执行",
        "普通函数可以留在各个调用者中运行，更容易让多个调度器一起工作",
      ],
      breakIt:
        "把 `async_stream` 的 `max_concurrency` 调到和输入数量一样大，再让每个任务都占用一个连接。记录连接、内存和完成时间的峰值。",
      canProve:
        "没有共享状态的独立计算，通常不需要先挤进同一个进程排队。",
      cannotProve:
        "一次小实验不能说明所有 GenServer 都慢；它们真正擅长的是保管状态、表达生命周期和执行消息约定，而不是比赛算术速度。",
    },
    quiz: {
      question: "下面哪件事最没有必要交给 GenServer？",
      options: [
        "保管一个必须按顺序更新的连接状态",
        "维护一段有开始和结束的协议会话",
        "把两个数字相加，然后直接返回答案",
        "协调数量有限的数据库连接",
      ],
      answer: 2,
      explanation:
        "单纯计算没有要长期保管的状态，也没有自己的生命周期，用普通函数更清楚。进程应该表达协作、状态和故障范围，而不只是装一个函数。",
    },
    challenge: {
      title: "做一个不会一拥而上的网址检查器",
      brief:
        "检查一组 URL，同时工作的任务、每项任务的 timeout 和总等待数量都要有上限。最后显示成功率、P95 请求耗时（把耗时从短到长排列，95% 的请求不会超过这个数值）和被拒绝数量。",
      hints: [
        "先写下最多允许多少任务和等待项，再选择 API。",
        "把“等太久”和 HTTP 返回错误分开计数，它们不是同一件事。",
        "`ordered: false` 可以让先完成的任务先交出结果，不必等最慢的那个。",
      ],
      acceptance: [
        "最大并发数和最多等待数量都能调整",
        "输入突然变多时，内存不会因为无限排队持续增长",
        "结果能分清普通失败、timeout 和因为繁忙被拒绝",
      ],
    },
    takeaways: [
      "进程适合表达谁保管状态、要活多久，以及出错影响到哪里。",
      "异步只表示不用原地等待，不代表任务数量已经有上限。",
      "背压让“忙不过来”被看见，并通过等待、限速、拒绝或降级把它控制住。",
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
    stageLabel: "联网",
    title: "让两台 BEAM 互相传话，也学会应对失联",
    subtitle: "节点连上只是故事的开始；断线、迟到和旧数据也要有安排。",
    summary:
      "连接两个本地节点，亲手让其中一个离线，再用日志、Telemetry 和 Observer 找到发生了什么。",
    duration: "约 6 小时 · 建议分 4 次",
    lessons: 4,
    level: "联网挑战",
    languages: ["BEAM", "OTP"],
    why:
      "分布式 Erlang 让两台 BEAM 互发消息写起来很自然，但网络仍可能延迟、断开或把两边暂时分开。节点名和 cookie 能帮助它们找到并初步认出彼此，却不会自动解决数据是否一致、消息是否到达、流量是否过多和网络是否安全。",
    storyBridge: {
      label: "长城烽火台",
      title: "看不见下一座烽火台时，消息去了哪里？",
      story:
        "长城沿线的烽火台会把警报一站站传下去。相邻烽火能彼此看见时，消息传得很快；遇到浓雾、暴雨或中间一站失联，后面的守军就不能假装自己仍收到了最新消息。",
      connection:
        "一座烽火台像一个 node，连接与断开会带来 `nodeup`、`nodedown` 消息。日志和 Telemetry 像值守记录，帮助我们知道何时连通、何时失联，以及积压和延迟是否正在增长。",
      boundary:
        "BEAM 节点不是只能逐站传递，真实网络问题也比烽火复杂：可能丢包、延迟、半开或发生分区。收到 `nodedown` 只说明连接失去，不能直接告诉我们真正原因。",
    },
    outcomes: [
      "能启动两个有名字的 BEAM 节点，让它们互相找到并发送消息",
      "能说清 `nodedown` 表示什么，也能分清远程 PID 与只在某个节点有效的注册名",
      "能用带上下文的日志、Telemetry 指标和 Observer 追踪 mailbox 与延迟",
    ],
    prerequisites: [
      "知道进程怎样通信、监督树怎样恢复，以及背压怎样表示忙不过来",
      "能够启动一个基本 OTP Application；还没做过 release 也可以继续",
    ],
    concepts: [
      {
        term: "node",
        definition:
          "一台正在运行、愿意参加分布式通信的 BEAM 实例，名字通常像 `name@host`。远程进程的 PID 中也带着它属于哪个节点的信息。",
      },
      {
        term: "cookie",
        definition:
          "两个节点建立分布式连接时用来初步确认“我们知道同一个秘密”的值。它不是完整安全方案，不能代替加密、网络隔离和访问控制。",
      },
      {
        term: "Telemetry",
        definition:
          "Elixir 生态常用的事件测量工具。业务代码发出“发生了什么、花了多久”等事件，handler 再决定怎样统计、显示或导出。",
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
      "节点连上或断开也会变成普通消息。收到 `nodedown` 后，是暂时降级、稍后重试还是拒绝请求，需要应用提前约好。",
    experiment: {
      title: "让一座“烽火台”暂时熄灭",
      intro:
        "在同一台电脑上启动两个节点，让它们先连通，再停掉其中一个。观察节点监视消息、远程进程和还没完成的请求分别发生什么。",
      steps: [
        "使用相同 cookie 启动 `a@127.0.0.1` 和 `b@127.0.0.1`",
        "从 A `ping` B，并打开 `monitor_nodes`",
        "停止 B，记录 A 收到的事件，也看看未完成请求怎样结束",
      ],
      command: `Node.ping(:"b@127.0.0.1")`,
      expected: [
        "连接成功时，`Node.ping/1` 返回 `:pong`",
        "B 停止后，A 会收到 `nodedown`",
        "BEAM 会报告断连，但应用仍要自己决定请求是失败、稍后重试还是换一条路",
      ],
      breakIt:
        "给两个节点设置不同 cookie。确认失败发生在建立分布式连接时，而不是你的业务消息 handler 处理错了内容。",
      canProve:
        "节点的连通和断开可以被观察，并转成应用能够处理的事件。",
      cannotProve:
        "在本机停掉一个节点，还不能模拟真实网络中的丢包、长延迟、半开连接和脑裂等组合情况。",
    },
    quiz: {
      question: "分布式 Erlang 让远程 PID 收消息写起来像本地发送，它自动提供了什么？",
      options: [
        "跨节点数据永远强一致",
        "网络断开时消息仍保证恰好送达一次",
        "本地与远程看起来相近的消息发送写法",
        "可以直接暴露在公网的完整安全防护",
      ],
      answer: 2,
      explanation:
        "相近的写法让编程更顺手，但不会抹掉网络。一致性、消息是否重试、分区时怎么办和怎样保护网络，都要另外设计。",
    },
    challenge: {
      title: "做一张不会假装“一切正常”的节点地图",
      brief:
        "让每个节点定期上报 scheduler、内存和关键 mailbox。某个节点断开时，把最后数据标成 `stale`（已经过时），不要用 0 假装它仍然健康。",
      hints: [
        "每个指标都带上采样时间，数字离开时间就容易骗人。",
        "断开后保留最后一次真实数据，同时明确标出 `stale`。",
        "观察 mailbox 连续变长的趋势，不要只盯着某一个瞬间的数字。",
      ],
      acceptance: [
        "节点断开时不会显示成“所有指标都是健康的 0”",
        "日志能看出 node、process 和 request/reference 属于谁",
        "节点重连后能恢复上报，也不会把同一服务重复注册",
      ],
    },
    takeaways: [
      "远程发送写起来像本地发送，只是方便了表达，并没有让网络消失。",
      "断连、timeout 和 stale 数据都要写进双方约定，而不是等出事再猜。",
      "除了“进程还活着”，mailbox、延迟、重启次数和拒绝率更能说明系统是否真的健康。",
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
    title: "让 Erlang 和 Elixir 做搭档",
    subtitle: "住在同一台 BEAM 里，互相调用很方便；交换的数据仍要先约好。",
    summary:
      "让 Elixir API 与 Erlang worker 一起完成任务，并处理 binary、charlist、record、map 和错误返回的差别。",
    duration: "约 4 小时 · 建议分 3 次",
    lessons: 3,
    level: "双语挑战",
    languages: ["Elixir", "Erlang"],
    why:
      "Erlang 和 Elixir 在同一台 BEAM 里可以直接调用彼此，这给我们很多选择。不过，“都写着文字”不表示数据种类相同，record 和 struct 也有不同形状。把转换集中放在交界处，再把成功与失败写成双方都认识的 term，搭档才不会互相猜。",
    storyBridge: {
      label: "文言与白话合写一本书",
      title: "两位作者写法不同，目录和人名要不要统一？",
      story:
        "想象两位作者合写一本历史故事：一位擅长文言，一位使用白话。各自章节可以保留风格，但人物名、年代、章节编号和引用记号必须事先约好，否则读者会把同一个人当成两个人。",
      connection:
        "Erlang 与 Elixir 可以各自发挥长处，adapter 像两位作者之间的编辑，负责统一 binary/charlist、record/map 和错误返回的格式。",
      boundary:
        "文言与白话都属于自然语言，Erlang 与 Elixir 则有严格的数据类型和运行规则。这个故事不能说明异常传播、Unicode 编码或 record 的 tuple 位置。",
    },
    outcomes: [
      "能从 Elixir 调 Erlang，也能用正确的 module atom 从 Erlang 调 Elixir",
      "能在交界处明确转换 Elixir String、binary 和 charlist",
      "能把异常和不同返回值整理成双方都能模式匹配的稳定结果",
    ],
    prerequisites: [
      "完成两种语法共享 term 的章节，知道 `:ok` 与 `ok` 指向同一个 atom",
      "会用 Mix 和 Rebar3 分别运行一个小项目及其测试",
    ],
    concepts: [
      {
        term: "charlist",
        definition:
          "一串代表字符 code point 的整数 list，在一些 Erlang API 中很常见。Elixir String 通常是 UTF-8 binary，而 charlist 可以写成 `~c\"text\"`。",
      },
      {
        term: "record",
        definition:
          "Erlang 在编译时把 record 展开成固定位置的 tuple。另一门语言如果直接猜第几个位置是什么，record 一改就容易出错；更稳妥的是使用公开函数或约好的 map。",
      },
      {
        term: "exception boundary",
        definition:
          "两门语言交界处的错误约定：一边出现 exception、exit 或 throw 时，另一边在哪里接住，并把它整理成稳定的错误 tuple。",
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
      "文字转换集中发生在交界处，核心结果使用带标签的 tuple。这样，Erlang API 需要 charlist 的习惯就不会跑遍整个 Elixir 项目。",
    experiment: {
      title: "看起来都是“jobs”，为什么对不上？",
      intro:
        "让 Erlang worker 只接收 charlist。先直接传入 Elixir String，观察它们在哪里没有匹配；再把转换放到交界处，并用测试记住这条约定。",
      steps: [
        "从 Elixir 传入 `\"jobs\"`，记录 guard 或 function clause 告诉了你什么",
        "在 adapter 中使用 `String.to_charlist/1` 后再调用 Erlang worker",
        "加入中文队列名的 round-trip 测试，确认来回转换后文字没有改变",
      ],
      command: `mix test test/interoperability_test.exs`,
      expected: [
        "binary 和 charlist 会匹配不同的 guard",
        "在交界处明确转换后，两边约定能够对上",
        "中文测试能发现把 Unicode 文字误当成单个字节处理的问题",
      ],
      breakIt:
        "让 Erlang 直接返回内部 record tuple，Elixir 按位置取值；随后给 record 增加一个字段，看看另一边为什么会跟着出错。",
      canProve:
        "把文字转换明确放在交界处，可以让两边对 String、binary 和 charlist 的约定保持一致。",
      cannotProve:
        "一条成功路线还不能说明第三方库的所有成功、失败和边角返回都使用同一种文字格式。",
    },
    quiz: {
      question: "两门语言要长期合作，下面哪种返回约定通常最稳妥？",
      options: [
        "直接猜私有 record 的每个 tuple 位置",
        "使用带标签的简单 term，例如 `{ok, Value}` 或 `{error, Reason}`",
        "让所有异常不经整理地一路传播",
        "把任何数据都变成一段可打印文字",
      ],
      answer: 1,
      explanation:
        "简单、明确、能模式匹配的 term 容易让两边共同测试。私有 record 可能改变，任意异常难以约定，而全部转成文字又会丢掉数据原本的形状。",
    },
    challenge: {
      title: "让两位搭档共同照看一个任务队列",
      brief:
        "由 Elixir 提供好用的公共 API 和输入检查，让 Erlang gen_server 保管队列状态。两边都写自己的测试，也要写真正穿过语言交界处的测试。",
      hints: [
        "先用几个具体例子写下成功和失败时交换的 term。",
        "把所有文字与错误转换集中到薄薄的 adapter 模块。",
        "让 ExUnit 真的调用 Erlang worker，也让 EUnit 真的调用 Elixir 的 normalize 函数。",
      ],
      acceptance: [
        "两种语言各自承担了一项清楚而真实的职责",
        "binary、charlist 和异常转换都集中在交界处",
        "任意一边改坏返回形状时，双向测试能够马上发现",
      ],
    },
    takeaways: [
      "共享 BEAM 让互相调用很简单，清楚的数据约定让长期合作也简单。",
      "文字表示、record 和异常是最容易产生误会的地方，要在交界处认真处理。",
      "adapter 应该薄而集中，并且能从两个方向真正测试。",
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
    stageLabel: "作品",
    title: "终点作品：一支可靠的任务小队",
    subtitle: "让函数、进程、监督树、两门语言和容量规则一起完成一件自己的作品。",
    summary:
      "用 Elixir 做入口、Erlang gen_server 做调度，让 worker 在有界队列中工作，并能面对 timeout、重试和意外退出。",
    duration: "约 10 小时 · 建议分 6 次",
    lessons: 4,
    level: "综合创作",
    languages: ["Elixir", "Erlang", "OTP"],
    why:
      "前面的每一关像练习一种招式，终点作品要把它们连成一支会合作的小队。我们会故意加入队列满、任务失败、消息迟到和节点断开，再一步步回答：谁保管状态，哪些任务可以重试，错误影响到哪里，忙不过来时怎样诚实地告诉调用者。",
    storyBridge: {
      label: "《三国演义》粮草调度",
      title: "粮车有限，催运令却不能无限收",
      story:
        "假设我们是《三国演义》故事中的粮草官，要给粮草登记批次，再安排有限的车辆和路线。催运令太多时必须排队；一份回报迟迟未到，重新发令又可能让同一批粮草送上两次，所以仓库要核对批次记号。",
      connection:
        "有限粮车像 worker 容量，等待出发的粮草像 bounded queue，重新发令像 retry，批次记号像幂等键。runbook 则像值守簿，告诉接班人看什么信号、遇到问题先做什么。",
      boundary:
        "任务调度器处理的是消息、进程和外部服务，不是真实行军。一个幂等键也不会自动消除所有重复副作用，更不能保证跨节点恰好执行一次。",
    },
    outcomes: [
      "能先写下必须始终成立的规则，再据此安排进程、队列和监督树",
      "能让 Erlang 与 Elixir 在同一个 release 中各自承担清楚的真实职责",
      "能主动制造小故障（故障注入），检查系统怎样恢复、拒绝或留下线索",
    ],
    prerequisites: [
      "完成 00–10 模块，并保留前面做过的队列和监督树练习",
      "能在参考资料帮助下编写 GenServer、gen_server 和 Supervisor",
    ],
    concepts: [
      {
        term: "at-least-once",
        definition:
          "系统保证任务至少会尝试，但同一个任务可能执行不止一次。因此要用幂等键或去重记录控制重复影响，不能把“会重试”说成“恰好一次”。",
      },
      {
        term: "bounded queue",
        definition:
          "一条有固定座位数的等待队列。队列满时，系统要明确选择等待、拒绝或降级，不能继续答应自己做不到的任务。",
      },
      {
        term: "runbook",
        definition:
          "留给值守者和未来自己的行动说明：先看哪些日志与指标，怎样判断问题，可以安全执行什么动作，以及什么时候应该停止并求助。",
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
      "Elixir 负责好用的 API 和输入检查；Erlang 核心明确保管队列容量与调度状态。队列满时，它们诚实返回拒绝，而不是悄悄继续堆积。",
    experiment: {
      title: "给任务小队安排四场意外演练",
      intro:
        "这种主动制造问题的练习叫故障注入。不要只看“进程重新启动了”，先为 worker 异常退出、陌生消息、任务 timeout 和节点断开分别写下希望系统最后变成什么样。",
      steps: [
        "让正在工作的 worker 主动 exit，检查 retry 次数和容量计数",
        "发送一条不符合约定的消息，确认服务仍能继续，也留下日志或 Telemetry 事件",
        "让任务超过 timeout，检查隔离、取消约定和迟到结果",
        "断开远程节点，检查 stale 标记以及重新连接后的状态",
      ],
      command: `mix test --only fault_injection --trace`,
      expected: [
        "需要长期工作的进程最后仍由监督树照看",
        "失败任务只在上限内重试，不会永远循环",
        "队列长度和正在工作的数量最终回到一致状态",
        "每次拒绝、恢复或放弃都能在结构化日志或指标中找到证据",
      ],
      breakIt:
        "暂时删除 retry 上限，再让一个任务每次都失败。观察重启和重试风暴怎样让原本一个小问题变成更多消息和工作。",
      canProve:
        "在这四种指定意外下，系统能按照已经写下的规则恢复、拒绝或停止重试。",
      cannotProve:
        "四场演练不能包含真实世界的所有意外，也不能证明任务恰好执行一次、跨节点永远一致，或所有外部操作都不会重复。",
    },
    quiz: {
      question: "准备让失败任务自动 retry 前，最先要想清楚什么？",
      options: [
        "提交按钮应该使用什么颜色",
        "任务是否幂等，以及最多允许尝试几次",
        "worker 一定要使用 Elixir 还是 Erlang",
        "是否把完整 payload 全部写进日志",
      ],
      answer: 1,
      explanation:
        "retry 可能把付款、发消息等外部操作重复做一遍。开始编码前，要先决定幂等键、两次尝试间怎样退避、最多几次，以及最后失败的任务放到哪里。",
    },
    challenge: {
      title: "作品展：讲清任务小队怎样守住规则",
      brief:
        "整理源码、监督树图、消息约定、容量计划、意外演练记录、可启动的 release 和一页 runbook。再用 10 分钟带别人参观你的作品，讲清三个最重要的选择。",
      hints: [
        "主动说出至少一个这版作品还没有保证的事情，这不是扣分，而是诚实的工程判断。",
        "除了成功提交，也演示 `queue_full`，让观众看到系统怎样承认自己忙不过来。",
        "写 runbook 时先想用户会看到什么，再反推值守者需要哪些信号。",
      ],
      acceptance: [
        "Elixir 与 Erlang 各自承担一项真实且说得清理由的职责",
        "并发、队列、timeout 和 retry 都有明确上限",
        "ExUnit 与 EUnit 都真正穿过两门语言的交界处",
        "另一位同学能启动 release，并按 runbook 完成一次安全检查",
      ],
    },
    takeaways: [
      "可靠作品先写清必须守住的规则、容量和失败后的选择，再安排进程结构。",
      "retry 可能放大外部影响，因此幂等、退避和次数上限要一起出现。",
      "好维护不是最后多打印几行日志，而是从消息约定开始留下足够证据，并写进 runbook。",
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
