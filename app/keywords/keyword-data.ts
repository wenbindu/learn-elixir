export type Language = "elixir" | "erlang";

export type Scope = "reserved" | "special" | "common";

export type KeywordEntry = {
  term: string;
  language: Language;
  scope: Scope;
  role: string;
  summary: string;
  detail: string;
  example: string;
  analogy?: string;
  note?: string;
};

export const keywordEntries: KeywordEntry[] = [
  // Elixir: 15 strictly reserved words.
  {
    term: "after",
    language: "elixir",
    scope: "reserved",
    role: "收尾或超时子句",
    summary: "让收尾工作一定执行，也能给收消息设定最长等待时间。",
    detail:
      "`try ... after` 会在离开 try 前执行清理；`receive ... after` 只结束这次等待，不会撤回已经发送的消息。",
    example: "try do\n  work()\nafter\n  cleanup()\nend",
  },
  {
    term: "and",
    language: "elixir",
    scope: "reserved",
    role: "严格布尔运算符",
    summary: "判断两个布尔条件是不是同时为 true。",
    detail:
      "两边必须是 true 或 false；左边为 false 时右边不会运行。需要按真值判断其他数据时用 &&。",
    example: "ready? and enabled?",
  },
  {
    term: "catch",
    language: "elixir",
    scope: "reserved",
    role: "捕获子句",
    summary: "接住 try 中的 throw、exit 等特殊信号。",
    detail:
      "普通异常通常交给 rescue；catch 主要处理 `throw/1`、进程退出和较底层的错误类别。",
    example:
      "try do\n  throw(:stop)\ncatch\n  :throw, reason -> reason\nend",
  },
  {
    term: "do",
    language: "elixir",
    scope: "reserved",
    role: "代码块起点",
    summary: "标出接下来属于当前函数或判断的代码。",
    detail:
      "多行内容写成 `do ... end`；只有一个表达式时，也可以缩写成 `do: expression`。",
    example: "if ready?, do: run()",
  },
  {
    term: "else",
    language: "elixir",
    scope: "reserved",
    role: "备选子句",
    summary: "当前面的条件或匹配没有成功时，走另一条路。",
    detail:
      "它可出现在 if、unless、with 和 try 中；放在不同结构里，触发它的规则并不完全一样。",
    example: "if ok?, do: :yes, else: :no",
  },
  {
    term: "end",
    language: "elixir",
    scope: "reserved",
    role: "代码块终点",
    summary: "结束由 do、fn 等打开的代码块。",
    detail:
      "缩进只帮助人阅读，不能代替语法；多行代码块必须用 end 明确结束。",
    example: "if ready? do\n  run()\nend",
  },
  {
    term: "false",
    language: "elixir",
    scope: "reserved",
    role: "布尔字面量",
    summary: "表示“否”或“条件不成立”。",
    detail:
      "Elixir 的条件判断只把 false 和 nil 当作假值，0、空字符串和空列表都算真值。",
    example: "active? = false",
  },
  {
    term: "fn",
    language: "elixir",
    scope: "reserved",
    role: "匿名函数",
    summary: "创建没有名字、可传给其他代码的函数。",
    detail:
      "匿名函数可以有多个模式匹配子句；保存在变量里以后，要用 `变量.(参数)` 的点号形式调用。",
    example: "double = fn x -> x * 2 end\ndouble.(3)",
  },
  {
    term: "in",
    language: "elixir",
    scope: "reserved",
    role: "成员关系运算符",
    summary: "检查一个值是否在列表或范围中。",
    detail:
      "in 也能用于 guard；它只检查成员关系，推导式里从集合取值使用的是 `<-`。",
    example: "2 in 1..3",
  },
  {
    term: "nil",
    language: "elixir",
    scope: "reserved",
    role: "空值字面量",
    summary: "表示这里暂时没有值。",
    detail:
      "nil 是原子 `:nil` 的字面写法，在条件判断中算假；它常表示“没找到”或可选值缺席。",
    example: "result = nil",
  },
  {
    term: "not",
    language: "elixir",
    scope: "reserved",
    role: "严格布尔运算符",
    summary: "把 true 变成 false，把 false 变成 true。",
    detail:
      "not 只接受 true 或 false；如果要对 nil 或其他数据按真值取反，使用 `!`。",
    example: "not finished?",
  },
  {
    term: "or",
    language: "elixir",
    scope: "reserved",
    role: "严格布尔运算符",
    summary: "判断两个布尔条件里是否至少有一个为 true。",
    detail:
      "两边必须是 true 或 false；左边为 true 时右边不会运行。需要按真值判断其他数据时用 `||`。",
    example: "cached? or fetch?()",
  },
  {
    term: "rescue",
    language: "elixir",
    scope: "reserved",
    role: "异常子句",
    summary: "当 try 里发生普通异常时，按异常类型处理它。",
    detail:
      "可以只接住 ArgumentError 等指定异常；没有匹配到的异常仍会继续向外传。",
    example:
      "try do\n  risky()\nrescue\n  ArgumentError -> :invalid\nend",
  },
  {
    term: "true",
    language: "elixir",
    scope: "reserved",
    role: "布尔字面量",
    summary: "表示“是”或“条件成立”。",
    detail:
      "true 是原子 `:true` 的字面写法，也常在 cond 的最后一条分支里表示“其他情况都走这里”。",
    example: "enabled? = true",
  },
  {
    term: "when",
    language: "elixir",
    scope: "reserved",
    role: "守卫子句",
    summary: "模式先对上以后，再检查一个额外条件。",
    detail:
      "when 里的 guard 只能使用允许的运算符和函数；普通函数不能随意放进去。",
    analogy:
      "像城门先核对姓名，再检查通行条件。两项都符合才放行。",
    example: "def positive?(n) when n > 0, do: true",
  },

  // Erlang: 29 strictly reserved words in the current lexical grammar.
  {
    term: "after",
    language: "erlang",
    scope: "reserved",
    role: "超时或收尾子句",
    summary: "让收消息不必一直等，也能保证 try 离开前做清理。",
    detail:
      "`receive ... after` 到时只停止等待；`try ... after` 中的表达式会在离开 try 前执行。",
    example: "receive\n  Msg -> Msg\nafter 1000 ->\n  timeout\nend",
  },
  {
    term: "and",
    language: "erlang",
    scope: "reserved",
    role: "严格布尔运算符",
    summary: "把两边都算完，再判断它们是不是同时为 true。",
    detail:
      "两边都必须是布尔值，而且右边一定会运行；不想在左边为 false 时运行右边，请用 andalso。",
    example: "true and false. % false",
  },
  {
    term: "andalso",
    language: "erlang",
    scope: "reserved",
    role: "短路布尔运算符",
    summary: "先看左边，只有左边为 true 才继续算右边。",
    detail:
      "两边都应得到布尔值；它常把安全检查放在前面，避免右边做没有必要或可能出错的计算。",
    analogy:
      "像先确认桥能走，再让车上桥。第一步失败，后一步不做。",
    example: "N > 0 andalso N rem 2 =:= 0.",
  },
  {
    term: "band",
    language: "erlang",
    scope: "reserved",
    role: "位运算符",
    summary: "逐个比较两个整数的二进制位，只有两边都是 1 才留下 1。",
    detail: "它只处理整数，常用来读取掩码、标志位或二进制协议里的某几位。",
    example: "6 band 3. % 2",
  },
  {
    term: "begin",
    language: "erlang",
    scope: "reserved",
    role: "表达式块",
    summary: "把几步计算包在一起，当成一个完整表达式。",
    detail:
      "各步用逗号分开并按顺序执行，整个 `begin ... end` 最终得到最后一步的值。",
    example: "begin A = 1, A + 1 end.",
  },
  {
    term: "bnot",
    language: "erlang",
    scope: "reserved",
    role: "位运算符",
    summary: "把整数二进制表示里的每一位反过来。",
    detail: "Erlang 整数没有固定的 8 位、32 位上限，因此结果按无限精度整数的规则计算。",
    example: "bnot 0. % -1",
  },
  {
    term: "bor",
    language: "erlang",
    scope: "reserved",
    role: "位运算符",
    summary: "逐个比较两个整数的二进制位，只要一边是 1 就得到 1。",
    detail: "它只处理整数，常用来把多个互不冲突的位标志合在一起。",
    example: "4 bor 1. % 5",
  },
  {
    term: "bsl",
    language: "erlang",
    scope: "reserved",
    role: "位移运算符",
    summary: "把整数的二进制位整体向左挪几格。",
    detail: "位移数量为正时，效果通常等于乘以相应次方的 2；它只接受整数。",
    example: "3 bsl 2. % 12",
  },
  {
    term: "bsr",
    language: "erlang",
    scope: "reserved",
    role: "位移运算符",
    summary: "把整数的二进制位整体向右挪几格。",
    detail: "它只接受整数；负数使用算术右移，会保留负号所代表的符号语义。",
    example: "12 bsr 2. % 3",
  },
  {
    term: "bxor",
    language: "erlang",
    scope: "reserved",
    role: "位运算符",
    summary: "逐个比较两个整数的二进制位，不一样时得到 1。",
    detail: "相同的位得到 0，不同的位得到 1；这是整数位运算，不是布尔 xor。",
    example: "6 bxor 3. % 5",
  },
  {
    term: "case",
    language: "erlang",
    scope: "reserved",
    role: "模式分支",
    summary: "根据值的形状，执行第一个匹配分支。",
    detail:
      "case 只把目标表达式算一次，再从上到下尝试 of 后的模式与可选 guard；没有命中会报错。",
    analogy:
      "像驿站按信封标记分信。第一条匹配规则决定信送到哪里。",
    example: "case X of\n  0 -> zero;\n  _ -> other\nend.",
  },
  {
    term: "catch",
    language: "erlang",
    scope: "reserved",
    role: "异常捕获",
    summary: "接住表达式抛出的值或错误，让它变成可以继续处理的结果。",
    detail:
      "它既有旧式 `catch Expression` 写法，也出现在 try 的 catch 子句中；新代码通常用结构更清楚的 try。",
    example: "Result = catch risky().",
  },
  {
    term: "cond",
    language: "erlang",
    scope: "reserved",
    role: "保留未使用",
    summary: "这个名字被 Erlang 留着，但现在不能拿它写 cond 条件块。",
    detail:
      "cond 不能直接当原子、变量或函数名；需要这个原子时写 `'cond'`，条件分支使用 case 或 if。",
    example: "erl_scan:reserved_word('cond'). % true",
    note: "当前 Erlang 语法未使用该词。",
  },
  {
    term: "div",
    language: "erlang",
    scope: "reserved",
    role: "算术运算符",
    summary: "用两个整数相除，只保留整数部分。",
    detail: "结果朝 0 的方向截断，不会四舍五入；除数为 0 会产生 `badarith` 错误。",
    example: "7 div 2. % 3",
  },
  {
    term: "else",
    language: "erlang",
    scope: "reserved",
    role: "maybe 失败分支",
    summary: "当 maybe 中某一步没有匹配成功时，决定怎样处理那个失败值。",
    detail:
      "else 后面仍用模式子句选择结果；它只属于 maybe 语法，并不是任何地方都能使用的 if-else。",
    example: "maybe {ok, V} ?= fetch(), V else error -> missing end.",
    note: "与 maybe 表达式一同使用；旧版 OTP 可能不支持该语法。",
  },
  {
    term: "end",
    language: "erlang",
    scope: "reserved",
    role: "表达式块终点",
    summary: "结束 case、fun、if、receive 或 try 等代码块。",
    detail: "缩进不能结束这些表达式；每个打开的多行块都要用 end 明确闭合。",
    example: "fun(X) -> X * 2 end.",
  },
  {
    term: "fun",
    language: "erlang",
    scope: "reserved",
    role: "匿名函数或函数引用",
    summary: "做一个匿名函数，或者把已有函数当成一个值拿来使用。",
    detail:
      "匿名函数可以有多个模式子句；`fun Module:Function/Arity` 可以引用已经存在的远程函数。",
    example: "Double = fun(X) -> X * 2 end.",
  },
  {
    term: "if",
    language: "erlang",
    scope: "reserved",
    role: "守卫分支",
    summary: "从上到下检查条件，执行第一条 guard 为 true 的分支。",
    detail:
      "if 里只能写允许的 guard 表达式，不是任意函数调用；没有分支命中会产生 `if_clause` 错误。",
    example: "if N > 0 -> positive; true -> other end.",
  },
  {
    term: "let",
    language: "erlang",
    scope: "reserved",
    role: "保留未使用",
    summary: "这个名字被 Erlang 留着，但现在没有可以使用的 let 表达式。",
    detail:
      "Erlang 用模式匹配绑定变量；如果确实需要名为 let 的原子，必须写成 `'let'`。",
    example: "erl_scan:reserved_word('let'). % true",
    note: "当前 Erlang 语法未使用该词。",
  },
  {
    term: "maybe",
    language: "erlang",
    scope: "reserved",
    role: "顺序匹配表达式",
    summary: "把几步可能失败的操作排好，一步没对上就提前停下。",
    detail:
      "`?=` 只在 maybe 中使用；匹配失败时返回失败值，也可以交给 else 转成统一结果。",
    analogy:
      "像通关文牒逐站盖印。少一枚印，后面先停下。",
    example: "maybe\n  {ok, V} ?= fetch(),\n  V\nend.",
    note:
      "maybe 表达式从 Erlang/OTP 25 引入；较旧版本不支持，早期版本可能需启用 maybe_expr 特性。",
  },
  {
    term: "not",
    language: "erlang",
    scope: "reserved",
    role: "布尔运算符",
    summary: "把 true 变成 false，把 false 变成 true。",
    detail: "not 只接受布尔值；传入数字、原子等其他数据会产生 `badarg` 错误。",
    example: "not false. % true",
  },
  {
    term: "of",
    language: "erlang",
    scope: "reserved",
    role: "模式子句引导词",
    summary: "引出 case 或 try 中按结果形状划分的分支。",
    detail:
      "`case` 用 `of` 引出分支。`try` 可省略 `of`；它只处理 `try` 主体正常返回的值。",
    example: "case Value of ok -> done; _ -> retry end.",
  },
  {
    term: "or",
    language: "erlang",
    scope: "reserved",
    role: "严格布尔运算符",
    summary: "把两边都算完，再判断是否至少有一边为 true。",
    detail:
      "两边都必须是布尔值，而且右边一定会运行；不想在左边为 true 时运行右边，请用 orelse。",
    example: "false or true. % true",
  },
  {
    term: "orelse",
    language: "erlang",
    scope: "reserved",
    role: "短路布尔运算符",
    summary: "先看左边，只有左边为 false 才继续算右边。",
    detail:
      "两边都应得到布尔值；左边已经满足时，右边不会运行，所以它常用来安排备用条件。",
    analogy:
      "像先试近路。近路能走就不再检查备用路线。",
    example: "Cached orelse filelib:is_file(Path).",
  },
  {
    term: "receive",
    language: "erlang",
    scope: "reserved",
    role: "进程消息接收",
    summary: "从当前进程的 mailbox 里取出第一条符合规则的消息。",
    detail:
      "消息按到达顺序扫描，不匹配的会留在 mailbox 中；可以用 after 避免一直等待。",
    analogy:
      "像从一叠来信中取出第一封合规的信。其他信仍留在信箱里。",
    example: "receive\n  {ping, From} -> From ! pong\nend.",
  },
  {
    term: "rem",
    language: "erlang",
    scope: "reserved",
    role: "算术运算符",
    summary: "计算两个整数相除后的余数。",
    detail:
      "rem 与 div 配套，并满足 `X = (X div Y) * Y + (X rem Y)`；除数为 0 会报错。",
    example: "7 rem 2. % 1",
  },
  {
    term: "try",
    language: "erlang",
    scope: "reserved",
    role: "异常处理表达式",
    summary: "把可能出错的计算、成功结果和收尾工作放在一起处理。",
    detail:
      "try 可以组合 of、catch 和 after，分别处理正常值以及 error、exit、throw；没有匹配的错误仍会向外传。",
    example: "try risky() catch _:Reason -> {error, Reason} end.",
  },
  {
    term: "when",
    language: "erlang",
    scope: "reserved",
    role: "守卫子句",
    summary: "模式先对上以后，再检查一个额外条件。",
    detail:
      "when 后只能使用允许的 guard 表达式；普通函数不能随意放进去，条件为 false 时会继续尝试下一子句。",
    analogy:
      "像先按名册找到队伍，再核对年龄。两项都符合才进入。",
    example: "abs(N) when N < 0 -> -N.",
  },
  {
    term: "xor",
    language: "erlang",
    scope: "reserved",
    role: "布尔运算符",
    summary: "判断两个布尔值是否恰好一真一假。",
    detail: "两边都会运行且都必须是布尔值；整数每一位的异或运算要使用 bxor。",
    example: "true xor false. % true",
  },

  // Elixir special forms and language constructs.
  {
    term: "case",
    language: "elixir",
    scope: "special",
    role: "特殊形式",
    summary: "根据值的形状，执行第一个匹配分支。",
    detail:
      "目标表达式只计算一次，分支可以加 when；如果没有任何分支匹配，会产生 `CaseClauseError`。",
    analogy:
      "像按物品形状整理书包。第一条匹配规则决定放在哪里。",
    example: "case value do\n  {:ok, x} -> x\n  _ -> nil\nend",
  },
  {
    term: "cond",
    language: "elixir",
    scope: "special",
    role: "特殊形式",
    summary: "从上到下检查条件，执行第一条算作真的分支。",
    detail:
      "cond 适合几条问题彼此不同的情况；如果没有分支为真会报错，通常用 `true -> ...` 接住剩余情况。",
    example: "cond do\n  ready? -> :go\n  true -> :wait\nend",
  },
  {
    term: "with",
    language: "elixir",
    scope: "special",
    role: "特殊形式",
    summary: "把几步可能失败的操作排好，一步没对上就提前停下。",
    detail:
      "任一 `<-` 匹配失败都会跳过后续步骤，直接返回失败值，或交给可选的 else 处理。",
    analogy:
      "像通关文牒逐站盖印。前一站未通过，后面先停下。",
    example: "with {:ok, user} <- fetch_user(), do: user.name",
  },
  {
    term: "try",
    language: "elixir",
    scope: "special",
    role: "特殊形式",
    summary: "把可能出错的计算、成功结果和收尾工作放在一起处理。",
    detail:
      "try 可以包含 rescue、catch、else 和 after；普通的成功或失败分支，通常用返回值比抛异常更清楚。",
    example: "try do\n  risky()\nrescue\n  _ -> :error\nend",
  },
  {
    term: "receive",
    language: "elixir",
    scope: "special",
    role: "特殊形式",
    summary: "从当前进程的 mailbox 里取出第一条符合规则的消息。",
    detail:
      "不匹配的消息会留在 mailbox 中；可以用 after 设定最长等待时间，避免一直卡住。",
    analogy:
      "像从一叠来信中取出第一封合规的信。其他信仍留在信箱里。",
    example: "receive do\n  {:ping, from} -> send(from, :pong)\nend",
  },
  {
    term: "for",
    language: "elixir",
    scope: "special",
    role: "列表推导",
    summary: "从一批数据里逐个取值，可以筛选，再把新结果收集起来。",
    detail:
      "for 可以组合多个生成器和过滤条件；结果默认是列表，使用 `into:` 才会收进其他数据结构。",
    example: "for x <- 1..3, do: x * 2",
  },
  {
    term: "alias",
    language: "elixir",
    scope: "special",
    role: "模块别名",
    summary: "给很长的模块名取一个只在当前范围使用的短名字。",
    detail:
      "alias 只在编译时改变名称写法，不会复制模块，也不会把模块里的函数导入当前模块。",
    example: "alias MyApp.Accounts.User, as: User",
  },
  {
    term: "import",
    language: "elixir",
    scope: "special",
    role: "函数与宏导入",
    summary: "把指定函数或宏带到当前范围，调用时可以省略模块名。",
    detail:
      "导入太多容易出现同名冲突；用 `only:` 或 `except:` 缩小范围，也能让来源更容易看懂。",
    example: "import Enum, only: [map: 2]",
  },
  {
    term: "require",
    language: "elixir",
    scope: "special",
    role: "宏依赖声明",
    summary: "调用模块宏之前，先让编译器准备好该模块。",
    detail:
      "普通远程函数不需要 require；远程宏通常需要先 require，因为宏会在编译代码时展开。",
    example: "require Logger\nLogger.info(\"ready\")",
  },
  {
    term: "quote",
    language: "elixir",
    scope: "special",
    role: "AST 构造",
    summary: "先把一段代码变成可以查看和组合的数据，而不是立刻照常运行。",
    detail:
      "quote 得到的是由 tuple、列表和字面量组成的 AST，常供宏继续改造并交给编译器展开。",
    analogy: "像先画图纸。图纸描述要建什么，不是已经建好的房子。",
    example: "ast = quote do: x + 1",
  },
  {
    term: "unquote",
    language: "elixir",
    scope: "special",
    role: "AST 插值",
    summary: "把 quote 外面准备好的一个值或一段 AST 填进代码模板。",
    detail:
      "unquote 只在 quote 的上下文里有这种作用，每次插入一个值；插入一列 AST 要用 unquote_splicing。",
    analogy: "像在印版上留一个位置，再放入选好的一块活字。",
    example: "quote do: unquote(value) + 1",
  },
  {
    term: "unquote_splicing",
    language: "elixir",
    scope: "special",
    role: "AST 列表插值",
    summary: "把一列 AST 拆开，将里面的多个元素一起填进 quote。",
    detail:
      "它要求插入的内容能作为列表元素展开，并把这些元素拼进当前位置；unquote 则只放入一个值。",
    analogy: "unquote 放入一块活字；它会接入一整列活字。",
    example: "quote do: [0, unquote_splicing(values)]",
  },
  {
    term: "super",
    language: "elixir",
    scope: "special",
    role: "被覆盖实现调用",
    summary: "覆盖默认函数以后，仍然调用原来的那份实现。",
    detail:
      "super 只用于可覆盖定义，常与 defoverridable 或 use 生成的默认实现配合；参数仍要符合当前函数元数。",
    example: "def greet(name), do: super(name) <> \"!\"",
  },

  // Elixir macros that are commonly mistaken for strict keywords.
  {
    term: "defmodule",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "开一个模块，把相关函数、宏和数据定义放在同一个名字下面。",
    detail:
      "模块名通常写成大驼峰别名；do 块里的属性、函数和宏会在编译时归入这个模块。",
    example: "defmodule Greeter do\nend",
    note: "常被称为关键字，但它是 Kernel 提供的宏。",
  },
  {
    term: "def",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "定义一个模块外也能调用的函数。",
    detail:
      "同名且参数个数相同的 def 可以写成多个模式与 guard 子句，调用时按声明顺序尝试。",
    example: "def add(a, b), do: a + b",
    note: "它是宏，不属于 15 个严格保留字。",
  },
  {
    term: "defp",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "定义一个只给当前模块内部使用的函数。",
    detail:
      "defp 不会导出；其他模块不能用 `Module.function` 调用它，即使知道它的名字也不行。",
    example: "defp normalize(text), do: String.trim(text)",
    note: "它是宏，不属于 15 个严格保留字。",
  },
  {
    term: "defmacro",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "定义一个在编译代码时生成或改写代码的宏。",
    detail:
      "宏收到的是调用代码的 AST，不是普通运行时结果；它必须返回 AST，通常会搭配 quote 与 unquote。",
    example: "defmacro twice(expr), do: quote(do: unquote(expr) * 2)",
    note: "它是定义宏的宏，不是严格保留字。",
  },
  {
    term: "defstruct",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "给当前模块定义一组固定字段和它们的默认值。",
    detail:
      "结构体底层是带 `__struct__` 标记的 map；允许哪些键在编译时已经确定，写入未知字段会报错。",
    example: "defstruct name: \"\", age: 0",
    note: "它是宏，不属于严格保留字。",
  },
  {
    term: "defprotocol",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "为一种操作定义统一接口，让不同数据类型各自实现。",
    detail:
      "defprotocol 只声明函数；具体行为由不同类型的 defimpl 提供，分派依据是协议函数的第一个参数。",
    example: "defprotocol Size do\n  def size(value)\nend",
    note: "它是宏，不属于严格保留字。",
  },
  {
    term: "defimpl",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "为指定数据类型实现协议规定的操作。",
    detail:
      "`for:` 指定目标类型；协议会查看第一个参数的类型来选择实现，没有实现时通常会报协议未实现。",
    example: "defimpl Size, for: BitString do\n  def size(v), do: byte_size(v)\nend",
    note: "它是宏，不属于严格保留字。",
  },
  {
    term: "if",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "条件算作真时走 do，否则走 else。",
    detail:
      "只有 false 和 nil 算假，0、空字符串和空列表都算真；if 是 Kernel 宏，不是严格保留字。",
    example: "if logged_in?, do: :home, else: :login",
    note: "它是 Kernel 宏，不是严格保留字。",
  },
  {
    term: "use",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "请另一个模块在编译时为当前模块加入一套预先准备的代码。",
    detail:
      "use 实际调用目标模块的 `__using__/1` 宏，可能加入 alias、import、require 或函数；使用前要看目标模块说明。",
    example: "use MyApp.Plugin, option: true",
    note: "它会展开为对 __using__/1 的调用，不是严格保留字。",
  },
  {
    term: "raise",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "遇到无法正常继续的情况时，主动抛出一个异常。",
    detail:
      "可以传异常模块与消息，也可以传异常结构；能预料到的普通失败通常更适合返回 `{:error, reason}`。",
    example: "raise ArgumentError, \"invalid value\"",
    note: "它是 Kernel 宏，不是严格保留字。",
  },

  // Erlang module attributes and preprocessor directives: useful, but not words.
  {
    term: "-module",
    language: "erlang",
    scope: "common",
    role: "模块属性",
    summary: "声明这个 .erl 文件要生成的模块。",
    detail:
      "普通 Erlang 模块需要一个 `-module(Name).`，模块名通常必须与 .erl 文件名保持一致。",
    example: "-module(counter).",
    note: "这是模块属性，不是保留字。",
  },
  {
    term: "-export",
    language: "erlang",
    scope: "common",
    role: "模块属性",
    summary: "列出哪些函数可以被其他模块调用。",
    detail:
      "每个函数用 `name/arity` 标出名字和参数个数；没有导出的函数只能在本模块里直接调用。",
    example: "-export([start/0, inc/1]).",
    note: "这是模块属性，不是保留字。",
  },
  {
    term: "-behaviour",
    language: "erlang",
    scope: "common",
    role: "模块属性",
    summary: "说明当前模块准备遵守某个 behaviour 的回调规则。",
    detail:
      "编译器会按 behaviour 的 callback 声明检查是否漏写必需函数；`gen_server` 是常见例子。",
    example: "-behaviour(gen_server).",
    note: "这是模块属性，拼写采用英式 behaviour。",
  },
  {
    term: "-spec",
    language: "erlang",
    scope: "common",
    role: "类型规格",
    summary: "写下一个函数愿意接收什么类型，又会返回什么类型。",
    detail:
      "Dialyzer 会利用 spec 查找可疑调用，但程序运行时不会因为写了 spec 就自动检查每个值。",
    example: "-spec add(integer(), integer()) -> integer().",
    note: "这是类型属性，不是保留字。",
  },
  {
    term: "-type",
    language: "erlang",
    scope: "common",
    role: "类型声明",
    summary: "给一段较长的类型说明取一个本地名字。",
    detail:
      "这个名字可以用于 spec 和其他类型；其他模块要引用它，还必须用 `-export_type` 导出。",
    example: "-type user_id() :: pos_integer().",
    note: "这是类型属性，不是保留字。",
  },
  {
    term: "-record",
    language: "erlang",
    scope: "common",
    role: "记录声明",
    summary: "定义一组带名字的字段，方便创建和读取同一种记录。",
    detail:
      "record 会在编译时展开成 tuple，并不是运行时对象；可以设置默认值，也能按字段名写模式。",
    example: "-record(user, {id, name = <<>>}).",
    note: "这是模块属性，不是保留字。",
  },
  {
    term: "-define",
    language: "erlang",
    scope: "common",
    role: "预处理指令",
    summary: "给一段常量或代码片段取一个可重复展开的宏名字。",
    detail:
      "宏写成 `?NAME` 或带参数的形式，并在 Erlang 正式解析语法之前展开；它不是普通运行时函数。",
    example: "-define(TIMEOUT, 5000).",
    note: "这是 EPP 预处理指令，不是保留字。",
  },
  {
    term: "-include",
    language: "erlang",
    scope: "common",
    role: "预处理指令",
    summary: "在编译前，把一个头文件的内容放进当前模块。",
    detail:
      "它常用来共享 record、宏和类型声明；依赖库里的头文件通常使用 `-include_lib`。",
    example: "-include(\"records.hrl\").",
    note: "这是 EPP 预处理指令，不是保留字。",
  },
  {
    term: "-ifdef",
    language: "erlang",
    scope: "common",
    role: "条件预处理",
    summary: "只有某个宏已经定义时，才把一段源码交给编译器。",
    detail:
      "`-ifdef` 必须与 `-endif` 配对，也可以加 `-else`；判断发生在预处理阶段，不是运行时 if。",
    example: "-ifdef(TEST).\n-export([helper/0]).\n-endif.",
    note: "这是 EPP 条件编译指令，不是保留字。",
  },
  {
    term: "-feature",
    language: "erlang",
    scope: "common",
    role: "语言特性控制",
    summary: "为支持它的 OTP 编译器打开或关闭可选语法。",
    detail:
      "有哪些特性、默认是否开启都随 OTP 版本变化；它应写在模块属性区域，并按目标版本的文档核对。",
    example: "-feature(maybe_expr, enable).",
    note:
      "这是模块属性而非保留字；maybe_expr 在早期 OTP 中曾通过它启用，新版本可能已永久启用。",
  },
];
