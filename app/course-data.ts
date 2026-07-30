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
  installation?: {
    intro: string;
    mixNote: string;
    guides: Array<{
      id: "macos" | "linux" | "windows";
      label: string;
      title: string;
      description: string;
      steps: string[];
      command: string;
      commandLabel: string;
      note: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    }>;
  };
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
    description: "先装好工具，再认识 Erlang、Elixir、BEAM、OTP 和 Mix。",
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
    slug: "install-toolchain",
    stage: "foundation",
    stageLabel: "准备",
    title: "装好工具",
    subtitle: "选你的电脑。装好 Erlang 和 Elixir。Mix 会跟着 Elixir 一起来。",
    summary:
      "按 macOS、Linux 或 Windows 的步骤装好 Erlang、Elixir 和 Mix，再检查三个命令。",
    duration: "约 20–40 分钟",
    lessons: 3,
    level: "零基础",
    languages: ["Erlang", "Elixir", "Mix"],
    why:
      "后面的代码要靠这些工具运行。若终端找不到命令，问题还没走到代码那里。先把工具放稳，再去起跑线。",
    storyBridge: {
      label: "木匠开工",
      title: "工具先摆上案",
      story:
        "木匠动手前，先摆好锯、尺和刨。工具不是木柜，却决定第一刀能不能落下。",
      connection:
        "Erlang 提供运行环境，Elixir 提供另一种写法，Mix 帮你创建、编译和测试项目。",
      boundary:
        "命令能运行，只说明工具已经到位。代码为什么这样写，要到后面的实验里慢慢看。",
    },
    outcomes: [
      "能找到自己电脑对应的安装步骤",
      "能分别检查 Erlang、Elixir 和 Mix",
      "知道 Mix 随 Elixir 安装，不去另找下载包",
      "遇到命令不存在时，先重开终端并检查 PATH",
    ],
    prerequisites: [
      "知道自己的电脑使用 macOS、Linux 还是 Windows",
      "保持网络连接，并留出下载安装的时间",
      "若系统要求管理员密码，先请家长、老师或电脑管理员确认",
    ],
    concepts: [
      {
        term: "PATH",
        definition:
          "终端寻找命令时会查看的一串目录。工具已经安装却提示找不到，常常要检查这里。",
      },
      {
        term: "版本配对",
        definition:
          "Elixir 需要能够配合的 Erlang/OTP 版本。不要只挑最大的数字，要看官方安装页的兼容说明。",
      },
      {
        term: "Mix",
        definition:
          "Elixir 自带的项目工具。安装 Elixir 后就会得到 mix，不需要第三份安装包。",
      },
    ],
    installation: {
      intro:
        "只选与你电脑相同的一栏。不要把三套命令全跑一遍。安装器或包管理器装完后，可以重开终端检查；Ubuntu 官方脚本要先在当前终端检查，再保存两条 PATH。",
      mixNote:
        "Mix 不用另装。Elixir 官方说明：安装 Elixir 时，会一起得到 mix 命令。",
      guides: [
        {
          id: "macos",
          label: "macOS",
          title: "用 Homebrew 安装",
          description:
            "先在终端运行 brew --version。若找不到 brew，先去 Homebrew 官网按说明安装，再回来继续。",
          steps: [
            "打开“终端”应用。",
            "安装 Elixir；Homebrew 会把 Erlang 作为依赖一起安装。",
            "关闭终端，重新打开一个窗口。",
            "运行三个版本命令，确认 Mix 也已到位。",
          ],
          command: `# 只在 macOS 终端运行
brew install elixir

# Erlang 会作为依赖安装，Mix 随 Elixir 安装
erl -s erlang halt
elixir --version
mix --version`,
          commandLabel: "macOS 安装与检查",
          note:
            "Homebrew 会处理依赖。若它提示已有版本，先读完提示，不要急着删除旧目录。",
          links: [
            {
              label: "Homebrew 官网",
              href: "https://brew.sh/",
            },
            {
              label: "Elixir 官方安装页",
              href: "https://elixir-lang.org/install/",
            },
            {
              label: "Erlang 官方下载页",
              href: "https://www.erlang.org/downloads",
            },
          ],
        },
        {
          id: "linux",
          label: "Linux",
          title: "Ubuntu 用官方脚本",
          description:
            "Linux 有许多发行版。下面是 Elixir 官网当前给 Ubuntu 的配对示例。版本号若与官网不同，以官网新组合为准。",
          steps: [
            "打开终端，先确认自己使用 Ubuntu。",
            "下载官方脚本，并安装一组彼此兼容的 Erlang 与 Elixir。",
            "在当前终端加入两个命令目录，再检查版本。",
            "Debian 先核对官方仓库版本；Fedora、Arch 等系统按 Elixir 官方页选择对应命令。",
          ],
          command: `# 只在 Ubuntu 终端运行；先和官网核对版本组合
curl -fsSO https://elixir-lang.org/install.sh
sh install.sh elixir@1.20.2 otp@28.4

# 这两行 PATH 先让当前终端找到新工具
installs_dir=$HOME/.elixir-install/installs
export PATH=$installs_dir/otp/28.4/bin:$PATH
export PATH=$installs_dir/elixir/1.20.2-otp-28/bin:$PATH

# Erlang、Elixir 和 Mix 都应能回答
erl -s erlang halt
elixir --version
mix --version`,
          commandLabel: "Ubuntu 安装与检查",
          note:
            "两条 `export` 都只对当前终端生效，确认成功后要把两条都写进自己的 shell 配置。按当前官方入门指南，至少核对到 Elixir 1.18 与 OTP 27；Debian 12 默认包通常不足。Debian 13 可用 `sudo apt install erlang elixir`；Fedora 用 `sudo dnf install elixir erlang`；Arch 用 `sudo pacman -S erlang elixir`。不要混用几套路线。",
          links: [
            {
              label: "Elixir 官方 Linux 说明",
              href: "https://elixir-lang.org/install/",
            },
            {
              label: "Erlang 官方下载页",
              href: "https://www.erlang.org/downloads",
            },
          ],
        },
        {
          id: "windows",
          label: "Windows",
          title: "用两个官方安装程序",
          description:
            "先装 Erlang/OTP，再从 Elixir 官方页面选择与这个 OTP 大版本相配的 Elixir 安装程序。",
          steps: [
            "在 Erlang 下载页选择 64-bit Windows Installer，下载后运行。",
            "打开新 PowerShell，运行 `erl -s erlang halt`，记下 OTP 大版本。",
            "在 Elixir 安装页选择与该 OTP 大版本相配的 Windows Installer。",
            "装完后关闭 PowerShell，再打开一个新窗口检查。",
          ],
          command: `# 安装完成后，在新打开的 PowerShell 中运行
erl -s erlang halt
elixir --version
mix --version

# PowerShell 里的 iex 是另一个命令；这样打开 Elixir 的 IEx
iex.bat`,
          commandLabel: "Windows 安装后检查",
          note:
            "不要只看版本数字最大。Windows 安装页会列出当前兼容组合。若已使用 Scoop，也可按官方页面分别安装 erlang 和 elixir。",
          links: [
            {
              label: "下载 Erlang Windows Installer",
              href: "https://www.erlang.org/downloads",
            },
            {
              label: "选择匹配的 Elixir Installer",
              href: "https://elixir-lang.org/install/",
            },
          ],
        },
      ],
    },
    elixirCode: `# 安装完成后，在 IEx 中运行
# 请 Elixir 打印一句话
IO.puts("Elixir 可以运行")

# 查看 Elixir 自己的版本
System.version()

# Elixir 也能直接询问底下的 Erlang/OTP
:erlang.system_info(:otp_release)`,
    erlangCode: `%% 安装完成后，在 erl 中运行
%% 请 Erlang 打印一句话
io:format("Erlang 可以运行~n").

%% 查看当前 Erlang/OTP 的大版本
erlang:system_info(otp_release).

%% 用 q/0 退出 shell
q().`,
    codeCaption:
      "两个 shell 都能回应，说明运行环境已经醒了。Windows PowerShell 请用 iex.bat 打开 Elixir 的 IEx。",
    experiment: {
      title: "给工具做一次体检",
      intro:
        "三个系统都做同一件事：查看 Erlang、Elixir 和 Mix，再让 Mix 列出它能做的任务。",
      steps: [
        "新开一个终端或 PowerShell，避免继续使用安装前的旧 PATH",
        "运行 Erlang 检查命令，记下 OTP 大版本",
        "运行 `elixir --version` 和 `mix --version`",
        "运行 `mix help`，确认能看到一串 Mix 任务",
      ],
      command: `# macOS、Linux 和 Windows PowerShell 都可运行
erl -s erlang halt
elixir --version
mix --version
mix help`,
      expected: [
        "Erlang 命令会打印 OTP 大版本",
        "Elixir 版本信息中也会出现它正在使用的 Erlang/OTP",
        "Mix 会显示自己的版本，并列出可以运行的任务",
      ],
      breakIt:
        "先在安装前一直没有关闭的旧终端里检查，再换到新开的终端。若结果不同，问题多半在 PATH 没有重新载入。",
      canProve:
        "这台电脑能找到 Erlang、Elixir 和 Mix，三个工具已经可以开始本地练习。",
      cannotProve:
        "版本命令不能证明所有第三方依赖都兼容，也不能证明以后每个项目都能直接编译。",
    },
    quiz: {
      question: "安装 Elixir 后，怎样安装 Mix？",
      options: [
        "从搜索结果里另找一个 Mix 安装包",
        "不用另装；Mix 随 Elixir 一起提供",
        "进入 erl 后输入 install_mix",
        "只有部署服务器才需要 Mix",
      ],
      answer: 1,
      explanation:
        "Mix 是随 Elixir 提供的项目工具。安装完成后，用 `mix --version` 检查即可。",
    },
    challenge: {
      title: "留一张安装体检单",
      brief:
        "记下操作系统、OTP、Elixir 和 Mix 版本，再写下命令找不到时先做哪两步。",
      hints: [
        "先把三个版本命令的输出放在一起，不用抄下每一个括号。",
        "第一步可以是关闭终端，再打开一个新窗口。",
        "第二步检查 PATH 或回到官方安装页，不要随便下载同名工具。",
      ],
      acceptance: [
        "写明电脑使用 macOS、Linux 还是 Windows",
        "记录 OTP、Elixir 和 Mix 三类版本",
        "能说明 Mix 为什么不用单独安装",
        "遇到权限问题时知道找家长、老师或电脑管理员",
      ],
    },
    takeaways: [
      "只执行自己操作系统对应的一套步骤。",
      "先确保有兼容的 Erlang/OTP；安装器、脚本或包管理器可以代办。Mix 会随 Elixir 到来。",
      "命令找不到时，先重开终端，再检查 PATH 和官方说明。",
    ],
    references: [
      {
        label: "Elixir 官方安装页",
        href: "https://elixir-lang.org/install/",
      },
      {
        label: "Erlang/OTP 官方下载页",
        href: "https://www.erlang.org/downloads",
      },
      {
        label: "Mix 官方介绍",
        href: "https://hexdocs.pm/elixir/introduction-to-mix.html",
      },
    ],
  },
  {
    number: "01",
    slug: "start-line",
    stage: "foundation",
    stageLabel: "地基",
    title: "起跑线",
    subtitle:
      "先认识五位伙伴：谁写代码，谁让代码跑，谁提供可靠做法，谁帮你建项目。",
    summary: "在 erl 和 iex 运行代码，再用 Mix 创建并测试第一个项目。",
    duration: "约 2 小时 · 建议分 2 次",
    lessons: 2,
    level: "零基础",
    languages: ["BEAM", "Elixir", "Erlang"],
    why:
      "这五个名字不用硬背。Erlang 和 Elixir 写代码，BEAM 运行代码，OTP 提供可靠做法，Mix 管理项目。亲手跑一遍，关系就清楚了。",
    storyBridge: {
      label: "中国戏台",
      title: "同一出戏，两套剧本",
      story:
        "排演《大闹天宫》时，剧本可以有不同写法，演员仍在同一座舞台。后台还要有规矩、道具和工具。",
      connection:
        "Erlang 和 Elixir 对应两套写法，BEAM 是舞台，OTP 是后台章法，Mix 是排练与检查工具。",
      boundary:
        "这只能帮助分清角色。编译过程、运行速度和版本问题，仍要实际检查。",
    },
    outcomes: [
      "能用自己的话说清 Erlang、Elixir、BEAM、OTP 和 Mix 各做什么",
      "能分别打开 erl 和 iex，并让它们运行一小段代码",
      "能从版本信息中找到 Erlang/OTP、Elixir 和 Mix",
      "能用 Mix 创建项目、运行代码并跑通第一项测试",
    ],
    prerequisites: [
      "已走完安装准备，终端能找到 `erl`、`elixir` 和 `mix`",
      "知道变量和函数大致是什么；说不清楚也可以边做边认识",
    ],
    concepts: [
      {
        term: "BEAM",
        definition:
          "运行 Erlang 和 Elixir 的虚拟机。它安排小进程轮流工作，也负责投递消息。",
      },
      {
        term: "OTP",
        definition:
          "一套经过长期使用的工具和做法，用来发现、隔离和恢复错误。Supervisor 与 GenServer 都属于 OTP。",
      },
      {
        term: "Mix",
        definition:
          "Elixir 的项目工具。它负责创建、编译、格式化、测试和依赖管理；`mix.exs` 是项目说明书。Mix 不等于 BEAM、OTP 或 Hex。",
      },
    ],
    elixirCode: `# 在 IEx 中
# 记住当前进程，子进程稍后要把消息发回来
parent = self()

# 新建一个轻量进程，并向 parent 发送 tuple
spawn(fn ->
  send(parent, {:hello, :from_elixir})
end)

# 等待并拆开符合形状的消息
receive do
  {:hello, source} -> {:received, source}
end`,
    erlangCode: `%% 在 erl 中
%% 记住当前进程，子进程稍后要把消息发回来
Parent = self(),

%% 新建轻量进程，并用 ! 发送 tuple
spawn(fun() ->
  Parent ! {hello, from_erlang}
end),

%% 等待并拆开符合形状的消息
receive
  {hello, Source} -> {received, Source}
end.`,
    codeCaption: "写法不同，动作相同：创建进程、发送 tuple，再按模式接收。",
    experiment: {
      title: "检查工具，再建项目",
      intro:
        "先查看 Erlang、Elixir 和 Mix 的版本，再让 Mix 创建项目并运行测试。",
      steps: [
        "先运行 `erl`，输入 `erlang:system_info(otp_release).`，请 Erlang 报出 OTP 版本",
        "运行 `elixir --version` 和 `mix --version`，找出 Erlang/OTP、Elixir、Mix 三类版本",
        "执行 `mix new beam_probe`，看看 `mix.exs`、`lib/` 和 `test/` 分别装着什么",
        "进入项目运行 `mix test`，再用 `mix run -e` 从同一项目读取 OTP release",
      ],
      command: `# 直接打印 Erlang/OTP 版本，然后退出
erl -noshell -eval 'io:format("OTP ~s~n", [erlang:system_info(otp_release)]), halt().'

# 查看 Elixir 与 Mix 版本
elixir --version
mix --version

# 创建项目，进入目录并运行测试
mix new beam_probe
cd beam_probe
mix test

# 在项目环境中再次读取 OTP 版本
mix run -e 'IO.puts("OTP #{:erlang.system_info(:otp_release)}")'`,
      expected: [
        "三个命令会报出彼此能够配合工作的 Erlang/OTP、Elixir 和 Mix 版本",
        "Mix 会准备 `mix.exs`、源码目录和测试目录，但不会另外创造一台虚拟机",
        "示例测试能够通过，`mix run` 也能直接调用 Erlang 的 `erlang` 模块",
      ],
      breakIt:
        "走出 `beam_probe` 再运行 `mix test`。先判断它在说“这里没有项目”，还是“代码写错了”。",
      canProve:
        "这台电脑已经能使用 Erlang、Elixir 和 Mix，也能创建、编译和测试一个小项目。",
      cannotProve:
        "这不能保证所有外部包都兼容，也不能说明项目已适合部署。",
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
        "OTP 同时服务 Erlang 和 Elixir。Mix 管项目，Hex 提供软件包；编译器和数据库只是相关工具的一部分。",
    },
    challenge: {
      title: "写一张编程体检卡",
      brief:
        "用 12 行以内记录三个版本，再写下三种问题的第一步：命令不存在、缺少 `mix.exs`、版本不兼容。",
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
        href: "https://hexdocs.pm/elixir/introduction.html",
      },
      {
        label: "Erlang Getting Started",
        href: "https://www.erlang.org/doc/system/getting_started.html",
      },
      {
        label: "Introduction to Mix",
        href: "https://hexdocs.pm/elixir/introduction-to-mix.html",
      },
    ],
  },
  {
    number: "02",
    slug: "beam-mental-model",
    stage: "foundation",
    stageLabel: "地基",
    title: "进程与信箱",
    subtitle: "各自保管数据，需要合作时互相发消息。",
    summary: "做一个消息计数器，看看状态由谁保管，消息在哪里等待。",
    duration: "约 3 小时 · 建议分 3 次",
    lessons: 3,
    level: "零基础",
    languages: ["BEAM", "OTP"],
    why:
      "BEAM 用许多小进程同时工作。每个进程保管自己的数据，通过消息合作。一个进程出错时，影响通常可以留在局部。",
    storyBridge: {
      label: "古代驿站",
      title: "每座驿站都有公文匣",
      story:
        "唐代驿路上，各站保管自己的记录和公文匣。信使能送来公文，却不能改掉别站的账本。",
      connection:
        "驿站对应 BEAM 进程，公文匣对应 mailbox，账本对应进程状态。",
      boundary:
        "mailbox 可跳过暂时不匹配的消息，并非只取最早一封。BEAM 调度也不等于驿站轮班。",
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
          "由 BEAM 安排的独立工作单元。它不是完整的操作系统进程，因此能创建很多个。",
      },
      {
        term: "mailbox",
        definition:
          "进程自己的收件箱。消息在这里等待，进程再按模式寻找当前能处理的内容。",
      },
      {
        term: "reduction",
        definition:
          "BEAM 估算工作量的单位。一个进程做了一段工作后，调度器会让其他进程获得机会。",
      },
    ],
    elixirCode: `# total 是这个进程当前保管的状态
counter = fn loop, total ->
  receive do
    # 用新总数进入下一轮，旧值不会被原地修改
    {:add, n} -> loop.(loop, total + n)
    {:read, caller} ->
      send(caller, {:total, total})
      loop.(loop, total)
  end
end

# 启动计数器进程，初始值为 0
pid = spawn(fn -> counter.(counter, 0) end)`,
    erlangCode: `%% Total 是这个进程当前保管的状态
Counter = fun Loop(Total) ->
  receive
    %% 用新总数进入下一轮，旧值不会被原地修改
    {add, N} -> Loop(Total + N);
    {read, Caller} ->
      Caller ! {total, Total},
      Loop(Total)
  end
end,

%% 启动计数器进程，初始值为 0
Pid = spawn(fun() -> Counter(0) end).`,
    codeCaption:
      "计数器没有擦掉旧数字再写新数字。它每收到一条消息，就带着新的总数进入下一轮等待。",
    experiment: {
      title: "给计数器寄三封信",
      intro:
        "依次发送“加 1”“加 2”“加 3”，再读取总数。除了答案 6，还要找出状态由谁保管。",
      steps: [
        "向计数器连续发送 `{:add, 1}`、`{:add, 2}` 和 `{:add, 3}`",
        "发送带着自己 PID 的 `{:read, self()}`，让计数器知道回信地址",
        "用 `Process.info(pid, :message_queue_len)` 看看它的收件箱里还有几封信",
      ],
      command: `# 连续发送三条加法消息；每次 send 都立即返回
send(pid, {:add, 1}); send(pid, {:add, 2}); send(pid, {:add, 3})`,
      expected: [
        "最后会收到 `{:total, 6}`",
        "其他进程只能发消息，不能伸手直接改掉计数器保管的数字",
      ],
      breakIt:
        "删掉 `{:read, caller}` 再发送读取消息。进程不会报错，这条消息会留在 mailbox。",
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
        "这叫选择性接收。长期没有匹配方法的消息会积压，因此消息名称和处理规则要清楚。",
    },
    challenge: {
      title: "画三座驿站的传信图",
      brief:
        "画出 `sensor`、`collector` 和 `dashboard`，给消息命名，再标出发送者与接收者。",
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
    number: "03",
    slug: "elixir-foundations",
    stage: "languages",
    stageLabel: "语言",
    title: "Elixir 数据流水线",
    subtitle: "先修剪，再筛选，再分类；每个小函数只做好一件事。",
    summary: "整理一份带空行和多余空格的日志，并为每一步写测试。",
    duration: "约 6 小时 · 建议分 5 次",
    lessons: 5,
    level: "入门探索",
    languages: ["Elixir"],
    why:
      "长函数容易混入太多工作。先用模式认出数据，再把转换拆成小函数。管道负责把上一步结果交给下一步。",
    storyBridge: {
      label: "古代书坊",
      title: "一册《唐诗》的四道工序",
      story:
        "古代书坊整理诗稿：先去掉空白，再挑出空页，然后分类和计数。每道工序只做一件事。",
      connection:
        "稿页对应数据，工序对应小函数，`|>` 负责交给下一步。顺序改变，结果也可能改变。",
      boundary:
        "这能解释管道和步骤顺序，不能说明 Stream 的惰性计算，也不能比较速度。",
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
          "左边是形状模板，右边是待检查的数据。对得上就取出内容，对不上就换另一条处理路径。这里的 `=` 不只是赋值。",
      },
      {
        term: "多子句函数",
        definition:
          "同一函数可准备多个入口。程序从上往下寻找第一个模式与 guard 都符合的子句。元数是参数个数。",
      },
      {
        term: "管道",
        definition:
          "`|>` 把左边结果交给右边函数，作为第一个参数。它让步骤更清楚，但不会替你拆好函数。",
      },
    ],
    elixirCode: `# 把多行日志整理成各级别出现次数
defmodule LogSummary do
  def summarize(lines) do
    # 先清理空白，再解析每一行
    lines
    |> Stream.map(&String.trim/1)
    |> Stream.reject(&(&1 == ""))
    |> Enum.map(&parse_line/1)
    |> Enum.frequencies_by(& &1.level)
  end

  # 用字符串前缀直接取出级别和正文
  defp parse_line("ERROR " <> message),
    do: %{level: :error, message: message}

  defp parse_line("INFO " <> message),
    do: %{level: :info, message: message}
end`,
    erlangCode: `%% 同一数据流的 Erlang 轮廓
%% 先清理空白，再解析每一行
summarize(Lines) ->
  Clean = [string:trim(L) || L <- Lines, L =/= <<>>],
  Parsed = [parse_line(L) || L <- Clean],
  frequencies(Parsed).

%% binary 模式会取出前缀后的正文
parse_line(<<"ERROR ", Message/binary>>) ->
  #{level => error, message => Message};
parse_line(<<"INFO ", Message/binary>>) ->
  #{level => info, message => Message}.`,
    codeCaption: "两种写法都在清理、解析并统计同一份数据。",
    experiment: {
      title: "交换两道工序",
      intro:
        "交换 `trim` 和 `reject`。先猜纯空格行会去哪，再运行同一组数据。",
      steps: [
        "准备 Elixir 字符串列表 `[\" INFO boot \", \" \", \"ERROR timeout\"]`",
        "先运行“去掉两端空格，再删除空字符串”的顺序，记下结果",
        "把 `reject` 移到 `trim` 前面，再用完全相同的输入运行一次",
      ],
      command: `# 运行全部测试，并显示每项测试名称与耗时
mix test --trace`,
      expected: [
        "先 `trim` 再 `reject` 时，只有空格的那一行会被删掉",
        "先 `reject` 再 `trim` 时，那一行一开始还不是空字符串，随后可能闯进解析器",
      ],
      breakIt:
        "传入 `WARN slow`，再删掉兜底子句。查看 `FunctionClauseError` 保留了哪些线索。",
      canProve:
        "数据经过步骤的先后顺序，会改变最后能被模式匹配识别的内容。",
      cannotProve:
        "这不能说明 Stream 比 Enum 快。数据量和消费方式都会影响选择。",
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
        "Stream 等结果被需要时才计算，这叫惰性执行。它不保证更快，小集合用 Enum 往往更直接。",
    },
    challenge: {
      title: "整理一份日志",
      brief:
        "做一个 Mix 工具：读取日志，跳过空行，统计三个级别，再找出最常见的三条消息。",
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
    number: "04",
    slug: "erlang-foundations",
    stage: "languages",
    stageLabel: "语言",
    title: "读懂 Erlang",
    subtitle: "从大小写开始，再读懂逗号、分号和句点给出的路标。",
    summary: "用 Erlang 重做日志工具，并让两种实现通过同一组样例。",
    duration: "约 6 小时 · 建议分 5 次",
    lessons: 5,
    level: "入门探索",
    languages: ["Erlang"],
    why:
      "不少 BEAM 文档和工具使用 Erlang。看懂基础写法，就能读懂错误信息、`:gen_tcp` 和 observer。先从数据、函数与标点开始。",
    storyBridge: {
      label: "古文句读",
      title: "先给古文断句",
      story:
        "古人读文章，要分清哪里暂停、哪里结束，这叫“句读（jù dòu）”。位置不同，意思也可能不同。",
      connection:
        "Erlang 用逗号表示继续，分号隔开子句或分支，句点结束完整定义。",
      boundary:
        "句读与 Erlang 语法并非一一对应。代码仍要遵守编译器规则。",
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
          "逗号连接顺序表达式，分号隔开函数子句或分支，句点结束完整定义或 shell 表达式。",
      },
      {
        term: "binary",
        definition:
          "装着一串字节的数据盒子，写作 `<<...>>`。UTF-8 文本通常放在 binary 中；传统 charlist 则是一串代表字符的整数。",
      },
    ],
    elixirCode: `# 计算所有已付款订单的总金额
defmodule Orders do
  def total(items) do
    # 先筛选状态，再取出金额并相加
    items
    |> Enum.filter(&(&1.status == :paid))
    |> Enum.map(& &1.amount)
    |> Enum.sum()
  end
end`,
    erlangCode: `%% 这个模块公开一个接收单个参数的 total/1
-module(orders).
-export([total/1]).

total(Items) ->
  %% 列表推导先筛出已付款订单
  Paid = [Item || Item = #{status := paid} <- Items],
  %% 再取出金额，最后求和
  Amounts = [Amount || #{amount := Amount} <- Paid],
  lists:sum(Amounts).`,
    codeCaption:
      "Erlang 模块名是 atom。`total/1` 中的 1 表示函数接收一个参数。列表推导会用形状模板挑出已付款订单，再取金额。",
    experiment: {
      title: "给 Erlang 代码断句",
      intro:
        "分别改错逗号、分号和句点。别背报错，找出编译器认为哪一段还没结束。",
      steps: [
        "创建 `classify/1`，为正数和零或负数准备两个入口",
        "把第一条入口末尾的分号改成句点，再编译一次",
        "把同一个函数体中表示“接着做”的逗号改成分号，再编译一次",
      ],
      command: `# 编译项目，并运行全部 EUnit 测试
rebar3 eunit`,
      expected: [
        "分号能隔开同名、同参数个数的多个函数入口",
        "句点会告诉编译器：整个函数定义到这里结束",
        "逗号会让同一函数体中的表达式按顺序继续",
      ],
      breakIt:
        "删掉 `-export([total/1]).`，再从 shell 调用。函数仍在模块里，但外部无法访问。",
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
      title: "翻译一段 Erlang",
      brief:
        "用 Rebar3 重写日志工具，让两种实现读取同一组样例并返回相同结果。",
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
    number: "05",
    slug: "shared-semantics",
    stage: "languages",
    stageLabel: "桥接",
    title: "两种语言对暗号",
    subtitle: "Elixir 和 Erlang 穿着不同的外衣，却常常传递同样的数据。",
    summary: "用两种语言实现同一套订单变化，并用测试核对结果。",
    duration: "约 5 小时 · 建议分 4 次",
    lessons: 4,
    level: "双语挑战",
    languages: ["Elixir", "Erlang", "BEAM"],
    why:
      "把同一件事并排写两次，比各背一遍更清楚。Elixir 写 `:ok`，Erlang 写 `ok`；在 BEAM 上它们是同一个 atom。字符串、模块和异常仍有真实差异。",
    storyBridge: {
      label: "军令与虎符",
      title: "暗号要对得上",
      story:
        "军令可以用不同字迹抄写，地点、行动与印信却要一致。核对虎符时，关键是两半能否相合。",
      connection:
        "两门语言的语法对应不同字迹，约好的 BEAM 数据形状对应军令格式。",
      boundary:
        "两门语言不只差写法。模块、工具、异常、struct、record 和字符串仍有差异。",
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
          "atom 是固定标签。Elixir 写 `:ok`，Erlang 写 `ok`；两者是同一个 atom。Elixir 模块名也是以 `Elixir.` 开头的 atom。",
      },
      {
        term: "模块调用",
        definition:
          "一次调用由模块名、函数名和参数个数组成。参数个数也叫元数（arity）。",
      },
      {
        term: "约好的数据格式",
        definition:
          "两个模块约好输入、返回和错误的数据形状。跨语言时，这些约定比表面写法更重要。",
      },
      {
        term: "term",
        definition:
          "BEAM 中的一份数据叫 term，例如数字、atom、tuple、list 和 map。普通 term 能在两种语言间直接传递。",
      },
    ],
    elixirCode: `# 用 atom 列出订单允许出现的状态
defmodule Order do
  @type state :: :new | :paid | :shipped

  # 成功返回新状态，失败返回清楚的错误标签
  @spec transition(state(), atom()) ::
          {:ok, state()} | {:error, :invalid_transition}
  def transition(:new, :pay), do: {:ok, :paid}
  def transition(:paid, :ship), do: {:ok, :shipped}
  def transition(_, _), do: {:error, :invalid_transition}
end`,
    erlangCode: `%% 订单状态与事件都使用 atom
-module(order).
-export([transition/2]).

-type state() :: new | paid | shipped.
%% 成功返回新状态，失败返回清楚的错误标签
-spec transition(state(), atom()) ->
  {ok, state()} | {error, invalid_transition}.

%% 每个子句描述一条状态处理规则
transition(new, pay) -> {ok, paid};
transition(paid, ship) -> {ok, shipped};
transition(_, _) -> {error, invalid_transition}.`,
    codeCaption: "两边接收相同 atom，也返回相同形状的成功或错误 tuple。",
    experiment: {
      title: "交换同一份数据",
      intro: "双向调用两个模块，比较 atom 与 tuple 穿过语言边界后的结果。",
      steps: [
        "把 `order.erl` 放进 Mix 项目的 `src/`，然后编译项目",
        "在 IEx 中调用 `:order.transition(:new, :pay)`，记下返回值",
        "再从 Erlang 调用 `'Elixir.Order':transition(new, pay)`，比较两边的数据形状",
      ],
      command: `# 编译当前 Mix 项目，并在项目环境中打开 IEx
iex -S mix`,
      expected: [
        "两边都会得到与 `{ok, paid}` 对应的同一个 tuple term",
        "Erlang 可以用 Elixir 模块真正的 module atom 找到并调用它",
      ],
      breakIt:
        "把一边的 atom `paid` 改成字符串 `\"paid\"`。文字相同，term 类型不同，匹配会失败。",
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
        "Elixir 模块别名会编译为带 `Elixir.` 前缀的 atom。它含大写字母和句点，Erlang 要用单引号。",
    },
    challenge: {
      title: "订单状态接力赛",
      brief: "加入取消、退款和重复事件。先画状态转换表，再用两种语言实现。",
      hints: [
        "先画状态与事件表，不要急着写代码。",
        "决定重复事件是保持原状还是返回错误，并把幂等规则写清楚。",
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
    number: "06",
    slug: "processes-and-mailboxes",
    stage: "concurrency",
    stageLabel: "并发",
    title: "消息与超时",
    subtitle: "先自己收信和回信，再揭开 GenServer 帮我们做了什么。",
    summary: "给请求编号，再观察 timeout、迟到回复和服务退出。",
    duration: "约 6 小时 · 建议分 4 次",
    lessons: 4,
    level: "进阶探索",
    languages: ["Elixir", "Erlang", "BEAM"],
    why:
      "先写一次消息循环，才能看清 GenServer 做了什么。请求带编号，回复带同一编号。timeout 只结束等待，不会撤回消息。",
    storyBridge: {
      label: "镖局回执",
      title: "镖号和迟到的回执",
      story:
        "镖局为每趟货记下镖号。客人先走，不会让已出发的队伍折返；回执仍可能晚到。",
      connection:
        "镖号对应 reference，托镖对应 request，回执对应 reply。timeout 不等于取消。",
      boundary:
        "这不能解释 link、monitor、退出原因和 `trap_exit`，这些仍要用代码观察。",
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
          "两个进程间的双向退出联系。默认情况下，异常退出信号会沿 link 传播。",
      },
      {
        term: "monitor",
        definition:
          "单向观察关系。被观察者退出时，观察者收到 `DOWN`，但不会自动退出。",
      },
    ],
    elixirCode: `# 发出请求前，先生成本次调用专用的 reference
def call(server, request, timeout \\\\ 1_000) do
  ref = make_ref()
  # 同时告诉服务端回信地址和请求编号
  send(server, {:call, self(), ref, request})

  receive do
    # 只接收带有同一 reference 的回复
    {:reply, ^ref, response} -> {:ok, response}
  after
    # timeout 只停止等待，不会撤回 request
    timeout -> {:error, :timeout}
  end
end`,
    erlangCode: `%% 发出请求前，先生成本次调用专用的 reference
call(Server, Request, Timeout) ->
  Ref = make_ref(),
  %% 同时告诉服务端回信地址和请求编号
  Server ! {call, self(), Ref, Request},
  receive
    %% 只接收带有同一 Ref 的回复
    {reply, Ref, Response} -> {ok, Response}
  after Timeout ->
    %% timeout 只停止等待，不会撤回 request
    {error, timeout}
  end.`,
    codeCaption: "reference 负责配对请求与回复；timeout 不会撤回已发送的消息。",
    experiment: {
      title: "让回信迟到",
      intro:
        "服务端 1.5 秒后回复，客户端只等 0.5 秒。看看 timeout 后回复去了哪里。",
      steps: [
        "写一个收到 request 后稍等 1.5 秒再 reply 的小服务",
        "发起一次只愿意等待 500 毫秒的 call",
        "两秒后运行 `Process.info(self(), :messages)`，看看自己的 mailbox",
      ],
      command: `# 查看当前 IEx 进程 mailbox 中仍未处理的消息
Process.info(self(), :messages)`,
      expected: [
        "call 会先返回 `{:error, :timeout}`",
        "服务端仍可能完成工作，迟到的 reply 也可能出现在调用者的 mailbox",
      ],
      breakIt:
        "去掉 reference，再发送两个速度不同的请求。观察回复是否错配。",
      canProve: "停止等待不等于停止服务端工作；reference 能正确配对回复。",
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
        "`after` 只控制等待时间。真正取消需要另加协议，也需要服务端配合。",
    },
    challenge: {
      title: "写一个 KV 小服务",
      brief:
        "实现 `put`、`get` 和 `delete`。同步请求带 reference，并区分 timeout 与服务端退出。",
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
    number: "07",
    slug: "otp-behaviours",
    stage: "concurrency",
    stageLabel: "OTP",
    title: "OTP 消息章法",
    subtitle: "GenServer 把收信、回信和系统消息整理成大家都认识的规则。",
    summary: "把 KV 循环改成 GenServer 和 gen_server，再比较 call 与 cast。",
    duration: "约 7 小时 · 建议分 5 次",
    lessons: 5,
    level: "进阶探索",
    languages: ["Elixir", "Erlang", "OTP"],
    why:
      "每次重写启动、系统消息和回复，容易漏掉细节。OTP behaviour 提供通用章法。API、状态归属和过载策略仍由我们决定。",
    storyBridge: {
      label: "唐代驿路",
      title: "公文分两种",
      story:
        "唐代驿路有交接、换马和登记章程。有些公文要等回执，有些送出即可。",
      connection:
        "behaviour 对应章程，callback 对应职责。call 要等回执，cast 不等待。",
      boundary:
        "call 与 cast 都是 BEAM 消息。cast 不保证已处理，也不会限制 mailbox。",
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
          "一组 callback 合约。实现模块完成指定 callback，框架负责消息循环、系统消息和调试。",
      },
      {
        term: "call",
        definition:
          "需要 reply 的同步请求。调用者会等待，但这还不等于完整背压。",
      },
      {
        term: "cast",
        definition: "不等 reply 的异步消息。发送过快时，消息会堆进 mailbox。",
      },
    ],
    elixirCode: `# GenServer 负责保存并按顺序更新这张 map
defmodule KV do
  use GenServer

  # 这些函数是调用者看到的公开 API
  def start_link(opts), do: GenServer.start_link(__MODULE__, %{}, opts)
  def get(server, key), do: GenServer.call(server, {:get, key})
  def put(server, key, value), do: GenServer.call(server, {:put, key, value})

  # callback 负责处理真正的消息与状态
  @impl true
  def init(state), do: {:ok, state}

  @impl true
  def handle_call({:get, key}, _from, state),
    do: {:reply, Map.fetch(state, key), state}

  def handle_call({:put, key, value}, _from, state),
    do: {:reply, :ok, Map.put(state, key, value)}
end`,
    erlangCode: `%% gen_server 负责保存并按顺序更新这张 map
-module(kv).
-behaviour(gen_server).
-export([start_link/0, get/2, put/3]).
-export([init/1, handle_call/3]).

%% 这些函数是调用者看到的公开 API
start_link() -> gen_server:start_link(?MODULE, #{}, []).
get(Server, Key) -> gen_server:call(Server, {get, Key}).
put(Server, Key, Value) ->
  gen_server:call(Server, {put, Key, Value}).

%% callback 负责处理真正的消息与状态
init(State) -> {ok, State}.
handle_call({get, Key}, _From, State) ->
  {reply, maps:find(Key, State), State};
handle_call({put, Key, Value}, _From, State) ->
  {reply, ok, State#{Key => Value}, State}.`,
    codeCaption: "API 隐藏消息形状，callback 处理约定。两种语言返回相同语义的 tuple。",
    experiment: {
      title: "发得快，不等于做得完",
      intro: "用 cast 快速发送更新，再观察 mailbox 和同步查询延迟。",
      steps: [
        "新增使用 cast 的 `put_async/3`",
        "连续送出一大批更新，并分别记录发送结束与处理结束的时间",
        "同时发起一个同步 `get`，记录它的等待时间和 `message_queue_len`",
      ],
      command: `# 读取 pid 的 mailbox 长度，观察 cast 是否正在积压
:erlang.process_info(pid, :message_queue_len)`,
      expected: [
        "发送循环很快结束，不代表服务端已经处理完",
        "同步 `get` 可能排在许多 cast 后面，等待时间明显变长",
      ],
      breakIt:
        "在 `handle_cast` 中加入慢 I/O，再加快发送。观察 mailbox 是否持续增长。",
      canProve:
        "异步 API 可以让调用者不等待，但等待并没有消失，而是可能转移到了服务端的 mailbox。",
      cannotProve:
        "本地实验不能给出真实服务上限。硬件、消息大小和外部 I/O 都会影响结果。",
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
        "使用 cast 前，要确认不需要结果，也要规定过载处理。cast 不保证立即执行，也没有队列上限。",
    },
    challenge: {
      title: "写一个有界任务服务",
      brief:
        "一种语言写 API，另一种写 worker。最多运行 N 个任务；有界队列满时返回 `busy`。",
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
    number: "08",
    slug: "supervision-trees",
    stage: "concurrency",
    stageLabel: "OTP",
    title: "会重启的监督树",
    subtitle: "先弄清谁依赖谁，再决定一个伙伴倒下时该重启哪些进程。",
    summary: "用 child spec 和重启策略搭监督树，再观察不同故障的恢复范围。",
    duration: "约 6 小时 · 建议分 4 次",
    lessons: 4,
    level: "进阶探索",
    languages: ["Elixir", "Erlang", "OTP"],
    why:
      "“Let it crash” 不是放任错误。无法继续的进程交给监督者重启；密码错误、库存不足等预期情况仍要正常返回。",
    storyBridge: {
      label: "《三国演义》行军营寨",
      title: "粮草营出了问题",
      story:
        "借行军营寨想象依赖关系：有的小营独立，有的要等粮草与道路。前方供应出错，后方依赖者也要重整。",
      connection:
        "`one_for_one` 只重启故障 child；`one_for_all` 全部重启；`rest_for_one` 还会重启后面的依赖者。",
      boundary:
        "监督树只看进程与退出信号。重启也不会恢复丢失数据或撤回外部操作。",
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
          "故障影响范围。有些组件一起恢复，有些彼此隔离；监督树用结构表达这种关系。",
      },
      {
        term: "restart intensity",
        definition:
          "一段时间内允许的最大重启次数。超过上限，监督者退出，把问题交给上一级。",
      },
      {
        term: "Application",
        definition:
          "OTP 中可启动、停止、配置和声明依赖的组件。根监督树通常由 application callback 启动。",
      },
    ],
    elixirCode: `# child 的顺序会影响 rest_for_one 的恢复范围
children = [
  # Registry 先启动，后面的组件会使用它
  {Registry, keys: :unique, name: Jobs.Registry},
  # 动态监督者负责照看临时 worker
  {DynamicSupervisor,
   strategy: :one_for_one,
   name: Jobs.Workers},
  Jobs.Dispatcher
]

# 从同一个根监督者启动整组 child
Supervisor.start_link(
  children,
  strategy: :rest_for_one,
  name: Jobs.Supervisor
)`,
    erlangCode: `%% child 的顺序会影响 rest_for_one 的恢复范围
init([]) ->
  %% 先写出每个 child 的启动说明
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
  %% 前面的 child 退出时，也会重启后面的依赖者
  {ok, {{rest_for_one, 3, 5},
        [Registry, Workers, Dispatcher]}}.`,
    codeCaption: "`rest_for_one` 用 child 顺序表达依赖；前面的故障会重启后面的依赖者。",
    experiment: {
      title: "让 child 逐个退出",
      intro:
        "记录三个 PID，再分别让 dispatcher 与 registry 异常退出。比较哪些 PID 改变。",
      steps: [
        "启动监督树，用 `which_children` 记录所有 child 的 PID",
        "让最后一个 child 异常退出，重新查看 PID",
        "再让第一个 child 异常退出，比较这次有多少 PID 改变",
      ],
      command: `# 列出监督者的 child 名称、PID、类型和模块
Supervisor.which_children(Jobs.Supervisor)`,
      expected: [
        "最后一个 child 出错时，通常只有它自己重新启动",
        "第一个 child 出错时，`rest_for_one` 会让它和后面的依赖者都重新启动",
      ],
      breakIt:
        "改成 `one_for_all`，再让独立的最后一个 child 退出。观察是否发生多余重启。",
      canProve:
        "restart strategy 和 child 顺序会一起决定哪些进程重新开始。",
      cannotProve:
        "新 PID 只说明进程重启。业务状态、磁盘数据和外部操作仍要检查。",
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
        "`rest_for_one` 用顺序表达依赖。独立 child 通常适合 `one_for_one`。",
    },
    challenge: {
      title: "画一棵监督树",
      brief:
        "画出任务队列的监督树。标出每个 child 的重启类型，并说明恢复范围。",
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
    number: "09",
    slug: "state-and-backpressure",
    stage: "concurrency",
    stageLabel: "容量",
    title: "给并发设上限",
    subtitle: "该用普通函数时就直接计算，需要并发时也要给任务数量画一条线。",
    summary: "比较普通函数、进程、ETS 和有界任务，为并发设上限。",
    duration: "约 5 小时 · 建议分 3 次",
    lessons: 3,
    level: "容量挑战",
    languages: ["Elixir", "Erlang", "BEAM"],
    why:
      "进程适合保管状态、表达生命周期和隔离错误。普通计算不必都经过 GenServer，无限 Task 也会耗尽连接与内存。工具要按状态和容量来选。",
    storyBridge: {
      label: "都江堰",
      title: "宝瓶口有多宽",
      story:
        "都江堰用鱼嘴分流、飞沙堰泄洪排沙，再由宝瓶口限制入水量。水多时，要给它别的去路。",
      connection:
        "有界并发规定入口宽度。等待、限速或拒绝把容量不足传回上游，这就是背压。",
      boundary:
        "软件必须明确选择等待、拒绝或降级。水利故事不能解释 mailbox、CPU 调度和 ETS 规则。",
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
          "下游容量不足时，把信号传回上游。上游可以等待、减速、被拒绝或进入有界队列。",
      },
      {
        term: "ETS",
        definition:
          "BEAM 中供多个进程快速读写的表。它仍有所有者；所有者退出时，表默认被删除。",
      },
      {
        term: "有界并发",
        definition:
          "同时运行的任务数有上限，使 CPU、连接和内存用量更可控。",
      },
    ],
    elixirCode: `# 同时检查 URL，但并发数不会超过设定上限
urls
|> Task.async_stream(
  &check_url/1,
  # 根据调度器数量设置并发上限
  max_concurrency: System.schedulers_online() * 2,
  timeout: 3_000,
  on_timeout: :kill_task,
  ordered: false
)
# 把每项结果汇总成成功与失败计数
|> Enum.reduce(%{ok: 0, error: 0}, &count_result/2)`,
    erlangCode: `%% 一个固定大小 worker 池的核心思想
%% 先启动不超过 Limit 个任务，其余任务等待
run_bounded(Jobs, Limit) ->
  {Running, Pending} = start_first(Jobs, Limit),
  collect(Running, Pending, Limit).

%% worker 退出后，移除它并从等待队列补一个任务
collect(Running, Pending, Limit) ->
  receive
    {'DOWN', Ref, process, _Pid, Result} ->
      collect(start_next(remove(Ref, Running), Pending, Limit))
  end.`,
    codeCaption: "Elixir 直接设并发上限；Erlang 轮廓展示 monitor、运行集合与等待队列。",
    experiment: {
      title: "一加一要不要 GenServer",
      intro:
        "同一批独立计算，一版 call 同一个 GenServer，一版直接调用函数。比较时间和 mailbox。",
      steps: [
        "实现一个只做 CPU 小计算、没有长期状态的 Calculator GenServer",
        "从多个 Task 同时 call 这一个 server，记录总时间和 mailbox",
        "把计算改成普通函数，用同一批输入再测一次",
      ],
      command: `# 运行 workload，并返回耗时微秒数和函数结果
:timer.tc(fn -> workload.() end)`,
      expected: [
        "单个 server 会让原本互不依赖的计算排队执行",
        "普通函数可以留在各个调用者中运行，更容易让多个调度器一起工作",
      ],
      breakIt:
        "把 `max_concurrency` 调到输入数量，并让每个任务占一个连接。记录资源峰值。",
      canProve:
        "没有共享状态的独立计算，通常不需要先挤进同一个进程排队。",
      cannotProve:
        "这不能说明所有 GenServer 都慢。它们主要负责状态、生命周期和消息约定。",
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
        "纯计算没有长期状态或生命周期，用普通函数更清楚。进程不只是函数容器。",
    },
    challenge: {
      title: "写一个有界网址检查器",
      brief:
        "检查一组 URL，限制并发、timeout 和等待数量。输出成功率、P95 耗时和拒绝数。",
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
    number: "10",
    slug: "distributed-operations",
    stage: "production",
    stageLabel: "联网",
    title: "BEAM 节点失联",
    subtitle: "节点连上只是故事的开始；断线、迟到和旧数据也要有安排。",
    summary: "连接两个节点，再让一个离线，用日志、Telemetry 和 Observer 查明状态。",
    duration: "约 6 小时 · 建议分 4 次",
    lessons: 4,
    level: "联网挑战",
    languages: ["BEAM", "OTP"],
    why:
      "分布式 Erlang 让远程发送写起来很自然，网络却仍会延迟或断开。节点名和 cookie 只帮助连接；一致性、投递、容量和安全仍要设计。",
    storyBridge: {
      label: "长城烽火台",
      title: "烽火断了",
      story:
        "长城烽火台逐站传递警报。浓雾、暴雨或中途失联时，后方不能假装仍有最新消息。",
      connection:
        "烽火台对应 node，连断事件对应 `nodeup` 与 `nodedown`。日志和 Telemetry 留下状态记录。",
      boundary:
        "BEAM 不只逐站传递。真实网络还会丢包、半开或分区；`nodedown` 也不说明断连原因。",
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
          "参与分布式通信的 BEAM 实例，名字通常是 `name@host`。远程 PID 也含节点身份。",
      },
      {
        term: "cookie",
        definition:
          "节点建立连接时使用的共享秘密。它不是完整安全方案，不能代替加密、隔离和访问控制。",
      },
      {
        term: "Telemetry",
        definition:
          "Elixir 常用的事件测量工具。业务代码发事件，handler 负责统计或导出。",
      },
    ],
    elixirCode: `# 让当前进程接收节点连上与断开的消息
:net_kernel.monitor_nodes(true)

# 节点事件会像普通 BEAM 消息一样到达
receive do
  {:nodeup, node} ->
    # 记录刚刚连上的节点
    Logger.info("node connected", node: node)

  {:nodedown, node} ->
    # 断连后由应用决定降级或重试
    Logger.warning("node disconnected", node: node)
end`,
    erlangCode: `%% 让当前进程接收节点连上与断开的消息
net_kernel:monitor_nodes(true),

%% 节点事件会像普通 BEAM 消息一样到达
receive
  {nodeup, Node} ->
    %% 记录刚刚连上的节点
    logger:info("node connected", #{node => Node});
  {nodedown, Node} ->
    %% 断连后由应用决定降级或重试
    logger:warning("node disconnected", #{node => Node})
end.`,
    codeCaption: "节点连断会变成消息。收到 `nodedown` 后如何降级或拒绝，要提前约好。",
    experiment: {
      title: "让一个节点离线",
      intro: "启动两个本地节点，连通后停掉一个。观察事件、远程进程和未完成请求。",
      steps: [
        "使用相同 cookie 启动 `a@127.0.0.1` 和 `b@127.0.0.1`",
        "从 A `ping` B，并打开 `monitor_nodes`",
        "停止 B，记录 A 收到的事件，也看看未完成请求怎样结束",
      ],
      command: `# 尝试连接节点 b；成功返回 :pong，失败返回 :pang
Node.ping(:"b@127.0.0.1")`,
      expected: [
        "连接成功时，`Node.ping/1` 返回 `:pong`",
        "B 停止后，A 会收到 `nodedown`",
        "BEAM 会报告断连，但应用仍要自己决定请求是失败、稍后重试还是换一条路",
      ],
      breakIt:
        "给节点设置不同 cookie。确认失败发生在连接阶段，而非业务 handler。",
      canProve:
        "节点的连通和断开可以被观察，并转成应用能够处理的事件。",
      cannotProve:
        "本机停节点不能模拟丢包、长延迟、半开连接和脑裂。",
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
        "相近的写法不会抹掉网络。一致性、重试、分区处理和安全仍要另行设计。",
    },
    challenge: {
      title: "画一张节点状态图",
      brief:
        "定期上报 scheduler、内存和关键 mailbox。断连后保留最后值，并标记 `stale`。",
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
    number: "11",
    slug: "interoperability",
    stage: "production",
    stageLabel: "桥接",
    title: "双语搭档",
    subtitle: "住在同一台 BEAM 里，互相调用很方便；交换的数据仍要先约好。",
    summary: "让 Elixir API 与 Erlang worker 合作，并处理数据格式与错误边界。",
    duration: "约 4 小时 · 建议分 3 次",
    lessons: 3,
    level: "双语挑战",
    languages: ["Elixir", "Erlang"],
    why:
      "两门语言能在同一台 BEAM 中直接互调，但文字、record 与 struct 的形状不同。把转换集中在边界，并约好成功与失败 term。",
    storyBridge: {
      label: "文言与白话合写一本书",
      title: "合写一本书",
      story:
        "两位作者合写一本书，一人用文言，一人用白话。写法可以不同，人名、年代和章节编号要统一。",
      connection:
        "两门语言各写一部分，adapter 负责统一 binary、charlist、record、map 和错误格式。",
      boundary:
        "自然语言没有程序类型规则。这个故事不能说明异常、Unicode 或 record 的 tuple 位置。",
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
          "由字符 code point 组成的整数 list，常见于 Erlang API。Elixir String 通常是 UTF-8 binary。",
      },
      {
        term: "record",
        definition:
          "Erlang 编译时把 record 展开成 tuple。跨语言时应使用公开函数或 map，避免依赖位置。",
      },
      {
        term: "exception boundary",
        definition:
          "两门语言对 exception、exit 和 throw 的处理约定。边界负责把它们转成稳定错误 tuple。",
      },
    ],
    elixirCode: `# Elixir API 负责验证输入并转换边界数据
defmodule Scheduler do
  @spec submit(binary(), map()) ::
          {:ok, reference()} | {:error, atom()}
  def submit(queue, payload) when is_binary(queue) do
    # Erlang worker 需要 charlist 和键值 list
    :job_worker.submit(
      String.to_charlist(queue),
      Map.to_list(payload)
    )
  catch
    # 把跨边界的 exit 整理成稳定错误 tuple
    :exit, reason -> {:error, normalize_exit(reason)}
  end
end`,
    erlangCode: `%% Erlang worker 接收已经转换好的边界数据
-module(job_worker).
-export([submit/2, call_elixir/1]).

%% guard 明确要求 Queue 与 Payload 都是 list
submit(Queue, Payload)
    when is_list(Queue), is_list(Payload) ->
  {ok, make_ref()}.

%% Elixir 模块名在 Erlang 中是带前缀的 atom
call_elixir(Value) ->
  'Elixir.Scheduler':normalize(Value).`,
    codeCaption: "转换集中在边界，核心协议使用带标签 tuple，不让 charlist 扩散到整个项目。",
    experiment: {
      title: "两种 jobs 为何对不上",
      intro:
        "先把 Elixir String 传给只接收 charlist 的 worker，再在 adapter 中转换并加测试。",
      steps: [
        "从 Elixir 传入 `\"jobs\"`，记录 guard 或 function clause 告诉了你什么",
        "在 adapter 中使用 `String.to_charlist/1` 后再调用 Erlang worker",
        "加入中文队列名的 round-trip 测试，确认来回转换后文字没有改变",
      ],
      command: `# 只运行跨语言边界的 ExUnit 测试文件
mix test test/interoperability_test.exs`,
      expected: [
        "binary 和 charlist 会匹配不同的 guard",
        "在交界处明确转换后，两边约定能够对上",
        "中文测试能发现把 Unicode 文字误当成单个字节处理的问题",
      ],
      breakIt:
        "让 Elixir 按位置读取 Erlang record，再给 record 加字段。观察耦合如何破裂。",
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
        "简单、可匹配的 term 易于测试。私有 record 会变化，全部转成文字又会丢失结构。",
    },
    challenge: {
      title: "共用一个任务队列",
      brief:
        "Elixir 提供 API 与验证，Erlang gen_server 保管队列。测试要真正穿过语言边界。",
      hints: [
        "先用几个具体例子写下成功和失败时交换的 term。",
        "把所有文字与错误转换集中到薄薄的 adapter 模块。",
        "让 ExUnit 调用 Erlang worker，也让 EUnit 调用 Elixir normalize 函数。",
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
    number: "12",
    slug: "reliable-scheduler",
    stage: "production",
    stageLabel: "作品",
    title: "可靠任务小队",
    subtitle: "让函数、进程、监督树、两门语言和容量规则一起完成一件自己的作品。",
    summary: "用 Elixir 做入口、Erlang 做调度，完成一个有界、可重试的任务系统。",
    duration: "约 10 小时 · 建议分 6 次",
    lessons: 4,
    level: "综合创作",
    languages: ["Elixir", "Erlang", "OTP"],
    why:
      "终点作品把前面的工具连起来。我们会制造队列满、任务失败、消息迟到和节点断开，再检查状态、重试、恢复与拒绝规则。",
    storyBridge: {
      label: "《三国演义》粮草调度",
      title: "粮车有限",
      story:
        "借粮草调度想象任务系统：批次要登记，车辆有限，催运令太多时要排队。重复发令还可能重复送达。",
      connection:
        "粮车对应 worker，待运粮草对应 bounded queue，重新发令对应 retry，批次记号对应幂等键。runbook 是值守簿。",
      boundary:
        "软件处理消息与外部服务，不是真实行军。幂等键也不能自动保证跨节点恰好一次。",
    },
    outcomes: [
      "能先写下必须始终成立的规则，再据此安排进程、队列和监督树",
      "能让 Erlang 与 Elixir 在同一个 release 中各自承担清楚的真实职责",
      "能主动制造小故障（故障注入），检查系统怎样恢复、拒绝或留下线索",
    ],
    prerequisites: [
      "完成 00–11 模块，并保留前面做过的队列和监督树练习",
      "能在参考资料帮助下编写 GenServer、gen_server 和 Supervisor",
    ],
    concepts: [
      {
        term: "at-least-once",
        definition:
          "任务至少尝试一次，也可能执行多次。要用幂等键或去重记录控制重复影响。",
      },
      {
        term: "bounded queue",
        definition:
          "容量固定的等待队列。队列满时，系统要等待、拒绝或降级。",
      },
      {
        term: "runbook",
        definition:
          "运行说明：看哪些日志与指标，怎样判断问题，可以执行什么安全动作。",
      },
    ],
    elixirCode: `# Elixir 层负责输入验证和对外返回格式
defmodule Scheduler.API do
  def submit(payload, opts \\\\ []) do
    # 只有验证与入队都成功，任务才算被接收
    with :ok <- validate(payload),
         {:ok, id} <- :scheduler_core.enqueue(payload, opts) do
      {:accepted, id}
    else
      # 队列满时明确拒绝，不继续占用内存
      {:error, :queue_full} -> {:rejected, :busy}
      {:error, reason} -> {:rejected, reason}
    end
  end
end`,
    erlangCode: `%% Erlang 核心保管队列、容量和调度状态
handle_call({enqueue, Job, Opts}, _From,
            State = #state{queued = Queue, max = Max}) ->
  %% 入队前先检查 bounded queue 是否还有位置
  case queue:len(Queue) < Max of
    true ->
      {Id, Next} = add_job(Job, Opts, State),
      {reply, {ok, Id}, dispatch(Next)};
    false ->
      %% 队列满时保持原状态，并把原因返回调用者
      {reply, {error, queue_full}, State}
  end.`,
    codeCaption: "Elixir 负责 API 与验证，Erlang 保管队列和调度状态。队列满时明确拒绝。",
    experiment: {
      title: "做四次故障演练",
      intro:
        "主动制造问题叫故障注入。先为 worker 退出、非法消息、timeout 和断连写下期望结果。",
      steps: [
        "让正在工作的 worker 主动 exit，检查 retry 次数和容量计数",
        "发送一条不符合约定的消息，确认服务仍能继续，也留下日志或 Telemetry 事件",
        "让任务超过 timeout，检查隔离、取消约定和迟到结果",
        "断开远程节点，检查 stale 标记以及重新连接后的状态",
      ],
      command: `# 只运行标记为 fault_injection 的测试，并显示执行过程
mix test --only fault_injection --trace`,
      expected: [
        "需要长期工作的进程最后仍由监督树照看",
        "失败任务只在上限内重试，不会永远循环",
        "队列长度和正在工作的数量最终回到一致状态",
        "每次拒绝、恢复或放弃都能在结构化日志或指标中找到证据",
      ],
      breakIt:
        "删除 retry 上限，再让任务持续失败。观察重试风暴如何放大问题。",
      canProve:
        "在这四种指定意外下，系统能按照已经写下的规则恢复、拒绝或停止重试。",
      cannotProve:
        "四场演练不能覆盖所有故障，也不能证明恰好一次、跨节点一致或外部操作不重复。",
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
        "retry 可能重复外部操作。先决定幂等键、退避、次数上限和最终失败去向。",
    },
    challenge: {
      title: "讲清任务小队",
      brief:
        "整理源码、监督树、消息约定、容量计划、故障记录、release 和一页 runbook，再讲清三个关键选择。",
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
        href: "https://hexdocs.pm/elixir/introduction-to-mix.html",
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

export const courseStats = {
  stations: courseModules.length,
  checkpoints: courseModules.reduce(
    (total, courseModule) => total + courseModule.lessons,
    0,
  ),
};

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
