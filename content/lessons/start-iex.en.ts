import type { BasicLesson } from "../../app/basic-path-data";
import type { LessonMetadata } from "../../app/lesson-metadata";

export const startIexMetadataEn: LessonMetadata = {
  id: "start-iex",
  title: "Open IEx, then exit",
  core_concept: ["iex-session", "prompt"],
  prerequisites: [],
  reused_in: ["meet-iex"],
  related: [],
  project_contribution: "Set up a place to try code. Later, you will use it to check the results of Trail, the text statistics tool.",
  ability_after: "Enter IEx, recognize its prompt, and exit back to the terminal command line",
  depth_pages: ["/learn/install-toolchain"],
};

export const startIexLessonEn: BasicLesson = {
  metadata: startIexMetadataEn,
  number: "01",
  slug: "start-iex",
  stage: "scratch",
  title: startIexMetadataEn.title,
  summary: "Where do you type Elixir code? How do you exit when you are done?",
  duration: "3 min",
  goal: "Enter IEx, then exit. Point out the prompt that tells you IEx is open.",
  plain: [
    "A terminal is a window for entering commands. Running `iex` starts IEx in that window so you can try Elixir code.",
    "`iex(1)>` is the prompt: IEx is waiting for your code. Do not type the prompt yourself.",
    "Pressing Ctrl+C once opens the BREAK menu. Press Ctrl+C again to exit IEx and return to the original terminal command line.",
  ],
  concepts: [
    { term: "IEx", explanation: "A shell where you can try Elixir code." },
    { term: "Prompt", explanation: "A marker on the screen showing that you can type something." },
  ],
  symbols: [
    { token: "iex", reading: "Type this in a macOS or Linux terminal, then press Enter." },
    { token: "iex.bat", reading: "Type this in Windows PowerShell, then press Enter." },
    { token: "Ctrl+C", reading: "Hold Ctrl and press C, release both keys, then repeat. On macOS, use Control, not Command." },
  ],
  example: {
    label: "Enter IEx",
    code: "iex",
    caption: "Type the command in your terminal and press Enter. Use iex.bat in Windows PowerShell.",
    output: ["When iex(1)> appears, you are in IEx. You can skip the startup version information for now."],
  },
  steps: [
    "On macOS, open Terminal; on Windows, open PowerShell; on Linux, open your terminal application.",
    "Enter the startup command and stop when you see iex(1)>. You do not need to enter Elixir code in this lesson.",
    "Press Ctrl+C twice. When the original terminal prompt returns, you have exited IEx.",
  ],
  practice: {
    task: "Close the hints, enter IEx in your own terminal, then exit. At each step, say whether you are in IEx or at the original command line.",
    starter: "iex",
    expected: "See iex(1)>, then press Ctrl+C twice to return to the original command line.",
    hint: "Check the prompt first. If you see BREAK, you still need to press Ctrl+C once more.",
    answer: "Enter: type iex (iex.bat in PowerShell) and press Enter. Exit: press Ctrl+C, release, then press Ctrl+C again.",
  },
  check: {
    question: "At iex(1)>, does pressing Ctrl+C once take you straight back to the original command line?",
    answer: "No. The BREAK menu appears first. Press Ctrl+C again to exit.",
  },
  takeaways: [
    "Run `iex` in your terminal; use `iex.bat` in Windows PowerShell.",
    "Seeing `iex(1)>` means you are in IEx. Do not type the prompt.",
    "Press Ctrl+C twice to exit IEx. The terminal window stays open.",
  ],
};
