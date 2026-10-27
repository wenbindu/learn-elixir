import { defineNotebook, type NotebookLesson } from "../../app/notebook-lesson";

type Text = [string, string];
type Draft = Parameters<typeof defineNotebook>[0] & { environment?: string; setup?: string };
type BilingualDraft = Omit<Draft, "problem" | "ability" | "contribution" | "prediction" | "environment" | "setup" | "notes" | "trace" | "exercise" | "review" | "takeaways"> & {
  problem: Text;
  ability: Text;
  contribution: Text;
  prediction: Text;
  environment?: Text;
  setup?: Text;
  notes: Array<{ lines: number[]; label: Text; text: Text }>;
  trace: Array<{ lines: number[]; label: Text; output: string; explanation: Text }>;
  exercise: Omit<Draft["exercise"], "task" | "explanation" | "hints"> & { task: Text; explanation: Text; hints: [Text, Text] };
  review: { slug: string; question: Text; answer: Text };
  takeaways: [Text, Text, Text];
};

const drafts: BilingualDraft[] = [
  {
    slug: "module-attributes-and-records", core: ["module-attribute", "record"], prerequisites: ["module", "binding", "collection"],
    environment: ["保存为 nb_book.erl", "Save as nb_book.erl"],
    setup: ["在独立练习目录保存模块，启动 erl，运行 {ok, nb_book} = c(nb_book), nb_book:demo(). 匹配编译成功后才继续调用，保留两步之间的逗号。练习修改后重跑同一条命令。", "Save the module in a scratch directory. In erl run {ok, nb_book} = c(nb_book), nb_book:demo(). The success match prevents a call after compilation fails; keep both steps in one comma-separated command. Repeat it after editing."],
    problem: ["更新 record 的页数后，旧书的默认页数会变吗？", "Does updating a record also change the original book's default page count?"],
    ability: ["能用模块属性、宏和 record 定义、读取与更新固定字段。", "Define, read, and update named record fields using module attributes and a macro."],
    contribution: ["为文件报告的内部固定数据建模，避免让调用者依赖 tuple 位置。", "Model fixed internal report data without making callers depend on tuple positions."],
    prediction: ["最后三个数字分别是多少？tuple 是否保存字段名？", "What are the final three numbers? Does the tuple store field names?"],
    code: '-module(nb_book).\n-export([demo/0]).\n-define(DEFAULT_PAGES, 1).\n-record(book, {title, pages = ?DEFAULT_PAGES}).\ndemo() ->\n  Book = #book{title = <<"River">>},\n  Updated = Book#book{pages = 120},\n  {Book#book.pages, Updated#book.pages, tuple_size(Updated)}.',
    notes: [
      { lines: [1, 2], label: ["模块属性", "Module attributes"], text: ["module 声明模块名，export 公开 demo/0；这些声明放在 .erl 文件中，由编译器处理。", "module names the module; export exposes demo/0. These declarations belong in the .erl file and are processed by the compiler."] },
      { lines: [3, 4], label: ["宏与字段", "Macro and fields"], text: ["define 定义预处理宏；?DEFAULT_PAGES 展开成 1。record 给 tuple 位置命名，未提供的 pages 使用默认值。", "define introduces a preprocessor macro; ?DEFAULT_PAGES expands to 1. The record names tuple positions and supplies a default for pages."] },
      { lines: [5, 6, 7], label: ["创建与更新", "Create and update"], text: ["demo 创建 Book，再生成 Updated；record 更新返回新值，原来的绑定保持不变。", "demo creates Book, then produces Updated. A record update returns a new value; the original binding stays unchanged."] },
      { lines: [8], label: ["运行时仍是 tuple", "Still a tuple at runtime"], text: ["#book.pages 按字段读取。tuple 有 book 标签、title 和 pages 共三项，不保存 title、pages 这两个字段名。", "#book.pages reads a named field. The tuple contains the book tag and two values, but does not store the field names title and pages."] },
    ],
    trace: [{ lines: [8], label: ["旧值仍为默认值", "The original keeps its default"], output: "{1,120,3}", explanation: ["Book 保留默认页数 1，Updated 的页数是 120；record 的运行时 tuple 有三项。", "Book keeps its default of 1; Updated has 120 pages. The runtime record tuple has three elements."] }],
    exercise: { replace: ["pages = 120", "pages = 0"], task: ["只把新页数改成 0，预测原值与新值。", "Change only the new page count to 0. Predict both page counts."], choices: ["{0,0,3}", "{1,0,3}", "{1,1,2}"], correct: 1, output: "{1,0,3}", explanation: ["显式提供 0 会覆盖新 record 的默认值，Book 的页数仍为 1。默认值不会把 0 改回 1。", "Explicitly supplying 0 overrides the default in the new record. Book still has 1 page; defaults do not replace an explicit zero."], hints: [["默认值只在未提供字段时使用。", "A default applies when a field is omitted."], ["更新结果绑定到了另一个变量。", "The update result is bound to a different variable."]] },
    review: { slug: "variables-and-matching", question: ["变量已绑定后，再用 = 给它不同的值会怎样？", "What happens if = matches a bound variable against a different value?"], answer: ["匹配失败；需要新变量保存新值。", "The match fails. Bind a new variable to retain a different value."] },
    takeaways: [["模块属性由编译器处理，宏由预处理器展开。", "The compiler handles attributes; the preprocessor expands macros."], ["record 给 tuple 位置命名，不携带运行时字段名。", "Records name tuple positions without storing runtime field names."], ["更新返回新值，旧 record 不变。", "An update returns a new value and preserves the original record."]],
  },
  {
    slug: "rebar3-and-eunit", core: ["rebar3", "eunit"], prerequisites: ["module", "pattern-matching"],
    environment: ["保存为 nb_count.erl", "Save as nb_count.erl"],
    setup: ["在 erl 中运行 {ok, nb_count} = c(nb_count), eunit:test(nb_count). 编译成功后才执行测试；此例的断言故意先失败。移入 rebar3 项目时放在 src/，从系统终端执行 rebar3 eunit；不要把该命令粘入 erl。", "In erl run {ok, nb_count} = c(nb_count), eunit:test(nb_count). Run the test only after compilation succeeds; the initial assertion deliberately fails. In a Rebar3 project, place the file under src/ and run rebar3 eunit in the system terminal."],
    problem: ["函数能返回一个数字，是否就证明计数符合约定？", "Does returning a number prove that the counter meets its contract?"],
    ability: ["能运行真实 EUnit 测试，并从期待值与实际值定位失败。", "Run a real EUnit test and diagnose an expected-versus-actual mismatch."],
    contribution: ["给文件报告的字符计数保存可重复的检查。", "Keep a repeatable check for the file report's character count."],
    prediction: ["beam 有几个字符？这个测试会通过吗？", "How many characters are in beam? Will this test pass?"],
    code: '-module(nb_count).\n-include_lib("eunit/include/eunit.hrl").\ntext_length(Text) -> length(unicode:characters_to_list(Text)).\nlength_test() ->\n  ?assertEqual(3, text_length(<<"beam">>)).',
    notes: [
      { lines: [1, 2], label: ["准备测试模块", "Prepare the test module"], text: ["EUnit 头文件提供断言宏，并让 _test 函数参与测试发现。rebar3 负责项目的创建、编译、依赖和测试任务。", "The EUnit header supplies assertion macros and enables discovery of _test functions. Rebar3 manages project creation, compilation, dependencies, and test tasks."] },
      { lines: [3], label: ["按字符计数", "Count characters"], text: ["先把 UTF-8 binary 解码为码点 list，再求长度；这里使用 ASCII 样例，四个字母就是四个码点。", "Decode the UTF-8 binary into code points, then count them. This ASCII fixture has four letters and four code points."] },
      { lines: [4, 5], label: ["真正的断言", "A real assertion"], text: ["assertEqual 的第一项是独立预期，第二项是实际调用。测试期望故意写错为 3；框架会捕获断言失败。", "assertEqual takes an independent expectation followed by the actual call. The deliberately wrong expectation is 3; EUnit catches the assertion failure."] },
    ],
    trace: [{ lines: [5], label: ["EUnit 报告失败", "EUnit reports a failure"], output: "expected: 3\nvalue: 4\nerror", explanation: ["断言期望 3，实际是 4。EUnit 输出失败报告，eunit:test/1 的返回值是 error；报告排版随版本变化。", "The assertion expects 3 but receives 4. EUnit prints a failure report and eunit:test/1 returns error. Report formatting varies by version."] }],
    exercise: { replace: ["?assertEqual(3,", "?assertEqual(4,"], task: ["只把预期改为四个字符，重新编译并运行测试。", "Change only the expectation to four characters, then recompile and run the test."], choices: ["ok", "error", "4"], correct: 0, output: "ok", explanation: ["预期与实际都是整数 4，测试通过。eunit:test/1 返回 ok，不返回被测函数的数字。", "Expected and actual values are both integer 4, so the test passes. eunit:test/1 returns ok, not the number returned by the counter."], hints: [["从样例本身数出四个字母。", "Count the four letters in the fixture."], ["区分函数结果与测试任务的结果。", "Distinguish the function result from the test runner's result."]] },
    review: { slug: "unicode-and-text", question: ["binary 的字节数总等于字符数吗？", "Is a binary's byte count always its character count?"], answer: ["不总相等；UTF-8 字符可能占多个字节，字符计数先解码。", "No. A UTF-8 character can occupy multiple bytes; decode before counting code points."] },
    takeaways: [["源码放 src/，项目配置放 rebar.config。", "Keep project source in src/ and configuration in rebar.config."], ["EUnit 的断言比较预期与实际。", "EUnit assertions compare expected and actual values."], ["失败报告和测试返回值是两种信息。", "A failure report and the test runner's return value convey different information."]],
  },
  {
    slug: "result-contracts", core: ["result-tuple"], prerequisites: ["guard", "anonymous-function", "collection"],
    problem: ["除数为浮点数 0.0 时，安全除法也会处理吗？", "Does safe division also handle the floating-point divisor 0.0?"],
    ability: ["能用 guard 与带标签 tuple 返回成功或可处理的失败。", "Use a guard and tagged tuples to return success or a recoverable failure."],
    contribution: ["让文件读取和解析层把错误原因交给 CLI。", "Let file reading and parsing pass error reasons to the CLI."],
    prediction: ["0.0 会被零除数规则接住，还是触发 badarith？", "Will the zero rule catch 0.0, or will division raise badarith?"],
    code: 'Divide = fun\n  (_Left, Right) when Right == 0 -> {error, division_by_zero};\n  (Left, Right) -> {ok, Left / Right}\nend,\nDivide(12, 0.0).',
    notes: [
      { lines: [1, 2], label: ["先匹配数值零", "Match numeric zero first"], text: ["== 比较数值时允许整数与浮点数相等，因此 0.0 也命中。错误原因使用稳定 atom。", "Numeric == allows integer and float values to compare equal, so 0.0 also matches. The failure reason is a stable atom."] },
      { lines: [3, 4], label: ["成功保留标签", "Keep the success tag"], text: ["非零数值进入第二个子句，/ 返回浮点数，再用 ok 标签包装。约定的输入是两个数值。", "Nonzero numeric divisors reach the second clause. / returns a float, wrapped with the ok tag. The input contract here is two numbers."] },
      { lines: [5], label: ["观察错误数据", "Observe failure as data"], text: ["返回 error tuple 不会抛异常或终止 shell 的求值进程；调用者可以继续用 case 处理。", "Returning an error tuple neither raises an exception nor terminates the shell evaluator. A caller can handle it with case."] },
    ],
    trace: [{ lines: [2, 5], label: ["没有执行除法", "Division is skipped"], output: "{error,division_by_zero}", explanation: ["0.0 == 0 为 true，先返回错误 tuple，后面的除法子句不会执行。", "0.0 == 0 is true. The first clause returns an error tuple, so the division clause never runs."] }],
    exercise: { replace: ["Divide(12, 0.0)", "Divide(12, 3)"], task: ["只把调用的除数改为 3，预测返回形状。", "Change only the divisor in the call to 3. Predict the result shape."], choices: ["4", "{ok,4.0}", "{error,division_by_zero}"], correct: 1, output: "{ok,4.0}", explanation: ["第二个子句计算 12 / 3，得到 4.0，再包装成成功 tuple。", "The second clause computes 12 / 3 as 4.0 and wraps it in the success tuple."], hints: [["保留子句中的 ok 标签。", "Keep the clause's ok tag."], ["/ 与 div 的返回类型不同。", "/ and div produce different numeric types."]] },
    review: { slug: "operators-and-truthiness", question: ["0 == 0.0 与 0 =:= 0.0 分别是什么？", "What are 0 == 0.0 and 0 =:= 0.0?"], answer: ["分别为 true 和 false；=:= 也区分数值类型。", "They are true and false respectively; =:= also distinguishes numeric types."] },
    takeaways: [["成功与失败都保留固定形状。", "Keep stable shapes for success and failure."], ["guard 要覆盖约定允许的输入。", "Guards must cover the inputs allowed by the contract."], ["面向人的错误提示留给 CLI。", "Leave human-readable error messages to the CLI."]],
  },
  {
    slug: "files-and-io", core: ["file-io"], prerequisites: ["result-tuple", "binding"],
    environment: ["erl shell；需要可写的 /tmp（macOS/Linux）", "erl shell; requires writable /tmp (macOS/Linux)"],
    problem: ["成功写入文件后，读另一个名字会得到空内容吗？", "After writing a file, does reading a different name return empty content?"],
    ability: ["能在独立临时目录读写文件、检查结果并清理样例。", "Write and read a file in an isolated temporary directory, inspect results, and clean up."],
    contribution: ["建立文件报告的读取边界，保留文件系统错误原因。", "Build the report's file boundary while preserving filesystem error reasons."],
    prediction: ["io:format 的 ok 与 file:read_file 的结果有何不同？", "How does io:format's ok differ from the result of file:read_file?"],
    code: 'Dir = filename:join("/tmp", "beam-note-" ++ integer_to_list(erlang:system_time(nanosecond))),\nok = file:make_dir(Dir),\nPath = filename:join(Dir, "report.txt"),\nok = file:write_file(Path, <<"hello beam\\nagain\\n">>),\nResult = file:read_file(Path),\nok = file:delete(Path), ok = file:del_dir(Dir),\nio:format("read_result=~p~n", [Result]),\nResult.',
    notes: [
      { lines: [1, 2, 3], label: ["创建独立目录", "Create an isolated directory"], text: ["用 filename 拼接路径；make_dir 必须成功才继续，目录重名会停止，不覆盖已有文件。这里明确使用 /tmp。", "Use filename to construct paths. make_dir must succeed before proceeding; a collision stops the example without overwriting an existing file. This example uses /tmp."] },
      { lines: [4, 5], label: ["文件 I/O", "File I/O"], text: ["写入成功返回 ok；读取成功返回 {ok, Binary}，失败返回 {error, Reason}。Result 保留两种可能。", "Writing returns ok on success. Reading returns {ok, Binary} or {error, Reason}; Result retains either outcome."] },
      { lines: [6], label: ["只清理自己的样例", "Clean up the owned fixture"], text: ["删除本例创建的文件和目录；读取到的 binary 已经保存在 Result 中。", "Delete the file and directory created by this example. Any binary already read remains in Result."] },
      { lines: [7, 8], label: ["显示与返回分开", "Separate display and return"], text: ["io:format 向终端打印并返回 ok；最后一行把真正的读取结果交回 shell。", "io:format prints to the terminal and returns ok. The last line returns the actual read result to the shell."] },
    ],
    trace: [{ lines: [7, 8], label: ["返回带标签的 binary", "Return a tagged binary"], output: '{ok,<<"hello beam\\nagain\\n">>}', explanation: ["终端先打印带 read_result= 前缀的内容，最终返回读取 tuple。删除磁盘文件不会删除已读入的值。", "The terminal first prints a read_result= line; the expression returns the read tuple. Deleting the disk file does not remove the value already read."] }],
    exercise: { replace: ["file:read_file(Path)", 'file:read_file(filename:join(Dir, "missing.txt"))'], task: ["只把读取目标换成新目录中不存在的 missing.txt。", "Change only the read target to missing.txt, which is absent from the new directory."], choices: ["{ok,<<>>}", "{error,enoent}", "ok"], correct: 1, output: "{error,enoent}", explanation: ["样例只创建了 report.txt，因此 missing.txt 返回 enoent。清理仍删除原来的样例文件和目录。", "Only report.txt was created, so missing.txt returns enoent. Cleanup still removes the original fixture and its directory."], hints: [["对照创建和读取的文件名。", "Compare the written and requested filenames."], ["不存在与空文件是不同状态。", "A missing file and an empty file are different states."]] },
    review: { slug: "rebar3-and-eunit", question: ["EUnit 测试通过时，测试任务返回被测函数的数字吗？", "Does a passing EUnit run return the tested function's number?"], answer: ["不返回；eunit:test/1 返回 ok。函数值由断言核对。", "No. eunit:test/1 returns ok; assertions check the function's value."] },
    takeaways: [["路径使用 filename 拼接。", "Construct paths with filename."], ["每次读取都检查结果 tuple。", "Check the result tuple on every read."], ["读取、清理与终端输出各有返回值。", "Reading, cleanup, and terminal output each have their own return values."]],
  },
  {
    slug: "higher-order-data-pipelines", core: ["higher-order-pipeline"], prerequisites: ["anonymous-function", "recursion", "collection"],
    problem: ["及格分数加五分，刚好 60 分会不会被漏掉？", "When passing scores receive five extra points, can a score of exactly 60 be lost?"],
    ability: ["能串联 filter、map、foldl，并检查每步数据。", "Chain filter, map, and foldl while inspecting intermediate values."],
    contribution: ["把文件行筛选、逐行计算和总量累加分成清楚的步骤。", "Separate filtering file lines, calculating each line, and accumulating totals."],
    prediction: ["filter 后有几项？map 后的总分是多少？", "How many entries survive filter, and what is the total after map?"],
    code: 'Scores = [42, 60, 78, 91],\nPassed = lists:filter(fun(Score) -> Score >= 60 end, Scores),\nBoosted = lists:map(fun(Score) -> Score + 5 end, Passed),\nTotal = lists:foldl(fun(Score, Sum) -> Score + Sum end, 0, Boosted),\n{Boosted, Total}.',
    notes: [
      { lines: [1, 2], label: ["先筛选", "Filter first"], text: ["filter 接收函数作为参数，函数必须返回 true 或 false。>= 保留刚好 60 的边界。", "filter receives a function whose result must be true or false. >= retains the boundary value 60."] },
      { lines: [3], label: ["再变换", "Then transform"], text: ["map 对每个保留下来的分数加 5，保持 list 项数。", "map adds 5 to each retained score and preserves the list length."] },
      { lines: [4, 5], label: ["收成一个总量", "Accumulate one total"], text: ["foldl 从初始和 0 开始，依次把当前分数加到 Sum；最后同时显示中间 list 与总和。", "foldl starts with sum 0 and adds each score to Sum. The final tuple exposes both the transformed list and its total."] },
    ],
    trace: [{ lines: [5], label: ["边界项也参与", "Include the boundary item"], output: "{[65,83,96],244}", explanation: ["60、78、91 被保留，加分后是 65、83、96；foldl 得到 244。这些 list 操作立即执行。", "60, 78, and 91 survive. Adding five gives 65, 83, and 96; foldl totals 244. These list operations execute eagerly."] }],
    exercise: { replace: ["Score >= 60", "Score > 60"], task: ["只把 >= 改成 >，观察漏掉边界后的 list 和总和。", "Change only >= to > and predict the list and total after dropping the boundary."], choices: ["{[65,83,96],244}", "{[83,96],179}", "{[78,91],169}"], correct: 1, output: "{[83,96],179}", explanation: ["60 被筛掉，后两步不会再处理它；只给 78、91 加分，所以总和减少 65。", "60 is filtered out before the later steps. Only 78 and 91 receive the bonus, so the total decreases by 65."], hints: [["先重算 Passed，不要直接猜总和。", "Recompute Passed before guessing the total."], ["被删掉的是加分前的 60。", "The removed input is 60 before the bonus."]] },
    review: { slug: "recursion-and-folds", question: ["foldl 的初始累加值在空 list 时有什么作用？", "What does foldl's initial accumulator do for an empty list?"], answer: ["没有元素可处理，直接返回初始累加值。", "With no elements to process, foldl returns the initial accumulator."] },
    takeaways: [["filter 决定保留哪些项。", "filter decides which items remain."], ["map 每项产生一个结果。", "map produces one result per item."], ["foldl 的初值决定空输入的结果。", "foldl's initial accumulator determines the empty-input result."]],
  },
  {
    slug: "records-and-boundaries", core: ["representation-boundary"], prerequisites: ["record", "result-tuple", "pattern-matching"],
    environment: ["保存为 nb_profile.erl", "Save as nb_profile.erl"],
    setup: ["在 erl 中运行 {ok, nb_profile} = c(nb_profile), nb_profile:public(#{name => <<\"Ada\">>, score => 9}). 练习只修改 record 默认值，再重跑这条带编译成功匹配的命令。", "In erl run {ok, nb_profile} = c(nb_profile), nb_profile:public(#{name => <<\"Ada\">>, score => 9}). After editing the record default, repeat this command including its compile-success match."],
    problem: ["内部有分数字段，调用者是否必须知道它？", "Must callers know about an internal score field?"],
    ability: ["能在 map 入口校验字段，内部使用 record，出口选择公开字段。", "Validate a map at entry, use a record internally, and select public fields at exit."],
    contribution: ["使文件报告的公开 map 不依赖内部 tuple 布局。", "Keep the file report's public maps independent of internal tuple layout."],
    prediction: ["score 与 cache 字段会出现在返回 map 中吗？", "Will score and cache appear in the returned map?"],
    code: '-module(nb_profile).\n-export([public/1]).\n-record(user, {name, score = 0, cache = cold}).\npublic(#{name := Name, score := Score}) ->\n  User = #user{name = Name, score = Score},\n  {ok, #{name => User#user.name}};\npublic(_) -> {error, invalid_user}.',
    notes: [
      { lines: [1, 2, 3], label: ["内部固定结构", "Private fixed structure"], text: ["只有 public/1 导出；user record 的 score、cache 留在模块内，调用者无需引用 record 定义。", "Only public/1 is exported. The user record's score and cache remain inside the module; callers need no record definition."] },
      { lines: [4, 5], label: ["入口转换", "Convert at entry"], text: ["map 模式要求 name 和 score 两键存在，再创建 record。此例校验键是否存在，未校验值的类型。", "The map pattern requires name and score before constructing the record. This example checks key presence, not the value types."] },
      { lines: [6, 7], label: ["出口只给公开字段", "Select fields at exit"], text: ["成功只返回带 name 的 map；缺键等不匹配输入返回 invalid_user。内部 record 没有直接离开模块。", "Success returns only a map containing name. Inputs that fail the pattern return invalid_user. The internal record never leaves the module."] },
    ],
    trace: [{ lines: [6], label: ["表示被边界隔离", "The boundary hides representation"], output: '{ok,#{name => <<"Ada">>}}', explanation: ["调用者只得到公开名字。传入的 score 和内部 cache 都不会因存进 record 而自动公开。", "The caller receives only the public name. Neither the input score nor the internal cache becomes public merely by being stored in a record."] }],
    exercise: { replace: ["cache = cold", "cache = warm"], task: ["只把内部 cache 默认值改为 warm，公开结果会变化吗？", "Change only the private cache default to warm. Does the public result change?"], choices: ['{ok,#{name => <<"Ada">>}}', '{ok,#{name => <<"Ada">>,cache => warm}}', "{error,invalid_user}"], correct: 0, output: '{ok,#{name => <<"Ada">>}}', explanation: ["出口没有读取 cache，公开结果保持不变。内部表示可独立变化，调用者继续依赖 name 字段。", "The exit conversion never reads cache, so the public result stays unchanged. Internal representation can change while callers continue to depend on name."], hints: [["沿着返回表达式找公开的键。", "Find the keys in the return expression."], ["返回 map 中没有 cache。", "The returned map has no cache key."]] },
    review: { slug: "nested-collections", question: ["map 模式中的 := 要求什么？", "What does := require in a map pattern?"], answer: ["要求对应键存在，并让它的值与右侧模式匹配。", "The key must exist, and its value must match the pattern on the right."] },
    takeaways: [["入口检查接收的 map 形状。", "Check the incoming map shape at entry."], ["record 保留在定义它的模块内。", "Keep records inside their owning module."], ["出口明确选择公开字段。", "Choose public fields explicitly at exit."]],
  },
  {
    slug: "behaviours-and-callbacks", core: ["behaviour", "callback"], prerequisites: ["module", "module-attribute"],
    environment: ["第 1–2 行保存为 nb_greeter.erl；第 3–6 行另存为 nb_friendly.erl", "Save lines 1–2 as nb_greeter.erl and lines 3–6 as nb_friendly.erl"],
    setup: ["两份文件放同一独立目录。在 erl 中运行 {ok, nb_greeter} = c(nb_greeter), {ok, nb_friendly} = c(nb_friendly), nb_friendly:hello(<<\"Ada\">>). 两次编译都成功才调用；保持为一条逗号连接的命令。两个模块必须分别保存。", "Put both files in one scratch directory. In erl run {ok, nb_greeter} = c(nb_greeter), {ok, nb_friendly} = c(nb_friendly), nb_friendly:hello(<<\"Ada\">>). Both compilations must succeed before the call; keep one comma-separated command. Save the modules separately."],
    problem: ["写了 behaviour，但忘记导出 callback，会自动补好吗？", "Will declaring a behaviour automatically export a missing callback?"],
    ability: ["能声明真实 callback、编译实现，并识别导出缺失的警告。", "Declare a real callback, compile its implementation, and recognize a missing-export warning."],
    contribution: ["为文件报告未来可替换的读取模块约定共同入口。", "Define a shared entry point for replaceable file readers in the report project."],
    prediction: ["hello 的正文来自 behaviour 还是实现模块？", "Does hello's body come from the behaviour or the implementation module?"],
    code: '-module(nb_greeter).\n-callback hello(binary()) -> binary().\n-module(nb_friendly).\n-behaviour(nb_greeter).\n-export([hello/1]).\nhello(Name) -> <<"Hello, ", Name/binary>>.',
    notes: [
      { lines: [1, 2], label: ["第一份文件：约定", "First file: contract"], text: ["nb_greeter 声明 hello/1 接受并返回 binary。callback 写函数名、参数个数与类型，不提供这次的函数正文。", "nb_greeter declares hello/1 with binary input and output. The callback specifies name, arity, and types without supplying this implementation."] },
      { lines: [3, 4], label: ["第二份文件：实现", "Second file: implementation"], text: ["nb_friendly 声明遵守 nb_greeter。先编译约定模块，编译器才可读取 callback 信息并检查实现。", "nb_friendly declares nb_greeter as its behaviour. Compile the contract first so the compiler can inspect its callbacks when checking the implementation."] },
      { lines: [5, 6], label: ["导出且写出正文", "Export and implement"], text: ["hello/1 必须导出才能被模块外调用。正文把固定问候前缀与传入 binary 拼接；behaviour 不会启动进程。", "hello/1 must be exported for external calls. Its body concatenates a greeting prefix and the input binary. Declaring a behaviour does not start a process."] },
    ],
    trace: [{ lines: [6], label: ["调用具体实现", "Call the implementation"], output: '<<"Hello, Ada">>', explanation: ["nb_friendly 的 hello/1 正文生成问候，behaviour 用于编译时检查这个入口是否实现。", "nb_friendly's hello/1 body constructs the greeting. The behaviour lets the compiler check whether the required entry point is implemented."] }],
    exercise: { replace: ["-export([hello/1]).", "-export([])."], task: ["只清空实现模块的导出列表，重新编译再调用 hello/1。", "Empty only the implementation's export list, recompile, then call hello/1 again."], choices: ['<<"Hello, Ada">>', "undef", "ok"], correct: 1, output: "undef", explanation: ["编译器警告 callback 未导出；正文虽存在，外部调用仍抛出 error:undef。behaviour 不会替你导出函数。", "The compiler warns that the callback is not exported. Although its body exists, the external call raises error:undef; the behaviour does not export functions for you."], hints: [["检查调用边界需要哪个 name/arity。", "Check the name/arity needed at the call boundary."], ["存在正文不代表外部可调用。", "Having a body does not make a function externally callable."]] },
    review: { slug: "modules-and-beam", question: ["模块外调用由什么声明决定？", "Which declaration controls calls from outside a module?"], answer: ["-export 列出允许外部调用的函数名与参数个数。", "-export lists the function names and arities available to external callers."] },
    takeaways: [["callback 描述模块接口。", "Callbacks describe module interfaces."], ["实现需要同名、同参数个数且导出的函数。", "Implementations need exported functions with the required names and arities."], ["编译警告和运行异常要分别检查。", "Inspect compiler warnings and runtime exceptions separately."]],
  },
  {
    slug: "typespecs-and-dialyzer", core: ["typespec"], prerequisites: ["module", "value-type", "module-attribute"],
    environment: ["保存为 nb_typed.erl", "Save as nb_typed.erl"],
    setup: ["在 erl 中运行 {ok, nb_typed} = c(nb_typed, [debug_info]), nb_typed:count(<<\"hello\">>). 编译成功后才调用。Dialyzer 需另行运行；移入 rebar3 项目后从系统终端执行 rebar3 dialyzer，首次可能需要建立 PLT。", "In erl run {ok, nb_typed} = c(nb_typed, [debug_info]), nb_typed:count(<<\"hello\">>). The call follows only a successful compile. Run Dialyzer separately; in a Rebar3 project use rebar3 dialyzer in the system terminal. The first run may build a PLT."],
    problem: ["spec 承诺返回非负整数，为什么实际还能返回 binary？", "Why can a function return a binary when its spec promises a nonnegative integer?"],
    ability: ["能写真实 type/spec，并区分运行结果与 Dialyzer 的静态分析。", "Write actual type/spec declarations and distinguish execution from Dialyzer's static analysis."],
    contribution: ["给文件报告的统计入口写准确的输入输出类型。", "Specify accurate input and output types for the report's counting API."],
    prediction: ["这次调用会得到 5，还是原 binary？", "Will this call return 5 or the original binary?"],
    code: '-module(nb_typed).\n-export([count/1]).\n-type count() :: non_neg_integer().\n-spec count(binary()) -> count().\ncount(Text) -> Text.',
    notes: [
      { lines: [1, 2], label: ["公开函数", "Public function"], text: ["保存并编译真实模块，count/1 可以从 shell 调用。", "Save and compile the actual module; count/1 can then be called from the shell."] },
      { lines: [3, 4], label: ["命名类型与规格", "Named type and spec"], text: ["count() 把非负整数起名；spec 说明 binary 输入与 count() 输出。Dialyzer 可分析代码与规格的矛盾。", "count() names the nonnegative integer type. The spec states binary input and count() output. Dialyzer can analyze inconsistencies between code and specifications."] },
      { lines: [5], label: ["故意违背承诺", "Deliberate contract mismatch"], text: ["正文直接返回输入。编译器接受这段合法语法；spec 不会在调用时自动计数、转换或校验值。", "The body returns its input. The compiler accepts this valid syntax; a spec does not automatically count, convert, or validate values at call time."] },
    ],
    trace: [{ lines: [5], label: ["执行正文的真实结果", "The body's actual result"], output: '<<"hello">>', explanation: ["运行时仍返回原 binary，与 spec 冲突。静态分析需要另行执行；这次调用本身不是 Dialyzer 检查。", "Execution returns the original binary, contradicting the spec. Static analysis must run separately; this function call is not a Dialyzer check."] }],
    exercise: { replace: ["count(Text) -> Text.", "count(Text) -> length(unicode:characters_to_list(Text))."], task: ["只把函数正文改为解码后计数，预测返回值。", "Change only the body to count decoded code points. Predict the return value."], choices: ['<<"hello">>', "5", "error"], correct: 1, output: "5", explanation: ["hello 解码为五个码点，计数得到整数 5。正式 API 还应说明输入必须为有效 UTF-8，或为编码错误提供返回分支。", "hello decodes to five code points, producing integer 5. A production API must also require valid UTF-8 or define a return branch for decoding failures."], hints: [["先把 binary 转成字符 list。", "Decode the binary to a character list first."], ["type/spec 不会替正文执行这一步。", "The type/spec cannot perform this step for the body."]] },
    review: { slug: "result-contracts", question: ["一个可能失败的 API 的类型需要写哪些分支？", "Which branches belong in the type of an API that can fail?"], answer: ["同时描述成功值与失败原因，如 {ok, Value} | {error, Reason}。", "Describe both success and failure, such as {ok, Value} | {error, Reason}."] },
    takeaways: [["-type 为重复的数据形状命名。", "-type names reusable data shapes."], ["-spec 如实描述函数约定。", "-spec must describe the real function contract."], ["静态分析和运行测试分别执行。", "Run static analysis and execution tests separately."]],
  },
  {
    slug: "eunit-and-common-test", core: ["boundary-test", "test-suite"], prerequisites: ["eunit", "guard", "anonymous-function"],
    problem: ["只测 11 件能通过，满 10 件的折扣规则就正确了吗？", "If an eleven-item test passes, is the discount rule for ten or more items correct?"],
    ability: ["能用 EUnit 检查边界两侧，并判断何时需要 Common Test suite。", "Check both sides of a boundary with EUnit and recognize when a Common Test suite is useful."],
    contribution: ["给文件报告补空文件、正常文件和失败输入的边界检查。", "Add empty-file, normal-file, and failure-boundary checks to the report."],
    prediction: ["9、10、11 三个用例中，哪个会失败？", "Which of the cases 9, 10, and 11 will fail?"],
    code: 'Price = fun(Quantity) when Quantity > 10 -> 90; (_) -> 100 end,\nCases = [{9, 100}, {10, 90}, {11, 90}],\nTests = [fun() -> Expected = Price(Quantity) end || {Quantity, Expected} <- Cases],\neunit:test(Tests).',
    notes: [
      { lines: [1], label: ["错误的边界", "The wrong boundary"], text: ["约定是满 10 件打折，正文却用了 >。这个纯函数可直接交给 EUnit 测试。", "The promise is a discount at ten or more, but the body uses >. This pure function can be tested directly with EUnit."] },
      { lines: [2, 3], label: ["三条独立预期", "Three independent expectations"], text: ["每个零参数 fun 是一个 EUnit 测试。Expected 已绑定，= 会核对实际值，不相等时抛 badmatch；仅返回 false 不会让 EUnit 失败。", "Each zero-argument fun is an EUnit test. Expected is bound, so = checks the result and raises badmatch on a mismatch. Merely returning false would not fail an EUnit test."] },
      { lines: [4], label: ["选择测试工具", "Choose the test tool"], text: ["这里真实运行 EUnit。Common Test 使用含 all/0 的 suite 和初始化、清理回调，适合有资源准备的较长场景；项目中用 rebar3 ct 运行。", "This runs EUnit. Common Test uses suites with all/0 and setup/cleanup callbacks for longer scenarios involving resources; run those with rebar3 ct in a project."] },
    ],
    trace: [{ lines: [4], label: ["刚好 10 件失败", "Exactly ten fails"], output: "error", explanation: ["9 和 11 通过，10 得到 100 却期望 90。EUnit 捕获 badmatch 并返回 error，暴露只测 11 会漏掉的错误。", "9 and 11 pass. For 10, the implementation returns 100 instead of 90. EUnit catches badmatch and returns error, exposing what testing only 11 would miss."] }],
    exercise: { replace: ["Quantity > 10", "Quantity >= 10"], task: ["只修正比较符号，保留三个独立预期。", "Fix only the comparison operator and keep all three independent expectations."], choices: ["error", "ok", "true"], correct: 1, output: "ok", explanation: ["现在 10 与 11 都打折，9 保持原价。三个测试都通过，eunit:test/1 返回 ok。", "10 and 11 now receive the discount while 9 retains its original price. All three tests pass and eunit:test/1 returns ok."], hints: [["先代入刚好 10。", "Substitute exactly 10 first."], ["测试预期来自约定，修正文而不是放宽预期。", "The expectations come from the promise; fix the body rather than weakening them."]] },
    review: { slug: "higher-order-data-pipelines", question: ["筛选时把 >= 60 改成 > 60 会漏掉谁？", "Which item is lost when a filter changes >= 60 to > 60?"], answer: ["刚好 60 的项，后续 map 与 foldl 都不会再处理它。", "The item equal to 60; neither the later map nor foldl will process it."] },
    takeaways: [["保存边界两侧和刚好边界的用例。", "Keep cases below, at, and above a boundary."], ["EUnit 测试需要真正失败的断言或匹配。", "EUnit tests need assertions or matches that actually fail."], ["带资源生命周期的长场景可用 Common Test。", "Use Common Test for longer scenarios with resource lifecycles."]],
  },
  {
    slug: "rebar3-profiles-and-escripts", core: ["build-profile", "cli-entry"], prerequisites: ["rebar3", "module", "pattern-matching"],
    environment: ["保存为 nb_entry.erl", "Save as nb_entry.erl"],
    setup: ["在 erl 中运行 {ok, nb_entry} = c(nb_entry), nb_entry:main([]). 创建真实 escript 时运行 {ok, nb_entry} = c(nb_entry), ok = escript:create(\"nb_entry.escript\", [shebang, {beam, \"nb_entry.beam\"}]). 两步都成功后，在同一目录另开系统终端运行 escript nb_entry.escript report.txt。修改后重新执行编译与打包命令。", "In erl run {ok, nb_entry} = c(nb_entry), nb_entry:main([]). To package, run {ok, nb_entry} = c(nb_entry), ok = escript:create(\"nb_entry.escript\", [shebang, {beam, \"nb_entry.beam\"}]). After both succeed, open another system terminal in the same directory and run escript nb_entry.escript report.txt. Recompile and repackage after edits."],
    problem: ["没有路径参数时，命令入口会把空 list 当作文件名吗？", "With no path argument, will the entry point treat the empty list as a filename?"],
    ability: ["能导出 main/1，处理参数数量，并理解构建 profile 的位置。", "Export main/1, handle argument counts, and locate build-profile configuration."],
    contribution: ["为文件报告建立只接收一个路径的命令入口。", "Create a command entry point accepting exactly one report-file path."],
    prediction: ["main([]) 会打印路径还是用法？返回值是什么？", "Will main([]) print a path or usage? What does it return?"],
    code: '-module(nb_entry).\n-export([main/1]).\nmain([Path]) ->\n  io:format("path=~ts~n", [Path]);\nmain(_) ->\n  io:format("usage: report FILE~n", []).',
    notes: [
      { lines: [1, 2], label: ["可执行入口", "Executable entry point"], text: ["escript 调用导出的 main/1，参数是 charlist 的 list。项目构建可用 rebar3 escriptize；目标机器仍需要 Erlang 运行时。", "escript calls exported main/1 with a list of charlists. Projects can build with rebar3 escriptize; the target machine still needs an Erlang runtime."] },
      { lines: [3, 4], label: ["恰好一个参数", "Exactly one argument"], text: ["[Path] 只匹配一项 list；~ts 按文字显示路径。这里演示参数边界，尚未读取文件。", "[Path] matches exactly one item; ~ts prints the path as text. This example isolates argument handling and does not read the file yet."] },
      { lines: [5, 6], label: ["兜底与构建环境", "Fallback and build environment"], text: ["其他参数数量打印用法。rebar.config 可用 {profiles,[{test,[{erl_opts,[{d,'TEST'}]}]}]}. 隔离测试宏；系统终端用 rebar3 as test compile 选择 profile。", "Other argument counts print usage. In rebar.config, {profiles,[{test,[{erl_opts,[{d,'TEST'}]}]}]}. isolates a test macro; rebar3 as test compile selects that profile in the system terminal."] },
    ],
    trace: [{ lines: [5, 6], label: ["用法文字与返回值", "Usage text and return value"], output: "usage: report FILE\nok", explanation: ["空 list 进入兜底子句。io:format 打印用法并返回 ok；这个教学入口尚未把参数错误映射为非零退出状态。", "The empty list reaches the fallback. io:format prints usage and returns ok. This teaching entry point does not yet map invalid arguments to a nonzero exit status."] }],
    exercise: { replace: ["main([Path])", "main(Path)"], task: ["只去掉第一子句参数外的方括号，仍运行 main([])。", "Remove only the brackets around the first clause's parameter, then still run main([])."], choices: ["usage: report FILE\nok", "path=\nok", "function_clause"], correct: 1, output: "path=\nok", explanation: ["Path 变量会匹配任何参数，包括 []。第一子句把空 list 当空文字打印，兜底不再可达，编译器会提示这一点。", "The variable Path matches any argument, including []. The first clause prints it as empty text; the fallback becomes unreachable and the compiler warns."], hints: [["[Path] 是结构模式，Path 是变量。", "[Path] is a structural pattern; Path is a variable."], ["空 list 也可用作空 charlist。", "An empty list can also represent an empty charlist."]] },
    review: { slug: "behaviours-and-callbacks", question: ["callback 有正文却未导出，模块外能调用吗？", "Can an external caller invoke a callback whose body exists but is not exported?"], answer: ["不能，会抛 undef；main/1 也必须明确导出。", "No; the call raises undef. main/1 must likewise be explicitly exported."] },
    takeaways: [["main/1 接收参数 list，结构模式检查数量。", "main/1 receives an argument list; structural patterns check its size."], ["profile 在构建配置中隔离环境选项。", "Profiles isolate environment options in build configuration."], ["escript 打包代码，目标环境仍需 Erlang。", "escript packages code; its target environment still needs Erlang."]],
  },
  {
    slug: "project-brief", core: ["project-contract"], prerequisites: ["collection", "higher-order-pipeline", "cli-entry", "unicode"],
    problem: ["同一份文件的空行、词和字符，团队按同一规则计数吗？", "Does everyone count a file's blank lines, words, and characters using the same rules?"],
    ability: ["能用固定输入和完整统计结果写出可验证任务书。", "Write a verifiable brief using fixed input and complete expected counts."],
    contribution: ["约定文件报告读取一个 UTF-8 文件，输出 lines、words、chars，且不改输入。", "Specify a report that reads one UTF-8 file, prints lines, words, and chars, and preserves the input."],
    prediction: ["空行不计入 lines，但词间空格是否计入 chars？", "Blank lines do not count toward lines, but do spaces between words count toward chars?"],
    code: 'Text = <<"hello beam\\n\\nagain\\n">>,\nLines = binary:split(Text, <<"\\n">>, [global, trim_all]),\n#{lines => length(Lines),\n  words => lists:sum([length([Word || Word <- re:split(Line, "[\\\\p{Z}\\\\x{9}-\\\\x{D}\\\\x{85}]+", [unicode, {return, binary}]), Word =/= <<>>]) || Line <- Lines]),\n  chars => length(unicode:characters_to_list(Lines))}.',
    notes: [
      { lines: [1, 2], label: ["成功验收输入", "Success fixture"], text: ["样例只有 LF 换行，trim_all 去掉切分后所有空 binary。完整项目还要验证 UTF-8、统一换行并去掉每行两端空白。", "This fixture uses LF endings; trim_all removes all empty split segments. The full project must also validate UTF-8, normalize endings, and trim each line."] },
      { lines: [3, 4], label: ["行与词", "Lines and words"], text: ["unicode 解码 UTF-8；字符类匹配 Unicode 分隔符、ASCII 9–13 和 NEL，再过滤空 binary。hello　beam（U+3000 全角空格）计 2 词，不做中文词法分词；U+180E 不算空白。", "unicode decodes UTF-8; the class matches Unicode separators, ASCII 9–13 and NEL. Filter empty binaries. hello + U+3000 + beam is 2 words, not Chinese lexical segmentation. U+180E is not whitespace."] },
      { lines: [5], label: ["字符计数规则", "Character-count rule"], text: ["unicode 解码行内容后按码点计数。换行已被移除，hello 与 beam 之间的空格保留；合成字符的多个码点会分别计数。", "Decode line content and count code points. Line endings are gone, but the space between hello and beam remains. Multiple code points in a composed character count separately."] },
    ],
    trace: [{ lines: [3, 4, 5], label: ["三项完整预期", "All three expected counts"], output: "#{lines => 2,words => 3,chars => 15}", explanation: ["hello beam 有 10 个码点，again 有 5 个。空行和换行不计数，词间空格计入字符。map 的显示顺序可能不同。", "hello beam has 10 code points and again has 5. Blank lines and line endings do not count; the internal space does. Map display order may differ."] }],
    exercise: { replace: ["[global, trim_all]", "[global]"], task: ["只关闭空项清理，预测三项统计。", "Disable only empty-segment removal and predict all three counts."], choices: ["#{lines => 2,words => 3,chars => 15}", "#{lines => 4,words => 3,chars => 15}", "#{lines => 4,words => 5,chars => 18}"], correct: 1, output: "#{lines => 4,words => 3,chars => 15}", explanation: ["中间空行与末尾空项都保留，list 变成四项；两个空 binary 没有词或字符，所以只有 lines 改变。", "The middle blank and trailing empty segment remain, making four list items. Empty binaries contain no words or characters, so only lines changes."], hints: [["把每个换行前后的片段写出来。", "Write out the segments around each newline."], ["空 binary 的词数和码点数都是 0。", "An empty binary has zero words and zero code points."]] },
    review: { slug: "files-and-io", question: ["缺失文件与空文件应当合并成一种成功结果吗？", "Should a missing file and an empty file share the same success result?"], answer: ["不应合并；空文件读取成功，缺失文件返回 {error,enoent}。", "No. Reading an empty file succeeds; a missing file returns {error,enoent}."] },
    takeaways: [["先明确三项计数规则。", "Define all three counting rules first."], ["任务书同时写成功、空文件和失败结果。", "Specify success, empty-file, and failure outcomes in the brief."], ["只读一个文件，不扫描目录或修改输入。", "Read one file; do not scan directories or modify the input."]],
  },
  {
    slug: "parse-real-input", core: ["input-normalization"], prerequisites: ["result-tuple", "file-io", "case"],
    problem: ["Windows 换行、空白行和坏 UTF-8 能交给同一个计数入口吗？", "Can Windows line endings, whitespace-only lines, and invalid UTF-8 reach the same counting entry point?"],
    ability: ["能先验证 UTF-8，再统一换行、去边缘空白并丢弃空行。", "Validate UTF-8, normalize line endings, trim line edges, and discard empty lines."],
    contribution: ["让文件报告的 Parser 输出干净 binary 行，编码错误返回稳定原因。", "Make the report parser return clean binary lines and a stable reason for encoding errors."],
    prediction: ["带空格的第二行和中间的空白行会怎样？", "What happens to the padded second line and the whitespace-only middle line?"],
    code: 'Text = <<"hello beam\\r\\n \\t\\r\\n again \\n">>,\ncase unicode:characters_to_list(Text) of\n  Chars when is_list(Chars) ->\n    Raw = re:split(Text, "\\\\R", [{return, binary}, unicode]),\n    {ok, [Clean || Line <- Raw, Clean <- [re:replace(Line, "^[\\\\p{Z}\\\\x{9}-\\\\x{D}\\\\x{85}]+|[\\\\p{Z}\\\\x{9}-\\\\x{D}\\\\x{85}]+$", "", [global, unicode, {return, binary}])], Clean =/= <<>>]};\n  _ -> {error, invalid_utf8}\nend.',
    notes: [
      { lines: [1, 2, 3], label: ["先验证编码", "Validate encoding first"], text: ["unicode 转换成功返回 list；无效或截断的 UTF-8 返回 error/incomplete tuple。guard 只允许成功解码的输入继续。", "Unicode conversion returns a list on success and an error/incomplete tuple for invalid or truncated UTF-8. The guard allows only decoded input to proceed."] },
      { lines: [4, 5], label: ["统一干净行", "Normalize clean lines"], text: ["\\R 切行。^ 和 $ 限定行首尾，global 清理两端；字符类匹配 Unicode 分隔符、ASCII 9–13 和 NEL。unicode 解码，再过滤空 binary，全角空白行也会消失。Erlang 字符串中反斜杠须转义。", "\\R splits lines. ^ and $ anchor the class at both edges; global trims both. It matches Unicode separators, ASCII 9–13 and NEL. unicode decodes UTF-8; discard empty binaries."] },
      { lines: [6, 7], label: ["失败返回原因", "Return an error reason"], text: ["编码失败统一为 invalid_utf8，交给 CLI 显示。本例从已读入的 binary 开始，不会读写真实输入文件。", "Encoding failures become invalid_utf8 for the CLI to display. This example starts with an already-read binary and performs no input-file I/O."] },
    ],
    trace: [{ lines: [5], label: ["两行稳定输入", "Two clean input lines"], output: '{ok,[<<"hello beam">>,<<"again">>]}', explanation: ["CRLF 与 LF 都被切开，只有空白的行被移除，again 两端空格被去掉；内部 hello beam 的空格仍在。", "CRLF and LF both split correctly. The whitespace-only line disappears, again is trimmed, and the internal space in hello beam remains."] }],
    exercise: { replace: ['<<"hello beam\\r\\n \\t\\r\\n again \\n">>', "<<255>>"], task: ["只把输入换成单个无效 UTF-8 字节 255。", "Replace only the input with the invalid single UTF-8 byte 255."], choices: ["{ok,[]}", "{error,invalid_utf8}", "badarg"], correct: 1, output: "{error,invalid_utf8}", explanation: ["255 不能独立构成 UTF-8。转换返回错误 tuple，跳过正则切分，直接返回稳定编码错误。", "255 is not valid standalone UTF-8. Conversion does not return a list, so regex splitting is skipped and the stable encoding error is returned."], hints: [["先检查 guard 是否允许继续切分。", "Inspect the guard before the regex."], ["error 与 incomplete 都由兜底处理。", "The fallback covers both error and incomplete results."]] },
    review: { slug: "typespecs-and-dialyzer", question: ["spec 写 binary() 能保证内容是有效 UTF-8 吗？", "Does specifying binary() guarantee valid UTF-8 content?"], answer: ["不能；binary() 描述字节数据的类型，编码有效性需要运行时验证。", "No. binary() describes the byte container; encoding validity needs runtime validation."] },
    takeaways: [["先验证编码，再用 Unicode 文本操作。", "Validate encoding before Unicode text operations."], ["清洗后交出统一的 binary 行 list。", "Return one normalized list of binary lines."], ["Parser 返回数据，CLI 决定显示方式。", "The parser returns data; the CLI chooses its presentation."]],
  },
  {
    slug: "design-module-api", core: ["api-boundary"], prerequisites: ["module", "input-normalization", "higher-order-pipeline"],
    environment: ["保存为 nb_stats.erl", "Save as nb_stats.erl"],
    setup: ["在 erl 中运行 {ok, nb_stats} = c(nb_stats), nb_stats:count([<<\"hello beam\">>, <<\"again\">>]). 练习后重跑整条命令，编译成功才调用；另外可试 nb_stats:words(<<\"hello beam\">>)，它会抛 undef。", "In erl run {ok, nb_stats} = c(nb_stats), nb_stats:count([<<\"hello beam\">>, <<\"again\">>]). After the exercise edit, repeat the whole command so the call follows a successful compile. Calling nb_stats:words(<<\"hello beam\">>) separately raises undef."],
    problem: ["调用者需要依赖统计函数内部怎样分词吗？", "Must a caller depend on how the counting function splits words internally?"],
    ability: ["能公开一个纯统计入口，把辅助函数留在模块内。", "Expose a pure counting entry point while keeping helpers private."],
    contribution: ["给文件报告提供稳定的 lines、words、chars 三键 map。", "Provide the report with a stable map containing lines, words, and chars."],
    prediction: ["公开 count/1 能调用未导出的 words/1 吗？", "Can exported count/1 call unexported words/1?"],
    code: '-module(nb_stats).\n-export([count/1]).\ncount(Lines) ->\n  #{lines => length(Lines),\n    words => lists:sum([words(Line) || Line <- Lines]),\n    chars => length(unicode:characters_to_list(Lines))}.\nwords(Line) -> length([Word || Word <- re:split(Line, "[\\\\p{Z}\\\\x{9}-\\\\x{D}\\\\x{85}]+", [unicode, {return, binary}]), Word =/= <<>>]).',
    notes: [
      { lines: [1, 2, 3], label: ["窄公开入口", "Narrow public entry point"], text: ["只导出 count/1，输入由 Parser 清洗过的 UTF-8 binary 行。这里不读文件，不打印结果。", "Export only count/1. Its input is the parser's cleaned UTF-8 binary lines; this module neither reads files nor prints results."] },
      { lines: [4, 5, 6], label: ["完整统计 map", "Complete statistics map"], text: ["分别求行数、每行词数之和与全部行的码点数。unicode 接受 binary 组成的 list，不需要插入换行。", "Compute line count, the sum of per-line word counts, and code points across all lines. unicode accepts a list of binaries; no newline needs to be inserted."] },
      { lines: [7], label: ["私有 helper", "Private helper"], text: ["words/1 未导出，外部调用抛 undef。unicode 解码；字符类按 Unicode 分隔符、ASCII 9–13 和 NEL 切分，再过滤空 binary。hello　beam（U+3000）计 2 词，不做中文词法分词。", "Private words/1 raises undef externally. unicode decodes UTF-8; the class splits on Unicode separators, ASCII 9–13 and NEL. Filter empty binaries. hello + U+3000 + beam counts as 2 words."] },
    ],
    trace: [{ lines: [4, 5, 6], label: ["公开结果保持完整", "Return all public fields"], output: "#{lines => 2,words => 3,chars => 15}", explanation: ["count 在模块内调用 words，得到 2 加 1 个词；两行的码点总数是 15。map 键顺序不影响值。", "count calls words locally, adding 2 and 1 words. The two lines contain 15 code points in total. Map key order does not affect the result."] }],
    exercise: { replace: ["-export([count/1]).", "-export([])."], task: ["只移除 count/1 的导出，重新编译后从 shell 调用它。", "Remove only count/1 from exports, recompile, and call it from the shell."], choices: ["#{lines => 2,words => 3,chars => 15}", "undef", "#{lines => 0,words => 0,chars => 0}"], correct: 1, output: "undef", explanation: ["正文仍在模块中，但外部不再能调用 count/1，因此抛出 error:undef。公开 API 由 export 列表决定。", "The body still exists, but count/1 is no longer externally callable, so the call raises error:undef. The export list determines the public API."], hints: [["查找外部调用的入口名与 arity。", "Find the name and arity used by the external call."], ["函数存在与函数导出是两件事。", "A function's existence and its export are separate properties."]] },
    review: { slug: "records-and-boundaries", question: ["为什么内部 cache 变化可以不影响调用者？", "Why can an internal cache change without affecting callers?"], answer: ["出口只返回约定的公开 map，调用者不依赖内部表示。", "The exit returns only the agreed public map, so callers do not depend on internal representation."] },
    takeaways: [["公开 API 保持小而稳定。", "Keep the public API small and stable."], ["纯统计接收行，不重复读取文件。", "Pure counting accepts lines without reading files again."], ["私有 helper 的实现由模块维护。", "The module owns the implementation of its private helpers."]],
  },
  {
    slug: "types-docs-and-tests", core: ["integration-test", "api-documentation"], prerequisites: ["typespec", "eunit", "api-boundary", "input-normalization"],
    environment: ["保存为 nb_contract.erl", "Save as nb_contract.erl"],
    setup: ["在 erl 中运行 {ok, nb_contract} = c(nb_contract, [debug_info]), eunit:test(nb_contract). 编译成功后才执行测试。count/1 已导出，EDoc 默认会包含它的 @doc 文档；项目用 rebar3 edoc 生成文档，rebar3 dialyzer 分析规格。", "In erl run {ok, nb_contract} = c(nb_contract, [debug_info]), eunit:test(nb_contract). Run tests only after compilation succeeds. Exported count/1 appears in default EDoc output with its @doc text; use rebar3 edoc for project docs and rebar3 dialyzer for spec analysis."],
    problem: ["解析与统计分别可运行，接起来会不会把末尾空项算作一行？", "Can parsing and counting each work alone yet count a trailing empty segment as a line when connected?"],
    ability: ["能让类型、EDoc 和真实 EUnit 集成断言遵守同一统计约定。", "Align types, EDoc, and a real EUnit integration assertion with one counting contract."],
    contribution: ["检查 Parser 的行 list 进入统计后，三个数字仍符合文件报告任务书。", "Check that parser output produces all three counts promised by the report brief."],
    prediction: ["末尾换行是否会让测试的 lines 多出 1？", "Will the trailing newline add one to the tested line count?"],
    code: '-module(nb_contract).\n-export([count/1]).\n-include_lib("eunit/include/eunit.hrl").\n-type stats() :: #{lines := non_neg_integer(), words := non_neg_integer(), chars := non_neg_integer()}.\n%% @doc Count cleaned UTF-8 lines; exclude line endings from chars.\n-spec count([binary()]) -> stats().\ncount(Lines) -> #{lines => length(Lines), words => lists:sum([length([Word || Word <- re:split(Line, "[\\\\p{Z}\\\\x{9}-\\\\x{D}\\\\x{85}]+", [unicode, {return, binary}]), Word =/= <<>>]) || Line <- Lines]), chars => length(unicode:characters_to_list(Lines))}.\ncontract_test() ->\n  Lines = binary:split(<<"hello beam\\nagain\\n">>, <<"\\n">>, [global, trim_all]),\n  ?assertEqual(#{lines => 2, words => 3, chars => 15}, count(Lines)).',
    notes: [
      { lines: [1, 2, 3], label: ["公开入口与测试", "Public entry point and tests"], text: ["导出 count/1，供外部调用并让 EDoc 默认收录。EUnit 头文件提供断言宏并发现 contract_test/0；运行的是已编译模块中的测试。", "Export count/1 for external calls and inclusion in default EDoc output. The EUnit header supplies assertion macros and discovers contract_test/0 in the compiled module."] },
      { lines: [4, 5, 6], label: ["三份一致的约定", "Aligned contract artifacts"], text: ["stats() 用 := 声明三项必需键。spec 写入参和返回类型，EDoc 注释说明编码与换行规则；注释不会在运行时校验内容。", "stats() uses := for three required keys. The spec states input/output types; EDoc describes encoding and line-ending rules. Comments do not validate data at runtime."] },
      { lines: [7], label: ["统计实现", "Counting implementation"], text: ["此独立模块统计干净行、词和码点。unicode 解码；字符类匹配 Unicode 分隔符、ASCII 9–13 和 NEL，过滤空 binary。不依赖前一课编译产物。", "This standalone module counts clean lines, words and code points. unicode decodes UTF-8; the class matches Unicode separators, ASCII 9–13 and NEL. Filter empty binaries."] },
      { lines: [8, 9, 10], label: ["跨步骤断言", "Assert across steps"], text: ["用 LF 样例把切分结果真正交给 count。完整项目在测试中连接 Parser 与 Stats 两个模块，再补文件和编码边界。", "Feed the LF fixture's split output into count. The full project connects separate Parser and Stats modules in tests, adding file and encoding boundaries."] },
    ],
    trace: [{ lines: [10], label: ["三项都匹配", "All three counts match"], output: "ok", explanation: ["trim_all 丢弃末尾空项，统计为两行、三词、十五个码点。EUnit 的完整 map 断言通过。", "trim_all removes the trailing empty segment, producing two lines, three words, and fifteen code points. The complete-map EUnit assertion passes."] }],
    exercise: { replace: ["[global, trim_all]", "[global]"], task: ["只关闭切分后的空项清理，保留原来的完整预期。", "Disable only empty-segment removal and keep the original complete expectation."], choices: ["ok", "error", "#{lines => 3,words => 3,chars => 15}"], correct: 1, output: "error", explanation: ["实际 map 的 lines 变成 3，另外两项不变。断言期望两行，因此 EUnit 返回 error，类型规格本身不会发现这项业务错误。", "Actual lines becomes 3 while the other fields stay unchanged. The assertion expects two lines, so EUnit returns error. The type spec alone cannot catch this counting-rule violation."], hints: [["列出末尾换行后切出的空 binary。", "Include the empty binary after the trailing newline."], ["类型正确的数据也可能违反业务约定。", "A value can have the right type and still violate the promised behavior."]] },
    review: { slug: "eunit-and-common-test", question: ["测试 fun 只返回 false，EUnit 会判失败吗？", "Does EUnit fail a test fun merely because it returns false?"], answer: ["不会；需要断言或会失败的匹配来检查预期。", "No. Use an assertion or a failing match to enforce the expectation."] },
    takeaways: [["文档写公开规则，规格写数据形状。", "Document public rules and specify data shapes."], ["集成断言检查步骤连接后的结果。", "Integration assertions check the result of connected steps."], ["类型检查不能代替具体业务例子。", "Type analysis cannot replace concrete behavioral examples."]],
  },
  {
    slug: "package-and-observe", core: ["exit-status", "observability"], prerequisites: ["cli-entry", "result-tuple", "file-io"],
    environment: ["保存为 nb_cli.erl；通过 escript 子进程运行", "Save as nb_cli.erl; run in an escript subprocess"],
    setup: ["在独立目录的 erl 中运行 {ok, nb_cli} = c(nb_cli), ok = escript:create(\"nb_cli.escript\", [shebang, {beam, \"nb_cli.beam\"}]). 两步都成功后，在同一目录另开系统终端运行 escript nb_cli.escript，再运行 echo $?。只在子进程运行 main/1，不要在当前 erl 直接调用它。用 ok = file:write_file(\"report.txt\", <<\"hello beam\\nagain\\n\">>). 创建成功样例；修改后重新编译并打包。", "In a scratch directory's erl run {ok, nb_cli} = c(nb_cli), ok = escript:create(\"nb_cli.escript\", [shebang, {beam, \"nb_cli.beam\"}]). After both succeed, open another system terminal in the same directory and run escript nb_cli.escript, then echo $?. Run main/1 only in the subprocess, not directly in your current erl. Create the fixture with ok = file:write_file(\"report.txt\", <<\"hello beam\\nagain\\n\">>). Recompile and repackage after edits."],
    problem: ["命令打印了用法，却以状态 0 退出，自动化脚本会怎样判断？", "If a command prints usage but exits with status 0, how will automation interpret it?"],
    ability: ["能区分日志、标准错误、耗时与实际进程退出状态。", "Distinguish logs, stderr, duration, and the actual process exit status."],
    contribution: ["为文件报告 CLI 建立参数错误、读取错误和成功三条边界路径。", "Give the report CLI distinct argument-error, read-error, and success paths."],
    prediction: ["无参数启动时会退出 0、1 还是 2？", "Will launching with no arguments exit with 0, 1, or 2?"],
    code: '-module(nb_cli).\n-export([main/1]).\nmain([Path]) ->\n  {Micros, Result} = timer:tc(fun() -> file:read_file(Path) end),\n  case Result of\n    {ok, Text} -> io:format("bytes=~B~n", [byte_size(Text)]);\n    {error, Reason} -> logger:error("read_failed reason=~p duration_us=~B", [Reason, Micros]),\n      ok = logger_std_h:filesync(default), io:format(standard_error, "cannot read input~n", []), halt(1)\n  end;\nmain(_) -> io:format(standard_error, "usage: report FILE~n", []), halt(2).',
    notes: [
      { lines: [1, 2, 3, 4], label: ["入口与计时", "Entry point and timing"], text: ["导出 main/1；timer:tc 返回微秒耗时与读取结果。本例的子进程独立退出，不关闭教学 shell。", "Export main/1. timer:tc returns elapsed microseconds and the read result. Run this in its own subprocess so exiting does not close the learning shell."] },
      { lines: [5, 6], label: ["成功输出", "Success output"], text: ["先用 bytes 输出验证 I/O 边界；正式报告在此调用 Stats 打印三项统计。成功 main 正常返回，escript 退出 0。", "Use bytes here to probe the I/O boundary. The report replaces this branch with Stats and its three counts. A normal main return makes escript exit 0."] },
      { lines: [7, 8, 9], label: ["诊断与失败状态", "Diagnostics and failure status"], text: ["logger 记录原因与耗时，不记录正文。退出前同步默认 logger_std_h 处理器，避免日志尚未输出就 halt。标准错误给短提示，状态为 1；默认日志输出到标准输出。", "Logger records reason and duration, not contents. Synchronize the default logger_std_h handler before halt so its output finishes. stderr gets a short message; exit status is 1. Default logs go to stdout."] },
      { lines: [10], label: ["参数错误", "Argument error"], text: ["无参数或多个参数都进入这里，打印用法并退出 2。只有 CLI 最外层决定退出状态。", "Zero or multiple arguments reach this clause: print usage and exit 2. Only the outer CLI boundary decides the process exit status."] },
    ],
    trace: [{ lines: [10], label: ["真实进程状态", "Actual process status"], output: "usage: report FILE\nexit_status=2", explanation: ["无参数时不读取文件，也不执行读取错误日志。标准错误显示用法；echo $? 看到实际退出状态 2。", "With no arguments, no file is read and the read-error log is not executed. stderr shows usage; echo $? reports the actual exit status 2."] }],
    exercise: { replace: ["halt(2)", "halt(0)"], task: ["只把用法分支的退出值改成 0，重新打包，无参数运行。", "Change only the usage branch's exit value to 0, rebuild the escript, and run with no arguments."], choices: ["usage: report FILE\nexit_status=2", "usage: report FILE\nexit_status=0", "bytes=0\nexit_status=0"], correct: 1, output: "usage: report FILE\nexit_status=0", explanation: ["文字未变，但状态变成成功。自动化脚本依赖退出状态，会把这次错误用法误判为成功，交付前应修回非零值。", "The text is unchanged, but the status now signals success. Automation can misclassify invalid usage as success; restore a nonzero status before shipping."], hints: [["打印提示不会自动设置失败状态。", "Printing a message does not automatically set failure status."], ["halt 的参数决定退出数字。", "The halt argument determines the exit number."]] },
    review: { slug: "design-module-api", question: ["统计模块应该自己 halt 吗？", "Should the counting module call halt itself?"], answer: ["不应该；统计返回数据，CLI 最外层决定显示与退出。", "No. Counting returns data; the outer CLI decides presentation and exit status."] },
    takeaways: [["成功输出、诊断日志和退出状态分别检查。", "Check success output, diagnostic logs, and exit status separately."], ["日志保留原因和耗时，避开文件正文。", "Log reasons and duration without copying file contents."], ["测试和分析通过后再用 rebar3 escriptize 打包。", "Run tests and analysis before packaging with rebar3 escriptize."]],
  },
  {
    slug: "project-acceptance", core: ["acceptance-test"], prerequisites: ["project-contract", "integration-test", "exit-status", "input-normalization"],
    environment: ["保存为 nb_acceptance.erl；通过真实 escript 验收", "Save as nb_acceptance.erl; verify through an actual escript"],
    setup: ["在独立目录的 erl 中运行 {ok, nb_acceptance} = c(nb_acceptance), ok = escript:create(\"nb_acceptance.escript\", [shebang, {beam, \"nb_acceptance.beam\"}]). 两步都成功才继续。再运行 ok = file:write_file(\"report.txt\", <<\"hello beam\\nagain\\n\">>), ok = file:write_file(\"empty.txt\", <<>>), ok = file:write_file(\"invalid.txt\", <<255>>). 保持 missing.txt 不存在。在同一目录另开系统终端运行 escript nb_acceptance.escript report.txt，紧接着 echo $?；换成 empty.txt、invalid.txt、missing.txt 重复检查。不要在当前 erl 直接调用会 halt 的 main/1。修改后重新编译并打包。", "In a scratch directory's erl run {ok, nb_acceptance} = c(nb_acceptance), ok = escript:create(\"nb_acceptance.escript\", [shebang, {beam, \"nb_acceptance.beam\"}]). Continue only after both succeed. Then run ok = file:write_file(\"report.txt\", <<\"hello beam\\nagain\\n\">>), ok = file:write_file(\"empty.txt\", <<>>), ok = file:write_file(\"invalid.txt\", <<255>>). Keep missing.txt absent. Open another system terminal in the same directory; run escript nb_acceptance.escript report.txt, then echo $?. Repeat with empty.txt, invalid.txt, and missing.txt. Do not call the halting main/1 directly in your current erl. Recompile and repackage after edits."],
    problem: ["缺失文件已有错误文字，是否还需要检查退出状态？", "If a missing file already produces an error message, must its exit status also be checked?"],
    ability: ["能从打包后的入口检查成功、空文件、编码错误与缺失文件。", "Check success, empty files, invalid encoding, and missing files through the packaged entry point."],
    contribution: ["按文件报告任务书完成可重复验收，并留下构建与运行记录。", "Complete repeatable acceptance against the report brief and retain build/run records."],
    prediction: ["missing.txt 不存在时，错误文字与退出状态分别是什么？", "When missing.txt is absent, what error text and exit status are produced?"],
    code: '-module(nb_acceptance).\n-export([main/1]).\nmain([Path]) ->\n  case file:read_file(Path) of\n    {ok, Text} -> case unicode:characters_to_list(Text) of\n      Chars when is_list(Chars) -> Lines = [Clean || Line <- re:split(Text, "\\\\R", [{return, binary}, unicode]), Clean <- [re:replace(Line, "^[\\\\p{Z}\\\\x{9}-\\\\x{D}\\\\x{85}]+|[\\\\p{Z}\\\\x{9}-\\\\x{D}\\\\x{85}]+$", "", [global, unicode, {return, binary}])], Clean =/= <<>>],\n        io:format("lines=~B~nwords=~B~nchars=~B~n", [length(Lines), lists:sum([length([Word || Word <- re:split(Line, "[\\\\p{Z}\\\\x{9}-\\\\x{D}\\\\x{85}]+", [unicode, {return, binary}]), Word =/= <<>>]) || Line <- Lines]), length(unicode:characters_to_list(Lines))]);\n      _ -> io:format(standard_error, "invalid_utf8~n", []), halt(1) end;\n    {error, Reason} -> io:format(standard_error, "read_failed: ~p~n", [Reason]), halt(1)\n  end.',
    notes: [
      { lines: [1, 2, 3, 4], label: ["真实用户入口", "Actual user entry point"], text: ["这个独立验收样例合并了读取、解析和计数，便于直接打包运行；项目交付仍保留 Parser、Stats、CLI 模块边界。此例要求恰好一个路径。", "This standalone acceptance fixture combines reading, parsing, and counting for direct packaging. Keep Parser, Stats, and CLI boundaries in the delivered project. This example requires one path."] },
      { lines: [5, 6], label: ["验证并清洗", "Validate and normalize"], text: ["编码成功后按 \\R 切行。^ 和 $ 限定两端，global 清理首尾；字符类匹配 Unicode 分隔符、ASCII 9–13 和 NEL。过滤空 binary，全角空白行计 0；U+180E 保留。", "After decoding, \\R splits lines. ^ and $ anchor edge trimming; global removes both ends. The class matches Unicode separators, ASCII 9–13 and NEL. Drop empty binaries; preserve U+180E."] },
      { lines: [7], label: ["成功与空文件", "Success and empty files"], text: ["report.txt 应打印 2、3、15，empty.txt 应打印 0、0、0；两者都退出 0。按固定顺序打印，方便脚本逐项比较。", "report.txt should print 2, 3, 15; empty.txt should print 0, 0, 0. Both exit 0. Fixed output order lets scripts compare each field."] },
      { lines: [8, 9, 10], label: ["失败也要验收", "Accept failure behavior too"], text: ["invalid.txt 输出 invalid_utf8；缺失文件输出 read_failed: enoent。两条失败路径都必须非零退出，不能只检查提示文字。", "invalid.txt prints invalid_utf8; a missing file prints read_failed: enoent. Both failure paths must exit nonzero; checking the message alone is insufficient."] },
    ],
    trace: [
      { lines: [7], label: ["成功文件", "Success file"], output: "lines=2\nwords=3\nchars=15\nexit_status=0", explanation: ["从真实 escript 入口读文件，再核对固定格式输出和退出状态。空文件应对应三项 0 与状态 0。", "Read through the actual escript entry point and compare fixed-format output and status. An empty file should produce three zeros and status 0."] },
      { lines: [9], label: ["缺失文件", "Missing file"], output: "read_failed: enoent\nexit_status=1", explanation: ["file 返回 enoent，CLI 在标准错误打印原因并退出 1。这是使用者与自动化都能观察的失败。", "file returns enoent. The CLI prints the reason to stderr and exits 1, exposing failure to both users and automation."] },
    ],
    exercise: { replace: ['[Reason]), halt(1)', '[Reason]), halt(0)'], task: ["只把文件读取失败分支改为退出 0，重新打包并验收 missing.txt。", "Change only the file-read failure branch to exit 0, rebuild, and accept-test missing.txt."], choices: ["read_failed: enoent\nexit_status=1", "read_failed: enoent\nexit_status=0", "lines=0\nwords=0\nchars=0\nexit_status=0"], correct: 1, output: "read_failed: enoent\nexit_status=0", explanation: ["错误文字没变，但状态错误地表示成功。此练习应让验收失败；修回非零值后再交付，不要为了通过而改验收预期。", "The error text remains, but the status incorrectly signals success. Acceptance must fail; restore a nonzero status before delivery rather than changing the expected behavior."], hints: [["分别检查标准错误和退出数字。", "Check stderr and the exit number separately."], ["任务书要求缺失文件非零退出。", "The brief requires a nonzero exit for a missing file."]] },
    review: { slug: "project-brief", question: ["hello beam 与 again 两行，chars 为什么是 15？", "Why is chars 15 for the lines hello beam and again?"], answer: ["两行分别有 10 与 5 个码点；词间空格计入，换行不计入。", "The lines contain 10 and 5 code points. The internal space counts; line endings do not."] },
    takeaways: [["从真正的命令入口运行验收矩阵。", "Run the acceptance matrix through the actual command entry point."], ["核对成功、空输入、错误文字与退出状态。", "Check success, empty input, error text, and exit status."], ["记录 OTP 版本与构建命令，运行 eunit、ct、dialyzer 后再交付。", "Record the OTP version and build commands; run eunit, ct, and dialyzer before delivery."]],
  },
];

function localize(draft: BilingualDraft, locale: 0 | 1): NotebookLesson {
  const localized: Draft = {
    ...draft,
    problem: draft.problem[locale],
    ability: draft.ability[locale],
    contribution: draft.contribution[locale],
    prediction: draft.prediction[locale],
    environment: draft.environment?.[locale] ?? ["新的 erl shell", "Fresh erl shell"][locale],
    setup: draft.setup?.[locale] ?? ["在新的 erl shell 中运行整段。重跑前用 f(). 清除本次 shell 的变量绑定，再粘贴代码。", "Run the whole block in a fresh erl shell. Before rerunning, use f(). to clear that shell's variable bindings, then paste the code."][locale],
    notes: draft.notes.map((note) => ({ ...note, label: note.label[locale], text: note.text[locale] })),
    trace: draft.trace.map((step) => ({ ...step, label: step.label[locale], explanation: step.explanation[locale] })),
    exercise: {
      ...draft.exercise,
      task: draft.exercise.task[locale],
      explanation: draft.exercise.explanation[locale],
      hints: [draft.exercise.hints[0][locale], draft.exercise.hints[1][locale]],
    },
    review: { ...draft.review, question: draft.review.question[locale], answer: draft.review.answer[locale] },
    takeaways: [draft.takeaways[0][locale], draft.takeaways[1][locale], draft.takeaways[2][locale]],
  };
  return defineNotebook(localized);
}

export const erlangAdvancedNotebooks: NotebookLesson[] = drafts.map((draft) => localize(draft, 0));
export const erlangAdvancedNotebooksEn: NotebookLesson[] = drafts.map((draft) => localize(draft, 1));

type Expected = { value: string; stdoutIncludes?: string } | { error: string } | { exitStatus: number; stdout?: string; stdoutIncludes?: string; stderrIncludes?: string };
type Check = {
  slug: string;
  mode: "shell" | "module" | "escript";
  files?: Array<{ name: string; lines?: [number, number] }>;
  run?: string;
  args?: string[];
  fixtures?: Record<string, { utf8: string } | { hex: string } | { absent: true }>;
  original: Expected;
  exercise: Expected;
  extraRuns?: Array<{ run?: string; args?: string[]; expected: Expected; variant?: "original" | "both" }>;
};

export const erlangAdvancedNotebookChecks: Check[] = [
  { slug: "module-attributes-and-records", mode: "module", files: [{ name: "nb_book.erl" }], run: "nb_book:demo()", original: { value: "{1,120,3}" }, exercise: { value: "{1,0,3}" } },
  { slug: "rebar3-and-eunit", mode: "module", files: [{ name: "nb_count.erl" }], run: "eunit:test(nb_count)", original: { value: "error" }, exercise: { value: "ok" } },
  { slug: "result-contracts", mode: "shell", original: { value: "{error,division_by_zero}" }, exercise: { value: "{ok,4.0}" } },
  { slug: "files-and-io", mode: "shell", original: { value: '{ok,<<"hello beam\\nagain\\n">>}' }, exercise: { value: "{error,enoent}" } },
  { slug: "higher-order-data-pipelines", mode: "shell", original: { value: "{[65,83,96],244}" }, exercise: { value: "{[83,96],179}" } },
  { slug: "records-and-boundaries", mode: "module", files: [{ name: "nb_profile.erl" }], run: 'nb_profile:public(#{name => <<"Ada">>, score => 9})', original: { value: '{ok,#{name => <<"Ada">>}}' }, exercise: { value: '{ok,#{name => <<"Ada">>}}' }, extraRuns: [{ run: 'nb_profile:public(#{name => <<"Ada">>})', expected: { value: "{error,invalid_user}" }, variant: "both" }] },
  { slug: "behaviours-and-callbacks", mode: "module", files: [{ name: "nb_greeter.erl", lines: [1, 2] }, { name: "nb_friendly.erl", lines: [3, 6] }], run: 'nb_friendly:hello(<<"Ada">>)', original: { value: '<<"Hello, Ada">>' }, exercise: { error: "undef" } },
  { slug: "typespecs-and-dialyzer", mode: "module", files: [{ name: "nb_typed.erl" }], run: 'nb_typed:count(<<"hello">>)', original: { value: '<<"hello">>' }, exercise: { value: "5" } },
  { slug: "eunit-and-common-test", mode: "shell", original: { value: "error" }, exercise: { value: "ok" } },
  { slug: "rebar3-profiles-and-escripts", mode: "module", files: [{ name: "nb_entry.erl" }], run: "nb_entry:main([])", original: { value: "ok", stdoutIncludes: "usage: report FILE\n" }, exercise: { value: "ok", stdoutIncludes: "path=\n" } },
  { slug: "project-brief", mode: "shell", original: { value: "#{lines => 2,words => 3,chars => 15}" }, exercise: { value: "#{lines => 4,words => 3,chars => 15}" } },
  { slug: "parse-real-input", mode: "shell", original: { value: '{ok,[<<"hello beam">>,<<"again">>]}' }, exercise: { value: "{error,invalid_utf8}" } },
  { slug: "design-module-api", mode: "module", files: [{ name: "nb_stats.erl" }], run: 'nb_stats:count([<<"hello beam">>,<<"again">>])', original: { value: "#{lines => 2,words => 3,chars => 15}" }, exercise: { error: "undef" }, extraRuns: [{ run: "nb_stats:count([])", expected: { value: "#{lines => 0,words => 0,chars => 0}" }, variant: "original" }, { run: 'nb_stats:words(<<"hello beam">>)', expected: { error: "undef" }, variant: "both" }, { run: "[nb_stats:count([<<\"hello\",16#3000/utf8,\"beam\">>]), nb_stats:count([<<\" \", \"hello\",16#A0/utf8,\"beam\",9>>]), nb_stats:count([<<\"hello\",16#180E/utf8,\"beam\">>])]", expected: { value: "[#{lines => 1,words => 2,chars => 10},#{lines => 1,words => 2,chars => 12},#{lines => 1,words => 1,chars => 10}]" }, variant: "original" }] },
  { slug: "types-docs-and-tests", mode: "module", files: [{ name: "nb_contract.erl" }], run: "eunit:test(nb_contract)", original: { value: "ok" }, exercise: { value: "error" }, extraRuns: [{ run: 'begin {nb_contract, Doc} = edoc:get_doc("nb_contract.erl"), {nb_contract:count([]), length(xmerl_xpath:string("//function[@name=\'count\']", Doc))} end', expected: { value: "{#{lines => 0,words => 0,chars => 0},1}" }, variant: "both" }, { run: "[nb_contract:count([<<\"hello\",16#3000/utf8,\"beam\">>]), nb_contract:count([<<\" \", \"hello\",16#A0/utf8,\"beam\",9>>]), nb_contract:count([<<\"hello\",16#180E/utf8,\"beam\">>])]", expected: { value: "[#{lines => 1,words => 2,chars => 10},#{lines => 1,words => 2,chars => 12},#{lines => 1,words => 1,chars => 10}]" }, variant: "both" }] },
  { slug: "package-and-observe", mode: "escript", files: [{ name: "nb_cli.erl" }], args: [], fixtures: { "report.txt": { utf8: "hello beam\nagain\n" }, "missing.txt": { absent: true } }, original: { exitStatus: 2, stdout: "", stderrIncludes: "usage: report FILE\n" }, exercise: { exitStatus: 0, stdout: "", stderrIncludes: "usage: report FILE\n" }, extraRuns: [{ args: ["report.txt"], expected: { exitStatus: 0, stdout: "bytes=17\n" }, variant: "both" }, { args: ["missing.txt"], expected: { exitStatus: 1, stdoutIncludes: "read_failed reason=enoent duration_us=", stderrIncludes: "cannot read input\n" }, variant: "both" }] },
  { slug: "project-acceptance", mode: "escript", files: [{ name: "nb_acceptance.erl" }], args: ["missing.txt"], fixtures: { "report.txt": { utf8: "hello beam\nagain\n" }, "empty.txt": { utf8: "" }, "invalid.txt": { hex: "ff" }, "missing.txt": { absent: true }, "mixed.txt": { utf8: "hello beam\r\n \t\r\n again \n" }, "truncated.txt": { hex: "e2" }, "unicode.txt": { utf8: "\u3000hello\u3000beam\u00a0\r\n\u3000\u00a0\t\r\n\u00a0again\u00a0\n" }, "unicode-blank.txt": { utf8: "\u3000\u00a0\t\r\n\u2003\n" }, "not-whitespace.txt": { utf8: "\u180ehello\u180ebeam\u180e\n" } }, original: { exitStatus: 1, stdout: "", stderrIncludes: "read_failed: enoent\n" }, exercise: { exitStatus: 0, stdout: "", stderrIncludes: "read_failed: enoent\n" }, extraRuns: [{ args: ["report.txt"], expected: { exitStatus: 0, stdout: "lines=2\nwords=3\nchars=15\n" }, variant: "both" }, { args: ["empty.txt"], expected: { exitStatus: 0, stdout: "lines=0\nwords=0\nchars=0\n" }, variant: "both" }, { args: ["invalid.txt"], expected: { exitStatus: 1, stdout: "", stderrIncludes: "invalid_utf8\n" }, variant: "both" }, { args: ["mixed.txt"], expected: { exitStatus: 0, stdout: "lines=2\nwords=3\nchars=15\n" }, variant: "both" }, { args: ["truncated.txt"], expected: { exitStatus: 1, stdout: "", stderrIncludes: "invalid_utf8\n" }, variant: "both" }, { args: ["unicode.txt"], expected: { exitStatus: 0, stdout: "lines=2\nwords=3\nchars=15\n" }, variant: "both" }, { args: ["unicode-blank.txt"], expected: { exitStatus: 0, stdout: "lines=0\nwords=0\nchars=0\n" }, variant: "both" }, { args: ["not-whitespace.txt"], expected: { exitStatus: 0, stdout: "lines=1\nwords=1\nchars=12\n" }, variant: "both" }] },
];
