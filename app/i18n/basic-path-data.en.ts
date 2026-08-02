import type { BasicLesson, BasicPath } from "../basic-path-data";

const elixirLessonsEn: BasicLesson[] = [
  {
    number: "01",
    slug: "meet-iex",
    title: "Let the code speak",
    summary: "Open IEx, enter an expression, and tell code, results, and errors apart.",
    duration: "15 minutes",
    goal: "You can open IEx, run one line of code, and point out the input and the result.",
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
    title: "Meet six kinds of values",
    summary: "Start with integers, floats, booleans, nil, atoms, and strings.",
    duration: "20 minutes",
    goal: "You can name the type of a common value and tell `:ok` from `\"ok\"`.",
    plain: [
      "A value is something the code is working with. An age can be an integer. A height can be a decimal number. A name can be a string.",
      "A type tells us which operations a value can join. Numbers can be added. Strings can be joined. A different type is not better or worse. It simply has a different job.",
      "`:ok` is an atom, often used as a label. `\"ok\"` is a string made of two letters. They look alike, but they are different kinds of values.",
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
        explanation: "Text inside double quotes, such as `\"York\"`. It may contain spaces and letters from many languages.",
      },
    ],
    symbols: [
      { token: ":", reading: "Put it before a name to make an atom, for example `:ok`." },
      { token: "\" \"", reading: "Double quotes wrap text to make a string." },
      { token: "==", reading: "Compare the values on both sides. The result is `true` or `false`." },
    ],
    example: {
      label: "Meet values in IEx",
      code: `# An integer has no decimal point
12

# A float has a decimal point
12.5

# A boolean answers true or false
true

# nil means there is no value
nil

# An atom is like a fixed label
:ok

# Double quotes wrap a string
"Hello, Robin"

# An atom and a string are different values
:ok == "ok"`,
      caption: "Meet one kind of value per line. Look at its shape, then see what IEx returns.",
      output: [
        "The first six parts produce an integer, a float, a boolean, `nil`, an atom, and a string.",
        "`:ok` comes back unchanged. So does `\"Hello, Robin\"`.",
        "The final comparison returns `false` because an atom and a string are different types.",
      ],
    },
    steps: [
      "`12` and `12.5` are both numbers. The decimal point separates integers from floats.",
      "`true` and `false` stand for yes and no. `nil` means no value. Do not treat all three as one type.",
      "A name after a colon is an atom. Text in double quotes is a string. Therefore `:ok` is not equal to `\"ok\"`.",
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
      question: "Are `nil` and `false` the same value?",
      answer: "No. They are two different values. In a condition, however, both count as false.",
    },
    takeaways: [
      "First ask what a value is. Then decide how to use it.",
      "`:ok` is an atom. `\"ok\"` is a string.",
      "`nil` means no value. It is not 0 or empty text.",
    ],
  },
  {
    number: "03",
    slug: "collections",
    title: "Put values together",
    summary: "Use lists, tuples, and maps to hold groups of data.",
    duration: "25 minutes",
    goal: "You can choose a list, tuple, or map for a job and take one value out.",
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
    title: "Give values names",
    summary: "Learn binding, immutable data, and a few common operators.",
    duration: "20 minutes",
    goal: "You can name a value, explain rebinding, and choose operators for numbers, strings, and comparisons.",
    plain: [
      "Names make code easier to read. You can read `price = 8` as “the name price now points to 8.”",
      "Elixir data is never changed in place. `price + 2` creates a new value. The old number `8` does not change.",
      "The same name can be rebound to a new value. It may look like changing a variable, but the name is really pointing to a different value.",
    ],
    concepts: [
      {
        term: "binding",
        explanation: "Making a name point to a value, as in `count = 3`.",
      },
      {
        term: "immutable",
        explanation: "An existing value is not changed in place. A calculation creates a new value.",
      },
      {
        term: "comparison",
        explanation: "An operator such as `==` or `>` asks a true-or-false question.",
      },
    ],
    symbols: [
      { token: "=", reading: "For now, read this as “bind the value on the right to the name on the left.” The next lesson shows that it is also the match operator." },
      { token: "<>", reading: "Join two strings." },
      { token: "==", reading: "Ask whether both sides are equal. Do not leave out one equals sign." },
    ],
    example: {
      label: "A name can point elsewhere; a value does not change",
      code: `# price first points to the number 8
price = 8

# old_price remembers the first value
old_price = price

# price is rebound to the new number 10
price = price + 2

# <> joins two pieces of text
label = "Price: " <> Integer.to_string(price)

# A comparison returns true or false
{old_price, price, label, price > old_price}`,
      caption: "`price` points somewhere new. `old_price` still points to the original 8.",
      output: [
        "The result is `{8, 10, \"Price: 10\", true}`.",
        "The number 8 was not changed. Only `price` was rebound to 10.",
        "`price > old_price` is a true-or-false question.",
      ],
    },
    steps: [
      "`old_price = price` gives another name to the value 8.",
      "`price = price + 2` first uses the old 8 to calculate 10, then rebinds `price`.",
      "`Integer.to_string(price)` turns the number into a string so that `<>` can join it to text.",
    ],
    practice: {
      task: "A kite was 12 metres high, then climbed 5 metres. Keep the old height and calculate the new one.",
      starter: `# The original height
height = 12

# Use height to calculate a new value
new_height = ____

# Ask whether the new height is above 15
{height, new_height, ____}`,
      expected: "The result should be `{12, 17, true}`.",
      hint: "The new height is `height + 5`. Use `>` for “above.”",
      answer: `# The original value stays 12
height = 12

# Addition creates the new value 17
new_height = height + 5

# Return the old value, new value, and comparison
{height, new_height, new_height > 15}`,
    },
    check: {
      question: "Do `=` and `==` do the same job?",
      answer: "No. `==` compares two values. `=` performs pattern matching and can create bindings.",
    },
    takeaways: [
      "A name points to a value so later code can use it.",
      "A calculation creates a new value instead of changing the old one.",
      "Join strings with `<>`. Compare equality with `==`.",
    ],
  },
  {
    number: "05",
    slug: "pattern-matching",
    title: "Make the shapes match",
    summary: "Treat `=` as a match and unpack tuples, lists, and maps.",
    duration: "25 minutes",
    goal: "You can read a pattern on the left and unpack the values you need from a collection.",
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
      code: `# The fixed :ok label must match
# The underscore means we do not save the third value
{:ok, score, _} = {:ok, 92, :midterm}

# Split the first item from the rest of a list
[first | rest] = ["peach", "plum", "apricot"]

# A map pattern names only the key we need
%{name: name} = %{name: "Robin", age: 12}

# Look at the three new bindings
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
    title: "Choose with case",
    summary: "Match one value against branches, then add conditions with guards.",
    duration: "25 minutes",
    goal: "You can write clear branches for two or three inputs and know when `case` is useful.",
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
    title: "What /1 means after a function",
    summary: "Start with inputs and outputs, then read `String.trim/1`.",
    duration: "30 minutes",
    goal: "You can explain every part of `String.trim/1` and tell a function identity from a function call.",
    plain: [
      "A function takes input, does one job, and returns output. `String.trim(\"  pine  \")` takes text and returns a new string without spaces at either end.",
      "Documentation often writes `String.trim/1`. The number after the slash is called arity. It tells you that this function takes 1 argument.",
      "`String.trim/1` is the complete way to identify the function in documentation. It is not a call. The function's name is `trim`. To call it, put a value in parentheses: `String.trim(text)`.",
    ],
    concepts: [
      {
        term: "argument",
        explanation: "A value given to a function call. In `trim(text)`, `text` is one argument.",
      },
      {
        term: "return value",
        explanation: "The value a function gives back. `trim/1` returns a new string without spaces at the ends.",
      },
      {
        term: "arity",
        explanation: "The number of arguments a function takes. `String.trim/1` has arity 1. `String.replace/3` has arity 3.",
      },
    ],
    symbols: [
      { token: "String.trim/1", reading: "The `String` module, the `trim` function, and 1 argument. This identifies the function." },
      { token: "String.trim(text)", reading: "Give `text` as an argument and call the function now." },
      { token: "fn x -> ... end", reading: "Create an anonymous function with no name of its own." },
      { token: "\"Hello, #{name}\"", reading: "`#{...}` puts the result of the expression inside the braces into the string." },
    ],
    example: {
      label: "Call a function, then name it precisely",
      code: `# text has two spaces at each end
text = "  pine  "

# The argument goes in parentheses: this is a function call
clean = String.trim(text)

# An anonymous function also takes input and returns a result
double = fn number -> number * 2 end
twice = double.(6)

# Look at both results
{clean, twice}`,
      caption: "`String.trim/1` identifies the function. `String.trim(text)` calls it.",
      output: [
        "`clean` is `\"pine\"`.",
        "`double.(6)` returns `12`.",
        "An anonymous function call has a dot between the function value and the parentheses.",
      ],
    },
    steps: [
      "`String` is a module. A module keeps related functions together.",
      "`trim` is the function name. `/1` says it takes one argument, but a call does not include `/1`.",
      "`fn number -> number * 2 end` creates an anonymous function. Call it with `double.(6)`.",
    ],
    practice: {
      task: "Write an anonymous function named `greet`. It should take a name and return `\"Hello, name\"`.",
      starter: `# Receive one argument on the left of the arrow
greet = fn ____ -> "Hello, #{____}" end

# Call the anonymous function
greet.("Maya")`,
      expected: "The result should be `\"Hello, Maya\"`.",
      hint: "Use the same name, `name`, in both blank spaces.",
      answer: `# name receives the string passed to the function
greet = fn name -> "Hello, #{name}" end

# Call an anonymous function with .()
greet.("Maya")`,
    },
    check: {
      question: "Does `/1` in `trim/1` mean “divide by 1”?",
      answer: "No. Here `/1` says that the function takes 1 argument. It is not division.",
    },
    takeaways: [
      "A function turns input into output.",
      "`Module.function/arity` identifies one function precisely.",
      "Use `/1` to identify a function. Use `(argument)` to call it.",
    ],
  },
  {
    number: "08",
    slug: "capture-enum-pipe",
    title: "Unpack &1 and the pipe",
    summary: "Write a full anonymous function before reading captures, Enum, and `|>`.",
    duration: "35 minutes",
    goal: "You can expand `&(&1 * 2)` into a full anonymous function and read a short pipeline.",
    plain: [
      "`&1` is not a variable on its own. It only has meaning inside a capture expression that begins with `&`. It means the first argument received by the anonymous function.",
      "Learn the short form last. First read `fn number -> number * 2 end`. Then shorten it to `&(&1 * 2)`.",
      "Functions in `Enum` process the items in a collection. The pipe `|>` places the result on its left into the first argument position of the function on its right.",
    ],
    concepts: [
      {
        term: "capture",
        explanation: "`&` can capture an existing function or create a short anonymous function.",
      },
      {
        term: "Enum.map/2",
        explanation: "Give each item in a collection to a function, then collect all the new return values.",
      },
      {
        term: "pipe",
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
      task: "Add 1 to every number in `[2, 3, 4]`. Write a full anonymous function first, then use the `&1` short form.",
      starter: `# First try: write the full name
Enum.map([2, 3, 4], fn number -> ____ end)

# Second try: write the first argument as &1
Enum.map([2, 3, 4], &(____))`,
      expected: "Both lines should return `[3, 4, 5]`.",
      hint: "The full form uses `number + 1`. The short form only replaces `number` with `&1`.",
      answer: `# The long form gives the input a clear name
Enum.map([2, 3, 4], fn number -> number + 1 end)

# In the short form, &1 means the first argument
Enum.map([2, 3, 4], &(&1 + 1))`,
    },
    check: {
      question: "Does `&String.trim/1` immediately remove spaces from a string?",
      answer: "No. It only captures the function. The function runs later, when `Enum.map/2` gives each string to it.",
    },
    takeaways: [
      "Read the long form before the short form.",
      "`&1` is the first argument inside a short capture.",
      "A pipe puts the left result into the first argument on the right.",
    ],
  },
  {
    number: "09",
    slug: "modules-and-mix",
    title: "Put code in a project",
    summary: "Write a module, meet def, files, and Mix, then head toward BEAM.",
    duration: "35 minutes",
    goal: "You can read a tiny module and explain what `mix new` and `mix test` do.",
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
      "`def greet(name)` defines a public function. Its full identity is `Village.greet/1`.",
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
    title: "Open erl",
    summary: "Run expressions in the Erlang shell and remember the final dot.",
    duration: "15 minutes",
    goal: "You can open the Erlang shell, run an expression, and end it with a dot.",
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
    title: "Meet common terms",
    summary: "Learn numbers, atoms, tuples, lists, and maps.",
    duration: "25 minutes",
    goal: "You can name the type of a common Erlang term and tell an atom from text.",
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
      code: `%% Integers and floats are two kinds of numbers
{is_integer(12), is_float(12.5)}.

%% true and ok are both atoms
{is_atom(true), is_atom(ok)}.

%% A tuple often keeps a label and data together
{ok, 42}.

%% A map uses keys to explain its values
#{status => ready, score => 92}.`,
      caption: "Look at each shape, then use an `is_*` function to check it.",
      output: [
        "The first two lines both return `{true, true}`.",
        "The third line shows the tuple `{ok, 42}`.",
        "The last line shows a map with the keys `status` and `score`.",
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
    title: "Tell two kinds of text apart",
    summary: "Understand charlists, binaries, and UTF-8 text.",
    duration: "25 minutes",
    goal: "You can tell `\"cat\"` from `<<\"cat\">>` and know when new code should prefer a binary.",
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
    title: "A variable receives once",
    summary: "Learn capitalized variables, single assignment, and pattern matching.",
    duration: "25 minutes",
    goal: "You can tell an atom from a variable and use a match to take values from a tuple or map.",
    plain: [
      "An Erlang variable must begin with a capital letter or an underscore. `Score` is a variable. `score` is an atom.",
      "After a variable receives a value in a scope, it cannot be rebound to another one. This is called single assignment.",
      "`=` is the match operator. The left side gives a shape and the right side gives data. If the shapes do not fit, Erlang reports `badmatch`.",
    ],
    concepts: [
      {
        term: "variable",
        explanation: "A name beginning with a capital letter or underscore, such as `Name` or `_Rest`.",
      },
      {
        term: "single assignment",
        explanation: "After a variable receives a value, it cannot receive a different one in the same scope.",
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

%% The ok label must match; Score receives 92
{ok, Score} = {ok, 92}.

%% A map pattern takes only the key we need
#{name := Name} = #{name => <<"Robin">>, age => 12}.

%% A bound variable can only match the same value
92 = Score.

%% Look at both variables
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
    title: "Split a row of values",
    summary: "Use `[Head | Tail]` to read the head and tail of a list.",
    duration: "25 minutes",
    goal: "You can split a non-empty list into its first item and the remaining list, and you can recognize an empty list.",
    plain: [
      "A list is an ordered row of values. In `[peach, plum, apricot]`, the first item is the head. The remaining `[plum, apricot]` is the tail.",
      "Erlang writes this as `[Head | Tail]`. The bar does not mean “or.” It separates the head from the tail.",
      "The empty list `[]` has no head. Matching `[Head | Tail]` against an empty list fails.",
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
    ],
    symbols: [
      { token: "[ ]", reading: "Wrap a list." },
      { token: "|", reading: "Separate the head and tail in a list pattern." },
      { token: "[New | Old]", reading: "Put a new item at the front of an existing list." },
    ],
    example: {
      label: "Split a list, then put one new value back",
      code: `%% Fruits is a list of three atoms
Fruits = [peach, plum, apricot].

%% Head receives the first item; Tail receives the rest
[Head | Tail] = Fruits.

%% Put a new atom in front of Tail
NewFruits = [pear | Tail].

%% Look at all three results
{Head, Tail, NewFruits}.`,
      caption: "The value on the right of the bar must be a list for the result to be a proper list.",
      output: [
        "`Head` is `peach`.",
        "`Tail` is `[plum, apricot]`.",
        "`NewFruits` is `[pear, plum, apricot]`.",
      ],
    },
    steps: [
      "`[Head | Tail] = Fruits` works only when the list has at least one item.",
      "`Tail` does not mean “the last item.” It means “the whole list after the first item.”",
      "`[pear | Tail]` creates a new list. It does not change the original `Tail`.",
    ],
    practice: {
      task: "Take the first colour and the remaining colours from `[red, green, blue]`.",
      starter: `%% Write a head-and-tail pattern
[____ | ____] = [red, green, blue].

%% Look at both variables
{First, Rest}.`,
      expected: "The result should be `{red, [green, blue]}`.",
      hint: "Name the two variables `First` and `Rest`.",
      answer: `%% First receives the head; Rest receives the tail
[First | Rest] = [red, green, blue].

%% Rest is still a list
{First, Rest}.`,
    },
    check: {
      question: "Can `[Head | Tail] = []` succeed?",
      answer: "No. An empty list has no first item, so this pattern cannot match it.",
    },
    takeaways: [
      "`[Head | Tail]` splits a non-empty list.",
      "`Tail` is the remaining list, not only its last value.",
      "Adding an item to the front creates a new list.",
    ],
  },

  {
    number: "06",
    slug: "functions-and-arity",
    title: "Understand trim/1",
    summary: "Learn module calls, function arguments, arity, and anonymous functions.",
    duration: "30 minutes",
    goal: "You can explain every part of `string:trim/1` and tell a function identity from a function call.",
    plain: [
      "A function takes input and returns output. `string:trim(Text)` takes text and returns new text without spaces at either end.",
      "`string:trim/1` in documentation means: the `string` module, the `trim` function, and 1 argument. `/1` is called arity. It is not division and it is not a call you can paste into the shell.",
      "To call the function, join the module and function with a colon and put the argument in parentheses: `string:trim(Text)`. Do not write `/1` in the call.",
    ],
    concepts: [
      {
        term: "module",
        explanation: "A place that keeps related functions together. The `string` module provides functions for working with text.",
      },
      {
        term: "argument",
        explanation: "A value placed in parentheses when a function is called.",
      },
      {
        term: "arity",
        explanation: "The number of arguments a function takes. `trim/1` has arity 1.",
      },
    ],
    symbols: [
      { token: "string:trim/1", reading: "The `string` module, the `trim` function, and 1 argument. This is its full identity in documentation, not runnable code." },
      { token: "string:trim(Text)", reading: "Give the variable `Text` to the function. This is a call." },
      { token: "fun(X) -> ... end", reading: "Create an anonymous function. `X` receives the input." },
    ],
    example: {
      label: "Call a named function and an anonymous function",
      code: `%% Text is a binary with spaces at both ends
Text = <<"  river  ">>.

%% A colon joins the module and function
Clean = string:trim(Text).

%% fun creates an anonymous function
Double = fun(Number) -> Number * 2 end.
Twice = Double(6).

%% Look at both results
{Clean, Twice}.`,
      caption: "`string:trim/1` is an identity. `string:trim(Text)` is a call.",
      output: [
        "`Clean` is `<<\"river\">>`.",
        "`Double(6)` returns `12`.",
        "In Erlang, call an anonymous function by writing `Double(6)` directly.",
      ],
    },
    steps: [
      "`string` is the module name and `trim` is the function name. A colon `:` calls a function in another module.",
      "`string:trim/1` is the function's identity in documentation, not a call. An export list names functions in the current module, such as `trim/1`.",
      "`fun(Number) -> Number * 2 end` creates an anonymous function. The variable `Double` points to it.",
    ],
    practice: {
      task: "Write an anonymous function `Greet`. It should take a binary name and return `{hello, Name}`.",
      starter: `%% Put the argument variable in parentheses
Greet = fun(____) -> {hello, ____} end.

%% Call the anonymous function
Greet(<<"Maya">>).`,
      expected: "The result should be `{hello, <<\"Maya\">>}`.",
      hint: "Use the same capitalized variable `Name` in both blanks.",
      answer: `%% Name receives the binary passed to the function
Greet = fun(Name) -> {hello, Name} end.

%% Call an anonymous function with its variable and parentheses
Greet(<<"Maya">>).`,
    },
    check: {
      question: "Does `/1` in `string:trim/1` mean “divide by 1”?",
      answer: "No. It says that `trim` takes 1 argument. A real call is written as `string:trim(Text)`.",
    },
    takeaways: [
      "`module:function/arity` identifies an Erlang function precisely.",
      "Use a colon to call a function in another module.",
      "`fun ... end` creates an anonymous function.",
    ],
  },
  {
    number: "07",
    slug: "clauses-and-guards",
    title: "Choose one path with case",
    summary: "Match one value against branches, then add conditions with guards.",
    duration: "30 minutes",
    goal: "You can read `case` branches from top to bottom and write a fallback branch.",
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

%% Score is the value to check
Score = 76.

%% case searches from top to bottom for the first matching branch
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
    title: "Let a function keep going",
    summary: "Stop at an empty list and use a head-and-tail pattern for the next item.",
    duration: "35 minutes",
    goal: "You can run a two-clause recursive list function in the shell and point to where it stops.",
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
      starter: `%% Clear old variables so you can practise again
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
    title: "Put code in a module",
    summary: "Save functions in an `.erl` file, compile them, and look ahead to BEAM.",
    duration: "40 minutes",
    goal: "You can read a tiny Erlang module, compile it, and explain why `name/arity` appears in an export list.",
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

export const basicPathsEn: BasicPath[] = [
  {
    id: "elixir",
    language: "Elixir",
    title: "Elixir from scratch",
    shortTitle: "Elixir basics",
    subtitle: "Understand values and functions before reading &1 and pipelines",
    description:
      "Begin with IEx and six common kinds of values. Each lesson adds only a few new symbols. &1 does not appear until lesson 8. By then, you can already write its full form.",
    shell: "IEx",
    shellCommand: "iex",
    prerequisites: [
      "You can open a terminal. If you cannot yet, follow the installation page one step at a time.",
      "You do not need experience with another programming language.",
      "Set aside 15–35 minutes and study only one lesson at a time.",
    ],
    lessons: elixirLessonsEn,
    bridge: {
      title: "Next: put the syntax on the BEAM",
      description:
        "You can now read values, patterns, functions, pipelines, and modules. Continue to the Start Line to see what Elixir, Erlang, Mix, OTP, and BEAM each do.",
      href: "/learn/start-line",
      label: "Go to the BEAM Start Line",
    },
    references: [
      {
        label: "Elixir School · Basics",
        href: "https://elixirschool.com/zh-hans/lessons/basics",
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
    subtitle: "Begin with terms and dots, then walk slowly toward modules",
    description:
      "Begin with the erl shell, terms, and two forms of text. Learn to tell atoms from variables, then practise matching, function clauses, and recursion. Finish by writing your first module.",
    shell: "erl",
    shellCommand: "erl",
    prerequisites: [
      "You can open a terminal. If you cannot yet, follow the installation page one step at a time.",
      "You do not need to learn Elixir first or know another programming language.",
      "Set aside 15–40 minutes and study only one lesson at a time.",
    ],
    lessons: erlangLessonsEn,
    bridge: {
      title: "Next: see how processes work together",
      description:
        "You can now read terms, matches, function clauses, recursion, and modules. Continue to the Start Line, then follow the BEAM path into messages, OTP, and supervision trees.",
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
