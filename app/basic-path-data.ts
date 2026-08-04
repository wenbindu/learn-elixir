export type BasicPathId = "elixir" | "erlang";

export type BasicReference = {
  label: string;
  href: string;
};

export type BasicLesson = {
  number: string;
  slug: string;
  stage: "scratch" | "foundation" | "intermediate" | "project";
  title: string;
  summary: string;
  duration: string;
  goal: string;
  plain: string[];
  concepts: Array<{
    term: string;
    explanation: string;
  }>;
  symbols: Array<{
    token: string;
    reading: string;
  }>;
  example: {
    label: string;
    code: string;
    caption: string;
    output: string[];
  };
  steps: string[];
  practice: {
    task: string;
    starter: string;
    expected: string;
    hint: string;
    answer: string;
  };
  check: {
    question: string;
    answer: string;
  };
  takeaways: string[];
};

export type BasicPath = {
  id: BasicPathId;
  language: "Elixir" | "Erlang";
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  shell: "IEx" | "erl";
  shellCommand: "iex" | "erl";
  prerequisites: string[];
  lessons: BasicLesson[];
  bridge: {
    title: string;
    description: string;
    href: string;
    label: string;
  };
  references: BasicReference[];
};

const elixirLessons: BasicLesson[] = [
  {
    number: "01",
    slug: "meet-iex",
    stage: "scratch",
    title: "先让代码说话",
    summary: "打开 IEx，输入表达式，分清代码、结果和报错。",
    duration: "15 分钟",
    goal: "本课先打开 IEx，逐行运行加法、字符串函数和打印函数；三段代码都有结果就算完成。",
    plain: [
      "IEx 是 Elixir 的交互窗口。你输入一小段代码，它马上给出结果。刚开始不用建项目，也不用背命令。",
      "表达式是一段会产生结果的代码。`2 + 3` 的结果是 `5`。`String.upcase(\"cat\")` 的结果是 `\"CAT\"`。",
      "看到报错先停一下。读最后几行，找出电脑不认识的名字或不合适的数据。报错不是扣分，它只是结果的一种。",
    ],
    concepts: [
      {
        term: "IEx",
        explanation: "Interactive Elixir 的缩写。它像草稿纸，适合试一两行代码。",
      },
      {
        term: "表达式",
        explanation: "运行后会得到一个值的代码。数字、运算、函数调用都可以是表达式。",
      },
      {
        term: "返回值",
        explanation: "一段表达式算完后交回来的结果。它不一定会打印成一句话。",
      },
    ],
    symbols: [
      { token: "iex", reading: "在终端输入它，打开 IEx。" },
      { token: "iex>", reading: "这是提示符。只输入它后面的代码，不要复制提示符。" },
      { token: "#", reading: "这一行是注释。Elixir 不会执行它。" },
    ],
    example: {
      label: "复制到 IEx，逐行回车",
      code: `# 加法表达式会返回一个数字
2 + 3

# 函数调用会返回一段新文字
String.upcase("cat")

# IO.puts 会把一句话打印到屏幕
IO.puts("你好，BEAM")`,
      caption: "每次只运行一行。先猜结果，再按回车。",
      output: ["`2 + 3` 返回 `5`。", "`String.upcase(\"cat\")` 返回 `\"CAT\"`。", "`IO.puts(\"你好，BEAM\")` 先打印文字，随后显示 `:ok`；先把它当作“做完了”标签。"],
    },
    steps: [
      "`2 + 3` 中，`+` 把左右两个数字相加。",
      "`String.upcase(\"cat\")` 把字符串交给 `String` 模块里的 `upcase` 函数。",
      "`IO.puts(\"你好，BEAM\")` 会产生两个可见结果：屏幕上的文字，以及 IEx 显示的返回值 `:ok`。",
    ],
    practice: {
      task: "让 IEx 算出 7 乘 6，再把 `beam` 变成大写。",
      starter: `# 把问号换成一个运算符
7 ? 6

# 把函数名补完整
String.____("beam")`,
      expected: "先看到 `42`，再看到 `\"BEAM\"`。",
      hint: "乘法用 `*`。刚才把文字变成大写的函数叫 `upcase`。",
      answer: `# 星号表示乘法
7 * 6

# upcase 返回大写后的新字符串
String.upcase("beam")`,
    },
    check: {
      question: "`iex>` 是代码的一部分吗？",
      answer: "不是。它是 IEx 等你输入代码时显示的提示符。",
    },
    takeaways: [
      "IEx 适合试很短的 Elixir 代码。",
      "表达式运行后会得到一个值。",
      "先看报错写了什么，再只改一个地方。",
    ],
  },
  {
    number: "02",
    slug: "values-and-types",
    stage: "scratch",
    title: "先认六种值",
    summary: "从整数、浮点数、布尔值、nil、atom 和字符串开始。",
    duration: "20 分钟",
    goal: "本课先在 IEx 依次运行六种常见值、atom 与字符串比较、binary 与字符串比较；最后看到 `false` 和 `true` 就算完成。",
    plain: [
      "值是代码正在处理的东西。年龄可以是整数，身高可以是小数，名字可以是字符串。",
      "类型说明一种值能参加哪些操作。数字能相加，字符串能拼接。类型不同，不代表谁更高级，只代表用途不同。",
      "`:ok` 是 atom，常用作标签；`\"ok\"` 是字符串，是两个字母组成的文字。它们看起来相近，却不是同一种值。",
      "Elixir 字符串本身就是 UTF-8 binary。`<<\"长安\">>` 与 `\"长安\"` 是同一个值；`<<>>` 还可以写出更一般的 binary 和 bitstring。",
    ],
    concepts: [
      {
        term: "整数",
        explanation: "没有小数点的数字，如 `12`、`0` 和 `-3`。",
      },
      {
        term: "浮点数",
        explanation: "带小数点的数字，如 `12.5`。先把它理解为可以表示小数的数。",
      },
      {
        term: "布尔值",
        explanation: "只有 `true` 和 `false` 两个值，用来回答真或假。",
      },
      {
        term: "nil",
        explanation: "表示这里没有值。它不是数字 `0`，也不是空字符串。",
      },
      {
        term: "atom",
        explanation: "以冒号开头的标签，如 `:ok`、`:red`。它的名字就是它的值。",
      },
      {
        term: "字符串",
        explanation: "双引号包住的文字，如 `\"长安\"`。可以包含中文和空格。",
      },
    ],
    symbols: [
      { token: ":", reading: "放在名字前面，组成 atom。例如 `:ok`。" },
      { token: '" "', reading: "双引号包住文字，组成字符串。" },
      { token: "==", reading: "比较左右两个值是否相等，结果是 `true` 或 `false`。" },
      { token: "<<>>", reading: "包住 binary 内容。Elixir 的 UTF-8 字符串也是 binary。" },
    ],
    example: {
      label: "在 IEx 里认识值",
      code: `# 数字、布尔值和 nil
12
12.5
true
nil

# atom 与字符串是不同类型
:ok
"你好，阿青"
:ok == "ok"

# Elixir 字符串是 UTF-8 binary
<<"长安">> == "长安"`,
      caption: "一行只认一种值。先看外形，再看 IEx 给出的结果。",
      output: [
        "前六段依次得到整数、浮点数、布尔值、`nil`、atom 和字符串。",
        "`:ok` 原样返回；`\"你好，阿青\"` 也原样返回。",
        "atom 与字符串的比较返回 `false`，因为它们不是同一种值。",
        "`<<\"长安\">> == \"长安\"` 返回 `true`，因为 Elixir 字符串是 UTF-8 binary。",
      ],
    },
    steps: [
      "`12` 和 `12.5` 都是数字；有没有小数点，让它们分成整数和浮点数。",
      "`true`、`false` 用来表示真假；`nil` 表示没有值。三者不要混成一类。",
      "冒号开头的是 atom，双引号包住的是字符串。因此 `:ok` 不等于 `\"ok\"`。",
      "`<<\"长安\">>` 使用 binary 语法写出同一段 UTF-8 文字，所以它等于字符串 `\"长安\"`。",
    ],
    practice: {
      task: "分三行写出城市、天气和是否下雨。这里先只写值，不给它们起名字。",
      starter: `# 城市是一段文字
____
# 天气是一个标签
____
# 今天没有下雨
____`,
      expected: "三行依次得到 `\"成都\"`、`:cloudy`、`false`。",
      hint: "文字用双引号；标签以冒号开头；真假写 `true` 或 `false`。",
      answer: `# 城市是一段文字
"成都"
# 天气是一个标签
:cloudy
# 今天没有下雨
false`,
    },
    check: {
      question: "`nil` 和 `false` 是同一个值吗？",
      answer: "不是。它们是两个不同的值；不过在条件判断里，两者都会被当作假。",
    },
    takeaways: [
      "先看一个值是什么，再决定怎样处理它。",
      "`:ok` 是 atom，`\"ok\"` 是字符串。",
      "`nil` 表示没有值，不等于 0 或空文字。",
    ],
  },
  {
    number: "03",
    slug: "collections",
    stage: "scratch",
    title: "把值装起来",
    summary: "用 list、tuple 和 map 收好一组数据。",
    duration: "25 分钟",
    goal: "本课先从 list、tuple 和 map 各取出一个值；依次看到 `\"桃\"`、`42` 和 `92` 就算完成。",
    plain: [
      "一个值不够时，可以把多个值装进集合。购物清单有先后顺序，适合 list。一次操作的结果和状态，常放在 tuple 里。",
      "map 用名字找值。学生记录里，`:name` 对应姓名，`:score` 对应分数。读代码的人不用猜第几个位置是什么。",
      "先学会读和取值。更新集合的写法以后再学。",
    ],
    concepts: [
      {
        term: "list",
        explanation: "方括号里的有序集合，如 `[\"桃\", \"李\"]`。适合依次处理。",
      },
      {
        term: "tuple",
        explanation: "花括号里的固定组合，如 `{:ok, 200}`。常表示几个值共同组成一个结果。",
      },
      {
        term: "map",
        explanation: "按 key 找 value 的集合，如 `%{name: \"阿青\"}`。",
      },
    ],
    symbols: [
      { token: "[ ]", reading: "方括号包住 list。" },
      { token: "{ }", reading: "花括号包住 tuple。" },
      { token: "%{key: value}", reading: "百分号加花括号表示 map；冒号左边是 key。" },
    ],
    example: {
      label: "三种集合，三种用途",
      code: `# list 保留先后顺序
hd(["桃", "李", "杏"])

# tuple 把状态和数据放在一起
elem({:ok, 42}, 1)

# map 用名字寻找值
%{name: "阿青", score: 92}.score`,
      caption: "同样是“装多个值”，取值方式并不相同。",
      output: ["`hd([\"桃\", \"李\", \"杏\"])` 得到第一个值 `\"桃\"`。", "`elem({:ok, 42}, 1)` 得到 `42`；位置从 0 开始数。", "map 后的 `.score` 读出 `92`。"],
    },
    steps: [
      "`hd([\"桃\", \"李\", \"杏\"])` 读取非空 list 的第一个元素。这里先不要把它用于空 list。",
      "`elem({:ok, 42}, 1)` 的 `1` 是位置。tuple 的第一个位置编号是 `0`。",
      "当 map 的 key 是 atom 时，可以在 map 后用 `.score` 读取它。",
    ],
    practice: {
      task: "建立一本书的 map，放入书名和页数，再读出页数。",
      starter: `# 补上两个 key，再用点号读页数
%{____: "西游记", ____: 100}.____`,
      expected: "最后得到 `100`。",
      hint: "可以使用 `title` 和 `pages` 两个 key。",
      answer: `# map 用有名字的 key 保存资料
# atom key 可以用点号读取
%{title: "西游记", pages: 100}.pages`,
    },
    check: {
      question: "姓名和分数应该放进 `[\"阿青\", 92]`，还是 `%{name: \"阿青\", score: 92}`？",
      answer: "初学时优先用 map。`name` 和 `score` 把每个值的意思写清楚了。",
    },
    takeaways: [
      "list 适合一串按顺序处理的值。",
      "tuple 常把状态和结果绑在一起。",
      "map 用 key 说明每个值是什么。",
    ],
  },
  {
    number: "04",
    slug: "names-and-operators",
    stage: "scratch",
    title: "从旧 list 生成新 list",
    summary: "先绑定一列值，再用 for comprehension 产生新 list。",
    duration: "20 分钟",
    goal: "本课先把 `[1, 2, 3]` 绑定给名字，再用 `for` 让每个数字加 1；同时看到原 list 和新 list 就算完成。",
    plain: [
      "名字让代码容易读。`numbers = [1, 2, 3]` 可以读成“名字 numbers 现在指向这列数字”。",
      "Elixir 的数据不会被原地改掉。对 list 做计算会产生新 list，原来的 list 仍保持不变。",
      "`for value <- list do ... end` 叫 comprehension。它从 list 依次取值，用块里的表达式产生新值，最后收集成新 list。",
    ],
    concepts: [
      {
        term: "绑定",
        explanation: "让一个名字指向某个值，如 `count = 3`。",
      },
      {
        term: "不可变",
        explanation: "已经存在的值不会被原地改写。计算会产生新值。",
      },
      {
        term: "comprehension",
        explanation: "从集合依次取值，计算后收集成新集合；它不会修改原集合。",
      },
    ],
    symbols: [
      { token: "=", reading: "这里先读作“让左边名字指向右边的值”。下一课会看到它也是匹配运算符。" },
      { token: "<-", reading: "从右边集合依次取一个值，交给左边名字。" },
      { token: "for ... do ... end", reading: "运行 comprehension，并把每次结果收集成新 list。" },
      { token: "+", reading: "把左右两个数字相加，返回一个新数字。" },
    ],
    example: {
      label: "保留旧 list，产生新 list",
      code: `# numbers 指向原来的 list
numbers = [1, 2, 3]

# 每次结果会被收集到新 list
plus_one =
  for number <- numbers do
    number + 1
  end

{numbers, plus_one}`,
      caption: "先看输入 list，再看 comprehension 产生的结果。",
      output: ["得到 `{[1, 2, 3], [2, 3, 4]}`。", "`numbers` 仍是 `[1, 2, 3]`。", "`plus_one` 指向新 list `[2, 3, 4]`。"],
    },
    steps: [
      "`numbers = [1, 2, 3]` 把名字绑定到原 list。",
      "`number <- numbers` 从左到右取出 1、2、3，当前值暂时叫 `number`。",
      "块里的 `number + 1` 每次产生一个新数字，`for` 把它们收集成 `[2, 3, 4]`。",
      "整个过程没有修改 `numbers`，所以 tuple 中仍能看到原 list。",
    ],
    practice: {
      task: "把分数 `[52, 76, 91]` 每项加 5，同时保留原 list。",
      starter: `# 原始分数
scores = [52, 76, 91]

# 补上取值符号和每次产生的新值
raised =
  for score ____ scores do
    ____
  end

{scores, raised}`,
      expected: "得到 `{[52, 76, 91], [57, 81, 96]}`。",
      hint: "取值使用 `<-`；块里写 `score + 5`。",
      answer: `# 原始 list 保持不变
scores = [52, 76, 91]

# comprehension 收集每次加 5 的结果
raised =
  for score <- scores do
    score + 5
  end

{scores, raised}`,
    },
    check: {
      question: "运行 `raised = for score <- scores do score + 5 end` 后，`scores` 会变成新分数吗？",
      answer: "不会。`for` 产生并返回一个新 list，原来的 `scores` 没有被修改。",
    },
    takeaways: [
      "名字指向值，方便后面的代码使用。",
      "`<-` 从集合中依次取值。",
      "comprehension 产生新 list，不会原地修改旧 list。",
    ],
  },
  {
    number: "05",
    slug: "pattern-matching",
    stage: "scratch",
    title: "让形状对上",
    summary: "把 `=` 当作匹配，拆开 tuple、list 和 map。",
    duration: "25 分钟",
    goal: "本课先从 tuple、list 和 map 各拆一次值；最后看到 `{92, \"桃\", [\"李\", \"杏\"], \"阿青\"}` 就算完成。",
    plain: [
      "Elixir 的 `=` 不只是“赋值”。它会检查左右两边能不能按同一种形状对上。",
      "左边像一张空表格。右边的数据填进去。位置、标签或 key 对不上时，匹配就失败。",
      "这种写法常用来拆数据。你只写想取出的部分，剩下的可以交给下划线 `_`。",
    ],
    concepts: [
      {
        term: "模式",
        explanation: "写在左边的形状，用来检查并拆开右边的数据。",
      },
      {
        term: "解构",
        explanation: "一次从集合里取出多个值。",
      },
      {
        term: "匹配失败",
        explanation: "左右形状或固定值对不上时，Elixir 会给出 `MatchError`。",
      },
    ],
    symbols: [
      { token: "=", reading: "匹配左右两边。左边的新名字会绑定到对应值。" },
      { token: "_", reading: "这个位置的值不需要保存。" },
      { token: "[head | tail]", reading: "把非空 list 拆成第一个元素和剩余元素。" },
    ],
    example: {
      label: "从三种集合里拆值",
      code: `# 固定标签必须对上，下划线忽略第三个值
{:ok, score, _} = {:ok, 92, :midterm}

# 拆出 list 的第一个元素和其余部分
[first | rest] = ["桃", "李", "杏"]

# map 模式只写需要的 key
%{name: name} = %{name: "阿青", age: 12}

{score, first, rest, name}`,
      caption: "先从左边读形状，再去右边找对应的值。",
      output: ["`score` 得到 `92`。", "`first` 得到 `\"桃\"`，`rest` 得到 `[\"李\", \"杏\"]`。", "`name` 得到 `\"阿青\"`。"],
    },
    steps: [
      "`{:ok, score, _}` 要求右边是三个元素的 tuple，而且第一个必须是 `:ok`；第三个值被忽略。",
      "`[first | rest]` 只能匹配非空 list。竖线把第一个值与剩余 list 分开。",
      "map 模式可以只匹配需要的 key；右边多出的 `age` 不妨碍匹配。",
    ],
    practice: {
      task: "从 `{:weather, \"西安\", 28}` 中拆出城市和温度。",
      starter: `# 保留标签，给后两个位置起名字
{____, ____, ____} = {:weather, "西安", 28}

# 返回城市和温度
{city, temperature}`,
      expected: "得到 `{\"西安\", 28}`。",
      hint: "第一个位置写固定 atom `:weather`，后两个位置写 `city` 和 `temperature`。",
      answer: `# :weather 必须匹配，两个名字接住数据
{:weather, city, temperature} = {:weather, "西安", 28}

# 查看拆出的值
{city, temperature}`,
    },
    check: {
      question: "`{:ok, value} = {:error, 3}` 会成功吗？",
      answer: "不会。左边要求第一个值是 `:ok`，右边却是 `:error`，所以会出现 `MatchError`。",
    },
    takeaways: [
      "`=` 会检查形状，不只是把值放进名字。",
      "固定值负责核对，新名字负责接住数据。",
      "不需要的值可以用 `_` 忽略。",
    ],
  },
  {
    number: "06",
    slug: "choices-and-guards",
    stage: "scratch",
    title: "用 case 做选择",
    summary: "让一个值依次匹配分支，再用 guard 补充条件。",
    duration: "25 分钟",
    goal: "本课先让同一段 `case` 分别处理 76、95 和 40；三次依次得到“过关”“很稳”“再试一次”就算完成。",
    plain: [
      "程序常要看情况做事。`case` 先取得一个值，再让它依次与多个模式匹配。",
      "每个分支都写“什么输入”与“返回什么”。第一个匹配的分支运行，后面的不再检查。",
      "guard 是写在模式后的小条件。它只允许一组安全、明确的判断函数。",
    ],
    concepts: [
      {
        term: "分支",
        explanation: "根据输入选择一段代码运行。",
      },
      {
        term: "case",
        explanation: "把一个值与多个模式依次匹配，运行第一个匹配的分支。",
      },
      {
        term: "guard",
        explanation: "跟在 `when` 后的附加条件，如 `when score >= 60`。",
      },
    ],
    symbols: [
      { token: "->", reading: "左边条件成立时，运行右边表达式。" },
      { token: "when", reading: "在模式之后再加一个条件。" },
      { token: "_", reading: "最后的兜底分支，接住前面没有处理的值。" },
      { token: "case ... do ... end", reading: "`do` 打开分支块，`end` 结束整个 `case`。" },
    ],
    example: {
      label: "按分数给出一句话",
      code: `# case 从上到下选择第一个匹配分支
score = 76

message =
  case score do
    value when value >= 90 -> "很稳"
    value when value >= 60 -> "过关"
    _value -> "再试一次"
  end

message`,
      caption: "把 `score` 改成 95 和 40，各运行一次。",
      output: ["`76` 得到 `\"过关\"`。", "`95` 得到 `\"很稳\"`。", "`40` 得到 `\"再试一次\"`。"],
    },
    steps: [
      "`case score do` 表示接下来要检查 `score`。",
      "分支从上到下尝试，所以 `>= 90` 要放在 `>= 60` 前面。",
      "`_value` 能接住任何剩余值。下划线开头提醒我们不会再使用它。",
    ],
    practice: {
      task: "根据天气 atom 返回动作：`:rain` 带伞，`:sunny` 戴帽子，其他情况先看天空。",
      starter: `# 改成其他 atom 再试
weather = :rain

case weather do
  ____ -> "带伞"
  ____ -> "戴帽子"
  ____ -> "先看天空"
end`,
      expected: "`:rain` 得到 `\"带伞\"`，`:sunny` 得到 `\"戴帽子\"`。",
      hint: "前两处填固定 atom，最后用下划线接住其他值。",
      answer: `# weather 是要匹配的值
weather = :rain

case weather do
  :rain -> "带伞"
  :sunny -> "戴帽子"
  _other -> "先看天空"
end`,
    },
    check: {
      question: "为什么 `value >= 90` 要放在 `value >= 60` 前面？",
      answer: "因为 `case` 选择第一个匹配分支。95 也大于 60；顺序反过来时，95 会过早进入“过关”分支。",
    },
    takeaways: [
      "`case` 擅长把模式匹配和选择放在一起。",
      "分支顺序会影响结果。",
      "用兜底分支说明其他输入怎么办。",
    ],
  },
  {
    number: "07",
    slug: "functions-and-arity",
    stage: "scratch",
    title: "把文字安全变成整数",
    summary: "用 trim、匿名函数和 try/rescue 处理合法与错误输入。",
    duration: "30 分钟",
    goal: "本课先写一个完整匿名函数：把 `\" 42 \"` 变成 `{:ok, 42}`，把 `\"松\"` 变成 `{:error, :not_integer}`；两个结果都出现就算完成。",
    plain: [
      "函数接收输入，做一件事，再返回输出。`String.trim(\" 42 \")` 先去掉文字两端空白，得到 `\"42\"`。",
      "文档常写 `String.trim/1`。斜杠后的 `1` 叫 arity，中文常说“参数个数”。它表示这个函数接收 1 个参数。",
      "`String.to_integer/1` 把数字文字变成整数；遇到 `\"松\"` 这类输入时会抛出 `ArgumentError`。",
      "完整匿名函数用 `fn ... -> ... end` 包住流程。`try/rescue` 接住预期中的 `ArgumentError`，让函数返回清楚的错误 tuple，而不是让 IEx 中断这次调用。",
    ],
    concepts: [
      {
        term: "arity",
        explanation: "函数接收的参数个数。`String.trim/1` 和 `String.to_integer/1` 都接收 1 个参数。",
      },
      {
        term: "匿名函数",
        explanation: "用 `fn ... -> ... end` 创建的函数。这里把整个解析流程交给名字 `parse_integer`。",
      },
      {
        term: "异常",
        explanation: "函数无法继续正常工作时发出的错误信号。错误文字交给 `String.to_integer/1` 会产生 `ArgumentError`。",
      },
      {
        term: "try/rescue",
        explanation: "先尝试一段代码，再针对预期异常返回可处理的结果。这里只接 `ArgumentError`。",
      },
    ],
    symbols: [
      { token: "String.trim/1", reading: "`String` 模块、`trim` 函数、1 个参数。这是文档里的写法，不是一条调用。" },
      { token: "String.trim(text)", reading: "把 `text` 作为参数，真正调用函数。" },
      { token: "String.to_integer/1", reading: "把只含整数的字符串转成整数；格式不对时抛出 `ArgumentError`。" },
      { token: "fn text -> ... end", reading: "创建一个接收 `text` 的完整匿名函数。" },
      { token: "try ... rescue ... end", reading: "尝试转换；遇到指定异常时走错误分支。" },
    ],
    example: {
      label: "一个函数同时处理正确与错误输入",
      code: `# 匿名函数收好完整解析流程
parse_integer = fn text ->
  clean = String.trim(text)

  try do
    {:ok, String.to_integer(clean)}
  rescue
    ArgumentError -> {:error, :not_integer}
  end
end

# 合法文字会得到整数
good = parse_integer.(" 42 ")

# 错误文字会得到可处理的错误 tuple
bad = parse_integer.("松")

{good, bad}`,
      caption: "先运行合法输入，再运行错误输入；两次都由同一个匿名函数给出结果。",
      output: ["`good` 是 `{:ok, 42}`。", "`bad` 是 `{:error, :not_integer}`。", "`ArgumentError` 被 `rescue` 接住，因此第二次调用也正常返回。"],
    },
    steps: [
      "`parse_integer = fn text -> ... end` 创建完整匿名函数；调用时写 `parse_integer.(文字)`。",
      "文档用 `String.trim/1` 说明函数名和参数个数；`String.trim(text)` 才是真正调用。它先去掉两端空白。",
      "`String.to_integer(clean)` 尝试把清理后的文字变成整数。合法时返回数字，外层把它装进 `{:ok, number}`。",
      "错误文字会让 `String.to_integer/1` 抛出 `ArgumentError`；`rescue` 只接住这一类异常并返回 `{:error, :not_integer}`。",
      "合法和错误分支都返回 tuple，后面的代码可以继续用模式匹配处理。",
    ],
    practice: {
      task: "补完 `parse_age`：`\" 12 \"` 返回 `{:ok, 12}`，`\"未知\"` 返回 `{:error, :not_integer}`。",
      starter: `parse_age = fn text ->
  clean = String.____(text)

  try do
    {:ok, String.____(clean)}
  rescue
    ____ -> {:error, :not_integer}
  end
end

{parse_age.(" 12 "), parse_age.("未知")}`,
      expected: "得到 `{{:ok, 12}, {:error, :not_integer}}`。",
      hint: "三个空依次是 `trim`、`to_integer` 和 `ArgumentError`。",
      answer: `# 先清理，再尝试转换
parse_age = fn text ->
  clean = String.trim(text)

  try do
    {:ok, String.to_integer(clean)}
  rescue
    ArgumentError -> {:error, :not_integer}
  end
end

{parse_age.(" 12 "), parse_age.("未知")}`,
    },
    check: {
      question: "为什么 `parse_integer.(\"松\")` 没有让整段代码停下来？",
      answer: "`String.to_integer/1` 抛出的 `ArgumentError` 被 `rescue` 接住，并转换成了 `{:error, :not_integer}`。",
    },
    takeaways: [
      "文档用 `模块.函数/参数个数` 写清函数；真正调用时把参数写进括号。",
      "完整匿名函数可以把清理、转换和错误处理收成一个步骤。",
      "只接住预期异常，并把成功与失败都变成清楚的返回值。",
    ],
  },
  {
    number: "08",
    slug: "capture-enum-pipe",
    stage: "scratch",
    title: "拆开 &1 和管道",
    summary: "先写完整匿名函数，再读 capture、Enum 和 `|>`。",
    duration: "35 分钟",
    goal: "本课先用完整匿名函数和 `&1` 各生成一次 `[2, 4, 6]`，再亲手写管道得到 `\"桃、李\"`；三个结果都对就算完成。",
    plain: [
      "`&1` 不是一个独立变量。它只在由 `&` 开始的 capture 简写表达式中有意义，表示匿名函数收到的第一个参数。",
      "短写法应该最后学。先读懂 `fn number -> number * 2 end`，再把它缩成 `&(&1 * 2)`。",
      "`Enum` 里的函数会依次处理集合。管道 `|>` 把左边结果放进右边函数的第一个参数位置。",
    ],
    concepts: [
      {
        term: "capture",
        explanation: "`&` 可以取得一个已有函数，也可以创建一个简写匿名函数。",
      },
      {
        term: "Enum.map/2",
        explanation: "依次把集合中的每个值交给函数，收集每次返回的新值。",
      },
      {
        term: "管道",
        explanation: "`|>` 把左边结果作为右边函数的第一个参数。",
      },
    ],
    symbols: [
      { token: "&(&1 * 2)", reading: "创建匿名函数；`&1` 是收到的第一个参数。完整写法是 `fn number -> number * 2 end`。" },
      { token: "&String.trim/1", reading: "取得已经存在的 `String.trim/1` 函数，稍后交给别的函数调用。" },
      { token: "|>", reading: "把左边结果送到右边函数的第一个参数位置。" },
    ],
    example: {
      label: "整段复制：从长写法到短写法",
      code: `# 先写完整：number 是每次收到的值
long_double = fn number -> number * 2 end
Enum.map([1, 2, 3], long_double)

# 再看简写：&1 仍是每次收到的值
Enum.map([1, 2, 3], &(&1 * 2))

# 取得已有的 String.trim/1 函数
["  桃", "李  "] |> Enum.map(&String.trim/1)
|> Enum.join("、")`,
      caption: "三段代码都在“把函数交给另一个函数”。",
      output: ["前两段都得到 `[2, 4, 6]`。", "最后一条管道得到 `\"桃、李\"`。", "`&1` 只在 capture 简写内部有意义。"],
    },
    steps: [
      "`Enum.map/2` 接收两个参数：一个集合和一个函数，所以名字末尾是 `/2`。",
      "`&(&1 * 2)` 等于 `fn number -> number * 2 end`。第一次见时主动还原成长写法。",
      "`&String.trim/1` 没有马上调用 `trim`，只是把这个函数交给 `Enum.map/2`。",
      "最后一行等于 `Enum.join(上一步结果, \"、\")`。管道只自动填第一个参数。",
    ],
    practice: {
      task: "先用完整匿名函数和 `&1` 把 `[2, 3, 4]` 每项加 1，再补出管道，清理两段文字并连接。",
      starter: `# 第一遍：写完整名字
Enum.map([2, 3, 4], fn number -> ____ end)

# 第二遍：把收到的第一个参数写成 &1
Enum.map([2, 3, 4], &(____))

# 第三遍：亲手补上两段管道
["  桃", "李  "]
____ Enum.map(&String.trim/1)
____ Enum.join("、")`,
      expected: "前两段都得到 `[3, 4, 5]`，最后得到 `\"桃、李\"`。",
      hint: "前两空分别写 `number + 1` 和 `&1 + 1`；管道两处都写 `|>`。",
      answer: `# 长写法先把输入的名字写清楚
Enum.map([2, 3, 4], fn number -> number + 1 end)

# 短写法里 &1 表示第一个参数
Enum.map([2, 3, 4], &(&1 + 1))

# 管道把上一步结果送到下一个函数
["  桃", "李  "]
|> Enum.map(&String.trim/1)
|> Enum.join("、")`,
    },
    check: {
      question: "`&String.trim/1` 会立刻把某个字符串的空格删掉吗？",
      answer: "不会。它只是取得这个函数。等 `Enum.map/2` 把每个字符串交给它时，函数才会被调用。",
    },
    takeaways: [
      "先读长写法，再接受短写法。",
      "`&1` 是 capture 简写中的第一个参数。",
      "管道把左边结果放到右边的第一个参数。",
    ],
  },
  {
    number: "09",
    slug: "modules-and-mix",
    stage: "scratch",
    title: "把代码放进项目",
    summary: "写一个模块，认识 def、文件和 Mix，再走向 BEAM。",
    duration: "35 分钟",
    goal: "本课先在 IEx 定义并调用 `Village.greet/1`，看到 `\"你好，小满\"`；再创建 Mix 项目并让默认测试通过。",
    plain: [
      "IEx 像草稿纸。代码变多后，要把相关函数放进模块，再保存到文件。",
      "`defmodule` 定义模块，`def` 定义可以从模块外调用的函数。模块名通常使用大写开头的驼峰写法。",
      "Mix 管理 Elixir 项目。它会创建目录、编译代码、运行测试。Mix 随 Elixir 一起安装，不是第三门语言。",
    ],
    concepts: [
      {
        term: "模块",
        explanation: "给一组相关函数取一个共同名字，如 `Village`。",
      },
      {
        term: "源码文件",
        explanation: "保存代码的文本文件。Elixir 文件常以 `.ex` 结尾。",
      },
      {
        term: "Mix",
        explanation: "Elixir 项目工具。常用命令有 `mix new`、`mix test` 和 `mix run`。",
      },
    ],
    symbols: [
      { token: "defmodule", reading: "开始定义一个模块。" },
      { token: "def greet(name)", reading: "定义公开函数 `greet/1`，它接收一个参数。" },
      { token: "do ... end", reading: "包住模块或函数的代码范围。" },
    ],
    example: {
      label: "先在 IEx 试，再保存到 lib/village.ex",
      code: `# 模块收好一组相关函数
defmodule Village do
  # greet/1 接收名字，返回一句问候
  def greet(name) do
    "你好，#{name}"
  end
end

# 用 模块.函数(参数) 调用
Village.greet("小满")`,
      caption: "IEx 里的定义会随会话结束而消失。进入 Mix 项目后，把同一模块保存进 `lib/village.ex`。",
      output: ["模块定义完成后，IEx 显示 `{:module, Village, ...}`。", "最后得到 `\"你好，小满\"`。"],
    },
    steps: [
      "`defmodule Village do` 开始一个名为 `Village` 的模块。",
      "`def greet(name)` 定义公开函数。它的完整名字是 `Village.greet/1`。",
      "函数最后一个表达式的值会自动成为返回值，不用写 `return`。",
      "`mix new village` 创建项目；进入目录后用 `mix test` 跑测试，用 `iex -S mix` 打开已经加载项目的 IEx。",
    ],
    practice: {
      task: "在系统终端创建一个 Mix 项目，跑默认测试，再打开已加载项目的 IEx。",
      starter: `# 补上同一个项目目录名
mix new ____
cd ____

# 运行项目自带的测试
mix test

# 打开已经加载这个项目的 IEx
iex -S mix`,
      expected: "项目目录中会出现 `mix.exs`、`lib/` 和 `test/`；默认测试通过后，进入项目 IEx。",
      hint: "两个空都可填写 `village_path`。这些命令要在系统终端运行，不要输入普通 IEx。",
      answer: `# 创建并进入项目
mix new village_path
cd village_path

# 先跑一次默认测试
mix test

# 以后在这里试项目模块
iex -S mix`,
    },
    check: {
      question: "Mix 是 BEAM 或另一门编程语言吗？",
      answer: "都不是。Mix 是 Elixir 的项目工具；Elixir 代码仍在 BEAM 上运行。",
    },
    takeaways: [
      "模块把相关函数放在一起。",
      "Elixir 函数会返回最后一个表达式的值。",
      "Mix 负责创建、编译和测试项目。",
    ],
  },
  {
    number: "10",
    slug: "operators-and-truthiness",
    stage: "foundation",
    title: "真假不只靠 true",
    summary: "比较值，组合条件，认清 Elixir 怎样判断真假。",
    duration: "25 分钟",
    goal: "运行一组价格判断，分清 `==`、`===`、`and` 与 `&&`；最后得到 `:can_buy`。",
    plain: [
      "先看结果：余额够，而且商品有货，程序才返回 `:can_buy`。",
      "Elixir 只有 `false` 和 `nil` 会被当作假。`0`、空字符串和空 list 都会被当作真。",
      "`and`、`or` 要求左边是布尔值；`&&`、`||` 接受任何值。写明确条件时，优先使用 `and`、`or`。",
    ],
    concepts: [
      {
        term: "真值",
        explanation: "条件判断时，一个值被看作真还是假。Elixir 中只有 `false` 与 `nil` 为假。",
      },
      {
        term: "严格相等",
        explanation: "`===` 不只比较数值，还区分整数与浮点数。",
      },
    ],
    symbols: [
      { token: "== / ===", reading: "前者比较值；后者还严格比较数字类型。" },
      { token: "and / or / not", reading: "组合布尔条件。" },
      { token: "&& / || / !", reading: "可处理任意真值，但要读清返回的可能不是布尔值。" },
    ],
    example: {
      label: "在 IEx 判断能否买书",
      code: `price = 36
balance = 50
in_stock = true

# 两个条件都为真，才可以买
if balance >= price and in_stock do
  :can_buy
else
  :wait
end

# 数值相等，但类型并不严格相同
1 == 1.0
1 === 1.0`,
      caption: "先运行购买判断，再比较最后两行。",
      output: ["购买判断返回 `:can_buy`。", "`1 == 1.0` 是 `true`；`1 === 1.0` 是 `false`。"],
    },
    steps: [
      "`>=` 先比较余额与价格，得到布尔值。",
      "`and` 再确认商品有货；两边都为 `true` 才走第一条路。",
      "严格相等适合需要区分整数和浮点数的边界。",
    ],
    practice: {
      task: "只有年龄不少于 12 且有票时，返回 `:enter`。",
      starter: `age = 13
has_ticket = true

if ____ and ____ do
  :enter
else
  :stop
end`,
      expected: "得到 `:enter`。",
      hint: "两个条件分别是 `age >= 12` 和 `has_ticket`。",
      answer: `age = 13
has_ticket = true

# 两个布尔条件同时成立
if age >= 12 and has_ticket do
  :enter
else
  :stop
end`,
    },
    check: {
      question: "空 list `[]` 在 Elixir 中会被当作假吗？",
      answer: "不会。只有 `false` 和 `nil` 会被当作假，`[]` 会被当作真。",
    },
    takeaways: [
      "先让比较产生布尔值，再组合条件。",
      "`==` 与 `===` 的严格程度不同。",
      "只有 `false` 和 `nil` 为假。",
    ],
  },
  {
    number: "11",
    slug: "nested-collections",
    stage: "foundation",
    title: "走进嵌套数据",
    summary: "从 map 里的 list 取值，再安全地更新深处数据。",
    duration: "30 分钟",
    goal: "从一份书院记录里读出第一门课，并把积分从 8 改成 9。",
    plain: [
      "真实数据常是一层套一层：map 里有 map，也有 list。别一次看完整棵树，先沿一条路走。",
      "`get_in/2` 按路径取值。`update_in/3` 找到同一路径后，把旧值交给函数。",
      "路径中的 atom 对应 map 的键，数字对应 list 的位置。list 的第一个位置是 0。",
    ],
    concepts: [
      {
        term: "嵌套集合",
        explanation: "集合里面继续放集合，如学生 map 里再放课程 list。",
      },
      {
        term: "访问路径",
        explanation: "从外到内的一串位置。它告诉函数沿哪些键或下标寻找。",
      },
    ],
    symbols: [
      { token: "data.key", reading: "读取 atom 键；键不存在时会报错。" },
      { token: "get_in(data, path)", reading: "沿路径读取嵌套值。" },
      { token: "update_in(data, path, fun)", reading: "沿路径找到旧值，再用函数生成新值。" },
    ],
    example: {
      label: "读取并更新书院记录",
      code: `student = %{
  name: "阿青",
  courses: [%{title: "Elixir", points: 8}]
}

# 路径先进入 courses，再取第 0 项和 title
get_in(student, [:courses, Access.at(0), :title])

# 原数据不变，updated 是一份新数据
updated =
  update_in(student, [:courses, Access.at(0), :points], fn points ->
    points + 1
  end)

get_in(updated, [:courses, Access.at(0), :points])`,
      caption: "先读标题，再观察更新前后是两份数据。",
      output: ["第一次得到 `\"Elixir\"`。", "最后得到 `9`；`student` 里的积分仍是 `8`。"],
    },
    steps: [
      "`:courses` 进入外层 map 的课程 list。",
      "`Access.at(0)` 取第一门课，`:points` 再取积分。",
      "更新会返回新结构，不会暗中改掉旧变量里的值。",
    ],
    practice: {
      task: "把第二颗星的名字从 `\"北辰\"` 改为 `\"南山\"`。",
      starter: `sky = %{stars: [%{name: "启明"}, %{name: "北辰"}]}

put_in(sky, [:stars, Access.at(___), :name], "南山")`,
      expected: "新 map 的第二颗星名是 `\"南山\"`。",
      hint: "第二项的下标是 `1`。",
      answer: `sky = %{stars: [%{name: "启明"}, %{name: "北辰"}]}

# list 从 0 开始计数，第二项下标是 1
put_in(sky, [:stars, Access.at(1), :name], "南山")`,
    },
    check: {
      question: "`update_in/3` 会直接改掉原 map 吗？",
      answer: "不会。Elixir 数据不可变；它返回包含新值的新结构。",
    },
    takeaways: [
      "读嵌套数据时，一层一层走。",
      "路径可同时经过 map 和 list。",
      "更新会产生新数据。",
    ],
  },
  {
    number: "12",
    slug: "unicode-and-text",
    stage: "foundation",
    title: "一字不一定一字节",
    summary: "用 UTF-8 处理中文，分清字节、码点和人眼看到的字符。",
    duration: "30 分钟",
    goal: "比较 `byte_size/1` 与 `String.length/1`，再把一行中文切成干净词语。",
    plain: [
      "屏幕上一个汉字，存进电脑后常占多个字节。计字节和计字符，是两件事。",
      "Elixir 字符串使用 UTF-8。`String` 模块按文字处理；`byte_size/1` 按底层字节处理。",
      "读文件或用户输入时，常先 `trim` 去掉首尾空白，再 `split` 切开。",
    ],
    concepts: [
      {
        term: "UTF-8",
        explanation: "把世界各地文字编码成字节的一套规则。Elixir 字符串默认使用它。",
      },
      {
        term: "字素",
        explanation: "人眼看到的一个字符。它可能由不止一个 Unicode 码点组成。",
      },
    ],
    symbols: [
      { token: "byte_size/1", reading: "计算字符串占多少字节。" },
      { token: "String.length/1", reading: "计算人眼看到多少个字符。" },
      { token: "String.split/2", reading: "按分隔符把字符串切成 list。" },
    ],
    example: {
      label: "数一数“长安”",
      code: `text = "  长安 春风  "

# 中文字符在 UTF-8 中通常占多个字节
byte_size("长安")
String.length("长安")

# 先去掉两端空格，再按空格切词
text
|> String.trim()
|> String.split(" ", trim: true)`,
      caption: "先比较两个数字，再看清洗后的词语 list。",
      output: ["`byte_size(\"长安\")` 得到 `6`，`String.length(\"长安\")` 得到 `2`。", "管道得到 `[\"长安\", \"春风\"]`。"],
    },
    steps: [
      "字节数适合协议、文件大小等底层边界。",
      "给读者显示长度时，通常使用 `String.length/1`。",
      "清洗文字时先明确空白和分隔规则。",
    ],
    practice: {
      task: "把 `\"  桃,李,杏  \"` 变成三个词。",
      starter: `"  桃,李,杏  "
|> String.____()
|> String.split(____)`,
      expected: "得到 `[\"桃\", \"李\", \"杏\"]`。",
      hint: "先用 `trim`，再按 `\",\"` 切。",
      answer: `"  桃,李,杏  "
|> String.trim()
|> String.split(",")`,
    },
    check: {
      question: "`byte_size(\"长安\")` 为什么不是 2？",
      answer: "因为它数 UTF-8 字节，不数人眼看到的字符；两个汉字共占 6 个字节。",
    },
    takeaways: [
      "字符数与字节数可能不同。",
      "文字处理优先看 `String` 模块。",
      "输入文字要先清洗，再解析。",
    ],
  },
  {
    number: "13",
    slug: "named-functions-and-clauses",
    stage: "foundation",
    title: "让函数按形状接活",
    summary: "用命名函数、多个子句和 guard 把分支写在函数门口。",
    duration: "30 分钟",
    goal: "写出 `Fare.fee/1` 的三个函数子句，让儿童、成人和错误输入各走一条路。",
    plain: [
      "同名、同参数个数的函数可以写多个子句。Elixir 从上往下寻找第一个匹配的子句。",
      "模式先看输入形状，guard 再检查范围。两者放在函数入口，正文就能更短。",
      "最具体的子句放前面，兜底子句放最后。顺序写反，前面的宽规则会挡住后面。",
    ],
    concepts: [
      {
        term: "函数子句",
        explanation: "同一个函数的不同入口。每个入口用模式或 guard 说明自己接什么输入。",
      },
      {
        term: "guard",
        explanation: "`when` 后面的额外条件，只允许使用一组安全表达式。",
      },
    ],
    symbols: [
      { token: "def fee(age) when ...", reading: "定义带 guard 的命名函数子句。" },
      { token: "_", reading: "匹配任何值，但不使用它。" },
      { token: "fee/1", reading: "函数名是 `fee`，参数个数是 1。" },
    ],
    example: {
      label: "把规则写进函数入口",
      code: `defmodule Fare do
  # 小于 12 岁走这一条
  def fee(age) when is_integer(age) and age < 12, do: {:ok, 0}

  # 其余非负整数走成人票价
  def fee(age) when is_integer(age) and age >= 0, do: {:ok, 20}

  def fee(_), do: {:error, :invalid_age}
end

Fare.fee(9)
Fare.fee(18)
Fare.fee("九")`,
      caption: "依次给函数三种输入，观察命中的子句。",
      output: ["三个结果依次是 `{:ok, 0}`、`{:ok, 20}`、`{:error, :invalid_age}`。"],
    },
    steps: [
      "两个整数子句都先用 `is_integer/1` 守住类型。",
      "`age < 12` 比 `age >= 0` 更具体，所以放在前面。",
      "最后的 `_` 接住没有通过前面规则的输入。",
    ],
    practice: {
      task: "为 `Weather.label/1` 写出晴天和兜底两个子句。",
      starter: `defmodule Weather do
  def label(:sunny), do: ____
  def label(_), do: ____
end`,
      expected: "`Weather.label(:sunny)` 得到 `\"晴\"`，其他输入得到 `\"未知\"`。",
      hint: "右边直接写两个字符串。",
      answer: `defmodule Weather do
  # 具体 atom 放在兜底规则前
  def label(:sunny), do: "晴"
  def label(_), do: "未知"
end`,
    },
    check: {
      question: "为什么兜底子句通常放在最后？",
      answer: "它能匹配任何输入。若放在前面，后面的具体子句永远没有机会运行。",
    },
    takeaways: [
      "函数子句按从上到下的顺序匹配。",
      "模式看形状，guard 查条件。",
      "具体规则在前，兜底规则在后。",
    ],
  },
  {
    number: "14",
    slug: "recursion-and-folds",
    stage: "foundation",
    title: "把一列数收成一个值",
    summary: "先读递归累加器，再用 `Enum.reduce/3` 写同一件事。",
    duration: "35 分钟",
    goal: "用递归与 `Enum.reduce/3` 分别算出 `[3, 5, 7]` 的总和 15。",
    plain: [
      "递归每次取走一个元素，把更小的 list 交给自己。空 list 是停下来的地方。",
      "累加器保存走到当前为止的结果。输入越来越短，累加器越来越接近答案。",
      "`Enum.reduce/3` 把这套递归收进通用工具。先懂一次手写过程，再放心使用工具。",
    ],
    concepts: [
      {
        term: "累加器",
        explanation: "递归途中保存阶段结果的参数，如当前总和。",
      },
      {
        term: "fold",
        explanation: "把一组值从左到右收拢成一个结果；`reduce` 就是一种 fold。",
      },
    ],
    symbols: [
      { token: "[head | tail]", reading: "取出 list 第一项与剩余部分。" },
      { token: "Enum.reduce(list, initial, fun)", reading: "从初始值开始逐项累积。" },
      { token: "sum/2", reading: "两个参数版本可作为内部递归函数。" },
    ],
    example: {
      label: "两种写法得到同一个总和",
      code: `defmodule Totals do
  def sum(numbers), do: sum(numbers, 0)

  # 空 list 返回累加器，递归在这里停
  defp sum([], total), do: total
  defp sum([number | rest], total), do: sum(rest, total + number)
end

Totals.sum([3, 5, 7])

# reduce 把同一套累加过程写成通用形式
Enum.reduce([3, 5, 7], 0, fn number, total -> total + number end)`,
      caption: "先跑模块，再跑 `reduce`；两个结果应相同。",
      output: ["两种写法都得到 `15`。"],
    },
    steps: [
      "公开的 `sum/1` 给内部 `sum/2` 一个初始总和 0。",
      "每一步拿走一个数字，并把它加进累加器。",
      "`reduce` 的匿名函数接收当前元素和当前累加结果。",
    ],
    practice: {
      task: "用 `Enum.reduce/3` 算 `[2, 3, 4]` 的乘积。",
      starter: `Enum.reduce([2, 3, 4], ____, fn number, product ->
  ____
end)`,
      expected: "得到 `24`。",
      hint: "乘法的初始值是 1；每步计算 `number * product`。",
      answer: `Enum.reduce([2, 3, 4], 1, fn number, product ->
  # 把当前数字乘进已有结果
  number * product
end)`,
    },
    check: {
      question: "求和时为什么用 0 作为初始累加器？",
      answer: "因为任何数加 0 仍是它自己；空 list 的总和也自然是 0。",
    },
    takeaways: [
      "递归要让输入不断变小。",
      "累加器带着阶段结果前进。",
      "`Enum.reduce/3` 是常用收拢工具。",
    ],
  },
  {
    number: "15",
    slug: "control-flow",
    stage: "foundation",
    title: "给不同问题选不同路",
    summary: "按数据形状选 `case`，按条件选 `cond`，按结果串联选 `with`。",
    duration: "35 分钟",
    goal: "解析一个年龄字符串，并在成功与失败时返回清楚结果。",
    plain: [
      "控制流不是越多越好。先问自己在判断什么：值的形状、多个条件，还是连续步骤。",
      "`case` 适合匹配一个结果的不同形状。`cond` 适合从多条布尔条件中选第一条真规则。",
      "`with` 适合串联多个可能失败的 `{:ok, value}` 步骤。任一步不匹配，就把那个值交给 `else`。",
    ],
    concepts: [
      {
        term: "控制流",
        explanation: "程序根据输入或条件，选择接下来运行哪段代码。",
      },
      {
        term: "短路",
        explanation: "一旦某步失败，后续步骤不再运行，直接处理失败结果。",
      },
    ],
    symbols: [
      { token: "case value do", reading: "按一个值的模式选择子句。" },
      { token: "cond do", reading: "从上到下选择第一条为真的条件。" },
      { token: "with pattern <- value do", reading: "只有匹配成功才继续下一步。" },
    ],
    example: {
      label: "解析后再判断年龄",
      code: `parse_age = fn text ->
  case Integer.parse(text) do
    {age, ""} -> {:ok, age}
    _ -> {:error, :bad_age}
  end
end

# with 只在得到 {:ok, age} 时进入正文
with {:ok, age} <- parse_age.("13") do
  cond do
    age < 12 -> {:ok, :child}
    true -> {:ok, :teen_or_adult}
  end
else
  error -> error
end`,
      caption: "把 `\"13\"` 改为 `\"十三\"`，观察失败怎样提前返回。",
      output: ["`\"13\"` 得到 `{:ok, :teen_or_adult}`。", "`\"十三\"` 得到 `{:error, :bad_age}`。"],
    },
    steps: [
      "`Integer.parse/1` 可能返回整数与剩余文字，也可能返回 `:error`。",
      "`case` 把底层结果整理成统一的成功或失败 tuple。",
      "`with` 让成功值继续；失败值直接进入 `else`。",
    ],
    practice: {
      task: "补全 `case`，让空 list 返回 `:empty`，非空 list 返回第一项。",
      starter: `case [8, 9] do
  ____ -> :empty
  [head | _] -> ____
end`,
      expected: "得到 `8`。",
      hint: "空 list 的模式是 `[]`；第二处返回 `head`。",
      answer: `case [8, 9] do
  [] -> :empty
  # 非空 list 的 head 是第一项
  [head | _] -> head
end`,
    },
    check: {
      question: "只有一个简单真假条件时，一定要使用 `cond` 吗？",
      answer: "不用。简单真假分支用 `if` 更直接；`cond` 留给多条条件。",
    },
    takeaways: [
      "按问题选择控制流工具。",
      "`case` 擅长模式，`cond` 擅长多条件。",
      "`with` 让一串可能失败的步骤更清楚。",
    ],
  },
  {
    number: "16",
    slug: "structs-and-module-metadata",
    stage: "foundation",
    title: "给 map 一张名片",
    summary: "用 struct 固定领域数据的名字，再用模块属性写文档与默认值。",
    duration: "35 分钟",
    goal: "定义 `Book` struct，创建一本书，再用更新语法把页数改为 121。",
    plain: [
      "普通 map 很自由，但领域数据常需要固定名字。struct 在 map 基础上加上模块身份与字段清单。",
      "`defstruct` 声明字段和默认值。创建时写 `%Book{}`，更新时写 `%Book{book | ...}`。",
      "模块属性以 `@` 开头。`@moduledoc`、`@doc` 写文档；自定义属性也可保存编译时常量。",
    ],
    concepts: [
      {
        term: "struct",
        explanation: "带模块身份和固定字段的 map，适合表示书、订单等领域数据。",
      },
      {
        term: "模块属性",
        explanation: "编译模块时使用的标记或值，如文档、类型说明与常量。",
      },
    ],
    symbols: [
      { token: "defstruct", reading: "声明 struct 字段与默认值。" },
      { token: "%Book{...}", reading: "创建或匹配 `Book` struct。" },
      { token: "@moduledoc / @doc", reading: "为模块和函数写文档。" },
    ],
    example: {
      label: "定义一本书",
      code: `defmodule Book do
  @moduledoc "一本馆藏书。"
  @default_pages 1

  # title 必填，其余字段有默认值
  @enforce_keys [:title]
  defstruct title: nil, pages: @default_pages

  # 在模块内部，__MODULE__ 就是 Book
  def revise(%__MODULE__{} = book, pages) do
    %__MODULE__{book | pages: pages}
  end
end

book = struct!(Book, title: "小城", pages: 120)
updated = Book.revise(book, 121)
{book.pages, updated.pages}`,
      caption: "`struct!/2` 让整段代码能一次粘贴运行；在模块内部仍用 `%__MODULE__{}` 创建或更新 struct。",
      output: ["最后得到 `{120, 121}`。"],
    },
    steps: [
      "`@enforce_keys` 要求创建时明确提供书名。",
      "`defstruct` 决定可用字段，未声明字段不能随意加入。",
      "更新语法返回新 struct，旧值仍保留 120。",
    ],
    practice: {
      task: "定义 `Lantern`，字段为 `color` 和默认亮度 `1`。",
      starter: `defmodule Lantern do
  @enforce_keys [:color]
  defstruct color: nil, brightness: ____
end

struct!(Lantern, color: "红")`,
      expected: "得到一个颜色为 `\"红\"`、亮度为 `1` 的 `Lantern`。",
      hint: "把默认值直接写成整数 1。",
      answer: `defmodule Lantern do
  @enforce_keys [:color]
  # brightness 没传入时使用 1
  defstruct color: nil, brightness: 1
end

struct!(Lantern, color: "红")`,
    },
    check: {
      question: "struct 能随时加入一个没有声明的新字段吗？",
      answer: "不能。它的字段由 `defstruct` 固定；需要新字段时要修改模块定义。",
    },
    takeaways: [
      "struct 让领域数据有明确身份。",
      "struct 更新仍会返回新值。",
      "模块属性可承载文档、类型和编译时常量。",
    ],
  },
  {
    number: "17",
    slug: "project-and-first-tests",
    stage: "foundation",
    title: "让项目自己验答案",
    summary: "创建 Mix 项目，写第一个模块，再用 ExUnit 守住结果。",
    duration: "40 分钟",
    goal: "创建 `trail_counter` 项目，让一个字符计数测试通过。",
    plain: [
      "手动试一次只能说明刚才没出错。测试把例子保存下来，以后每次修改都能重新检查。",
      "`mix new` 建好项目骨架。源码放 `lib/`，测试放 `test/`，项目配置在 `mix.exs`。",
      "ExUnit 测试由 `test` 块组织，`assert` 写出你期待的结果。",
    ],
    concepts: [
      {
        term: "测试用例",
        explanation: "给一份输入，写清期待输出，并让工具自动比较。",
      },
      {
        term: "回归",
        explanation: "新修改意外弄坏了原来能工作的行为。已有测试能尽早发现它。",
      },
    ],
    symbols: [
      { token: "mix new name", reading: "创建一个新的 Mix 项目。" },
      { token: "use ExUnit.Case", reading: "让当前测试模块使用 ExUnit 功能。" },
      { token: "assert left == right", reading: "要求比较结果为真，否则测试失败。" },
    ],
    example: {
      label: "先写行为，再运行测试",
      code: `# lib/trail_counter.ex
defmodule TrailCounter do
  def length(text), do: String.length(text)
end

# test/trail_counter_test.exs
defmodule TrailCounterTest do
  use ExUnit.Case, async: true

  test "计算中文字符数" do
    assert TrailCounter.length("长安") == 2
  end
end`,
      caption: "先运行 `mix new trail_counter`，再把代码放进对应文件，执行 `mix test`。",
      output: ["测试通过时显示 `1 test, 0 failures`。"],
    },
    steps: [
      "公开函数只做一件事：返回字符串字符数。",
      "测试名用一句话说明行为，不复述实现。",
      "`async: true` 允许安全的测试模块并行运行。",
    ],
    practice: {
      task: "再加一个空字符串测试。",
      starter: `test "空文字长度为零" do
  assert TrailCounter.length(____) == ____
end`,
      expected: "两个测试都通过。",
      hint: "输入写 `\"\"`，期待值写 `0`。",
      answer: `test "空文字长度为零" do
  # 空字符串没有可见字符
  assert TrailCounter.length("") == 0
end`,
    },
    check: {
      question: "测试通过是否能证明程序永远没有错误？",
      answer: "不能。它只说明列出的例子通过；边界和错误输入仍需要继续补测试。",
    },
    takeaways: [
      "源码与测试分开放置。",
      "测试保存可重复检查的例子。",
      "每修一个错误，就考虑补一个能重现它的测试。",
    ],
  },
  {
    number: "18",
    slug: "result-contracts",
    stage: "intermediate",
    title: "让成功和失败长得一样",
    summary: "用 `{:ok, value}` 与 `{:error, reason}` 建立可组合的结果约定。",
    duration: "30 分钟",
    goal: "写出安全除法函数，让调用者不用猜异常或特殊值。",
    plain: [
      "函数会失败时，调用者最怕结果忽左忽右。统一形状比一句含糊说明更可靠。",
      "成功返回 `{:ok, value}`，失败返回 `{:error, reason}`。调用者可以用模式匹配处理两条路。",
      "reason 应短而稳定，如 `:division_by_zero`。给人看的句子放在显示层，不要塞进每个底层函数。",
    ],
    concepts: [
      {
        term: "结果约定",
        explanation: "调用者与函数共同遵守的返回值形状。",
      },
      {
        term: "错误原因",
        explanation: "说明失败类别的稳定值，常用 atom 或带细节的 tuple。",
      },
    ],
    symbols: [
      { token: "{:ok, value}", reading: "操作成功，第二项带回结果。" },
      { token: "{:error, reason}", reading: "操作失败，第二项说明原因。" },
      { token: "with", reading: "把多个遵守相同约定的步骤连起来。" },
    ],
    example: {
      label: "安全地做除法",
      code: `defmodule Ratio do
  # 零是明确的失败输入
  def divide(_left, 0), do: {:error, :division_by_zero}
  def divide(left, right), do: {:ok, left / right}
end

for input <- [{12, 3}, {12, 0}] do
  case Ratio.divide(elem(input, 0), elem(input, 1)) do
    {:ok, value} -> "结果：#{value}"
    {:error, :division_by_zero} -> "不能除以零"
  end
end`,
      caption: "函数只返回稳定数据，外层负责写给人看的文字。",
      output: ["得到 `[\"结果：4.0\", \"不能除以零\"]`。"],
    },
    steps: [
      "最具体的零除数子句放在前面。",
      "两条路都返回二元 tuple，第一项说明成功或失败。",
      "`case` 在边界处把内部原因翻译成人话。",
    ],
    practice: {
      task: "补全 `positive/1`，只接受正数。",
      starter: `def positive(number) when number > 0, do: {____, number}
def positive(_), do: {____, ____}`,
      expected: "正数得到 `{:ok, number}`，其他输入得到 `{:error, :not_positive}`。",
      hint: "成功标签是 `:ok`，失败标签是 `:error`。",
      answer: `def positive(number) when number > 0, do: {:ok, number}
# 原因使用稳定 atom
def positive(_), do: {:error, :not_positive}`,
    },
    check: {
      question: "为什么不在失败时随便返回 `nil`？",
      answer: "`nil` 没说明失败原因，也容易与正常的“没有值”混淆；error tuple 更明确。",
    },
    takeaways: [
      "失败函数要公开稳定的返回形状。",
      "atom 适合表示可匹配的错误类别。",
      "展示文字与底层错误原因分开。",
    ],
  },
  {
    number: "19",
    slug: "files-and-paths",
    stage: "intermediate",
    title: "读写文件先管好路",
    summary: "用 `Path` 拼路径，用 `File` 返回值处理磁盘成功与失败。",
    duration: "35 分钟",
    goal: "在临时目录写入两行文字，再读回并切成 list。",
    plain: [
      "文件代码有两个边界：路径和磁盘。路径不要靠手写斜杠拼接，读写不要假装永远成功。",
      "`Path.join/2` 会按当前系统拼路径。`File.write/2` 与 `File.read/1` 返回结果 tuple。",
      "练习使用系统临时目录，避免覆盖自己的文件。真正项目还要考虑权限、编码和大文件。",
    ],
    concepts: [
      {
        term: "路径",
        explanation: "指出文件在磁盘上的位置。不同系统的分隔方式可能不同。",
      },
      {
        term: "文件边界",
        explanation: "程序与磁盘交接的位置；文件可能不存在、无权限或正在被占用。",
      },
    ],
    symbols: [
      { token: "Path.join/2", reading: "安全拼接目录和文件名。" },
      { token: "File.write/2", reading: "写文件，成功返回 `:ok`。" },
      { token: "File.read/1", reading: "读文件，返回 success/error tuple。" },
    ],
    example: {
      label: "在临时目录写一张短名单",
      code: `path = Path.join(System.tmp_dir!(), "beam_path_names.txt")

# 写入自己控制的临时文件
:ok = File.write(path, "阿青\n小满\n")

# 文件读取可能失败，所以先匹配成功结果
{:ok, text} = File.read(path)
String.split(text, "\n", trim: true)`,
      caption: "这段代码只写系统临时目录里的指定文件。",
      output: ["最后得到 `[\"阿青\", \"小满\"]`。"],
    },
    steps: [
      "`System.tmp_dir!/0` 取得当前系统临时目录。",
      "`:ok =` 说明本例要求写入成功，否则立刻暴露问题。",
      "读回文字后再由 `String.split/3` 解析。",
    ],
    practice: {
      task: "把文件名改为 `scores.txt`，写入 `\"8\\n9\\n\"`。",
      starter: `path = Path.join(System.tmp_dir!(), ____)
File.write(path, ____)`,
      expected: "返回 `:ok`，临时文件中有两行数字。",
      hint: "两个空分别是文件名与含换行符的字符串。",
      answer: `path = Path.join(System.tmp_dir!(), "scores.txt")
# \n 表示换行
File.write(path, "8\n9\n")`,
    },
    check: {
      question: "为什么路径不直接写成 `\"/tmp/scores.txt\"`？",
      answer: "不同系统的临时目录与路径规则不同；由系统和 `Path` 模块决定更稳妥。",
    },
    takeaways: [
      "路径交给 `Path` 模块拼接。",
      "磁盘操作总有失败可能。",
      "先读取原始文字，再单独解析。",
    ],
  },
  {
    number: "20",
    slug: "lazy-data-pipelines",
    stage: "intermediate",
    title: "只算眼前需要的",
    summary: "用 `Stream` 延迟 map 与 filter，到了 `Enum` 才真正取结果。",
    duration: "35 分钟",
    goal: "从无限整数流中取前三个能被 3 整除的数，并保留它们的平方。",
    plain: [
      "`Enum` 通常立即走完整个集合。数据很大，甚至没有尽头时，先做完全部工作并不可能。",
      "`Stream` 只记住步骤，不马上计算。遇到 `Enum.take/2` 等消费者时，才按需要拉取数据。",
      "惰性不是免费午餐。小 list 直接用 `Enum` 更清楚；大数据或多步管道再考虑 `Stream`。",
    ],
    concepts: [
      {
        term: "惰性",
        explanation: "先描述计算，直到结果被需要时才执行。",
      },
      {
        term: "消费者",
        explanation: "真正拉取并形成结果的函数，如 `Enum.take/2`、`Enum.to_list/1`。",
      },
    ],
    symbols: [
      { token: "Stream.iterate/2", reading: "从一个值开始生成持续序列。" },
      { token: "Stream.map/2", reading: "登记映射步骤，不立即遍历。" },
      { token: "Enum.take/2", reading: "只取需要的前几项，并触发计算。" },
    ],
    example: {
      label: "从无限流里取三个答案",
      code: `1
|> Stream.iterate(&(&1 + 1))
|> Stream.filter(fn number -> rem(number, 3) == 0 end)
# 只有需要的数字才继续平方
|> Stream.map(fn number -> %{number: number, square: number * number} end)
|> Enum.take(3)`,
      caption: "流没有终点，但 `take(3)` 让程序知道何时停。",
      output: ["得到三个 map：`%{number: 3, square: 9}`、`%{number: 6, square: 36}`、`%{number: 9, square: 81}`。"],
    },
    steps: [
      "`Stream.iterate/2` 生成 1、2、3……，不预先存下无限数字。",
      "filter 只让 3 的倍数通过，map 同时保存原数与平方。",
      "找到三个结果后，`Enum.take/2` 停止向上游要数据。",
    ],
    practice: {
      task: "从 10 开始，取前四个偶数，并给每项加上 `:even` 标签。",
      starter: `10
|> Stream.iterate(&(&1 + 1))
|> Stream.filter(fn number -> rem(number, ____) == 0 end)
|> Stream.map(fn number -> {:even, number} end)
|> Enum.take(____)`,
      expected: "得到 `[{:even, 10}, {:even, 12}, {:even, 14}, {:even, 16}]`。",
      hint: "偶数除以 2 余 0；一共取 4 项。",
      answer: `10
|> Stream.iterate(&(&1 + 1))
# 只保留偶数
|> Stream.filter(fn number -> rem(number, 2) == 0 end)
|> Stream.map(fn number -> {:even, number} end)
|> Enum.take(4)`,
    },
    check: {
      question: "为什么无限流不能直接交给 `Enum.to_list/1`？",
      answer: "它会不停索取下一项，永远等不到完整 list；必须用 `take` 等操作划定边界。",
    },
    takeaways: [
      "`Stream` 描述惰性步骤。",
      "`Enum` 消费流并产出结果。",
      "无限数据必须有明确停止边界。",
    ],
  },
  {
    number: "21",
    slug: "protocols",
    stage: "intermediate",
    title: "同一句话，不同做法",
    summary: "用 protocol 为不同数据类型定义同一项能力。",
    duration: "40 分钟",
    goal: "定义 `Measure.size/1`，让 list 与 map 各自计算大小。",
    plain: [
      "有时问题不该问“你属于哪个模块”，而该问“你会不会做这件事”。protocol 就是能力约定。",
      "`defprotocol` 声明函数，`defimpl` 为具体类型提供实现。调用者只面对同一个名字。",
      "protocol 适合由数据类型决定行为。若只是项目内部替换模块，behaviour 往往更合适。",
    ],
    concepts: [
      {
        term: "protocol",
        explanation: "根据第一个参数的数据类型选择实现的多态约定。",
      },
      {
        term: "实现",
        explanation: "某种类型怎样完成 protocol 声明的函数。",
      },
    ],
    symbols: [
      { token: "defprotocol", reading: "声明一项跨类型能力。" },
      { token: "defimpl ... for:", reading: "为指定类型实现该能力。" },
      { token: "Measure.size(value)", reading: "调用时由值的类型选择实现。" },
    ],
    example: {
      label: "让 list 与 map 都会报大小",
      code: `defprotocol Measure do
  @spec size(t()) :: non_neg_integer()
  def size(value)
end

# list 使用 length/1
defimpl Measure, for: List do
  def size(value), do: length(value)
end

# map 使用 map_size/1
defimpl Measure, for: Map do
  def size(value), do: map_size(value)
end

{Measure.size([:a, :b]), Measure.size(%{a: 1})}`,
      caption: "同一个函数名，根据第一个参数类型选择实现。",
      output: ["得到 `{2, 1}`。"],
    },
    steps: [
      "protocol 只声明 `size/1` 应存在，不决定算法。",
      "`List` 与 `Map` 实现各自最自然的计数方法。",
      "未实现类型调用时会得到 `Protocol.UndefinedError`。",
    ],
    practice: {
      task: "为 `BitString` 加实现，使用 `String.length/1`。",
      starter: `defimpl Measure, for: ____ do
  def size(value), do: ____
end`,
      expected: "`Measure.size(\"长安\")` 得到 `2`。",
      hint: "Elixir 字符串属于 `BitString`；正文调用 `String.length(value)`。",
      answer: `defimpl Measure, for: BitString do
  # 按可见字符计算字符串大小
  def size(value), do: String.length(value)
end`,
    },
    check: {
      question: "protocol 主要根据哪个信息选择实现？",
      answer: "根据第一个参数的数据类型选择实现。",
    },
    takeaways: [
      "protocol 描述数据具备的能力。",
      "每种类型可以有自己的实现。",
      "调用端保持同一个函数入口。",
    ],
  },
  {
    number: "22",
    slug: "behaviours-and-callbacks",
    stage: "intermediate",
    title: "先约好模块会做什么",
    summary: "用 behaviour 和 callback 约定模块接口，再替换具体实现。",
    duration: "40 分钟",
    goal: "定义问候 behaviour，并写出中文实现。",
    plain: [
      "protocol 按数据类型选实现；behaviour 约束模块必须提供哪些函数。两者解决不同问题。",
      "`@callback` 写出函数名、参数和返回类型。实现模块用 `@behaviour` 声明自己遵守约定。",
      "behaviour 常用于可替换边界：存储、通知、支付。核心代码依赖约定，不依赖某一家实现。",
    ],
    concepts: [
      {
        term: "behaviour",
        explanation: "一组模块级函数约定。实现模块应提供全部 callback。",
      },
      {
        term: "callback",
        explanation: "behaviour 要求实现模块提供的函数签名。",
      },
    ],
    symbols: [
      { token: "@callback", reading: "声明必须实现的函数及类型。" },
      { token: "@behaviour Module", reading: "声明当前模块遵守某个 behaviour。" },
      { token: "module.function", reading: "通过传入模块调用可替换实现。" },
    ],
    example: {
      label: "约定一个问候接口",
      code: `defmodule Greeter do
  @callback hello(String.t()) :: String.t()
end

defmodule ChineseGreeter do
  @behaviour Greeter

  # 实现约定的 hello/1
  @impl true
  def hello(name), do: "你好，#{name}"
end

defmodule Welcome do
  def run(greeter, name), do: greeter.hello(name)
end

Welcome.run(ChineseGreeter, "小满")`,
      caption: "`Welcome` 只依赖会 `hello/1` 的模块。",
      output: ["得到 `\"你好，小满\"`。"],
    },
    steps: [
      "`Greeter` 定义合同，不负责具体语言。",
      "`ChineseGreeter` 实现合同，并用 `@impl true` 标清函数来源。",
      "调用者接收模块参数，因此可以换另一种实现。",
    ],
    practice: {
      task: "增加 `QuietGreeter`，始终返回 `\"你好\"`。",
      starter: `defmodule QuietGreeter do
  @behaviour ____
  @impl true
  def hello(_name), do: ____
end`,
      expected: "`Welcome.run(QuietGreeter, \"阿青\")` 得到 `\"你好\"`。",
      hint: "behaviour 是 `Greeter`，返回固定字符串。",
      answer: `defmodule QuietGreeter do
  @behaviour Greeter
  @impl true
  # 这个实现选择忽略名字
  def hello(_name), do: "你好"
end`,
    },
    check: {
      question: "behaviour 会自动替你写 callback 的正文吗？",
      answer: "不会。它只声明约定并帮助编译器检查；正文仍由实现模块完成。",
    },
    takeaways: [
      "behaviour 约束模块接口。",
      "callback 写清函数与返回类型。",
      "依赖约定能让边界实现更容易替换。",
    ],
  },
  {
    number: "23",
    slug: "typespecs-and-dialyzer",
    stage: "intermediate",
    title: "把数据形状写在门口",
    summary: "用 `@type` 与 `@spec` 记录约定，再让 Dialyzer 寻找矛盾。",
    duration: "40 分钟",
    goal: "为安全查分函数添加类型，并看懂一次静态分析流程。",
    plain: [
      "Elixir 仍是动态语言。typespec 不会在每次调用前拦住错误，但能让文档、编辑器和分析工具更懂代码。",
      "`@type` 给复杂数据起名，`@spec` 写函数输入与输出。它们应描述真实行为，不是愿望。",
      "Dialyzer 根据代码可能发生的事寻找“不可能同时成立”的类型约定。它不是完整证明，但很会发现可疑分支。",
    ],
    concepts: [
      {
        term: "typespec",
        explanation: "写给工具与读者看的类型说明，包括自定义类型和函数规格。",
      },
      {
        term: "Dialyzer",
        explanation: "分析 BEAM 代码类型矛盾的工具，常通过项目任务运行。",
      },
    ],
    symbols: [
      { token: "@type name :: ...", reading: "定义一个可复用的类型名。" },
      { token: "@spec fun(type) :: type", reading: "说明函数参数和返回值。" },
      { token: "term()", reading: "任意 Elixir/Erlang 值。" },
    ],
    example: {
      label: "为查分结果写类型",
      code: `defmodule Scores do
  @type student_id :: pos_integer()
  @type result :: {:ok, non_neg_integer()} | {:error, :not_found}

  # 规格与两个返回分支保持一致
  @spec fetch(%{student_id() => non_neg_integer()}, student_id()) :: result()
  def fetch(scores, id) do
    case Map.fetch(scores, id) do
      {:ok, score} -> {:ok, score}
      :error -> {:error, :not_found}
    end
  end
end

Scores.fetch(%{7 => 92}, 7)`,
      caption: "运行结果不因 typespec 改变；它增加的是可读约定与分析信息。",
      output: ["得到 `{:ok, 92}`。"],
    },
    steps: [
      "`student_id` 排除 0 与负数。",
      "`result` 明确列出成功和失败两种形状。",
      "项目可加入 `dialyxir` 后运行 `mix dialyzer`；依赖配置按工具当前文档操作。",
    ],
    practice: {
      task: "为 `double/1` 写出整数输入与整数输出的 spec。",
      starter: `@spec double(____) :: ____
def double(number), do: number * 2`,
      expected: "规格写成 `@spec double(integer()) :: integer()`。",
      hint: "输入与输出都使用 `integer()`。",
      answer: `# 规格如实描述函数接受和返回的值
@spec double(integer()) :: integer()
def double(number), do: number * 2`,
    },
    check: {
      question: "写了 `@spec` 后，Elixir 会拒绝所有类型不符的运行时调用吗？",
      answer: "不会。typespec 主要服务文档和静态分析；运行时仍由函数模式、guard 与代码处理输入。",
    },
    takeaways: [
      "类型说明必须与真实分支一致。",
      "`@type` 可给领域数据形状命名。",
      "Dialyzer 用来寻找类型约定中的矛盾。",
    ],
  },
  {
    number: "24",
    slug: "testing-workflows",
    stage: "intermediate",
    title: "测试不只看一条好路",
    summary: "用 `describe`、`setup` 和边界用例组织可读的 ExUnit 测试。",
    duration: "40 分钟",
    goal: "为折扣函数写正常、边界和错误输入三类测试。",
    plain: [
      "好测试像路标：名字说明行为，输入够小，失败时能看出哪里偏了。",
      "先测正常例子，再补边界和错误输入。`describe` 按功能分组，`setup` 只准备真正共用的数据。",
      "测试不要复制实现。若正文和测试用同一套算法，两个地方可能一起错。",
    ],
    concepts: [
      {
        term: "边界用例",
        explanation: "规则刚好发生变化的位置，如满 10 件、恰好 0 元。",
      },
      {
        term: "测试上下文",
        explanation: "`setup` 交给每个测试的一份准备数据。",
      },
    ],
    symbols: [
      { token: "describe", reading: "把同一功能的测试放在一组。" },
      { token: "setup", reading: "每个测试前准备共享数据。" },
      { token: "assert_raise", reading: "要求一段代码抛出指定异常。" },
    ],
    example: {
      label: "让边界写进测试名",
      code: `defmodule DiscountTest do
  use ExUnit.Case, async: true

  describe "price/2" do
    test "满 10 件打九折" do
      assert Discount.price(100, 10) == 90.0
    end

    # 9 件仍按原价
    test "未满 10 件不打折" do
      assert Discount.price(100, 9) == 100
    end
  end
end`,
      caption: "例子假设项目已有 `Discount.price/2`；重点看测试边界怎样表达。",
      output: ["实现符合规则时显示 `2 tests, 0 failures`。"],
    },
    steps: [
      "两个测试只差边界两侧的数量，容易读出业务规则。",
      "测试名说“什么情况下，结果怎样”，不说函数内部怎样写。",
      "失败后先读期望值和实际值，再定位实现。",
    ],
    practice: {
      task: "增加恰好 0 件的测试，期待原价。",
      starter: `test "零件商品不打折" do
  assert Discount.price(80, ____) == ____
end`,
      expected: "测试期待 `Discount.price(80, 0) == 80`。",
      hint: "数量为 0，价格仍写整数 80。",
      answer: `test "零件商品不打折" do
  # 零也是需要明确保存的边界
  assert Discount.price(80, 0) == 80
end`,
    },
    check: {
      question: "每个测试都需要 `setup` 吗？",
      answer: "不需要。只有多条测试确实共享准备步骤时才用；简单输入直接写在测试里更清楚。",
    },
    takeaways: [
      "测试名应说明行为。",
      "正常、边界、失败三类输入都要考虑。",
      "共享准备要少而明确。",
    ],
  },
  {
    number: "25",
    slug: "tooling-and-escripts",
    stage: "intermediate",
    title: "把项目磨成一个命令",
    summary: "用 Mix 格式化、检查、构建 escript，并从终端运行。",
    duration: "45 分钟",
    goal: "把一个 Mix 项目构建为可执行命令，接收名字并打印问候。",
    plain: [
      "项目写完函数还不算交付。别人需要一条稳定命令，也需要一致格式和能重复运行的检查。",
      "`mix format --check-formatted` 检查格式，`mix test` 检查行为。escript 把 BEAM 程序包装成终端可执行文件。",
      "escript 仍需要目标机器安装 Erlang 运行时。若要完全独立发布，要学习 release；此处先守住小项目边界。",
    ],
    concepts: [
      {
        term: "escript",
        explanation: "Erlang/Elixir 提供的脚本打包格式，可从终端作为一个文件运行。",
      },
      {
        term: "入口函数",
        explanation: "命令启动时首先调用的函数；escript 使用 `main/1`。",
      },
    ],
    symbols: [
      { token: "mix format", reading: "按项目规则格式化源码。" },
      { token: "mix escript.build", reading: "构建配置好的 escript。" },
      { token: "main(args)", reading: "接收终端参数 list 的入口。" },
    ],
    example: {
      label: "写一个最小命令入口",
      code: `defmodule HelloCli do
  # args 是终端传入的字符串 list
  def main([name]), do: IO.puts("你好，#{name}")
  def main(_), do: IO.puts("用法：hello_cli 名字")
end

# mix.exs 的 project/0 返回值中加入
escript: [main_module: HelloCli]`,
      caption: "配置后运行 `mix escript.build`，再执行 `./hello_cli 小满`。",
      output: ["终端打印 `你好，小满`。", "参数数量不对时打印用法。"],
    },
    steps: [
      "`main/1` 用函数子句区分正确参数与其他输入。",
      "`mix.exs` 告诉构建工具入口模块。",
      "交付前按顺序运行格式检查、测试和构建。",
    ],
    practice: {
      task: "把无参数提示改成 `\"请给一个名字\"`。",
      starter: `def main([]), do: IO.puts(____)`,
      expected: "无参数运行时打印 `请给一个名字`。",
      hint: "空处填写一个字符串。",
      answer: `# 空 list 表示没有终端参数
def main([]), do: IO.puts("请给一个名字")`,
    },
    check: {
      question: "escript 是否自带完整 Erlang 运行时？",
      answer: "不是。它打包应用代码，但目标机器仍需可用的 Erlang 运行时。",
    },
    takeaways: [
      "格式、测试、构建都应可重复。",
      "escript 的入口是 `main/1`。",
      "命令既要处理正确参数，也要给出清楚用法。",
    ],
  },
  {
    number: "26",
    slug: "project-brief",
    stage: "project",
    title: "定下小项目边界",
    summary: "为“行迹”文字统计命令写一页任务书，只做读文件与计数。",
    duration: "30 分钟",
    goal: "写清输入、输出、错误和验收例子，再创建 `trail_stats` 项目。",
    plain: [
      "项目先别急着堆功能。我们只做一件事：读取 UTF-8 文本文件，输出非空行数、词数和字符数。",
      "任务书应写出不做什么。本项目不处理目录、不改原文件、不做网页，也不启动进程系统。",
      "先定一个成功例子与两个失败例子。以后每个模块都为这些验收结果服务。",
    ],
    concepts: [
      {
        term: "项目边界",
        explanation: "这次明确要做与不做的范围，防止练习越长越散。",
      },
      {
        term: "验收例子",
        explanation: "从使用者角度写出的输入、命令与可观察结果。",
      },
    ],
    symbols: [
      { token: "mix new trail_stats", reading: "创建本阶段使用的项目。" },
      { token: "stdin / argv", reading: "本项目选择命令参数 argv，不从标准输入读取。" },
      { token: "exit status", reading: "命令成功或失败交给系统的数字状态。" },
    ],
    example: {
      label: "先写一份最小任务书",
      code: `# 输入：一个 UTF-8 文本文件路径
# 成功：打印 lines、words、chars 三行
# 失败：路径不存在或内容不是有效 UTF-8

mix new trail_stats
cd trail_stats
mix test`,
      caption: "任务书可写进 `README.md`；命令在系统终端运行。",
      output: ["项目创建成功，默认测试通过。"],
    },
    steps: [
      "用一句话描述用户要完成的事，不写实现术语。",
      "列出成功与失败边界，给每项一个可观察结果。",
      "创建项目后先跑原始测试，确认环境干净。",
    ],
    practice: {
      task: "补全本项目明确不做的两件事。",
      starter: `不做：
- 扫描整个 ____
- 修改输入 ____`,
      expected: "写出“不扫描整个目录、不修改输入文件”。",
      hint: "两个空分别是“目录”和“文件”。",
      answer: `不做：
- 扫描整个目录
- 修改输入文件`,
    },
    check: {
      question: "为什么在写代码前先列“不做什么”？",
      answer: "它守住练习范围，让每次决定都能回到同一个目标。",
    },
    takeaways: [
      "项目只解决一个清楚问题。",
      "先写可观察结果，再选实现。",
      "不做清单与功能清单同样重要。",
    ],
  },
  {
    number: "27",
    slug: "parse-real-input",
    stage: "project",
    title: "把真实文字洗干净",
    summary: "读 UTF-8 文件，统一换行，再把内容解析成可统计数据。",
    duration: "45 分钟",
    goal: "实现 `TrailStats.Parser.read/1`，成功返回清洗后的行 list。",
    plain: [
      "真实文件可能有空行，也可能使用不同换行符。先把输入整理成稳定形状，后续统计才简单。",
      "解析层负责从文件路径得到行 list。它不打印、不退出程序，也不计算最终统计。",
      "保留 File 的错误原因，另把非法 UTF-8 转为项目自己的 `:invalid_utf8`。",
    ],
    concepts: [
      {
        term: "解析层",
        explanation: "把外部原始数据变成项目内部约定的数据形状。",
      },
      {
        term: "规范化",
        explanation: "把多种等价输入整理成一种稳定形式，如统一换行。",
      },
    ],
    symbols: [
      { token: "String.valid?/1", reading: "检查 binary 是否是有效 UTF-8 字符串。" },
      { token: "String.split/3", reading: "按换行切开，并可去掉空项。" },
      { token: "{:error, reason}", reading: "把文件或编码错误交给上层。" },
    ],
    example: {
      label: "把文件变成非空行",
      code: `defmodule TrailStats.Parser do
  @spec read(Path.t()) :: {:ok, [String.t()]} | {:error, term()}
  def read(path) do
    with {:ok, text} <- File.read(path),
         true <- String.valid?(text) do
      # 同时接受 Unix 与 Windows 换行
      lines = String.split(text, ~r/\\R/u, trim: true)
      {:ok, lines}
    else
      false -> {:error, :invalid_utf8}
      {:error, reason} -> {:error, reason}
    end
  end
end`,
      caption: "把代码放进 `lib/trail_stats/parser.ex`，再用临时文件测试。",
      output: ["有效文件返回 `{:ok, lines}`；不存在文件保留 `{:error, :enoent}` 等系统原因。"],
    },
    steps: [
      "`File.read/1` 先建立文件边界。",
      "UTF-8 检查通过后才调用字符串函数。",
      "正则 `\\R` 接受常见换行，`trim: true` 去掉空行。",
    ],
    practice: {
      task: "为只有两行的临时文件写一个 Parser 测试。",
      starter: `path = Path.join(System.tmp_dir!(), "trail_stats_test.txt")
File.write!(path, "长安\\n春风\\n")

assert TrailStats.Parser.read(path) == ____`,
      expected: "期待 `{:ok, [\"长安\", \"春风\"]}`。",
      hint: "成功 tuple 的第二项是两行字符串 list。",
      answer: `path = Path.join(System.tmp_dir!(), "trail_stats_test.txt")
File.write!(path, "长安\n春风\n")

# Parser 只返回清洗后的行
assert TrailStats.Parser.read(path) == {:ok, ["长安", "春风"]}`,
    },
    check: {
      question: "Parser 为什么不在失败时直接 `IO.puts`？",
      answer: "打印属于命令边界。Parser 返回数据后，测试、网页或 CLI 都能选择自己的显示方式。",
    },
    takeaways: [
      "外部输入先验证，再解析。",
      "解析层返回数据，不负责显示。",
      "错误原因应能继续交给上层判断。",
    ],
  },
  {
    number: "28",
    slug: "design-module-api",
    stage: "project",
    title: "只开三扇门",
    summary: "设计小而稳的公开 API，把分词细节藏进私有函数。",
    duration: "45 分钟",
    goal: "实现 `TrailStats.count/1`，从行 list 得到固定统计 struct。",
    plain: [
      "模块对外开的门越多，未来越难改。项目只公开调用者真正需要的函数。",
      "统计模块接收已经清洗的行，不再读文件。字符、词、行的规则写在同一处。",
      "内部 helper 使用 `defp`。调用者看见稳定结果，不需要知道中间 list 怎样生成。",
    ],
    concepts: [
      {
        term: "公开 API",
        explanation: "模块外可以依赖的函数和数据形状。",
      },
      {
        term: "实现细节",
        explanation: "模块内部可修改而不影响调用者的步骤，通常放在私有函数。",
      },
    ],
    symbols: [
      { token: "def", reading: "定义公开函数。" },
      { token: "defp", reading: "定义只供当前模块使用的私有函数。" },
      { token: "%Stats{}", reading: "返回固定字段的统计结果。" },
    ],
    example: {
      label: "让公开入口只接收行",
      code: `defmodule TrailStats.Stats do
  @enforce_keys [:lines, :words, :chars]
  defstruct [:lines, :words, :chars]
end

defmodule TrailStats do
  alias TrailStats.Stats

  # 对外只公开 count/1
  def count(lines) do
    %Stats{
      lines: length(lines),
      words: Enum.reduce(lines, 0, &(&2 + word_count(&1))),
      chars: lines |> Enum.join() |> String.length()
    }
  end

  defp word_count(line), do: line |> String.split() |> length()
end`,
      caption: "本项目约定空白分隔词，字符数不包含换行。",
      output: ["`TrailStats.count([\"长安 春风\", \"又一程\"])` 返回行 2、词 3、字符 8 的 struct。"],
    },
    steps: [
      "struct 固定三项输出，避免 map 键随手变化。",
      "`count/1` 只接内部数据，不关心路径。",
      "分词规则藏在 `word_count/1`，以后可单独替换。",
    ],
    practice: {
      task: "补全空输入测试。",
      starter: `assert TrailStats.count([]) == %TrailStats.Stats{
  lines: ____,
  words: ____,
  chars: ____
}`,
      expected: "三项都为 0。",
      hint: "空输入没有行、词和字符。",
      answer: `# 空输入是公开 API 的重要边界
assert TrailStats.count([]) == %TrailStats.Stats{
  lines: 0,
  words: 0,
  chars: 0
}`,
    },
    check: {
      question: "为什么 `word_count/1` 使用 `defp`？",
      answer: "它只是 `count/1` 的实现细节，调用者不需要依赖它。",
    },
    takeaways: [
      "公开 API 要小而明确。",
      "模块之间传稳定数据，不传隐含状态。",
      "实现细节用私有函数收好。",
    ],
  },
  {
    number: "29",
    slug: "types-docs-and-tests",
    stage: "project",
    title: "把约定钉在代码旁",
    summary: "为项目补齐文档、typespec 与跨模块测试。",
    duration: "50 分钟",
    goal: "让 Parser、Stats 和公开入口都有文档与类型，并覆盖成功和失败路径。",
    plain: [
      "项目走到这里，代码会运行，但约定还散在脑中。文档、类型与测试把它们留给明天的自己。",
      "`@moduledoc` 说明模块责任，`@doc` 说明公开函数，`@spec` 说明输入输出。三者不要重复实现细节。",
      "单元测试看一个模块；集成测试从临时文件走到统计结果。两层各守一段路。",
    ],
    concepts: [
      {
        term: "集成测试",
        explanation: "让多个模块一起工作，检查边界衔接是否正确。",
      },
      {
        term: "文档示例",
        explanation: "放在函数文档中的简短调用与结果，可由 doctest 自动验证。",
      },
    ],
    symbols: [
      { token: "@moduledoc", reading: "说明模块做什么和不做什么。" },
      { token: "@doc", reading: "说明公开函数约定。" },
      { token: "doctest Module", reading: "运行文档里的 IEx 示例。" },
    ],
    example: {
      label: "为公开入口留一份可运行说明",
      code: `defmodule TrailStats.Stats do
  @type t :: %__MODULE__{
          lines: non_neg_integer(),
          words: non_neg_integer(),
          chars: non_neg_integer()
        }
  defstruct [:lines, :words, :chars]
end

defmodule TrailStats do
  alias TrailStats.Stats
  @moduledoc "统计已经清洗的 UTF-8 文本行。"

  @doc """
  返回行、词和字符统计。

      iex> TrailStats.count(["长安 春风"]).words
      2
  """
  # 类型要与真实 struct 返回值一致
  @spec count([String.t()]) :: Stats.t()
  def count(lines) do
    %Stats{
      lines: length(lines),
      words: Enum.sum(for line <- lines, do: length(String.split(line))),
      chars: lines |> Enum.join() |> String.length()
    }
  end
end`,
      caption: "完整例子同时声明 struct 类型、公开函数与可运行文档。",
      output: ["加入 `doctest TrailStats` 后，`mix test` 会验证示例结果 2。"],
    },
    steps: [
      "为 `Stats` 增加 `@type t :: %__MODULE__{...}`。",
      "为所有公开函数写 spec，不给私有细节堆无用文案。",
      "用临时文件测试 Parser 与 count 的完整成功路径。",
    ],
    practice: {
      task: "为 `Stats` 写出三项非负整数类型。",
      starter: `@type t :: %__MODULE__{
  lines: ____,
  words: ____,
  chars: ____
}`,
      expected: "三个字段都写 `non_neg_integer()`。",
      hint: "计数不会是负数。",
      answer: `@type t :: %__MODULE__{
  # 三项都是从零开始的计数
  lines: non_neg_integer(),
  words: non_neg_integer(),
  chars: non_neg_integer()
}`,
    },
    check: {
      question: "文档是否应该逐行复述函数实现？",
      answer: "不该。文档重点是责任、输入输出和重要边界；实现可直接读源码。",
    },
    takeaways: [
      "文档讲约定，不抄实现。",
      "类型与测试应覆盖真实返回分支。",
      "集成测试检查模块衔接。",
    ],
  },
  {
    number: "30",
    slug: "package-and-observe",
    stage: "project",
    title: "打包，也留下脚印",
    summary: "把命令构建成 escript，用 Logger 记录失败原因与耗时。",
    duration: "50 分钟",
    goal: "实现 CLI 入口，构建 `trail_stats`，成功输出统计，失败以非零状态退出。",
    plain: [
      "命令行输出给使用者看，日志给维护者查问题。两者不要混成一锅。",
      "成功时打印稳定三行；失败时向标准错误写一句短话，并由最外层返回非零退出状态。",
      "Logger 记录路径、失败类别和耗时，不记录完整文件内容。可观察不等于把用户数据全抄进日志。",
    ],
    concepts: [
      {
        term: "可观察性",
        explanation: "通过日志、指标等外部信号理解程序运行了什么、在哪里失败。",
      },
      {
        term: "退出状态",
        explanation: "命令交给操作系统的结果数字；0 通常表示成功，非 0 表示失败。",
      },
    ],
    symbols: [
      { token: "Logger.info/error", reading: "写不同级别的结构化运行线索。" },
      { token: "System.halt/1", reading: "只在 CLI 最外层用指定状态结束 BEAM。" },
      { token: ":timer.tc/1", reading: "测量函数运行微秒数并返回结果。" },
    ],
    example: {
      label: "让 CLI 只负责边界",
      code: `defmodule TrailStats.CLI do
  require Logger

  def main(args) do
    case run(args) do
      :ok -> :ok
      {:error, _reason} -> System.halt(1)
    end
  end

  # 测试调用 run/1；只有打包入口 main/1 决定退出状态
  def run([path]) do
    {micros, result} = :timer.tc(fn -> TrailStats.Parser.read(path) end)
    Logger.info("read path=#{inspect(path)} duration_us=#{micros}")

    # CLI 把内部数据翻译成终端文字
    case result do
      {:ok, lines} -> print(TrailStats.count(lines))
      {:error, reason} -> fail(reason)
    end
  end

  def run(_args), do: fail(:usage)

  defp print(stats) do
    IO.puts("lines=#{stats.lines}")
    IO.puts("words=#{stats.words}")
    IO.puts("chars=#{stats.chars}")
    :ok
  end

  defp fail(reason) do
    Logger.error("read_failed reason=#{inspect(reason)}")
    IO.puts(:stderr, "无法读取输入文件")
    {:error, reason}
  end
end`,
      caption: "`print/1` 与 `fail/1` 留在 CLI 边界；`mix.exs` 配置 `main_module: TrailStats.CLI`。",
      output: ["成功打印 `lines=...`、`words=...`、`chars=...`；打包命令失败时写入标准错误并以状态 1 退出。"],
    },
    steps: [
      "计时包住文件读取，结果和耗时一起返回。",
      "CLI 调用 Parser 与统计 API，不复制两者逻辑。",
      "日志只放定位所需信息，避开文件正文。",
    ],
    practice: {
      task: "补全构建前的三条检查命令。",
      starter: `mix format ____
mix ____
mix escript.____`,
      expected: "依次运行格式检查、测试、escript 构建。",
      hint: "填写 `--check-formatted`、`test`、`build`。",
      answer: `# 先检查，再构建
mix format --check-formatted
mix test
mix escript.build`,
    },
    check: {
      question: "为什么日志里不记录读取到的完整文件内容？",
      answer: "正文可能很大或含隐私；路径、原因和耗时通常已足够定位问题。",
    },
    takeaways: [
      "CLI 只处理输入输出边界。",
      "日志记录必要线索，不泄露正文。",
      "格式、测试通过后再构建。",
    ],
  },
  {
    number: "31",
    slug: "project-acceptance",
    stage: "project",
    title: "照任务书交卷",
    summary: "从干净环境跑完验收表，确认功能、错误与交付说明。",
    duration: "45 分钟",
    goal: "让成功、空文件、缺失文件和格式检查全部得到预期结果。",
    plain: [
      "最后一课不再添功能。把第 26 课的任务书拿回来，一项一项验证。",
      "验收从使用者入口运行，不绕过 CLI 偷看内部函数。失败消息要短，退出状态要对。",
      "记录版本、构建命令和已知限制。一个范围清楚的小项目，比半截宏图更值得保存。",
    ],
    concepts: [
      {
        term: "验收",
        explanation: "按事先写好的外部标准判断项目是否完成。",
      },
      {
        term: "已知限制",
        explanation: "当前版本有意不处理的范围，写清后不让使用者误解。",
      },
    ],
    symbols: [
      { token: "$?", reading: "多数 shell 中读取上一条命令的退出状态。" },
      { token: "mix test", reading: "运行自动测试，防止验收修改引入回归。" },
      { token: "--check-formatted", reading: "只检查格式，不改文件。" },
    ],
    example: {
      label: "运行最终验收表",
      code: `# 1. 自动检查
mix format --check-formatted
mix test
mix escript.build

# 2. 成功文件：核对三项统计
./trail_stats fixtures/poem.txt

# 3. 缺失文件：核对错误文字与非零状态
./trail_stats fixtures/missing.txt
echo $?`,
      caption: "再补一个空文件用例；每项结果写进 README 的验收记录。",
      output: ["检查与测试全通过。", "成功文件输出三项数字。", "缺失文件显示短错误，退出状态不是 0。"],
    },
    steps: [
      "从全新终端按 README 命令构建，避免依赖记忆中的隐藏步骤。",
      "逐条保存实际输出，与第 26 课预期对照。",
      "只修验收失败，不在交卷前临时增加需求。",
    ],
    practice: {
      task: "写出空文件的验收结果。",
      starter: `给定：一个空 UTF-8 文件
运行：./trail_stats empty.txt
期待：lines=____, words=____, chars=____`,
      expected: "三项都为 0，命令成功退出。",
      hint: "空文件没有行、词和字符。",
      answer: `给定：一个空 UTF-8 文件
运行：./trail_stats empty.txt
期待：lines=0, words=0, chars=0，退出状态为 0`,
    },
    check: {
      question: "验收时发现一个很酷的新功能想法，要立刻加吗？",
      answer: "先记进后续清单。当前只修任务书内的失败，保持交付范围稳定。",
    },
    takeaways: [
      "验收标准应在编码前写下。",
      "从用户入口检查成功与失败。",
      "完成一个小闭环，再开下一段路。",
    ],
  },
];

const erlangLessons: BasicLesson[] = [
  {
    number: "01",
    slug: "meet-erl",
    stage: "scratch",
    title: "先打开 erl",
    summary: "在 Erlang shell 里运行表达式，记住句末的点。",
    duration: "15 分钟",
    goal: "本课先打开 erl，逐行运行加法、字符串函数和打印函数；依次看到 `5`、`\"CAT\"` 和 `ok` 就算完成。",
    plain: [
      "`erl` 会打开 Erlang shell。它和 IEx 一样，适合马上试一小段代码。",
      "Erlang shell 要等到句点 `.` 才知道一句代码结束。忘记句点时，它会继续等，而不是立即运行。",
      "shell 前面的 `1>`、`2>` 是提示符和输入序号，不是你要复制的代码。",
    ],
    concepts: [
      {
        term: "erl",
        explanation: "启动 Erlang shell 的终端命令。",
      },
      {
        term: "表达式",
        explanation: "运行后会得到一个值的代码，如 `2 + 3`。",
      },
      {
        term: "句点",
        explanation: "Erlang 中一条完整 shell 输入或函数定义用 `.` 结束。",
      },
    ],
    symbols: [
      { token: "erl", reading: "在终端输入它，打开 Erlang shell。" },
      { token: "1>", reading: "shell 提示符。只输入它后面的代码。" },
      { token: ".", reading: "告诉 shell：这句写完了，可以运行。" },
    ],
    example: {
      label: "复制到 erl，逐行回车",
      code: `%% 加法表达式返回一个数字
2 + 3.

%% 调用 string 模块，把文字变成大写
string:uppercase("cat").

%% 调用 io 模块，把文字打印出来
io:format("hello, BEAM~n", []).`,
      caption: "注意每段可运行代码最后都有句点。",
      output: ["`2 + 3.` 返回 `5`。", "`string:uppercase(\"cat\").` 返回 `\"CAT\"`。", "`io:format(...)` 打印一行文字，再显示 `ok`；先把它当作“做完了”标签。"],
    },
    steps: [
      "`2 + 3.` 中，最后的点不是小数点，它结束这条输入。",
      "`string:uppercase(\"cat\").` 调用 `string` 模块中的 `uppercase` 函数。",
      "`~n` 表示换行；空 list `[]` 表示这次没有额外值要填进格式字符串。",
    ],
    practice: {
      task: "让 shell 算出 8 乘 7，再把 `beam` 变成大写。",
      starter: `%% 补上运算符，也别忘了句点
8 ? 7.

%% 补上函数名
string:____("beam").`,
      expected: "先看到 `56`，再看到 `\"BEAM\"`。",
      hint: "乘法用 `*`。示例中的函数名是 `uppercase`。",
      answer: `%% 星号表示乘法
8 * 7.

%% 每次输入都以句点结束
string:uppercase("beam").`,
    },
    check: {
      question: "输入 `2 + 3` 后 shell 还在等待，最可能少了什么？",
      answer: "少了句末的点。补上 `.` 再按回车。",
    },
    takeaways: [
      "`erl` 打开 Erlang shell。",
      "shell 适合试很短的 Erlang 表达式。",
      "完整输入以句点结束。",
    ],
  },
  {
    number: "02",
    slug: "terms-and-types",
    stage: "scratch",
    title: "先认常见 term",
    summary: "认识 number、atom、tuple、list 和 map。",
    duration: "25 分钟",
    goal: "本课先在 erl 运行数字与 atom 类型检查，再运行 tuple 和 map；看到两次 `{true, true}` 以及完整集合就算完成。",
    plain: [
      "Erlang 把运行时的数据统称为 term。数字、atom、tuple、list、map 都是 term。",
      "小写开头的单词通常是 atom，如 `ok`、`rain`。`true` 和 `false` 在 Erlang 里也是 atom。",
      "Erlang 没有一个语言内建的 `nil`。项目可以约定用 `undefined`、`none` 或别的 atom 表示缺失，但要写清约定。",
    ],
    concepts: [
      {
        term: "term",
        explanation: "Erlang 对运行时数据的总称。不同 term 有不同形状和用途。",
      },
      {
        term: "atom",
        explanation: "一个标签，常写成小写单词，如 `ok`。它的名字就是它的值。",
      },
      {
        term: "tuple",
        explanation: "花括号里的固定组合，如 `{ok, 42}`。",
      },
    ],
    symbols: [
      { token: "ok", reading: "小写开头，是一个 atom 标签。" },
      { token: "{ok, 42}", reading: "两个元素的 tuple，常用第一个 atom 标明结果类别。" },
      { token: "#{status => ready}", reading: "map；`=>` 把 key 和 value 连起来。" },
    ],
    example: {
      label: "在 erl 里查看 term",
      code: `%% 检查数字与 atom
{is_integer(12), is_float(12.5)}.
{is_atom(true), is_atom(ok)}.

%% tuple 常把标签和数据放在一起
{ok, 42}.

%% map 用 key 标明值的意思
#{status => ready, score => 92}.`,
      caption: "先观察外形，再用 `is_*` 函数核对。",
      output: [
        "前两行都得到 `{true, true}`。",
        "第三行显示 tuple `{ok, 42}`。",
        "最后显示一个有 `status` 和 `score` 两个 key 的 map。",
      ],
    },
    steps: [
      "`is_integer(12)` 和 `is_float(12.5)` 各检查一个值，返回真假。",
      "`true` 是表示“真”的 atom；它仍然属于 atom 类型。",
      "`#{...}` 创建 map。这里 `status`、`ready` 和 `score` 都是数量有限的标签。",
    ],
    practice: {
      task: "补出一个天气 map：天气用 atom，温度用整数。",
      starter: `%% key 写 weather 和 temperature
#{____ => cloudy, ____ => 28}.`,
      expected: "得到 `#{weather => cloudy, temperature => 28}`。",
      hint: "两个空依次填 atom `weather` 和 `temperature`。",
      answer: `%% atom key 说明两个值各自是什么
#{weather => cloudy, temperature => 28}.`,
    },
    check: {
      question: "Erlang 里的 `true` 是一种独立类型吗？",
      answer: "不是。`true` 是 atom，只是大家约定用它表示真。",
    },
    takeaways: [
      "Erlang 运行时数据统称为 term。",
      "atom 适合做数量有限的标签，如 `ok`、`ready`、`cloudy`。",
      "tuple 和 map 都能装多个值，但 map 会给字段起名。",
    ],
  },
  {
    number: "03",
    slug: "text-and-binaries",
    stage: "scratch",
    title: "分清两种文字",
    summary: "看懂 charlist、binary，以及中文的 UTF-8 写法。",
    duration: "25 分钟",
    goal: "本课先比较 charlist、检查 binary，再计算中文 binary 的字节数；依次看到 `true`、`true` 和 `6` 就算完成。",
    plain: [
      "Erlang 没有单独的 string 类型。双引号写出的 `\"cat\"` 默认是字符编号组成的 list，也叫 charlist。",
      "`<<\"cat\">>` 是 binary。许多网络协议、文件和现代 Erlang 接口使用 binary 保存文字。",
      "中文字符放进 binary 时写 `/utf8`，如 `<<\"白鹭\"/utf8>>`。这句话明确告诉 Erlang 怎样编码。",
    ],
    concepts: [
      {
        term: "charlist",
        explanation: "字符编号组成的 list。`\"cat\"` 与 `[99, 97, 116]` 是同一个值。",
      },
      {
        term: "binary",
        explanation: "一段连续字节，写成 `<<...>>`。常用于文本、文件和网络数据。",
      },
      {
        term: "UTF-8",
        explanation: "把中文等 Unicode 文字变成字节的一种编码规则。",
      },
    ],
    symbols: [
      { token: "\"cat\"", reading: "默认是 charlist，也就是整数 list。" },
      { token: "<<\"cat\">>", reading: "尖括号包住的是 binary。" },
      { token: "/utf8", reading: "按 UTF-8 把前面的文字写入 binary。" },
      { token: "=:=", reading: "严格比较左右两个值是否相同。" },
    ],
    example: {
      label: "同样看着像文字，底层形状不同",
      code: `%% 双引号默认产生 charlist
"cat" =:= [99, 97, 116].

%% 双尖括号产生 binary
is_binary(<<"cat">>).

%% 中文 binary 明确写出 utf8
byte_size(<<"白鹭"/utf8>>).`,
      caption: "这里用 `=:=` 做严格相等比较。",
      output: [
        "charlist 比较得到 `true`。",
        "`is_binary(<<\"cat\">>)` 得到 `true`。",
        "`byte_size(<<\"白鹭\"/utf8>>)` 得到 `6`：这是 6 个字节，不是 2 个汉字。",
      ],
    },
    steps: [
      "`\"cat\"` 在 shell 里显示成文字，但它等于整数 list `[99, 97, 116]`。",
      "`<<\"cat\">>` 是 binary，不等于 charlist `\"cat\"`。",
      "`byte_size(<<\"白鹭\"/utf8>>)` 数字节。这里两个汉字共占 6 个 UTF-8 字节。",
    ],
    practice: {
      task: "把“长安”写成 binary，再用 `is_binary(...)` 检查。",
      starter: `%% 把中文 binary 直接交给检查函数
is_binary(<<____/utf8>>).`,
      expected: "得到 `true`。",
      hint: "空里仍用双引号写文字。",
      answer: `%% /utf8 明确指定中文编码
is_binary(<<"长安"/utf8>>).`,
    },
    check: {
      question: "`\"cat\"` 和 `<<\"cat\">>` 是同一个值吗？",
      answer: "不是。前者默认是 charlist，后者是 binary。它们能表示相似文字，但数据类型不同。",
    },
    takeaways: [
      "Erlang 没有独立的 string 类型。",
      "双引号默认得到 charlist，`<<>>` 得到 binary。",
      "中文 binary 要明确写 `/utf8`。",
    ],
  },
  {
    number: "04",
    slug: "variables-and-matching",
    stage: "scratch",
    title: "变量只接一次",
    summary: "认识大写变量、单次赋值和模式匹配。",
    duration: "25 分钟",
    goal: "本课先清掉 shell 旧绑定，再从 tuple 和 map 各拆一个值；最后得到 `{92, <<\"A-Qing\">>}` 就算完成。",
    plain: [
      "Erlang 变量必须以大写字母或下划线开头。`Score` 是变量，`score` 是 atom。",
      "变量在一次匹配中接住值后，不能再改绑到另一个值。这叫单次赋值。",
      "`=` 是匹配运算符。左边写形状，右边给数据；形状对不上时会出现 `badmatch`。",
    ],
    concepts: [
      {
        term: "变量",
        explanation: "以大写字母或下划线开头的名字，如 `Name`、`_Rest`。",
      },
      {
        term: "单次赋值",
        explanation: "一个变量接住值后，在当前作用域中不能改成另一个值。",
      },
      {
        term: "匹配",
        explanation: "检查左右形状，并让新变量接住对应位置的值。",
      },
    ],
    symbols: [
      { token: "Name", reading: "大写开头，是变量。" },
      { token: "name", reading: "小写开头，是 atom。" },
      { token: "_", reading: "匹配这个位置，但不保存它的值。" },
      { token: "f().", reading: "只在 Erlang shell 使用：清掉当前 shell 里已有的变量绑定。" },
    ],
    example: {
      label: "左边是形状，右边是数据",
      code: `%% 先清掉 shell 中已有的变量绑定
f().

%% 标签 ok 必须对上，Score 接住 92
{ok, Score} = {ok, 92}.

%% map 模式取值，再核对已绑定变量
#{name := Name} = #{name => <<"A-Qing">>, age => 12}.
92 = Score.
{Score, Name}.`,
      caption: "map 的创建使用 `=>`，模式匹配已有 key 时使用 `:=`。",
      output: ["`Score` 绑定到 `92`。", "`Name` 绑定到 `<<\"A-Qing\">>`。", "最后得到 `{92, <<\"A-Qing\">>}`。"],
    },
    steps: [
      "`{ok, Score}` 要求右边是两个元素的 tuple，而且第一个必须是 atom `ok`。",
      "`#{name := Name}` 是 map 模式。它寻找已有 key `name`，让 `Name` 接住对应值。",
      "`92 = Score` 能成功，因为 `Score` 已经是 92；写 `93 = Score` 会 `badmatch`。",
    ],
    practice: {
      task: "从 `{weather, <<\"Xi'an\">>, 28}` 中拆出城市和温度。",
      starter: `%% 清掉示例和前几课留下的变量
f().

%% 固定标签必须对上，变量用大写开头
{____, ____, ____} = {weather, <<"Xi'an">>, 28}.

%% 查看拆出的值
{City, Temperature}.`,
      expected: "得到 `{<<\"Xi'an\">>, 28}`。",
      hint: "左边依次写 atom `weather`、变量 `City`、变量 `Temperature`。",
      answer: `%% f() 只属于 shell，不要写进 .erl 文件
f().

%% atom 核对标签，变量接住数据
{weather, City, Temperature} = {weather, <<"Xi'an">>, 28}.

%% 变量已经分别绑定
{City, Temperature}.`,
    },
    check: {
      question: "已经执行 `Count = 3.` 后，再执行 `Count = 4.` 会怎样？",
      answer: "会出现 `badmatch`。`Count` 已绑定到 3，不能再接住不同的值 4。",
    },
    takeaways: [
      "大写开头是变量，小写开头通常是 atom。",
      "Erlang 变量一旦绑定就不能改值。",
      "`=` 会进行模式匹配。",
    ],
  },
  {
    number: "05",
    slug: "lists-and-patterns",
    stage: "scratch",
    title: "拆开一列，再筛一次",
    summary: "先用头尾模式拆 list，再用 list comprehension 筛出需要的值。",
    duration: "25 分钟",
    goal: "本课先拆开 `[92, 58, 76]`，再用 list comprehension 筛出及格分数；最后看到 `{92, [58, 76], [100, 58, 76], [92, 76]}` 就算完成。",
    plain: [
      "list 是一串有顺序的值。`[peach, plum, apricot]` 的第一个元素是头，剩余 `[plum, apricot]` 是尾。",
      "Erlang 写成 `[Head | Tail]`。竖线不是“或者”，它把 list 的头与尾分开。",
      "空 list `[]` 没有头。用 `[Head | Tail]` 匹配空 list 会失败。",
      "list comprehension 写成 `[结果 || 值 <- list, 条件]`。`<-` 依次取值，条件留下需要的项，整个表达式返回新 list。",
    ],
    concepts: [
      {
        term: "Head",
        explanation: "非空 list 的第一个元素。",
      },
      {
        term: "Tail",
        explanation: "去掉第一个元素后剩下的 list；它自己仍是 list。",
      },
      {
        term: "空 list",
        explanation: "`[]`，里面没有元素，也是递归处理 list 时的停止位置。",
      },
      {
        term: "list comprehension",
        explanation: "从 list 依次取值，可以筛选或计算，再把结果收集成新 list。",
      },
    ],
    symbols: [
      { token: "[ ]", reading: "包住 list。" },
      { token: "|", reading: "在 list 模式中分开头和尾。" },
      { token: "[New | Old]", reading: "把一个新元素放到已有 list 的最前面。" },
      { token: "||", reading: "左边写要收集的结果，右边写取值和筛选规则。" },
      { token: "<-", reading: "从右边 list 依次取一个值，交给左边变量。" },
    ],
    example: {
      label: "先拆 list，再筛出及格分数",
      code: `%% 清掉旧绑定，再放入原始分数
f().
Scores = [92, 58, 76].

%% 拆出第一个分数，并在 Tail 前放入新值
[First | Rest] = Scores.
NewScores = [100 | Rest].

%% comprehension 依次取值，只收集及格分数
Passed = [Score || Score <- Scores, Score >= 60].

{First, Rest, NewScores, Passed}.`,
      caption: "模式里的 `|` 拆 list；comprehension 里的 `||` 分开结果与取值规则。",
      output: ["`First` 是 `92`，`Rest` 是 `[58, 76]`。", "`NewScores` 是 `[100, 58, 76]`，原来的 `Scores` 没有改变。", "`Passed` 是 `[92, 76]`。"],
    },
    steps: [
      "`[First | Rest] = Scores` 只适用于非空 list；`Rest` 是除第一个值外的整个 list。",
      "`[100 | Rest]` 创建新 list，没有修改 `Rest` 或 `Scores`。",
      "`Score <- Scores` 从左到右取出每个分数，当前值暂时叫 `Score`。",
      "逗号后的 `Score >= 60` 是筛选条件；只有条件为 `true` 的值才进入 `Passed`。",
    ],
    practice: {
      task: "拆开 `[61, 49, 88]`，再亲手写 comprehension，只留下大于等于 60 的分数。",
      starter: `f().
Scores = [61, 49, 88].

%% 先补出头尾模式
[____ | ____] = Scores.

%% 再补出取值符号和及格线
Passed = [Score ____ Score ____ Scores, Score >= ____].

{First, Rest, Passed}.`,
      expected: "得到 `{61, [49, 88], [61, 88]}`。",
      hint: "头尾变量是 `First`、`Rest`；comprehension 的三个空是 `||`、`<-` 和 `60`。",
      answer: `f().
Scores = [61, 49, 88].

%% 头尾模式拆开非空 list
[First | Rest] = Scores.

%% comprehension 返回新的及格分数 list
Passed = [Score || Score <- Scores, Score >= 60].

{First, Rest, Passed}.`,
    },
    check: {
      question: "`Passed = [Score || Score <- Scores, Score >= 60]` 会修改 `Scores` 吗？",
      answer: "不会。comprehension 返回一个新 list；原来的 `Scores` 仍保持不变。",
    },
    takeaways: [
      "`[Head | Tail]` 拆开非空 list。",
      "`Tail` 是剩余 list，不只是最后一个值。",
      "`||` 和 `<-` 组成 list comprehension，并返回新 list。",
    ],
  },
  {
    number: "06",
    slug: "functions-and-arity",
    stage: "scratch",
    title: "把文字安全变成整数",
    summary: "用 trim、匿名函数和 try/catch 处理合法与错误输入。",
    duration: "30 分钟",
    goal: "本课先写一个完整匿名函数：把 `<<\" 42 \">>` 变成 `{ok, 42}`，把 `<<\"river\">>` 变成 `{error, not_integer}`；两个结果都出现就算完成。",
    plain: [
      "函数接收输入，返回输出。`string:trim(<<\" 42 \">>)` 先去掉 binary 两端空白，得到 `<<\"42\">>`。",
      "文档里的 `string:trim/1` 表示：`string` 模块、`trim` 函数、1 个参数。`/1` 叫 arity，不是除法，也不是一条能直接粘进 shell 的调用。",
      "`binary_to_integer/1` 把数字 binary 变成整数；遇到 `<<\"river\">>` 这类输入时会抛出 `error:badarg`。",
      "完整匿名函数用 `fun ... end` 包住流程。`try ... of ... catch ... end` 接住预期中的 `error:badarg`，返回清楚的错误 tuple。",
    ],
    concepts: [
      {
        term: "arity",
        explanation: "函数接收的参数个数。`string:trim/1` 和 `binary_to_integer/1` 都接收 1 个参数。",
      },
      {
        term: "匿名函数",
        explanation: "用 `fun ... end` 创建的函数。这里把完整解析流程交给变量 `ParseInteger`。",
      },
      {
        term: "error:badarg",
        explanation: "参数形状不合要求时发出的异常。非数字 binary 交给 `binary_to_integer/1` 会触发它。",
      },
      {
        term: "try/catch",
        explanation: "先尝试一段代码，再按异常类别和原因返回可处理的结果。",
      },
    ],
    symbols: [
      { token: "string:trim/1", reading: "`string` 模块、`trim` 函数、1 个参数。这是文档里的写法，不能直接运行。" },
      { token: "string:trim(Text)", reading: "把变量 `Text` 交给函数。这是在调用。" },
      { token: "binary_to_integer/1", reading: "把只含整数的 binary 转成整数；格式不对时抛出 `error:badarg`。" },
      { token: "fun(Text) -> ... end", reading: "创建一个接收 `Text` 的完整匿名函数。" },
      { token: "try ... of ... catch ... end", reading: "尝试转换；正常结果走 `of`，指定异常走 `catch`。" },
    ],
    example: {
      label: "一个函数同时处理正确与错误输入",
      code: `%% 清掉旧绑定，再定义完整解析函数
f().
ParseInteger =
  fun(Text) ->
    Clean = string:trim(Text),
    try binary_to_integer(Clean) of
      Number -> {ok, Number}
    catch
      error:badarg -> {error, not_integer}
    end
  end.

%% 合法 binary 会得到整数
Good = ParseInteger(<<" 42 ">>).

%% 错误 binary 会得到可处理的错误 tuple
Bad = ParseInteger(<<"river">>).

{Good, Bad}.`,
      caption: "先运行合法输入，再运行错误输入；两次都由同一个匿名函数给出结果。",
      output: ["`Good` 是 `{ok, 42}`。", "`Bad` 是 `{error, not_integer}`。", "`error:badarg` 被 `catch` 接住，因此第二次调用也正常返回。"],
    },
    steps: [
      "`ParseInteger = fun(Text) -> ... end` 创建完整匿名函数；调用时直接写 `ParseInteger(Binary)`。",
      "文档用 `string:trim/1` 说明函数名和参数个数；`string:trim(Text)` 才是真正调用。它先去掉两端空白。",
      "`binary_to_integer(Clean)` 尝试转换；正常时 `of` 中的 `Number` 接住整数，并返回 `{ok, Number}`。",
      "错误 binary 会让转换函数抛出 `error:badarg`；`catch` 精确匹配它，再返回 `{error, not_integer}`。",
      "成功和失败都返回 tuple，后面的代码可以继续模式匹配。",
    ],
    practice: {
      task: "补完 `ParseAge`：`<<\" 12 \">>` 返回 `{ok, 12}`，`<<\"unknown\">>` 返回 `{error, not_integer}`。",
      starter: `f().
ParseAge =
  fun(Text) ->
    Clean = string:____(Text),
    try ____(Clean) of
      Number -> {ok, Number}
    catch
      error:____ -> {error, not_integer}
    end
  end.

{ParseAge(<<" 12 ">>), ParseAge(<<"unknown">>)}.`,
      expected: "得到 `{{ok, 12}, {error, not_integer}}`。",
      hint: "三个空依次是 `trim`、`binary_to_integer` 和 `badarg`。",
      answer: `%% 清理文字，再尝试转换
f().
ParseAge =
  fun(Text) ->
    Clean = string:trim(Text),
    try binary_to_integer(Clean) of
      Number -> {ok, Number}
    catch
      error:badarg -> {error, not_integer}
    end
  end.

{ParseAge(<<" 12 ">>), ParseAge(<<"unknown">>)}.`,
    },
    check: {
      question: "为什么 `ParseInteger(<<\"river\">>)` 没有让整段代码停下来？",
      answer: "`binary_to_integer/1` 抛出的 `error:badarg` 被 `catch` 接住，并转换成了 `{error, not_integer}`。",
    },
    takeaways: [
      "文档用 `模块:函数/参数个数` 写清函数；真正调用时把参数写进括号。",
      "完整匿名函数可以把清理、转换和错误处理收成一个步骤。",
      "`try/catch` 只接住预期异常，并把失败变成清楚的返回值。",
    ],
  },
  {
    number: "07",
    slug: "clauses-and-guards",
    stage: "scratch",
    title: "用 case 选一条路",
    summary: "让一个值依次匹配分支，再用 guard 补充条件。",
    duration: "30 分钟",
    goal: "本课先让同一段 `case` 分别处理 76、95 和 40；三次依次得到 `pass`、`very_good` 和 `try_again` 就算完成。",
    plain: [
      "`case` 先取得一个值，再从上到下寻找第一个匹配分支。",
      "分支之间用分号 `;`。最后一个分支后不加分号，整个 `case` 用 `end.` 结束。",
      "`when` 后的 guard 给模式再加一个简单条件。",
    ],
    concepts: [
      {
        term: "case 分支",
        explanation: "针对一种输入形状写的一条规则。第一个匹配分支会被选中。",
      },
      {
        term: "guard",
        explanation: "`when` 后的附加条件，如 `when Score >= 60`。",
      },
      {
        term: "兜底",
        explanation: "最后处理其余输入的分支，避免意外值无人处理。",
      },
    ],
    symbols: [
      { token: ";", reading: "这个 `case` 分支结束，后面还有分支。" },
      { token: "end.", reading: "结束整个 `case` 表达式。" },
      { token: "_Other", reading: "能匹配任何值；下划线开头表示不会再使用。" },
    ],
    example: {
      label: "先用 case 看清分支顺序",
      code: `%% 清掉旧绑定，再设置本次分数
f().
Score = 76.

%% case 从上到下寻找第一个匹配分支
Message =
  case Score of
    Value when Value >= 90 -> very_good;
    Value when Value >= 60 -> pass;
    _Other -> try_again
  end.

%% 查看选中的 atom
Message.`,
      caption: "把 `Score` 改成 95 和 40，再分别运行。",
      output: ["`76` 得到 atom `pass`。", "`95` 得到 `very_good`。", "`40` 得到 `try_again`。"],
    },
    steps: [
      "`case Score of` 表示接下来让 `Score` 与各分支匹配。",
      "前两个分支后用分号，因为后面还有分支；最后一个分支不加分号。",
      "`end.` 的句点结束整个 `case` 表达式。",
    ],
    practice: {
      task: "根据天气 atom 选择动作：`rain` 返回 `umbrella`，`sunny` 返回 `hat`，其余返回 `look_up`。",
      starter: `%% 清掉刚才的 Score、Message 和旧 Weather
f().

%% 改成其他 atom 再试
Weather = rain.

case Weather of
  ____ -> umbrella;
  ____ -> hat;
  ____ -> look_up
end.`,
      expected: "`rain` 得到 `umbrella`，`sunny` 得到 `hat`。",
      hint: "前两处是固定 atom；最后用 `_Other` 接住其他值。",
      answer: `%% f() 只在 shell 中使用
f().

%% Weather 是要匹配的 atom
Weather = rain.

case Weather of
  rain -> umbrella;
  sunny -> hat;
  _Other -> look_up
end.`,
    },
    check: {
      question: "最后一个 `case` 分支后还要加分号吗？",
      answer: "不要。分号表示后面还有分支；最后一个分支直接接 `end.`。",
    },
    takeaways: [
      "`case` 从上到下选择第一个匹配分支。",
      "匹配从上到下，顺序会影响结果。",
      "分号连接分支，`end.` 结束整个 `case`。",
    ],
  },
  {
    number: "08",
    slug: "recursion",
    stage: "scratch",
    title: "让函数继续走",
    summary: "用空 list 停下，用头尾模式处理下一项。",
    duration: "35 分钟",
    goal: "本课先在 erl 运行两子句递归函数 `Double`；得到 `[2, 4, 6]`，并找到 `Loop([]) -> []` 这个停止位置就算完成。",
    plain: [
      "Erlang 常用递归处理 list：函数处理第一个元素，再把剩余 list 交给自己。",
      "递归必须有停止条件。对于 list，空 list `[]` 是自然终点。",
      "一个函数可以有几个子句。Erlang 从上往下找形状合适的子句。这里第一个接住空 list，第二个接住 `[Head | Tail]`。",
    ],
    concepts: [
      {
        term: "递归",
        explanation: "函数在自己的定义中再次调用自己。",
      },
      {
        term: "函数子句",
        explanation: "同一个函数的不同入口。每个入口接住一种参数形状。",
      },
      {
        term: "停止条件",
        explanation: "不再调用自己的情况。这个例子走到空 list 就返回。",
      },
    ],
    symbols: [
      { token: "fun Loop([]) ->", reading: "创建带内部名字 `Loop` 的匿名函数；第一个子句接住空 list。" },
      { token: "Loop([Head | Tail]) ->", reading: "第二个子句拆出当前元素与剩余元素。" },
      { token: "[Head * 2 | Loop(Tail)]", reading: "放入当前结果，再让 `Loop` 处理更短的 Tail。" },
    ],
    example: {
      label: "复制整段到 erl shell",
      code: `%% 清掉前几课留在 shell 里的变量
f().

%% Double 保存函数；Loop 只供函数内部递归
Double =
  fun Loop([]) ->
        [];
      Loop([Head | Tail]) ->
        [Head * 2 | Loop(Tail)]
  end.

%% 用外面的名字调用函数
Double([1, 2, 3]).`,
      caption: "先看 `[]` 子句，再看 `[Head | Tail]` 子句。不要一口追完整条调用链。",
      output: [
        "`Double([1, 2, 3])` 得到 `[2, 4, 6]`。",
        "每次调用时，list 都缩短一个元素。",
        "到 `Loop([])` 时返回 `[]`，递归停止。",
      ],
    },
    steps: [
      "输入 `[1, 2, 3]` 时，`Head` 是 1，`Tail` 是 `[2, 3]`。",
      "当前一层准备 `1 * 2`，剩余工作变成 `Loop([2, 3])`。",
      "`Loop` 只在这段 `fun` 内部可见；shell 从外面用变量 `Double` 调用整个函数。",
      "分号表示后面还有一个 `fun` 子句；最后一个子句后直接接 `end.`。",
      "最后匹配空 list 子句并返回 `[]`；各层结果再依次接回去。",
    ],
    practice: {
      task: "补出 `AddOne` 函数，让 list 中每个数字加 1。",
      starter: `%% 清掉旧变量，便于反复练习
f().

%% 停止条件保持不变
AddOne =
  fun Loop([]) ->
        [];
      Loop([Head | Tail]) ->
        [____ | Loop(Tail)]
  end.

%% 调用后检查结果
AddOne([2, 3, 4]).`,
      expected: "`AddOne([2, 3, 4])` 得到 `[3, 4, 5]`。",
      hint: "当前元素的新值是 `Head + 1`。",
      answer: `%% f() 只属于 shell，不要写进 .erl 文件
f().

%% AddOne 是外部调用名，Loop 是内部递归名
AddOne =
  fun Loop([]) ->
        [];
      Loop([Head | Tail]) ->
        [Head + 1 | Loop(Tail)]
  end.

%% 应得到 [3,4,5]
AddOne([2, 3, 4]).`,
    },
    check: {
      question: "这段递归在哪里停下？",
      answer: "输入变成空 list 时，`Loop([]) -> []` 直接返回，不再调用自己。",
    },
    takeaways: [
      "递归把大问题缩成更小的同类问题。",
      "缺少 `[]` 子句时，这个例子会走到空 list 后报 `function_clause`；问题不缩小，递归才可能一直继续。",
      "先找停止条件，再读递归子句。",
    ],
  },
  {
    number: "09",
    slug: "modules-and-beam",
    stage: "scratch",
    title: "把代码放进模块",
    summary: "把函数存进 `.erl` 文件，编译运行，并望见 BEAM 主线。",
    duration: "40 分钟",
    goal: "本课先把完整模块保存为 `village.erl`，运行 `c(village).`，再调用 `village:greet/1`；看到 `{ok,village}` 和问候 binary 就算完成。",
    plain: [
      "shell 像草稿纸。需要保存和复用的命名函数通常放进模块文件，文件名与模块名保持一致。",
      "`-export([greet/1]).` 允许模块外调用 `greet/1`。这里必须写 `/1`，因为同名但参数个数不同的函数是不同函数。",
      "模块能运行后，就可以进入 BEAM 的强项：小进程、消息、监督和故障恢复。这些属于下一条主线。",
    ],
    concepts: [
      {
        term: "模块",
        explanation: "一个 `.erl` 文件中的函数集合。模块名通常与文件名相同。",
      },
      {
        term: "export",
        explanation: "列出允许模块外部调用的函数，格式是 `name/arity`。",
      },
      {
        term: "进程",
        explanation: "BEAM 中独立运行、通过消息合作的小执行单元。",
      },
    ],
    symbols: [
      { token: "-module(village).", reading: "声明模块名是 `village`，文件应叫 `village.erl`。" },
      { token: "-export([greet/1]).", reading: "把接收 1 个参数的 `greet` 函数公开。" },
      { token: "c(village).", reading: "在 Erlang shell 中编译并加载 `village.erl`。" },
    ],
    example: {
      label: "保存为 village.erl",
      code: `%% 文件名与模块名保持一致
-module(village).

%% 允许模块外调用 greet/1
-export([greet/1]).

%% Name 是一个 binary
greet(Name) ->
  <<"hello, ", Name/binary>>.`,
      caption: "保存后，在同一目录打开 `erl`，运行 `c(village).`。",
      output: ["`c(village).` 编译成功时返回 `{ok,village}`。", "`village:greet(<<\"A-Ming\">>).` 返回 `<<\"hello, A-Ming\">>`。"],
    },
    steps: [
      "`-module(village).` 声明模块名；文件名应是 `village.erl`。",
      "`-export([greet/1]).` 中的 `/1` 表示 `greet` 接收一个参数。",
      "`Name/binary` 把传入的 binary 接在固定文字后面。",
      "编译后用 `模块:函数(参数)` 调用：`village:greet(<<\"A-Ming\">>)`。",
    ],
    practice: {
      task: "增加一个公开函数 `farewell/1`，返回 `<<\"bye, \", Name/binary>>`。",
      starter: `-module(village).

%% 在列表中再公开一个函数
-export([greet/1, ____]).

greet(Name) ->
  <<"hello, ", Name/binary>>.

%% 补出新函数
____(Name) ->
  <<"bye, ", Name/binary>>.`,
      expected: "重新编译后，`village:farewell(<<\"A-Ming\">>).` 返回 `<<\"bye, A-Ming\">>`。",
      hint: "导出列表的空填 `farewell/1`；函数定义的空只填 `farewell`。",
      answer: `-module(village).

%% 两个函数都接收一个参数
-export([greet/1, farewell/1]).

greet(Name) ->
  <<"hello, ", Name/binary>>.

%% 最后一条函数定义用句点结束
farewell(Name) ->
  <<"bye, ", Name/binary>>.`,
    },
    check: {
      question: "为什么导出列表写 `greet/1`，而不是只写 `greet`？",
      answer: "Erlang 用函数名和参数个数共同确认一个函数。`greet/1` 与 `greet/2` 是两个不同函数。",
    },
    takeaways: [
      "模块名与 `.erl` 文件名保持一致。",
      "导出列表用 `name/arity` 准确写出函数。",
      "学完语法后，再进入 BEAM 的进程与消息。",
    ],
  },
  {
    number: "10",
    slug: "operators-and-truthiness",
    stage: "foundation",
    title: "条件必须说真话",
    summary: "比较 term，组合布尔条件，分清相等与严格相等。",
    duration: "25 分钟",
    goal: "运行购买判断，分清 `==`、`=:=` 与 `andalso`；最后得到 `can_buy`。",
    plain: [
      "Erlang 的条件不是“差不多为真”就行。`if` guard 和 `andalso` 等布尔运算期待真正的 `true` 或 `false`。",
      "`==` 比较数值时允许整数与浮点数相等；`=:=` 还要求类型相同。",
      "`andalso`、`orelse` 会短路。前面已经能决定答案时，后面的表达式不会运行。",
    ],
    concepts: [
      {
        term: "布尔条件",
        explanation: "结果必须是 atom `true` 或 `false` 的判断。",
      },
      {
        term: "严格相等",
        explanation: "`=:=` 同时比较值与类型。",
      },
    ],
    symbols: [
      { token: "== / =:=", reading: "前者做数值宽松比较，后者做严格比较。" },
      { token: "andalso / orelse", reading: "短路组合布尔条件。" },
      { token: "=/=", reading: "严格不相等。" },
    ],
    example: {
      label: "在 erl 判断能否买书",
      code: `Price = 36,
Balance = 50,
InStock = true,

%% 两边都必须得到布尔值
case Balance >= Price andalso InStock of
  true -> can_buy;
  false -> wait
end.

%% 数值相等，但类型不严格相同
1 == 1.0.
1 =:= 1.0.`,
      caption: "在 shell 中分三段运行，注意每段最后的句点。",
      output: ["购买判断得到 `can_buy`。", "`1 == 1.0` 是 `true`；`1 =:= 1.0` 是 `false`。"],
    },
    steps: [
      "`>=` 先产生 `true` 或 `false`。",
      "`andalso` 只在左边为真时检查右边。",
      "需要区分整数与浮点数时使用严格相等。",
    ],
    practice: {
      task: "年龄不少于 12 且有票时返回 `enter`。",
      starter: `Age = 13,
HasTicket = true,
case ____ andalso ____ of
  true -> enter;
  false -> stop
end.`,
      expected: "得到 `enter`。",
      hint: "两个条件是 `Age >= 12` 与 `HasTicket`。",
      answer: `Age = 13,
HasTicket = true,
%% 两个条件同时为 true
case Age >= 12 andalso HasTicket of
  true -> enter;
  false -> stop
end.`,
    },
    check: {
      question: "数字 `0` 能直接当成 Erlang 的 `if` 条件吗？",
      answer: "不能。Erlang 没有把 0、空 list 等值自动换成真假；条件应明确得到 `true` 或 `false`。",
    },
    takeaways: [
      "条件要明确返回布尔值。",
      "`==` 与 `=:=` 的严格程度不同。",
      "`andalso` 与 `orelse` 会短路。",
    ],
  },
  {
    number: "11",
    slug: "nested-collections",
    stage: "foundation",
    title: "一层一层取数据",
    summary: "从 map 里的 list 读取值，再产生更新后的嵌套结构。",
    duration: "30 分钟",
    goal: "从书院记录读出第一门课，并把积分从 8 改为 9。",
    plain: [
      "真实数据常由 map、list 和 tuple 叠在一起。先匹配外层，再处理内层，别一眼吞下整棵树。",
      "`maps:get/2` 读取键。更新 map 使用 `#{key := value}`，它返回新 map。",
      "list 的头尾模式能取第一项。若 list 可能为空，应写出空 list 分支。",
    ],
    concepts: [
      {
        term: "嵌套 term",
        explanation: "一个集合中继续放其他集合，如 map 里放课程 list。",
      },
      {
        term: "map 更新",
        explanation: "从旧 map 产生带新值的新 map；原值不改变。",
      },
    ],
    symbols: [
      { token: "maps:get(Key, Map)", reading: "读取 map 中指定键的值。" },
      { token: "Map#{key := value}", reading: "更新已经存在的键。" },
      { token: "[Head | Tail]", reading: "匹配非空 list 的第一项与剩余部分。" },
    ],
    example: {
      label: "读取并更新课程积分",
      code: `Student = #{
  name => <<"A-Qing">>,
  courses => [#{title => <<"Erlang">>, points => 8}]
},

%% 先取课程 list，再匹配第一项
[Course | _] = maps:get(courses, Student),
Title = maps:get(title, Course),

%% 更新内层后，再放回外层 map
UpdatedCourse = Course#{points := 9},
Updated = Student#{courses := [UpdatedCourse]},
{Title, maps:get(points, hd(maps:get(courses, Updated)))}.`,
      caption: "最后同时查看课程名与新积分。",
      output: ["得到 `{<<\"Erlang\">>,9}`；`Student` 中的原积分仍为 8。"],
    },
    steps: [
      "先把嵌套读取拆成多个有名字的步骤。",
      "内层课程 map 更新后，外层也要放入新课程 list。",
      "所有更新都生成新 term。",
    ],
    practice: {
      task: "把 `#{profile => #{city => <<\"Xi'an\">>}}` 的城市改为 `<<\"Chengdu\">>`。",
      starter: `Person = #{profile => #{city => <<"Xi'an">>}},
Profile = maps:get(____, Person),
Person#{profile := Profile#{city := ____}}.`,
      expected: "新 map 的城市是 `<<\"Chengdu\">>`。",
      hint: "外层键是 `profile`，新值是一个 binary。",
      answer: `Person = #{profile => #{city => <<"Xi'an">>}},
Profile = maps:get(profile, Person),
%% 先更新内层，再放回外层
Person#{profile := Profile#{city := <<"Chengdu">>}}.`,
    },
    check: {
      question: "`Map#{key := value}` 会直接改掉 `Map` 吗？",
      answer: "不会。它返回新 map；旧变量仍指向旧值。",
    },
    takeaways: [
      "嵌套数据要分层读取。",
      "`:=` 更新已存在的 map 键。",
      "旧 term 不会被原地修改。",
    ],
  },
  {
    number: "12",
    slug: "unicode-and-text",
    stage: "foundation",
    title: "文字先说清编码",
    summary: "用 UTF-8 binary 保存中文，分清字节与字符。",
    duration: "35 分钟",
    goal: "比较“长安”的字节数和字符数，再把带空格文字切成词。",
    plain: [
      "Erlang 的 binary 只是字节容器。写中文时明确 `/utf8`，读文件时也要知道字节采用什么编码。",
      "`byte_size/1` 数字节。要按 Unicode 字符处理，可先使用 `unicode` 模块转换。",
      "Erlang 生态中会同时遇到 charlist 与 UTF-8 binary。模块文档会说明函数期望哪一种。",
    ],
    concepts: [
      {
        term: "Unicode binary",
        explanation: "按 UTF-8 等编码装入 binary 的文字字节。",
      },
      {
        term: "charlist",
        explanation: "由 Unicode 码点整数组成的 list，显示时常看起来像带双引号文字。",
      },
    ],
    symbols: [
      { token: "<<Text/utf8>>", reading: "把 Unicode 码点按 UTF-8 放进 binary。" },
      { token: "byte_size/1", reading: "计算 binary 中的字节数。" },
      { token: "unicode:characters_to_list/1", reading: "把 Unicode 数据转为码点 list。" },
    ],
    example: {
      label: "数一数“长安”",
      code: `Text = <<"长安"/utf8>>,

%% byte_size 数底层字节
Bytes = byte_size(Text),

%% 转成码点 list 后再数 Unicode 字符
Characters = length(unicode:characters_to_list(Text)),
{Bytes, Characters}.`,
      caption: "源码保存为 UTF-8；现代 Erlang 编译器能读取 Unicode 源码。",
      output: ["得到 `{6,2}`。"],
    },
    steps: [
      "两个汉字按 UTF-8 共占 6 字节。",
      "`unicode:characters_to_list/1` 得到两个码点。",
      "底层协议看字节，面向读者的长度看字符。",
    ],
    practice: {
      task: "把 `<<\"  peach,plum  \">>` 去掉两端空格，再按逗号切开。",
      starter: `Text = <<"  peach,plum  ">>,
Clean = string:____(Text),
string:split(Clean, ____, all).`,
      expected: "得到 `[<<\"peach\">>,<<\"plum\">>]`。",
      hint: "先用 `trim`，分隔符也是 binary `<<\",\">>`。",
      answer: `Text = <<"  peach,plum  ">>,
%% string 模块可处理 UTF-8 binary
Clean = string:trim(Text),
string:split(Clean, <<",">>, all).`,
    },
    check: {
      question: "binary 是否天然知道里面装的是 UTF-8 文字？",
      answer: "不知道。binary 只是字节；编码约定来自写入方式、协议或调用者说明。",
    },
    takeaways: [
      "binary 与文字编码不是同一件事。",
      "字节数与字符数可能不同。",
      "模块边界要说明接受 binary 还是 charlist。",
    ],
  },
  {
    number: "13",
    slug: "named-functions-and-clauses",
    stage: "foundation",
    title: "让函数子句排好队",
    summary: "在模块中用模式和 guard 写多个命名函数子句。",
    duration: "35 分钟",
    goal: "写出 `fare:fee/1`，让儿童、成人和错误输入各走一条路。",
    plain: [
      "Erlang 命名函数放在模块里。同名、同 arity 的子句必须连在一起，用分号隔开。",
      "运行时从上往下找第一条模式和 guard 都通过的子句。",
      "最具体的规则在前，兜底规则在后。最后一个子句用句点结束。",
    ],
    concepts: [
      {
        term: "函数子句",
        explanation: "同一个 name/arity 的不同入口，由模式与 guard 区分。",
      },
      {
        term: "guard",
        explanation: "`when` 后可快速检查类型与范围的一组安全表达式。",
      },
    ],
    symbols: [
      { token: "fee(Age) when ...", reading: "定义带 guard 的函数子句。" },
      { token: ";", reading: "同一函数还有下一条子句。" },
      { token: ".", reading: "当前函数的全部子句结束。" },
    ],
    example: {
      label: "保存为 fare.erl",
      code: `-module(fare).
-export([fee/1]).

%% 具体的儿童规则放在前面
fee(Age) when is_integer(Age), Age >= 0, Age < 12 ->
  {ok, 0};
fee(Age) when is_integer(Age), Age >= 0 ->
  {ok, 20};
fee(_) ->
  {error, invalid_age}.`,
      caption: "运行 `c(fare).` 后依次调用三种输入。",
      output: ["`fare:fee(9).` 得到 `{ok,0}`。", "`fare:fee(18).` 得到 `{ok,20}`。", "`fare:fee(<<\"nine\">>).` 得到 `{error,invalid_age}`。"],
    },
    steps: [
      "三个子句都属于 `fee/1`，所以前两条以分号结束。",
      "guard 先确认整数，再检查年龄范围。",
      "最后的下划线接住所有未匹配输入。",
    ],
    practice: {
      task: "写出 `weather:label/1` 的晴天与兜底子句。",
      starter: `label(sunny) ->
  ____;
label(_) ->
  ____.`,
      expected: "晴天返回 `<<\"sunny\">>`，其他输入返回 `<<\"unknown\">>`。",
      hint: "两个空都填写 binary。",
      answer: `%% 具体 atom 放在兜底前
label(sunny) ->
  <<"sunny">>;
label(_) ->
  <<"unknown">>.`,
    },
    check: {
      question: "同一个函数的两条子句中间为什么不能用句点？",
      answer: "句点表示函数定义已经结束；下一条同名同 arity 定义会被当作重复函数而编译失败。",
    },
    takeaways: [
      "函数由 name 与 arity 共同识别。",
      "同一函数子句必须相邻。",
      "分号续子句，句点收函数。",
    ],
  },
  {
    number: "14",
    slug: "recursion-and-folds",
    stage: "foundation",
    title: "带着累加器往前走",
    summary: "先手写尾递归求和，再用 `lists:foldl/3` 收拢 list。",
    duration: "35 分钟",
    goal: "用两种写法算出 `[3,5,7]` 的总和 15。",
    plain: [
      "递归每一步让输入 list 变短。累加器保存已经算好的部分。",
      "空 list 子句返回累加器，递归在这里停。它应放在非空子句前后都可，但两者要紧挨。",
      "`lists:foldl/3` 是通用累加工具。匿名函数参数顺序是元素在前、累加器在后。",
    ],
    concepts: [
      {
        term: "尾递归",
        explanation: "递归调用是函数最后一步，BEAM 可复用调用空间。",
      },
      {
        term: "fold",
        explanation: "从初始值开始，把 list 元素逐项收进一个结果。",
      },
    ],
    symbols: [
      { token: "sum(List, Acc)", reading: "内部函数同时接收剩余输入与累加结果。" },
      { token: "lists:foldl/3", reading: "从左到右收拢 list。" },
      { token: "fun(Item, Acc) -> ... end", reading: "fold 的二参数匿名函数。" },
    ],
    example: {
      label: "保存为 totals.erl",
      code: `-module(totals).
-export([sum/1]).

sum(Numbers) ->
  sum(Numbers, 0).

%% 空 list 返回最后的累加结果
sum([], Total) ->
  Total;
sum([Number | Rest], Total) ->
  sum(Rest, Total + Number).`,
      caption: "编译后再运行 `lists:foldl(fun(N, T) -> N + T end, 0, [3,5,7]).`。",
      output: ["`totals:sum([3,5,7]).` 与 fold 都得到 `15`。"],
    },
    steps: [
      "公开 `sum/1` 把初始累加器设为 0。",
      "非空子句取出一个数，并递归处理剩余 list。",
      "fold 把同一过程交给标准库。",
    ],
    practice: {
      task: "用 `lists:foldl/3` 求 `[2,3,4]` 的乘积。",
      starter: `lists:foldl(
  fun(Number, Product) -> ____ end,
  ____,
  [2, 3, 4]
).`,
      expected: "得到 `24`。",
      hint: "每步相乘，初始值是 1。",
      answer: `lists:foldl(
  %% 把当前数字乘进累加结果
  fun(Number, Product) -> Number * Product end,
  1,
  [2, 3, 4]
).`,
    },
    check: {
      question: "求和时为什么用 0 作为初始值？",
      answer: "任何数加 0 不变；空 list 的总和也自然是 0。",
    },
    takeaways: [
      "递归输入要不断变小。",
      "累加器保存阶段结果。",
      "标准库 fold 能减少重复递归。",
    ],
  },
  {
    number: "15",
    slug: "control-flow",
    stage: "foundation",
    title: "先看值，再选路",
    summary: "用 `case` 匹配结果，用 `if` guard 选择第一条真条件。",
    duration: "35 分钟",
    goal: "解析年龄 binary，成功时分类，失败时返回稳定错误。",
    plain: [
      "Erlang 最常见的选择来自模式匹配。函数子句能解决时，先用函数子句；局部结果再用 `case`。",
      "`case` 按一个值的形状选分支。`if` 实际按 guard 选择，最后常写 `true ->` 作为兜底。",
      "不要把所有逻辑塞进深层嵌套。先把底层结果整理成稳定 tuple，下一层会更好读。",
    ],
    concepts: [
      {
        term: "case 表达式",
        explanation: "计算一个值，再选择第一条匹配子句。",
      },
      {
        term: "if 表达式",
        explanation: "从上到下选择第一条 guard 为 true 的分支。",
      },
    ],
    symbols: [
      { token: "case Value of", reading: "开始按值匹配分支。" },
      { token: "if", reading: "开始按 guard 条件选择。" },
      { token: "end", reading: "结束 case、if、try 或 fun 等结构。" },
    ],
    example: {
      label: "先解析，再分类",
      code: `ParseAge =
  fun(Text) ->
    case string:to_integer(Text) of
      {Age, <<>>} -> {ok, Age};
      _ -> {error, bad_age}
    end
  end,

%% 只在解析成功时进入年龄分类
case ParseAge(<<"13">>) of
  {ok, Age} when Age < 12 -> {ok, child};
  {ok, _Age} -> {ok, teen_or_adult};
  Error -> Error
end.`,
      caption: "把输入改为 `<<\"thirteen\">>`，观察错误原样返回。",
      output: ["`<<\"13\">>` 得到 `{ok,teen_or_adult}`。", "无效文字得到 `{error,bad_age}`。"],
    },
    steps: [
      "`string:to_integer/1` 返回整数与剩余文字，或 `{error, Reason}`。",
      "解析函数把各种失败统一为 `{error,bad_age}`。",
      "外层 case 只负责年龄业务分支。",
    ],
    practice: {
      task: "让空 list 返回 `empty`，非空 list 返回第一项。",
      starter: `case [8, 9] of
  ____ -> empty;
  [Head | _] -> ____
end.`,
      expected: "得到 `8`。",
      hint: "空 list 是 `[]`；第二处返回 `Head`。",
      answer: `case [8, 9] of
  [] -> empty;
  %% 非空 list 的 Head 是第一项
  [Head | _] -> Head
end.`,
    },
    check: {
      question: "Erlang 的 `if` 是否一定比 `case` 更适合所有条件判断？",
      answer: "不是。`if` 只看 guard；若已经有一个结果要按形状拆开，`case` 更直接。",
    },
    takeaways: [
      "优先用模式表达数据分支。",
      "`case` 看值形状，`if` 看 guard。",
      "底层结果先整理，再做业务判断。",
    ],
  },
  {
    number: "16",
    slug: "module-attributes-and-records",
    stage: "foundation",
    title: "给模块立规矩",
    summary: "用模块属性声明身份、导出、常量和 record 字段。",
    duration: "40 分钟",
    goal: "定义 `book` record，创建一本书，再返回书名与默认页数。",
    plain: [
      "Erlang 模块属性以连字符开头，编译时生效。`-module`、`-export` 都是属性。",
      "`-define` 声明宏常量。record 为 tuple 字段提供名字，但它主要是编译期语法，不是全局运行时类型。",
      "record 定义通常放模块或头文件中。跨模块边界时，map 往往更容易演进。",
    ],
    concepts: [
      {
        term: "模块属性",
        explanation: "告诉编译器模块身份、公开函数、类型等信息的声明。",
      },
      {
        term: "record",
        explanation: "为固定 tuple 位置提供字段名的编译期语法。",
      },
    ],
    symbols: [
      { token: "-define(NAME, Value).", reading: "声明宏，使用时写 `?NAME`。" },
      { token: "-record(name, {...}).", reading: "声明 record 字段与默认值。" },
      { token: "#book{...}", reading: "创建、匹配或更新 book record。" },
    ],
    example: {
      label: "保存为 library.erl",
      code: `-module(library).
-export([new/1, info/1]).

-define(DEFAULT_PAGES, 1).
-record(book, {title, pages = ?DEFAULT_PAGES}).

%% record 只在知道定义的模块中展开
new(Title) ->
  #book{title = Title}.

info(Book) ->
  {Book#book.title, Book#book.pages}.`,
      caption: "编译后运行 `B = library:new(<<\"Small Town\">>), library:info(B).`。",
      output: ["得到 `{<<\"Small Town\">>,1}`。"],
    },
    steps: [
      "宏给默认页数一个名字，编译时会展开。",
      "record 字段让代码不用记 tuple 的位置。",
      "公开 `info/1` 避免调用者直接依赖 record 内部布局。",
    ],
    practice: {
      task: "增加 `set_pages/2`，返回页数更新后的 record。",
      starter: `set_pages(Book, Pages) ->
  Book#book{____ = ____}.`,
      expected: "传入 120 时，新 record 的页数为 120。",
      hint: "字段名是 `pages`，新值变量是 `Pages`。",
      answer: `%% record 更新也返回新 term
set_pages(Book, Pages) ->
  Book#book{pages = Pages}.`,
    },
    check: {
      question: "record 是否像 map 一样在运行时保存字段名？",
      answer: "不是。record 主要在编译时展开成 tuple；运行时值本身不携带这些字段名。",
    },
    takeaways: [
      "模块属性服务编译器。",
      "record 给固定 tuple 布局加字段名。",
      "对外 API 不应轻易暴露 record 布局。",
    ],
  },
  {
    number: "17",
    slug: "rebar3-and-eunit",
    stage: "foundation",
    title: "让 rebar3 管项目",
    summary: "创建 Erlang 应用，写第一个模块，再用 EUnit 保存例子。",
    duration: "45 分钟",
    goal: "创建 `trail_counter` 应用，让字符计数测试通过。",
    plain: [
      "rebar3 是常用 Erlang 构建工具。它创建项目、编译代码、管理依赖并运行测试。",
      "应用源码通常放 `src/`，配置写在 `rebar.config`。EUnit 适合短小单元测试。",
      "测试函数名以 `_test` 结尾，或使用 EUnit 生成器。`?assertEqual` 写出期望和实际结果。",
    ],
    concepts: [
      {
        term: "rebar3",
        explanation: "Erlang/OTP 项目的构建与依赖工具。",
      },
      {
        term: "EUnit",
        explanation: "随 Erlang/OTP 提供的轻量单元测试框架。",
      },
    ],
    symbols: [
      { token: "rebar3 new app name", reading: "创建 OTP 应用骨架。" },
      { token: "-include_lib(\"eunit/include/eunit.hrl\").", reading: "引入 EUnit 宏。" },
      { token: "?assertEqual(Expected, Actual)", reading: "比较期待值与实际值。" },
    ],
    example: {
      label: "在项目模块中写第一个测试",
      code: `-module(trail_counter).
-export([text_length/1]).

-include_lib("eunit/include/eunit.hrl").

text_length(Text) ->
  erlang:length(unicode:characters_to_list(Text)).

%% _test 结尾会被 EUnit 自动发现
unicode_length_test() ->
  ?assertEqual(2, text_length(<<"长安"/utf8>>)).`,
      caption: "先运行 `rebar3 new app trail_counter`，放入 `src/trail_counter.erl`，再执行 `rebar3 eunit`。",
      output: ["测试通过时 EUnit 显示 1 tests passed。"],
    },
    steps: [
      "公开函数把 UTF-8 binary 转成码点 list 后计数。",
      "EUnit 头文件提供断言宏。",
      "rebar3 负责编译测试代码并运行用例。",
    ],
    practice: {
      task: "再加一个空 binary 测试。",
      starter: `empty_text_test() ->
  ?assertEqual(____, text_length(____)).`,
      expected: "期待 `text_length(<<>>)` 得到 0。",
      hint: "两个空分别填 0 与 `<<>>`。",
      answer: `empty_text_test() ->
  %% 空 binary 没有字符
  ?assertEqual(0, text_length(<<>>)).`,
    },
    check: {
      question: "rebar3 是 Erlang 语言本身吗？",
      answer: "不是。它是项目构建工具；源码仍由 Erlang 编译器编译并在 BEAM 上运行。",
    },
    takeaways: [
      "rebar3 管理项目构建流程。",
      "EUnit 保存可重复检查的例子。",
      "源码、配置与测试各有固定位置。",
    ],
  },
  {
    number: "18",
    slug: "result-contracts",
    stage: "intermediate",
    title: "让结果有固定形状",
    summary: "用 `{ok, Value}` 与 `{error, Reason}` 统一成功和失败。",
    duration: "30 分钟",
    goal: "写出安全除法函数，让调用者按稳定 tuple 处理两条路。",
    plain: [
      "可能失败的函数应让调用者一眼看见两种结果。固定 tuple 比特殊数字或模糊 atom 更可靠。",
      "成功常用 `{ok, Value}`，失败常用 `{error, Reason}`。这也是 OTP 库里常见的约定。",
      "Reason 使用稳定 atom 或 tuple。面向人的提示留到 shell、HTTP 或 CLI 边界再翻译。",
    ],
    concepts: [
      {
        term: "结果约定",
        explanation: "函数与调用者共同遵守的返回值形状。",
      },
      {
        term: "错误原因",
        explanation: "可由模式匹配识别的失败类别。",
      },
    ],
    symbols: [
      { token: "{ok, Value}", reading: "成功标签与结果组成 tuple。" },
      { token: "{error, Reason}", reading: "失败标签与原因组成 tuple。" },
      { token: "case", reading: "在调用边界匹配两种结果。" },
    ],
    example: {
      label: "保存为 ratio.erl",
      code: `-module(ratio).
-export([divide/2]).

%% 最具体的零除数规则放在前面
divide(_Left, 0) ->
  {error, division_by_zero};
divide(Left, Right) ->
  {ok, Left / Right}.`,
      caption: "编译后分别运行 `ratio:divide(12,3).` 与 `ratio:divide(12,0).`。",
      output: ["结果依次为 `{ok,4.0}` 与 `{error,division_by_zero}`。"],
    },
    steps: [
      "两个子句的返回值都是二元 tuple。",
      "第一项稳定说明成功或失败。",
      "调用者可以只处理自己关心的 reason，也可保留兜底分支。",
    ],
    practice: {
      task: "补全 `positive/1`，只接受正数。",
      starter: `positive(Number) when Number > 0 ->
  {____, Number};
positive(_) ->
  {____, ____}.`,
      expected: "正数得到 `{ok,Number}`，其他输入得到 `{error,not_positive}`。",
      hint: "成功和失败标签分别是 `ok`、`error`。",
      answer: `positive(Number) when Number > 0 ->
  {ok, Number};
%% 原因使用稳定 atom
positive(_) ->
  {error, not_positive}.`,
    },
    check: {
      question: "为什么失败时不只返回 `error`？",
      answer: "单个 atom 没有原因位置；统一二元 tuple 后，调用者能匹配类别并继续携带细节。",
    },
    takeaways: [
      "成功与失败要有稳定外形。",
      "Reason 应短而可匹配。",
      "错误显示留给系统边界。",
    ],
  },
  {
    number: "19",
    slug: "files-and-io",
    stage: "intermediate",
    title: "把磁盘当成会失败的邻居",
    summary: "用 `file` 读写 binary，用 `io` 控制输出，不混淆两种边界。",
    duration: "35 分钟",
    goal: "在临时目录写入两行文字，再读回并切成 list。",
    plain: [
      "磁盘文件可能不存在、无权限或写到一半失败。`file` 模块用结果 tuple 把问题交回来。",
      "文件内容优先按 binary 读取，编码约定由项目明确。`io` 模块负责设备输出，不替代文件解析。",
      "练习只写系统临时目录下指定文件，不碰自己的资料。",
    ],
    concepts: [
      {
        term: "I/O 边界",
        explanation: "程序与文件、终端等外部世界交接的位置。",
      },
      {
        term: "I/O device",
        explanation: "`io` 模块读写的设备，如标准输出或打开的文件。",
      },
    ],
    symbols: [
      { token: "file:write_file/2", reading: "把 iodata 写入指定路径。" },
      { token: "file:read_file/1", reading: "把整个文件读为 binary。" },
      { token: "io:format/2", reading: "按格式向标准输出写内容。" },
    ],
    example: {
      label: "读写一个临时名单",
      code: `Path = filename:join(
  filename:basedir(user_cache, "beam_path"),
  "names.txt"
),
ok = filelib:ensure_dir(Path),

%% 只写当前用户缓存目录中的指定文件
ok = file:write_file(Path, <<"A-Qing\nXiao-Man\n">>),
{ok, Text} = file:read_file(Path),

%% 去掉末尾空项
binary:split(Text, <<"\n">>, [global, trim_all]).`,
      caption: "`filelib:ensure_dir/1` 会创建 Path 的父目录。",
      output: ["得到 `[<<\"A-Qing\">>,<<\"Xiao-Man\">>]`。"],
    },
    steps: [
      "`filename` 模块按当前系统规则拼接路径。",
      "写入与读取都显式匹配成功结果。",
      "读回原始 binary 后，解析步骤单独进行。",
    ],
    practice: {
      task: "写入 `<<\"8\\n9\\n\">>`，再检查返回值。",
      starter: `Path = filename:join("/tmp", "scores.txt"),
____ = file:write_file(Path, ____).`,
      expected: "写入成功时整段得到 `ok`。",
      hint: "第一空是 `ok`，第二空是 binary。",
      answer: `Path = filename:join("/tmp", "scores.txt"),
%% 正式项目可改用 filename:basedir/2
ok = file:write_file(Path, <<"8\n9\n">>).`,
    },
    check: {
      question: "`file:read_file/1` 找不到文件时会返回什么形状？",
      answer: "通常返回 `{error, enoent}`；调用者应处理 error tuple，而不是只写成功匹配。",
    },
    takeaways: [
      "路径交给 `filename` 模块。",
      "文件操作始终可能失败。",
      "读取、解析与显示是三个不同步骤。",
    ],
  },
  {
    number: "20",
    slug: "higher-order-data-pipelines",
    stage: "intermediate",
    title: "把函数交给 list",
    summary: "用 `lists:map`、`filter` 与 `foldl` 组成清楚的数据流水线。",
    duration: "35 分钟",
    goal: "从一组分数中保留及格项、加 5 分，再算总分。",
    plain: [
      "高阶函数接收另一个函数。它替你走 list，你只写每一项要做什么。",
      "Erlang 没有 Elixir 的管道运算符，但可以给每一步结果取短名字。名字也能说明数据怎样变化。",
      "map 保持项数，filter 可能减少项数，fold 把多项收成一个结果。",
    ],
    concepts: [
      {
        term: "高阶函数",
        explanation: "接收函数参数或返回函数的函数。",
      },
      {
        term: "数据流水线",
        explanation: "把前一步输出交给下一步的连续变换。",
      },
    ],
    symbols: [
      { token: "lists:filter/2", reading: "只保留函数返回 true 的项。" },
      { token: "lists:map/2", reading: "把每项变成一个新值。" },
      { token: "lists:foldl/3", reading: "把 list 收拢为一个结果。" },
    ],
    example: {
      label: "让每一步都有名字",
      code: `Scores = [42, 60, 78, 91],

%% 先筛选，再变换
Passed = lists:filter(fun(Score) -> Score >= 60 end, Scores),
Boosted = lists:map(fun(Score) -> Score + 5 end, Passed),

%% 最后收成总分
Total = lists:foldl(fun(Score, Sum) -> Score + Sum end, 0, Boosted),
{Boosted, Total}.`,
      caption: "三个名字对应三种数据形状，调试时可逐个查看。",
      output: ["得到 `{[65,83,96],244}`。"],
    },
    steps: [
      "filter 的函数必须返回布尔值。",
      "map 为每个及格分数加 5。",
      "fold 以 0 为初始值累计总分。",
    ],
    practice: {
      task: "把 `[1,2,3,4]` 中的偶数平方。",
      starter: `Even = lists:filter(fun(N) -> rem(N, ____) == 0 end, [1,2,3,4]),
lists:map(fun(N) -> ____ end, Even).`,
      expected: "得到 `[4,16]`。",
      hint: "偶数除以 2 余 0；平方写 `N * N`。",
      answer: `Even = lists:filter(fun(N) -> rem(N, 2) == 0 end, [1,2,3,4]),
%% map 只处理筛选后的偶数
lists:map(fun(N) -> N * N end, Even).`,
    },
    check: {
      question: "`lists:map/2` 会自动丢掉不需要的项吗？",
      answer: "不会。map 为每项产生一项；需要丢项时先用 filter。",
    },
    takeaways: [
      "函数也能作为参数传递。",
      "filter、map、fold 各有明确职责。",
      "用短变量名串起 Erlang 数据流水线。",
    ],
  },
  {
    number: "21",
    slug: "records-and-boundaries",
    stage: "intermediate",
    title: "record 留在院里",
    summary: "模块内部使用 record，对外用 map，避免 tuple 布局泄漏。",
    duration: "40 分钟",
    goal: "让用户模块从 map 创建 record，再把公开信息转回 map。",
    plain: [
      "record 在模块内部很好读，但运行时只是 tuple。把它直接交给远处模块，双方会被同一布局绑住。",
      "边界用 map 传具名字段，内部可用 record 保持固定结构。转换函数就是明确的门。",
      "这不是说 record 不好，而是让数据表示待在最合适的范围。",
    ],
    concepts: [
      {
        term: "模块边界",
        explanation: "一个模块与外部调用者交换数据的位置。",
      },
      {
        term: "表示泄漏",
        explanation: "调用者被迫知道本应属于模块内部的数据布局。",
      },
    ],
    symbols: [
      { token: "#user{}", reading: "模块内部的固定 record 表示。" },
      { token: "#{name => ...}", reading: "边界处带字段名的 map。" },
      { token: "from_map / to_map", reading: "把边界数据与内部表示相互转换。" },
    ],
    example: {
      label: "保存为 user_profile.erl",
      code: `-module(user_profile).
-export([from_map/1, public/1]).

-record(user, {name, score = 0}).

%% map 是进入模块的边界形状
from_map(#{name := Name, score := Score}) ->
  {ok, #user{name = Name, score = Score}};
from_map(_) ->
  {error, invalid_user}.

%% record 不直接离开模块
public(User) ->
  #{name => User#user.name, score => User#user.score}.`,
      caption: "调用者只依赖 map 与结果 tuple，不依赖 record 的 tuple 位置。",
      output: ["有效 map 返回 `{ok, Record}`；`public/1` 再返回具名 map。"],
    },
    steps: [
      "入口模式要求两个键存在。",
      "内部 record 提供字段访问语法。",
      "出口函数选择真正允许公开的字段。",
    ],
    practice: {
      task: "让 `public/1` 只公开名字，不公开分数。",
      starter: `public(User) ->
  #{____ => User#user.____}.`,
      expected: "得到只含 `name` 键的 map。",
      hint: "两个空都填 `name`。",
      answer: `%% 边界明确选择可见字段
public(User) ->
  #{name => User#user.name}.`,
    },
    check: {
      question: "为什么跨模块直接匹配 record tuple 位置很脆弱？",
      answer: "字段增删或顺序改变会影响所有知道布局的调用者；转换边界把变化收回模块内。",
    },
    takeaways: [
      "record 适合局部固定结构。",
      "边界数据要让字段含义可见。",
      "转换函数隔离内部布局变化。",
    ],
  },
  {
    number: "22",
    slug: "behaviours-and-callbacks",
    stage: "intermediate",
    title: "先写模块之间的约定",
    summary: "用 behaviour callback 定义接口，再写可替换实现。",
    duration: "40 分钟",
    goal: "定义问候 behaviour，并让中文实现通过约定。",
    plain: [
      "behaviour 说明一个模块应提供哪些函数。实现模块可以不同，调用者只依赖共同约定。",
      "`-callback` 声明 name/arity 及类型。实现模块写 `-behaviour(Name).`，编译器会提醒缺失 callback。",
      "behaviour 常用在 OTP，也适合存储、通知等项目边界。",
    ],
    concepts: [
      {
        term: "behaviour",
        explanation: "一组模块必须实现的函数约定。",
      },
      {
        term: "callback",
        explanation: "behaviour 声明、实现模块负责提供的函数。",
      },
    ],
    symbols: [
      { token: "-callback", reading: "声明回调函数和类型。" },
      { token: "-behaviour(Module).", reading: "声明当前模块遵守该 behaviour。" },
      { token: "Module:Function(Args)", reading: "通过传入模块调用具体实现。" },
    ],
    example: {
      label: "分别保存为 greeter.erl 与 zh_greeter.erl",
      code: `%% greeter.erl
-module(greeter).
-callback hello(binary()) -> binary().

%% zh_greeter.erl
-module(zh_greeter).
-behaviour(greeter).
-export([hello/1]).

%% 实现 behaviour 要求的 hello/1
hello(Name) ->
  <<"你好，"/utf8, Name/binary>>.`,
      caption: "编译两个模块后运行 `zh_greeter:hello(<<\"小满\"/utf8>>).`。",
      output: ["得到包含 `你好，小满` 的 UTF-8 binary。"],
    },
    steps: [
      "behaviour 模块只写约定，不提供这次的具体问候。",
      "实现模块声明 behaviour 并导出 callback。",
      "缺少 `hello/1` 时，编译器会给出警告。",
    ],
    practice: {
      task: "增加 `quiet_greeter`，忽略名字并返回 `<<\"hello\">>`。",
      starter: `-module(quiet_greeter).
-behaviour(____).
-export([hello/1]).

hello(_Name) ->
  ____.`,
      expected: "模块遵守 `greeter`，调用返回 `<<\"hello\">>`。",
      hint: "behaviour 名是 `greeter`，返回值是 binary。",
      answer: `-module(quiet_greeter).
-behaviour(greeter).
-export([hello/1]).

%% 这个实现选择忽略名字
hello(_Name) ->
  <<"hello">>.`,
    },
    check: {
      question: "behaviour 会自动生成 callback 正文吗？",
      answer: "不会。它提供约定和编译检查，具体函数仍由实现模块编写。",
    },
    takeaways: [
      "behaviour 约束模块接口。",
      "callback 写清 name/arity 与类型。",
      "依赖约定可替换具体实现。",
    ],
  },
  {
    number: "23",
    slug: "typespecs-and-dialyzer",
    stage: "intermediate",
    title: "把 term 形状写出来",
    summary: "用 `-type` 与 `-spec` 记录约定，让 Dialyzer 寻找矛盾。",
    duration: "40 分钟",
    goal: "为安全查分函数添加类型，并能运行 rebar3 Dialyzer。",
    plain: [
      "Erlang 是动态语言，但 typespec 能把复杂 term 形状写给读者和工具。",
      "`-type` 给数据形状命名，`-spec` 描述函数输入与输出。它们必须如实覆盖所有分支。",
      "Dialyzer 分析代码可能产生的值，寻找永远匹配不到或返回约定冲突等问题。",
    ],
    concepts: [
      {
        term: "typespec",
        explanation: "Erlang 模块中的类型与函数规格声明。",
      },
      {
        term: "Dialyzer",
        explanation: "根据 success typing 分析 BEAM 代码矛盾的工具。",
      },
    ],
    symbols: [
      { token: "-type name() :: ... .", reading: "声明可复用类型。" },
      { token: "-spec fun(Type) -> Type.", reading: "声明函数输入输出。" },
      { token: "term()", reading: "任意 Erlang term。" },
    ],
    example: {
      label: "为查分结果写类型",
      code: `-module(scores).
-export([fetch/2]).

-type student_id() :: pos_integer().
-type result() :: {ok, non_neg_integer()} | {error, not_found}.

%% spec 与两个返回分支保持一致
-spec fetch(#{student_id() => non_neg_integer()}, student_id()) -> result().
fetch(Scores, Id) ->
  case maps:find(Id, Scores) of
    {ok, Score} -> {ok, Score};
    error -> {error, not_found}
  end.`,
      caption: "放进 rebar3 项目，先编译与测试，再运行 `rebar3 dialyzer`。",
      output: ["`scores:fetch(#{7 => 92}, 7).` 得到 `{ok,92}`。"],
    },
    steps: [
      "学生编号限定为正整数。",
      "结果类型列出成功和失败两种 tuple。",
      "Dialyzer 建立 PLT 首次会较慢，后续可复用分析资料。",
    ],
    practice: {
      task: "为 `double/1` 写整数输入和输出 spec。",
      starter: `-spec double(____) -> ____.
double(Number) -> Number * 2.`,
      expected: "写成 `-spec double(integer()) -> integer().`。",
      hint: "输入与输出都使用 `integer()`。",
      answer: `%% 规格如实描述函数行为
-spec double(integer()) -> integer().
double(Number) -> Number * 2.`,
    },
    check: {
      question: "spec 会在每次运行时拦住所有错误类型吗？",
      answer: "不会。spec 服务文档与静态分析；运行时仍由模式、guard 和函数正文处理 term。",
    },
    takeaways: [
      "类型约定要覆盖真实分支。",
      "`-type` 能给领域 term 命名。",
      "Dialyzer 寻找代码与约定的矛盾。",
    ],
  },
  {
    number: "24",
    slug: "eunit-and-common-test",
    stage: "intermediate",
    title: "小测试与整段路",
    summary: "用 EUnit 守住纯函数，用 Common Test 检查较长场景。",
    duration: "45 分钟",
    goal: "为折扣函数补正常与边界 EUnit 测试，并知道何时使用 Common Test。",
    plain: [
      "EUnit 适合一个函数、一个模块的短测试。Common Test 用 suite 组织更长场景，常见于多个组件或真实资源。",
      "先用最轻工具。两行能讲清的纯函数测试，不必搭一整套 suite。",
      "正常、边界、错误输入都要考虑。测试名或生成器结构应让失败位置清楚。",
    ],
    concepts: [
      {
        term: "test fixture",
        explanation: "测试运行前准备、运行后清理的资源或数据。",
      },
      {
        term: "test suite",
        explanation: "Common Test 中按场景组织的一组测试用例。",
      },
    ],
    symbols: [
      { token: "?assertEqual", reading: "EUnit 的相等断言。" },
      { token: "_test_", reading: "EUnit 测试生成器命名后缀。" },
      { token: "rebar3 ct", reading: "运行 Common Test suite。" },
    ],
    example: {
      label: "把折扣边界写进 EUnit",
      code: `-include_lib("eunit/include/eunit.hrl").

discount_test_() ->
  [
    %% 满 10 件打九折
    ?_assertEqual(90.0, discount:price(100, 10)),

    %% 9 件仍按原价
    ?_assertEqual(100, discount:price(100, 9))
  ].`,
      caption: "生成器返回多条测试，任一失败会指出对应断言。",
      output: ["实现符合规则时，两条 EUnit 测试通过。"],
    },
    steps: [
      "两个输入落在规则边界两侧。",
      "EUnit 不需要外部资源，适合并保持快速。",
      "若以后测试文件服务或多进程协作，再考虑 Common Test fixture。",
    ],
    practice: {
      task: "增加数量为 0 的边界测试。",
      starter: `?_assertEqual(____, discount:price(80, ____))`,
      expected: "期待 `discount:price(80,0)` 返回 80。",
      hint: "两个空分别是 80 和 0。",
      answer: `%% 零也是值得保存的边界
?_assertEqual(80, discount:price(80, 0))`,
    },
    check: {
      question: "所有 Erlang 测试都应该使用 Common Test 吗？",
      answer: "不应该。纯函数与小模块先用 EUnit；需要 suite 生命周期和较长集成场景时再用 Common Test。",
    },
    takeaways: [
      "测试工具按场景大小选择。",
      "EUnit 适合快速单元测试。",
      "Common Test 适合带 fixture 的长场景。",
    ],
  },
  {
    number: "25",
    slug: "rebar3-profiles-and-escripts",
    stage: "intermediate",
    title: "把应用磨成命令",
    summary: "用 rebar3 profile 分开环境，再构建可执行 escript。",
    duration: "50 分钟",
    goal: "为应用增加 `main/1`，构建并运行一个问候命令。",
    plain: [
      "profile 让测试、开发等环境使用不同配置，不把临时工具带进正式构建。",
      "escript 把应用代码包装成一个终端入口。入口模块导出 `main/1`，参数是字符串 list。",
      "构建前依次格式化、测试、分析。命令还要处理参数错误并给出用法。",
    ],
    concepts: [
      {
        term: "profile",
        explanation: "rebar3 中按环境覆盖依赖或配置的一组设置。",
      },
      {
        term: "escript",
        explanation: "可由 Erlang 运行时执行的单文件脚本包。",
      },
    ],
    symbols: [
      { token: "{profiles, [...]}.", reading: "在 `rebar.config` 声明环境配置。" },
      { token: "rebar3 as test ...", reading: "在指定 profile 下运行任务。" },
      { token: "rebar3 escriptize", reading: "构建项目 escript。" },
    ],
    example: {
      label: "写一个最小入口模块",
      code: `-module(hello_cli).
-export([main/1]).

%% main/1 接收终端参数 charlist 列表
main([Name]) ->
  io:format("hello, ~ts~n", [Name]);
main(_) ->
  io:format(standard_error, "usage: hello_cli NAME~n", []).`,
      caption: "在 `rebar.config` 设置 escript 名与主应用，运行 `rebar3 escriptize`。",
      output: ["`_build/default/bin/hello_cli A-Qing` 打印 `hello, A-Qing`。"],
    },
    steps: [
      "两个函数子句分别处理一个参数与错误参数。",
      "`~ts` 按 Unicode 文字输出参数。",
      "测试 profile 只放测试专用配置，避免污染默认构建。",
    ],
    practice: {
      task: "补全最小 profile，让测试环境定义宏 `TEST`。",
      starter: `{profiles, [
  {test, [
    {erl_opts, [____]}
  ]}
]}.`,
      expected: "在 test profile 的 erl_opts 中加入 `{d, 'TEST'}`。",
      hint: "编译宏选项使用 tuple `{d, 'TEST'}`。",
      answer: `{profiles, [
  %% 只在 test profile 定义 TEST 宏
  {test, [
    {erl_opts, [{d, 'TEST'}]}
  ]}
]}.`,
    },
    check: {
      question: "escript 是否包含一套完全独立的 Erlang 运行时？",
      answer: "通常不包含。目标机器仍需要可用的 Erlang 运行时。",
    },
    takeaways: [
      "profile 隔离环境配置。",
      "escript 入口是 `main/1`。",
      "构建命令也要处理错误参数。",
    ],
  },
  {
    number: "26",
    slug: "project-brief",
    stage: "project",
    title: "先把小项目圈住",
    summary: "为“行迹”统计命令写任务书，只做读文件与计数。",
    duration: "30 分钟",
    goal: "写清输入、输出、错误和验收例子，再创建 `trail_stats` 应用。",
    plain: [
      "项目只做一件事：读取 UTF-8 文本文件，输出非空行数、词数和字符数。",
      "明确不做目录扫描、不改原文件、不做网页，也不在这里学习 OTP 进程。那些能力留给 BEAM 主线。",
      "先写一个成功例子与两个失败例子。模块和测试都为这张验收表服务。",
    ],
    concepts: [
      {
        term: "项目边界",
        explanation: "这次明确要做和不做的范围。",
      },
      {
        term: "验收例子",
        explanation: "从使用者角度写出的输入、命令和可观察结果。",
      },
    ],
    symbols: [
      { token: "rebar3 new app trail_stats", reading: "创建本阶段使用的 Erlang 应用。" },
      { token: "argv", reading: "命令启动时收到的参数 list。" },
      { token: "exit status", reading: "命令交给系统的成功或失败数字。" },
    ],
    example: {
      label: "先写一页最小任务书",
      code: `%% 输入：一个 UTF-8 文本文件路径
%% 成功：打印 lines、words、chars 三行
%% 失败：路径不存在或内容不是有效 UTF-8

rebar3 new app trail_stats
cd trail_stats
rebar3 eunit`,
      caption: "前三行写进 README，后三行在系统终端运行。",
      output: ["项目创建成功，初始测试任务可以运行。"],
    },
    steps: [
      "用一句话写用户要完成的事，不写内部函数名。",
      "列出成功和失败结果，也列出不做清单。",
      "项目创建后先运行测试，确认环境可用。",
    ],
    practice: {
      task: "补全本项目不做的两项。",
      starter: `不做：
- 扫描整个 ____
- 修改输入 ____`,
      expected: "写出“不扫描整个目录、不修改输入文件”。",
      hint: "两个空是“目录”和“文件”。",
      answer: `不做：
- 扫描整个目录
- 修改输入文件`,
    },
    check: {
      question: "为什么项目开始前要写不做清单？",
      answer: "它守住练习范围，让实现决定都能回到同一目标。",
    },
    takeaways: [
      "项目聚焦一个问题。",
      "先定外部结果，再写内部模块。",
      "不做清单能防止范围失控。",
    ],
  },
  {
    number: "27",
    slug: "parse-real-input",
    stage: "project",
    title: "把真实文件洗干净",
    summary: "读取 UTF-8 binary，验证编码，再整理成非空行。",
    duration: "45 分钟",
    goal: "实现 `trail_parser:read/1`，成功返回清洗后的 binary list。",
    plain: [
      "真实文件可能有空行、不同换行符或坏掉的 UTF-8。解析层先把这些差异收拢。",
      "Parser 只负责从路径得到行 list。它不打印、不退出程序，也不计算统计。",
      "系统文件错误保留原 reason，编码错误统一为 `invalid_utf8`。",
    ],
    concepts: [
      {
        term: "解析层",
        explanation: "把外部原始数据变成项目内部稳定 term 的模块。",
      },
      {
        term: "规范化",
        explanation: "把多种等价输入整理成一种形式。",
      },
    ],
    symbols: [
      { token: "unicode:characters_to_list/1", reading: "验证并解码 Unicode 数据。" },
      { token: "re:split/3", reading: "按多种换行规则切 binary。" },
      { token: "{error, Reason}", reading: "把外部失败交给调用者。" },
    ],
    example: {
      label: "保存为 trail_parser.erl",
      code: `-module(trail_parser).
-export([read/1]).

-spec read(file:filename_all()) -> {ok, [binary()]} | {error, term()}.
read(Path) ->
  case file:read_file(Path) of
    {ok, Text} ->
      parse_utf8(Text);
    {error, Reason} ->
      {error, Reason}
  end.

%% 编码验证和行清洗留在解析模块
parse_utf8(Text) ->
  case unicode:characters_to_list(Text) of
    Chars when is_list(Chars) ->
      Raw = re:split(Text, "\\\\R", [{return, binary}, unicode]),
      Lines = [Clean || Line <- Raw,
                        Clean <- [string:trim(Line)],
                        Clean =/= <<>>],
      {ok, Lines};
    _ ->
      {error, invalid_utf8}
  end.`,
      caption: "加入 `parse_utf8/1` 后记得保持它不在 export 列表中。",
      output: ["有效文件得到 `{ok, Lines}`；无效编码得到 `{error,invalid_utf8}`。"],
    },
    steps: [
      "文件读取先处理磁盘边界。",
      "Unicode 转换成功时返回 list，错误时返回特殊 tuple。",
      "换行切分后去两端空白并丢掉空行。",
    ],
    practice: {
      task: "为两行临时文件写 EUnit 断言。",
      starter: `Path = filename:join("/tmp", "trail_stats_test.txt"),
ok = file:write_file(Path, <<"A\nB\n">>),
?assertEqual(____, trail_parser:read(Path)).`,
      expected: "期待 `{ok,[<<\"A\">>,<<\"B\">>]}`。",
      hint: "成功 tuple 第二项是两个 binary。",
      answer: `Path = filename:join("/tmp", "trail_stats_test.txt"),
ok = file:write_file(Path, <<"A\nB\n">>),
%% Parser 返回清洗后的行
?assertEqual({ok, [<<"A">>, <<"B">>]}, trail_parser:read(Path)).`,
    },
    check: {
      question: "Parser 为什么不直接调用 `io:format` 显示错误？",
      answer: "显示属于 CLI 边界。返回 term 后，测试、服务或命令都能选择自己的处理方式。",
    },
    takeaways: [
      "外部文字先验证，再解析。",
      "Parser 返回数据，不负责显示。",
      "系统错误 reason 可以继续向上交。",
    ],
  },
  {
    number: "28",
    slug: "design-module-api",
    stage: "project",
    title: "公开入口越少越稳",
    summary: "让统计模块只接收行 list，把分词 helper 留在内部。",
    duration: "45 分钟",
    goal: "实现 `trail_stats:count/1`，返回固定三键 map。",
    plain: [
      "模块公开函数越多，调用者越容易依赖内部细节。本项目只公开真正需要的入口。",
      "统计模块接收 Parser 已经清洗的行，不再读文件。行、词、字符规则集中在这里。",
      "内部 helper 不放进 `-export`。返回 map 给字段命名，也便于 CLI 读取。",
    ],
    concepts: [
      {
        term: "公开 API",
        explanation: "模块外允许依赖的 name/arity 与返回 term。",
      },
      {
        term: "私有 helper",
        explanation: "未导出、只帮助当前模块完成工作的函数。",
      },
    ],
    symbols: [
      { token: "-export([count/1]).", reading: "只公开一个统计入口。" },
      { token: "maps:get/2", reading: "CLI 可按键读取统计结果。" },
      { token: "string:lexemes/2", reading: "按给定分隔字符把 Unicode 文字拆成词。" },
    ],
    example: {
      label: "保存为 trail_stats.erl",
      code: `-module(trail_stats).
-export([count/1]).

%% 对外只开放 count/1
count(Lines) ->
  #{
    lines => length(Lines),
    words => lists:sum([word_count(Line) || Line <- Lines]),
    chars => char_count(Lines)
  }.

word_count(Line) ->
  length(string:lexemes(Line, " \t")).

char_count(Lines) ->
  Text = iolist_to_binary(Lines),
  length(unicode:characters_to_list(Text)).`,
      caption: "本项目约定字符数不包含换行，词由 Unicode 空白分隔。",
      output: ["`trail_stats:count([<<\"hello beam\">>, <<\"again\">>]).` 返回行 2、词 3、字符 15。"],
    },
    steps: [
      "公开函数返回固定三键 map。",
      "两个 helper 未导出，可在模块内部修改。",
      "先合并 binary 再按 Unicode 字符计数。",
    ],
    practice: {
      task: "写出空输入的期待 map。",
      starter: `?assertEqual(
  #{lines => ____, words => ____, chars => ____},
  trail_stats:count([])
).`,
      expected: "三个计数都为 0。",
      hint: "空 list 没有行、词和字符。",
      answer: `%% 空输入是公开 API 的重要边界
?assertEqual(
  #{lines => 0, words => 0, chars => 0},
  trail_stats:count([])
).`,
    },
    check: {
      question: "为什么 `word_count/1` 不放进 export 列表？",
      answer: "它只是 `count/1` 的实现细节，调用者不需要依赖分词过程。",
    },
    takeaways: [
      "公开 API 要小而明确。",
      "模块之间传稳定 term。",
      "内部 helper 不轻易导出。",
    ],
  },
  {
    number: "29",
    slug: "types-docs-and-tests",
    stage: "project",
    title: "把约定留在源码旁",
    summary: "补 EDoc、typespec、EUnit 与跨模块成功测试。",
    duration: "50 分钟",
    goal: "让 Parser 与统计入口都有文档类型，并覆盖成功和失败路径。",
    plain: [
      "代码能运行，还需要把约定留给以后。EDoc 注释说明责任，typespec 写 term 形状，测试保存例子。",
      "文档不要逐行抄实现。说清输入、输出、编码和错误边界就够。",
      "单元测试守一个模块；集成测试从临时文件走到统计结果，检查两段接口是否接得上。",
    ],
    concepts: [
      {
        term: "EDoc",
        explanation: "从 Erlang 源码注释与 specs 生成 API 文档的工具。",
      },
      {
        term: "集成测试",
        explanation: "让多个模块一起运行，检查边界连接。",
      },
    ],
    symbols: [
      { token: "%% @doc", reading: "为后面的公开函数写 EDoc 说明。" },
      { token: "-type stats() :: ...", reading: "为统计 map 起类型名。" },
      { token: "rebar3 edoc", reading: "生成项目 API 文档。" },
    ],
    example: {
      label: "为公开统计入口补约定",
      code: `-module(trail_stats).
-export([count/1]).

-type stats() :: #{
  lines := non_neg_integer(),
  words := non_neg_integer(),
  chars := non_neg_integer()
}.
-export_type([stats/0]).

%% @doc 统计已经清洗的 UTF-8 binary 行。
%% 换行不计入 chars。
-spec count([binary()]) -> stats().
count(Lines) ->
  %% 返回值与 stats() 的三个必需键一致
  #{
    lines => length(Lines),
    words => lists:sum([
      length(string:lexemes(Line, " \t")) || Line <- Lines
    ]),
    chars => length(unicode:characters_to_list(iolist_to_binary(Lines)))
  }.`,
      caption: "完整模块让 EDoc、Dialyzer 与调用者看到同一份约定。",
      output: ["`rebar3 edoc` 可生成公开 `count/1` 与 `stats/0` 文档。"],
    },
    steps: [
      "map type 用 `:=` 表示三项必须存在。",
      "导出类型让其他模块的 spec 可以引用 `trail_stats:stats()`。",
      "为不存在文件补 error 测试，为正常文件补端到端测试。",
    ],
    practice: {
      task: "补全 Parser 公开 spec 的成功类型。",
      starter: `-spec read(file:filename_all()) ->
  {ok, ____} | {error, term()}.`,
      expected: "成功值是 binary list，即 `[binary()]`。",
      hint: "方括号表示元素类型组成的 list。",
      answer: `%% 成功时返回清洗后的行 list
-spec read(file:filename_all()) ->
  {ok, [binary()]} | {error, term()}.`,
    },
    check: {
      question: "文档是否应该写出 `word_count/1` 每一步怎样实现？",
      answer: "不必。它是私有细节；公开文档重点是 `count/1` 的输入输出和计数规则。",
    },
    takeaways: [
      "文档讲边界和约定。",
      "typespec 覆盖真实返回分支。",
      "集成测试检查模块之间的连接。",
    ],
  },
  {
    number: "30",
    slug: "package-and-observe",
    stage: "project",
    title: "打包，也留下线索",
    summary: "构建 escript，用 Logger 记录失败类别和读取耗时。",
    duration: "50 分钟",
    goal: "实现 CLI，成功打印三项统计，失败写清原因并非零退出。",
    plain: [
      "命令输出给使用者看，日志给维护者查问题。成功结果、错误提示和诊断线索要各守位置。",
      "Logger 记录路径、失败类别和耗时，不记录完整文件内容。",
      "只有 CLI 最外层决定退出状态。Parser 和统计模块继续返回普通 term。",
    ],
    concepts: [
      {
        term: "可观察性",
        explanation: "通过日志等外部信号理解程序运行与失败。",
      },
      {
        term: "退出状态",
        explanation: "0 通常表示成功，非 0 表示命令失败。",
      },
    ],
    symbols: [
      { token: "logger:info/error", reading: "记录不同级别的运行线索。" },
      { token: "timer:tc/1", reading: "返回函数耗时与结果。" },
      { token: "halt/1", reading: "从 CLI 最外层以指定状态结束运行时。" },
    ],
    example: {
      label: "保存为 trail_cli.erl",
      code: `-module(trail_cli).
-export([main/1]).

main([Path]) ->
  {Micros, Result} = timer:tc(fun() -> trail_parser:read(Path) end),
  logger:info("read path=~tp duration_us=~B", [Path, Micros]),

  %% CLI 把内部 term 翻译为终端输出
  case Result of
    {ok, Lines} ->
      print(trail_stats:count(Lines));
    {error, Reason} ->
      logger:error("read_failed reason=~tp", [Reason]),
      io:format(standard_error, "cannot read input~n", []),
      halt(1)
  end.

print(#{lines := Lines, words := Words, chars := Chars}) ->
  %% 三项结果保持固定顺序，方便人和脚本阅读
  io:format("lines=~B~nwords=~B~nchars=~B~n", [Lines, Words, Chars]),
  ok.`,
      caption: "`print/1` 只负责显示；在 rebar.config 中配置 escript 主应用。",
      output: ["成功打印 lines、words、chars。", "失败打印短消息、记录 reason，并以状态 1 退出。"],
    },
    steps: [
      "计时函数同时返回微秒数和 Parser 结果。",
      "CLI 调用已有模块，不复制读取或统计逻辑。",
      "日志避开文件正文，减少隐私与体积风险。",
    ],
    practice: {
      task: "补全交付前的检查与构建命令。",
      starter: `rebar3 ____
rebar3 dialyzer
rebar3 ____`,
      expected: "先运行 EUnit，再运行 Dialyzer，最后 escriptize。",
      hint: "两个空分别是 `eunit` 与 `escriptize`。",
      answer: `%% 在系统终端运行
rebar3 eunit
rebar3 dialyzer
rebar3 escriptize`,
    },
    check: {
      question: "为什么不把完整输入文件写进日志？",
      answer: "文件可能很大或含隐私；路径、原因与耗时通常足够定位问题。",
    },
    takeaways: [
      "CLI 决定显示与退出状态。",
      "日志只记录必要线索。",
      "测试、分析通过后再打包。",
    ],
  },
  {
    number: "31",
    slug: "project-acceptance",
    stage: "project",
    title: "按最初任务交卷",
    summary: "从干净终端跑验收表，确认功能、错误和交付说明。",
    duration: "45 分钟",
    goal: "让成功、空文件、缺失文件和自动检查全部得到预期结果。",
    plain: [
      "最后不再添功能。拿出第 26 课任务书，从用户入口逐项检查。",
      "验收不能绕过 escript 直接调用内部模块。错误文字、日志与退出状态都属于结果。",
      "在 README 记录构建命令、Erlang/OTP 版本和已知限制。把一个小闭环真正走完。",
    ],
    concepts: [
      {
        term: "验收",
        explanation: "按编码前约定的外部标准判断项目是否完成。",
      },
      {
        term: "可重复构建",
        explanation: "换到干净环境，照文档仍能得到同样产物。",
      },
    ],
    symbols: [
      { token: "$?", reading: "多数 shell 中读取上一条命令退出状态。" },
      { token: "rebar3 eunit", reading: "运行单元与集成 EUnit 测试。" },
      { token: "_build/default/bin", reading: "默认 profile 的 escript 常见输出目录。" },
    ],
    example: {
      label: "运行最终验收表",
      code: `# 1. 自动检查与构建
rebar3 eunit
rebar3 dialyzer
rebar3 escriptize

# 2. 成功文件：核对三项统计
_build/default/bin/trail_stats fixtures/poem.txt

# 3. 缺失文件：核对错误与非零状态
_build/default/bin/trail_stats fixtures/missing.txt
echo $?`,
      caption: "再补空文件用例，把实际结果写进 README。",
      output: ["测试与分析通过。", "成功文件输出三项数字。", "缺失文件显示短错误，退出状态不是 0。"],
    },
    steps: [
      "从新终端照 README 构建，发现隐藏环境步骤就补文档。",
      "逐条保存实际输出，与第 26 课预期对照。",
      "只修验收失败，新想法放进后续清单。",
    ],
    practice: {
      task: "写出空文件验收结果。",
      starter: `给定：一个空 UTF-8 文件
运行：trail_stats empty.txt
期待：lines=____, words=____, chars=____`,
      expected: "三项都为 0，命令以状态 0 退出。",
      hint: "空文件没有行、词和字符。",
      answer: `给定：一个空 UTF-8 文件
运行：trail_stats empty.txt
期待：lines=0, words=0, chars=0，退出状态为 0`,
    },
    check: {
      question: "验收前发现一个新功能点，要马上塞进去吗？",
      answer: "先记入后续清单。当前只修任务书范围内的失败。",
    },
    takeaways: [
      "验收标准应提前写下。",
      "从真正用户入口检查项目。",
      "完成一个小闭环，再走 BEAM 主线。",
    ],
  },
];

export const basicPaths: BasicPath[] = [
  {
    id: "elixir",
    language: "Elixir",
    title: "Elixir 从零开始",
    shortTitle: "Elixir 从零",
    subtitle: "四段路：敢运行、能写模块、接住真实输入、交付作品",
    description:
      "31 节短课分成 Scratch、Foundation、Intermediate 和 Project。每课先跑一个完整例子，再拆语法、改输入、做练习。Foundation 完成后即可进入 BEAM；也可以继续做完单语言项目。",
    shell: "IEx",
    shellCommand: "iex",
    prerequisites: [
      "会打开终端；如果不会，先照安装页一步一步做。",
      "不要求学过其他编程语言。",
      "每次准备 15–35 分钟，只学一课。",
    ],
    lessons: elixirLessons,
    bridge: {
      title: "下一步：让作品面对并发与故障",
      description:
        "你已经写过模块、文件处理、测试和命令行作品。接着去起跑线做一次分层诊断，再沿 BEAM 主线处理消息、容量与恢复。",
      href: "/learn/start-line",
      label: "走上 BEAM 起跑线",
    },
    references: [
      {
        label: "Elixir School 中文 · 基础",
        href: "https://elixirschool.com/zh-hans/lessons/basics",
      },
      {
        label: "Elixir 官方 · Basic types",
        href: "https://hexdocs.pm/elixir/basic-types.html",
      },
      {
        label: "Elixir 官方 · Anonymous functions",
        href: "https://hexdocs.pm/elixir/anonymous-functions.html",
      },
    ],
  },
  {
    id: "erlang",
    language: "Erlang",
    title: "Erlang 从零开始",
    shortTitle: "Erlang 从零",
    subtitle: "四段路：敢运行、能写模块、接住真实输入、交付作品",
    description:
      "31 节短课分成 Scratch、Foundation、Intermediate 和 Project。每课先跑一个完整例子，再拆 term、符号和步骤，最后改一次。Foundation 完成后即可进入 BEAM；也可以继续做完单语言项目。",
    shell: "erl",
    shellCommand: "erl",
    prerequisites: [
      "会打开终端；如果不会，先照安装页一步一步做。",
      "不要求先学 Elixir，也不要求学过其他语言。",
      "每次准备 15–40 分钟，只学一课。",
    ],
    lessons: erlangLessons,
    bridge: {
      title: "下一步：让作品面对并发与故障",
      description:
        "你已经写过模块、文件处理、测试和命令行作品。接着去起跑线做一次分层诊断，再沿 BEAM 主线处理消息、OTP 与监督树。",
      href: "/learn/start-line",
      label: "走上 BEAM 起跑线",
    },
    references: [
      {
        label: "Erlang 官方 · Sequential Programming",
        href: "https://www.erlang.org/doc/system/seq_prog.html",
      },
      {
        label: "Erlang 官方 · Data Types",
        href: "https://www.erlang.org/doc/system/data_types.html",
      },
      {
        label: "Erlang 官方 · Modules",
        href: "https://www.erlang.org/doc/system/modules.html",
      },
    ],
  },
];

export const basicPathStats = {
  paths: basicPaths.length,
  lessons: basicPaths.reduce((total, path) => total + path.lessons.length, 0),
};

export function getBasicPath(id: string) {
  return basicPaths.find((path) => path.id === id);
}

export function getBasicLesson(path: BasicPath, slug: string) {
  return path.lessons.find((lesson) => lesson.slug === slug);
}

export function getAdjacentBasicLessons(path: BasicPath, slug: string) {
  const index = path.lessons.findIndex((lesson) => lesson.slug === slug);

  return {
    previous: index > 0 ? path.lessons[index - 1] : undefined,
    next:
      index >= 0 && index < path.lessons.length - 1
        ? path.lessons[index + 1]
        : undefined,
  };
}
