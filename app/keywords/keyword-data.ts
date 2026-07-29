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
  note?: string;
};

export const keywordEntries: KeywordEntry[] = [
  // Elixir: 15 strictly reserved words.
  {
    term: "after",
    language: "elixir",
    scope: "reserved",
    role: "收尾或超时子句",
    summary: "声明 try 的清理逻辑，或 receive 的超时分支。",
    detail:
      "在 try 中，after 里的代码无论成功或失败都会执行；在 receive 中，它为等待消息设置超时结果。",
    example: "try do\n  work()\nafter\n  cleanup()\nend",
  },
  {
    term: "and",
    language: "elixir",
    scope: "reserved",
    role: "严格布尔运算符",
    summary: "仅接受布尔值，并且短路计算逻辑与。",
    detail:
      "左侧必须是 true 或 false；左侧为 false 时不会计算右侧。若要使用真值语义，可用 &&。",
    example: "ready? and enabled?",
  },
  {
    term: "catch",
    language: "elixir",
    scope: "reserved",
    role: "捕获子句",
    summary: "在 try 中捕获 throw、exit 等非异常信号。",
    detail:
      "普通异常通常交给 rescue；catch 更适合处理 throw/1、进程退出和底层错误类别。",
    example:
      "try do\n  throw(:stop)\ncatch\n  :throw, reason -> reason\nend",
  },
  {
    term: "do",
    language: "elixir",
    scope: "reserved",
    role: "代码块起点",
    summary: "引入宏、函数或控制结构的主体。",
    detail:
      "既可写成 do ... end 多行块，也可写成 do: expression 关键字参数形式。",
    example: "if ready?, do: run()",
  },
  {
    term: "else",
    language: "elixir",
    scope: "reserved",
    role: "备选子句",
    summary: "描述条件不满足或匹配链失败后的分支。",
    detail:
      "常见于 if、unless、with 和 try；它的具体匹配规则由所在构造决定。",
    example: "if ok?, do: :yes, else: :no",
  },
  {
    term: "end",
    language: "elixir",
    scope: "reserved",
    role: "代码块终点",
    summary: "结束由 do、fn 等开启的块。",
    detail:
      "Elixir 不依赖缩进闭合语法块；多行块必须使用 end 明确结束。",
    example: "if ready? do\n  run()\nend",
  },
  {
    term: "false",
    language: "elixir",
    scope: "reserved",
    role: "布尔字面量",
    summary: "表示布尔假值。",
    detail:
      "在 Elixir 的条件判断中，false 与 nil 是仅有的两个假值，其余值均为真值。",
    example: "active? = false",
  },
  {
    term: "fn",
    language: "elixir",
    scope: "reserved",
    role: "匿名函数",
    summary: "创建可赋值、传递和调用的匿名函数。",
    detail:
      "匿名函数可以包含多个模式匹配子句，调用时需在变量名后使用点号。",
    example: "double = fn x -> x * 2 end\ndouble.(3)",
  },
  {
    term: "in",
    language: "elixir",
    scope: "reserved",
    role: "成员关系运算符",
    summary: "检查左侧值是否属于右侧集合。",
    detail:
      "常用于列表或范围成员检查，也可用于 guard；推导式中的生成器使用的是 <-，不要混为一谈。",
    example: "2 in 1..3",
  },
  {
    term: "nil",
    language: "elixir",
    scope: "reserved",
    role: "空值字面量",
    summary: "表示没有值，并在条件中视为假。",
    detail:
      "nil 是原子 :nil 的字面写法，常作为未找到或可选结果的空值。",
    example: "result = nil",
  },
  {
    term: "not",
    language: "elixir",
    scope: "reserved",
    role: "严格布尔运算符",
    summary: "对布尔值取反。",
    detail:
      "操作数必须是 true 或 false；若要使用真值语义取反，可使用 !。",
    example: "not finished?",
  },
  {
    term: "or",
    language: "elixir",
    scope: "reserved",
    role: "严格布尔运算符",
    summary: "仅接受布尔值，并且短路计算逻辑或。",
    detail:
      "左侧必须是 true 或 false；左侧为 true 时不会计算右侧。真值语义版本是 ||。",
    example: "cached? or fetch?()",
  },
  {
    term: "rescue",
    language: "elixir",
    scope: "reserved",
    role: "异常子句",
    summary: "在 try 中匹配并处理异常。",
    detail:
      "可匹配指定异常结构，例如 ArgumentError；未匹配的异常仍会向外传播。",
    example:
      "try do\n  risky()\nrescue\n  ArgumentError -> :invalid\nend",
  },
  {
    term: "true",
    language: "elixir",
    scope: "reserved",
    role: "布尔字面量",
    summary: "表示布尔真值。",
    detail:
      "true 是原子 :true 的字面写法，常用作条件结果或 cond 的兜底条件。",
    example: "enabled? = true",
  },
  {
    term: "when",
    language: "elixir",
    scope: "reserved",
    role: "守卫子句",
    summary: "为模式匹配增加守卫条件。",
    detail:
      "守卫只能调用允许在 guard 中使用的运算符和函数，并在模式匹配之后进行检查。",
    example: "def positive?(n) when n > 0, do: true",
  },

  // Erlang: 29 strictly reserved words in the current lexical grammar.
  {
    term: "after",
    language: "erlang",
    scope: "reserved",
    role: "超时或收尾子句",
    summary: "为 receive 设置超时，或为 try 提供清理阶段。",
    detail:
      "receive after 可避免永久等待消息；try after 中的表达式会在离开 try 前执行。",
    example: "receive\n  Msg -> Msg\nafter 1000 ->\n  timeout\nend",
  },
  {
    term: "and",
    language: "erlang",
    scope: "reserved",
    role: "严格布尔运算符",
    summary: "计算两侧后执行布尔逻辑与。",
    detail:
      "两侧都必须是布尔值，而且不会短路；需要短路时使用 andalso。",
    example: "true and false. % false",
  },
  {
    term: "andalso",
    language: "erlang",
    scope: "reserved",
    role: "短路布尔运算符",
    summary: "左侧为 true 时才计算右侧。",
    detail:
      "它适合把前置检查与后续表达式串联，避免不必要或不安全的右侧计算。",
    example: "N > 0 andalso N rem 2 =:= 0.",
  },
  {
    term: "band",
    language: "erlang",
    scope: "reserved",
    role: "位运算符",
    summary: "对整数逐位执行与运算。",
    detail: "常用于掩码、标志位和二进制协议字段处理。",
    example: "6 band 3. % 2",
  },
  {
    term: "begin",
    language: "erlang",
    scope: "reserved",
    role: "表达式块",
    summary: "把多个表达式组合成一个表达式。",
    detail:
      "表达式按顺序执行，以逗号分隔，整个 begin ... end 的值是最后一个表达式的值。",
    example: "begin A = 1, A + 1 end.",
  },
  {
    term: "bnot",
    language: "erlang",
    scope: "reserved",
    role: "位运算符",
    summary: "对整数的每一位执行按位取反。",
    detail: "Erlang 整数精度不受固定位宽限制，因此结果遵循无限精度整数语义。",
    example: "bnot 0. % -1",
  },
  {
    term: "bor",
    language: "erlang",
    scope: "reserved",
    role: "位运算符",
    summary: "对整数逐位执行或运算。",
    detail: "常用于合并多个独立的位标志。",
    example: "4 bor 1. % 5",
  },
  {
    term: "bsl",
    language: "erlang",
    scope: "reserved",
    role: "位移运算符",
    summary: "把整数的位向左移动指定数量。",
    detail: "正数位移通常等价于乘以 2 的相应幂。",
    example: "3 bsl 2. % 12",
  },
  {
    term: "bsr",
    language: "erlang",
    scope: "reserved",
    role: "位移运算符",
    summary: "把整数的位向右移动指定数量。",
    detail: "对负数执行算术右移，保留符号语义。",
    example: "12 bsr 2. % 3",
  },
  {
    term: "bxor",
    language: "erlang",
    scope: "reserved",
    role: "位运算符",
    summary: "对整数逐位执行异或运算。",
    detail: "对应位不同时结果位为 1，相同时为 0。",
    example: "6 bxor 3. % 5",
  },
  {
    term: "case",
    language: "erlang",
    scope: "reserved",
    role: "模式分支",
    summary: "根据模式匹配选择并执行一个分支。",
    detail:
      "case 表达式求值一次，然后按顺序尝试 of 后的模式和可选守卫。",
    example: "case X of\n  0 -> zero;\n  _ -> other\nend.",
  },
  {
    term: "catch",
    language: "erlang",
    scope: "reserved",
    role: "异常捕获",
    summary: "捕获表达式产生的异常或抛出值。",
    detail:
      "既可作为旧式 catch Expression，也用于 try 的 catch 子句；新代码通常优先使用结构更清楚的 try。",
    example: "Result = catch risky().",
  },
  {
    term: "cond",
    language: "erlang",
    scope: "reserved",
    role: "保留未使用",
    summary: "被词法分析器保留，但当前没有 cond 表达式。",
    detail:
      "它不能作为未加引号的原子、变量或函数名使用；条件分支请使用 case 或 if。",
    example: "erl_scan:reserved_word('cond'). % true",
    note: "当前 Erlang 语法未使用该词。",
  },
  {
    term: "div",
    language: "erlang",
    scope: "reserved",
    role: "算术运算符",
    summary: "执行整数除法并返回整数商。",
    detail: "结果向零截断；除数为零会引发 badarith 错误。",
    example: "7 div 2. % 3",
  },
  {
    term: "else",
    language: "erlang",
    scope: "reserved",
    role: "maybe 失败分支",
    summary: "处理 maybe 表达式中 ?= 匹配失败的值。",
    detail:
      "else 后使用模式子句选择失败结果；它是 maybe 表达式语法的一部分，而非通用 if-else。",
    example: "maybe {ok, V} ?= fetch(), V else error -> missing end.",
    note: "与 maybe 表达式一同使用；旧版 OTP 可能不支持该语法。",
  },
  {
    term: "end",
    language: "erlang",
    scope: "reserved",
    role: "表达式块终点",
    summary: "结束 case、fun、if、receive、try 等表达式块。",
    detail: "Erlang 的多分支表达式都使用 end 明确闭合。",
    example: "fun(X) -> X * 2 end.",
  },
  {
    term: "fun",
    language: "erlang",
    scope: "reserved",
    role: "匿名函数或函数引用",
    summary: "创建匿名函数，或引用已有函数。",
    detail:
      "匿名函数可以拥有多个模式子句；Module:Function/Arity 形式可捕获远程函数。",
    example: "Double = fun(X) -> X * 2 end.",
  },
  {
    term: "if",
    language: "erlang",
    scope: "reserved",
    role: "守卫分支",
    summary: "按顺序选择第一个守卫为真的分支。",
    detail:
      "if 的条件是 guard 序列，不是任意表达式；没有分支命中会产生 if_clause 错误。",
    example: "if N > 0 -> positive; true -> other end.",
  },
  {
    term: "let",
    language: "erlang",
    scope: "reserved",
    role: "保留未使用",
    summary: "被词法分析器保留，但当前没有 let 表达式。",
    detail:
      "Erlang 通过模式匹配绑定变量；若需要名为 let 的原子，必须写成 'let'。",
    example: "erl_scan:reserved_word('let'). % true",
    note: "当前 Erlang 语法未使用该词。",
  },
  {
    term: "maybe",
    language: "erlang",
    scope: "reserved",
    role: "顺序匹配表达式",
    summary: "顺序执行表达式，并在 ?= 匹配失败时提前返回。",
    detail:
      "适合串联多个可能失败的操作；可搭配 else 把失败值转换为统一结果。",
    example: "maybe\n  {ok, V} ?= fetch(),\n  V\nend.",
    note:
      "maybe 表达式从 Erlang/OTP 25 引入；较旧版本不支持，早期版本可能需启用 maybe_expr 特性。",
  },
  {
    term: "not",
    language: "erlang",
    scope: "reserved",
    role: "布尔运算符",
    summary: "对布尔值取反。",
    detail: "操作数必须是 true 或 false，否则会引发 badarg 错误。",
    example: "not false. % true",
  },
  {
    term: "of",
    language: "erlang",
    scope: "reserved",
    role: "模式子句引导词",
    summary: "引出 case 或 try 成功结果的模式分支。",
    detail:
      "在 case 中连接待匹配表达式与子句；在 try 中可选择性处理主体的正常返回值。",
    example: "case Value of ok -> done; _ -> retry end.",
  },
  {
    term: "or",
    language: "erlang",
    scope: "reserved",
    role: "严格布尔运算符",
    summary: "计算两侧后执行布尔逻辑或。",
    detail:
      "两侧都必须是布尔值，而且不会短路；需要短路时使用 orelse。",
    example: "false or true. % true",
  },
  {
    term: "orelse",
    language: "erlang",
    scope: "reserved",
    role: "短路布尔运算符",
    summary: "左侧为 false 时才计算右侧。",
    detail:
      "常用于提供兜底条件，并避免左侧已满足时执行有副作用或昂贵的右侧表达式。",
    example: "Cached orelse filelib:is_file(Path).",
  },
  {
    term: "receive",
    language: "erlang",
    scope: "reserved",
    role: "进程消息接收",
    summary: "从当前进程邮箱中选择性接收匹配消息。",
    detail:
      "消息按到达顺序扫描，只有匹配某个子句的消息才会被取出；可使用 after 设置超时。",
    example: "receive\n  {ping, From} -> From ! pong\nend.",
  },
  {
    term: "rem",
    language: "erlang",
    scope: "reserved",
    role: "算术运算符",
    summary: "返回整数除法的余数。",
    detail:
      "它与 div 配套，并满足 X = (X div Y) * Y + (X rem Y)。",
    example: "7 rem 2. % 1",
  },
  {
    term: "try",
    language: "erlang",
    scope: "reserved",
    role: "异常处理表达式",
    summary: "处理正常结果、异常和最终清理逻辑。",
    detail:
      "可组合 of、catch 和 after 子句，精确区分成功值以及 error、exit、throw 类别。",
    example: "try risky() catch _:Reason -> {error, Reason} end.",
  },
  {
    term: "when",
    language: "erlang",
    scope: "reserved",
    role: "守卫子句",
    summary: "为函数或模式分支增加守卫条件。",
    detail:
      "守卫只能使用允许的 guard 表达式；它在模式匹配成功后决定子句是否可选。",
    example: "abs(N) when N < 0 -> -N.",
  },
  {
    term: "xor",
    language: "erlang",
    scope: "reserved",
    role: "布尔运算符",
    summary: "执行布尔异或，两侧不同时为 true。",
    detail: "两侧都会计算且必须是布尔值；它不是整数位异或，整数位异或请使用 bxor。",
    example: "true xor false. % true",
  },

  // Elixir special forms and language constructs.
  {
    term: "case",
    language: "elixir",
    scope: "special",
    role: "特殊形式",
    summary: "用模式匹配从多个分支中选择一个。",
    detail:
      "待匹配表达式只计算一次，每个分支都可附加 when 守卫；未匹配会引发 CaseClauseError。",
    example: "case value do\n  {:ok, x} -> x\n  _ -> nil\nend",
  },
  {
    term: "cond",
    language: "elixir",
    scope: "special",
    role: "特殊形式",
    summary: "选择第一个条件为真值的分支。",
    detail:
      "适合没有共同匹配值的多条件判断；通常用 true -> ... 作为最终兜底。",
    example: "cond do\n  ready? -> :go\n  true -> :wait\nend",
  },
  {
    term: "with",
    language: "elixir",
    scope: "special",
    role: "特殊形式",
    summary: "串联多个模式匹配成功路径。",
    detail:
      "任一 <- 匹配失败就停止后续步骤并返回失败值，或交给可选的 else 子句处理。",
    example: "with {:ok, user} <- fetch_user(), do: user.name",
  },
  {
    term: "try",
    language: "elixir",
    scope: "special",
    role: "特殊形式",
    summary: "组合异常、抛出、成功结果与清理处理。",
    detail:
      "可包含 rescue、catch、else 和 after；日常控制流应优先使用返回值而不是异常。",
    example: "try do\n  risky()\nrescue\n  _ -> :error\nend",
  },
  {
    term: "receive",
    language: "elixir",
    scope: "special",
    role: "特殊形式",
    summary: "从当前进程邮箱接收匹配的消息。",
    detail:
      "它是 BEAM 进程通信的底层构造，可使用 after 子句避免无限等待。",
    example: "receive do\n  {:ping, from} -> send(from, :pong)\nend",
  },
  {
    term: "for",
    language: "elixir",
    scope: "special",
    role: "列表推导",
    summary: "从可枚举值生成、筛选并收集结果。",
    detail:
      "可组合多个生成器和过滤条件，还能通过 into: 收集到列表以外的数据结构。",
    example: "for x <- 1..3, do: x * 2",
  },
  {
    term: "alias",
    language: "elixir",
    scope: "special",
    role: "模块别名",
    summary: "为模块名创建当前词法作用域内的短名称。",
    detail:
      "它只影响编译期名称展开，不会复制或导入模块中的函数。",
    example: "alias MyApp.Accounts.User, as: User",
  },
  {
    term: "import",
    language: "elixir",
    scope: "special",
    role: "函数与宏导入",
    summary: "允许省略模块名前缀调用指定函数或宏。",
    detail:
      "建议使用 only: 或 except: 控制范围，减少名称冲突并让调用来源更明确。",
    example: "import Enum, only: [map: 2]",
  },
  {
    term: "require",
    language: "elixir",
    scope: "special",
    role: "宏依赖声明",
    summary: "确保模块已加载，以便调用其中的宏。",
    detail:
      "普通函数调用不需要 require；远程宏调用通常需要先 require 对应模块。",
    example: "require Logger\nLogger.info(\"ready\")",
  },
  {
    term: "quote",
    language: "elixir",
    scope: "special",
    role: "AST 构造",
    summary: "把代码转换为 Elixir 抽象语法树。",
    detail:
      "它是编写宏的基础；返回的三元组与列表结构可由编译器继续展开和编译。",
    example: "ast = quote do: x + 1",
  },
  {
    term: "unquote",
    language: "elixir",
    scope: "special",
    role: "AST 插值",
    summary: "把外部表达式的值插入 quote 生成的 AST。",
    detail:
      "它只能在 quote 上下文中使用，作用类似代码模板中的单个插值点。",
    example: "quote do: unquote(value) + 1",
  },
  {
    term: "unquote_splicing",
    language: "elixir",
    scope: "special",
    role: "AST 列表插值",
    summary: "把 AST 列表中的多个元素展开插入 quote。",
    detail:
      "与 unquote 插入一个值不同，它会把列表内容拼接到所在的参数或元素序列。",
    example: "quote do: [0, unquote_splicing(values)]",
  },
  {
    term: "super",
    language: "elixir",
    scope: "special",
    role: "被覆盖实现调用",
    summary: "在可覆盖定义中调用被覆盖前的实现。",
    detail:
      "常与 defoverridable 和 use 生成的默认实现配合；super() 会沿用当前函数参数。",
    example: "def greet(name), do: super(name) <> \"!\"",
  },

  // Elixir macros that are commonly mistaken for strict keywords.
  {
    term: "defmodule",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "定义模块并建立模块体的编译上下文。",
    detail:
      "模块名通常使用大驼峰别名；模块体中的属性、函数和宏会编译到该模块。",
    example: "defmodule Greeter do\nend",
    note: "常被称为关键字，但它是 Kernel 提供的宏。",
  },
  {
    term: "def",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "定义可从模块外调用的公开函数。",
    detail:
      "同名同元数函数可用多个模式和守卫组成多个子句，按声明顺序匹配。",
    example: "def add(a, b), do: a + b",
    note: "它是宏，不属于 15 个严格保留字。",
  },
  {
    term: "defp",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "定义只能在当前模块内调用的私有函数。",
    detail:
      "私有函数不会导出，也不能通过 Module.function 形式从其他模块调用。",
    example: "defp normalize(text), do: String.trim(text)",
    note: "它是宏，不属于 15 个严格保留字。",
  },
  {
    term: "defmacro",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "定义在编译期接收并返回 AST 的宏。",
    detail:
      "调用方传入的是语法树而非普通运行时值；通常搭配 quote 与 unquote 生成代码。",
    example: "defmacro twice(expr), do: quote(do: unquote(expr) * 2)",
    note: "它是定义宏的宏，不是严格保留字。",
  },
  {
    term: "defstruct",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "为当前模块定义结构体字段和默认值。",
    detail:
      "结构体是带有固定键和 __struct__ 标识的映射，可在编译期检查未知字段。",
    example: "defstruct name: \"\", age: 0",
    note: "它是宏，不属于严格保留字。",
  },
  {
    term: "defprotocol",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "定义按数据类型分派的协议。",
    detail:
      "协议声明一组函数契约，由不同数据类型通过 defimpl 提供各自实现。",
    example: "defprotocol Size do\n  def size(value)\nend",
    note: "它是宏，不属于严格保留字。",
  },
  {
    term: "defimpl",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "为指定数据类型实现一个协议。",
    detail:
      "for: 指定实现目标；协议调用会根据第一个参数的数据类型选择相应实现。",
    example: "defimpl Size, for: BitString do\n  def size(v), do: byte_size(v)\nend",
    note: "它是宏，不属于严格保留字。",
  },
  {
    term: "if",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "根据条件的真值选择 do 或 else 分支。",
    detail:
      "只有 false 和 nil 被视为假；if 是宏，因此并不属于 Elixir 的严格保留字列表。",
    example: "if logged_in?, do: :home, else: :login",
    note: "它是 Kernel 宏，不是严格保留字。",
  },
  {
    term: "use",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "调用目标模块的 __using__/1 宏注入编译期行为。",
    detail:
      "框架常用它批量 alias、import、require 或生成默认函数；应查看目标模块文档了解副作用。",
    example: "use MyApp.Plugin, option: true",
    note: "它会展开为对 __using__/1 的调用，不是严格保留字。",
  },
  {
    term: "raise",
    language: "elixir",
    scope: "common",
    role: "Kernel 宏",
    summary: "创建并抛出异常。",
    detail:
      "可传入异常模块和消息，或直接传入异常结构；用于真正异常的情况而非普通分支。",
    example: "raise ArgumentError, \"invalid value\"",
    note: "它是 Kernel 宏，不是严格保留字。",
  },

  // Erlang module attributes and preprocessor directives: useful, but not words.
  {
    term: "-module",
    language: "erlang",
    scope: "common",
    role: "模块属性",
    summary: "声明源文件编译出的模块名称。",
    detail:
      "每个普通 Erlang 模块都需要一个 -module(Name). 属性，名称通常与 .erl 文件名一致。",
    example: "-module(counter).",
    note: "这是模块属性，不是保留字。",
  },
  {
    term: "-export",
    language: "erlang",
    scope: "common",
    role: "模块属性",
    summary: "列出允许从模块外调用的函数与元数。",
    detail:
      "函数使用 name/arity 形式标识；未导出的函数只能由本模块直接调用。",
    example: "-export([start/0, inc/1]).",
    note: "这是模块属性，不是保留字。",
  },
  {
    term: "-behaviour",
    language: "erlang",
    scope: "common",
    role: "模块属性",
    summary: "声明模块实现某个 behaviour 的回调约定。",
    detail:
      "编译器会依据 behaviour 的 callback 定义检查缺失回调；OTP 常见示例是 gen_server。",
    example: "-behaviour(gen_server).",
    note: "这是模块属性，拼写采用英式 behaviour。",
  },
  {
    term: "-spec",
    language: "erlang",
    scope: "common",
    role: "类型规格",
    summary: "描述函数参数和返回值的类型。",
    detail:
      "Dialyzer 可利用 spec 进行静态分析；规格本身不会在运行时强制检查类型。",
    example: "-spec add(integer(), integer()) -> integer().",
    note: "这是类型属性，不是保留字。",
  },
  {
    term: "-type",
    language: "erlang",
    scope: "common",
    role: "类型声明",
    summary: "为类型表达式定义本地名称。",
    detail:
      "自定义类型可用于 spec 和其他类型；若需暴露给其他模块，还要使用 -export_type。",
    example: "-type user_id() :: pos_integer().",
    note: "这是类型属性，不是保留字。",
  },
  {
    term: "-record",
    language: "erlang",
    scope: "common",
    role: "记录声明",
    summary: "定义具名字段的 record 模板。",
    detail:
      "record 在编译期展开为元组，可设置字段默认值并在模式匹配中按字段名访问。",
    example: "-record(user, {id, name = <<>>}).",
    note: "这是模块属性，不是保留字。",
  },
  {
    term: "-define",
    language: "erlang",
    scope: "common",
    role: "预处理指令",
    summary: "定义预处理宏。",
    detail:
      "宏通过 ?NAME 或带参数形式展开，发生在 Erlang 语法分析之前。",
    example: "-define(TIMEOUT, 5000).",
    note: "这是 EPP 预处理指令，不是保留字。",
  },
  {
    term: "-include",
    language: "erlang",
    scope: "common",
    role: "预处理指令",
    summary: "把头文件内容包含到当前模块。",
    detail:
      "通常用于共享 record、宏和类型声明；标准库头文件还可使用 -include_lib。",
    example: "-include(\"records.hrl\").",
    note: "这是 EPP 预处理指令，不是保留字。",
  },
  {
    term: "-ifdef",
    language: "erlang",
    scope: "common",
    role: "条件预处理",
    summary: "仅在指定宏已定义时包含一段源码。",
    detail:
      "它需要与 -endif 配对，并可使用 -else；常用于测试代码或平台差异。",
    example: "-ifdef(TEST).\n-export([helper/0]).\n-endif.",
    note: "这是 EPP 条件编译指令，不是保留字。",
  },
  {
    term: "-feature",
    language: "erlang",
    scope: "common",
    role: "语言特性控制",
    summary: "在支持的 OTP 版本中启用或禁用可选语言特性。",
    detail:
      "特性名称与状态取决于编译器版本；应放在模块属性区域并核对目标 OTP 的特性状态。",
    example: "-feature(maybe_expr, enable).",
    note:
      "这是模块属性而非保留字；maybe_expr 在早期 OTP 中曾通过它启用，新版本可能已永久启用。",
  },
];
