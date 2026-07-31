export type BasicPathId = "elixir" | "erlang";

export type BasicReference = {
  label: string;
  href: string;
};

export type BasicLesson = {
  number: string;
  slug: string;
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
    title: "先让代码说话",
    summary: "打开 IEx，输入表达式，分清代码、结果和报错。",
    duration: "15 分钟",
    goal: "你能打开 IEx，运行一行代码，并指出哪一行是输入、哪一行是结果。",
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
    title: "先认六种值",
    summary: "从整数、浮点数、布尔值、nil、atom 和字符串开始。",
    duration: "20 分钟",
    goal: "你能看出常见值属于哪种类型，并分清 `:ok` 和 `\"ok\"`。",
    plain: [
      "值是代码正在处理的东西。年龄可以是整数，身高可以是小数，名字可以是字符串。",
      "类型说明一种值能参加哪些操作。数字能相加，字符串能拼接。类型不同，不代表谁更高级，只代表用途不同。",
      "`:ok` 是 atom，常用作标签；`\"ok\"` 是字符串，是两个字母组成的文字。它们看起来相近，却不是同一种值。",
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
    ],
    example: {
      label: "在 IEx 里认识值",
      code: `# 整数没有小数点
12

# 浮点数带小数点
12.5

# 布尔值只回答真或假
true

# nil 表示没有值
nil

# atom 像一枚固定标签
:ok

# 双引号包住字符串
"你好，阿青"

# atom 和字符串不是同一种值
:ok == "ok"`,
      caption: "一行只认一种值。先看外形，再看 IEx 给出的结果。",
      output: [
        "前六段依次得到整数、浮点数、布尔值、`nil`、atom 和字符串。",
        "`:ok` 原样返回；`\"你好，阿青\"` 也原样返回。",
        "最后的比较返回 `false`，因为 atom 和字符串不是同一种值。",
      ],
    },
    steps: [
      "`12` 和 `12.5` 都是数字；有没有小数点，让它们分成整数和浮点数。",
      "`true`、`false` 用来表示真假；`nil` 表示没有值。三者不要混成一类。",
      "冒号开头的是 atom，双引号包住的是字符串。因此 `:ok` 不等于 `\"ok\"`。",
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
    title: "把值装起来",
    summary: "用 list、tuple 和 map 收好一组数据。",
    duration: "25 分钟",
    goal: "你能根据用途选择 list、tuple 或 map，并取出其中一个值。",
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
    title: "给值起名字",
    summary: "认识绑定、不变数据和几种常用运算。",
    duration: "20 分钟",
    goal: "你能给值起名，理解重新绑定，并选对数字、字符串和比较运算符。",
    plain: [
      "名字让代码容易读。`price = 8` 可以读成“名字 price 现在指向 8”。",
      "Elixir 的数据不会被原地改掉。`price + 2` 产生新值，原来的数字 `8` 没变。",
      "同一个名字可以重新绑定到新值。这看似修改变量，其实是让名字改指向另一个值。",
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
        term: "比较",
        explanation: "用 `==`、`>` 等运算符提出一个真假问题。",
      },
    ],
    symbols: [
      { token: "=", reading: "这里先读作“把右边的值绑定给左边的名字”。下一课会看到它也是匹配运算符。" },
      { token: "<>", reading: "连接两个字符串。" },
      { token: "==", reading: "比较左右两边是否相等；不要少写一个等号。" },
    ],
    example: {
      label: "名字会换指向，值不会被改写",
      code: `# price 先指向数字 8
price = 8

# old_price 记住原来的指向
old_price = price

# price 重新绑定到新数字 10
price = price + 2

# 两段文字用 <> 连接
label = "票价：" <> Integer.to_string(price)

# 比较会返回 true 或 false
{old_price, price, label, price > old_price}`,
      caption: "`price` 换了指向；`old_price` 仍指向原来的 8。",
      output: ["得到 `{8, 10, \"票价：10\", true}`。", "数字 8 没被改写；只是 `price` 改为指向 10。", "`price > old_price` 是一个真假问题。"],
    },
    steps: [
      "`old_price = price` 先让另一个名字记住 8。",
      "`price = price + 2` 先用旧的 8 算出 10，再让 `price` 重新绑定。",
      "`Integer.to_string(price)` 把数字变成字符串，才能用 `<>` 与文字连接。",
    ],
    practice: {
      task: "一只纸鸢原来飞 12 米，又升高 5 米。保留原高度，并算出新高度。",
      starter: `# 原来的高度
height = 12

# 用 height 算出新值
new_height = ____

# 比较新高度是否超过 15
{height, new_height, ____}`,
      expected: "得到 `{12, 17, true}`。",
      hint: "新高度是 `height + 5`。比较“超过”使用 `>`。",
      answer: `# 原值仍然是 12
height = 12

# 加法产生新值 17
new_height = height + 5

# 返回原值、新值和比较结果
{height, new_height, new_height > 15}`,
    },
    check: {
      question: "`=` 和 `==` 做的是同一件事吗？",
      answer: "不是。`==` 比较两个值；`=` 会进行模式匹配，也可以建立绑定。",
    },
    takeaways: [
      "名字指向值，方便后面的代码使用。",
      "计算产生新值，不会把旧值原地改掉。",
      "连接字符串用 `<>`，比较相等用 `==`。",
    ],
  },
  {
    number: "05",
    slug: "pattern-matching",
    title: "让形状对上",
    summary: "把 `=` 当作匹配，拆开 tuple、list 和 map。",
    duration: "25 分钟",
    goal: "你能读懂左边的模式，并从一个集合中拆出需要的值。",
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
      code: `# 固定标签 :ok 必须对上
# 下划线表示第三个值不需要保存
{:ok, score, _} = {:ok, 92, :midterm}

# 拆出 list 的第一个元素和其余部分
[first | rest] = ["桃", "李", "杏"]

# map 模式只写需要的 key
%{name: name} = %{name: "阿青", age: 12}

# 一次查看三个新绑定
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
    title: "用 case 做选择",
    summary: "让一个值依次匹配分支，再用 guard 补充条件。",
    duration: "25 分钟",
    goal: "你能为两三种输入写出清楚分支，并知道什么时候用 `case`。",
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
      code: `# score 是这次要判断的值
score = 76

# case 从上到下寻找第一个匹配分支
message =
  case score do
    value when value >= 90 -> "很稳"
    value when value >= 60 -> "过关"
    _value -> "再试一次"
  end

# 查看选中的结果
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
    title: "函数名后的 /1",
    summary: "从输入和输出开始，读懂 `String.trim/1`。",
    duration: "30 分钟",
    goal: "你能解释 `String.trim/1` 的每一部分，并分清函数名称和函数调用。",
    plain: [
      "函数接收输入，做一件事，再返回输出。`String.trim(\"  松  \")` 接收一段文字，返回去掉两端空白的新文字。",
      "文档常写 `String.trim/1`。斜杠后的 `1` 叫 arity，中文常说“参数个数”。它表示这个函数接收 1 个参数。",
      "`String.trim/1` 是文档中指认函数的完整标识，不是调用。函数名是 `trim`；真正调用时把值放进括号：`String.trim(text)`。",
    ],
    concepts: [
      {
        term: "参数",
        explanation: "调用函数时交进去的值。`trim(text)` 中的 `text` 是一个参数。",
      },
      {
        term: "返回值",
        explanation: "函数做完后交回来的值。`trim/1` 返回去掉两端空白后的新字符串。",
      },
      {
        term: "arity",
        explanation: "函数接收的参数个数。`String.trim/1` 的 arity 是 1，`String.replace/3` 的 arity 是 3。",
      },
    ],
    symbols: [
      { token: "String.trim/1", reading: "`String` 模块、`trim` 函数、1 个参数。这是在指认函数。" },
      { token: "String.trim(text)", reading: "把 `text` 作为参数，真正调用函数。" },
      { token: "fn x -> ... end", reading: "创建一个没有名字的匿名函数。" },
      { token: "\"你好，#{name}\"", reading: "`#{...}` 把花括号中表达式的结果放进字符串。" },
    ],
    example: {
      label: "先调用，再认出完整名字",
      code: `# text 两端各有两个空格
text = "  松  "

# 括号里放参数：这是一次函数调用
clean = String.trim(text)

# 匿名函数也接收输入并返回结果
double = fn number -> number * 2 end
twice = double.(6)

# 一次查看两个结果
{clean, twice}`,
      caption: "`String.trim/1` 指认函数；`String.trim(text)` 才是在调用。",
      output: ["`clean` 是 `\"松\"`。", "`double.(6)` 返回 `12`。", "匿名函数调用时，函数名和括号之间有一个点。"],
    },
    steps: [
      "`String` 是模块。模块把相关函数收在一起。",
      "`trim` 是函数名。`/1` 说明它接收一个参数，但调用时不写 `/1`。",
      "`fn number -> number * 2 end` 创建匿名函数。调用匿名函数要写 `double.(6)`。",
    ],
    practice: {
      task: "写一个匿名函数 `greet`，接收一个名字，返回 `\"你好，名字\"`。",
      starter: `# 在箭头左边接住一个参数
greet = fn ____ -> "你好，#{____}" end

# 调用匿名函数
greet.("小满")`,
      expected: "得到 `\"你好，小满\"`。",
      hint: "两处可以使用同一个名字 `name`。",
      answer: `# name 接住调用时传入的字符串
greet = fn name -> "你好，#{name}" end

# 匿名函数用 .() 调用
greet.("小满")`,
    },
    check: {
      question: "`trim/1` 里的 `/1` 是除以 1 吗？",
      answer: "不是。这里的 `/1` 表示函数接收 1 个参数。它与数学除法无关。",
    },
    takeaways: [
      "函数把输入变成输出。",
      "`模块.函数/参数个数` 用来准确指认一个函数。",
      "指认函数写 `/1`，真正调用写 `(参数)`。",
    ],
  },
  {
    number: "08",
    slug: "capture-enum-pipe",
    title: "拆开 &1 和管道",
    summary: "先写完整匿名函数，再读 capture、Enum 和 `|>`。",
    duration: "35 分钟",
    goal: "你能把 `&(&1 * 2)` 还原成完整匿名函数，并读懂一条短管道。",
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
      task: "把 `[2, 3, 4]` 每个数字加 1。先写完整匿名函数，再改成 `&1` 简写。",
      starter: `# 第一遍：写完整名字
Enum.map([2, 3, 4], fn number -> ____ end)

# 第二遍：把收到的第一个参数写成 &1
Enum.map([2, 3, 4], &(____))`,
      expected: "两行都得到 `[3, 4, 5]`。",
      hint: "完整写法是 `number + 1`；短写法只是把 `number` 换成 `&1`。",
      answer: `# 长写法先把输入的名字写清楚
Enum.map([2, 3, 4], fn number -> number + 1 end)

# 短写法里 &1 表示第一个参数
Enum.map([2, 3, 4], &(&1 + 1))`,
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
    title: "把代码放进项目",
    summary: "写一个模块，认识 def、文件和 Mix，再走向 BEAM。",
    duration: "35 分钟",
    goal: "你能读懂一个最小模块，并知道 `mix new`、`mix test` 各做什么。",
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
];

const erlangLessons: BasicLesson[] = [
  {
    number: "01",
    slug: "meet-erl",
    title: "先打开 erl",
    summary: "在 Erlang shell 里运行表达式，记住句末的点。",
    duration: "15 分钟",
    goal: "你能打开 Erlang shell，运行表达式，并记得用句点结束。",
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
    title: "先认常见 term",
    summary: "认识 number、atom、tuple、list 和 map。",
    duration: "25 分钟",
    goal: "你能看出常见 Erlang term 的类型，并分清 atom 和文字。",
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
      code: `%% 整数和浮点数是两种数字
{is_integer(12), is_float(12.5)}.

%% true 和 ok 都是 atom
{is_atom(true), is_atom(ok)}.

%% tuple 常把标签和数据放在一起
{ok, 42}.

%% map 用 key 说明每个值的意思
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
    title: "分清两种文字",
    summary: "看懂 charlist、binary，以及中文的 UTF-8 写法。",
    duration: "25 分钟",
    goal: "你能分清 `\"cat\"` 与 `<<\"cat\">>`，并知道新代码何时优先用 binary。",
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
    title: "变量只接一次",
    summary: "认识大写变量、单次赋值和模式匹配。",
    duration: "25 分钟",
    goal: "你能分清 atom 与变量，并用匹配从 tuple 或 map 中取值。",
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
      code: `%% 只在 shell 中使用：清掉前几课留下的变量
f().

%% 标签 ok 必须对上，Score 接住 92
{ok, Score} = {ok, 92}.

%% map 模式只取需要的 key
#{name := Name} = #{name => <<"A-Qing">>, age => 12}.

%% 已绑定变量只能再匹配同一个值
92 = Score.

%% 查看两个变量
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
    title: "拆开一列值",
    summary: "用 `[Head | Tail]` 读懂 list 的头和尾。",
    duration: "25 分钟",
    goal: "你能把非空 list 拆成第一个元素和剩余 list，并识别空 list。",
    plain: [
      "list 是一串有顺序的值。`[peach, plum, apricot]` 的第一个元素是头，剩余 `[plum, apricot]` 是尾。",
      "Erlang 写成 `[Head | Tail]`。竖线不是“或者”，它把 list 的头与尾分开。",
      "空 list `[]` 没有头。用 `[Head | Tail]` 匹配空 list 会失败。",
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
    ],
    symbols: [
      { token: "[ ]", reading: "包住 list。" },
      { token: "|", reading: "在 list 模式中分开头和尾。" },
      { token: "[New | Old]", reading: "把一个新元素放到已有 list 的最前面。" },
    ],
    example: {
      label: "先拆，再放回一个新值",
      code: `%% Fruits 是三个 atom 组成的 list
Fruits = [peach, plum, apricot].

%% Head 接第一个，Tail 接剩余 list
[Head | Tail] = Fruits.

%% 在 Tail 前放入一个新 atom
NewFruits = [pear | Tail].

%% 一次查看拆分结果
{Head, Tail, NewFruits}.`,
      caption: "竖线右边必须是 list，结果才是正常 list。",
      output: ["`Head` 是 `peach`。", "`Tail` 是 `[plum, apricot]`。", "`NewFruits` 是 `[pear, plum, apricot]`。"],
    },
    steps: [
      "`[Head | Tail] = Fruits` 只适用于至少有一个元素的 list。",
      "`Tail` 不是“最后一个元素”，而是“除第一个外的整个 list”。",
      "`[pear | Tail]` 创建新 list，没有修改原来的 `Tail`。",
    ],
    practice: {
      task: "从 `[red, green, blue]` 中取出第一个颜色和剩余颜色。",
      starter: `%% 写出头尾模式
[____ | ____] = [red, green, blue].

%% 查看两个变量
{First, Rest}.`,
      expected: "得到 `{red, [green, blue]}`。",
      hint: "两个变量分别叫 `First` 和 `Rest`。",
      answer: `%% First 接头，Rest 接尾
[First | Rest] = [red, green, blue].

%% Rest 仍然是 list
{First, Rest}.`,
    },
    check: {
      question: "`[Head | Tail] = []` 能成功吗？",
      answer: "不能。空 list 没有第一个元素，所以这个模式无法匹配。",
    },
    takeaways: [
      "`[Head | Tail]` 拆开非空 list。",
      "`Tail` 是剩余 list，不只是最后一个值。",
      "在 list 前添加元素会产生新 list。",
    ],
  },
  {
    number: "06",
    slug: "functions-and-arity",
    title: "读懂 trim/1",
    summary: "认识模块调用、函数参数、arity 和匿名函数。",
    duration: "30 分钟",
    goal: "你能解释 `string:trim/1` 的每一部分，并区分指认函数和调用函数。",
    plain: [
      "函数接收输入，返回输出。`string:trim(Text)` 接收一段文字，返回去掉两端空白的新文字。",
      "文档里的 `string:trim/1` 表示：`string` 模块、`trim` 函数、1 个参数。`/1` 叫 arity，不是除法，也不是一条能直接粘进 shell 的调用。",
      "实际调用时用冒号连接模块和函数，再把参数放进括号：`string:trim(Text)`。这时不写 `/1`。",
    ],
    concepts: [
      {
        term: "模块",
        explanation: "把相关函数收在一起。`string` 模块提供处理文字的函数。",
      },
      {
        term: "参数",
        explanation: "调用函数时放进括号的值。",
      },
      {
        term: "arity",
        explanation: "函数接收的参数个数。`trim/1` 的 arity 是 1。",
      },
    ],
    symbols: [
      { token: "string:trim/1", reading: "`string` 模块、`trim` 函数、1 个参数。这是文档中的完整标识，不能直接运行。" },
      { token: "string:trim(Text)", reading: "把变量 `Text` 交给函数。这是在调用。" },
      { token: "fun(X) -> ... end", reading: "创建一个匿名函数，`X` 接住输入。" },
    ],
    example: {
      label: "调用命名函数和匿名函数",
      code: `%% Text 是一个两端有空格的 binary
Text = <<"  river  ">>.

%% 冒号连接模块与函数
Clean = string:trim(Text).

%% fun 创建匿名函数
Double = fun(Number) -> Number * 2 end.
Twice = Double(6).

%% 查看两个结果
{Clean, Twice}.`,
      caption: "`string:trim/1` 是名称；`string:trim(Text)` 是调用。",
      output: ["`Clean` 是 `<<\"river\">>`。", "`Double(6)` 返回 `12`。", "Erlang 调用匿名函数时直接写 `Double(6)`。"],
    },
    steps: [
      "`string` 是模块名，`trim` 是函数名，冒号 `:` 用于跨模块调用。",
      "`string:trim/1` 是文档中的函数身份，不是一条调用。当前模块的导出列表则写本模块函数，如 `trim/1`。",
      "`fun(Number) -> Number * 2 end` 创建匿名函数；变量 `Double` 指向这个函数。",
    ],
    practice: {
      task: "写一个匿名函数 `Greet`，接收 binary 名字，返回 `{hello, Name}`。",
      starter: `%% 参数变量写在括号里
Greet = fun(____) -> {hello, ____} end.

%% 调用匿名函数
Greet(<<"Xiao-Man">>).`,
      expected: "得到 `{hello, <<\"Xiao-Man\">>}`。",
      hint: "两处使用同一个大写变量 `Name`。",
      answer: `%% Name 接住调用时传入的 binary
Greet = fun(Name) -> {hello, Name} end.

%% 匿名函数直接用变量名加括号调用
Greet(<<"Xiao-Man">>).`,
    },
    check: {
      question: "`string:trim/1` 里的 `/1` 是除以 1 吗？",
      answer: "不是。它表示 `trim` 接收 1 个参数。真正调用写成 `string:trim(Text)`。",
    },
    takeaways: [
      "`模块:函数/参数个数` 准确指认 Erlang 函数。",
      "跨模块调用使用冒号。",
      "`fun ... end` 创建匿名函数。",
    ],
  },
  {
    number: "07",
    slug: "clauses-and-guards",
    title: "用 case 选一条路",
    summary: "让一个值依次匹配分支，再用 guard 补充条件。",
    duration: "30 分钟",
    goal: "你能从上到下阅读 `case` 分支，并写出一个兜底情况。",
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
      code: `%% 清掉前几课留下的变量，便于反复修改 Score
f().

%% Score 是要判断的值
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
    title: "让函数继续走",
    summary: "用空 list 停下，用头尾模式处理下一项。",
    duration: "35 分钟",
    goal: "你能在 shell 运行一个处理 list 的两子句递归函数，并指出它在哪里停下。",
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
    title: "把代码放进模块",
    summary: "把函数存进 `.erl` 文件，编译运行，并望见 BEAM 主线。",
    duration: "40 分钟",
    goal: "你能读懂最小 Erlang 模块，编译它，并说出 `name/arity` 为什么出现在导出列表。",
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
      "导出列表用 `name/arity` 指认函数。",
      "学完语法后，再进入 BEAM 的进程与消息。",
    ],
  },
];

export const basicPaths: BasicPath[] = [
  {
    id: "elixir",
    language: "Elixir",
    title: "Elixir 从零开始",
    shortTitle: "Elixir 从零",
    subtitle: "先看懂值和函数，再读 &1 与管道",
    description:
      "从 IEx 和六种常见值开始。每课只加几个新符号。第 8 课才会出现 &1；在那之前，你已经会写它的完整形式。",
    shell: "IEx",
    shellCommand: "iex",
    prerequisites: [
      "会打开终端；如果不会，先照安装页一步一步做。",
      "不要求学过其他编程语言。",
      "每次准备 15–35 分钟，只学一课。",
    ],
    lessons: elixirLessons,
    bridge: {
      title: "下一步：把语法放进 BEAM",
      description:
        "你已经能读值、模式、函数、管道和模块。接着去“起跑线”，分清 Elixir、Erlang、Mix、OTP 与 BEAM 各自做什么。",
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
    subtitle: "从 term 和句点开始，慢慢走到模块",
    description:
      "从 erl shell、term 和文字类型开始。先分清 atom 与变量，再学习匹配、函数子句和递归。最后写出第一个模块。",
    shell: "erl",
    shellCommand: "erl",
    prerequisites: [
      "会打开终端；如果不会，先照安装页一步一步做。",
      "不要求先学 Elixir，也不要求学过其他语言。",
      "每次准备 15–40 分钟，只学一课。",
    ],
    lessons: erlangLessons,
    bridge: {
      title: "下一步：看看进程怎样合作",
      description:
        "你已经能读 term、匹配、函数子句、递归和模块。接着去“起跑线”，再沿 BEAM 主线学习消息、OTP 与监督树。",
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
