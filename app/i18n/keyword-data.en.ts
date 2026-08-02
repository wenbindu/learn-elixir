import type { KeywordEntry } from "../keywords/keyword-data";

export const keywordEntriesEn: KeywordEntry[] = [
  // Elixir: 15 strictly reserved words.
  {
    term: "after",
    language: "elixir",
    scope: "reserved",
    role: "Cleanup or timeout clause",
    summary:
      "Run cleanup before leaving, or set a maximum wait for a message.",
    detail:
      "`try ... after` runs cleanup before leaving the try block. `receive ... after` only ends this wait; it does not recall messages that were already sent.",
    example: "try do\n  work()\nafter\n  cleanup()\nend",
  },
  {
    term: "and",
    language: "elixir",
    scope: "reserved",
    role: "Strict Boolean operator",
    summary: "Check whether two Boolean conditions are both true.",
    detail:
      "Both sides must be true or false. If the left side is false, the right side is not run. Use && when you need truthiness with other values.",
    example: "ready? and enabled?",
  },
  {
    term: "catch",
    language: "elixir",
    scope: "reserved",
    role: "Catch clause",
    summary: "Catch special signals such as throw and exit inside try.",
    detail:
      "Ordinary exceptions usually belong in rescue. catch mainly handles `throw/1`, process exits, and lower-level error classes.",
    example:
      "try do\n  throw(:stop)\ncatch\n  :throw, reason -> reason\nend",
  },
  {
    term: "do",
    language: "elixir",
    scope: "reserved",
    role: "Start of a code block",
    summary: "Mark the code that belongs to the current function or decision.",
    detail:
      "Write several lines as `do ... end`. For one expression, you can use the shorter `do: expression` form.",
    example: "if ready?, do: run()",
  },
  {
    term: "else",
    language: "elixir",
    scope: "reserved",
    role: "Alternative clause",
    summary: "Take another path when an earlier condition or match fails.",
    detail:
      "It can appear in if, unless, with, and try. Its trigger is slightly different in each construct.",
    example: "if ok?, do: :yes, else: :no",
  },
  {
    term: "end",
    language: "elixir",
    scope: "reserved",
    role: "End of a code block",
    summary: "Close a code block opened by do, fn, or another construct.",
    detail:
      "Indentation helps people read the code, but it is not syntax. A multiline block must end with end.",
    example: "if ready? do\n  run()\nend",
  },
  {
    term: "false",
    language: "elixir",
    scope: "reserved",
    role: "Boolean literal",
    summary: "Represent “no” or a condition that does not hold.",
    detail:
      "Elixir treats only false and nil as falsy. Zero, an empty string, and an empty list are all truthy.",
    example: "active? = false",
  },
  {
    term: "fn",
    language: "elixir",
    scope: "reserved",
    role: "Anonymous function",
    summary: "Create a nameless function that can be passed to other code.",
    detail:
      "An anonymous function may have several pattern-matching clauses. After storing it in a variable, call it with the dot form: `variable.(arguments)`.",
    example: "double = fn x -> x * 2 end\ndouble.(3)",
  },
  {
    term: "in",
    language: "elixir",
    scope: "reserved",
    role: "Membership operator",
    summary: "Check whether a value belongs to a list or range.",
    detail:
      "in is also allowed in guards. It only tests membership; comprehensions use `<-` to draw values from a collection.",
    example: "2 in 1..3",
  },
  {
    term: "nil",
    language: "elixir",
    scope: "reserved",
    role: "Empty-value literal",
    summary: "Show that there is no value here for now.",
    detail:
      "nil is the literal form of the atom `:nil` and is falsy in conditions. It often means “not found” or that an optional value is missing.",
    example: "result = nil",
  },
  {
    term: "not",
    language: "elixir",
    scope: "reserved",
    role: "Strict Boolean operator",
    summary: "Turn true into false and false into true.",
    detail:
      "not accepts only true or false. Use `!` when you need to invert the truthiness of nil or other values.",
    example: "not finished?",
  },
  {
    term: "or",
    language: "elixir",
    scope: "reserved",
    role: "Strict Boolean operator",
    summary: "Check whether at least one of two Boolean conditions is true.",
    detail:
      "Both sides must be true or false. If the left side is true, the right side is not run. Use `||` for truthiness with other values.",
    example: "cached? or fetch?()",
  },
  {
    term: "rescue",
    language: "elixir",
    scope: "reserved",
    role: "Exception clause",
    summary: "Handle an ordinary exception from a try block by its type.",
    detail:
      "You can catch only named exceptions such as ArgumentError. An exception that does not match keeps travelling outward.",
    example:
      "try do\n  risky()\nrescue\n  ArgumentError -> :invalid\nend",
  },
  {
    term: "true",
    language: "elixir",
    scope: "reserved",
    role: "Boolean literal",
    summary: "Represent “yes” or a condition that holds.",
    detail:
      "true is the literal form of the atom `:true`. It is also often the final cond branch, meaning “all remaining cases.”",
    example: "enabled? = true",
  },
  {
    term: "when",
    language: "elixir",
    scope: "reserved",
    role: "Guard clause",
    summary: "After a pattern matches, check one more condition.",
    detail:
      "A guard after when may use only approved operators and functions. You cannot place any ordinary function there.",
    analogy:
      "It is like checking a name at the gate, then checking the entry rule. Both checks must pass.",
    example: "def positive?(n) when n > 0, do: true",
  },

  // Erlang: 29 strictly reserved words in the current lexical grammar.
  {
    term: "after",
    language: "erlang",
    scope: "reserved",
    role: "Timeout or cleanup clause",
    summary:
      "Stop waiting for a message after a limit, or clean up before leaving try.",
    detail:
      "`receive ... after` only stops the wait when time runs out. Expressions in `try ... after` run before the try expression is left.",
    example: "receive\n  Msg -> Msg\nafter 1000 ->\n  timeout\nend",
  },
  {
    term: "and",
    language: "erlang",
    scope: "reserved",
    role: "Strict Boolean operator",
    summary: "Evaluate both sides, then check whether both are true.",
    detail:
      "Both sides must be Boolean values, and the right side always runs. Use andalso when the right side should not run after a false left side.",
    example: "true and false. % false",
  },
  {
    term: "andalso",
    language: "erlang",
    scope: "reserved",
    role: "Short-circuit Boolean operator",
    summary: "Check the left side first, and continue only when it is true.",
    detail:
      "Both sides should produce Boolean values. Put a safety check first to avoid an unnecessary or unsafe calculation on the right.",
    analogy:
      "First make sure the bridge is open, then send the cart across. If the first check fails, the next step never starts.",
    example: "N > 0 andalso N rem 2 =:= 0.",
  },
  {
    term: "band",
    language: "erlang",
    scope: "reserved",
    role: "Bitwise operator",
    summary:
      "Compare two integers bit by bit, keeping 1 only where both bits are 1.",
    detail:
      "It works only on integers. It is often used to read masks, flags, or selected bits in a binary protocol.",
    example: "6 band 3. % 2",
  },
  {
    term: "begin",
    language: "erlang",
    scope: "reserved",
    role: "Expression block",
    summary: "Group several calculations and treat them as one expression.",
    detail:
      "Separate the steps with commas. They run in order, and the whole `begin ... end` expression returns the value of the last step.",
    example: "begin A = 1, A + 1 end.",
  },
  {
    term: "bnot",
    language: "erlang",
    scope: "reserved",
    role: "Bitwise operator",
    summary: "Flip every bit in the binary representation of an integer.",
    detail:
      "Erlang integers have no fixed 8-bit or 32-bit limit, so the result follows arbitrary-precision integer rules.",
    example: "bnot 0. % -1",
  },
  {
    term: "bor",
    language: "erlang",
    scope: "reserved",
    role: "Bitwise operator",
    summary:
      "Compare two integers bit by bit, producing 1 wherever either bit is 1.",
    detail:
      "It works only on integers and is often used to combine independent bit flags.",
    example: "4 bor 1. % 5",
  },
  {
    term: "bsl",
    language: "erlang",
    scope: "reserved",
    role: "Bit-shift operator",
    summary: "Move all bits in an integer several places to the left.",
    detail:
      "With a positive shift count, this usually acts like multiplication by the matching power of 2. It accepts only integers.",
    example: "3 bsl 2. % 12",
  },
  {
    term: "bsr",
    language: "erlang",
    scope: "reserved",
    role: "Bit-shift operator",
    summary: "Move all bits in an integer several places to the right.",
    detail:
      "It accepts only integers. Negative integers use an arithmetic right shift, preserving their sign meaning.",
    example: "12 bsr 2. % 3",
  },
  {
    term: "bxor",
    language: "erlang",
    scope: "reserved",
    role: "Bitwise operator",
    summary:
      "Compare two integers bit by bit, producing 1 where the bits differ.",
    detail:
      "Matching bits produce 0 and different bits produce 1. This is an integer bit operation, not Boolean xor.",
    example: "6 bxor 3. % 5",
  },
  {
    term: "case",
    language: "erlang",
    scope: "reserved",
    role: "Pattern branch",
    summary: "Run the first branch whose pattern fits the shape of a value.",
    detail:
      "case evaluates its target once, then tries the patterns and optional guards after of from top to bottom. It raises an error if nothing matches.",
    analogy:
      "It is like sorting letters by the mark on each envelope. The first matching rule decides where a letter goes.",
    example: "case X of\n  0 -> zero;\n  _ -> other\nend.",
  },
  {
    term: "catch",
    language: "erlang",
    scope: "reserved",
    role: "Exception capture",
    summary:
      "Catch a thrown value or error and turn it into a result that code can handle.",
    detail:
      "It appears in the older `catch Expression` form and in a try catch clause. New code usually prefers the clearer structure of try.",
    example: "Result = catch risky().",
  },
  {
    term: "cond",
    language: "erlang",
    scope: "reserved",
    role: "Reserved but unused",
    summary:
      "Erlang reserves this name, but it cannot currently start a cond block.",
    detail:
      "cond cannot be used directly as an atom, variable, or function name. Write `'cond'` when you need that atom, and use case or if for branches.",
    example: "erl_scan:reserved_word('cond'). % true",
    note: "The current Erlang grammar does not use this word.",
  },
  {
    term: "div",
    language: "erlang",
    scope: "reserved",
    role: "Arithmetic operator",
    summary: "Divide two integers and keep only the integer part.",
    detail:
      "The result is truncated toward zero, not rounded. A zero divisor raises a `badarith` error.",
    example: "7 div 2. % 3",
  },
  {
    term: "else",
    language: "erlang",
    scope: "reserved",
    role: "maybe failure branch",
    summary:
      "Decide what to do with a value that failed to match inside maybe.",
    detail:
      "The clauses after else still choose by pattern. This belongs only to maybe syntax; it is not a general if-else form.",
    example: "maybe {ok, V} ?= fetch(), V else error -> missing end.",
    note: "Used with maybe expressions. Older OTP releases may not support it.",
  },
  {
    term: "end",
    language: "erlang",
    scope: "reserved",
    role: "End of an expression block",
    summary: "Close a case, fun, if, receive, try, or another block.",
    detail:
      "Indentation cannot close these expressions. Every opened multiline block needs an explicit end.",
    example: "fun(X) -> X * 2 end.",
  },
  {
    term: "fun",
    language: "erlang",
    scope: "reserved",
    role: "Anonymous function or function reference",
    summary:
      "Create an anonymous function, or carry an existing function as a value.",
    detail:
      "An anonymous function may have several pattern clauses. `fun Module:Function/Arity` refers to an existing remote function.",
    example: "Double = fun(X) -> X * 2 end.",
  },
  {
    term: "if",
    language: "erlang",
    scope: "reserved",
    role: "Guard branches",
    summary:
      "Check conditions from top to bottom and run the first branch whose guard is true.",
    detail:
      "An if condition must be an allowed guard expression, not any function call. If no branch matches, Erlang raises an `if_clause` error.",
    example: "if N > 0 -> positive; true -> other end.",
  },
  {
    term: "let",
    language: "erlang",
    scope: "reserved",
    role: "Reserved but unused",
    summary:
      "Erlang reserves this name, but it has no usable let expression today.",
    detail:
      "Erlang binds variables through pattern matching. If you truly need an atom named let, write it as `'let'`.",
    example: "erl_scan:reserved_word('let'). % true",
    note: "The current Erlang grammar does not use this word.",
  },
  {
    term: "maybe",
    language: "erlang",
    scope: "reserved",
    role: "Sequential matching expression",
    summary:
      "Line up several steps that may fail, and stop early when one does not match.",
    detail:
      "`?=` is used only inside maybe. A failed match returns the failing value, or passes it to else for a common result.",
    analogy:
      "Think of a travel pass stamped at each stop. If one stamp is missing, the later steps wait.",
    example: "maybe\n  {ok, V} ?= fetch(),\n  V\nend.",
    note:
      "maybe expressions arrived in Erlang/OTP 25. Older releases do not support them, and early releases may require the maybe_expr feature to be enabled.",
  },
  {
    term: "not",
    language: "erlang",
    scope: "reserved",
    role: "Boolean operator",
    summary: "Turn true into false and false into true.",
    detail:
      "not accepts only Boolean values. Passing a number, atom, or another kind of value raises a `badarg` error.",
    example: "not false. % true",
  },
  {
    term: "of",
    language: "erlang",
    scope: "reserved",
    role: "Pattern-clause marker",
    summary: "Introduce branches that sort a case or try result by shape.",
    detail:
      "case uses of to introduce its branches. of is optional in try, where it handles only values returned normally by the try body.",
    example: "case Value of ok -> done; _ -> retry end.",
  },
  {
    term: "or",
    language: "erlang",
    scope: "reserved",
    role: "Strict Boolean operator",
    summary:
      "Evaluate both sides, then check whether at least one side is true.",
    detail:
      "Both sides must be Boolean values, and the right side always runs. Use orelse when the right side should not run after a true left side.",
    example: "false or true. % true",
  },
  {
    term: "orelse",
    language: "erlang",
    scope: "reserved",
    role: "Short-circuit Boolean operator",
    summary: "Check the left side first, and continue only when it is false.",
    detail:
      "Both sides should produce Boolean values. When the left side is already true, the right side does not run, so it works well for fallback conditions.",
    analogy:
      "Try the short road first. If it is open, there is no need to inspect the backup road.",
    example: "Cached orelse filelib:is_file(Path).",
  },
  {
    term: "receive",
    language: "erlang",
    scope: "reserved",
    role: "Process message reception",
    summary:
      "Take the first message from the current process mailbox that fits a rule.",
    detail:
      "Messages are scanned in arrival order, and unmatched messages stay in the mailbox. Add after to avoid waiting forever.",
    analogy:
      "It is like taking the first acceptable letter from a stack. The other letters stay in the mailbox.",
    example: "receive\n  {ping, From} -> From ! pong\nend.",
  },
  {
    term: "rem",
    language: "erlang",
    scope: "reserved",
    role: "Arithmetic operator",
    summary: "Find the remainder after dividing two integers.",
    detail:
      "rem pairs with div and follows `X = (X div Y) * Y + (X rem Y)`. A zero divisor raises an error.",
    example: "7 rem 2. % 1",
  },
  {
    term: "try",
    language: "erlang",
    scope: "reserved",
    role: "Exception-handling expression",
    summary:
      "Handle a risky calculation, its successful result, its errors, and cleanup in one place.",
    detail:
      "try can combine of, catch, and after to handle normal values plus error, exit, and throw. An unmatched error keeps travelling outward.",
    example: "try risky() catch _:Reason -> {error, Reason} end.",
  },
  {
    term: "when",
    language: "erlang",
    scope: "reserved",
    role: "Guard clause",
    summary: "After a pattern matches, check one more condition.",
    detail:
      "Only approved guard expressions may follow when. Ordinary functions cannot be placed there freely; a false condition moves on to the next clause.",
    analogy:
      "First find the right group on the list, then check the age rule. Both checks must pass.",
    example: "abs(N) when N < 0 -> -N.",
  },
  {
    term: "xor",
    language: "erlang",
    scope: "reserved",
    role: "Boolean operator",
    summary: "Check whether exactly one of two Boolean values is true.",
    detail:
      "Both sides run and both must be Boolean values. Use bxor for an exclusive-or operation on every bit of two integers.",
    example: "true xor false. % true",
  },

  // Elixir special forms and language constructs.
  {
    term: "case",
    language: "elixir",
    scope: "special",
    role: "Special form",
    summary: "Run the first branch whose pattern fits the shape of a value.",
    detail:
      "The target expression is evaluated once, and a branch may add when. If no branch matches, Elixir raises `CaseClauseError`.",
    analogy:
      "It is like sorting objects into a school bag by shape. The first matching rule decides where each object goes.",
    example: "case value do\n  {:ok, x} -> x\n  _ -> nil\nend",
  },
  {
    term: "cond",
    language: "elixir",
    scope: "special",
    role: "Special form",
    summary:
      "Check conditions from top to bottom and run the first truthy branch.",
    detail:
      "cond suits several different questions. It raises an error if no branch is truthy, so `true -> ...` often catches everything left over.",
    example: "cond do\n  ready? -> :go\n  true -> :wait\nend",
  },
  {
    term: "with",
    language: "elixir",
    scope: "special",
    role: "Special form",
    summary:
      "Line up several steps that may fail, and stop early when one does not match.",
    detail:
      "When a `<-` match fails, later steps are skipped. The failed value is returned directly or handled by an optional else block.",
    analogy:
      "Think of a travel pass stamped at each stop. If one stop refuses it, the later steps wait.",
    example: "with {:ok, user} <- fetch_user(), do: user.name",
  },
  {
    term: "try",
    language: "elixir",
    scope: "special",
    role: "Special form",
    summary:
      "Handle a risky calculation, its result, its errors, and cleanup in one place.",
    detail:
      "try may contain rescue, catch, else, and after. For ordinary success and failure, returning values is usually clearer than raising exceptions.",
    example: "try do\n  risky()\nrescue\n  _ -> :error\nend",
  },
  {
    term: "receive",
    language: "elixir",
    scope: "special",
    role: "Special form",
    summary:
      "Take the first message from the current process mailbox that fits a rule.",
    detail:
      "Unmatched messages stay in the mailbox. Add after to set a maximum wait and avoid getting stuck forever.",
    analogy:
      "It is like taking the first acceptable letter from a stack. The other letters stay in the mailbox.",
    example: "receive do\n  {:ping, from} -> send(from, :pong)\nend",
  },
  {
    term: "for",
    language: "elixir",
    scope: "special",
    role: "Comprehension",
    summary:
      "Take values from collections, filter them if needed, and collect new results.",
    detail:
      "for can combine several generators and filters. It returns a list by default; use `into:` to collect into another data structure.",
    example: "for x <- 1..3, do: x * 2",
  },
  {
    term: "alias",
    language: "elixir",
    scope: "special",
    role: "Module alias",
    summary: "Give a long module name a shorter name within the current scope.",
    detail:
      "alias changes only how a name is written at compile time. It does not copy the module or import its functions.",
    example: "alias MyApp.Accounts.User, as: User",
  },
  {
    term: "import",
    language: "elixir",
    scope: "special",
    role: "Function and macro import",
    summary:
      "Bring selected functions or macros into the current scope so the module name can be omitted.",
    detail:
      "Importing too much can create name clashes. Narrow the list with `only:` or `except:` and make each name's origin easier to see.",
    example: "import Enum, only: [map: 2]",
  },
  {
    term: "require",
    language: "elixir",
    scope: "special",
    role: "Macro dependency declaration",
    summary: "Prepare a module before calling one of its macros.",
    detail:
      "Ordinary remote functions do not need require. Remote macros usually do because they expand while code is being compiled.",
    example: "require Logger\nLogger.info(\"ready\")",
  },
  {
    term: "quote",
    language: "elixir",
    scope: "special",
    role: "AST construction",
    summary:
      "Turn code into data that can be inspected and combined instead of running it normally at once.",
    detail:
      "quote returns an AST made from tuples, lists, and literals. Macros can reshape that AST before the compiler expands it.",
    analogy:
      "It is like drawing a plan first. The plan describes the house; it is not the finished house.",
    example: "ast = quote do: x + 1",
  },
  {
    term: "unquote",
    language: "elixir",
    scope: "special",
    role: "AST interpolation",
    summary:
      "Insert a prepared value or piece of AST from outside quote into a code template.",
    detail:
      "unquote has this meaning only inside quote and inserts one value at a time. Use unquote_splicing to insert a list of AST nodes.",
    analogy:
      "Leave one space in a printing block, then place the chosen letter tile into it.",
    example: "quote do: unquote(value) + 1",
  },
  {
    term: "unquote_splicing",
    language: "elixir",
    scope: "special",
    role: "AST list interpolation",
    summary:
      "Open a list of AST nodes and insert all its elements into quote together.",
    detail:
      "The inserted value must be usable as a list of elements. Those elements are joined at the current position, while unquote inserts only one value.",
    analogy:
      "unquote places one letter tile; unquote_splicing joins a whole row of tiles.",
    example: "quote do: [0, unquote_splicing(values)]",
  },
  {
    term: "super",
    language: "elixir",
    scope: "special",
    role: "Call to an overridden implementation",
    summary:
      "After replacing a default function, still call the original implementation.",
    detail:
      "super works only in overridable definitions, often with defoverridable or a default generated by use. The arguments must still fit the current function arity.",
    example: "def greet(name), do: super(name) <> \"!\"",
  },

  // Elixir macros that are commonly mistaken for strict keywords.
  {
    term: "defmodule",
    language: "elixir",
    scope: "common",
    role: "Kernel macro",
    summary:
      "Open a module and place related functions, macros, and data definitions under one name.",
    detail:
      "Module names usually use CamelCase aliases. Attributes, functions, and macros in the do block become part of the module at compile time.",
    example: "defmodule Greeter do\nend",
    note: "It is often called a keyword, but it is a macro provided by Kernel.",
  },
  {
    term: "def",
    language: "elixir",
    scope: "common",
    role: "Kernel macro",
    summary: "Define a function that other modules may call.",
    detail:
      "Several def clauses may share a name and arity while using different patterns and guards. Calls try them in declaration order.",
    example: "def add(a, b), do: a + b",
    note: "It is a macro, not one of the 15 strictly reserved words.",
  },
  {
    term: "defp",
    language: "elixir",
    scope: "common",
    role: "Kernel macro",
    summary: "Define a function for use only inside the current module.",
    detail:
      "A defp function is not exported. Another module cannot call it as `Module.function`, even if it knows the name.",
    example: "defp normalize(text), do: String.trim(text)",
    note: "It is a macro, not one of the 15 strictly reserved words.",
  },
  {
    term: "defmacro",
    language: "elixir",
    scope: "common",
    role: "Kernel macro",
    summary: "Define a macro that generates or rewrites code during compilation.",
    detail:
      "A macro receives the caller's AST, not an ordinary runtime result. It must return AST and often works with quote and unquote.",
    example: "defmacro twice(expr), do: quote(do: unquote(expr) * 2)",
    note: "It is a macro for defining macros, not a strictly reserved word.",
  },
  {
    term: "defstruct",
    language: "elixir",
    scope: "common",
    role: "Kernel macro",
    summary: "Define a fixed set of fields and their default values for this module.",
    detail:
      "A struct is a map marked with `__struct__`. Its allowed keys are fixed at compile time, and writing an unknown field raises an error.",
    example: "defstruct name: \"\", age: 0",
    note: "It is a macro, not a strictly reserved word.",
  },
  {
    term: "defprotocol",
    language: "elixir",
    scope: "common",
    role: "Kernel macro",
    summary:
      "Define one interface for an operation, with a separate implementation for each data type.",
    detail:
      "defprotocol only declares functions. Different types supply behaviour through defimpl, and dispatch uses the first argument of a protocol function.",
    example: "defprotocol Size do\n  def size(value)\nend",
    note: "It is a macro, not a strictly reserved word.",
  },
  {
    term: "defimpl",
    language: "elixir",
    scope: "common",
    role: "Kernel macro",
    summary: "Implement a protocol operation for a chosen data type.",
    detail:
      "`for:` names the target type. The protocol chooses an implementation from its first argument's type and usually raises when none exists.",
    example:
      "defimpl Size, for: BitString do\n  def size(v), do: byte_size(v)\nend",
    note: "It is a macro, not a strictly reserved word.",
  },
  {
    term: "if",
    language: "elixir",
    scope: "common",
    role: "Kernel macro",
    summary: "Run do when a condition is truthy; otherwise run else.",
    detail:
      "Only false and nil are falsy. Zero, an empty string, and an empty list are truthy. if is a Kernel macro, not a strictly reserved word.",
    example: "if logged_in?, do: :home, else: :login",
    note: "It is a Kernel macro, not a strictly reserved word.",
  },
  {
    term: "use",
    language: "elixir",
    scope: "common",
    role: "Kernel macro",
    summary:
      "Ask another module to add a prepared set of code to the current module at compile time.",
    detail:
      "use calls the target module's `__using__/1` macro. It may add aliases, imports, requires, or functions, so read that module's documentation first.",
    example: "use MyApp.Plugin, option: true",
    note: "It expands to a call to __using__/1 and is not a strictly reserved word.",
  },
  {
    term: "raise",
    language: "elixir",
    scope: "common",
    role: "Kernel macro",
    summary: "Raise an exception when normal execution cannot continue.",
    detail:
      "You can pass an exception module and message or an exception struct. Expected ordinary failures are usually clearer as `{:error, reason}`.",
    example: "raise ArgumentError, \"invalid value\"",
    note: "It is a Kernel macro, not a strictly reserved word.",
  },

  // Erlang module attributes and preprocessor directives: useful, but not words.
  {
    term: "-module",
    language: "erlang",
    scope: "common",
    role: "Module attribute",
    summary: "Declare the module that this .erl file will produce.",
    detail:
      "An ordinary Erlang module needs one `-module(Name).` attribute. Its module name normally must match the .erl filename.",
    example: "-module(counter).",
    note: "This is a module attribute, not a reserved word.",
  },
  {
    term: "-export",
    language: "erlang",
    scope: "common",
    role: "Module attribute",
    summary: "List the functions that other modules are allowed to call.",
    detail:
      "Each function is written as `name/arity`, showing its name and argument count. An unexported function can be called directly only inside its own module.",
    example: "-export([start/0, inc/1]).",
    note: "This is a module attribute, not a reserved word.",
  },
  {
    term: "-behaviour",
    language: "erlang",
    scope: "common",
    role: "Module attribute",
    summary:
      "State that this module plans to follow the callback rules of a behaviour.",
    detail:
      "The compiler checks the behaviour's callback declarations for missing required functions. `gen_server` is a common example.",
    example: "-behaviour(gen_server).",
    note: "This is a module attribute, using the British spelling behaviour.",
  },
  {
    term: "-spec",
    language: "erlang",
    scope: "common",
    role: "Type specification",
    summary: "Describe the types a function accepts and the type it returns.",
    detail:
      "Dialyzer uses specs to find suspicious calls, but writing a spec does not make the running program check every value automatically.",
    example: "-spec add(integer(), integer()) -> integer().",
    note: "This is a type attribute, not a reserved word.",
  },
  {
    term: "-type",
    language: "erlang",
    scope: "common",
    role: "Type declaration",
    summary: "Give a local name to a longer type description.",
    detail:
      "The name can be used in specs and other types. Another module can refer to it only after it is exported with `-export_type`.",
    example: "-type user_id() :: pos_integer().",
    note: "This is a type attribute, not a reserved word.",
  },
  {
    term: "-record",
    language: "erlang",
    scope: "common",
    role: "Record declaration",
    summary:
      "Define a set of named fields for creating and reading the same kind of record.",
    detail:
      "A record expands into a tuple at compile time; it is not a runtime object. Fields may have defaults and may be named in patterns.",
    example: "-record(user, {id, name = <<>>}).",
    note: "This is a module attribute, not a reserved word.",
  },
  {
    term: "-define",
    language: "erlang",
    scope: "common",
    role: "Preprocessor directive",
    summary: "Give a reusable macro name to a constant or piece of code.",
    detail:
      "A macro is written as `?NAME` or in a form with parameters. It expands before Erlang parses the regular syntax and is not an ordinary runtime function.",
    example: "-define(TIMEOUT, 5000).",
    note: "This is an EPP preprocessor directive, not a reserved word.",
  },
  {
    term: "-include",
    language: "erlang",
    scope: "common",
    role: "Preprocessor directive",
    summary: "Insert a header file into the current module before compilation.",
    detail:
      "It commonly shares records, macros, and type declarations. Header files from a dependency usually use `-include_lib`.",
    example: "-include(\"records.hrl\").",
    note: "This is an EPP preprocessor directive, not a reserved word.",
  },
  {
    term: "-ifdef",
    language: "erlang",
    scope: "common",
    role: "Conditional preprocessing",
    summary:
      "Send a section of source code to the compiler only when a named macro is defined.",
    detail:
      "`-ifdef` must pair with `-endif` and may include `-else`. The decision happens during preprocessing, not in a runtime if expression.",
    example: "-ifdef(TEST).\n-export([helper/0]).\n-endif.",
    note: "This is an EPP conditional-compilation directive, not a reserved word.",
  },
  {
    term: "-feature",
    language: "erlang",
    scope: "common",
    role: "Language feature control",
    summary:
      "Enable or disable optional syntax in an OTP compiler that supports it.",
    detail:
      "Available features and their defaults change across OTP releases. Place it with module attributes and check the documentation for your target version.",
    example: "-feature(maybe_expr, enable).",
    note:
      "This is a module attribute, not a reserved word. Early OTP releases used it to enable maybe_expr; newer releases may enable that feature permanently.",
  },
];
