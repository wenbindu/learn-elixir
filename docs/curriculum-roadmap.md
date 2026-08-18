# BEAM Path 课程重构路线

本文把当前语言基础课、BEAM 主线和 Case Chat 串成一条可以实施、检查和逐步发布的
课程路线。目标不是继续增加知识点，而是让学习者知道自己已经会什么、下一步为什么要学，
并能用一次真实故障实验证明理解。

本文只描述课程结构与数据约定，不要求一次完成全部改造。文案细节继续遵守
[BEAM Path 文案与讲解准则](./content-style-guide.md)。

## 1. 现状

### 1.1 已有课程

- Elixir From Scratch 共 31 课，分为 Scratch、Foundation、Intermediate 和 Project。
- Erlang From Scratch 使用相同的四段结构。
- BEAM 主线从工具诊断开始，继续讲进程、消息、OTP、监督树、容量、分布式和互操作。
- Case Chat 通过一个 Elixir 语音服务，展示 Mix、Application、Supervisor、WebSocket、
  Recorder 进程和浏览器代码怎样一起工作。

当前结构已经有三个优点：

- 语言课先让学习者运行代码，再逐步进入项目、测试和工具。
- BEAM 主线从故障问题出发，不只罗列 API。
- Case Chat 使用真实项目和真实源码，不是另一个孤立的玩具示例。

### 1.2 当前断点

| 断点 | 现在发生什么 | 学习者可能怎样理解 |
| --- | --- | --- |
| 语言线结业入口 | Elixir 第 31 课后仍进入工具诊断起跑线 | 已经会用 Mix，却像从头开始 |
| 单语言与双语路线 | Elixir 学习者较早进入 Elixir/Erlang 共享语义 | 以为学并发前必须先学第二门语言 |
| 纯函数到进程 | 文件统计项目后直接看到 PID、spawn、send、receive 和匿名递归循环 | 每个新符号都认识得很慢，也不知道为什么需要进程 |
| 模式匹配到 request/reply | 基础课没有讲 pin operator，主线直接使用 `^ref` | 把匹配已有 reference 误读成创建新变量 |
| 进程退出到监督树 | link 和 monitor 有定义，没有完整的最小运行实验 | 知道名词，却无法预测进程退出后的消息和影响 |
| GenServer 到 Supervisor | 复杂 child 列表先于最小 child spec 和 Application 启动过程 | 会照抄树，却说不清 `start_link` 和重启边界 |
| 并发上限到背压 | `Task.async_stream`、bounded queue 和 busy 拒绝容易混在一起 | 以为限制正在运行的 Task 就等于限制所有入站工作 |
| 主线到终点项目 | 综合项目默认同时要求 Elixir 与 Erlang | 单语言学习者在终点前失去连续性 |
| 主线到 Case Chat | 首页只有一个“打开案例”链接 | 容易把案例当作附录阅读，而不是一次能力验收 |

## 2. 目标学习路径

### 2.1 路线原则

1. 学完 Elixir 或 Erlang 任意一条 Foundation，即可进入 BEAM 核心主线。
2. 学完任意一条完整语言线，可以跳过安装与 Mix 入门诊断。
3. 第二门语言、共享语义与互操作是双语扩展，不是理解进程和 OTP 的前置条件。
4. 语言课保留纯函数、数据和项目工具的边界。进程、Supervisor 和分布式留在主线。
5. 主线先完成单语言版本，再选择双语实现。学习者不会因为暂时只会一门语言而卡住。
6. Case Chat 是最后一次真实案例验收。学习者要留下图、实验结果和判断，不能只读完页面。

### 2.2 Elixir 到 BEAM

推荐顺序：

```text
Elixir Foundation 或 Elixir 31 课
  -> 从纯函数到进程的桥接实验
  -> beam-mental-model
  -> processes-and-mailboxes
  -> otp-behaviours
  -> supervision-trees
  -> state-and-backpressure
  -> distributed-operations
  -> 单语言 reliable-scheduler
  -> Case Chat
```

完成 Elixir 31 课时，主按钮直接进入 `beam-mental-model`。只有环境检查失败时，才通过
次按钮返回 `start-line`。

### 2.3 Erlang 到 BEAM

Erlang 路线使用同一组能力门槛：

```text
Erlang Foundation 或 Erlang 31 课
  -> 从纯函数到进程的桥接实验
  -> beam-mental-model
  -> processes-and-mailboxes
  -> otp-behaviours
  -> supervision-trees
  -> state-and-backpressure
  -> distributed-operations
  -> 单语言 reliable-scheduler
  -> Case Chat 或后续 Erlang 案例
```

Case Chat 的实现语言是 Elixir。Erlang 学习者进入案例前，应有一张最小 Elixir 阅读卡，
只解释模块名、atom、tuple、调用写法和 `do/end`，不要求先完成整条 Elixir 路线。

### 2.4 双语扩展

双语路线从核心主线分出，不挡住并发课程：

```text
任意单语言核心主线
  -> 第二门语言 Foundation 或跳级诊断
  -> shared-semantics
  -> interoperability
  -> 双语 reliable-scheduler 扩展
```

`shared-semantics` 最适合放在 `interoperability` 之前。它回答的是两门语言怎样共享 term
与协议，不是 BEAM 进程入门的前置问题。

## 3. 实施优先级

### 3.1 P0：先修通学习路径

P0 完成后，学习者应能从任意一门语言自然进入进程主线，并完成单语言终点项目。

| 工作项 | 插入位置 | 实施动作 | 验收标准 |
| --- | --- | --- | --- |
| 改结业入口 | Elixir/Erlang 第 31 课 bridge | 主链接指向 `beam-mental-model`，工具诊断作为次链接 | 已完成语言项目的学习者不必重复安装与 Mix 入门 |
| 增加路线配置 | 课程目录数据层 | 明确 `elixirToBeam`、`erlangToBeam`、`bilingual` 三条路线 | 页面不再只靠数组顺序推断“下一课” |
| 增加桥接实验 | 第 31 课结尾与 `beam-mental-model` 之间 | 比较一次纯函数调用和一个持续保管状态的进程 | 学习者能说出“为什么此处需要进程”，也能指出纯函数仍放在哪里 |
| 拆开进程原语 | `beam-mental-model` 完整 counter 之前 | 依次讲 PID、`self/0`、`spawn/1`、`send/2`、`receive` | 每个微实验只引入一个主要动作，并可直接运行 |
| 使用命名消息循环 | `beam-mental-model` 第一个有状态例子 | 先用 `loop(state)` 承接基础课命名递归，再把匿名递归作为扩展 | 学习者不必同时理解进程和匿名函数自传技巧 |
| 补 pin operator | 基础 `pattern-matching` 末尾，主线 `^ref` 前复习 | 对比新绑定 `ref` 与匹配已有值 `^ref` | 学习者能预测错误 reference 不会命中 reply 分支 |
| 补 monitor 实验 | `processes-and-mailboxes` 的迟到回复实验之后 | 运行 `Process.monitor/1`，接收带同一 monitor ref 和 PID 的 `DOWN` | 学习者能区分 timeout 与进程退出，并看到真实消息 |
| 调整双语站位置 | 路线配置 | 从单语言核心路线移出 `shared-semantics`，在互操作前进入 | 不会 Erlang 的学习者仍能连续完成进程、OTP 和监督树 |
| 拆分终点项目 | `reliable-scheduler` | A 档单语言必做，B 档双语 worker/adapter 选做 | 单语言项目能独立通过容量、timeout、retry 和监督验收 |

### 3.2 P1：补齐设计判断

P1 不追求更多 API。重点是让学习者知道什么时候用、什么时候不用。

| 工作项 | 插入位置 | 要回答的问题 | 验收标准 |
| --- | --- | --- | --- |
| 设计选择卡 | 基础 18、20、21、22、28 | tuple 还是异常、Enum 还是 Stream、protocol 还是 behaviour、纯核心还是 IO 外壳 | 每张卡至少写出一个适用场景和一个代价 |
| 函数与进程对照 | `beam-mental-model` 开头 | 进程是否会让普通计算自动变快 | 学习者会把无状态计算留在普通函数中 |
| raw loop 与 GenServer 对照 | `otp-behaviours` 代码前 | 为什么先手写 receive，又为什么生产代码常用 GenServer | 学习者能指出 GenServer 提供的章法和没有提供的容量策略 |
| 最小 Supervisor | `supervision-trees` 复杂 children 列表前 | child spec、`start_link` 和 Application 根树分别做什么 | 先成功重启一个 Counter，再进入 Registry 与 DynamicSupervisor |
| 并发与入站容量分开 | `state-and-backpressure` 的 `Task.async_stream` 后 | active task 上限是否等于 bounded admission queue | 文案明确运行上限、等待上限和满载策略是三件事 |
| ETS 最小生命周期实验 | `state-and-backpressure` 的 ETS 概念旁 | 表由谁拥有，owner 退出后怎样 | 若不补实验，则从 outcomes 中移除 ETS 能力要求 |
| 节点启动脚本 | `distributed-operations` 的 `Node.ping/1` 前 | 两个节点怎样用相同 cookie 启动 | 两个终端均有可复制命令，能稳定得到 `:pong` 和 `nodedown` |
| 运行前思考卡 | 所有主线代码之前 | 运行前应预测什么、观察什么、只改哪一处 | 答案默认隐藏，运行后才能展开对照 |
| 生态对照卡 | 关键概念首次跨越处 | Java、Python、JavaScript 中相似的工具哪里不同 | 每张卡只说明一个差异，并写清类比边界 |

### 3.3 P2：统一体验与维护方式

- 英文 Foundation、Intermediate 和 Project 不再完全依靠生成器重复同一组 `plain` 与
  `steps`。数据 seed 应允许逐课写作，生成内容只作为缺省值。
- 中文主线每个阶段保留一个真正有帮助的历史或文学比喻。其余场景可使用快递单号、
  食堂窗口、班级值日和排队取号，避免驿站、营寨、粮草、烽火连续出现后互相混淆。
- 英文不要逐字翻译虎符、营寨和粮草调度。可改为 parcel tracking、service dependency、
  dispatch queue 等日常工程场景。
- 英文项目少用 `promise` 表示课程约定，避免与 JavaScript `Promise` 混淆。优先使用
  `contract`、`acceptance example` 和 `acceptance criteria`。
- 为中英文内容保存相同的能力标记和实验标准。场景、人物、标题可以本地化，技术目标
  不能漂移。
- 为课程数据增加结构自检：每条路线的 `requires` 必须由前面站点的 `provides` 满足；
  本地化版本必须保留相同的 capability、scenario key 和验收数量。

## 4. 关键知识断层

### 4.1 从纯函数到进程

桥接实验不应把原来的项目推翻。它应展示“纯核心，进程外壳”：

1. 先直接调用 `TrailStats.count(lines)` 或 `Cleaner.run(records)`。
2. 再提出新条件：文件会持续到达，需要保留累计结果，并允许别的代码查询。
3. 让一个进程拥有累计状态，消息只负责交付命令和查询。
4. 进程收到消息后，仍调用原来的纯函数完成数据转换。
5. 最后比较：状态归谁、谁能失败、谁会等待、哪里可能积压。

这一步要明确：进程不是“更高级的函数”，也不保证更快。它增加的是状态所有权、生命周期、
消息边界和故障隔离。

### 4.2 从命名递归到消息循环

基础课已经讲过 `sum/2` 一类命名递归。第一版进程循环应沿用这个结构：

```elixir
defp loop(total) do
  receive do
    {:add, number} -> loop(total + number)
    {:read, caller} ->
      send(caller, {:total, total})
      loop(total)
  end
end
```

匿名函数自传、尾调用优化和更紧凑的写法可以放在“看懂别人的代码”扩展中。第一遍不要让
匿名递归抢走进程模型的注意力。

### 4.3 从模式匹配到消息关联

基础 `pattern-matching` 应增加三步：

1. `ref = make_ref()` 先绑定一个值。
2. `{:reply, ref, value}` 中的 `ref` 是一个新的模式绑定。
3. `{:reply, ^ref, value}` 才要求消息中的 reference 与已有值相同。

主线随后用两次请求制造乱序。过关标准不是背出 pin 的名字，而是不会把第一条迟到 reply
交给第二次调用。

### 4.4 从 timeout 到进程退出

timeout、取消和退出必须分开：

- timeout 只停止调用者等待。
- request 可能仍在服务端执行。
- monitor 在被观察者退出后送来 `DOWN`。
- link 传播退出联系，不等于 monitor，也不等于自动重启。
- Supervisor 根据 child spec 和策略决定是否重启。

应先运行 monitor，再介绍 `start_link`。否则学习者容易把 `link` 当作命名习惯。

### 4.5 从 GenServer 到 Application 和 Supervisor

第一棵树只放一个已学过的 Counter。学习者先观察 PID 变化，再读完整 child spec：

```text
id       这个 child 怎样被区分
start    用哪个模块、函数和参数启动
restart  哪种退出需要重启
type     worker 还是 supervisor
```

之后再解释 Application 如何启动根 Supervisor。Registry、DynamicSupervisor 和
`rest_for_one` 放到第二个实验，避免一次引入三种新组件。

### 4.6 从有界并发到背压

课程必须分开三个上限：

- 正在运行多少任务。
- 最多允许多少任务等待。
- 满载后等待、拒绝还是降级。

`Task.async_stream` 能限制同时运行的任务，但不能自动替一个持续接收请求的服务定义
`queue_full` 协议。终点项目必须实际制造满载，并让调用者看到明确的 busy 结果。

## 5. 运行前思考规则

每个重要实验在代码前固定显示三类问题：

1. `predict`：先写下结果或故障会是什么。
2. `trace`：标出状态、消息、文件或网络信号从哪里到哪里。
3. `changeOne`：运行后只改一个条件，再比较结果。

建议题目：

| 站点 | 运行前问题 |
| --- | --- |
| `beam-mental-model` | 谁拥有 `total`？`send` 返回是否表示消息已经处理？ |
| `processes-and-mailboxes` | timeout 后服务端是否停止？迟到 reply 会去哪里？ |
| `otp-behaviours` | cast 不等待，等待和压力被放到了哪里？ |
| `supervision-trees` | 哪个 child 退出后，哪些 PID 应改变？为什么？ |
| `state-and-backpressure` | 输入突然增加时，CPU、连接、内存和 mailbox 哪个先到上限？ |
| `distributed-operations` | 本地看到 timeout 时，远端有没有可能已经完成？ |
| `reliable-scheduler` | fault 前后 queued、running、retry 哪些等式必须成立？ |

答案应在运行后展开。页面不应在代码上方直接泄露结果。

## 6. Java、Python 与 JavaScript 对照原则

### 6.1 写法原则

- 对照用于拆掉旧假设，不用于证明某门语言更好。
- 每张卡只讲一个相似处和一个关键差异。
- 不把生态中的常见做法写成语言绝对规则。例如 Python 还有 multiprocessing，
  Java 也可使用 actor 框架，JavaScript 也有 Worker。
- 第一次先解释 Elixir/BEAM 自己的机制，再放对照。学习者无需会三门语言。
- 每张卡必须写一个 `commonTrap`，说明照搬旧经验可能在哪里出错。

### 6.2 建议对照点

| 插入位置 | 熟悉感 | 必须说清的差异 |
| --- | --- | --- |
| 基础 10 真值 | Java 的 boolean，Python/JS 的 truthy/falsy | Elixir 只有 `false` 和 `nil` 为假 |
| 基础 11、16 数据更新 | object、dict、array、class | Elixir 更新返回新 map/struct；struct 不是带实例方法的 class |
| 基础 13 函数子句 | overload、单函数体中的 if/switch | Elixir 按 name/arity、pattern 和 guard 自上而下选择子句 |
| 基础 18 结果约定 | exception、result object | 预期失败常作为 tagged tuple 返回；异常保留给无法继续的情况 |
| 基础 20 Stream | Python generator、JS iterator、Java Stream | Elixir Stream 先描述工作，由 Enum 等消费者触发 |
| 基础 21、22 | interface、ABC、TypeScript interface | protocol 按数据类型 dispatch；behaviour 约束模块 callback，本身不创建进程 |
| 基础 23 | type hints、JSDoc、静态类型 | typespec 不做运行时校验；Dialyzer 的 success typing 也不等同 Java/TypeScript 编译检查 |
| 主线进程入门 | thread、asyncio task、event loop、Promise | BEAM process 有隔离状态和 mailbox；`receive` 只停当前 BEAM process |
| 主线 request/reply | Future、Task、AbortController | timeout 不会自动撤回消息或取消远端工作 |
| 主线 GenServer | class、thread、async function | GenServer 是串行处理 mailbox 的状态所有者，不是普通对象容器 |
| 主线有界并发 | Executor、semaphore、`Promise.all` | 是否异步与是否有容量上限是两件事 |

## 7. 本地化原则

### 7.1 中文

- 保留阿青、小满、长安、书院等自然人物与场景。
- 历史和文学比喻只保留最能解释机制的一处，不让多个相近的运输或军事故事连续出现。
- 每个正式英文术语首次出现时，先给中文动作，再保留原名。例如“回信编号
  （correlation identifier）”。
- 继续使用短句。不要用比喻代替消息顺序、失败范围和容量等技术事实。

### 7.2 英文

- 标题和任务使用自然、直接的动词，不逐字翻译中文修辞。
- `matching seal`、`chain of camps`、`supply convoy` 等直译场景可换成 parcel tracking、
  service dependency 和 dispatch queue。
- 避免用 `promise` 表示课程约定，以免与 JavaScript `Promise` 混淆。
- 英文扩展课应允许作者逐课编写 `plain` 与 `steps`，不要让相同生成模板覆盖所有课程。
- Case Chat 在英文站仍是中文案例时，应明确标记语言，并提供英文入口说明和章节能力索引。

本地化可以改变姓名、故事和项目领域。以下内容必须一致：

- `requires` 与 `provides` 能力。
- 实验输入中的故障条件。
- 能观察的证据。
- 过关标准。
- 类比的技术边界。

## 8. Case Chat 成为真实案例终点

### 8.1 终点定义

Case Chat 不以“读完 11 章”为完成。学习者必须完成五件事：

1. 沿一次语音会话画出浏览器、WebSocket、Recorder、Prompter 和文件之间的数据路线。
2. 画出 Application、Supervisor、Registry、连接进程和辅助进程的生命周期关系。
3. 选择一个故障并实际运行：连接关闭、Recorder 退出、写盘变慢或 mailbox 增长。
4. 用日志、PID、`DOWN`、文件结果或 mailbox 长度证明发生了什么。
5. 写一页设计复盘：当前选择解决了什么，没有保证什么，下一步会怎样改。

### 8.2 主线能力与 Case Chat 章节映射

| 主线能力 | Case Chat 位置 | 学习任务 |
| --- | --- | --- |
| Mix 与 Application | 第 1 至 3 章 | 从 `mix.exs` 找到 application callback 和根 Supervisor |
| 进程与 mailbox | 第 5 至 7 章 | 标出会话进程、Recorder、Prompter 的 PID、消息与状态所有者 |
| link、monitor 与 timeout | 第 5、6 章 | 跟踪 stop、`DOWN`、`trap_exit` 和超时后的真实结果 |
| Supervisor 与 child spec | 第 3 章 | 判断哪些进程受顶层 Supervisor 直接管理，哪些不在这棵 children 列表中 |
| 边界与协议 | 第 4、5 章 | 追踪 HTTP Upgrade、WebSocket 帧和业务消息的边界 |
| 文件与 binary | 第 6、8 章 | 分清音频块、PCM 帧、WAV 文件和写盘确认 |
| 容量与背压 | 第 5 至 7 章 | 找出音频持续到达时可能增长的 mailbox，并提出有界方案 |
| 可观察性 | 全案 | 为一次会话选择 session id、日志字段、耗时和队列长度证据 |

Plug、WebSocket 和 WAV 格式是案例领域知识，不应变成进入 Case Chat 的前置课程。案例应在
需要时给最小解释，并把注意力拉回进程、消息、失败和边界。

### 8.3 案例任务包

Case Chat 终点建议提供四档任务：

| 档位 | 任务 | 产物 |
| --- | --- | --- |
| Trace | 跟踪一块音频从浏览器到文件 | 一张数据流图和一张消息表 |
| Break | 主动制造一种故障 | 命令、实际输出、时间线和结论 |
| Judge | 比较裸进程、GenServer 与 Supervisor 的职责 | 一页设计选择记录 |
| Improve | 提出并验证一个小改动 | 测试、指标或故障前后对照 |

可选改动包括：

- 为持续音频输入增加明确容量和满载策略。
- 为 Recorder stop 区分 timeout、异常退出和写盘确认。
- 为 session、recorder 和 request 增加一致的关联字段。
- 为 mailbox 长度、写盘耗时和异常退出增加 Telemetry 或结构化日志。
- 把一个无监督的长期进程放进合适的监督边界，并说明重启后的数据后果。

### 8.4 案例验收

Case Chat 完成页至少检查：

- 图中每份长期状态都有明确所有者。
- 每种 message 都能看出发送者、接收者和是否需要 reply。
- 故障实验保存了实际证据，不只写“应该会”。
- 能分开 timeout、取消、进程退出和 Supervisor 重启。
- 能指出一个当前实现没有保证的事情。
- 改进方案写清容量、失败范围和可能新增的代价。

Case Chat 的同步脚本继续以外部真实项目为来源。课程侧还应记录案例版本或源码提交标识，
并检查章节 anchor，避免源码更新后课程链接仍指向旧说明。

## 9. 数据结构建议

课程顺序、能力门槛和本地化文案应分开保存。

```ts
type Capability =
  | "pattern_match"
  | "pin"
  | "named_recursion"
  | "tagged_result"
  | "process_basics"
  | "monitor"
  | "genserver"
  | "supervision"
  | "bounded_concurrency"
  | "bilingual_terms";

type BeforeRun = {
  predict: string[];
  trace: string[];
  changeOne: string;
  reveal: string[];
};

type DesignDecision = {
  question: string;
  choice: string;
  alternatives: Array<{
    name: string;
    useWhen: string;
    tradeoff: string;
  }>;
};

type EcosystemComparison = {
  ecosystem: "Java" | "Python" | "JavaScript";
  familiar: string;
  beamDifference: string;
  commonTrap: string;
};
```

建议为 `BasicLesson` 与 `CourseModule` 增加：

```ts
type LearningMetadata = {
  requires: Capability[];
  provides: Capability[];
  beforeRun?: BeforeRun;
  designDecision?: DesignDecision;
  comparisons?: EcosystemComparison[];
  scenarioKey?: string;
};
```

bridge 从单链接扩成：

```ts
type LearningBridge = {
  primary: { href: string; label: string; reason: string };
  secondary?: { href: string; label: string; reason: string };
  readiness: Array<{ prompt: string; expected: string }>;
};
```

路线单独配置：

```ts
const learningRoutes = {
  elixirToBeam: [
    "beam-mental-model",
    "processes-and-mailboxes",
    "otp-behaviours",
    "supervision-trees",
    "state-and-backpressure",
    "distributed-operations",
    "reliable-scheduler",
  ],
  erlangToBeam: [
    "beam-mental-model",
    "processes-and-mailboxes",
    "otp-behaviours",
    "supervision-trees",
    "state-and-backpressure",
    "distributed-operations",
    "reliable-scheduler",
  ],
  bilingual: [
    "shared-semantics",
    "interoperability",
    "reliable-scheduler",
  ],
};
```

Case Chat 也应有课程侧清单：

```ts
type CaseStudy = {
  id: string;
  locales: Array<"zh" | "en">;
  sourceVersion: string;
  requires: Capability[];
  chapters: Array<{
    anchor: string;
    capabilities: Capability[];
    prompt: string;
    evidence: string[];
  }>;
  deliverables: string[];
};
```

中英文共享 `requires`、`provides`、`scenarioKey`、chapter anchor 和验收规则；分别维护
标题、解释、人物和类比。这样可以允许真正本地化，同时避免课程目标悄悄分叉。

## 10. 发布与检查顺序

建议按以下顺序实施，每一步都可单独发布：

1. 新增路线与能力元数据，不改变页面视觉。
2. 修正第 31 课 bridge，并加入从纯函数到进程的桥接卡。
3. 拆开 `beam-mental-model` 原语，补 pin 与 monitor 实验。
4. 将单语言核心路线和双语路线分开。
5. 增加最小 Supervisor/Application 台阶和有界容量边界卡。
6. 将 `reliable-scheduler` 分成单语言必做与双语扩展。
7. 为关键实验增加 `beforeRun`、设计选择和生态对照。
8. 把 Case Chat 任务包、能力映射和产物验收接入结业页。
9. 调整中英文写作与类比，最后做两条路线的完整走查。

每次发布至少检查：

- 从 Elixir 和 Erlang 两个结业页分别进入主线，下一步都明确。
- 单语言路线不会被另一门语言挡住。
- 当前课程的 `requires` 已由前面内容提供，或页面明确给出补课入口。
- 运行前问题不会提前展示答案。
- 代码、预期输出和故障证据能够对应。
- 中文和英文使用相同能力与验收标准。
- Case Chat 的链接、章节 anchor 和源码版本仍然有效。

## 11. 完成定义

课程重构完成，不以“页面都写完”为标准。应同时满足：

- 学习者完成任意一条语言线后，能不重复起跑线直接进入 BEAM 核心。
- 学习者能在运行代码前预测状态所有者、消息去向和一个失败结果。
- 学习者能分清纯函数、普通进程、GenServer、Task、ETS 和 Supervisor 的职责边界。
- 学习者只会一门语言时，也能完成可靠任务系统的核心验收。
- 双语学习者能在共同 contract 下完成 term、错误和 worker 边界测试。
- 学习者在 Case Chat 中留下数据流图、进程图、一次故障证据和一页设计复盘。
- 另一位学习者可以根据这些产物复现实验，并指出系统目前没有保证什么。

