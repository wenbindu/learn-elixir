import type { BasicLesson } from "../../app/basic-path-data";
import type { LessonMetadata } from "../../app/lesson-metadata";

export const meetIexMetadataEn: LessonMetadata = {
  id: "meet-iex",
  title: "Let the code speak",
  core_concept: ["return-value"],
  prerequisites: ["iex-session", "prompt"],
  reused_in: ["values-and-types", "functions-and-arity", "package-and-observe"],
  related: [],
  project_contribution: "Print the first line of results for Trail, the text statistics tool.",
  ability_after: "Distinguish the text printed by IO.puts from the return value displayed by IEx",
  depth_pages: ["/from-scratch/elixir/meet-iex/deeper"],
};

export const meetIexLessonEn: BasicLesson = {
  metadata: meetIexMetadataEn,
  number: "02",
  slug: "meet-iex",
  stage: "scratch",
  title: meetIexMetadataEn.title,
  summary: "Is everything on the screen printed by IO.puts?",
  duration: "5 min",
  goal: "Run one line of printing code. You are done when you can explain what displays each line on the screen.",
  plain: [
    "`lines=2` is the text printed by `IO.puts`. `:ok` is the result it hands back, called a return value. IEx displays it, and it means printing is complete.",
  ],
  concepts: [
    { term: "IEx", explanation: "Elixir's interactive shell: enter a little code and see the result." },
    { term: "Expression", explanation: "A piece of code that produces a result." },
    { term: "Return value", explanation: "The result that code hands back when it finishes." },
  ],
  symbols: [
    { token: "iex", reading: "Type this in your terminal to open IEx." },
    { token: "iex>", reading: "This is the prompt. Type only the code after it; do not copy the prompt. Your shell may show `iex(1)>` instead." },
    { token: "#", reading: "This line is a comment. Elixir does not execute it." },
    { token: "+ / *", reading: "Use `+` for addition and `*` for multiplication: `2 + 3` gives `5`, and `7 * 6` gives `42`." },
    { token: 'String.upcase("cat")', reading: "`String` is a module name; modules group related functions. `upcase` is a function that converts text to uppercase. The parentheses hold the text to process." },
  ],
  example: {
    label: "Type this line and press Enter",
    code: 'IO.puts("lines=2")',
    caption: "Run this in IEx.",
    output: ["`IO.puts` prints `lines=2`, and IEx displays the return value `:ok`."],
  },
  steps: [
    "Find `String.upcas/1` in the error: it identifies the name that failed. `undefined or private` means the name cannot be called this way.",
    "Watch the spelling: `upcas` is missing the final `e`. Fix just that, then run the next line. You should get `\"CAT\"`.",
  ],
  practice: {
    task: "Remove `IO.puts(...)` and leave only the text. Predict whether `:ok` will still appear, then run the code and explain why.",
    starter: '"lines=2"',
    expected: "Explain whether :ok still appears and why.",
    hint: "Does this code still call `IO.puts`?",
    answer: '"lines=2"',
  },
  check: {
    question: "After running `IO.puts(\"lines=2\")`, do you see one line or two? Do not count the input or prompt.",
    answer: "Two lines: `lines=2` and `:ok`. `IO.puts` prints the first; IEx displays the second as the return value.",
  },
  takeaways: [
    "`IO.puts` prints text.",
    "`:ok` is the result handed back when this printing finishes.",
    "IEx displays the result that code hands back.",
  ],
};

export const meetIexActivityEn = {
  problem: "You want the text statistics tool to display `lines=2`. What appears when you run one line of printing code?",
  projectPreview: `Input file poem.txt:
Soft wind
Home

Using the finished tool:
./trail_stats poem.txt
lines=2
words=3
chars=13`,
  transcript: "lines=2\n:ok",
  repair: 'String.upcase("cat")',
  secondHint: "IEx displays the result handed back. This code contains only a piece of text.",
  answerExplanation: 'Only `"lines=2"` appears, without `:ok`. The code returns the text directly, and IEx displays it. There is no call to `IO.puts`.',
  depthQuestion: "Why does :ok appear in IEx but not when you run the finished tool?",
};
