import type { BasicLesson, BasicPath } from "../basic-path-data";

type ExtendedLessonSeed = {
  number: string;
  slug: string;
  stage: "foundation" | "intermediate" | "project";
  title: string;
  summary: string;
  goal: string;
  concepts: BasicLesson["concepts"];
  symbols: BasicLesson["symbols"];
  code: string;
  output: string[];
  practice: BasicLesson["practice"];
  check: BasicLesson["check"];
  takeaways: string[];
};

function buildExtendedLesson(seed: ExtendedLessonSeed): BasicLesson {
  return {
    number: seed.number,
    slug: seed.slug,
    stage: seed.stage,
    title: seed.title,
    summary: seed.summary,
    duration: seed.stage === "project" ? "35 minutes" : "25 minutes",
    goal: seed.goal,
    plain: [
      "Run the example first. Predict one result, then change one input and run it again.",
      seed.concepts[0].explanation,
      seed.concepts[1]?.explanation ?? seed.summary,
    ],
    concepts: seed.concepts,
    symbols: seed.symbols,
    example: {
      label: "Run this first",
      code: seed.code,
      caption: "Run it once, change one input, and compare the new result.",
      output: seed.output,
    },
    steps: seed.symbols.map(
      ({ token, reading }) => `Read \`${token}\`: ${reading}`,
    ),
    practice: seed.practice,
    check: seed.check,
    takeaways: seed.takeaways,
  };
}

const elixirLessonsEn: BasicLesson[] = [
  {
    number: "01",
    slug: "meet-iex",
    stage: "scratch",
    title: "Let the code speak",
    summary: "Open IEx, enter an expression, and tell code, results, and errors apart.",
    duration: "15 minutes",
    goal: "Open IEx, run `2 + 3` and `String.upcase(\"cat\")`, then compare each input with the value IEx returns.",
    plain: [
      "IEx is Elixir's interactive window. You enter a small piece of code, and it answers at once. You do not need a project or a long list of commands yet.",
      "An expression is code that produces a result. `2 + 3` produces `5`. `String.upcase(\"cat\")` produces `\"CAT\"`.",
      "When you see an error, pause. Read the last few lines. Look for a name the computer does not know or data that does not fit. An error is not a lost point. It is another kind of result.",
    ],
    concepts: [
      {
        term: "IEx",
        explanation: "Short for Interactive Elixir. It is like scratch paper for trying one or two lines of code.",
      },
      {
        term: "expression",
        explanation: "Code that produces a value when it runs. A number, an operation, or a function call can all be expressions.",
      },
      {
        term: "return value",
        explanation: "The result an expression gives back when it finishes. It does not always print a sentence.",
      },
    ],
    symbols: [
      { token: "iex", reading: "Enter this in a terminal to open IEx." },
      { token: "iex>", reading: "This is the prompt. Enter only the code after it. Do not copy the prompt." },
      { token: "#", reading: "This line is a comment. Elixir does not run it." },
    ],
    example: {
      label: "Copy into IEx and press Enter after each line",
      code: `# An addition expression returns a number
2 + 3

# A function call returns new text
String.upcase("cat")

# IO.puts prints a line on the screen
IO.puts("Hello, BEAM")`,
      caption: "Run one line at a time. Guess the result before you press Enter.",
      output: [
        "`2 + 3` returns `5`.",
        "`String.upcase(\"cat\")` returns `\"CAT\"`.",
        "`IO.puts(\"Hello, BEAM\")` prints the text, then IEx shows `:ok`. For now, read it as a “done” label.",
      ],
    },
    steps: [
      "In `2 + 3`, `+` adds the numbers on its left and right.",
      "`String.upcase(\"cat\")` gives the string to the `upcase` function in the `String` module.",
      "`IO.puts(\"Hello, BEAM\")` creates two visible results: the printed text and the return value `:ok` shown by IEx.",
    ],
    practice: {
      task: "Ask IEx to multiply 7 by 6, then turn `beam` into uppercase text.",
      starter: `# Replace the question mark with an operator
7 ? 6

# Finish the function name
String.____("beam")`,
      expected: "First you should see `42`, then `\"BEAM\"`.",
      hint: "Multiplication uses `*`. The function that made text uppercase was `upcase`.",
      answer: `# The star means multiplication
7 * 6

# upcase returns a new uppercase string
String.upcase("beam")`,
    },
    check: {
      question: "Is `iex>` part of the code?",
      answer: "No. It is the prompt IEx shows while it waits for your code.",
    },
    takeaways: [
      "IEx is useful for trying very short Elixir code.",
      "An expression produces a value when it runs.",
      "Read what an error says, then change only one thing.",
    ],
  },
  {
    number: "02",
    slug: "values-and-types",
    stage: "scratch",
    title: "Meet six kinds of values",
    summary: "Run common values, then see why an Elixir string is a UTF-8 binary.",
    duration: "20 minutes",
    goal: "Run common values in IEx, compare `:ok` with `\"ok\"`, and confirm that `<<\"Chang'an\">>` equals `\"Chang'an\"`.",
    plain: [
      "A value is something the code is working with. An age can be an integer. A height can be a decimal number. A name can be a string.",
      "A type tells us which operations a value can join. Numbers can be added. Strings can be joined. A different type is not better or worse. It simply has a different job.",
      "`:ok` is an atom, often used as a label. `\"ok\"` is a string made of two letters. They look alike, but they are different kinds of values.",
      "An Elixir string stores UTF-8 text in a binary. Double quotes are the usual way to write one. The `<<>>` form builds a binary directly, so `<<\"Chang'an\">>` and `\"Chang'an\"` contain the same bytes.",
    ],
    concepts: [
      {
        term: "integer",
        explanation: "A number without a decimal point, such as `12`, `0`, or `-3`.",
      },
      {
        term: "float",
        explanation: "A number with a decimal point, such as `12.5`. For now, think of it as a number that can show a fraction.",
      },
      {
        term: "boolean",
        explanation: "Either `true` or `false`. It answers a yes-or-no question.",
      },
      {
        term: "nil",
        explanation: "It means there is no value here. It is not the number `0` or an empty string.",
      },
      {
        term: "atom",
        explanation: "A label that begins with a colon, such as `:ok` or `:red`. Its name is its value.",
      },
      {
        term: "string",
        explanation: "UTF-8 text inside double quotes, such as `\"York\"`. In Elixir, a string is a binary.",
      },
    ],
    symbols: [
      { token: ":", reading: "Put it before a name to make an atom, for example `:ok`." },
      { token: "\" \"", reading: "Double quotes wrap text to make a string." },
      { token: "<< >>", reading: "Double angle brackets build a binary." },
      { token: "==", reading: "Compare the values on both sides. The result is `true` or `false`." },
    ],
    example: {
      label: "Meet values in IEx",
      code: `# Run one value of each common type
12
12.5
true
nil
:ok
"Hello, Robin"

# Compare an atom, a string, and a directly written binary
:ok == "ok"
<<"Chang'an">> == "Chang'an"`,
      caption: "Run one line at a time. The final line compares two ways to write the same UTF-8 binary.",
      output: [
        "The first six parts produce an integer, a float, a boolean, `nil`, an atom, and a string.",
        "`:ok == \"ok\"` returns `false` because an atom and a string are different types.",
        "`<<\"Chang'an\">> == \"Chang'an\"` returns `true` because both sides are the same UTF-8 binary.",
      ],
    },
    steps: [
      "`12` and `12.5` are both numbers. The decimal point separates integers from floats.",
      "`true` and `false` stand for yes and no. `nil` means no value. Do not treat all three as one type.",
      "A name after a colon is an atom. Text in double quotes is a string. Therefore `:ok` is not equal to `\"ok\"`.",
      "`<<\"Chang'an\">>` writes a binary directly. A normal Elixir string is already a UTF-8 binary, so it equals `\"Chang'an\"`.",
    ],
    practice: {
      task: "Write a city, the weather, and whether it is raining on three lines. Write only values for now. Do not give them names.",
      starter: `# A city is text
____
# The weather is a label
____
# It is not raining today
____`,
      expected: "The three lines should produce `\"Bristol\"`, `:cloudy`, and `false`.",
      hint: "Put text in double quotes. Start a label with a colon. Write yes or no as `true` or `false`.",
      answer: `# A city is text
"Bristol"
# The weather is a label
:cloudy
# It is not raining today
false`,
    },
    check: {
      question: "Why does `<<\"Chang'an\">> == \"Chang'an\"` return `true`?",
      answer: "An Elixir string is a UTF-8 binary. Both expressions contain the same bytes, even though they use different syntax.",
    },
    takeaways: [
      "First ask what a value is. Then decide how to use it.",
      "`:ok` is an atom. `\"ok\"` is a string.",
      "Strings hold UTF-8 text in binaries. `<<>>` builds a binary directly.",
    ],
  },
  {
    number: "03",
    slug: "collections",
    stage: "scratch",
    title: "Put values together",
    summary: "Use lists, tuples, and maps to hold groups of data.",
    duration: "25 minutes",
    goal: "Run one list, tuple, and map expression, then read one value from each collection.",
    plain: [
      "When one value is not enough, a collection can hold several. A shopping list has an order, so a list fits. A result and its status often travel together in a tuple.",
      "A map finds values by name. In a student record, `:name` points to the name and `:score` points to the score. A reader does not need to guess what each position means.",
      "First learn to read collections and take values out. You can learn how to update them later.",
    ],
    concepts: [
      {
        term: "list",
        explanation: "An ordered collection in square brackets, such as `[\"peach\", \"plum\"]`. It is useful when values are handled in order.",
      },
      {
        term: "tuple",
        explanation: "A fixed group in braces, such as `{:ok, 200}`. It often holds several parts of one result.",
      },
      {
        term: "map",
        explanation: "A collection that finds a value by key, such as `%{name: \"Robin\"}`.",
      },
    ],
    symbols: [
      { token: "[ ]", reading: "Square brackets wrap a list." },
      { token: "{ }", reading: "Braces wrap a tuple." },
      { token: "%{key: value}", reading: "A percent sign and braces make a map. The key is on the left of the colon." },
    ],
    example: {
      label: "Three collections for three jobs",
      code: `# A list keeps its order
hd(["peach", "plum", "apricot"])

# A tuple keeps a status and data together
elem({:ok, 42}, 1)

# A map finds a value by name
%{name: "Robin", score: 92}.score`,
      caption: "All three hold several values, but you read them in different ways.",
      output: [
        "`hd([\"peach\", \"plum\", \"apricot\"])` returns the first value, `\"peach\"`.",
        "`elem({:ok, 42}, 1)` returns `42`. Positions start at 0.",
        "`.score` reads `92` from the map.",
      ],
    },
    steps: [
      "`hd([\"peach\", \"plum\", \"apricot\"])` reads the first item of a non-empty list. Do not use it with an empty list yet.",
      "The `1` in `elem({:ok, 42}, 1)` is a position. A tuple's first position is numbered `0`.",
      "When a map key is an atom, you can read it with dot notation such as `.score`.",
    ],
    practice: {
      task: "Make a map for a book. Store its title and number of pages, then read the page count.",
      starter: `# Add two keys, then read the page count with a dot
%{____: "Journey to the West", ____: 100}.____`,
      expected: "The result should be `100`.",
      hint: "You can use the keys `title` and `pages`.",
      answer: `# A map stores facts under named keys
# An atom key can be read with a dot
%{title: "Journey to the West", pages: 100}.pages`,
    },
    check: {
      question: "Should a name and score go in `[\"Robin\", 92]` or `%{name: \"Robin\", score: 92}`?",
      answer: "Prefer the map while you are learning. `name` and `score` make the meaning of each value clear.",
    },
    takeaways: [
      "A list suits values that will be handled in order.",
      "A tuple often ties a status to a result.",
      "A map uses keys to explain its values.",
    ],
  },
  {
    number: "04",
    slug: "names-and-operators",
    stage: "scratch",
    title: "Build a new list",
    summary: "Bind a list, transform it with `for`, and leave the original value unchanged.",
    duration: "20 minutes",
    goal: "Run a `for` comprehension that doubles `[1, 2, 3]`, then return both the original and the new list.",
    plain: [
      "A binding gives a value a name. In `numbers = [1, 2, 3]`, the name `numbers` points to that list.",
      "Elixir data is immutable: code does not change the existing list in place. A transformation builds a new list instead.",
      "A `for` comprehension runs one expression for each value it draws from a collection. In `value <- numbers`, read `<-` as “take each value from numbers.”",
    ],
    concepts: [
      {
        term: "binding",
        explanation: "Giving a value a name, as in `numbers = [1, 2, 3]`.",
      },
      {
        term: "immutable",
        explanation: "An existing value is not changed in place. A transformation creates a new value.",
      },
      {
        term: "list comprehension",
        explanation: "A `for` expression that visits values and collects a new list of results.",
      },
    ],
    symbols: [
      { token: "=", reading: "Bind the value on the right to the name on the left. The next lesson shows its matching job." },
      { token: "<-", reading: "Take each value from the collection on the right, one at a time." },
      { token: "for ... do ... end", reading: "Run the body for each drawn value and collect the results in a new list." },
      { token: "==", reading: "Compare two values and return `true` or `false`." },
    ],
    example: {
      label: "Build a new list and keep the old one",
      code: `# Draw each value from numbers and collect a doubled value
numbers = [1, 2, 3]
doubled = for value <- numbers do
  value * 2
end

# Return both lists and check the original
{numbers, doubled, numbers == [1, 2, 3]}`,
      caption: "`for` returns a new list. It does not edit `numbers`.",
      output: [
        "`doubled` is `[2, 4, 6]`.",
        "`numbers` is still `[1, 2, 3]`.",
        "The final result is `{[1, 2, 3], [2, 4, 6], true}`.",
      ],
    },
    steps: [
      "`numbers = [1, 2, 3]` binds the original list to a name.",
      "`value <- numbers` draws 1, then 2, then 3. The body calculates a result for each value.",
      "The comprehension collects those results in `[2, 4, 6]`. It never changes the original list.",
    ],
    practice: {
      task: "Use a `for` comprehension to multiply every value in `[1, 2, 3]` by 3. Return both the old and new lists.",
      starter: `numbers = [1, 2, 3]

tripled = for value ____ numbers do
  ____
end

{numbers, tripled}`,
      expected: "The result should be `{[1, 2, 3], [3, 6, 9]}`.",
      hint: "Draw values with `<-`, then calculate `value * 3` in the body.",
      answer: `# Build a new list from the old one
numbers = [1, 2, 3]

tripled = for value <- numbers do
  value * 3
end

{numbers, tripled}`,
    },
    check: {
      question: "After `doubled = for value <- numbers do value * 2 end`, did `numbers` change?",
      answer: "No. The comprehension built a new list and bound it to `doubled`. The original list stayed the same.",
    },
    takeaways: [
      "A binding gives a value a name.",
      "`value <- list` draws each value from a list.",
      "A `for` comprehension builds a new list instead of changing the old one.",
    ],
  },
  {
    number: "05",
    slug: "pattern-matching",
    stage: "scratch",
    title: "Make the shapes match",
    summary: "Treat `=` as a match and unpack tuples, lists, and maps.",
    duration: "25 minutes",
    goal: "Run three pattern matches that unpack a tuple, a list, and a map into new names.",
    plain: [
      "In Elixir, `=` does more than assign a value. It checks whether the shapes on both sides can match.",
      "The left side is like a form with empty spaces. The data on the right fills them. If a position, label, or key does not fit, the match fails.",
      "This is often used to unpack data. Write only the parts you need. An underscore `_` can take the rest.",
    ],
    concepts: [
      {
        term: "pattern",
        explanation: "A shape on the left that checks and unpacks the data on the right.",
      },
      {
        term: "destructuring",
        explanation: "Taking several values out of a collection at once.",
      },
      {
        term: "match failure",
        explanation: "When the shapes or fixed values do not line up, Elixir raises a `MatchError`.",
      },
    ],
    symbols: [
      { token: "=", reading: "Match the two sides. New names on the left bind to the matching values." },
      { token: "_", reading: "The value in this position does not need to be saved." },
      { token: "[head | tail]", reading: "Split a non-empty list into its first item and the remaining items." },
    ],
    example: {
      label: "Unpack three kinds of collections",
      code: `# Match :ok and ignore the third value
{:ok, score, _} = {:ok, 92, :midterm}

# Split the first item from the rest of a list
[first | rest] = ["peach", "plum", "apricot"]

# A map pattern names only the key we need
%{name: name} = %{name: "Robin", age: 12}

{score, first, rest, name}`,
      caption: "Read the shape on the left first. Then find each matching value on the right.",
      output: [
        "`score` becomes `92`.",
        "`first` becomes `\"peach\"`, and `rest` becomes `[\"plum\", \"apricot\"]`.",
        "`name` becomes `\"Robin\"`.",
      ],
    },
    steps: [
      "`{:ok, score, _}` needs a three-item tuple whose first item is `:ok`. The third value is ignored.",
      "`[first | rest]` matches only a non-empty list. The bar separates the first item from the remaining list.",
      "A map pattern can name only the keys it needs. The extra `age` key does not stop this match.",
    ],
    practice: {
      task: "Unpack the city and temperature from `{:weather, \"York\", 28}`.",
      starter: `# Keep the label and name the other two positions
{____, ____, ____} = {:weather, "York", 28}

# Return the city and temperature
{city, temperature}`,
      expected: "The result should be `{\"York\", 28}`.",
      hint: "Put the fixed atom `:weather` first, followed by `city` and `temperature`.",
      answer: `# :weather must match; two names receive the data
{:weather, city, temperature} = {:weather, "York", 28}

# Look at the values we unpacked
{city, temperature}`,
    },
    check: {
      question: "Will `{:ok, value} = {:error, 3}` succeed?",
      answer: "No. The left side requires `:ok`, but the right side begins with `:error`, so Elixir raises a `MatchError`.",
    },
    takeaways: [
      "`=` checks a shape. It does not only put a value into a name.",
      "Fixed values check the data. New names receive it.",
      "Use `_` for a value you do not need.",
    ],
  },
  {
    number: "06",
    slug: "choices-and-guards",
    stage: "scratch",
    title: "Choose with case",
    summary: "Match one value against branches, then add conditions with guards.",
    duration: "25 minutes",
    goal: "Run the same `case` with scores 76, 95, and 40, then check which message each score selects.",
    plain: [
      "Programs often need to act differently in different situations. `case` gets one value, then tries to match it against several patterns.",
      "Each branch says which input it accepts and what it returns. The first matching branch runs. The later branches are skipped.",
      "A guard is a small condition after a pattern. Guards allow only a safe, clearly defined group of checks.",
    ],
    concepts: [
      {
        term: "branch",
        explanation: "A piece of code chosen for a particular kind of input.",
      },
      {
        term: "case",
        explanation: "Match one value against several patterns and run the first matching branch.",
      },
      {
        term: "guard",
        explanation: "An extra condition after `when`, such as `when score >= 60`.",
      },
    ],
    symbols: [
      { token: "->", reading: "When the condition on the left matches, run the expression on the right." },
      { token: "when", reading: "Add one more condition after a pattern." },
      { token: "_", reading: "A final fallback branch that catches values not handled above." },
      { token: "case ... do ... end", reading: "`do` opens the branches. `end` closes the whole `case`." },
    ],
    example: {
      label: "Choose a message for a score",
      code: `# score is the value we will check
score = 76

# case looks for the first matching branch from top to bottom
message =
  case score do
    value when value >= 90 -> "Great work"
    value when value >= 60 -> "Passed"
    _value -> "Try again"
  end

# Look at the chosen result
message`,
      caption: "Change `score` to 95 and 40, and run the code each time.",
      output: [
        "`76` produces `\"Passed\"`.",
        "`95` produces `\"Great work\"`.",
        "`40` produces `\"Try again\"`.",
      ],
    },
    steps: [
      "`case score do` says that the next branches will check `score`.",
      "Branches are tried from top to bottom, so `>= 90` must come before `>= 60`.",
      "`_value` catches any remaining value. Its leading underscore reminds us that we will not use it again.",
    ],
    practice: {
      task: "Choose an action for a weather atom: take an umbrella for `:rain`, wear a hat for `:sunny`, and look at the sky for anything else.",
      starter: `# Try other atoms too
weather = :rain

case weather do
  ____ -> "Take an umbrella"
  ____ -> "Wear a hat"
  ____ -> "Look at the sky"
end`,
      expected: "`:rain` produces `\"Take an umbrella\"`, and `:sunny` produces `\"Wear a hat\"`.",
      hint: "Use fixed atoms in the first two places. Use an underscore name to catch every other value.",
      answer: `# weather is the value to match
weather = :rain

case weather do
  :rain -> "Take an umbrella"
  :sunny -> "Wear a hat"
  _other -> "Look at the sky"
end`,
    },
    check: {
      question: "Why must `value >= 90` come before `value >= 60`?",
      answer: "`case` picks the first matching branch. Since 95 is also above 60, the opposite order would send 95 into the “Passed” branch too soon.",
    },
    takeaways: [
      "`case` is good at combining pattern matching with a choice.",
      "The order of branches can change the result.",
      "A fallback branch explains what happens to other inputs.",
    ],
  },
  {
    number: "07",
    slug: "functions-and-arity",
    stage: "scratch",
    title: "Parse a number safely",
    summary: "Trim text, turn it into an integer, and return a clear error for invalid input.",
    duration: "30 minutes",
    goal: "Run one anonymous parser with `\" 42 \"` and `\"not-a-number\"`, then get `{:ok, 42}` and `{:error, :not_an_integer}`.",
    plain: [
      "`String.trim/1` removes whitespace from both ends of a string. `String.to_integer/1` turns clean integer text into an integer, but raises `ArgumentError` when the text is invalid.",
      "An anonymous function lets us keep those steps together. Bind it to `parse_integer`, then call it with a dot: `parse_integer.(text)`.",
      "`try/rescue` handles the expected conversion error. The parser returns a tagged tuple for both paths, so the caller gets data instead of a crash.",
    ],
    concepts: [
      {
        term: "arity",
        explanation: "The number of arguments a function takes. `/1` says that both `String.trim/1` and `String.to_integer/1` take one argument.",
      },
      {
        term: "anonymous function",
        explanation: "A function written with `fn ... end` and bound to a name such as `parse_integer`.",
      },
      {
        term: "try/rescue",
        explanation: "Run code that may raise, then turn a named exception into a normal result.",
      },
    ],
    symbols: [
      { token: "String.trim/1", reading: "The name-and-arity form used in documentation: module `String`, function `trim`, one argument." },
      { token: "String.to_integer/1", reading: "A one-argument function that parses integer text or raises `ArgumentError`." },
      { token: "fn text -> ... end", reading: "Create a full anonymous function whose argument is called `text`." },
      { token: "rescue ArgumentError ->", reading: "Handle only an `ArgumentError` raised inside the `try` block." },
    ],
    example: {
      label: "Parse valid text and catch invalid text",
      code: `# Bind a complete parser to parse_integer
parse_integer = fn text ->
  try do
    clean = String.trim(text)
    {:ok, String.to_integer(clean)}
  rescue
    ArgumentError -> {:error, :not_an_integer}
  end
end

# Run both paths
{parse_integer.(" 42 "), parse_integer.("not-a-number")}`,
      caption: "`String.trim/1` names a function in documentation. `String.trim(text)` calls it with one argument.",
      output: [
        "The valid input is trimmed to `\"42\"`, parsed, and returned as `{:ok, 42}`.",
        "The invalid input raises `ArgumentError` inside the `try` block.",
        "The rescue clause turns that exception into `{:error, :not_an_integer}`.",
      ],
    },
    steps: [
      "`String.trim/1` and `String.to_integer/1` are documentation names. Calls use parentheses and do not include `/1`.",
      "`String.to_integer(clean)` returns an integer for valid text and raises `ArgumentError` for invalid text.",
      "The rescue clause handles that expected exception and leaves unrelated exceptions visible.",
      "Both paths return tagged tuples: `{:ok, integer}` or `{:error, :not_an_integer}`.",
    ],
    practice: {
      task: "Complete `safe_number` so `\" 7 \"` returns `{:ok, 7}` and `\"seven\"` returns `{:error, :not_an_integer}`.",
      starter: `safe_number = fn text ->
  try do
    clean = String.____(text)
    {:ok, String.____(clean)}
  rescue
    ____ -> {:error, :not_an_integer}
  end
end

{safe_number.(" 7 "), safe_number.("seven")}`,
      expected: "The result should be `{{:ok, 7}, {:error, :not_an_integer}}`.",
      hint: "Use `trim`, `to_integer`, and the exception name `ArgumentError`.",
      answer: `# Handle only the conversion error we expect
safe_number = fn text ->
  try do
    clean = String.trim(text)
    {:ok, String.to_integer(clean)}
  rescue
    ArgumentError -> {:error, :not_an_integer}
  end
end

{safe_number.(" 7 "), safe_number.("seven")}`,
    },
    check: {
      question: "Why does the rescue clause name `ArgumentError` instead of catching every exception?",
      answer: "The parser expects one conversion error. Handling only `ArgumentError` keeps unrelated mistakes visible so they can be fixed.",
    },
    takeaways: [
      "`Module.function/arity` is a documentation name; `Module.function(argument)` is a call.",
      "Bind a full anonymous function with `fn ... end` and call it with `.()`.",
      "Rescue the expected conversion error and return a tagged result.",
    ],
  },
  {
    number: "08",
    slug: "capture-enum-pipe",
    stage: "scratch",
    title: "Unpack &1 and the pipe",
    summary: "Write a full anonymous function before reading captures, Enum, and `|>`.",
    duration: "35 minutes",
    goal: "Run a full anonymous function, its `&1` form, a captured `String.trim/1`, and one pipe that joins clean text.",
    plain: [
      "`&1` is an argument placeholder, not a variable on its own. It only has meaning inside a capture expression that begins with `&`.",
      "Run the full form `fn number -> number * 2 end` first. Then run `&(&1 * 2)` and compare the same result.",
      "Functions in `Enum` process the items in a collection. The pipe `|>` places the result on its left into the first argument position of the function on its right.",
    ],
    concepts: [
      {
        term: "capture operator",
        explanation: "`&` can capture an existing function or create a short anonymous function.",
      },
      {
        term: "Enum.map/2",
        explanation: "Give each item in a collection to a function, then collect all the new return values.",
      },
      {
        term: "pipe operator",
        explanation: "`|>` puts the result on the left into the first argument position on the right.",
      },
    ],
    symbols: [
      { token: "&(&1 * 2)", reading: "Create an anonymous function. `&1` is its first argument. The full form is `fn number -> number * 2 end`." },
      { token: "&String.trim/1", reading: "Capture the existing `String.trim/1` function so other code can call it later." },
      { token: "|>", reading: "Send the result on the left into the first argument position of the function on the right." },
    ],
    example: {
      label: "Copy all of it: from the long form to the short form",
      code: `# Start with the full form: number is each value received
long_double = fn number -> number * 2 end
Enum.map([1, 2, 3], long_double)

# Now the short form: &1 is still each value received
Enum.map([1, 2, 3], &(&1 * 2))

# Capture the existing String.trim/1 function
["  peach", "plum  "] |> Enum.map(&String.trim/1)
|> Enum.join(", ")`,
      caption: "All three parts give a function to another function.",
      output: [
        "The first two parts both return `[2, 4, 6]`.",
        "The last pipeline returns `\"peach, plum\"`.",
        "`&1` only has meaning inside a short capture expression.",
      ],
    },
    steps: [
      "`Enum.map/2` takes two arguments: a collection and a function. That is why its name ends in `/2`.",
      "`&(&1 * 2)` means the same as `fn number -> number * 2 end`. Expand it when the short form feels unclear.",
      "`&String.trim/1` does not call `trim` yet. It gives that function to `Enum.map/2`.",
      "The last line means `Enum.join(previous_result, \", \")`. The pipe fills only the first argument automatically.",
    ],
    practice: {
      task: "Add 1 with a full function and with `&1`. Then write a pipe that trims two strings with `&String.trim/1` and joins them.",
      starter: `# First: full function, then &1
full_result = Enum.map([2, 3, 4], fn number -> ____ end)
short_result = Enum.map([2, 3, 4], &(____))

# Next: capture String.trim/1 inside a pipe
clean_text =
  ["  red", "blue  "]
  |> Enum.map(____)
  |> Enum.join(____)

{full_result, short_result, clean_text}`,
      expected: "The result should be `{[3, 4, 5], [3, 4, 5], \"red, blue\"}`.",
      hint: "Use `number + 1`, `&1 + 1`, `&String.trim/1`, and the separator `\", \"`.",
      answer: `# Full function, then its &1 short form
full_result = Enum.map([2, 3, 4], fn number -> number + 1 end)
short_result = Enum.map([2, 3, 4], &(&1 + 1))

# Capture trim/1 and write the pipe
clean_text =
  ["  red", "blue  "]
  |> Enum.map(&String.trim/1)
  |> Enum.join(", ")

{full_result, short_result, clean_text}`,
    },
    check: {
      question: "Does `&String.trim/1` immediately remove spaces from a string?",
      answer: "No. It only captures the function. The function runs later, when `Enum.map/2` gives each string to it.",
    },
    takeaways: [
      "Run the full anonymous function before shortening it.",
      "`&1` is the first argument placeholder inside a capture expression.",
      "`&String.trim/1` captures a named function; `|>` passes a result onward.",
    ],
  },
  {
    number: "09",
    slug: "modules-and-mix",
    stage: "scratch",
    title: "Put code in a project",
    summary: "Write a module, meet def, files, and Mix, then head toward BEAM.",
    duration: "35 minutes",
    goal: "Create a Mix project, run its default test, and open the project with `iex -S mix`.",
    plain: [
      "IEx is like scratch paper. When code grows, put related functions in a module and save it in a file.",
      "`defmodule` defines a module. `def` defines a function that code outside the module can call. Module names usually use CamelCase and begin with a capital letter.",
      "Mix manages Elixir projects. It creates folders, compiles code, and runs tests. Mix comes with Elixir. It is not a third programming language.",
    ],
    concepts: [
      {
        term: "module",
        explanation: "A shared name for a group of related functions, such as `Village`.",
      },
      {
        term: "source file",
        explanation: "A text file that stores code. Elixir source files often end in `.ex`.",
      },
      {
        term: "Mix",
        explanation: "Elixir's project tool. Common commands include `mix new`, `mix test`, and `mix run`.",
      },
    ],
    symbols: [
      { token: "defmodule", reading: "Begin defining a module." },
      { token: "def greet(name)", reading: "Define the public function `greet/1`, which takes one argument." },
      { token: "do ... end", reading: "Wrap the code that belongs to a module or function." },
    ],
    example: {
      label: "Try it in IEx, then save it as lib/village.ex",
      code: `# A module keeps related functions together
defmodule Village do
  # greet/1 takes a name and returns a greeting
  def greet(name) do
    "Hello, #{name}"
  end
end

# Call it with Module.function(argument)
Village.greet("Maya")`,
      caption: "Definitions in IEx disappear when the session ends. In a Mix project, save this module in `lib/village.ex`.",
      output: [
        "After the module is defined, IEx shows `{:module, Village, ...}`.",
        "The final result is `\"Hello, Maya\"`.",
      ],
    },
    steps: [
      "`defmodule Village do` begins a module named `Village`.",
      "`def greet(name)` defines a public function. Its name-and-arity form is `Village.greet/1`.",
      "The value of a function's last expression becomes its return value automatically. There is no `return` keyword.",
      "`mix new village` creates a project. Inside that folder, `mix test` runs tests and `iex -S mix` opens IEx with the project loaded.",
    ],
    practice: {
      task: "Create a Mix project in your system terminal. Run its default tests, then open IEx with the project loaded.",
      starter: `# Use the same project folder name in both blanks
mix new ____
cd ____

# Run the tests included with the new project
mix test

# Open IEx with this project loaded
iex -S mix`,
      expected: "The project folder should contain `mix.exs`, `lib/`, and `test/`. After the default test passes, you should enter the project's IEx.",
      hint: "Use `village_path` in both blanks. Run these commands in your system terminal, not in ordinary IEx.",
      answer: `# Create the project and enter its folder
mix new village_path
cd village_path

# Run the default test once
mix test

# Try project modules here later
iex -S mix`,
    },
    check: {
      question: "Is Mix the BEAM or another programming language?",
      answer: "Neither. Mix is Elixir's project tool. Elixir code still runs on the BEAM.",
    },
    takeaways: [
      "A module keeps related functions together.",
      "An Elixir function returns the value of its last expression.",
      "Mix creates, compiles, and tests projects.",
    ],
  },
];

const erlangLessonsEn: BasicLesson[] = [
  {
    number: "01",
    slug: "meet-erl",
    stage: "scratch",
    title: "Open erl",
    summary: "Run expressions in the Erlang shell and remember the final dot.",
    duration: "15 minutes",
    goal: "Open `erl`, run `2 + 3.`, and run one module call that ends with a dot.",
    plain: [
      "`erl` opens the Erlang shell. Like IEx, it lets you try a small piece of code at once.",
      "The Erlang shell waits for a dot `.` before it knows an input is complete. If you forget the dot, it keeps waiting instead of running the code.",
      "`1>` and `2>` at the start of shell lines are prompts and input numbers. Do not copy them as code.",
    ],
    concepts: [
      {
        term: "erl",
        explanation: "The terminal command that starts the Erlang shell.",
      },
      {
        term: "expression",
        explanation: "Code that produces a value when it runs, such as `2 + 3`.",
      },
      {
        term: "dot",
        explanation: "A complete shell input or function definition in Erlang ends with `.`.",
      },
    ],
    symbols: [
      { token: "erl", reading: "Enter this in a terminal to open the Erlang shell." },
      { token: "1>", reading: "This is the shell prompt. Enter only the code after it." },
      { token: ".", reading: "Tell the shell: this input is complete, so run it." },
    ],
    example: {
      label: "Copy into erl and press Enter after each line",
      code: `%% An addition expression returns a number
2 + 3.

%% Call the string module to make text uppercase
string:uppercase("cat").

%% Call the io module to print a line
io:format("hello, BEAM~n", []).`,
      caption: "Notice the dot at the end of every runnable input.",
      output: [
        "`2 + 3.` returns `5`.",
        "`string:uppercase(\"cat\").` returns `\"CAT\"`.",
        "`io:format(...)` prints a line, then shows `ok`. For now, read it as a “done” label.",
      ],
    },
    steps: [
      "The final dot in `2 + 3.` is not a decimal point. It ends the input.",
      "`string:uppercase(\"cat\").` calls the `uppercase` function in the `string` module.",
      "`~n` means a new line. The empty list `[]` says there are no extra values to put into the format string.",
    ],
    practice: {
      task: "Ask the shell to multiply 8 by 7, then turn `beam` into uppercase text.",
      starter: `%% Add the operator, and do not forget the dot
8 ? 7.

%% Finish the function name
string:____("beam").`,
      expected: "First you should see `56`, then `\"BEAM\"`.",
      hint: "Multiplication uses `*`. The function in the example was `uppercase`.",
      answer: `%% The star means multiplication
8 * 7.

%% Every complete input ends with a dot
string:uppercase("beam").`,
    },
    check: {
      question: "You entered `2 + 3`, but the shell is still waiting. What is probably missing?",
      answer: "The final dot is missing. Add `.` and press Enter.",
    },
    takeaways: [
      "`erl` opens the Erlang shell.",
      "The shell is useful for trying short Erlang expressions.",
      "A complete shell input ends with a dot.",
    ],
  },
  {
    number: "02",
    slug: "terms-and-types",
    stage: "scratch",
    title: "Meet common terms",
    summary: "Learn numbers, atoms, tuples, lists, and maps.",
    duration: "25 minutes",
    goal: "Run a number, atom, tuple, list, and map in `erl`, then compare the shapes of their results.",
    plain: [
      "Erlang calls every piece of runtime data a term. Numbers, atoms, tuples, lists, and maps are all terms.",
      "A word that begins with a lowercase letter is usually an atom, such as `ok` or `rain`. In Erlang, `true` and `false` are atoms too.",
      "Erlang has no built-in `nil` value. A project may choose `undefined`, `none`, or another atom to mean “missing,” but the project should state that rule.",
    ],
    concepts: [
      {
        term: "term",
        explanation: "Erlang's general name for runtime data. Different terms have different shapes and jobs.",
      },
      {
        term: "atom",
        explanation: "A label usually written as a lowercase word, such as `ok`. Its name is its value.",
      },
      {
        term: "tuple",
        explanation: "A fixed group inside braces, such as `{ok, 42}`.",
      },
    ],
    symbols: [
      { token: "ok", reading: "It begins with a lowercase letter, so it is an atom label." },
      { token: "{ok, 42}", reading: "A two-item tuple. The first atom often labels the kind of result." },
      { token: "#{status => ready}", reading: "A map. `=>` joins a key to a value." },
    ],
    example: {
      label: "Look at terms in erl",
      code: `%% Check numbers and atoms
{is_integer(12), is_float(12.5)}.
{is_atom(true), is_atom(ok)}.

%% Run a tuple and a list
{ok, 42}.
[peach, plum, apricot].

%% Run a map whose atom keys explain its values
#{status => ready, score => 92}.`,
      caption: "Look at each shape, then use an `is_*` function to check it.",
      output: [
        "The first two lines both return `{true, true}`.",
        "The next two lines show the tuple `{ok, 42}` and the list `[peach, plum, apricot]`.",
        "The final line shows a map with the keys `status` and `score`.",
      ],
    },
    steps: [
      "`is_integer(12)` and `is_float(12.5)` each inspect one value and return true or false.",
      "`true` is the atom commonly used to mean yes. Its type is still atom.",
      "`#{...}` creates a map. Here `status`, `ready`, and `score` are labels from a limited set.",
    ],
    practice: {
      task: "Complete a weather map. Use an atom for the weather and an integer for the temperature.",
      starter: `%% Use weather and temperature as the keys
#{____ => cloudy, ____ => 28}.`,
      expected: "The result should be `#{weather => cloudy, temperature => 28}`.",
      hint: "Fill the blanks with the atoms `weather` and `temperature`.",
      answer: `%% Atom keys explain what the two values mean
#{weather => cloudy, temperature => 28}.`,
    },
    check: {
      question: "Is `true` a separate type in Erlang?",
      answer: "No. `true` is an atom that people agree to use for a true result.",
    },
    takeaways: [
      "Erlang calls all runtime data terms.",
      "Atoms are useful for a limited set of labels such as `ok`, `ready`, and `cloudy`.",
      "Tuples and maps both hold several values, but maps give fields names.",
    ],
  },
  {
    number: "03",
    slug: "text-and-binaries",
    stage: "scratch",
    title: "Tell two kinds of text apart",
    summary: "Understand charlists, binaries, and UTF-8 text.",
    duration: "25 minutes",
    goal: "Run `\"cat\"` and `<<\"cat\">>` in `erl`, test the binary, and build one UTF-8 binary.",
    plain: [
      "Erlang has no separate string type. `\"cat\"` in double quotes is a list of character numbers by default. This is called a charlist.",
      "`<<\"cat\">>` is a binary. Many network protocols, files, and modern Erlang interfaces use binaries for text.",
      "For a non-ASCII character inside a binary, add `/utf8`, as in `<<\"café\"/utf8>>`. This tells Erlang exactly how to encode the text.",
    ],
    concepts: [
      {
        term: "charlist",
        explanation: "A list of character numbers. `\"cat\"` and `[99, 97, 116]` are the same value.",
      },
      {
        term: "binary",
        explanation: "A sequence of bytes written as `<<...>>`. Binaries are common for text, files, and network data.",
      },
      {
        term: "UTF-8",
        explanation: "An encoding rule that turns Unicode text into bytes.",
      },
    ],
    symbols: [
      { token: "\"cat\"", reading: "A charlist by default, which means a list of integers." },
      { token: "<<\"cat\">>", reading: "The double angle brackets wrap a binary." },
      { token: "/utf8", reading: "Encode the text before it as UTF-8 inside the binary." },
      { token: "=:=", reading: "Strictly compare whether the values on both sides are the same." },
    ],
    example: {
      label: "Text can look alike while having a different shape",
      code: `%% Double quotes make a charlist by default
"cat" =:= [99, 97, 116].

%% Double angle brackets make a binary
is_binary(<<"cat">>).

%% A non-ASCII binary states its UTF-8 encoding
byte_size(<<"café"/utf8>>).`,
      caption: "Here `=:=` performs a strict equality comparison.",
      output: [
        "The charlist comparison returns `true`.",
        "`is_binary(<<\"cat\">>)` returns `true`.",
        "`byte_size(<<\"café\"/utf8>>)` returns `5`: five bytes, not four written characters.",
      ],
    },
    steps: [
      "`\"cat\"` looks like text in the shell, but it equals the integer list `[99, 97, 116]`.",
      "`<<\"cat\">>` is a binary. It is not equal to the charlist `\"cat\"`.",
      "`byte_size(<<\"café\"/utf8>>)` counts bytes. The letter `é` takes two UTF-8 bytes.",
    ],
    practice: {
      task: "Write `café` as a binary, then check it with `is_binary(...)`.",
      starter: `%% Give the UTF-8 binary directly to the check
is_binary(<<____/utf8>>).`,
      expected: "The result should be `true`.",
      hint: "Write the text in double quotes inside the blank.",
      answer: `%% /utf8 states how to encode the non-ASCII letter
is_binary(<<"café"/utf8>>).`,
    },
    check: {
      question: "Are `\"cat\"` and `<<\"cat\">>` the same value?",
      answer: "No. The first is a charlist by default. The second is a binary. They can show similar text but have different types.",
    },
    takeaways: [
      "Erlang has no separate string type.",
      "Double quotes make a charlist by default. `<<>>` makes a binary.",
      "Use `/utf8` when a binary literal contains non-ASCII text.",
    ],
  },
  {
    number: "04",
    slug: "variables-and-matching",
    stage: "scratch",
    title: "Bind a variable once",
    summary: "Learn capitalized variables, single assignment, and pattern matching.",
    duration: "25 minutes",
    goal: "Run tuple and map matches in `erl`, then confirm that a bound variable only matches the same value.",
    plain: [
      "An Erlang variable must begin with a capital letter or an underscore. `Score` is a variable. `score` is an atom.",
      "Once an Erlang variable is bound in a scope, it cannot be rebound to a different value. This is called single assignment.",
      "`=` is the match operator. The left side gives a shape and the right side gives data. If the shapes do not fit, Erlang reports `badmatch`.",
    ],
    concepts: [
      {
        term: "variable",
        explanation: "A name beginning with a capital letter or underscore, such as `Name` or `_Rest`.",
      },
      {
        term: "single assignment",
        explanation: "Once a variable is bound, it cannot be bound to a different value in the same scope.",
      },
      {
        term: "matching",
        explanation: "Check two shapes and let new variables receive values from matching positions.",
      },
    ],
    symbols: [
      { token: "Name", reading: "It begins with a capital letter, so it is a variable." },
      { token: "name", reading: "It begins with a lowercase letter, so it is an atom." },
      { token: "_", reading: "Match this position without saving its value." },
      { token: "f().", reading: "Use this only in the Erlang shell to clear the shell's current variable bindings." },
    ],
    example: {
      label: "The left side is a shape; the right side is data",
      code: `%% Shell only: clear variables left by earlier lessons
f().

%% Match a tuple and one existing map key
{ok, Score} = {ok, 92}.
#{name := Name} = #{name => <<"Robin">>, age => 12}.

%% A bound variable can only match the same value
92 = Score.
{Score, Name}.`,
      caption: "A map uses `=>` when it is created and `:=` to match an existing key.",
      output: [
        "`Score` binds to `92`.",
        "`Name` binds to `<<\"Robin\">>`.",
        "The final result is `{92, <<\"Robin\">>}`.",
      ],
    },
    steps: [
      "`{ok, Score}` requires a two-item tuple whose first item is the atom `ok`.",
      "`#{name := Name}` is a map pattern. It finds the existing key `name` and lets `Name` receive its value.",
      "`92 = Score` succeeds because `Score` is already 92. `93 = Score` would cause `badmatch`.",
    ],
    practice: {
      task: "Unpack the city and temperature from `{weather, <<\"York\">>, 28}`.",
      starter: `%% Clear variables left by the example and earlier lessons
f().

%% The fixed label must match; variables begin with capitals
{____, ____, ____} = {weather, <<"York">>, 28}.

%% Look at the unpacked values
{City, Temperature}.`,
      expected: "The result should be `{<<\"York\">>, 28}`.",
      hint: "Write the atom `weather`, then the variables `City` and `Temperature`.",
      answer: `%% f() belongs in the shell, not in an .erl file
f().

%% The atom checks the label; variables receive the data
{weather, City, Temperature} = {weather, <<"York">>, 28}.

%% The two variables are now bound
{City, Temperature}.`,
    },
    check: {
      question: "After `Count = 3.`, what happens if you run `Count = 4.`?",
      answer: "Erlang reports `badmatch`. `Count` is already bound to 3 and cannot receive the different value 4.",
    },
    takeaways: [
      "A capitalized name is a variable. A lowercase name is usually an atom.",
      "An Erlang variable cannot change after it is bound.",
      "`=` performs pattern matching.",
    ],
  },
  {
    number: "05",
    slug: "lists-and-patterns",
    stage: "scratch",
    title: "Split and filter a list",
    summary: "Use `[Head | Tail]`, then keep passing scores with a list comprehension.",
    duration: "25 minutes",
    goal: "Split one list into head and tail, then run `[Score || Score <- Scores, Score >= 60]`.",
    plain: [
      "A list is an ordered collection. In `[peach, plum, apricot]`, the first item is the head. The remaining `[plum, apricot]` is the tail.",
      "Erlang writes this as `[Head | Tail]`. The bar does not mean “or.” It separates the head from the tail.",
      "The empty list `[]` has no head. Matching `[Head | Tail]` against an empty list fails.",
      "A list comprehension builds a new list. In `[Score || Score <- Scores, Score >= 60]`, `<-` draws each score and the final condition keeps only passing scores. `Scores` itself does not change.",
    ],
    concepts: [
      {
        term: "Head",
        explanation: "The first item in a non-empty list.",
      },
      {
        term: "Tail",
        explanation: "The list left after removing the first item. It is still a list.",
      },
      {
        term: "empty list",
        explanation: "`[]` contains no items. It is also the stopping point when a recursive function processes a list.",
      },
      {
        term: "list comprehension",
        explanation: "An expression that draws values from a list, optionally filters them, and collects a new list.",
      },
    ],
    symbols: [
      { token: "[ ]", reading: "Wrap a list." },
      { token: "|", reading: "Separate the head and tail in a list pattern." },
      { token: "||", reading: "Separate the value to collect from the generators and filters in a list comprehension." },
      { token: "<-", reading: "Draw each value from the list on the right." },
    ],
    example: {
      label: "Split one list and filter another",
      code: `%% Split the first item from the rest
Fruits = [peach, plum, apricot].
[Head | Tail] = Fruits.

%% Draw every score, then keep scores at or above 60
Scores = [45, 60, 82, 59, 100].
Passed = [Score || Score <- Scores, Score >= 60].

{Head, Tail, Scores, Passed}.`,
      caption: "The match reads an existing list. The comprehension builds a new list without changing `Scores`.",
      output: [
        "`Head` is `peach`.",
        "`Tail` is `[plum, apricot]`.",
        "`Passed` is `[60, 82, 100]`, while `Scores` keeps all five values.",
      ],
    },
    steps: [
      "`[Head | Tail] = Fruits` works only when the list has at least one item.",
      "`Tail` does not mean “the last item.” It means “the whole list after the first item.”",
      "`Score <- Scores` draws one score at a time. `Score >= 60` decides whether that score stays.",
      "The expression before `||` is collected into `Passed`. The original `Scores` list is unchanged.",
    ],
    practice: {
      task: "Use a list comprehension to keep scores of 60 or higher from `[55, 60, 72, 49]`. Return the old and new lists.",
      starter: `Scores = [55, 60, 72, 49].
Passed = [____ || ____ <- Scores, ____ >= ____].

{Scores, Passed}.`,
      expected: "The result should be `{[55, 60, 72, 49], [60, 72]}`.",
      hint: "Use `Score` in all three blanks before the limit, then use `60` as the limit.",
      answer: `%% Build Passed without changing Scores
Scores = [55, 60, 72, 49].
Passed = [Score || Score <- Scores, Score >= 60].

{Scores, Passed}.`,
    },
    check: {
      question: "After building `Passed`, did the list bound to `Scores` lose the failing scores?",
      answer: "No. A list comprehension returns a new list. `Scores` remains `[55, 60, 72, 49]`.",
    },
    takeaways: [
      "`[Head | Tail]` splits a non-empty list.",
      "`Score <- Scores` draws each score from the source list.",
      "A list comprehension can filter values while leaving the source list unchanged.",
    ],
  },

  {
    number: "06",
    slug: "functions-and-arity",
    stage: "scratch",
    title: "Parse a number safely",
    summary: "Trim a binary, turn it into an integer, and catch invalid input.",
    duration: "30 minutes",
    goal: "Run one Erlang parser with `<<\" 42 \">>` and `<<\"not-a-number\">>`, then get `{ok, 42}` and `{error, not_an_integer}`.",
    plain: [
      "`string:trim/1` removes whitespace from both ends of a text binary. `binary_to_integer/1` turns clean integer text into an integer.",
      "Invalid integer text makes `binary_to_integer/1` raise the error reason `badarg`. A `try ... of ... catch ... end` expression can turn that expected error into data.",
      "Bind the full anonymous function to `ParseInteger`. Valid and invalid calls then return tagged tuples instead of making the shell stop at an exception.",
    ],
    concepts: [
      {
        term: "arity",
        explanation: "The number of arguments a function takes. `/1` says that `string:trim/1` and `binary_to_integer/1` each take one argument.",
      },
      {
        term: "anonymous function",
        explanation: "A function written with `fun ... end` and bound to a variable such as `ParseInteger`.",
      },
      {
        term: "try/of/catch",
        explanation: "Run an expression, handle its normal result after `of`, and handle a named error after `catch`.",
      },
    ],
    symbols: [
      { token: "string:trim/1", reading: "The name-and-arity form used in documentation: module `string`, function `trim`, one argument." },
      { token: "binary_to_integer/1", reading: "A one-argument function that parses an integer binary or raises `badarg`." },
      { token: "fun(Text) -> ... end", reading: "Create a full anonymous function whose argument is called `Text`." },
      { token: "catch error:badarg ->", reading: "Handle only an error whose class is `error` and whose reason is `badarg`." },
    ],
    example: {
      label: "Parse valid text and catch invalid text",
      code: `%% Bind a complete parser to ParseInteger
ParseInteger =
  fun(Text) ->
    try binary_to_integer(string:trim(Text)) of
      Number -> {ok, Number}
    catch
      error:badarg -> {error, not_an_integer}
    end
  end.

%% Run both paths
{ParseInteger(<<" 42 ">>), ParseInteger(<<"not-a-number">>)}.`,
      caption: "`string:trim/1` names a function in documentation. `string:trim(Text)` calls it with one argument.",
      output: [
        "The valid input is trimmed to `<<\"42\">>`, parsed, and returned as `{ok, 42}`.",
        "The invalid input raises `error:badarg` inside the `try` expression.",
        "The catch clause turns that error into `{error, not_an_integer}`.",
      ],
    },
    steps: [
      "`string:trim/1` and `binary_to_integer/1` are name-and-arity forms used in documentation. Calls use parentheses and do not include `/1`.",
      "A successful integer reaches the `of` clause and becomes `{ok, Number}`.",
      "Invalid text raises `error:badarg`, so the matching catch clause returns `{error, not_an_integer}`.",
      "Both paths return tagged tuples that the next piece of code can match.",
    ],
    practice: {
      task: "Complete `SafeNumber` so `<<\" 7 \">>` returns `{ok, 7}` and `<<\"seven\">>` returns `{error, not_an_integer}`.",
      starter: `SafeNumber =
  fun(Text) ->
    try ____(string:____(Text)) of
      Number -> {ok, Number}
    catch
      ____ -> {error, not_an_integer}
    end
  end.

{SafeNumber(<<" 7 ">>), SafeNumber(<<"seven">>)}.`,
      expected: "The result should be `{{ok, 7}, {error, not_an_integer}}`.",
      hint: "Use `binary_to_integer`, `trim`, and the catch pattern `error:badarg`.",
      answer: `%% Handle only the conversion error we expect
SafeNumber =
  fun(Text) ->
    try binary_to_integer(string:trim(Text)) of
      Number -> {ok, Number}
    catch
      error:badarg -> {error, not_an_integer}
    end
  end.

{SafeNumber(<<" 7 ">>), SafeNumber(<<"seven">>)}.`,
    },
    check: {
      question: "Why does the catch clause use `error:badarg` instead of `_ : _`?",
      answer: "The parser expects one conversion error. Matching only `error:badarg` keeps unrelated errors visible so they can be fixed.",
    },
    takeaways: [
      "`module:function/arity` or `function/arity` names a function in documentation; parentheses make a call.",
      "Bind a full anonymous function with `fun ... end`.",
      "Catch the expected `error:badarg` and return a tagged result.",
    ],
  },
  {
    number: "07",
    slug: "clauses-and-guards",
    stage: "scratch",
    title: "Choose one path with case",
    summary: "Match one value against branches, then add conditions with guards.",
    duration: "30 minutes",
    goal: "Run the same Erlang `case` with scores 76, 95, and 40, then check the selected message.",
    plain: [
      "`case` gets one value, then searches from top to bottom for the first matching branch.",
      "Semicolons `;` separate branches. Do not put a semicolon after the final branch. End the whole `case` with `end.`.",
      "A guard after `when` adds one simple condition to a pattern.",
    ],
    concepts: [
      {
        term: "case branch",
        explanation: "One rule for one shape of input. The first matching branch is chosen.",
      },
      {
        term: "guard",
        explanation: "An extra condition after `when`, such as `when Score >= 60`.",
      },
      {
        term: "fallback",
        explanation: "A final branch that handles the remaining inputs so an unexpected value is not left out.",
      },
    ],
    symbols: [
      { token: ";", reading: "This `case` branch is finished, and another branch follows." },
      { token: "end.", reading: "End the whole `case` expression." },
      { token: "_Other", reading: "Match any value. The leading underscore says this variable will not be used again." },
    ],
    example: {
      label: "Use case to see the order of branches",
      code: `%% Clear old variables so Score is easy to change and try again
f().

%% Try each branch from top to bottom
Score = 76.
Message =
  case Score of
    Value when Value >= 90 -> very_good;
    Value when Value >= 60 -> pass;
    _Other -> try_again
  end.

%% Look at the chosen atom
Message.`,
      caption: "Change `Score` to 95 and 40, and run the code each time.",
      output: [
        "`76` produces the atom `pass`.",
        "`95` produces `very_good`.",
        "`40` produces `try_again`.",
      ],
    },
    steps: [
      "`case Score of` says that the following branches will match `Score`.",
      "The first two branches end with semicolons because more branches follow. The final branch has no semicolon.",
      "The dot in `end.` ends the whole `case` expression.",
    ],
    practice: {
      task: "Choose an action for a weather atom: `rain` returns `umbrella`, `sunny` returns `hat`, and anything else returns `look_up`.",
      starter: `%% Clear Score, Message, and any old Weather value
f().

%% Try other atoms too
Weather = rain.

case Weather of
  ____ -> umbrella;
  ____ -> hat;
  ____ -> look_up
end.`,
      expected: "`rain` produces `umbrella`, and `sunny` produces `hat`.",
      hint: "Use fixed atoms in the first two blanks. Use `_Other` to catch every other value.",
      answer: `%% f() is used only in the shell
f().

%% Weather is the atom to match
Weather = rain.

case Weather of
  rain -> umbrella;
  sunny -> hat;
  _Other -> look_up
end.`,
    },
    check: {
      question: "Should the final `case` branch end with a semicolon?",
      answer: "No. A semicolon means that another branch follows. The final branch goes straight to `end.`.",
    },
    takeaways: [
      "`case` chooses the first matching branch from top to bottom.",
      "The order of patterns can change the result.",
      "Semicolons separate branches. `end.` closes the whole `case`.",
    ],
  },
  {
    number: "08",
    slug: "recursion",
    stage: "scratch",
    title: "Let a function keep going",
    summary: "Stop at an empty list and use a head-and-tail pattern for the next item.",
    duration: "35 minutes",
    goal: "Run the recursive function with `[1, 2, 3]`, confirm `[2, 4, 6]`, and find the `[]` clause that stops it.",
    plain: [
      "Erlang often processes a list with recursion. A function handles the first item, then gives the remaining list to itself.",
      "Recursion needs a stopping condition. For a list, the empty list `[]` is a natural finish line.",
      "One function can have several clauses. Erlang searches from top to bottom for a clause with the right shape. Here, the first clause receives an empty list and the second receives `[Head | Tail]`.",
    ],
    concepts: [
      {
        term: "recursion",
        explanation: "A function calls itself inside its own definition.",
      },
      {
        term: "function clause",
        explanation: "One entry point for a function. Each clause accepts a different shape of argument.",
      },
      {
        term: "stopping condition",
        explanation: "A case that does not call the function again. This example returns when it reaches an empty list.",
      },
    ],
    symbols: [
      { token: "fun Loop([]) ->", reading: "Create an anonymous function with the internal name `Loop`. Its first clause accepts an empty list." },
      { token: "Loop([Head | Tail]) ->", reading: "The second clause splits the current item from the remaining items." },
      { token: "[Head * 2 | Loop(Tail)]", reading: "Put in the current result, then let `Loop` handle the shorter `Tail`." },
    ],
    example: {
      label: "Copy the whole block into the erl shell",
      code: `%% Clear variables left in the shell by earlier lessons
f().

%% Double stores the function; Loop is only for recursion inside it
Double =
  fun Loop([]) ->
        [];
      Loop([Head | Tail]) ->
        [Head * 2 | Loop(Tail)]
  end.

%% Call the function with its outside name
Double([1, 2, 3]).`,
      caption: "Read the `[]` clause first, then the `[Head | Tail]` clause. Do not try to follow every call at once.",
      output: [
        "`Double([1, 2, 3])` returns `[2, 4, 6]`.",
        "The list becomes one item shorter with each call.",
        "When the input reaches `Loop([])`, it returns `[]` and the recursion stops.",
      ],
    },
    steps: [
      "For the input `[1, 2, 3]`, `Head` is 1 and `Tail` is `[2, 3]`.",
      "This layer prepares `1 * 2`. The remaining work becomes `Loop([2, 3])`.",
      "`Loop` is visible only inside this `fun`. Code outside calls the whole function through the variable `Double`.",
      "The semicolon says another `fun` clause follows. The last clause goes straight to `end.`.",
      "At last, the empty-list clause returns `[]`. The results from the earlier layers are then joined back together.",
    ],
    practice: {
      task: "Complete `AddOne` so that it adds 1 to every number in a list.",
      starter: `%% Clear old variables so you can practice again
f().

%% Keep the stopping condition as it is
AddOne =
  fun Loop([]) ->
        [];
      Loop([Head | Tail]) ->
        [____ | Loop(Tail)]
  end.

%% Call the function and check its result
AddOne([2, 3, 4]).`,
      expected: "`AddOne([2, 3, 4])` should return `[3, 4, 5]`.",
      hint: "The new value for the current item is `Head + 1`.",
      answer: `%% f() belongs in the shell, not in an .erl file
f().

%% AddOne is the outside name; Loop is the inside recursion name
AddOne =
  fun Loop([]) ->
        [];
      Loop([Head | Tail]) ->
        [Head + 1 | Loop(Tail)]
  end.

%% This should return [3,4,5]
AddOne([2, 3, 4]).`,
    },
    check: {
      question: "Where does this recursion stop?",
      answer: "When the input becomes an empty list, `Loop([]) -> []` returns directly and does not call itself again.",
    },
    takeaways: [
      "Recursion turns a large problem into a smaller problem of the same kind.",
      "Without the `[]` clause, this example reaches an empty list and raises `function_clause`. Recursion only runs forever when the problem does not get smaller.",
      "Find the stopping condition before reading the recursive clause.",
    ],
  },
  {
    number: "09",
    slug: "modules-and-beam",
    stage: "scratch",
    title: "Put code in a module",
    summary: "Save functions in an `.erl` file, compile them, and look ahead to BEAM.",
    duration: "40 minutes",
    goal: "Save `village.erl`, compile it with `c(village).`, and run `village:greet(<<\"Maya\">>).`",
    plain: [
      "The shell is like scratch paper. Named functions that need to be saved and reused usually belong in a module file. The file name and module name should match.",
      "`-export([greet/1]).` allows code outside the module to call `greet/1`. The `/1` matters because functions with the same name but different arities are different functions.",
      "Once the module runs, you are ready for BEAM's strengths: small processes, messages, supervision, and recovery from failures. Those belong to the next learning path.",
    ],
    concepts: [
      {
        term: "module",
        explanation: "A group of functions in one `.erl` file. The module name usually matches the file name.",
      },
      {
        term: "export",
        explanation: "A list of functions that code outside the module may call. Each item uses `name/arity`.",
      },
      {
        term: "process",
        explanation: "A small, independent unit of work on the BEAM. Processes work together by sending messages.",
      },
    ],
    symbols: [
      { token: "-module(village).", reading: "Declare the module name as `village`. The file should be called `village.erl`." },
      { token: "-export([greet/1]).", reading: "Make the one-argument `greet` function public." },
      { token: "c(village).", reading: "Compile and load `village.erl` in the Erlang shell." },
    ],
    example: {
      label: "Save as village.erl",
      code: `%% Keep the file name and module name the same
-module(village).

%% Allow code outside the module to call greet/1
-export([greet/1]).

%% Name is a binary
greet(Name) ->
  <<"hello, ", Name/binary>>.`,
      caption: "After saving, open `erl` in the same folder and run `c(village).`.",
      output: [
        "When compilation succeeds, `c(village).` returns `{ok,village}`.",
        "`village:greet(<<\"Maya\">>).` returns `<<\"hello, Maya\">>`.",
      ],
    },
    steps: [
      "`-module(village).` declares the module name. The file should be `village.erl`.",
      "`/1` in `-export([greet/1]).` says that `greet` takes one argument.",
      "`Name/binary` appends the incoming binary to the fixed text.",
      "After compiling, call it with `module:function(argument)`: `village:greet(<<\"Maya\">>)`.",
    ],
    practice: {
      task: "Add a public function `farewell/1` that returns `<<\"bye, \", Name/binary>>`.",
      starter: `-module(village).

%% Export one more function in this list
-export([greet/1, ____]).

greet(Name) ->
  <<"hello, ", Name/binary>>.

%% Complete the new function
____(Name) ->
  <<"bye, ", Name/binary>>.`,
      expected: "After compiling again, `village:farewell(<<\"Maya\">>).` should return `<<\"bye, Maya\">>`.",
      hint: "Put `farewell/1` in the export list. Put only `farewell` in the function definition.",
      answer: `-module(village).

%% Both functions take one argument
-export([greet/1, farewell/1]).

greet(Name) ->
  <<"hello, ", Name/binary>>.

%% The final function definition ends with a dot
farewell(Name) ->
  <<"bye, ", Name/binary>>.`,
    },
    check: {
      question: "Why does the export list say `greet/1` instead of only `greet`?",
      answer: "Erlang identifies a function by both its name and its number of arguments. `greet/1` and `greet/2` are different functions.",
    },
    takeaways: [
      "Keep the module name and `.erl` file name the same.",
      "An export list identifies functions with `name/arity`.",
      "After learning the syntax, continue to BEAM processes and messages.",
    ],
  },
];

const elixirFoundationLessonsEn = [
  buildExtendedLesson({
    number: "10", slug: "operators-and-truthiness", stage: "foundation",
    title: "Ask precise true-or-false questions",
    summary: "Compare values and separate truthy operators from strict Boolean operators.",
    goal: "Run four comparisons and predict which values are `true`, `false`, or passed through.",
    concepts: [
      { term: "truthy", explanation: "Only `false` and `nil` are falsy in Elixir; every other value is truthy." },
      { term: "strict equality", explanation: "`===` compares both value and numeric type, while `==` allows integer-float equality." },
      { term: "Boolean operators", explanation: "`and`, `or`, and `not` require Boolean inputs; `&&`, `||`, and `!` accept any value." },
    ],
    symbols: [
      { token: "== / ===", reading: "Compare loosely or strictly." },
      { token: "||", reading: "Return the left value when it is truthy; otherwise return the right value." },
      { token: "or", reading: "Combine Boolean values only." },
    ],
    code: `# Compare equality and truthiness
value = 0
{value == 0.0, value === 0.0, value || :fallback, false or true}`,
    output: ["The tuple is `{true, false, 0, true}`; zero is truthy in Elixir."],
    practice: {
      task: "Compare `2` with `2.0` twice, then give `nil` a fallback value.",
      starter: `{2 ____ 2.0, 2 ____ 2.0, nil ____ :missing}`,
      expected: "Return `{true, false, :missing}`.",
      hint: "Use `==`, `===`, and `||` in that order.",
      answer: `{2 == 2.0, 2 === 2.0, nil || :missing}`,
    },
    check: { question: "Is `0` falsy in Elixir?", answer: "No. Only `false` and `nil` are falsy." },
    takeaways: ["Use `===` when numeric type matters.", "Zero and empty collections are truthy.", "Use strict Boolean operators only with Booleans."],
  }),
  buildExtendedLesson({
    number: "11", slug: "nested-collections", stage: "foundation",
    title: "Read and update nested data",
    summary: "Use keyword lists, maps, `get_in`, `put_in`, and `update_in` without changing the source value.",
    goal: "Update one nested age and prove that the original map still holds the old value.",
    concepts: [
      { term: "keyword list", explanation: "A keyword list is a list of two-item tuples with atom keys; options often use this form." },
      { term: "nested access", explanation: "`get_in/2` follows a path through nested maps or keyword data." },
      { term: "immutable update", explanation: "`put_in` and `update_in` return new data instead of editing the original value." },
    ],
    symbols: [
      { token: "[active: true]", reading: "Write a keyword list." },
      { token: "get_in(data, path)", reading: "Read a value along a nested path." },
      { token: "put_in(data.path, value)", reading: "Return a copy with one nested value replaced." },
    ],
    code: `# Update a nested map without changing student
student = %{profile: %{name: "Maya", age: 12}, options: [active: true]}
older = put_in(student.profile.age, 13)
{get_in(older, [:profile, :name]), student.profile.age, older.profile.age}`,
    output: ["The result is `{\"Maya\", 12, 13}`; `student` remains unchanged."],
    practice: {
      task: "Add 20 pages to a nested book map with `update_in`.",
      starter: `book = %{info: %{title: "River", pages: 80}}
longer = update_in(book.info.pages, fn pages -> ____ end)
{book.info.pages, longer.info.pages}`,
      expected: "Return `{80, 100}`.",
      hint: "Return `pages + 20` from the anonymous function.",
      answer: `book = %{info: %{title: "River", pages: 80}}
longer = update_in(book.info.pages, fn pages -> pages + 20 end)
{book.info.pages, longer.info.pages}`,
    },
    check: { question: "Does `put_in` edit its input map?", answer: "No. It returns a new value with the requested path changed." },
    takeaways: ["Keyword lists commonly carry options.", "Use paths to read nested data.", "Updates return new collections."],
  }),
  buildExtendedLesson({
    number: "12", slug: "unicode-and-text", stage: "foundation",
    title: "Count visible text and bytes",
    summary: "Compare graphemes, code points, bytes, and a simple Unicode-aware sigil.",
    goal: "Measure `长安🙂` as visible characters and as bytes, then match one character.",
    concepts: [
      { term: "grapheme", explanation: "A grapheme is one user-visible character, even when several code points build it." },
      { term: "code point", explanation: "A code point is one Unicode number; it is not always one visible character." },
      { term: "sigil", explanation: "A sigil begins with `~` and gives a compact notation for text, regexes, dates, and other values." },
    ],
    symbols: [
      { token: "String.length/1", reading: "Count graphemes in a string." },
      { token: "byte_size/1", reading: "Count bytes in a binary." },
      { token: "~r/.../u", reading: "Build a Unicode-aware regular expression." },
    ],
    code: `# Compare visible text with its UTF-8 bytes
text = "长安🙂"
{String.length(text), byte_size(text), String.codepoints(text), Regex.match?(~r/安/u, text)}`,
    output: ["The result is `{3, 10, [\"长\", \"安\", \"🙂\"], true}`."],
    practice: {
      task: "Split `Go🙂` into graphemes and count its bytes.",
      starter: `text = "Go🙂"
{String.____(text), ____(text)}`,
      expected: "Return `{[\"G\", \"o\", \"🙂\"], 6}`.",
      hint: "Use `graphemes` and `byte_size`.",
      answer: `text = "Go🙂"
{String.graphemes(text), byte_size(text)}`,
    },
    check: { question: "Must grapheme count equal byte count?", answer: "No. UTF-8 characters can use several bytes." },
    takeaways: ["Use graphemes for visible text.", "Use bytes for binary sizes and protocols.", "Sigils are compact constructors, not a new data type."],
  }),
  buildExtendedLesson({
    number: "13", slug: "named-functions-and-clauses", stage: "foundation",
    title: "Let function clauses choose",
    summary: "Define named functions with defaults, patterns, and guards.",
    goal: "Run two calls through different `price/2` clauses and verify the results.",
    concepts: [
      { term: "function clause", explanation: "Several definitions with the same name and arity can accept different patterns or guards." },
      { term: "guard", explanation: "A guard adds a permitted check after `when`." },
      { term: "default argument", explanation: "`\\\\` supplies an argument when the caller leaves it out." },
    ],
    symbols: [
      { token: "def price(age, discount \\\\ 0)", reading: "Declare a default second argument." },
      { token: "when age < 12", reading: "Choose this clause only when its guard passes." },
      { token: "_discount", reading: "Accept an argument that this clause does not use." },
    ],
    code: `# Define one public function with two clauses
defmodule Fare do
  def price(age, discount \\\\ 0)
  def price(age, _discount) when age < 12, do: 5
  def price(_age, discount), do: 10 - discount
end

{Fare.price(10), Fare.price(20, 2)}`,
    output: ["The calls return `{5, 8}`."],
    practice: {
      task: "Add `Label.name/1` clauses for zero and positive numbers.",
      starter: `defmodule Label do
  def name(0), do: ____
  def name(number) when number > 0, do: ____
end

{Label.name(0), Label.name(3)}`,
      expected: "Return `{:zero, :positive}`.",
      hint: "Return the atoms `:zero` and `:positive`.",
      answer: `defmodule Label do
  def name(0), do: :zero
  def name(number) when number > 0, do: :positive
end

{Label.name(0), Label.name(3)}`,
    },
    check: { question: "Which matching clause runs?", answer: "Elixir tries clauses from top to bottom and runs the first match whose guard passes." },
    takeaways: ["Name and arity identify a function.", "Patterns and guards select clauses.", "Defaults belong in a function head when clauses follow."],
  }),
  buildExtendedLesson({
    number: "14", slug: "recursion-and-folds", stage: "foundation",
    title: "Solve a list twice",
    summary: "Compare explicit recursion with `Enum.reduce/3`.",
    goal: "Sum `[1, 2, 3, 4]` with recursion and with a fold, then compare both totals.",
    concepts: [
      { term: "base clause", explanation: "A recursive function needs a clause that returns without calling itself." },
      { term: "recursive clause", explanation: "The recursive clause handles one piece and calls itself with a smaller input." },
      { term: "fold", explanation: "`Enum.reduce/3` carries an accumulator through a collection." },
    ],
    symbols: [
      { token: "sum([])", reading: "Stop at an empty list." },
      { token: "sum([head | tail])", reading: "Handle one item and the remaining list." },
      { token: "Enum.reduce/3", reading: "Fold values into one accumulator." },
    ],
    code: `# Compare recursion with a library fold
defmodule Totals do
  def sum([]), do: 0
  def sum([head | tail]), do: head + sum(tail)
end

numbers = [1, 2, 3, 4]
{Totals.sum(numbers), Enum.reduce(numbers, 0, fn n, acc -> n + acc end)}`,
    output: ["Both paths return 10, so the result is `{10, 10}`."],
    practice: {
      task: "Multiply `[2, 3, 4]` with `Enum.reduce/3`.",
      starter: `Enum.reduce([2, 3, 4], ____, fn number, acc -> ____ end)`,
      expected: "Return `24`.",
      hint: "Start the accumulator at 1 and multiply it by each number.",
      answer: `Enum.reduce([2, 3, 4], 1, fn number, acc -> number * acc end)`,
    },
    check: { question: "What stops `Totals.sum/1`?", answer: "The `sum([])` clause returns 0 without another call." },
    takeaways: ["Every recursion needs a stopping clause.", "Make recursive input smaller.", "Prefer clear Enum functions for common collection work."],
  }),
  buildExtendedLesson({
    number: "15", slug: "control-flow", stage: "foundation",
    title: "Choose the smallest clear control form",
    summary: "Use `if`, `cond`, and `case` for different shapes of decisions.",
    goal: "Classify a score, inspect one parse result, and make one Boolean choice.",
    concepts: [
      { term: "if", explanation: "Use `if` for one Boolean question with at most two outcomes." },
      { term: "cond", explanation: "Use `cond` for several Boolean conditions checked from top to bottom." },
      { term: "case", explanation: "Use `case` when patterns should inspect one value." },
    ],
    symbols: [
      { token: "if ... do ... else", reading: "Choose between two Boolean paths." },
      { token: "cond do", reading: "Try conditions in order." },
      { token: "case value do", reading: "Match one value against clauses." },
    ],
    code: `# Use each form for the question it fits
score = 76
label = cond do score >= 90 -> :great; score >= 60 -> :pass; true -> :retry end
parsed = case Integer.parse("42") do {n, ""} -> {:ok, n}; _ -> {:error, :bad_text} end
allowed = if score >= 60, do: :yes, else: :no
{label, parsed, allowed}`,
    output: ["The result is `{:pass, {:ok, 42}, :yes}`."],
    practice: {
      task: "Use `cond` to label 5 as `:positive`, 0 as `:zero`, and smaller values as `:negative`.",
      starter: `number = 5
cond do
  number > 0 -> ____
  number == 0 -> ____
  true -> ____
end`,
      expected: "With 5, return `:positive`.",
      hint: "Fill the branches with three atoms.",
      answer: `number = 5
cond do
  number > 0 -> :positive
  number == 0 -> :zero
  true -> :negative
end`,
    },
    check: { question: "When is `case` clearer than `cond`?", answer: "Use `case` when several patterns inspect the shape of one value." },
    takeaways: ["Use `if` for one Boolean split.", "Use `cond` for ordered conditions.", "Use `case` for pattern-driven choices."],
  }),
  buildExtendedLesson({
    number: "16", slug: "structs-and-module-metadata", stage: "foundation",
    title: "Give domain data a shape",
    summary: "Define a struct with module documentation, required keys, and a function that matches it.",
    goal: "Build a `Book` struct and run a function that checks its page count.",
    concepts: [
      { term: "struct", explanation: "A struct is a map with a fixed module name and declared fields." },
      { term: "module attribute", explanation: "Attributes such as `@moduledoc`, `@doc`, and `@enforce_keys` add compile-time information." },
      { term: "struct pattern", explanation: "`%Book{pages: pages}` matches only a Book struct and extracts one field." },
    ],
    symbols: [
      { token: "defstruct", reading: "Declare struct fields and defaults." },
      { token: "@enforce_keys", reading: "Require selected fields when a struct is built." },
      { token: "%__MODULE__{}", reading: "Refer to the current module's struct inside its functions." },
    ],
    code: `# Define documented data and one operation
defmodule Book do
  @moduledoc "A small book record."
  @enforce_keys [:title]
  defstruct [:title, pages: 0]
  def long?(%__MODULE__{pages: pages}), do: pages >= 300
end

book = struct!(Book, title: "River", pages: 320)
{book.title, Book.long?(book)}`,
    output: ["The result is `{\"River\", true}`."],
    practice: {
      task: "Add an `author` field and build a book with that field.",
      starter: `defmodule NoteBook do
  defstruct [:title, ____]
end

struct!(NoteBook, title: "North", ____: "Maya")`,
      expected: "Return a NoteBook struct whose author is `\"Maya\"`.",
      hint: "Use the field name `author` in both blanks.",
      answer: `defmodule NoteBook do
  defstruct [:title, :author]
end

struct!(NoteBook, title: "North", author: "Maya")`,
    },
    check: { question: "Is every map a Book struct?", answer: "No. A struct carries its module name and declared fields." },
    takeaways: ["Structs give maps a domain shape.", "Attributes document and constrain modules.", "Pattern-match only the fields a function needs."],
  }),
  buildExtendedLesson({
    number: "17", slug: "project-and-first-tests", stage: "foundation",
    title: "Put one tested module in Mix",
    summary: "Read a Mix project layout and run a focused ExUnit test.",
    goal: "Create `score_card`, run its generated tests, and add one assertion for a pure function.",
    concepts: [
      { term: "test file", explanation: "ExUnit discovers files ending in `_test.exs` under the `test` directory." },
      { term: "assertion", explanation: "`assert` states a result that must be true." },
      { term: "dependency", explanation: "Dependencies are declared in `mix.exs` and fetched with Mix." },
    ],
    symbols: [
      { token: "mix new", reading: "Create a standard project tree." },
      { token: "mix test", reading: "Compile the project and run ExUnit tests." },
      { token: "assert left == right", reading: "Fail the test when both sides differ." },
    ],
    code: `# Run these commands in the system terminal
mix new score_card
cd score_card
mix test`,
    output: ["Mix creates `lib/`, `test/`, and `mix.exs`; the generated test should pass."],
    practice: {
      task: "Write a test that expects `ScoreCard.pass?(70)` to be true.",
      starter: `test "70 passes" do
  assert ScoreCard.pass?(70) == ____
end`,
      expected: "The assertion should expect `true`.",
      hint: "Replace the blank with the Boolean result.",
      answer: `test "70 passes" do
  assert ScoreCard.pass?(70) == true
end`,
    },
    check: { question: "Where do normal source modules live?", answer: "Mix projects keep application source under `lib/`." },
    takeaways: ["Mix gives a project a shared layout.", "Tests describe observable behavior.", "Keep early tests focused on pure functions."],
  }),
];

const elixirIntermediateLessonsEn = [
  buildExtendedLesson({
    number: "18", slug: "result-contracts", stage: "intermediate",
    title: "Make success and failure predictable",
    summary: "Use tagged tuples, `with`, and a small error contract.",
    goal: "Run one parser with valid, trailing, and non-positive input and inspect each tagged result.",
    concepts: [
      { term: "result contract", explanation: "A stable API returns the same outer shapes, such as `{:ok, value}` and `{:error, reason}`." },
      { term: "with", explanation: "`with` chains successful matches and sends the first failed match to `else`." },
      { term: "bang function", explanation: "A name ending in `!` commonly returns a value or raises, while its partner returns tagged results." },
    ],
    symbols: [
      { token: "{:ok, value}", reading: "Return successful data with a label." },
      { token: "with ... <- ... do", reading: "Continue while each pattern matches." },
      { token: "else", reading: "Turn failed matches into explicit errors." },
    ],
    code: `# Keep every outcome inside one result contract
parse_positive = fn text ->
  with {number, ""} <- Integer.parse(text), true <- number > 0 do
    {:ok, number}
  else
    :error -> {:error, :not_an_integer}
    {_number, rest} -> {:error, {:trailing_text, rest}}
    false -> {:error, :not_positive}
  end
end

{parse_positive.("7"), parse_positive.("7x"), parse_positive.("0")}`,
    output: ["The results are `{:ok, 7}`, `{:error, {:trailing_text, \"x\"}}`, and `{:error, :not_positive}`."],
    practice: {
      task: "Complete a `with` expression that accepts only an even integer.",
      starter: `with {number, ""} <- Integer.parse("12"), true <- ____(number, 2) == 0 do
  {:ok, number}
else
  _ -> {:error, :not_even_integer}
end`,
      expected: "Return `{:ok, 12}`.",
      hint: "Use `rem/2`.",
      answer: `with {number, ""} <- Integer.parse("12"), true <- rem(number, 2) == 0 do
  {:ok, number}
else
  _ -> {:error, :not_even_integer}
end`,
    },
    check: { question: "Why keep the outer tuple shapes stable?", answer: "Callers can pattern-match success and failure without guessing which type came back." },
    takeaways: ["Return stable tagged shapes.", "Use `with` for a short happy path.", "Reserve bang functions for APIs that intentionally raise."],
  }),
  buildExtendedLesson({
    number: "19", slug: "files-and-paths", stage: "intermediate",
    title: "Read and write one real file",
    summary: "Build a path, write UTF-8 text, and handle the tagged read result.",
    goal: "Write two lines to a temporary file, read them back, and count the lines.",
    concepts: [
      { term: "path", explanation: "`Path.join/2` builds a platform-safe path instead of joining strings by hand." },
      { term: "tagged file result", explanation: "Non-bang File functions return `{:ok, data}` or `{:error, reason}`." },
      { term: "resource boundary", explanation: "Files belong outside pure transformation functions so errors and cleanup stay visible." },
    ],
    symbols: [
      { token: "Path.join/2", reading: "Join path segments for the current operating system." },
      { token: "File.write/2", reading: "Write bytes and return a tagged result." },
      { token: "File.read/1", reading: "Read the file and return tagged data." },
    ],
    code: `# Write and read one temporary UTF-8 file
path = Path.join(System.tmp_dir!(), "beam-path-note.txt")
:ok = File.write(path, "north\nsouth\n")
{:ok, text} = File.read(path)
{path, String.split(text, "\n", trim: true)}`,
    output: ["The tuple contains the temporary path and `[\"north\", \"south\"]`."],
    practice: {
      task: "Append `east` to the same file and read it again.",
      starter: `:ok = File.write(path, "east\n", ____)
File.read(path)`,
      expected: "Use append mode and receive `{:ok, text}`.",
      hint: "Pass `[:append]` as the third argument.",
      answer: `:ok = File.write(path, "east\n", [:append])
File.read(path)`,
    },
    check: { question: "Why use `Path.join` instead of a hard-coded slash?", answer: "It builds a valid path on different operating systems." },
    takeaways: ["Build paths with Path.", "Keep file errors tagged.", "Separate file access from pure data cleanup."],
  }),
  buildExtendedLesson({
    number: "20", slug: "lazy-data-pipelines", stage: "intermediate",
    title: "Take only the data you need",
    summary: "Compare eager Enum work with a lazy Stream pipeline.",
    goal: "Build a lazy range pipeline and evaluate only its first three matching results.",
    concepts: [
      { term: "eager", explanation: "Enum functions compute their full result immediately." },
      { term: "lazy", explanation: "Stream functions describe work and wait until a consumer asks for values." },
      { term: "terminal operation", explanation: "A function such as `Enum.take/2` asks a stream to produce results." },
    ],
    symbols: [
      { token: "Stream.map/2", reading: "Add a lazy transformation." },
      { token: "Stream.filter/2", reading: "Add a lazy filter." },
      { token: "Enum.take/2", reading: "Consume only the requested number of values." },
    ],
    code: `# Describe a large pipeline, then ask for three results
result =
  1..1_000_000
  |> Stream.map(&(&1 * 2))
  |> Stream.filter(&(rem(&1, 3) == 0))
  |> Enum.take(3)

result`,
    output: ["The pipeline returns `[6, 12, 18]` without building a million-item result list."],
    practice: {
      task: "Square a large range lazily and take the first two squares above 20.",
      starter: `1..1_000
|> Stream.map(____)
|> Stream.filter(____)
|> Enum.take(2)`,
      expected: "Return `[25, 36]`.",
      hint: "Square with `&(&1 * &1)` and keep values greater than 20.",
      answer: `1..1_000
|> Stream.map(&(&1 * &1))
|> Stream.filter(&(&1 > 20))
|> Enum.take(2)`,
    },
    check: { question: "What makes a Stream start producing values?", answer: "A consumer such as `Enum.take/2` or `Enum.to_list/1`." },
    takeaways: ["Enum is eager.", "Stream delays work.", "Choose a bounded consumer for large or endless inputs."],
  }),
  buildExtendedLesson({
    number: "21", slug: "protocols", stage: "intermediate",
    title: "Give different data one shared action",
    summary: "Define a protocol and implement it for two data types.",
    goal: "Render an integer and a list through the same `Readable.render/1` call.",
    concepts: [
      { term: "protocol", explanation: "A protocol chooses an implementation from the type of its first argument." },
      { term: "implementation", explanation: "`defimpl` supplies protocol behavior for one data type." },
      { term: "dispatch", explanation: "Protocol dispatch selects the matching implementation at runtime." },
    ],
    symbols: [
      { token: "defprotocol", reading: "Declare a shared operation." },
      { token: "defimpl ... for:", reading: "Implement that operation for one type." },
      { token: "to_string/1", reading: "Convert a value through the String.Chars protocol." },
    ],
    code: `# Give integers and lists one shared rendering API
defprotocol Readable do
  def render(value)
end
defimpl Readable, for: Integer do
  def render(value), do: "number=#{value}"
end
defimpl Readable, for: List do
  def render(value), do: "items=#{length(value)}"
end

{Readable.render(7), Readable.render([:a, :b])}`,
    output: ["The result is `{\"number=7\", \"items=2\"}`."],
    practice: {
      task: "Add a protocol implementation for Atom.",
      starter: `defimpl Readable, for: ____ do
  def render(value), do: "atom=#{____}"
end`,
      expected: "`Readable.render(:ok)` should return `\"atom=ok\"`.",
      hint: "Use `Atom` and `Atom.to_string(value)`.",
      answer: `defimpl Readable, for: Atom do
  def render(value), do: "atom=#{Atom.to_string(value)}"
end`,
    },
    check: { question: "Does a protocol dispatch on every argument?", answer: "No. Elixir protocols dispatch on the type of the first argument." },
    takeaways: ["Protocols provide one action across types.", "Each type owns an implementation.", "Use protocols for data-type polymorphism, not process behavior."],
  }),
  buildExtendedLesson({
    number: "22", slug: "behaviours-and-callbacks", stage: "intermediate",
    title: "Write a callback contract",
    summary: "Define a generic behaviour and make a module satisfy it.",
    goal: "Declare `Greeter.greet/1`, implement it, and call the implementation directly.",
    concepts: [
      { term: "behaviour", explanation: "A behaviour declares callbacks that implementing modules promise to provide." },
      { term: "callback", explanation: "A callback gives a function name, arguments, and return type expected by the contract." },
      { term: "implementation module", explanation: "`@behaviour` asks the compiler to check that required callbacks exist." },
    ],
    symbols: [
      { token: "@callback", reading: "Declare one required function signature." },
      { token: "@behaviour", reading: "State which contract a module implements." },
      { token: "term()", reading: "Accept or return any Erlang term in a typespec." },
    ],
    code: `# Define a contract without creating a process
defmodule Greeter do
  @callback greet(String.t()) :: String.t()
end
defmodule Friendly do
  @behaviour Greeter
  @impl true
  def greet(name), do: "Hello, #{name}"
end

Friendly.greet("Maya")`,
    output: ["The call returns `\"Hello, Maya\"`. No process or GenServer is involved."],
    practice: {
      task: "Add a Formal module that implements the same callback.",
      starter: `defmodule Formal do
  @behaviour ____
  @impl true
  def greet(name), do: "Good day, #{____}"
end`,
      expected: "`Formal.greet(\"Maya\")` should return `\"Good day, Maya\"`.",
      hint: "Use `Greeter` and `name`.",
      answer: `defmodule Formal do
  @behaviour Greeter
  @impl true
  def greet(name), do: "Good day, #{name}"
end`,
    },
    check: { question: "Does every behaviour start a process?", answer: "No. A behaviour is a callback contract; OTP behaviours add process machinery later." },
    takeaways: ["Behaviours define module contracts.", "Callbacks are checked at compile time.", "Keep generic contracts separate from OTP process lessons."],
  }),
  buildExtendedLesson({
    number: "23", slug: "typespecs-and-dialyzer", stage: "intermediate",
    title: "Write down the data contract",
    summary: "Describe public input and output shapes with `@type` and `@spec`.",
    goal: "Add a result type and a function spec, then run the function with valid and invalid input.",
    concepts: [
      { term: "type alias", explanation: "`@type` gives a readable name to a term shape." },
      { term: "function spec", explanation: "`@spec` documents accepted arguments and possible return values." },
      { term: "Dialyzer", explanation: "Dialyzer compares inferred success types with specs to find suspicious paths." },
    ],
    symbols: [
      { token: "@type result(a)", reading: "Name a reusable tagged-result shape." },
      { token: "@spec", reading: "Declare a function's input and output contract." },
      { token: "::", reading: "Separate a name or expression from its type." },
    ],
    code: `# Describe both result branches before running them
defmodule Positive do
  @type result(a) :: {:ok, a} | {:error, :not_positive}
  @spec check(integer()) :: result(integer())
  def check(number) when number > 0, do: {:ok, number}
  def check(_number), do: {:error, :not_positive}
end

{Positive.check(3), Positive.check(0)}`,
    output: ["The result is `{{:ok, 3}, {:error, :not_positive}}`."],
    practice: {
      task: "Write a spec for a function that accepts a string and returns its length.",
      starter: `@spec length_of(____) :: ____
def length_of(text), do: String.length(text)`,
      expected: "Use `String.t()` and `non_neg_integer()`.",
      hint: "A length cannot be negative.",
      answer: `@spec length_of(String.t()) :: non_neg_integer()
def length_of(text), do: String.length(text)`,
    },
    check: { question: "Does a typespec validate data at runtime?", answer: "No. Specs document and support static analysis; runtime checks still need code." },
    takeaways: ["Specs make API shapes visible.", "Dialyzer finds some impossible or inconsistent paths.", "Specs do not replace tests or validation."],
  }),
  buildExtendedLesson({
    number: "24", slug: "testing-workflows", stage: "intermediate",
    title: "Test behavior and boundaries",
    summary: "Use setup data, doctests, focused assertions, and async-safe tests.",
    goal: "Write one normal assertion and one boundary assertion for the same pure function.",
    concepts: [
      { term: "test boundary", explanation: "Boundary cases sit where behavior changes, such as 59 versus 60." },
      { term: "setup", explanation: "A setup callback prepares fresh data for each test." },
      { term: "doctest", explanation: "Doctest runs examples written in module documentation." },
    ],
    symbols: [
      { token: "use ExUnit.Case, async: true", reading: "Allow independent tests to run concurrently." },
      { token: "setup", reading: "Return context data for each test." },
      { token: "doctest Module", reading: "Run documented IEx examples as tests." },
    ],
    code: `# lib/score.ex
defmodule Score do
  def pass?(score) when is_integer(score) and score in 60..100, do: true
  def pass?(_score), do: false

  def check(score) when is_integer(score) and score in 0..100,
    do: {:ok, score}

  def check(_score), do: {:error, :out_of_range}
end

# test/score_test.exs
defmodule ScoreTest do
  use ExUnit.Case, async: true

  test "pass boundary" do
    assert Score.pass?(60)
    refute Score.pass?(59)
  end
end`,
    output: ["`mix test` reports one passing test containing two boundary assertions."],
    practice: {
      task: "Add a test that rejects a negative score.",
      starter: `test "negative score" do
  assert Score.check(-1) == ____
end`,
      expected: "Expect `{:error, :out_of_range}`.",
      hint: "Use the tagged error returned by the public API.",
      answer: `test "negative score" do
  assert Score.check(-1) == {:error, :out_of_range}
end`,
    },
    check: { question: "When is `async: true` unsafe?", answer: "Avoid it when tests share mutable external state such as one database record or global process." },
    takeaways: ["Test behavior, not private steps.", "Place tests on both sides of boundaries.", "Share examples through setup or doctests only when they stay clear."],
  }),
  buildExtendedLesson({
    number: "25", slug: "tooling-and-escripts", stage: "intermediate",
    title: "Turn a project into a command",
    summary: "Add a custom Mix task and configure an escript entry point.",
    goal: "Build an escript and run its `main/1` function from the system terminal.",
    concepts: [
      { term: "Mix task", explanation: "A custom Mix task automates a project command under a namespaced task module." },
      { term: "escript", explanation: "An escript packages BEAM bytecode behind one executable command for systems with Erlang installed." },
      { term: "entry point", explanation: "The configured `main/1` function receives command-line arguments." },
    ],
    symbols: [
      { token: "escript: [main_module: App.CLI]", reading: "Choose the module that owns `main/1`." },
      { token: "mix escript.build", reading: "Build the executable file." },
      { token: "System.argv/0", reading: "Read command-line arguments inside a running VM when needed." },
    ],
    code: `# Run after configuring main_module in mix.exs
mix escript.build
./score_card 60 92 41`,
    output: ["The executable receives three text arguments through `main/1`."],
    practice: {
      task: "Write a `main/1` head that prints every argument on its own line.",
      starter: `def main(args) do
  Enum.each(args, fn arg -> ____(arg) end)
end`,
      expected: "Each argument should appear once.",
      hint: "Use `IO.puts/1`.",
      answer: `def main(args) do
  Enum.each(args, fn arg -> IO.puts(arg) end)
end`,
    },
    check: { question: "Does escript remove the need for Erlang?", answer: "No. The target system still needs an Erlang runtime." },
    takeaways: ["Automate repeated project work with Mix tasks.", "Use `main/1` as a small CLI boundary.", "Keep parsing and business rules outside the entry-point module."],
  }),
];

const elixirProjectLessonsEn = [
  buildExtendedLesson({
    number: "26", slug: "project-brief", stage: "project",
    title: "Write the project promise",
    summary: "Turn a vague log-cleaner idea into input, output, and error examples.",
    goal: "Write three acceptance examples before creating project modules.",
    concepts: [
      { term: "acceptance example", explanation: "A concrete input and expected output makes a requirement testable." },
      { term: "scope", explanation: "Scope lists what this project will and will not do." },
      { term: "invariant", explanation: "An invariant is a rule that must hold for every accepted result." },
    ],
    symbols: [
      { token: "%{input: ..., output: ...}", reading: "Store one executable example as data." },
      { token: ":skip", reading: "Label a line the project intentionally ignores." },
      { token: ":invalid", reading: "Label input the project must report." },
    ],
    code: `# Describe the project before implementing it
examples = [
  %{input: "  INFO ready  ", output: {:ok, {:info, "ready"}}},
  %{input: "", output: :skip},
  %{input: "BROKEN", output: {:error, :invalid_line}}
]

Enum.count(examples)`,
    output: ["The brief contains three executable examples."],
    practice: { task: "Add an example for `WARN hot`.", starter: `%{input: "WARN hot", output: ____}`, expected: "Use `{:ok, {:warn, \"hot\"}}`.", hint: "Keep the same tagged shape.", answer: `%{input: "WARN hot", output: {:ok, {:warn, "hot"}}}` },
    check: { question: "Why write examples before modules?", answer: "They keep implementation choices from changing the promised behavior." },
    takeaways: ["Start with observable examples.", "Keep the first scope small.", "Write invariants before optimizations."],
  }),
  buildExtendedLesson({
    number: "27", slug: "parse-real-input", stage: "project",
    title: "Parse one real line",
    summary: "Trim input, split once, normalize the level, and return a tagged result.",
    goal: "Parse valid, empty, and malformed lines without raising.",
    concepts: [
      { term: "parser boundary", explanation: "A parser turns outside text into a small internal data shape." },
      { term: "normalization", explanation: "Normalization converts equivalent spellings to one internal value." },
      { term: "total result", explanation: "Every input returns one documented result instead of falling through." },
    ],
    symbols: [
      { token: "String.split(..., parts: 2)", reading: "Split only the level from the remaining message." },
      { token: "String.downcase/1", reading: "Normalize the level text." },
      { token: "{:error, reason}", reading: "Return malformed input as data." },
    ],
    code: `# Parse without letting outside text leak inward
parse = fn line ->
  case String.split(String.trim(line), ~r/\\s+/, parts: 2) do
    [""] -> :skip
    [level, message] when level in ["INFO", "WARN"] -> {:ok, {String.to_atom(String.downcase(level)), message}}
    _ -> {:error, :invalid_line}
  end
end

{parse.(" INFO ready "), parse.(""), parse.("BROKEN")}`,
    output: ["The three results are `{:ok, {:info, \"ready\"}}`, `:skip`, and `{:error, :invalid_line}`."],
    practice: { task: "Accept `ERROR disk` as an error-level record.", starter: `when level in ["INFO", "WARN", ____]`, expected: "Add `\"ERROR\"`.", hint: "Keep external levels as strings in the guard.", answer: `when level in ["INFO", "WARN", "ERROR"]` },
    check: { question: "Why split with `parts: 2`?", answer: "The message may contain spaces; only the first boundary belongs to the level." },
    takeaways: ["Normalize at the boundary.", "Return tagged failures.", "Do not create atoms from unlimited outside text."],
  }),
  buildExtendedLesson({
    number: "28", slug: "design-module-api", stage: "project",
    title: "Keep the public API small",
    summary: "Separate file access, parsing, and pure summary logic.",
    goal: "Call one public `Cleaner.run/1` API while keeping helper steps private.",
    concepts: [
      { term: "public API", explanation: "A small public API gives callers fewer contracts to learn and protects internal changes." },
      { term: "pure core", explanation: "Pure functions transform supplied data without opening files or changing outside state." },
      { term: "boundary module", explanation: "A boundary module performs IO and converts its errors into project results." },
    ],
    symbols: [
      { token: "def run/1", reading: "Expose one project entry point." },
      { token: "defp", reading: "Keep an implementation helper private." },
      { token: "Enum.reduce/3", reading: "Build the summary in a pure fold." },
    ],
    code: `# Expose a small parser and one summary call
defmodule Cleaner do
  @levels %{"INFO" => :info, "WARN" => :warn, "ERROR" => :error}

  def parse_line(line) do
    case String.split(String.trim(line), ~r/\\s+/, parts: 2) do
      [""] -> :skip
      [level, message] ->
        case Map.fetch(@levels, level) do
          {:ok, tag} -> {:ok, {tag, message}}
          :error -> {:error, :invalid_line}
        end
      _ -> {:error, :invalid_line}
    end
  end

  def run(records), do: {:ok, count(records)}
  defp count(records), do: Enum.frequencies_by(records, fn {level, _message} -> level end)
end

Cleaner.run([{:info, "ready"}, {:warn, "hot"}, {:info, "done"}])`,
    output: ["The API returns `{:ok, %{info: 2, warn: 1}}`."],
    practice: { task: "Add a public `total/1` that returns the number of records.", starter: `def total(records), do: ____`, expected: "Return the list length.", hint: "Use `length/1`.", answer: `def total(records), do: length(records)` },
    check: { question: "Should callers invoke `count/1`?", answer: "No. `defp` keeps it private so the module can change its implementation." },
    takeaways: ["Expose a narrow API.", "Keep transformations pure.", "Put IO and error conversion at boundaries."],
  }),
  buildExtendedLesson({
    number: "29", slug: "types-docs-and-tests", stage: "project",
    title: "Make the promise executable",
    summary: "Add docs, specs, examples, and boundary tests to the project API.",
    goal: "Write one spec, one documented example, and tests for both success and failure.",
    concepts: [
      { term: "public contract", explanation: "Docs, specs, and tests describe the same externally visible behavior." },
      { term: "doctest", explanation: "A doctest turns a short documented IEx example into a regression check." },
      { term: "fixture", explanation: "A small fixed input makes edge cases repeatable." },
    ],
    symbols: [
      { token: "@doc", reading: "Explain behavior and include a small example." },
      { token: "@spec", reading: "State accepted and returned term shapes." },
      { token: "assert / refute", reading: "Check positive and negative behavior." },
    ],
    code: `# test/cleaner_test.exs
defmodule CleanerTest do
  use ExUnit.Case, async: true

  describe "parse_line/1" do
    test "accepts a known level" do
      assert Cleaner.parse_line("INFO ready") == {:ok, {:info, "ready"}}
    end

    test "rejects a malformed line" do
      assert Cleaner.parse_line("BROKEN") == {:error, :invalid_line}
    end
  end
end`,
    output: ["`mix test` should report two passing contract tests."],
    practice: { task: "Add a test for an empty line.", starter: `test "skips empty input" do
  assert Cleaner.parse_line("") == ____
end`, expected: "Expect `:skip`.", hint: "Use the brief's exact result.", answer: `test "skips empty input" do
  assert Cleaner.parse_line("") == :skip
end` },
    check: { question: "Which artifact wins when docs and tests disagree?", answer: "Fix the disagreement against the agreed acceptance examples; all contract artifacts should say the same thing." },
    takeaways: ["Keep docs, specs, and tests aligned.", "Test failures as carefully as success.", "Use tiny fixtures that show one rule."],
  }),
  buildExtendedLesson({
    number: "30", slug: "package-and-observe", stage: "project",
    title: "Package the edge and leave clues",
    summary: "Keep CLI parsing thin, log useful context, and build the escript.",
    goal: "Run the CLI with one file path and log a count without logging file contents.",
    concepts: [
      { term: "thin entry point", explanation: "A CLI entry point parses arguments, calls the API, prints a result, and does little else." },
      { term: "structured context", explanation: "Log fields such as path and count separately from the message." },
      { term: "privacy boundary", explanation: "Operational clues should not expose full user data or secrets." },
    ],
    symbols: [
      { token: "Logger.info/1", reading: "Write one useful operational message." },
      { token: "main([path])", reading: "Accept exactly one file argument." },
      { token: "mix escript.build", reading: "Package the command after tests pass." },
    ],
    code: `# lib/cleaner/cli.ex
defmodule Cleaner.CLI do
  require Logger

  def main([path]) do
    with {:ok, text} <- File.read(path),
         {:ok, records} <- parse_lines(String.split(text, "\\n")),
         {:ok, counts} <- Cleaner.run(records) do
      Logger.info("cleaned records path=#{inspect(path)} count=#{length(records)}")
      IO.inspect(counts, label: "levels")
      :ok
    else
      {:error, reason} -> fail(reason)
    end
  end

  def main(_args), do: {:error, :usage}

  defp parse_lines(lines) do
    Enum.reduce_while(lines, {:ok, []}, fn line, {:ok, records} ->
      case Cleaner.parse_line(line) do
        {:ok, record} -> {:cont, {:ok, [record | records]}}
        :skip -> {:cont, {:ok, records}}
        {:error, reason} -> {:halt, {:error, reason}}
      end
    end)
    |> then(fn
      {:ok, records} -> {:ok, Enum.reverse(records)}
      error -> error
    end)
  end

  defp fail(reason) do
    Logger.error("clean_failed reason=#{inspect(reason)}")
    {:error, reason}
  end
end`,
    output: ["The CLI reads one file, calls the project API, logs the path and accepted record count, and prints the level summary."],
    practice: { task: "Return a usage error when the CLI receives no path.", starter: `def main([]), do: ____`, expected: "Return `{:error, :usage}`.", hint: "Keep the error tagged.", answer: `def main([]), do: {:error, :usage}` },
    check: { question: "Should a log line copy every source line?", answer: "No. Record enough context to diagnose the run without exposing full input." },
    takeaways: ["Keep CLI code thin.", "Log decisions and counts.", "Run tests before packaging."],
  }),
  buildExtendedLesson({
    number: "31", slug: "project-acceptance", stage: "project",
    title: "Prove the project is done",
    summary: "Run the acceptance matrix, then finish with a short release checklist.",
    goal: "Execute every original example and produce a simple pass/fail report.",
    concepts: [
      { term: "acceptance matrix", explanation: "A matrix runs the agreed inputs through the public API and compares exact outputs." },
      { term: "regression", explanation: "A regression is old behavior that breaks after a later change." },
      { term: "release checklist", explanation: "A short checklist verifies tests, documentation, packaging, and known limits." },
    ],
    symbols: [
      { token: "Enum.all?/2", reading: "Confirm that every acceptance case passes." },
      { token: "mix test", reading: "Run the complete regression suite." },
      { token: "$?", reading: "In a shell, inspect whether the command exited successfully." },
    ],
    code: `# Run every promise through the public parser
cases = [
  {"INFO ready", {:ok, {:info, "ready"}}},
  {"", :skip},
  {"BROKEN", {:error, :invalid_line}}
]

Enum.all?(cases, fn {input, expected} -> Cleaner.parse_line(input) == expected end)`,
    output: ["The acceptance result is `true` when all three promises still hold."],
    practice: { task: "Add the `WARN hot` case to the matrix.", starter: `{"WARN hot", ____}`, expected: "Use `{:ok, {:warn, \"hot\"}}`.", hint: "Copy the result shape from the brief.", answer: `{"WARN hot", {:ok, {:warn, "hot"}}}` },
    check: { question: "Is a green acceptance matrix enough by itself?", answer: "No. Also run unit tests, check docs, build the command, and record known limits." },
    takeaways: ["Finish against the original promises.", "Keep regressions executable.", "Ship with a small, repeatable checklist."],
  }),
];

const erlangFoundationLessonsEn = [
  buildExtendedLesson({
    number: "10", slug: "operators-and-truthiness", stage: "foundation",
    title: "Compare terms and Boolean results",
    summary: "Use arithmetic, strict equality, term order, and short-circuit Boolean operators.",
    goal: "Run four comparisons and explain why `2 == 2.0` differs from `2 =:= 2.0`.",
    concepts: [
      { term: "exact equality", explanation: "`=:=` requires the same value and numeric type; `==` allows integer-float equality." },
      { term: "term order", explanation: "Erlang defines an order across term types, though application code should not depend on memorizing it." },
      { term: "short circuit", explanation: "`andalso` and `orelse` evaluate the right side only when needed, and their conditions are Boolean." },
    ],
    symbols: [
      { token: "== / =:=", reading: "Compare numerically or exactly." },
      { token: "andalso", reading: "Continue only when the left Boolean is true." },
      { token: "orelse", reading: "Use the right Boolean only when the left is false." },
    ],
    code: `%% Compare numeric types and Boolean paths
{2 == 2.0, 2 =:= 2.0, true andalso false, false orelse true}.`,
    output: ["The result is `{true,false,false,true}`."],
    practice: { task: "Check exact inequality and one short-circuit choice.", starter: `{3 ____ 3.0, false ____ true}.`, expected: "Return `{true,true}`.", hint: "Use `/=` is not exact; use `=/=` and `orelse`.", answer: `{3 =/= 3.0, false orelse true}.` },
    check: { question: "Does Erlang treat every non-false term as a Boolean?", answer: "No. Boolean operators expect the atoms `true` or `false`." },
    takeaways: ["Use exact comparison when type matters.", "Boolean operators need Boolean conditions.", "Do not build business rules from the global term order."],
  }),
  buildExtendedLesson({
    number: "11", slug: "nested-collections", stage: "foundation",
    title: "Read and update nested maps",
    summary: "Use map patterns, `maps:get/2`, and immutable map updates.",
    goal: "Update one nested age and return both the original and new values.",
    concepts: [
      { term: "map access", explanation: "`maps:get/2` reads a known key and raises when it is missing." },
      { term: "map update", explanation: "`Map#{key := value}` updates an existing key and returns a new map." },
      { term: "nested update", explanation: "Read the inner map, update it, then place that new map into the outer map." },
    ],
    symbols: [
      { token: "maps:get(Key, Map)", reading: "Read one key from a map." },
      { token: "#{key := Value}", reading: "Update an existing map key." },
      { token: "#{key => Value}", reading: "Add or replace a key." },
    ],
    code: `%% Rebuild each changed map layer
Student = #{profile => #{name => <<"Maya">>, age => 12}},
Profile = maps:get(profile, Student),
Older = Student#{profile := Profile#{age := 13}},
{maps:get(age, Profile), maps:get(age, maps:get(profile, Older))}.`,
    output: ["The result is `{12,13}`; `Student` still contains age 12."],
    practice: { task: "Change a nested page count from 80 to 100.", starter: `Book = #{info => #{pages => 80}},
Info = maps:get(info, Book),
Longer = Book#{info := Info#{pages := ____}},
{maps:get(pages, Info), maps:get(pages, maps:get(info, Longer))}.`, expected: "Return `{80,100}`.", hint: "Use 100 as the new page value.", answer: `Book = #{info => #{pages => 80}},
Info = maps:get(info, Book),
Longer = Book#{info := Info#{pages := 100}},
{maps:get(pages, Info), maps:get(pages, maps:get(info, Longer))}.` },
    check: { question: "Does a map update change the old map?", answer: "No. It returns a new map and keeps the old value available." },
    takeaways: ["Read known keys deliberately.", "Use `:=` to require an existing key.", "Rebuild nested layers from the inside out."],
  }),
  buildExtendedLesson({
    number: "12", slug: "unicode-and-text", stage: "foundation",
    title: "Build and inspect UTF-8 binaries",
    summary: "Compare code points, bytes, Unicode conversion, and bit-syntax segments.",
    goal: "Build `长安🙂` as UTF-8, count its bytes, and extract the first Unicode code point.",
    concepts: [
      { term: "bit syntax", explanation: "`<<>>` builds binaries from integer, binary, and typed segments." },
      { term: "UTF-8 segment", explanation: "`Codepoint/utf8` encodes one Unicode code point into its UTF-8 bytes." },
      { term: "Unicode conversion", explanation: "`unicode:characters_to_binary/1` converts supported character data into a UTF-8 binary." },
    ],
    symbols: [
      { token: "<<Head/utf8, Rest/binary>>", reading: "Read one UTF-8 code point and keep the remaining bytes." },
      { token: "byte_size/1", reading: "Count bytes in a binary." },
      { token: "unicode:characters_to_binary/1", reading: "Convert character data to UTF-8 bytes." },
    ],
    code: `%% Inspect Unicode as code points and bytes
Text = unicode:characters_to_binary([16#957F, 16#5B89, 16#1F642]),
<<First/utf8, Rest/binary>> = Text,
{First, byte_size(Text), Rest}.`,
    output: ["`First` is code point `16#957F`; the full binary uses 10 bytes."],
    practice: { task: "Build the UTF-8 binary for `A🙂` and read its first code point.", starter: `Text = unicode:characters_to_binary([$A, 16#1F642]),
<<First/____, Rest/____>> = Text,
{First, Rest}.`, expected: "Use `utf8` and `binary`; First should be 65.", hint: "The first segment is one code point, the rest is bytes.", answer: `Text = unicode:characters_to_binary([$A, 16#1F642]),
<<First/utf8, Rest/binary>> = Text,
{First, Rest}.` },
    check: { question: "Is byte count the same as visible-character count?", answer: "No. A UTF-8 code point can occupy several bytes, and graphemes can use several code points." },
    takeaways: ["Use binaries for modern text boundaries.", "State UTF-8 in bit syntax.", "Measure bytes only when bytes are the real unit."],
  }),
  buildExtendedLesson({
    number: "13", slug: "named-functions-and-clauses", stage: "foundation",
    title: "Let clauses choose the function path",
    summary: "Write named functions with patterns and guards in a module.",
    goal: "Compile two `price/1` clauses and run one child and one adult input.",
    concepts: [
      { term: "function clause", explanation: "Clauses with the same name and arity can accept different patterns or guards." },
      { term: "guard", explanation: "A guard refines a clause with permitted checks after `when`." },
      { term: "clause order", explanation: "Erlang tries matching clauses from top to bottom." },
    ],
    symbols: [
      { token: "price(Age) when Age < 12", reading: "Choose this clause for a child age." },
      { token: ";", reading: "Separate clauses of the same function." },
      { token: ".", reading: "End the final clause of the function." },
    ],
    code: `%% Save in fare.erl and compile it
-module(fare).
-export([price/1]).
price(Age) when Age < 12 -> 5;
price(_Age) -> 10.`,
    output: ["After compiling, `{fare:price(10), fare:price(20)}.` returns `{5,10}`."],
    practice: { task: "Write `label/1` clauses for zero and positive integers.", starter: `label(0) -> ____;
label(Number) when Number > 0 -> ____.`, expected: "Return `zero` and `positive`.", hint: "Use atoms as the two results.", answer: `label(0) -> zero;
label(Number) when Number > 0 -> positive.` },
    check: { question: "Why does the first clause end with a semicolon?", answer: "Another clause of the same function follows; the final clause ends with a dot." },
    takeaways: ["Name and arity identify a function.", "Patterns and guards select clauses.", "Put specific clauses before broad fallbacks."],
  }),
  buildExtendedLesson({
    number: "14", slug: "recursion-and-folds", stage: "foundation",
    title: "Solve a list twice",
    summary: "Compare explicit recursion with `lists:foldl/3`.",
    goal: "Sum `[1,2,3,4]` with a recursive fun and with a fold.",
    concepts: [
      { term: "base clause", explanation: "A recursive function stops by matching an input such as the empty list." },
      { term: "recursive clause", explanation: "The recursive clause handles one item and calls itself with a shorter tail." },
      { term: "fold", explanation: "`lists:foldl/3` carries an accumulator from left to right." },
    ],
    symbols: [
      { token: "fun Sum([]) ->", reading: "Stop at the empty list." },
      { token: "Sum([Head | Tail])", reading: "Handle one item and recurse on the tail." },
      { token: "lists:foldl/3", reading: "Combine a list into one accumulator." },
    ],
    code: `%% Compare recursion with a library fold
Sum = fun Loop([]) -> 0; Loop([Head | Tail]) -> Head + Loop(Tail) end,
Numbers = [1,2,3,4],
{Sum(Numbers), lists:foldl(fun(Number, Acc) -> Number + Acc end, 0, Numbers)}.`,
    output: ["Both paths return 10, so the tuple is `{10,10}`."],
    practice: { task: "Multiply `[2,3,4]` with `lists:foldl/3`.", starter: `lists:foldl(fun(Number, Acc) -> ____ end, ____, [2,3,4]).`, expected: "Return `24`.", hint: "Multiply Number by Acc and start at 1.", answer: `lists:foldl(fun(Number, Acc) -> Number * Acc end, 1, [2,3,4]).` },
    check: { question: "What stops the recursive fun?", answer: "Its `Loop([]) -> 0` clause returns without another call." },
    takeaways: ["Every recursion needs a base clause.", "Make each recursive input smaller.", "Use standard list folds for common accumulation."],
  }),
  buildExtendedLesson({
    number: "15", slug: "control-flow", stage: "foundation",
    title: "Choose with patterns, guards, and errors",
    summary: "Use `case`, `if`, and `try` for three different decisions.",
    goal: "Classify a score, inspect one parse result, and convert one expected error.",
    concepts: [
      { term: "case", explanation: "`case` matches one value against ordered patterns." },
      { term: "if expression", explanation: "Erlang `if` chooses the first guard expression that is true." },
      { term: "try expression", explanation: "`try` separates normal results from expected error classes and reasons." },
    ],
    symbols: [
      { token: "case Value of", reading: "Match one value against branches." },
      { token: "if Guard ->", reading: "Choose by guard conditions." },
      { token: "catch error:Reason ->", reading: "Handle a named error reason." },
    ],
    code: `%% Use each form for the decision it fits
Score = 76,
Label = if Score >= 90 -> great; Score >= 60 -> pass; true -> retry end,
Parsed = case string:to_integer("42") of {N, []} -> {ok, N}; _ -> {error, bad_text} end,
Safe = try binary_to_integer(<<"x">>) catch error:badarg -> {error, badarg} end,
{Label, Parsed, Safe}.`,
    output: ["The result is `{pass,{ok,42},{error,badarg}}`."],
    practice: { task: "Use `case` to turn `{error, timeout}` into `retry`.", starter: `case {error, timeout} of
  {ok, Value} -> Value;
  {error, ____} -> ____
end.`, expected: "Return `retry`.", hint: "Match `timeout` and return the atom `retry`.", answer: `case {error, timeout} of
  {ok, Value} -> Value;
  {error, timeout} -> retry
end.` },
    check: { question: "Is Erlang `if` a general else-if statement?", answer: "It is a sequence of guard clauses; use `case` when patterns describe the data more clearly." },
    takeaways: ["Use case for shapes.", "Use if for guard-only choices.", "Catch only errors the boundary expects."],
  }),
  buildExtendedLesson({
    number: "16", slug: "module-attributes-and-records", stage: "foundation",
    title: "Describe a module and one record",
    summary: "Use module attributes, exports, records, and record patterns.",
    goal: "Compile a Book record and call a function that reads its page field.",
    concepts: [
      { term: "module attribute", explanation: "Forms such as `-module`, `-export`, and `-doc` describe compiled code." },
      { term: "record", explanation: "A record gives tuple positions field names at compile time; its runtime value is still a tuple." },
      { term: "include file", explanation: "Shared record definitions commonly live in an `.hrl` file included at compile time." },
    ],
    symbols: [
      { token: "-record(book, {...}).", reading: "Declare record fields and defaults." },
      { token: "#book{pages = Pages}", reading: "Match a book record and extract one field." },
      { token: "-export([long/1]).", reading: "Make `long/1` callable from other modules." },
    ],
    code: `%% Save in book.erl and compile it
-module(book).
-export([long/1]).
-record(book, {title, pages = 0}).
long(#book{pages = Pages}) -> Pages >= 300.`,
    output: ["Inside the module, `long(#book{title = <<\"River\">>, pages = 320})` returns `true`."],
    practice: { task: "Add an author field with the default `unknown`.", starter: `-record(book, {title, pages = 0, ____ = ____}).`, expected: "Declare `author = unknown`.", hint: "Record defaults are ordinary Erlang terms.", answer: `-record(book, {title, pages = 0, author = unknown}).` },
    check: { question: "Is a record a tagged map at runtime?", answer: "No. Records compile to tuples, so keep them behind module boundaries." },
    takeaways: ["Attributes describe compiled modules.", "Records name tuple positions at compile time.", "Do not expose record layout as a public cross-language contract."],
  }),
  buildExtendedLesson({
    number: "17", slug: "rebar3-and-eunit", stage: "foundation",
    title: "Put one tested module in Rebar3",
    summary: "Create an Erlang application and run a focused EUnit test.",
    goal: "Create `score_card`, compile it, and run one passing EUnit assertion.",
    concepts: [
      { term: "Rebar3", explanation: "Rebar3 creates Erlang projects, resolves dependencies, compiles code, and runs tests." },
      { term: "EUnit", explanation: "EUnit discovers small test functions and assertion macros." },
      { term: "profile", explanation: "Rebar3 profiles keep test or development dependencies out of production builds." },
    ],
    symbols: [
      { token: "rebar3 new app", reading: "Create an OTP application project." },
      { token: "rebar3 compile", reading: "Compile project modules." },
      { token: "rebar3 eunit", reading: "Run EUnit tests." },
    ],
    code: `%% src/score_card.erl
-module(score_card).
-export([pass/1]).

-include_lib("eunit/include/eunit.hrl").

pass(Score) when is_integer(Score), Score >= 60, Score =< 100 -> true;
pass(_Score) -> false.

%% EUnit discovers functions whose names end in _test
pass_test() ->
  ?assertEqual(true, pass(70)).`,
    output: ["After `rebar3 new app score_card`, save the module and run `rebar3 eunit`; the focused test passes."],
    practice: { task: "Write an EUnit assertion that 70 passes.", starter: `pass_test() ->
  ?assertEqual(____, score_card:pass(70)).`, expected: "Expect `true`.", hint: "EUnit macros come from `eunit.hrl`.", answer: `pass_test() ->
  ?assertEqual(true, score_card:pass(70)).` },
    check: { question: "Should generated `_build/` files be committed?", answer: "No. Rebar3 regenerates build output from source and configuration." },
    takeaways: ["Use Rebar3 for repeatable projects.", "Keep source under `src/`.", "Run EUnit from the project root."],
  }),
];

const erlangIntermediateLessonsEn = [
  buildExtendedLesson({
    number: "18", slug: "result-contracts", stage: "intermediate",
    title: "Return success or failure as data",
    summary: "Use tagged tuples so callers can handle every expected result.",
    goal: "Write one function that returns `{ok, Value}` or `{error, Reason}` without throwing.",
    concepts: [
      { term: "tagged result", explanation: "A tuple beginning with `ok` or `error` makes the outcome visible to callers." },
      { term: "total function", explanation: "A total function returns a documented result for every allowed input shape." },
      { term: "exception boundary", explanation: "Reserve exceptions for unexpected failures; return ordinary validation errors as data." },
    ],
    symbols: [
      { token: "{ok, Value}", reading: "Return a successful value." },
      { token: "{error, Reason}", reading: "Return an expected failure reason." },
      { token: "case ... of", reading: "Handle every result tag explicitly." },
    ],
    code: `%% Make both outcomes easy to match
ParseAge = fun(Text) ->
  case string:to_integer(Text) of
    {Age, []} when Age >= 0 -> {ok, Age};
    _ -> {error, invalid_age}
  end
end,
{ParseAge("12"), ParseAge("old")}.`,
    output: ["The result is `{{ok,12},{error,invalid_age}}`."],
    practice: { task: "Reject ages above 120.", starter: `{Age, []} when Age >= 0, Age =< ____ -> {ok, Age};`, expected: "Use `120` as the upper boundary.", hint: "Add the number after `=<`.", answer: `{Age, []} when Age >= 0, Age =< 120 -> {ok, Age};` },
    check: { question: "Should invalid user input crash the caller?", answer: "Usually no. Return a tagged error that the caller can display or recover from." },
    takeaways: ["Make outcomes visible in tuples.", "Match every public result tag.", "Use exceptions for genuinely unexpected failures."],
  }),
  buildExtendedLesson({
    number: "19", slug: "files-and-io", stage: "intermediate",
    title: "Read and write one file safely",
    summary: "Build a path, write bytes, and match the result of reading them back.",
    goal: "Write a small text file and handle both the success and error branches of `file:read_file/1`.",
    concepts: [
      { term: "path", explanation: "A path names a place in the file system; `filename:join/1` builds it without hand-written separators." },
      { term: "binary file data", explanation: "`file:read_file/1` returns file contents as a binary when it succeeds." },
      { term: "IO result", explanation: "File functions return `{ok, Value}`, `ok`, or `{error, Reason}` instead of hiding failure." },
    ],
    symbols: [
      { token: "filename:join/1", reading: "Join path pieces for the current operating system." },
      { token: "file:write_file/2", reading: "Write iodata to a file." },
      { token: "file:read_file/1", reading: "Read a whole file as a binary result." },
    ],
    code: `%% Keep the path and both IO results visible
Path = filename:join(["tmp", "note.txt"]),
ok = filelib:ensure_dir(Path),
ok = file:write_file(Path, <<"ready\\n">>),
file:read_file(Path).`,
    output: ["The final call returns `{ok,<<\"ready\\n\">>}` when the file is readable."],
    practice: { task: "Match a missing-file error without crashing.", starter: `case file:read_file("missing.txt") of
  {ok, Data} -> {ok, Data};
  {error, ____} -> missing
end.`, expected: "Bind the reason to `enoent`.", hint: "The common missing-file reason is the atom `enoent`.", answer: `case file:read_file("missing.txt") of
  {ok, Data} -> {ok, Data};
  {error, enoent} -> missing
end.` },
    check: { question: "Why use `filename:join/1`?", answer: "It keeps path construction readable and portable across operating systems." },
    takeaways: ["Build paths with `filename`.", "Match file results.", "Keep external IO at a clear boundary."],
  }),
  buildExtendedLesson({
    number: "20", slug: "higher-order-data-pipelines", stage: "intermediate",
    title: "Build a data pipeline with functions",
    summary: "Filter, transform, and fold a list with small named steps.",
    goal: "Turn a list of scores into the sum of doubled passing scores.",
    concepts: [
      { term: "higher-order function", explanation: "A higher-order function receives another function, returns one, or both." },
      { term: "pipeline", explanation: "A pipeline passes data through a sequence of small transformations." },
      { term: "fold", explanation: "A fold visits each item while carrying one accumulated result." },
    ],
    symbols: [
      { token: "lists:filter/2", reading: "Keep items for which a predicate returns true." },
      { token: "lists:map/2", reading: "Transform every item." },
      { token: "lists:foldl/3", reading: "Accumulate a result from left to right." },
    ],
    code: `%% Keep each transformation small and inspectable
Scores = [41, 60, 72],
Passing = lists:filter(fun(N) -> N >= 60 end, Scores),
Doubled = lists:map(fun(N) -> N * 2 end, Passing),
lists:foldl(fun(N, Sum) -> N + Sum end, 0, Doubled).`,
    output: ["The result is `264`: `(60 * 2) + (72 * 2)`."],
    practice: { task: "Return the count of even numbers.", starter: `length(lists:filter(fun(N) -> N ____ 2 =:= 0 end, [1,2,3,4])).`, expected: "Return `2`.", hint: "Use `rem` for the remainder operator.", answer: `length(lists:filter(fun(N) -> N rem 2 =:= 0 end, [1,2,3,4])).` },
    check: { question: "Does this pipeline create Erlang processes?", answer: "No. These list functions run ordinary sequential transformations." },
    takeaways: ["Pass functions as values.", "Name intermediate data while learning.", "Use a fold when one result grows across the list."],
  }),
  buildExtendedLesson({
    number: "21", slug: "records-and-boundaries", stage: "intermediate",
    title: "Keep records behind a module boundary",
    summary: "Use a record internally and return a public map to callers.",
    goal: "Create an internal user record, then expose only a stable map shape.",
    concepts: [
      { term: "record", explanation: "A record gives compile-time names to tuple positions inside modules that share its definition." },
      { term: "public boundary", explanation: "A public boundary is the data shape other modules are allowed to depend on." },
      { term: "conversion", explanation: "Converting a private record to a map prevents callers from depending on tuple layout." },
    ],
    symbols: [
      { token: "#user{}", reading: "Construct or match the private record." },
      { token: "Record#user.name", reading: "Read one record field." },
      { token: "#{key => value}", reading: "Return a public map." },
    ],
    code: `%% Keep this record inside its owning module
-record(user, {name, age = 0}).

public(#user{name = Name, age = Age}) ->
  #{name => Name, age => Age}.`,
    output: ["Calling `public/1` inside the module returns a map such as `#{name => <<\"Maya\">>,age => 12}`."],
    practice: { task: "Hide age and expose only the name.", starter: `public(#user{name = Name}) -> #{____ => Name}.`, expected: "Return a map with the `name` key.", hint: "Use the atom `name`.", answer: `public(#user{name = Name}) -> #{name => Name}.` },
    check: { question: "Why not return a record from a public API?", answer: "Records compile to tuples, so changing a field can silently change the tuple layout expected by callers." },
    takeaways: ["Treat records as private structure.", "Use stable public data shapes.", "Convert at module boundaries."],
  }),
  buildExtendedLesson({
    number: "22", slug: "behaviours-and-callbacks", stage: "intermediate",
    title: "Define a module contract",
    summary: "Declare a callback and implement it in a separate module.",
    goal: "Create a greeter behaviour and one module that satisfies its callback.",
    concepts: [
      { term: "behaviour", explanation: "A behaviour lists callback functions that implementing modules promise to export." },
      { term: "callback", explanation: "A callback specification names the arguments and return type required by the contract." },
      { term: "implementation", explanation: "The `behaviour` attribute asks the compiler to warn when callbacks are missing." },
    ],
    symbols: [
      { token: "-callback", reading: "Declare one required function signature." },
      { token: "-behaviour(Module).", reading: "State which contract this module implements." },
      { token: "-export([greet/1]).", reading: "Make the callback callable." },
    ],
    code: `%% greeter.erl declares the contract
-module(greeter).
-callback greet(binary()) -> binary().

%% friendly.erl implements it
-module(friendly).
-behaviour(greeter).
-export([greet/1]).
greet(Name) -> <<"Hello, ", Name/binary>>.`,
    output: ["After compiling both modules, `friendly:greet(<<\"Maya\">>)` returns `<<\"Hello, Maya\">>`."],
    practice: { task: "Add the behaviour attribute to another module.", starter: `-module(formal).
____
-export([greet/1]).`, expected: "Declare `greeter` as the behaviour.", hint: "Use the `-behaviour(...)` attribute.", answer: `-module(formal).
-behaviour(greeter).
-export([greet/1]).` },
    check: { question: "Does a behaviour start a process?", answer: "No. It is a module contract. OTP behaviours add process patterns in later lessons." },
    takeaways: ["Behaviours declare contracts.", "Callbacks need exported implementations.", "A generic behaviour does not imply concurrency."],
  }),
  buildExtendedLesson({
    number: "23", slug: "typespecs-and-dialyzer", stage: "intermediate",
    title: "Describe the data contract",
    summary: "Add named types and function specs, then use Dialyzer to inspect suspicious paths.",
    goal: "Write a result type and a spec for a positive-number check.",
    concepts: [
      { term: "type", explanation: "A named type gives a readable label to an Erlang term shape." },
      { term: "spec", explanation: "A function spec documents accepted argument types and possible return values." },
      { term: "Dialyzer", explanation: "Dialyzer compares inferred success types with specs to find some inconsistent paths." },
    ],
    symbols: [
      { token: "-type", reading: "Name a reusable term shape." },
      { token: "-spec", reading: "Declare a function contract." },
      { token: "::", reading: "Separate a name or function from its type." },
    ],
    code: `%% Let tools and readers see both result branches
-type result(T) :: {ok, T} | {error, not_positive}.
-spec check(integer()) -> result(integer()).
check(N) when N > 0 -> {ok, N};
check(_N) -> {error, not_positive}.`,
    output: ["`check(3)` returns `{ok,3}` and `check(0)` returns `{error,not_positive}`."],
    practice: { task: "Write a spec for a binary length function.", starter: `-spec length_of(____) -> non_neg_integer().`, expected: "Accept `binary()`.", hint: "Use Erlang's built-in binary type.", answer: `-spec length_of(binary()) -> non_neg_integer().` },
    check: { question: "Does a spec check values at runtime?", answer: "No. Specs support documentation and static analysis; runtime validation still needs code." },
    takeaways: ["Name repeated shapes.", "Spec public functions.", "Treat Dialyzer as analysis, not a proof or runtime validator."],
  }),
  buildExtendedLesson({
    number: "24", slug: "eunit-and-common-test", stage: "intermediate",
    title: "Test small rules and whole flows",
    summary: "Use EUnit for focused functions and Common Test for multi-step scenarios.",
    goal: "Write a boundary assertion in EUnit and recognize a Common Test suite callback.",
    concepts: [
      { term: "unit test", explanation: "A unit test checks one small behavior with little setup." },
      { term: "test suite", explanation: "A Common Test suite groups scenarios and optional setup or cleanup callbacks." },
      { term: "boundary case", explanation: "A boundary case sits where behavior changes, such as 59 versus 60." },
    ],
    symbols: [
      { token: "?assertEqual", reading: "Compare an expected value with the actual value in EUnit." },
      { token: "-include_lib(\"eunit/include/eunit.hrl\").", reading: "Load EUnit assertion macros." },
      { token: "all/0", reading: "List Common Test cases in a suite." },
    ],
    code: `%% Keep both sides of the pass boundary together
-include_lib("eunit/include/eunit.hrl").

pass_boundary_test() ->
  ?assertEqual(true, score:pass(60)),
  ?assertEqual(false, score:pass(59)).`,
    output: ["`rebar3 eunit` reports one passing test when both boundary assertions hold."],
    practice: { task: "Add a negative-score assertion.", starter: `?assertEqual(____, score:check(-1)).`, expected: "Expect `{error,out_of_range}`.", hint: "Use the public tagged error.", answer: `?assertEqual({error, out_of_range}, score:check(-1)).` },
    check: { question: "When should you reach for Common Test?", answer: "Use it when a scenario needs several modules, setup steps, external resources, or suite-level lifecycle hooks." },
    takeaways: ["Use EUnit for small rules.", "Test both sides of boundaries.", "Use Common Test for larger scenarios."],
  }),
  buildExtendedLesson({
    number: "25", slug: "rebar3-profiles-and-escripts", stage: "intermediate",
    title: "Shape builds and make a command",
    summary: "Use Rebar3 profiles for environments and an escript entry point for a small CLI.",
    goal: "Build an escript whose `main/1` receives command-line arguments.",
    concepts: [
      { term: "profile", explanation: "A Rebar3 profile changes dependencies or options for a named environment such as test." },
      { term: "dependency", explanation: "Dependencies belong in `rebar.config`, where Rebar3 can resolve repeatable versions." },
      { term: "escript", explanation: "An escript packages BEAM code behind one executable command for a system with Erlang installed." },
    ],
    symbols: [
      { token: "{profiles, [...]}", reading: "Declare profile-specific configuration." },
      { token: "{escript_main_app, app}", reading: "Choose the application containing `main/1`." },
      { token: "rebar3 escriptize", reading: "Build the command under `_build`." },
    ],
    code: `%% cli.erl is the small command boundary
-module(cli).
-export([main/1]).
main(Args) ->
  lists:foreach(fun io:format/1, Args).

%% Then run: rebar3 escriptize`,
    output: ["Rebar3 creates an executable under `_build/default/bin/` when the escript settings are complete."],
    practice: { task: "Print each argument followed by a newline.", starter: `lists:foreach(fun(Arg) -> io:format("____", [Arg]) end, Args).`, expected: "Use the format string `~s~n`.", hint: "`~s` prints text and `~n` ends the line.", answer: `lists:foreach(fun(Arg) -> io:format("~s~n", [Arg]) end, Args).` },
    check: { question: "Does an escript include a complete Erlang runtime?", answer: "No. The target system still needs Erlang installed." },
    takeaways: ["Keep environment options in profiles.", "Let Rebar3 resolve dependencies.", "Keep `main/1` thin and move rules into normal modules."],
  }),
];

const erlangProjectLessonsEn = [
  buildExtendedLesson({
    number: "26", slug: "project-brief", stage: "project",
    title: "Write the project promise",
    summary: "Turn a log-cleaner idea into exact input, output, and error examples.",
    goal: "Write three acceptance examples before creating project modules.",
    concepts: [
      { term: "acceptance example", explanation: "A concrete input and expected output makes a requirement testable." },
      { term: "scope", explanation: "Scope records what this small project will and will not do." },
      { term: "invariant", explanation: "An invariant is a rule that must hold for every accepted result." },
    ],
    symbols: [
      { token: "#{input => ..., output => ...}", reading: "Store one executable example as a map." },
      { token: "skip", reading: "Label a line the project intentionally ignores." },
      { token: "invalid", reading: "Label input the project must report." },
    ],
    code: `%% Describe observable behavior before modules
Examples = [
  #{input => <<"  INFO ready  ">>, output => {ok, {info, <<"ready">>}}},
  #{input => <<>>, output => skip},
  #{input => <<"BROKEN">>, output => {error, invalid_line}}
],
length(Examples).`,
    output: ["The brief contains `3` executable examples."],
    practice: { task: "Add an example for `WARN hot`.", starter: `#{input => <<"WARN hot">>, output => ____}`, expected: "Use `{ok,{warn,<<\"hot\">>}}`.", hint: "Keep the same tagged tuple shape.", answer: `#{input => <<"WARN hot">>, output => {ok, {warn, <<"hot">>}}}` },
    check: { question: "Why write examples before modules?", answer: "They keep implementation choices from quietly changing promised behavior." },
    takeaways: ["Start with observable examples.", "Keep the first scope small.", "Write invariants before optimizations."],
  }),
  buildExtendedLesson({
    number: "27", slug: "parse-real-input", stage: "project",
    title: "Parse one real line",
    summary: "Trim a binary, split once, normalize its level, and return a tagged result.",
    goal: "Parse valid, empty, and malformed log lines without crashing.",
    concepts: [
      { term: "parser boundary", explanation: "A parser turns outside text into a small internal data shape." },
      { term: "normalization", explanation: "Normalization converts accepted spellings to one internal value." },
      { term: "complete result", explanation: "Every input returns one documented result instead of falling through." },
    ],
    symbols: [
      { token: "binary:split/3", reading: "Split the level from the remaining message." },
      { token: "string:trim/1", reading: "Remove surrounding whitespace." },
      { token: "{error, Reason}", reading: "Return malformed input as data." },
    ],
    code: `%% Keep outside text at one boundary
Parse = fun(Line) ->
  case binary:split(string:trim(Line), <<" ">>, [trim]) of
    [] -> skip;
    [<<"INFO">>, Message] -> {ok, {info, Message}};
    [<<"WARN">>, Message] -> {ok, {warn, Message}};
    _ -> {error, invalid_line}
  end
end,
{Parse(<<"INFO ready">>), Parse(<<>>), Parse(<<"BROKEN">>)}.`,
    output: ["The results show one accepted record, `skip`, and `{error,invalid_line}`."],
    practice: { task: "Accept an ERROR line.", starter: `[<<"ERROR">>, Message] -> {ok, {____, Message}};`, expected: "Use the atom `error`.", hint: "The internal level is a known atom.", answer: `[<<"ERROR">>, Message] -> {ok, {error, Message}};` },
    check: { question: "Why avoid creating atoms from arbitrary input?", answer: "Atoms are not garbage-collected in the usual way; unlimited outside values can exhaust the atom table." },
    takeaways: ["Normalize at the boundary.", "Return tagged failures.", "Convert only known text to atoms."],
  }),
  buildExtendedLesson({
    number: "28", slug: "design-module-api", stage: "project",
    title: "Keep the public API small",
    summary: "Separate file access, parsing, and pure summary logic.",
    goal: "Call one public `cleaner:run/1` function while helpers stay private.",
    concepts: [
      { term: "public API", explanation: "A small public API gives callers fewer contracts and protects internal changes." },
      { term: "pure core", explanation: "Pure functions transform supplied data without opening files or changing outside state." },
      { term: "boundary module", explanation: "A boundary performs IO and turns its failures into project results." },
    ],
    symbols: [
      { token: "-export([run/1]).", reading: "Expose one project entry point." },
      { token: "count/1", reading: "Keep an unexported helper private." },
      { token: "maps:update_with/4", reading: "Update one count in a map." },
    ],
    code: `%% Export a small parser and one summary call
-module(cleaner).
-export([run/1, parse_line/1]).

run(Records) -> {ok, count(Records)}.

parse_line(Line) ->
  case binary:split(string:trim(Line), <<" ">>, [trim]) of
    [] -> skip;
    [<<"INFO">>, Message] -> {ok, {info, Message}};
    [<<"WARN">>, Message] -> {ok, {warn, Message}};
    [<<"ERROR">>, Message] -> {ok, {error, Message}};
    _ -> {error, invalid_line}
  end.

count(Records) ->
  lists:foldl(fun({Level, _}, Acc) ->
    maps:update_with(Level, fun(N) -> N + 1 end, 1, Acc)
  end, #{}, Records).`,
    output: ["`cleaner:run([{info,<<\"ready\">>},{info,<<\"done\">>}])` returns `{ok,#{info => 2}}`."],
    practice: { task: "Add a public `total/1` function.", starter: `total(Records) -> ____.`, expected: "Return the list length.", hint: "Use `length/1` and remember to export the function.", answer: `total(Records) -> length(Records).` },
    check: { question: "Can callers invoke `count/1`?", answer: "No. It is not exported, so the module can change that helper without changing its public API." },
    takeaways: ["Export a narrow API.", "Keep transformations pure.", "Put IO and error conversion at boundaries."],
  }),
  buildExtendedLesson({
    number: "29", slug: "types-docs-and-tests", stage: "project",
    title: "Make the promise executable",
    summary: "Align specs, EDoc comments, and tests with the acceptance examples.",
    goal: "Write one spec and tests for both a valid and malformed line.",
    concepts: [
      { term: "public contract", explanation: "Documentation, specs, and tests should describe the same visible behavior." },
      { term: "EDoc", explanation: "EDoc turns structured module and function comments into browsable documentation." },
      { term: "fixture", explanation: "A small fixed input makes an edge case repeatable." },
    ],
    symbols: [
      { token: "%% @doc", reading: "Describe one public function for EDoc readers." },
      { token: "-spec", reading: "State the accepted and returned term shapes." },
      { token: "?assertEqual", reading: "Check exact public behavior in EUnit." },
    ],
    code: `%% test/cleaner_tests.erl
-module(cleaner_tests).

-include_lib("eunit/include/eunit.hrl").

%% Test both sides of the parser contract
parse_line_test_() ->
  [?_assertEqual({ok, {info, <<"ready">>}}, cleaner:parse_line(<<"INFO ready">>)),
   ?_assertEqual({error, invalid_line}, cleaner:parse_line(<<"BROKEN">>))].`,
    output: ["`rebar3 eunit` reports two passing contract checks."],
    practice: { task: "Add an empty-line check.", starter: `?_assertEqual(____, cleaner:parse_line(<<>>))`, expected: "Expect `skip`.", hint: "Use the brief's exact atom.", answer: `?_assertEqual(skip, cleaner:parse_line(<<>>))` },
    check: { question: "What should happen when docs and tests disagree?", answer: "Resolve the disagreement against the accepted examples, then make every contract artifact agree." },
    takeaways: ["Align docs, specs, and tests.", "Test failures as carefully as success.", "Use tiny fixtures that reveal one rule."],
  }),
  buildExtendedLesson({
    number: "30", slug: "package-and-observe", stage: "project",
    title: "Package the edge and leave clues",
    summary: "Keep `main/1` thin, log safe context, and build an escript.",
    goal: "Run the CLI with one file path and log a count without copying file contents.",
    concepts: [
      { term: "thin entry point", explanation: "A CLI entry point parses arguments, calls the API, prints a result, and does little else." },
      { term: "structured context", explanation: "Logger metadata keeps fields such as path and count separate from the message." },
      { term: "privacy boundary", explanation: "Operational clues should not expose full user data or secrets." },
    ],
    symbols: [
      { token: "logger:info/2", reading: "Write a formatted operational message." },
      { token: "main([Path])", reading: "Accept exactly one file argument." },
      { token: "rebar3 escriptize", reading: "Package the command after tests pass." },
    ],
    code: `%% src/cleaner_cli.erl
-module(cleaner_cli).
-export([main/1]).

main(Args) ->
  case run(Args) of
    ok -> ok;
    {error, _Reason} -> halt(1)
  end.

run([Path]) ->
  case file:read_file(Path) of
    {ok, Text} ->
      Lines = binary:split(Text, <<"\\n">>, [global, trim]),
      finish(Path, [cleaner:parse_line(Line) || Line <- Lines]);
    {error, Reason} ->
      fail(Reason)
  end;
run(_Args) ->
  fail(usage).

finish(Path, Results) ->
  case [Reason || {error, Reason} <- Results] of
    [] ->
      Records = [Record || {ok, Record} <- Results],
      {ok, Counts} = cleaner:run(Records),
      logger:info("cleaned path=~ts count=~B", [Path, length(Records)]),
      io:format("levels=~tp~n", [Counts]),
      ok;
    [Reason | _] ->
      fail(Reason)
  end.

fail(Reason) ->
  logger:error("clean_failed reason=~tp", [Reason]),
  {error, Reason}.`,
    output: ["The escript reads one file, calls `cleaner`, logs the accepted count, prints level totals, and exits with status 1 on failure."],
    practice: { task: "Return a usage error when no path is supplied.", starter: `main([]) -> ____.`, expected: "Return `{error,usage}`.", hint: "Keep the error tagged.", answer: `main([]) -> {error, usage}.` },
    check: { question: "Should logs copy every source line?", answer: "No. Record enough context to diagnose a run without exposing the full input." },
    takeaways: ["Keep CLI code thin.", "Log decisions and counts.", "Run tests before packaging."],
  }),
  buildExtendedLesson({
    number: "31", slug: "project-acceptance", stage: "project",
    title: "Prove the project is done",
    summary: "Run the acceptance matrix, then finish with a short release checklist.",
    goal: "Execute every original example and produce one clear pass or fail result.",
    concepts: [
      { term: "acceptance matrix", explanation: "A matrix runs agreed inputs through the public API and compares exact outputs." },
      { term: "regression", explanation: "A regression is old behavior that breaks after a later change." },
      { term: "release checklist", explanation: "A short checklist verifies tests, documentation, packaging, and known limits." },
    ],
    symbols: [
      { token: "lists:all/2", reading: "Confirm that every acceptance case passes." },
      { token: "rebar3 do eunit, ct", reading: "Run unit and Common Test suites." },
      { token: "$?", reading: "In a shell, inspect whether the command exited successfully." },
    ],
    code: `%% Run each promise through the public parser
Cases = [
  {<<"INFO ready">>, {ok, {info, <<"ready">>}}},
  {<<>>, skip},
  {<<"BROKEN">>, {error, invalid_line}}
],
lists:all(fun({Input, Expected}) -> cleaner:parse_line(Input) =:= Expected end, Cases).`,
    output: ["The acceptance result is `true` when all three promises still hold."],
    practice: { task: "Add the WARN case to the matrix.", starter: `{<<"WARN hot">>, ____}`, expected: "Use `{ok,{warn,<<\"hot\">>}}`.", hint: "Copy the shape from the brief.", answer: `{<<"WARN hot">>, {ok, {warn, <<"hot">>}}}` },
    check: { question: "Is a green acceptance matrix enough by itself?", answer: "No. Also run the suites, check docs, build the command, and record known limits." },
    takeaways: ["Finish against the original promises.", "Keep regressions executable.", "Ship with a small repeatable checklist."],
  }),
];

export const basicPathsEn: BasicPath[] = [
  {
    id: "elixir",
    language: "Elixir",
    title: "Elixir from scratch",
    shortTitle: "Elixir basics",
    subtitle: "Four stages: run code, write modules, handle real input, ship a project",
    description:
      "Thirty-one short lessons move through Scratch, Foundation, Intermediate, and Project. Run a complete example first, then unpack the syntax, change an input, and practice. Foundation is enough to enter the BEAM path; the rest builds a single-language project.",
    shell: "IEx",
    shellCommand: "iex",
    prerequisites: [
      "You can open a terminal. If you cannot yet, follow the installation page one step at a time.",
      "You do not need experience with another programming language.",
      "Set aside 15–35 minutes and study only one lesson at a time.",
    ],
    lessons: [
      ...elixirLessonsEn,
      ...elixirFoundationLessonsEn,
      ...elixirIntermediateLessonsEn,
      ...elixirProjectLessonsEn,
    ],
    bridge: {
      title: "Next: let the project face concurrency and failure",
      description:
        "You have worked with modules, files, tests, and a command-line project. Use the Start Line for one layered diagnostic, then follow the BEAM path into messages, capacity, and recovery.",
      href: "/learn/start-line",
      label: "Go to the BEAM Start Line",
    },
    references: [
      {
        label: "Elixir School · Basics",
        href: "https://elixirschool.com/en/lessons/basics",
      },
      {
        label: "Official Elixir · Basic types",
        href: "https://hexdocs.pm/elixir/basic-types.html",
      },
      {
        label: "Official Elixir · Anonymous functions",
        href: "https://hexdocs.pm/elixir/anonymous-functions.html",
      },
    ],
  },
  {
    id: "erlang",
    language: "Erlang",
    title: "Erlang from scratch",
    shortTitle: "Erlang basics",
    subtitle: "Four stages: run code, write modules, handle real input, ship a project",
    description:
      "Thirty-one short lessons move through Scratch, Foundation, Intermediate, and Project. Run a complete example first, then unpack terms and syntax, change an input, and practice. Foundation is enough to enter the BEAM path; the rest builds a single-language project.",
    shell: "erl",
    shellCommand: "erl",
    prerequisites: [
      "You can open a terminal. If you cannot yet, follow the installation page one step at a time.",
      "You do not need to learn Elixir first or know another programming language.",
      "Set aside 15–40 minutes and study only one lesson at a time.",
    ],
    lessons: [
      ...erlangLessonsEn,
      ...erlangFoundationLessonsEn,
      ...erlangIntermediateLessonsEn,
      ...erlangProjectLessonsEn,
    ],
    bridge: {
      title: "Next: let the project face concurrency and failure",
      description:
        "You have worked with modules, files, tests, and a command-line project. Use the Start Line for one layered diagnostic, then follow the BEAM path into messages, OTP, and supervision trees.",
      href: "/learn/start-line",
      label: "Go to the BEAM Start Line",
    },
    references: [
      {
        label: "Official Erlang · Sequential Programming",
        href: "https://www.erlang.org/doc/system/seq_prog.html",
      },
      {
        label: "Official Erlang · Data Types",
        href: "https://www.erlang.org/doc/system/data_types.html",
      },
      {
        label: "Official Erlang · Modules",
        href: "https://www.erlang.org/doc/system/modules.html",
      },
    ],
  },
];
