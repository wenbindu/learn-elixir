import type { BasicLesson, BasicPathId } from "../basic-path-data";
import type { CourseModule } from "../course-data";
import type { Locale } from "./locales";

export type EcosystemComparison = {
  ecosystem: "Java" | "Python" | "JavaScript";
  familiarModel: string;
  beamDifference: string;
  watchFor: string;
};

export type LearningGuidance = {
  beforeRun: {
    predict: string;
    trace: string;
    changeOne: string;
  };
  designDecision?: {
    question: string;
    choice: string;
    tradeoff: string;
  };
  comparisons?: EcosystemComparison[];
};

type ComparisonTopic =
  | "matching"
  | "arity"
  | "pipeline"
  | "module"
  | "results"
  | "behaviour"
  | "types";

const basicTopicByLesson: Partial<
  Record<`${BasicPathId}:${string}`, ComparisonTopic>
> = {
  "elixir:pattern-matching": "matching",
  "erlang:variables-and-matching": "matching",
  "elixir:functions-and-arity": "arity",
  "erlang:functions-and-arity": "arity",
  "elixir:capture-enum-pipe": "pipeline",
  "erlang:higher-order-data-pipelines": "pipeline",
  "elixir:modules-and-mix": "module",
  "erlang:modules-and-beam": "module",
  "elixir:result-contracts": "results",
  "erlang:result-contracts": "results",
  "elixir:behaviours-and-callbacks": "behaviour",
  "erlang:behaviours-and-callbacks": "behaviour",
  "elixir:typespecs-and-dialyzer": "types",
  "erlang:typespecs-and-dialyzer": "types",
};

const basicComparisonCopy: Record<
  Locale,
  Record<
    ComparisonTopic,
    Pick<LearningGuidance, "designDecision" | "comparisons">
  >
> = {
  zh: {
    matching: {
      designDecision: {
        question: "为什么不把 `=` 只当作赋值？",
        choice: "模式把“检查形状”和“取出数据”合在一次操作里。函数入口、case 和 receive 因此能用同一套读法。",
        tradeoff: "跨一次新的匹配时，两门语言规则不同：Elixir 的名字默认可以重新绑定，要用 `^name` 才核对旧值；Erlang 的变量一旦绑定，再出现在模式里就会核对。",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "局部变量赋值，再用 getter 或 instanceof 检查对象。", beamDifference: "模式直接检查 tuple、list 或 map 的形状并取值。", watchFor: "这里不是方法重载，也不会修改右边的数据。" },
        { ecosystem: "Python", familiarModel: "解包和 match/case 已有相近感觉。", beamDifference: "数据不会被原地改写，模式也是函数子句和消息协议的日常工具。", watchFor: "Elixir 可以重新绑定名字，但不会改掉原值；Erlang 的已绑定变量会用来核对。" },
        { ecosystem: "JavaScript", familiarModel: "数组、对象解构主要负责取值。", beamDifference: "BEAM 模式还会核对固定标签；不匹配会走别的子句或失败。", watchFor: "对象解构的默认值与 BEAM 模式不是同一套规则。" },
      ],
    },
    arity: {
      designDecision: {
        question: "为什么函数名后还要写 `/1`？",
        choice: "BEAM 用“模块、函数名、参数个数”共同确定入口。`trim/1` 就是接收一个参数的 `trim`。",
        tradeoff: "同名不同参数个数是不同函数；默认参数只是编译时生成多个 arity，不能把它想成运行时随意少传。",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "方法可按参数类型和数量重载。", beamDifference: "BEAM 先按名称与 arity 找函数，再由子句按数据形状匹配。", watchFor: "`run/1` 与 `run/2` 是两个明确入口。" },
        { ecosystem: "Python", familiarModel: "一个函数常靠默认参数、`*args` 接收不同数量。", beamDifference: "arity 是函数身份的一部分，并写进导出列表和文档。", watchFor: "少传一个参数不会自动得到另一个 arity。" },
        { ecosystem: "JavaScript", familiarModel: "函数通常容忍少传或多传参数。", beamDifference: "BEAM 调用必须找到精确 arity。", watchFor: "`&1` 是匿名函数参数占位，不是 `/1` 的另一种写法。" },
      ],
    },
    pipeline: {
      designDecision: {
        question: "为什么把数据一站一站传下去？",
        choice: "管道把一长串嵌套调用改成从上往下的数据旅程。每一步仍应是能单独理解和测试的小函数。",
        tradeoff: "管道不是更高级的循环。若参数位置别扭、步骤偷偷做大量 IO，拆成普通调用反而更清楚。",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "Stream 链或连续方法调用。", beamDifference: "Elixir `|>` 只是把左值放进下一次调用；Erlang 通常显式嵌套或给中间值命名。", watchFor: "`Enum` 多半立即计算，`Stream` 才是惰性。" },
        { ecosystem: "Python", familiarModel: "生成器、推导式和逐步赋值。", beamDifference: "capture 与 pipe 把小函数组合起来，但不会原地改 list。", watchFor: "`&String.trim/1` 是函数值，`String.trim/1` 只是函数身份写法。" },
        { ecosystem: "JavaScript", familiarModel: "map/filter 链、回调或 iterator。", beamDifference: "数据默认是不可变值；每一步交回一个新结果。", watchFor: "不要把 `&1` 读成 JS 的位运算与号。" },
      ],
    },
    module: {
      designDecision: {
        question: "为什么先用模块组织函数，而不是先造 class？",
        choice: "模块给一组相关函数命名并形成公开边界。数据仍是显式参数，不藏在隐含的 `this` 里。",
        tradeoff: "需要长期状态与生命周期时再引入进程；单纯把函数塞进 GenServer，只会多一层排队。",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "class 同时装数据、方法和对象身份。", beamDifference: "BEAM 模块不是对象；函数没有隐含接收者。", watchFor: "模块也不会因为被调用就启动一个进程。" },
        { ecosystem: "Python", familiarModel: "module 与 class 都能组织代码。", beamDifference: "这里先让 module/function/arity 成为稳定入口，状态另外安排。", watchFor: "OTP Application 也不是操作系统进程。" },
        { ecosystem: "JavaScript", familiarModel: "ES module 导出函数或 class。", beamDifference: "编译后的模块由 BEAM 按模块名与 arity 调用。", watchFor: "Mix/rebar3 管项目，不等于 BEAM 或 OTP。" },
      ],
    },
    results: {
      designDecision: {
        question: "为什么常返回 `{:ok, value}` 或 `{ok, Value}`？",
        choice: "预料之中的失败也写进返回值。调用者能用模式列出成功、失败和兜底分支。",
        tradeoff: "真正意外、无法在本层处理的错误仍可以抛出，让监督边界接手。把所有异常都吞成 `:error` 会丢掉证据。",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "checked/unchecked exception 或 Optional。", beamDifference: "tagged result 把常见业务结果放在普通控制流中。", watchFor: "不是每个错误都该 crash，也不是每个异常都该 catch。" },
        { ecosystem: "Python", familiarModel: "异常与 `None`。", beamDifference: "tag 明说失败类别，避免只靠一个空值猜原因。", watchFor: "边界处可以把第三方异常翻译成稳定 result。" },
        { ecosystem: "JavaScript", familiarModel: "throw、rejected Promise 或 null。", beamDifference: "tuple 不是 Promise；它是已经拿到手的数据契约。", watchFor: "不要把课程里的 contract 误读成异步 Promise。" },
      ],
    },
    behaviour: {
      designDecision: {
        question: "为什么 behaviour 只规定回调，不直接提供进程？",
        choice: "behaviour 先约定模块必须实现哪些函数。GenServer/gen_server 是带运行时协议的 behaviour，但一般 behaviour 本身不会启动任何东西。",
        tradeoff: "它统一边界，却不替你决定状态、监督、容量和错误策略。",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "interface 定义方法契约。", beamDifference: "behaviour 约束 module/function/arity；调用者仍调用模块函数。", watchFor: "实现 behaviour 不等于创建对象或线程。" },
        { ecosystem: "Python", familiarModel: "ABC 或 Protocol。", beamDifference: "callback 元数据让工具检查实现，也能被 OTP 框架调用。", watchFor: "它不是 Python 装饰器式的运行时包装。" },
        { ecosystem: "JavaScript", familiarModel: "约定对象形状或 TypeScript interface。", beamDifference: "behaviour 存在于 BEAM 模块与 callback 入口层。", watchFor: "类型约定和进程生命周期仍是两件事。" },
      ],
    },
    types: {
      designDecision: {
        question: "既然能直接运行，为什么还写 spec？",
        choice: "spec 给人和 Dialyzer 留下函数契约。它善于发现不可能成功的调用，不负责在运行时拦住每个错误值。",
        tradeoff: "spec 写得越宽，帮助越少；写错也不会自动变成运行时验证。系统边界仍要解析和校验。",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "编译器在构建时做静态类型检查。", beamDifference: "Dialyzer 使用 success typing，目标不是证明所有输入都安全。", watchFor: "通过 Dialyzer 不代表运行时不会收到坏消息。" },
        { ecosystem: "Python", familiarModel: "type hints 配合 mypy/pyright。", beamDifference: "spec 也主要服务工具与读者，但分析模型不同。", watchFor: "它不是输入验证库。" },
        { ecosystem: "JavaScript", familiarModel: "TypeScript 在输出 JS 前检查类型。", beamDifference: "BEAM 运行 term；Dialyzer 从可能成功的调用推断矛盾。", watchFor: "跨网络与文件边界仍要检查真实数据。" },
      ],
    },
  },
  en: {
    matching: {
      designDecision: {
        question: "Why is `=` more than assignment here?",
        choice: "A pattern checks a shape and extracts its data in one move. The same idea works at function boundaries, in `case`, and in `receive`.",
        tradeoff: "The rules differ across a new match: Elixir rebinds a plain name and needs `^name` to check the old value; an Erlang variable becomes a check after its first binding.",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "Assign a local variable, then inspect an object with accessors or instanceof.", beamDifference: "A pattern checks and unpacks tuples, lists, or maps directly.", watchFor: "This is not method overloading, and it does not mutate the value." },
        { ecosystem: "Python", familiarModel: "Unpacking and match/case offer a familiar starting point.", beamDifference: "Data is not changed in place, and patterns are routine tools for function clauses and message protocols.", watchFor: "Elixir can rebind a name without mutating its old value; a bound Erlang variable checks the next match." },
        { ecosystem: "JavaScript", familiarModel: "Array and object destructuring mainly extract values.", beamDifference: "BEAM patterns can also require fixed tags; a mismatch selects another clause or fails.", watchFor: "JavaScript destructuring defaults follow different rules." },
      ],
    },
    arity: {
      designDecision: {
        question: "Why put `/1` after a function name?",
        choice: "BEAM identifies an entry point by module, function name, and argument count. `trim/1` means the `trim` function that takes one argument.",
        tradeoff: "The same name with another argument count is another function. Default arguments generate arities at compile time; they do not make calls loosely sized.",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "Methods can overload by parameter types and count.", beamDifference: "BEAM first finds a name and arity, then clauses can match data shapes.", watchFor: "`run/1` and `run/2` are distinct entry points." },
        { ecosystem: "Python", familiarModel: "One function often uses defaults or `*args`.", beamDifference: "Arity is part of a function's identity and appears in exports and docs.", watchFor: "Leaving out an argument does not discover another arity automatically." },
        { ecosystem: "JavaScript", familiarModel: "Functions often tolerate missing or extra arguments.", beamDifference: "A BEAM call must find the exact arity.", watchFor: "`&1` is a capture placeholder; it is not another spelling of `/1`." },
      ],
    },
    pipeline: {
      designDecision: {
        question: "Why pass data through a series of small steps?",
        choice: "A pipeline turns nested calls into a top-to-bottom data journey. Each step should still be understandable and testable on its own.",
        tradeoff: "A pipe is not a superior loop. If argument order is awkward or a step hides substantial I/O, an ordinary call can be clearer.",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "Stream chains or fluent method calls.", beamDifference: "Elixir `|>` inserts the left value into the next call; Erlang usually nests calls or names intermediate values.", watchFor: "`Enum` is usually eager. `Stream` is lazy." },
        { ecosystem: "Python", familiarModel: "Generators, comprehensions, and named intermediate values.", beamDifference: "Captures and pipes compose small functions without mutating a list.", watchFor: "`&String.trim/1` is a function value; `String.trim/1` only names a function and arity." },
        { ecosystem: "JavaScript", familiarModel: "map/filter chains, callbacks, and iterators.", beamDifference: "Values are immutable by default; each step returns another result.", watchFor: "Do not read `&1` as JavaScript's bitwise ampersand." },
      ],
    },
    module: {
      designDecision: {
        question: "Why organize functions in modules before reaching for a class?",
        choice: "A module names related functions and creates a public boundary. Data remains an explicit argument instead of hiding behind `this`.",
        tradeoff: "Add a process only when state needs an owner, a lifecycle, or failure isolation. A GenServer around a pure function merely adds a queue.",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "A class combines data, methods, and object identity.", beamDifference: "A BEAM module is not an object, and functions have no implicit receiver.", watchFor: "Calling a module does not start a process." },
        { ecosystem: "Python", familiarModel: "Modules and classes can both organize code.", beamDifference: "Module/function/arity forms the stable entry point; state is a separate design decision.", watchFor: "An OTP Application is not an operating-system process." },
        { ecosystem: "JavaScript", familiarModel: "ES modules export functions or classes.", beamDifference: "BEAM calls compiled modules by module name and arity.", watchFor: "Mix and rebar3 manage projects; neither is BEAM or OTP." },
      ],
    },
    results: {
      designDecision: {
        question: "Why return `{:ok, value}` or `{ok, Value}` so often?",
        choice: "Expected failure stays visible as ordinary data. A caller can list success, known failure, and fallback branches with patterns.",
        tradeoff: "Unexpected failures that cannot be handled here may still raise and reach a supervision boundary. Turning every exception into a generic error discards evidence.",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "Checked or unchecked exceptions, plus Optional.", beamDifference: "Tagged results keep expected business outcomes in normal control flow.", watchFor: "Not every error should crash, and not every exception should be caught here." },
        { ecosystem: "Python", familiarModel: "Exceptions and `None`.", beamDifference: "A tag names the failure class instead of asking one empty value to carry every meaning.", watchFor: "Translate third-party exceptions into a stable result at a boundary." },
        { ecosystem: "JavaScript", familiarModel: "throw, rejected Promises, or null.", beamDifference: "A tuple is not a Promise. It is data that has already arrived.", watchFor: "Read contract as acceptance criteria, not an asynchronous Promise." },
      ],
    },
    behaviour: {
      designDecision: {
        question: "Why does a behaviour define callbacks without creating a process?",
        choice: "A behaviour first states which functions a module must implement. GenServer/gen_server is a behaviour with a runtime protocol, but a general behaviour starts nothing by itself.",
        tradeoff: "It standardizes a boundary. It does not choose state ownership, supervision, capacity, or error policy for you.",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "An interface defines a method contract.", beamDifference: "A behaviour constrains module/function/arity entries, which callers still invoke as module functions.", watchFor: "Implementing one creates neither an object nor a thread." },
        { ecosystem: "Python", familiarModel: "An ABC or Protocol.", beamDifference: "Callback metadata helps tools check an implementation and lets OTP invoke it.", watchFor: "It is not a decorator that wraps runtime calls." },
        { ecosystem: "JavaScript", familiarModel: "A conventional object shape or TypeScript interface.", beamDifference: "A behaviour lives at the BEAM module and callback-entry level.", watchFor: "A type contract and a process lifecycle remain separate decisions." },
      ],
    },
    types: {
      designDecision: {
        question: "Why write specs if the code can run without them?",
        choice: "A spec leaves a function contract for people and Dialyzer. It is good at finding calls that cannot succeed; it does not guard every runtime value.",
        tradeoff: "A very broad spec says little, and an incorrect spec does not become runtime validation. Parse and validate data at system boundaries.",
      },
      comparisons: [
        { ecosystem: "Java", familiarModel: "The compiler performs static type checks during a build.", beamDifference: "Dialyzer uses success typing; its goal is not to prove that every input is safe.", watchFor: "A clean Dialyzer run cannot prevent a bad runtime message." },
        { ecosystem: "Python", familiarModel: "Type hints checked by mypy or pyright.", beamDifference: "Specs also serve tools and readers, but the analysis model differs.", watchFor: "A spec is not an input-validation library." },
        { ecosystem: "JavaScript", familiarModel: "TypeScript checks types before emitting JavaScript.", beamDifference: "BEAM still runs terms; Dialyzer looks for contradictions among calls that can succeed.", watchFor: "Files and network boundaries still need real validation." },
      ],
    },
  },
};

function defaultBeforeRun(
  locale: Locale,
  lesson: BasicLesson,
): LearningGuidance["beforeRun"] {
  if (locale === "zh") {
    return {
      predict: `先遮住输出。用一句话写下《${lesson.title}》例子最后会交回什么值。`,
      trace: "从第一行往下读。每遇到一个新名字，就指出它从哪里拿到值；每遇到一个分支，就说出它为什么被选中。",
      changeOne:
        lesson.stage === "project"
          ? "先运行原版，再只改一个验收输入。记录哪条测试或结果因此改变。"
          : "先运行原版，再只改一个数字、标签或输入。别同时改两处。",
    };
  }

  return {
    predict: `Cover the output first. Write one sentence predicting the final value in “${lesson.title}.”`,
    trace: "Read top to bottom. For each new name, point to the value it receives. For each branch, say why that branch wins.",
    changeOne:
      lesson.stage === "project"
        ? "Run the original, then change one acceptance input. Note which test or result moves."
        : "Run the original, then change one number, tag, or input. Keep everything else still.",
  };
}

export function getBasicLessonGuidance(
  locale: Locale,
  pathId: BasicPathId,
  lesson: BasicLesson,
): LearningGuidance {
  const topic = basicTopicByLesson[`${pathId}:${lesson.slug}`];
  return {
    beforeRun: defaultBeforeRun(locale, lesson),
    ...(topic ? basicComparisonCopy[locale][topic] : {}),
  };
}

const courseBeforeRun: Record<
  Locale,
  Record<string, LearningGuidance["beforeRun"]>
> = {
  zh: {
    "beam-mental-model": {
      predict: "三条 `add` 消息发出后，先在纸上写出计数进程每一轮的状态：0 → 1 → 3 → 6。",
      trace: "圈出 `self`、`spawn`、`send`、`receive` 与递归调用。分别标记：谁是地址、谁是信、谁保管状态。",
      changeOne: "删掉一种消息分支，再查 mailbox。先猜进程会退出，还是让那封信留在里面。",
    },
    "processes-and-mailboxes": {
      predict: "画出 request、timeout、迟到 reply 和 `DOWN` 的时间线。先猜哪一个最先被调用者看见。",
      trace: "把 request reference 与 monitor reference 涂成两种颜色。一个配对回复，一个报告进程退出。",
      changeOne: "把服务端延迟从短于 timeout 改成长于 timeout，只改这一处，再看 mailbox。",
    },
    "otp-behaviours": {
      predict: "同一件慢工作放进 `call`、`cast` 或独立 worker，先猜哪一种会堵住 server 的收信循环。",
      trace: "沿着公开 API、callback、state 三层画箭头。找出调用者在哪一层等待。",
      changeOne: "把一次慢工作留在 callback，再移到 worker。比较 mailbox 和响应时间。",
    },
    "supervision-trees": {
      predict: "让一个 child 退出前，先圈出你认为会换 PID 的进程。不要先看答案。",
      trace: "按启动顺序写下依赖。每一条父子线旁边补一句：为什么由它来重启。",
      changeOne: "只把策略从 `one_for_one` 改成 `rest_for_one`，再比较重启范围。",
    },
    "state-and-backpressure": {
      predict: "并发数不断升高时，先画三条趋势线：吞吐、P95 延迟、内存。哪一条会最先变坏？",
      trace: "把正在运行、正在等待、已经拒绝分成三格。确认每一格都有上限或计数。",
      changeOne: "只提高 `max_concurrency`。记录吞吐有没有变好，以及连接和内存付出了什么。",
    },
    "distributed-operations": {
      predict: "断开节点前，先写下：最后一份指标何时算 stale，未完成请求会看到什么，重试可能重复什么。",
      trace: "把 nodeup、request、nodedown、retry 排成时间线，并给每一项标上 node 与 reference。",
      changeOne: "只让两个节点的 cookie 不同。确认失败发生在连接层，不要先改业务代码。",
    },
    "shared-semantics": {
      predict: "先判断每一组 Elixir/Erlang 值在 BEAM 中是否真是同一个 term，再运行比较。",
      trace: "把语法外壳划掉，只留下 atom、tuple、list、binary 与 module/function/arity。",
      changeOne: "只把边界上的 charlist 换成 binary，检查哪一侧的模式需要跟着改变。",
    },
    interoperability: {
      predict: "在改 record 或 struct 前，先列出哪些字段允许跨边界，哪些只能留在模块内部。",
      trace: "从调用方走到 adapter，再走到 worker。圈出数据形状只该转换一次的位置。",
      changeOne: "只增加一个内部字段。若边界测试也坏了，回头找泄漏出去的内部形状。",
    },
    "reliable-scheduler": {
      predict: "写代码前先写四条不变量：容量、重试次数、持久性、幂等。每条都写清故障后允许丢什么。",
      trace: "沿一次任务标出 accepted、running、acked、retry、failed。找出每一次外部副作用。",
      changeOne: "只在 ack 前让 worker 退出。确认任务去向，并检查外部动作有没有重复。",
    },
  },
  en: {
    "beam-mental-model": {
      predict: "After three `add` messages, write the counter's states before running it: 0 → 1 → 3 → 6.",
      trace: "Circle `self`, `spawn`, `send`, `receive`, and the recursive call. Label the address, the message, and the state owner.",
      changeOne: "Remove one message branch and inspect the mailbox. Predict whether the process exits or the message stays.",
    },
    "processes-and-mailboxes": {
      predict: "Draw a timeline for the request, timeout, late reply, and `DOWN`. Predict which event the caller sees first.",
      trace: "Use two colors for the request reference and monitor reference. One pairs a reply; the other reports an exit.",
      changeOne: "Change only the server delay from shorter than the timeout to longer, then inspect the mailbox.",
    },
    "otp-behaviours": {
      predict: "Put one slow job in a `call`, a `cast`, or a separate worker. Predict which choice blocks the server's receive loop.",
      trace: "Draw arrows through public API, callback, and state. Mark where the caller waits.",
      changeOne: "Keep slow work in the callback, then move it to a worker. Compare mailbox length and response time.",
    },
    "supervision-trees": {
      predict: "Before a child exits, circle every process whose PID you expect to change.",
      trace: "Write dependencies in startup order. Add one sentence to each parent-child line: why should this parent restart it?",
      changeOne: "Change only `one_for_one` to `rest_for_one`, then compare the restart boundary.",
    },
    "state-and-backpressure": {
      predict: "As concurrency rises, sketch throughput, P95 latency, and memory. Which line turns bad first?",
      trace: "Separate running, waiting, and rejected work into three boxes. Give every box a limit or counter.",
      changeOne: "Raise only `max_concurrency`. Record whether throughput improves and what connections and memory pay.",
    },
    "distributed-operations": {
      predict: "Before disconnecting a node, state when its last metric becomes stale, what an unfinished request sees, and what a retry could repeat.",
      trace: "Place nodeup, request, nodedown, and retry on a timeline. Label every event with its node and reference.",
      changeOne: "Change only one node cookie. Confirm that failure occurs at connection time, before changing business code.",
    },
    "shared-semantics": {
      predict: "Decide whether each Elixir/Erlang pair is truly the same BEAM term before running the comparison.",
      trace: "Cross out the syntax shell and leave atoms, tuples, lists, binaries, and module/function/arity.",
      changeOne: "Change one boundary value from a charlist to a binary. See which pattern must change with it.",
    },
    interoperability: {
      predict: "Before changing a record or struct, list which fields may cross the boundary and which must remain private.",
      trace: "Walk from caller to adapter to worker. Circle the one place where a data shape should be translated.",
      changeOne: "Add one private field. If a boundary test breaks, find the internal shape that leaked out.",
    },
    "reliable-scheduler": {
      predict: "Before code, write four invariants: capacity, retry count, durability, and idempotency. State what each failure may lose.",
      trace: "Follow one job through accepted, running, acknowledged, retry, and failed. Mark every external side effect.",
      changeOne: "Stop a worker just before its acknowledgement. Trace the job and check whether an external action repeats.",
    },
  },
};

const courseDecisionCopy: Record<
  Locale,
  Record<string, NonNullable<LearningGuidance["designDecision"]>>
> = {
  zh: {
    "beam-mental-model": { question: "为什么不用一个共享对象，让所有人直接改？", choice: "让一个进程拥有状态，其他人只发消息。这样写入顺序与故障边界更清楚。", tradeoff: "消息与进程有成本。没有状态、生命周期或隔离需求的纯计算，普通函数更合适；进程也不天然更快。" },
    "processes-and-mailboxes": { question: "为什么 reply 要同时带 request reference？", choice: "同一个调用者可能收到迟到、乱序或无关消息。reference 让匹配说清“这是哪一次请求的回答”。", tradeoff: "timeout 不是取消。还需决定迟到回复、服务退出和 monitor 清理。" },
    "otp-behaviours": { question: "为什么把手写 loop 换成 GenServer/gen_server？", choice: "OTP 统一启动、同步调用、异步消息和系统消息的规则，让工具与监督者都能认识它。", tradeoff: "框架不会自动给容量上限，也不会让慢 callback 变快。" },
    "supervision-trees": { question: "为什么让监督者重启，而不是到处 try/catch？", choice: "局部进程无法继续时，监督者能按依赖关系恢复一个已知初始状态。", tradeoff: "预期业务错误仍应正常返回；重启也不会恢复已丢数据或撤回外部副作用。" },
    "state-and-backpressure": { question: "为什么既限制运行数，也限制等待数？", choice: "并发上限保护正在使用的资源；队列上限阻止等待工作悄悄吃光内存。满载时系统必须承认 busy。", tradeoff: "`async_stream` 能限制同时运行数，却不是完整的持久有界队列。入口容量仍要另行设计。" },
    "distributed-operations": { question: "为什么节点能互发消息，还要写断线协议？", choice: "相近的发送写法只解决连接后的表达。网络仍会延迟、分区，旧数据也会假装新鲜。", tradeoff: "重试提高成功机会，也会重复副作用；需要 stale、幂等和次数上限。" },
    "shared-semantics": { question: "为什么先对齐 term，再谈双语调用？", choice: "Elixir 与 Erlang 共用 BEAM term。先把 atom、tuple、binary 与错误契约对齐，边界才不靠猜。", tradeoff: "共享 VM 不代表 struct、record 和文字写法自动兼容。" },
    interoperability: { question: "为什么要多一层 adapter？", choice: "adapter 把内部 record/struct 翻译成稳定 term，把变化关在边界一处。", tradeoff: "小项目多一层代码，但能避免内部字段变化扩散到所有调用者。" },
    "reliable-scheduler": { question: "为什么先写保证清单，再画进程树？", choice: "容量、ack、持久性和幂等决定系统真正能承诺什么，进程结构只是实现这些承诺的工具。", tradeoff: "只用内存队列时，应诚实写成“运行中有限重试”，不能声称跨 VM 重启的至少一次。" },
  },
  en: {
    "beam-mental-model": { question: "Why not let every worker mutate one shared object?", choice: "One process owns the state; everyone else sends messages. Update order and failure boundaries become explicit.", tradeoff: "Processes and messages have a cost. Pure computation without state, lifecycle, or isolation is often clearer as a function, and a process is not automatically faster." },
    "processes-and-mailboxes": { question: "Why carry a request reference in every reply?", choice: "One caller can receive late, out-of-order, or unrelated messages. A reference states which request this answer belongs to.", tradeoff: "A timeout is not cancellation. Late replies, server exits, and monitor cleanup still need policy." },
    "otp-behaviours": { question: "Why replace a hand-written loop with GenServer/gen_server?", choice: "OTP standardizes startup, calls, casts, and system messages so supervisors and tools recognize the service.", tradeoff: "The framework does not create capacity limits or make a slow callback fast." },
    "supervision-trees": { question: "Why restart under a supervisor instead of catching errors everywhere?", choice: "When a local process cannot continue, a supervisor can restore a known initial state according to real dependencies.", tradeoff: "Expected business errors still return normally. Restarting cannot restore lost data or undo an external side effect." },
    "state-and-backpressure": { question: "Why bound both running work and waiting work?", choice: "A concurrency limit protects active resources. A queue limit stops waiting work from quietly consuming all memory. At capacity, the service must admit it is busy.", tradeoff: "`async_stream` limits running tasks; it is not a complete durable bounded queue. Admission still needs its own design." },
    "distributed-operations": { question: "Why design a disconnect protocol if nodes can already send messages?", choice: "A convenient send syntax helps only after connection. Networks still delay and partition, and old data can look current.", tradeoff: "Retries improve the chance of success but can repeat effects, so stale markers, idempotency, and retry limits travel together." },
    "shared-semantics": { question: "Why align terms before making cross-language calls?", choice: "Elixir and Erlang share BEAM terms. Agree on atoms, tuples, binaries, and error results before crossing the boundary.", tradeoff: "A shared VM does not make structs, records, and text conventions automatically compatible." },
    interoperability: { question: "Why add an adapter layer?", choice: "An adapter translates private records or structs into stable terms, keeping change at one boundary.", tradeoff: "It adds a small layer now and prevents one internal field change from spreading through every caller." },
    "reliable-scheduler": { question: "Why write a guarantee ledger before drawing a process tree?", choice: "Capacity, acknowledgements, durability, and idempotency define the promise. A process tree is one tool for keeping it.", tradeoff: "With only an in-memory queue, promise bounded retries while the cluster is running—not at-least-once delivery across a full VM restart." },
  },
};

const courseComparisonCopy: Record<
  Locale,
  Record<string, EcosystemComparison[]>
> = {
  zh: {
    "beam-mental-model": [
      { ecosystem: "Java", familiarModel: "线程、虚拟线程与共享对象。", beamDifference: "BEAM 进程默认隔离内存，以 mailbox 传 term。", watchFor: "现代 Java 也有虚拟线程；关键差别仍是状态归属与故障语义。" },
      { ecosystem: "Python", familiarModel: "threading、multiprocessing 或 asyncio task。", beamDifference: "BEAM 进程由 VM 抢占调度，并有独立 mailbox。", watchFor: "Python 有不同运行时与 free-threaded 构建，不要把 GIL 写成永久定律。" },
      { ecosystem: "JavaScript", familiarModel: "event loop、Promise 与 Worker。", beamDifference: "大量 BEAM 进程各自等待消息，不共享一个应用级回调队列。", watchFor: "JS Worker 也能隔离；不要说 JavaScript 永远只有一个线程。" },
    ],
    "processes-and-mailboxes": [
      { ecosystem: "Java", familiarModel: "Future、CompletableFuture 与 executor。", beamDifference: "reply 是普通 mailbox 消息，需要 reference 配对；monitor 另行报告退出。", watchFor: "等待超时通常不等于远端工作已经取消。" },
      { ecosystem: "Python", familiarModel: "await、Future 与 Queue。", beamDifference: "receive 可以按模式选择消息，未匹配消息仍留下。", watchFor: "选择性接收会反复扫描 mailbox，不能无限堆积。" },
      { ecosystem: "JavaScript", familiarModel: "Promise resolve/reject。", beamDifference: "request/reply 是自己约定的消息协议，不是 VM 自动生成的 Promise。", watchFor: "timeout 后的 reply 仍可能到达。" },
    ],
    "otp-behaviours": [
      { ecosystem: "Java", familiarModel: "interface 加 service object。", beamDifference: "behaviour 约定 callback；GenServer 还带一套进程协议。", watchFor: "一个 GenServer 串行处理 callback，不是自动线程池。" },
      { ecosystem: "Python", familiarModel: "ABC/Protocol 加长期运行的 task。", beamDifference: "API 与 callback 被刻意分开，状态由一个进程拥有。", watchFor: "cast 只是不等 reply，不代表没有积压。" },
      { ecosystem: "JavaScript", familiarModel: "class、event emitter 或 async handler。", beamDifference: "call/cast 与系统消息都进入同一进程协议。", watchFor: "慢 callback 会挡住后面的消息。" },
    ],
    "supervision-trees": [
      { ecosystem: "Java", familiarModel: "捕获异常、容器重启或线程池替换 worker。", beamDifference: "监督树把进程依赖与局部恢复写进应用内部。", watchFor: "不是所有错误都靠 crash；预期结果仍走返回值。" },
      { ecosystem: "Python", familiarModel: "try/except、task group 与外部进程管理器。", beamDifference: "link 与退出信号让监督关系成为运行时协议。", watchFor: "重启不会自动补回内存状态。" },
      { ecosystem: "JavaScript", familiarModel: "catch、worker exit 与进程管理器。", beamDifference: "监督者按 child spec 和策略决定恢复范围。", watchFor: "重启不能撤销已经发出的 HTTP 请求。" },
    ],
    "state-and-backpressure": [
      { ecosystem: "Java", familiarModel: "bounded executor、Semaphore 与 BlockingQueue。", beamDifference: "BEAM 仍需同时限制 worker、mailbox 或等待队列。", watchFor: "虚拟线程便宜，也不会让数据库连接变无限。" },
      { ecosystem: "Python", familiarModel: "asyncio.Semaphore、Queue 与 worker pool。", beamDifference: "异步消息很便宜，但 mailbox 默认没有容量上限。", watchFor: "协程数量和外部资源容量不是同一个数字。" },
      { ecosystem: "JavaScript", familiarModel: "Promise 批次、p-limit 或 stream backpressure。", beamDifference: "spawn/cast 让调用者先走，却可能把等待转移到进程信箱。", watchFor: "异步不等于有界。" },
    ],
    "distributed-operations": [
      { ecosystem: "Java", familiarModel: "RPC、消息代理或集群框架。", beamDifference: "远程 PID 发送写起来接近本地发送，但失败语义仍是网络语义。", watchFor: "方便的调用形式不提供恰好一次。" },
      { ecosystem: "Python", familiarModel: "HTTP/RPC、Celery 等任务队列。", beamDifference: "节点事件也以 BEAM 消息进入应用。", watchFor: "看到 `nodedown` 不等于知道断线原因。" },
      { ecosystem: "JavaScript", familiarModel: "fetch、WebSocket 或队列消费者。", beamDifference: "同一 VM 模型能延伸到节点间，但边界仍要有 timeout 与幂等。", watchFor: "网络分区不会因为语法短而消失。" },
    ],
    "shared-semantics": [
      { ecosystem: "Java", familiarModel: "两种 JVM 语言共享 bytecode 与对象模型。", beamDifference: "Elixir/Erlang 共享 BEAM term 与 module/function/arity，但表层类型约定仍可能不同。", watchFor: "record 与 struct 不是同一个公开 DTO。" },
      { ecosystem: "Python", familiarModel: "模块之间直接传 dict、tuple、bytes。", beamDifference: "共享 term 让互调直接，模式会把边界形状写得更严格。", watchFor: "charlist 与 binary 都像文字，却不是同一种 term。" },
      { ecosystem: "JavaScript", familiarModel: "模块共享对象或通过 JSON 交换。", beamDifference: "同 VM 内不必先 JSON，但仍应约定稳定 term。", watchFor: "能直接传，不等于应该泄漏内部结构。" },
    ],
    interoperability: [
      { ecosystem: "Java", familiarModel: "adapter/DTO 隔开两个模块或 JVM 语言。", beamDifference: "adapter 在 record、struct、binary 与错误 tuple 之间翻译。", watchFor: "不要按 tuple 位置偷读私有 record。" },
      { ecosystem: "Python", familiarModel: "边界函数把第三方对象转成 dataclass/dict。", beamDifference: "稳定 term 让两种 BEAM 语言共用协议。", watchFor: "异常也要在 adapter 处翻译。" },
      { ecosystem: "JavaScript", familiarModel: "API schema 或 anti-corruption layer。", beamDifference: "边界可能不经过网络，也仍值得固定形状。", watchFor: "内部方便不能替代公开契约。" },
    ],
    "reliable-scheduler": [
      { ecosystem: "Java", familiarModel: "executor、持久队列与 Spring Batch。", beamDifference: "监督树恢复进程；ack、持久化与幂等另外决定任务保证。", watchFor: "进程重启不等于任务已经持久化。" },
      { ecosystem: "Python", familiarModel: "Celery/RQ 的 ack、retry 与 worker。", beamDifference: "BEAM 能在应用内表达 worker 生命周期，但投递保证仍取决于存储和协议。", watchFor: "至少一次意味着业务可能看见重复。" },
      { ecosystem: "JavaScript", familiarModel: "BullMQ、云队列与 Promise worker。", beamDifference: "OTP 负责恢复边界，队列协议负责任务状态。", watchFor: "retry 必须和幂等、退避、死信去向一起设计。" },
    ],
  },
  en: {
    "beam-mental-model": [
      { ecosystem: "Java", familiarModel: "Threads, virtual threads, and shared objects.", beamDifference: "BEAM processes isolate memory by default and exchange terms through mailboxes.", watchFor: "Modern Java has virtual threads; state ownership and failure semantics remain the useful comparison." },
      { ecosystem: "Python", familiarModel: "threading, multiprocessing, or asyncio tasks.", beamDifference: "The VM preemptively schedules BEAM processes, each with its own mailbox.", watchFor: "Python has multiple runtimes and free-threaded builds; do not turn the GIL into a timeless rule." },
      { ecosystem: "JavaScript", familiarModel: "An event loop, Promises, and Workers.", beamDifference: "Many BEAM processes wait on their own mailboxes instead of sharing one application callback queue.", watchFor: "JavaScript Workers also isolate work; JavaScript is not simply ‘always single-threaded.’" },
    ],
    "processes-and-mailboxes": [
      { ecosystem: "Java", familiarModel: "Future, CompletableFuture, and executors.", beamDifference: "A reply is an ordinary mailbox message paired by a reference; a monitor separately reports exit.", watchFor: "A waiting timeout rarely proves that remote work was cancelled." },
      { ecosystem: "Python", familiarModel: "await, Future, and Queue.", beamDifference: "`receive` selects by pattern, leaving unmatched messages in place.", watchFor: "Selective receive can rescan a mailbox; growth still needs a bound." },
      { ecosystem: "JavaScript", familiarModel: "Promise resolve or reject.", beamDifference: "Request and reply are an explicit message protocol, not a Promise created by the VM.", watchFor: "A reply may still arrive after timeout." },
    ],
    "otp-behaviours": [
      { ecosystem: "Java", familiarModel: "An interface plus a service object.", beamDifference: "A behaviour defines callbacks; GenServer adds a process protocol.", watchFor: "One GenServer runs callbacks serially. It is not an automatic thread pool." },
      { ecosystem: "Python", familiarModel: "An ABC/Protocol plus a long-running task.", beamDifference: "The public API and callback layer are intentionally separate, with one process owning state.", watchFor: "A cast skips a reply; it does not remove queue pressure." },
      { ecosystem: "JavaScript", familiarModel: "A class, event emitter, or async handler.", beamDifference: "Calls, casts, and system messages share one process protocol.", watchFor: "A slow callback delays the messages behind it." },
    ],
    "supervision-trees": [
      { ecosystem: "Java", familiarModel: "Catching exceptions, container restarts, or replacing pool workers.", beamDifference: "A supervision tree keeps process dependencies and local recovery inside the application.", watchFor: "Expected outcomes still return as data; not every error should crash." },
      { ecosystem: "Python", familiarModel: "try/except, task groups, and external process managers.", beamDifference: "Links and exit signals make supervision a runtime protocol.", watchFor: "A restart does not restore lost in-memory state." },
      { ecosystem: "JavaScript", familiarModel: "catch, Worker exits, and process managers.", beamDifference: "A supervisor chooses a recovery boundary from child specs and strategy.", watchFor: "Restarting cannot retract an HTTP request already sent." },
    ],
    "state-and-backpressure": [
      { ecosystem: "Java", familiarModel: "Bounded executors, Semaphore, and BlockingQueue.", beamDifference: "BEAM still needs limits for workers, mailboxes, or waiting queues.", watchFor: "Cheap virtual threads do not create infinite database connections." },
      { ecosystem: "Python", familiarModel: "asyncio.Semaphore, Queue, and worker pools.", beamDifference: "Messages are cheap, but a mailbox has no natural capacity limit.", watchFor: "Coroutine count and external-resource capacity are different numbers." },
      { ecosystem: "JavaScript", familiarModel: "Promise batches, p-limit, or stream backpressure.", beamDifference: "spawn or cast lets the caller move on but may transfer waiting into a mailbox.", watchFor: "Asynchronous is not the same as bounded." },
    ],
    "distributed-operations": [
      { ecosystem: "Java", familiarModel: "RPC, brokers, or clustering frameworks.", beamDifference: "Sending to a remote PID looks close to local send, but its failure semantics are still network semantics.", watchFor: "A convenient call form does not provide exactly-once delivery." },
      { ecosystem: "Python", familiarModel: "HTTP/RPC or task queues such as Celery.", beamDifference: "Node events also arrive as BEAM messages the application can handle.", watchFor: "A `nodedown` event does not explain why the connection failed." },
      { ecosystem: "JavaScript", familiarModel: "fetch, WebSocket, or queue consumers.", beamDifference: "The same VM model reaches across nodes, but boundaries still need timeouts and idempotency.", watchFor: "Short syntax cannot erase a network partition." },
    ],
    "shared-semantics": [
      { ecosystem: "Java", familiarModel: "Two JVM languages sharing bytecode and an object model.", beamDifference: "Elixir and Erlang share BEAM terms and module/function/arity, while surface conventions can still differ.", watchFor: "A record and struct are not one public DTO." },
      { ecosystem: "Python", familiarModel: "Modules passing dicts, tuples, and bytes directly.", beamDifference: "Shared terms make calls direct, while patterns make boundary shapes explicit.", watchFor: "A charlist and binary can both look textual but are different terms." },
      { ecosystem: "JavaScript", familiarModel: "Modules sharing objects or exchanging JSON.", beamDifference: "Code in one VM needs no JSON step, but it still needs a stable term contract.", watchFor: "The ability to pass internals is not a reason to expose them." },
    ],
    interoperability: [
      { ecosystem: "Java", familiarModel: "Adapters and DTOs between modules or JVM languages.", beamDifference: "The adapter translates records, structs, binaries, and error tuples.", watchFor: "Do not read a private record by tuple position." },
      { ecosystem: "Python", familiarModel: "A boundary function translating third-party objects into dataclasses or dicts.", beamDifference: "Stable terms give two BEAM languages one protocol.", watchFor: "Translate exceptions at the adapter as well." },
      { ecosystem: "JavaScript", familiarModel: "An API schema or anti-corruption layer.", beamDifference: "The boundary may stay inside one VM and still deserves a fixed shape.", watchFor: "Internal convenience is not a public contract." },
    ],
    "reliable-scheduler": [
      { ecosystem: "Java", familiarModel: "Executors, durable queues, and batch frameworks.", beamDifference: "Supervision restores processes; acknowledgements, persistence, and idempotency determine job guarantees.", watchFor: "A process restart does not mean a job was persisted." },
      { ecosystem: "Python", familiarModel: "Celery/RQ acknowledgements, retries, and workers.", beamDifference: "BEAM expresses worker lifecycle in the application, while storage and protocol still decide delivery guarantees.", watchFor: "At-least-once means the business may observe duplicates." },
      { ecosystem: "JavaScript", familiarModel: "BullMQ, cloud queues, and Promise workers.", beamDifference: "OTP owns recovery boundaries; the queue protocol owns job state.", watchFor: "Retry belongs with idempotency, backoff, and a final-failure destination." },
    ],
  },
};

function genericCourseBeforeRun(
  locale: Locale,
  courseModule: CourseModule,
): LearningGuidance["beforeRun"] {
  return locale === "zh"
    ? {
        predict: `先不看结论。用一句话回答本站问题：${courseModule.question}`,
        trace: "把输入、可观察结果和失败位置各写一行。运行时只找这三样。",
        changeOne: "先跑通原实验，再只改变一个条件。记录结果变在问题的哪一层。",
      }
    : {
        predict: `Before reading the conclusion, answer this station's question in one sentence: ${courseModule.question}`,
        trace: "Write one line each for input, observable result, and failure location. Look only for those three things while running.",
        changeOne: "Run the original experiment, then change one condition. Record which layer of the problem moves.",
      };
}

export function getCourseLearningGuidance(
  locale: Locale,
  courseModule: CourseModule,
): LearningGuidance {
  return {
    beforeRun:
      courseBeforeRun[locale][courseModule.slug] ??
      genericCourseBeforeRun(locale, courseModule),
    designDecision: courseDecisionCopy[locale][courseModule.slug],
    comparisons: courseComparisonCopy[locale][courseModule.slug],
  };
}
