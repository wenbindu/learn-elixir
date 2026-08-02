import type { CourseModule, CourseStage } from "../course-data";

export const stagesEn: Array<{
  id: CourseStage;
  number: string;
  title: string;
  description: string;
}> = [
  {
    id: "foundation",
    number: "01",
    title: "Get the code running",
    description: "Set up the tools, then meet Erlang, Elixir, BEAM, OTP, and Mix.",
  },
  {
    id: "languages",
    number: "02",
    title: "Try two ways to write it",
    description: "Write the same small task twice. Notice what the two languages share and where they differ.",
  },
  {
    id: "concurrency",
    number: "03",
    title: "Let small processes work together",
    description: "Start with sending and receiving messages, then meet OTP, supervision trees, and backpressure.",
  },
  {
    id: "production",
    number: "04",
    title: "Take your project into a bigger world",
    description: "Connect nodes, let both languages work together, and build something that can handle small failures.",
  },
];

export const courseModulesEn: CourseModule[] = [
  {
    number: "00",
    slug: "install-toolchain",
    stage: "foundation",
    stageLabel: "Setup",
    title: "Set up your tools",
    subtitle: "Pick your computer. Install Erlang and Elixir. Mix arrives with Elixir.",
    summary: "Follow the macOS, Linux, or Windows steps to install Erlang, Elixir, and Mix, then check all three commands.",
    duration: "About 20–40 minutes",
    lessons: 3,
    level: "No experience needed",
    languages: ["Erlang", "Elixir", "Mix"],
    why: "The code ahead needs these tools to run. If the terminal cannot find a command, the problem has not reached your code yet. Set up the tools first, then head to the starting line.",
    storyBridge: {
      label: "A carpenter gets ready",
      title: "Put the tools on the bench first",
      story: "Before a carpenter begins, the saw, ruler, and plane go onto the bench. The tools are not the cabinet, but they decide whether the first cut can be made.",
      connection: "Erlang provides the runtime. Elixir gives us another way to write code. Mix creates, compiles, and tests projects.",
      boundary: "Working commands only show that the tools are ready. The experiments ahead will explain why the code is written this way.",
    },
    outcomes: [
      "Find the installation steps for your computer",
      "Check Erlang, Elixir, and Mix separately",
      "Know that Mix comes with Elixir and needs no separate download",
      "When a command is missing, reopen the terminal and check PATH first",
    ],
    prerequisites: [
      "Know whether your computer uses macOS, Linux, or Windows",
      "Keep an internet connection and allow time for the downloads",
      "If the system asks for an administrator password, check with a parent, teacher, or computer administrator first",
    ],
    concepts: [
      {
        term: "PATH",
        definition: "A list of folders the terminal searches for commands. If a tool is installed but still cannot be found, PATH is often the place to check.",
      },
      {
        term: "Compatible versions",
        definition: "Elixir needs a compatible Erlang/OTP version. Do not simply choose the biggest version number. Check the compatibility notes on the official installation page.",
      },
      {
        term: "Mix",
        definition: "The project tool included with Elixir. Installing Elixir gives you the mix command, so there is no third installer to find.",
      },
    ],
    installation: {
      intro: "Use only the section that matches your computer. Do not run all three sets of commands. After an installer or package manager finishes, reopen the terminal before checking. With the official Ubuntu script, check the current terminal first and then save both PATH entries.",
      mixNote: "Mix does not need a separate installation. The official Elixir guide explains that the mix command is installed with Elixir.",
      guides: [
        {
          id: "macos",
          label: "macOS",
          title: "Install with Homebrew",
          description: "First run brew --version in Terminal. If brew is missing, follow the Homebrew website to install it, then come back here.",
          steps: [
            "Open the Terminal app.",
            "Install Elixir. Homebrew will install Erlang as a dependency.",
            "Close Terminal and open a new window.",
            "Run the three version commands to make sure Mix is ready too.",
          ],
          command: `# Run this only in a macOS terminal
brew install elixir

# Erlang is installed as a dependency; Mix comes with Elixir
erl -s erlang halt
elixir --version
mix --version`,
          commandLabel: "Install and check on macOS",
          note: "Homebrew handles the dependencies. If it reports an existing version, read the whole message before removing any old folder.",
          links: [
            { label: "Homebrew website", href: "https://brew.sh/" },
            { label: "Official Elixir installation guide", href: "https://elixir-lang.org/install/" },
            { label: "Official Erlang downloads", href: "https://www.erlang.org/downloads" },
          ],
        },
        {
          id: "linux",
          label: "Linux",
          title: "Use the official script on Ubuntu",
          description: "Linux has many distributions. The commands below show the current Ubuntu pairing from the Elixir website. If its version numbers have changed, use the newer pair from the official page.",
          steps: [
            "Open a terminal and first confirm that you use Ubuntu.",
            "Download the official script and install a compatible pair of Erlang and Elixir versions.",
            "Add both command folders to the current terminal, then check the versions.",
            "On Debian, check the official repository versions first. On Fedora, Arch, and other systems, choose the matching commands from the Elixir installation page.",
          ],
          command: `# Run only on Ubuntu; first check the version pair on the official page
curl -fsSO https://elixir-lang.org/install.sh
sh install.sh elixir@1.20.2 otp@28.4

# These two PATH lines let the current terminal find the new tools
installs_dir=$HOME/.elixir-install/installs
export PATH=$installs_dir/otp/28.4/bin:$PATH
export PATH=$installs_dir/elixir/1.20.2-otp-28/bin:$PATH

# Erlang, Elixir, and Mix should all respond
erl -s erlang halt
elixir --version
mix --version`,
          commandLabel: "Install and check on Ubuntu",
          note: "Each `export` line affects only the current terminal. After the checks work, add both lines to your shell configuration. A distribution repository may have Erlang and Elixir versions that are a few releases behind the official page. That is fine for a first try. If a lesson or project needs an exact version, use the official script above or choose a version manager from the Elixir page. Do not mix the script, system packages, and a version manager in one installation.",
          links: [
            { label: "Official Elixir Linux guide", href: "https://elixir-lang.org/install/" },
            { label: "Official Erlang downloads", href: "https://www.erlang.org/downloads" },
          ],
        },
        {
          id: "windows",
          label: "Windows",
          title: "Use the two official installers",
          description: "Install Erlang/OTP first. Then choose an Elixir installer that matches that OTP major version on the official Elixir page.",
          steps: [
            "Choose the 64-bit Windows Installer on the Erlang downloads page, download it, and run it.",
            "Open a new PowerShell window, run `erl -s erlang halt`, and note the OTP major version.",
            "On the Elixir installation page, choose the Windows Installer that matches that OTP major version.",
            "When installation finishes, close PowerShell and open a new window for the checks.",
          ],
          command: `# After installation, run these in a new PowerShell window
erl -s erlang halt
elixir --version
mix --version

# PowerShell has another command named iex; use this to open Elixir's IEx
iex.bat`,
          commandLabel: "Check the Windows installation",
          note: "Do not choose versions only because their numbers are largest. The Windows installation page lists compatible pairs. If you already use Scoop, you can also follow the official page to install erlang and elixir separately.",
          links: [
            { label: "Download the Erlang Windows Installer", href: "https://www.erlang.org/downloads" },
            { label: "Choose a matching Elixir Installer", href: "https://elixir-lang.org/install/" },
          ],
        },
      ],
    },
    elixirCode: `# Run this in IEx after installation
# Ask Elixir to print a line
IO.puts("Elixir is running")

# Check Elixir's own version
System.version()

# Elixir can also ask the Erlang/OTP layer below it
:erlang.system_info(:otp_release)`,
    erlangCode: `%% Run this in erl after installation
%% Ask Erlang to print a line
io:format("Erlang is running~n").

%% Check the current Erlang/OTP major version
erlang:system_info(otp_release).

%% Leave the shell with q/0
q().`,
    codeCaption: "If both shells answer, the runtime is awake. In Windows PowerShell, use iex.bat to open Elixir's IEx.",
    experiment: {
      title: "Give the tools a quick checkup",
      intro: "All three systems do the same job: check Erlang, Elixir, and Mix, then ask Mix to list its tasks.",
      steps: [
        "Open a new terminal or PowerShell window so you do not keep the old PATH from before installation",
        "Run the Erlang check and note the OTP major version",
        "Run `elixir --version` and `mix --version`",
        "Run `mix help` and make sure you see a list of Mix tasks",
      ],
      command: `# These commands work on macOS, Linux, and Windows PowerShell
erl -s erlang halt
elixir --version
mix --version
mix help`,
      expected: [
        "The Erlang command prints the OTP major version",
        "The Elixir version information also shows the Erlang/OTP version it uses",
        "Mix shows its version and a list of tasks it can run",
      ],
      breakIt: "Try the checks in a terminal that stayed open throughout installation, then try a newly opened terminal. If the results differ, the old terminal probably has not reloaded PATH.",
      canProve: "This computer can find Erlang, Elixir, and Mix, so the three tools are ready for local practice.",
      cannotProve: "Version commands cannot prove that every third-party dependency is compatible or that every future project will compile at once.",
    },
    quiz: {
      question: "After installing Elixir, how do you install Mix?",
      options: [
        "Find a separate Mix installer in search results",
        "Do nothing extra; Mix comes with Elixir",
        "Enter erl and type install_mix",
        "Mix is only needed on deployment servers",
      ],
      answer: 1,
      explanation: "Mix is the project tool shipped with Elixir. After installation, check it with `mix --version`.",
    },
    challenge: {
      title: "Make an installation check sheet",
      brief: "Write down your operating system and the OTP, Elixir, and Mix versions. Then record the first two things to try when a command cannot be found.",
      hints: [
        "Put the output from the three version commands together. You do not need to copy every pair of parentheses.",
        "The first step can be closing the terminal and opening a new window.",
        "For the second step, check PATH or return to the official installation page. Do not download a random tool with the same name.",
      ],
      acceptance: [
        "State whether the computer uses macOS, Linux, or Windows",
        "Record the OTP, Elixir, and Mix versions",
        "Explain why Mix needs no separate installation",
        "Know to ask a parent, teacher, or computer administrator when a permission problem appears",
      ],
    },
    takeaways: [
      "Run only the steps for your operating system.",
      "Start with a compatible Erlang/OTP. An installer, script, or package manager can handle it. Mix arrives with Elixir.",
      "When a command is missing, reopen the terminal, then check PATH and the official guide.",
    ],
    references: [
      { label: "Official Elixir installation guide", href: "https://elixir-lang.org/install/" },
      { label: "Official Erlang/OTP downloads", href: "https://www.erlang.org/downloads" },
      { label: "Official introduction to Mix", href: "https://hexdocs.pm/elixir/introduction-to-mix.html" },
    ],
  },
  {
    number: "01",
    slug: "start-line",
    stage: "foundation",
    stageLabel: "Foundation",
    title: "The starting line",
    subtitle: "Meet five partners: two write code, one runs it, one offers reliable patterns, and one builds projects.",
    summary: "Run code in erl and IEx, then use Mix to create and test your first project.",
    duration: "About 2 hours · Try 2 sessions",
    lessons: 2,
    level: "Beginner",
    languages: ["BEAM", "Elixir", "Erlang"],
    why: "You do not need to memorize five names. Erlang and Elixir express code. BEAM runs it. OTP supplies reliable patterns. Mix manages a project. Run each one once and their jobs become clear.",
    storyBridge: {
      label: "A theater stage",
      title: "Two scripts, one play",
      story: "The same play can be written in two different scripts, while the actors still perform on one stage. Backstage, they also need rules, props, and tools.",
      connection: "Erlang and Elixir are the two ways to write. BEAM is the stage. OTP provides backstage rules. Mix helps with rehearsal and checks.",
      boundary: "This picture only separates their roles. You still need real checks for compilation, speed, and version problems.",
    },
    outcomes: [
      "Explain in your own words what Erlang, Elixir, BEAM, OTP, and Mix each do",
      "Open erl and IEx and run a short piece of code in each",
      "Find the Erlang/OTP, Elixir, and Mix versions in command output",
      "Use Mix to create a project, run code, and pass the first test",
    ],
    prerequisites: [
      "Finish the setup lesson so the terminal can find `erl`, `elixir`, and `mix`",
      "Finish either From Scratch path. If values, patterns, functions, or modules still feel unfamiliar, review those basics first",
    ],
    concepts: [
      {
        term: "BEAM",
        definition: "The virtual machine that runs Erlang and Elixir. It gives small processes turns to work and delivers their messages.",
      },
      {
        term: "OTP",
        definition: "A long-tested set of tools and patterns for finding, isolating, and recovering from errors. Supervisor and GenServer are both part of OTP.",
      },
      {
        term: "Mix",
        definition: "Elixir's project tool. It creates, compiles, formats, tests, and manages dependencies. `mix.exs` describes the project. Mix is not BEAM, OTP, or Hex.",
      },
    ],
    elixirCode: `# In IEx
# Remember the current process so the child can reply to it
parent = self()

# Start a lightweight process and send a tuple to parent
spawn(fn ->
  send(parent, {:hello, :from_elixir})
end)

# Wait for a message with the matching shape and take it apart
receive do
  {:hello, source} -> {:received, source}
end`,
    erlangCode: `%% In erl
%% Remember the current process so the child can reply to it
Parent = self(),

%% Start a lightweight process and send a tuple with !
spawn(fun() ->
  Parent ! {hello, from_erlang}
end),

%% Wait for a message with the matching shape and take it apart
receive
  {hello, Source} -> {received, Source}
end.`,
    codeCaption: "The spelling differs, but the actions match: start a process, send a tuple, then receive it by pattern.",
    experiment: {
      title: "Check the tools, then make a project",
      intro: "Check the Erlang, Elixir, and Mix versions. Then ask Mix to create a project and run its tests.",
      steps: [
        "Run `erl`, enter `erlang:system_info(otp_release).`, and let Erlang report the OTP version",
        "Run `elixir --version` and `mix --version`, then find the Erlang/OTP, Elixir, and Mix versions",
        "Run `mix new beam_probe` and see what belongs in `mix.exs`, `lib/`, and `test/`",
        "Enter the project and run `mix test`, then use `mix run -e` to read the OTP release from the same project",
      ],
      command: `# Print the Erlang/OTP version directly, then stop
erl -noshell -eval 'io:format("OTP ~s~n", [erlang:system_info(otp_release)]), halt().'

# Check the Elixir and Mix versions
elixir --version
mix --version

# Create a project, enter its folder, and run the tests
mix new beam_probe
cd beam_probe
mix test

# Read the OTP version again inside the project environment
mix run -e 'IO.puts("OTP #{:erlang.system_info(:otp_release)}")'`,
      expected: [
        "The three commands report Erlang/OTP, Elixir, and Mix versions that can work together",
        "Mix creates `mix.exs`, a source folder, and a test folder, but it does not create another virtual machine",
        "The sample test passes, and `mix run` can call Erlang's `erlang` module directly",
      ],
      breakIt: "Leave the `beam_probe` folder and run `mix test` again. Decide whether the message says “there is no project here” or “the code is wrong.”",
      canProve: "This computer can use Erlang, Elixir, and Mix to create, compile, and test a small project.",
      cannotProve: "This does not promise that every outside package is compatible or that the project is ready to deploy.",
    },
    quiz: {
      question: "Which sentence describes OTP most accurately? OTP is...",
      options: [
        "A store that downloads Elixir packages",
        "A long-tested collection of libraries, behaviours, and reliable design patterns for the BEAM world",
        "A tool used only to turn Erlang into machine code",
        "A database that works only when many computers are connected",
      ],
      answer: 1,
      explanation: "OTP serves both Erlang and Elixir. Mix manages projects and Hex supplies packages. Compilers and databases are different tools.",
    },
    challenge: {
      title: "Write a programming checkup card",
      brief: "In no more than 12 lines, record the three versions. Then write the first step for three problems: a missing command, a missing `mix.exs`, and incompatible versions.",
      hints: [
        "Let `elixir --version`, `mix --version`, and `mix help` each report its own information.",
        "When an error appears, first decide whether the tool is missing, you are outside a project, or the versions do not fit.",
        "Save the result. This card will help when you ask someone for support later.",
      ],
      acceptance: [
        "The card shows OTP, Elixir, and Mix versions",
        "It explains that `mix.exs` describes a project and separates Mix from Hex",
        "Each of the three problems has one clear next step",
        "It separates operating-system processes from small BEAM processes",
      ],
    },
    takeaways: [
      "Erlang and Elixir express ideas, BEAM runs the code, and OTP provides reliable patterns.",
      "When Elixir calls Erlang, it usually calls a module directly inside the same BEAM virtual machine. It does not need to shout across a network.",
      "Mix manages projects and build tasks. Hex supplies packages. When something fails, first identify which partner reported the problem.",
    ],
    references: [
      { label: "Elixir Getting Started", href: "https://hexdocs.pm/elixir/introduction.html" },
      { label: "Erlang Getting Started", href: "https://www.erlang.org/doc/system/getting_started.html" },
      { label: "Introduction to Mix", href: "https://hexdocs.pm/elixir/introduction-to-mix.html" },
    ],
  },
  {
    number: "02",
    slug: "beam-mental-model",
    stage: "foundation",
    stageLabel: "Foundation",
    title: "Processes and mailboxes",
    subtitle: "Each process keeps its own data. When processes need to work together, they send messages.",
    summary: "Build a message counter and see who owns the state and where messages wait.",
    duration: "About 3 hours · Try 3 sessions",
    lessons: 3,
    level: "Beginner",
    languages: ["BEAM", "OTP"],
    why: "BEAM lets many small processes work at once. Each process owns its data and works with others through messages. When one process fails, the effect can usually stay in one small area.",
    storyBridge: {
      label: "Old relay stations",
      title: "Every station has its own message box",
      story: "Along an old relay road, each station kept its own records and message box. A courier could deliver a letter, but could not reach into another station and rewrite its ledger.",
      connection: "A relay station stands for a BEAM process. Its message box is the mailbox. Its ledger is the process state.",
      boundary: "A mailbox can skip messages that do not match yet, so it does not always take only the oldest letter. BEAM scheduling is not the same as a shift timetable at a relay station.",
    },
    outcomes: [
      "Tell the difference between a small BEAM process, an operating-system process, and a thread",
      "Explain how each process owns its data and receives messages from its mailbox",
      "Read a message loop and predict its next state and pattern-match result",
    ],
    prerequisites: [
      "Finish the starting line and successfully run a short Erlang or Elixir program",
      "Have seen tuples, lists, and maps. It is fine if you do not remember every spelling yet",
    ],
    concepts: [
      {
        term: "Lightweight process",
        definition: "An independent unit of work scheduled by BEAM. It is not a full operating-system process, so a program can create many of them.",
      },
      {
        term: "mailbox",
        definition: "A process's own inbox. Messages wait here until the process looks for a pattern it can handle now.",
      },
      {
        term: "reduction",
        definition: "A unit BEAM uses to estimate work. After one process has done some work, the scheduler gives other processes a chance.",
      },
    ],
    elixirCode: `# total is the state currently owned by this process
counter = fn loop, total ->
  receive do
    # Enter the next round with a new total; the old value is not changed in place
    {:add, n} -> loop.(loop, total + n)
    {:read, caller} ->
      send(caller, {:total, total})
      loop.(loop, total)
  end
end

# Start the counter process with 0 as its first value
pid = spawn(fn -> counter.(counter, 0) end)`,
    erlangCode: `%% Total is the state currently owned by this process
Counter = fun Loop(Total) ->
  receive
    %% Enter the next round with a new total; the old value is not changed in place
    {add, N} -> Loop(Total + N);
    {read, Caller} ->
      Caller ! {total, Total},
      Loop(Total)
  end
end,

%% Start the counter process with 0 as its first value
Pid = spawn(fun() -> Counter(0) end).`,
    codeCaption: "The counter does not erase an old number and write over it. After each message, it carries a new total into the next round of waiting.",
    experiment: {
      title: "Send the counter three letters",
      intro: "Send “add 1,” “add 2,” and “add 3,” then read the total. Besides finding 6, identify who owns the state.",
      steps: [
        "Send `{:add, 1}`, `{:add, 2}`, and `{:add, 3}` to the counter in order",
        "Send `{:read, self()}` with your PID so the counter knows the return address",
        "Use `Process.info(pid, :message_queue_len)` to see how many messages remain in its inbox",
      ],
      command: `# Send three addition messages; each call to send returns at once
send(pid, {:add, 1}); send(pid, {:add, 2}); send(pid, {:add, 3})`,
      expected: [
        "You eventually receive `{:total, 6}`",
        "Other processes can send messages, but cannot reach in and directly change the number owned by the counter",
      ],
      breakIt: "Remove the `{:read, caller}` branch, then send a read message. The process will not crash. That message will remain in the mailbox.",
      canProve: "This small process can update a count in message order while owning its own state.",
      cannotProve: "This does not show that every message design is free from races, or that every mailbox will stay small forever.",
    },
    quiz: {
      question: "What usually happens when a process mailbox contains a message that does not match any current receive pattern?",
      options: [
        "The message disappears immediately",
        "The whole BEAM virtual machine stops immediately",
        "The message stays in the mailbox while the process looks for one it can handle",
        "The sender must freeze and can do nothing else",
      ],
      answer: 2,
      explanation: "This is selective receive. Messages that never match can pile up, so message names and handling rules should be clear.",
    },
    challenge: {
      title: "Draw a message map for three stations",
      brief: "Draw `sensor`, `collector`, and `dashboard`. Name each message and mark its sender and receiver.",
      hints: [
        "Do not name every message `data`. Say whether it carries a temperature, a query, or a reply.",
        "If a message needs a reply, include a return PID or a reference.",
        "Ask which messages could pile up while the dashboard is not working.",
      ],
      acceptance: [
        "Every message shows who sends it and who receives it",
        "Every piece of state has one clear owner",
        "The map marks at least one mailbox that could grow",
      ],
    },
    takeaways: [
      "Each BEAM process owns its state and works with its partners through messages.",
      "A message loop often carries the state for the next round in recursive arguments.",
      "Messages that do not match yet remain in the mailbox, so mailbox length is worth watching.",
    ],
    references: [
      { label: "Erlang Processes", href: "https://www.erlang.org/doc/system/conc_prog.html" },
      { label: "Elixir Processes", href: "https://hexdocs.pm/elixir/processes.html" },
    ],
  },
  {
    number: "03",
    slug: "elixir-foundations",
    stage: "languages",
    stageLabel: "Language",
    optionalReview: true,
    title: "An Elixir data pipeline",
    subtitle: "Trim, filter, then group. Let each small function do one job well.",
    summary: "Clean a log with blank lines and extra spaces, and test every step.",
    duration: "About 6 hours · Try 5 sessions",
    lessons: 5,
    level: "Beginner exploration",
    languages: ["Elixir"],
    why: "Long functions easily collect too many jobs. First use patterns to recognize data, then split each change into a small function. A pipeline passes one result to the next step.",
    storyBridge: {
      label: "An old print shop",
      title: "Four steps for one book",
      story: "A print shop sorts a pile of pages. It removes stray space, takes out blank pages, groups the rest, and counts them. Each step has one job.",
      connection: "Pages stand for data, each workshop step stands for a small function, and `|>` passes the work forward. Changing the order can change the result.",
      boundary: "This picture explains pipelines and step order. It does not explain lazy Stream evaluation or compare speed.",
    },
    outcomes: [
      "Use a pattern to recognize data, then choose a path with a guard and a multi-clause function",
      "Explain that Enum finishes a collection now, while Stream works step by step when results are requested",
      "Write a small, clear set of ExUnit tests for pure functions that do not read files or send messages",
    ],
    prerequisites: [
      "Know that BEAM has small processes and mailboxes, and have seen pattern matching once",
      "Know that a list keeps items in order and a map finds values by keys",
    ],
    concepts: [
      {
        term: "Pattern matching",
        definition: "The left side is a shape to check against the data on the right. A match takes values out. A mismatch tries another path. Here, `=` does more than assignment.",
      },
      {
        term: "Multi-clause function",
        definition: "One function can have several entrances. The program checks from top to bottom and uses the first clause whose pattern and guard both fit. Arity is the number of arguments.",
      },
      {
        term: "Pipeline",
        definition: "`|>` passes the result on its left to the function on its right as the first argument. It makes steps easier to see, but does not split functions for you.",
      },
    ],
    elixirCode: `# Turn a multiline log into a count for each level
defmodule LogSummary do
  def summarize(lines) do
    # Clean whitespace first, then parse each line
    lines
    |> Stream.map(&String.trim/1)
    |> Stream.reject(&(&1 == ""))
    |> Enum.map(&parse_line/1)
    |> Enum.frequencies_by(& &1.level)
  end

  # Use string prefixes to take out the level and message
  defp parse_line("ERROR " <> message),
    do: %{level: :error, message: message}

  defp parse_line("INFO " <> message),
    do: %{level: :info, message: message}
end`,
    erlangCode: `%% An Erlang outline of the same data flow
%% Clean whitespace first, then parse each line
summarize(Lines) ->
  Clean = [string:trim(L) || L <- Lines, L =/= <<>>],
  Parsed = [parse_line(L) || L <- Clean],
  frequencies(Parsed).

%% A binary pattern takes out the text after the prefix
parse_line(<<"ERROR ", Message/binary>>) ->
  #{level => error, message => Message};
parse_line(<<"INFO ", Message/binary>>) ->
  #{level => info, message => Message}.`,
    codeCaption: "Both versions clean, parse, and count the same data.",
    experiment: {
      title: "Swap two steps",
      intro: "Swap `trim` and `reject`. Guess where a line of spaces will go, then run the same data.",
      steps: [
        "Prepare the Elixir string list `[\" INFO boot \", \" \", \"ERROR timeout\"]`",
        "First trim both ends and then remove empty strings. Record the result",
        "Move `reject` before `trim`, then run exactly the same input again",
      ],
      command: `# Run every test and show each test name and duration
mix test --trace`,
      expected: [
        "With `trim` before `reject`, the line that contains only spaces is removed",
        "With `reject` before `trim`, that line is not empty yet and may later enter the parser",
      ],
      breakIt: "Pass in `WARN slow`, then remove the fallback clause. See which clues remain in the `FunctionClauseError`.",
      canProve: "The order of data-processing steps changes what a later pattern can recognize.",
      cannotProve: "This does not show that Stream is faster than Enum. Data size and the way results are consumed both matter.",
    },
    quiz: {
      question: "When is Stream worth considering first?",
      options: [
        "Always, because Stream is always faster",
        "When there is lots of data, or only part of the result is needed and work can happen on demand",
        "When every result must become a list immediately",
        "When you want to change the original list in place",
      ],
      answer: 1,
      explanation: "Stream calculates when a result is requested. This is lazy evaluation. It is not always faster, and Enum is often simpler for small collections.",
    },
    challenge: {
      title: "Clean a log",
      brief: "Build a Mix tool that reads a log, skips blank lines, counts three levels, and finds the three most common messages.",
      hints: [
        "Begin with a pure function that understands one log line. Keep file reading at the outside edge.",
        "Do not silently throw away an unknown line. Keep the clue by returning `{:error, line}`.",
        "Prepare tests for spaced text, an unknown level, and an empty file.",
      ],
      acceptance: [
        "Log cleaning and file reading are separate steps",
        "An unknown line leaves a clear error result",
        "ExUnit tests cover normal, edge, and error cases",
      ],
    },
    takeaways: [
      "Look at the shape of the data before deciding which steps it should pass through.",
      "A pipeline passes results forward. Small, clear functions are what truly make it readable.",
      "Stream delays work, but it is not a “faster Enum.” Choose by the data and the goal.",
    ],
    references: [
      { label: "Elixir basic types", href: "https://elixir-lang.org/getting-started/basic-types.html" },
      { label: "Enum", href: "https://hexdocs.pm/elixir/Enum.html" },
      { label: "ExUnit", href: "https://hexdocs.pm/ex_unit/ExUnit.html" },
    ],
  },
  {
    number: "04",
    slug: "erlang-foundations",
    stage: "languages",
    stageLabel: "Language",
    optionalReview: true,
    title: "Read Erlang",
    subtitle: "Begin with uppercase and lowercase names, then follow the signs made by commas, semicolons, and periods.",
    summary: "Rebuild the log tool in Erlang and make both versions pass the same examples.",
    duration: "About 6 hours · Try 5 sessions",
    lessons: 5,
    level: "Beginner exploration",
    languages: ["Erlang"],
    why: "Many BEAM documents and tools use Erlang. Once you can read its basic forms, error messages, `:gen_tcp`, and Observer become easier to understand. Start with data, functions, and punctuation.",
    storyBridge: {
      label: "Punctuation in an old text",
      title: "Mark where the sentences break",
      story: "An old manuscript may have no punctuation. A reader must mark where to pause and where a sentence ends. Move a mark and the meaning may change.",
      connection: "In Erlang, a comma says “continue,” a semicolon separates clauses or branches, and a period ends a complete definition.",
      boundary: "Written-language punctuation is not a perfect map of Erlang syntax. Code must still follow the compiler's exact rules.",
    },
    outcomes: [
      "Recognize Erlang atoms, variables, tuples, lists, maps, and binaries",
      "Use commas, semicolons, and periods to show “continue,” “try another path,” and “end here”",
      "Create a Rebar3 project and use EUnit to check your functions",
    ],
    prerequisites: [
      "Finish the Elixir foundations review and understand the log-processing steps from the last station",
      "Know that pattern matching checks a data shape, and have seen a function call itself again",
    ],
    concepts: [
      {
        term: "Uppercase variable",
        definition: "In Erlang, a name beginning with an uppercase letter or underscore is a variable. A bare lowercase word is usually a fixed label called an atom.",
      },
      {
        term: "Punctuation structure",
        definition: "A comma joins expressions in order. A semicolon separates function clauses or branches. A period ends a full definition or shell expression.",
      },
      {
        term: "binary",
        definition: "A container for a sequence of bytes, written `<<...>>`. UTF-8 text usually lives in a binary. A traditional charlist is instead a list of integers that represent characters.",
      },
    ],
    elixirCode: `# Add the amounts from all paid orders
defmodule Orders do
  def total(items) do
    # Filter by status, take out the amounts, then add them
    items
    |> Enum.filter(&(&1.status == :paid))
    |> Enum.map(& &1.amount)
    |> Enum.sum()
  end
end`,
    erlangCode: `%% This module exposes total/1, a function with one argument
-module(orders).
-export([total/1]).

total(Items) ->
  %% A list comprehension first keeps only paid orders
  Paid = [Item || Item = #{status := paid} <- Items],
  %% Then it takes out the amounts and adds them
  Amounts = [Amount || #{amount := Amount} <- Paid],
  lists:sum(Amounts).`,
    codeCaption: "An Erlang module name is an atom. The 1 in `total/1` says the function takes one argument. A list comprehension uses shape patterns to keep paid orders and then take out their amounts.",
    experiment: {
      title: "Punctuate some Erlang code",
      intro: "Break a comma, semicolon, and period one at a time. Do not memorize the errors. Find the part the compiler thinks has not ended.",
      steps: [
        "Create `classify/1` with one clause for positive numbers and another for zero or negative numbers",
        "Change the semicolon at the end of the first clause to a period, then compile again",
        "Inside one function body, change a comma that means “continue” into a semicolon, then compile again",
      ],
      command: `# Compile the project and run every EUnit test
rebar3 eunit`,
      expected: [
        "A semicolon separates clauses with the same function name and arity",
        "A period tells the compiler that the whole function definition ends here",
        "A comma continues to the next expression in the same function body",
      ],
      breakIt: "Remove `-export([total/1]).`, then call the function from the shell. The function still exists in the module, but outside callers cannot reach it.",
      canProve: "Erlang commas, semicolons, and periods express code structure. They cannot be exchanged just for appearance.",
      cannotProve: "Successful compilation only shows that the basic structure is valid. It does not prove that the answer is correct.",
    },
    quiz: {
      question: "What does Erlang treat the unquoted name `user_name` as?",
      options: ["A variable that can change", "A fixed atom label", "A text string", "A module description"],
      answer: 1,
      explanation: "An unquoted lowercase word is usually an atom. A variable begins with an uppercase letter or underscore. Text and binaries use their own forms.",
    },
    challenge: {
      title: "Translate a program into Erlang",
      brief: "Rebuild the log tool with Rebar3. Make the Erlang and Elixir versions read the same examples and return the same results.",
      hints: [
        "Use binary shape patterns to take apart INFO, WARN, and ERROR prefixes.",
        "Put file reading in a separate module. Let the core log function receive only a list of binaries.",
        "Bring the test cases from the last station. EUnit tests can use `_test` functions or generator forms.",
      ],
      acceptance: [
        "The module exports only the functions that outside callers truly need",
        "The code clearly separates binaries and charlists and converts when needed",
        "EUnit checks the same normal, edge, and error cases as the Elixir version",
      ],
    },
    takeaways: [
      "Erlang writes out a module, function, and arity. Together they act like the function's full address.",
      "A binary and a charlist are different data. When the two languages exchange text, inspect and convert it on purpose.",
      "Commas, semicolons, and periods are structural signs, not decoration.",
    ],
    references: [
      { label: "Erlang Reference Manual", href: "https://www.erlang.org/doc/system/reference_manual.html" },
      { label: "Rebar3", href: "https://rebar3.org/docs/" },
      { label: "EUnit", href: "https://www.erlang.org/doc/apps/eunit/chapter.html" },
    ],
  },
  {
    number: "05",
    slug: "shared-semantics",
    stage: "languages",
    stageLabel: "Bridge",
    title: "The two languages share a code",
    subtitle: "Elixir and Erlang wear different clothes, but often carry the same data.",
    summary: "Implement the same order changes in both languages and compare the results with tests.",
    duration: "About 5 hours · Try 4 sessions",
    lessons: 4,
    level: "Two-language challenge",
    languages: ["Elixir", "Erlang", "BEAM"],
    why: "Writing the same task side by side is clearer than memorizing each language alone. Elixir writes `:ok`; Erlang writes `ok`. On BEAM, they are the same atom. Strings, modules, and exceptions still have real differences.",
    storyBridge: {
      label: "A matching seal",
      title: "Both halves must fit",
      story: "Two copies of an order may use different handwriting, but the place, action, and seal must agree. What matters is whether the two halves of the seal fit.",
      connection: "The two syntaxes are different handwriting. An agreed BEAM data shape is the shared order format.",
      boundary: "The languages differ in more than spelling. Modules, tools, exceptions, structs, records, and strings still need care.",
    },
    outcomes: [
      "Translate common data, functions, and module calls from Elixir syntax to Erlang syntax and back",
      "Explain which differences are only surface spelling and which values are already the same BEAM term",
      "Use specs to record an agreed data shape and tests to catch changes to that agreement",
    ],
    prerequisites: [
      "Finish either From Scratch path. You can read the other language beside it as you go",
      "Know how to check that the same input produces the same output",
    ],
    concepts: [
      {
        term: "Atom mapping",
        definition: "An atom is a fixed label. Elixir's `:ok` and Erlang's `ok` are the same atom. An Elixir module name is also an atom beginning with `Elixir.`.",
      },
      {
        term: "Module call",
        definition: "A call is identified by its module name, function name, and number of arguments. That number is called arity.",
      },
      {
        term: "Agreed data format",
        definition: "Two modules agree on the shapes of inputs, returns, and errors. Across languages, these agreements matter more than surface spelling.",
      },
      {
        term: "term",
        definition: "A piece of BEAM data is a term: a number, atom, tuple, list, map, and more. Ordinary terms can pass directly between both languages.",
      },
    ],
    elixirCode: `# List the allowed order states as atoms
defmodule Order do
  @type state :: :new | :paid | :shipped

  # Return a new state on success and a clear error tag on failure
  @spec transition(state(), atom()) ::
          {:ok, state()} | {:error, :invalid_transition}
  def transition(:new, :pay), do: {:ok, :paid}
  def transition(:paid, :ship), do: {:ok, :shipped}
  def transition(_, _), do: {:error, :invalid_transition}
end`,
    erlangCode: `%% Both order states and events use atoms
-module(order).
-export([transition/2]).

-type state() :: new | paid | shipped.
%% Return a new state on success and a clear error tag on failure
-spec transition(state(), atom()) ->
  {ok, state()} | {error, invalid_transition}.

%% Each clause describes one state-change rule
transition(new, pay) -> {ok, paid};
transition(paid, ship) -> {ok, shipped};
transition(_, _) -> {error, invalid_transition}.`,
    codeCaption: "Both sides receive the same atoms and return success or error tuples with the same shapes.",
    experiment: {
      title: "Pass the same data both ways",
      intro: "Call both modules in both directions and compare atoms and tuples after they cross the language boundary.",
      steps: [
        "Put `order.erl` in the Mix project's `src/` folder and compile the project",
        "In IEx, call `:order.transition(:new, :pay)` and record the return value",
        "From Erlang, call `'Elixir.Order':transition(new, pay)` and compare the data shapes",
      ],
      command: `# Compile the current Mix project and open IEx in its environment
iex -S mix`,
      expected: [
        "Both sides receive the same tuple term represented by `{ok, paid}`",
        "Erlang can find and call an Elixir module by using its real module atom",
      ],
      breakIt: "Change the atom `paid` on one side to the string `\"paid\"`. The text looks alike, but the term type differs, so matching fails.",
      canProve: "Ordinary BEAM terms such as numbers, atoms, and tuples can pass directly between modules in the two languages.",
      cannotProve: "Passing ordinary terms does not mean strings, Elixir structs, Erlang records, and exceptions need no extra agreement.",
    },
    quiz: {
      question: "Which real module name does Erlang usually use to find the Elixir module `Foo`?",
      options: ["foo", "'Foo'", "'Elixir.Foo'", ":Foo"],
      answer: 2,
      explanation: "An Elixir module alias compiles to an atom with the `Elixir.` prefix. Because it contains capitals and a period, Erlang writes it in single quotes.",
    },
    challenge: {
      title: "An order-state relay",
      brief: "Add cancellation, refunds, and repeated events. Draw the state-transition table first, then implement it in both languages.",
      hints: [
        "Draw the states and events before writing code.",
        "Decide whether a repeated event keeps the same state or returns an error, and write down the idempotency rule.",
        "Use pure functions to make the rules clear before hiding an unfinished idea inside a process.",
      ],
      acceptance: [
        "Both implementations return terms with the same shapes",
        "A forbidden state change returns a clear error tag",
        "Specs and tests cover every path in the state table",
      ],
    },
    takeaways: [
      "Agree on input and return term shapes before choosing a language to express them.",
      "Elixir module names and aliases still become module atoms when they reach BEAM.",
      "Text, structs, records, and exceptions are the easiest places for the two sides to misunderstand each other. Agree and test them clearly.",
    ],
    references: [
      { label: "Erlang interoperability", href: "https://hexdocs.pm/elixir/erlang-and-elixir.html" },
      { label: "Typespecs", href: "https://hexdocs.pm/elixir/typespecs.html" },
    ],
  },
  {
    number: "06",
    slug: "processes-and-mailboxes",
    stage: "concurrency",
    stageLabel: "Concurrency",
    title: "Messages and timeouts",
    subtitle: "Receive and reply by hand first. Then uncover what GenServer does for us.",
    summary: "Number each request, then watch timeouts, late replies, and a service exit.",
    duration: "About 6 hours · Try 4 sessions",
    lessons: 4,
    level: "Intermediate exploration",
    languages: ["Elixir", "Erlang", "BEAM"],
    why: "Write one message loop by hand so you can see what GenServer adds. Give every request a number and return that number with the reply. A timeout only stops waiting; it does not pull a message back.",
    storyBridge: {
      label: "A delivery receipt",
      title: "A tracking number and a late receipt",
      story: "A delivery office records a number for each parcel. If a customer leaves early, the team already on the road does not turn around. The receipt may still arrive late.",
      connection: "The tracking number is a reference. Sending a parcel is a request. The receipt is a reply. A timeout is not a cancellation.",
      boundary: "This picture does not explain links, monitors, exit reasons, or `trap_exit`. We still need code to observe them.",
    },
    outcomes: [
      "Give every request a unique reference and return the same number with its reply",
      "Explain that links and monitors both watch process exits, but differ in direction and reaction",
      "Recognize three common problems: processes waiting on each other, late replies, and a growing mailbox",
    ],
    prerequisites: [
      "Use Elixir or Erlang pattern matching to recognize a message",
      "Know that every BEAM process has its own mailbox",
    ],
    concepts: [
      {
        term: "reference",
        definition: "A ticket generated by BEAM that is extremely unlikely to repeat. It often answers, “Which request does this reply belong to?”",
      },
      {
        term: "link",
        definition: "A two-way exit connection between processes. By default, an abnormal exit signal travels along a link.",
      },
      {
        term: "monitor",
        definition: "A one-way watching relationship. When the watched process exits, the watcher receives `DOWN` but does not automatically exit.",
      },
    ],
    elixirCode: `# Make a reference just for this call before sending the request
def call(server, request, timeout \\ 1_000) do
  ref = make_ref()
  # Tell the server both the return address and request number
  send(server, {:call, self(), ref, request})

  receive do
    # Accept only a reply with the same reference
    {:reply, ^ref, response} -> {:ok, response}
  after
    # A timeout stops waiting; it does not pull back the request
    timeout -> {:error, :timeout}
  end
end`,
    erlangCode: `%% Make a reference just for this call before sending the request
call(Server, Request, Timeout) ->
  Ref = make_ref(),
  %% Tell the server both the return address and request number
  Server ! {call, self(), Ref, Request},
  receive
    %% Accept only a reply with the same Ref
    {reply, Ref, Response} -> {ok, Response}
  after Timeout ->
    %% A timeout stops waiting; it does not pull back the request
    {error, timeout}
  end.`,
    codeCaption: "A reference pairs each request with its reply. A timeout does not recall a sent message.",
    experiment: {
      title: "Make a reply arrive late",
      intro: "Let the server reply after 1.5 seconds while the client waits only 0.5 seconds. See where the reply goes after the timeout.",
      steps: [
        "Write a small service that waits 1.5 seconds before replying to a request",
        "Make a call that is willing to wait only 500 milliseconds",
        "After two seconds, run `Process.info(self(), :messages)` and inspect your mailbox",
      ],
      command: `# Show messages still waiting in the current IEx process mailbox
Process.info(self(), :messages)`,
      expected: [
        "The call first returns `{:error, :timeout}`",
        "The server may still finish its work, and the late reply may appear in the caller's mailbox",
      ],
      breakIt: "Remove the reference and send two requests that finish at different speeds. See whether replies can be matched to the wrong request.",
      canProve: "Stopping the wait does not stop the server's work. A reference can pair the correct reply.",
      cannotProve: "One experiment shows only a few arrival orders. It cannot tell us the right timeout for a real service.",
    },
    quiz: {
      question: "After the caller reaches its timeout, what usually happens to the message already sent to the server?",
      options: [
        "BEAM automatically pulls the message back",
        "The server process stops automatically at once",
        "The message may still be handled, and a reply may arrive later",
        "The caller must stay blocked until the server finishes",
      ],
      answer: 2,
      explanation: "`after` only limits the waiting time. Real cancellation needs another protocol and cooperation from the server.",
    },
    challenge: {
      title: "Build a small key-value service",
      brief: "Implement `put`, `get`, and `delete`. Give synchronous requests references, and separate a timeout from a server exit.",
      hints: [
        "Write every incoming and outgoing message shape on paper before writing the loop.",
        "While waiting for a reply, also handle a `DOWN` message in the same `receive`.",
        "After a normal reply, decide when to use `demonitor` to stop a watch you no longer need.",
      ],
      acceptance: [
        "Requests do not confuse each other even when replies arrive out of order",
        "The caller separates “waited too long” from “the service exited”",
        "A test truly creates and checks a late reply",
      ],
    },
    takeaways: [
      "A timeout means stop waiting. It does not automatically cancel work that has begun.",
      "A reference is like a receipt number that keeps requests and replies paired.",
      "A link makes a two-way exit connection. A monitor only watches and sends a message, leaving the watcher to choose the next step.",
    ],
    references: [
      { label: "Process", href: "https://hexdocs.pm/elixir/Process.html" },
      { label: "Erlang concurrent programming", href: "https://www.erlang.org/doc/system/conc_prog.html" },
    ],
  },
  {
    number: "07",
    slug: "otp-behaviours",
    stage: "concurrency",
    stageLabel: "OTP",
    title: "OTP rules for messages",
    subtitle: "GenServer organizes receiving, replying, and system messages into rules everyone can recognize.",
    summary: "Turn the key-value loop into GenServer and gen_server, then compare calls and casts.",
    duration: "About 7 hours · Try 5 sessions",
    lessons: 5,
    level: "Intermediate exploration",
    languages: ["Elixir", "Erlang", "OTP"],
    why: "Rewriting startup, system messages, and replies every time makes details easy to miss. An OTP behaviour supplies a common pattern. We still decide the API, state owner, and overload policy.",
    storyBridge: {
      label: "A relay-road rulebook",
      title: "Two kinds of official letter",
      story: "A relay road has rules for handoffs, fresh horses, and records. Some letters need a receipt. Others can be sent without waiting.",
      connection: "A behaviour is the rulebook and callbacks are its duties. A call waits for a receipt; a cast does not.",
      boundary: "Calls and casts are both BEAM messages. A cast does not prove that work is finished, and it does not limit the mailbox.",
    },
    outcomes: [
      "Separate the public API used by callers from callbacks that handle messages inside the process",
      "Choose call or cast by asking whether a result is required and what happens when the service is too busy",
      "Put a long-running GenServer or gen_server under a supervision tree",
    ],
    prerequisites: [
      "Finish the messages and mailboxes station and write one message loop by hand",
      "Know the jobs of requests, replies, references, and timeouts",
    ],
    concepts: [
      {
        term: "behaviour",
        definition: "A contract made of callbacks. A module implements the required callbacks while the framework handles the message loop, system messages, and debugging support.",
      },
      {
        term: "call",
        definition: "A synchronous request that needs a reply. The caller waits, but waiting alone is not a complete backpressure plan.",
      },
      {
        term: "cast",
        definition: "An asynchronous message with no reply. When senders are too fast, casts pile up in the mailbox.",
      },
    ],
    elixirCode: `# GenServer owns this map and updates it in order
defmodule KV do
  use GenServer

  # These functions are the public API seen by callers
  def start_link(opts), do: GenServer.start_link(__MODULE__, %{}, opts)
  def get(server, key), do: GenServer.call(server, {:get, key})
  def put(server, key, value), do: GenServer.call(server, {:put, key, value})

  # Callbacks handle the real messages and state
  @impl true
  def init(state), do: {:ok, state}

  @impl true
  def handle_call({:get, key}, _from, state),
    do: {:reply, Map.fetch(state, key), state}

  def handle_call({:put, key, value}, _from, state),
    do: {:reply, :ok, Map.put(state, key, value)}
end`,
    erlangCode: `%% gen_server owns this map and updates it in order
-module(kv).
-behaviour(gen_server).
-export([start_link/0, get/2, put/3]).
-export([init/1, handle_call/3]).

%% These functions are the public API seen by callers
start_link() -> gen_server:start_link(?MODULE, #{}, []).
get(Server, Key) -> gen_server:call(Server, {get, Key}).
put(Server, Key, Value) ->
  gen_server:call(Server, {put, Key, Value}).

%% Callbacks handle the real messages and state
init(State) -> {ok, State}.
handle_call({get, Key}, _From, State) ->
  {reply, maps:find(Key, State), State};
handle_call({put, Key, Value}, _From, State) ->
  {reply, ok, State#{Key => Value}, State}.`,
    codeCaption: "The API hides message shapes, and callbacks follow the contract. Both languages return tuples with the same meaning.",
    experiment: {
      title: "Sending fast is not finishing fast",
      intro: "Send updates quickly with cast, then watch the mailbox and the delay of a synchronous query.",
      steps: [
        "Add `put_async/3` using cast",
        "Send a large batch of updates and record when sending ends and when processing ends",
        "Make a synchronous `get` at the same time and record its wait and `message_queue_len`",
      ],
      command: `# Read the pid's mailbox length and see whether casts are piling up
:erlang.process_info(pid, :message_queue_len)`,
      expected: [
        "The sending loop can finish quickly even while the server still has work left",
        "A synchronous `get` may wait behind many casts and take much longer",
      ],
      breakIt: "Add slow I/O inside `handle_cast` and send even faster. See whether the mailbox keeps growing.",
      canProve: "An asynchronous API lets the caller leave without waiting, but the wait may simply move into the server mailbox.",
      cannotProve: "A local experiment cannot set the limit for a real service. Hardware, message size, and outside I/O all change the result.",
    },
    quiz: {
      question: "Which situation is the best reason to consider cast?",
      options: [
        "Use cast for every write operation",
        "The caller needs no confirmation, and the system already knows what to do when it is too busy",
        "The message must finish as soon as it is sent",
        "BEAM should automatically discard old messages",
      ],
      answer: 1,
      explanation: "Before using cast, confirm that no result is needed and define overload handling. A cast is not immediate execution and has no queue limit.",
    },
    challenge: {
      title: "Build a bounded task service",
      brief: "Write the API in one language and the worker in the other. Run at most N tasks, and return `busy` when the bounded queue is full.",
      hints: [
        "Let one process own the queue and capacity, but give each real task to its own process.",
        "Use a monitor to notice both worker completion and abnormal exits, and always return capacity.",
        "Do not quietly accept unlimited tasks. Tell callers when the service is full.",
      ],
      acceptance: [
        "The concurrency limit and waiting-queue limit are both visible",
        "The capacity count returns to the correct value even after a worker crashes",
        "A caller clearly learns whether a task was accepted or rejected as busy",
      ],
    },
    takeaways: [
      "A behaviour supplies reliable message-loop rules, but the business agreement is still ours to design.",
      "A friendly client API hides internal message shapes so callers can state their purpose.",
      "A cast lets the sender leave, but may leave pressure in the mailbox. Capacity and overload handling must be designed clearly.",
    ],
    references: [
      { label: "Elixir GenServer", href: "https://hexdocs.pm/elixir/GenServer.html" },
      { label: "Erlang gen_server", href: "https://www.erlang.org/doc/apps/stdlib/gen_server.html" },
    ],
  },
  {
    number: "08",
    slug: "supervision-trees",
    stage: "concurrency",
    stageLabel: "OTP",
    title: "A supervision tree that restarts",
    subtitle: "First learn who depends on whom. Then decide which partners restart when one falls.",
    summary: "Build a supervision tree with child specs and restart strategies, then watch how far different failures spread.",
    duration: "About 6 hours · Try 4 sessions",
    lessons: 4,
    level: "Intermediate exploration",
    languages: ["Elixir", "Erlang", "OTP"],
    why: "“Let it crash” does not mean ignoring errors. A process that cannot continue lets a supervisor restart it. Expected cases such as a wrong password or low stock should still return normal results.",
    storyBridge: {
      label: "A chain of camps",
      title: "The supply camp has a problem",
      story: "Imagine a line of camps. Some can work alone. Others depend on supplies and an open road. If an early supply camp fails, the camps behind it may need to regroup too.",
      connection: "`one_for_one` restarts only the failed child. `one_for_all` restarts every child. `rest_for_one` also restarts later dependents.",
      boundary: "A supervision tree sees processes and exit signals. A restart does not restore lost data or undo an outside action.",
    },
    outcomes: [
      "Draw a supervision tree from the questions “who depends on whom?” and “who should recover together?”",
      "Compare `one_for_one`, `one_for_all`, and `rest_for_one` in your own words",
      "Choose permanent, transient, or temporary from the expected response to normal and abnormal exits",
    ],
    prerequisites: [
      "Write a simple GenServer or gen_server",
      "Know that links carry exit signals and that a process can end normally or abnormally",
    ],
    concepts: [
      {
        term: "Failure domain",
        definition: "The area affected by a failure. Some components recover together while others stay isolated. A supervision tree expresses that choice in its shape.",
      },
      {
        term: "restart intensity",
        definition: "The largest number of restarts allowed during a time window. If the limit is passed, the supervisor exits and hands the problem to its parent.",
      },
      {
        term: "Application",
        definition: "An OTP component that can start, stop, receive configuration, and declare dependencies. An application callback usually starts the root supervisor.",
      },
    ],
    elixirCode: `# Child order changes the recovery range of rest_for_one
children = [
  # Registry starts first because later components use it
  {Registry, keys: :unique, name: Jobs.Registry},
  # The dynamic supervisor watches temporary workers
  {DynamicSupervisor,
   strategy: :one_for_one,
   name: Jobs.Workers},
  Jobs.Dispatcher
]

# Start the whole group under one root supervisor
Supervisor.start_link(
  children,
  strategy: :rest_for_one,
  name: Jobs.Supervisor
)`,
    erlangCode: `%% Child order changes the recovery range of rest_for_one
init([]) ->
  %% Write the startup instructions for each child
  Registry = #{
    id => jobs_registry,
    start => {jobs_registry, start_link, []}
  },
  Workers = #{
    id => jobs_workers_sup,
    start => {jobs_workers_sup, start_link, []},
    type => supervisor
  },
  Dispatcher = #{
    id => jobs_dispatcher,
    start => {jobs_dispatcher, start_link, []}
  },
  %% When an earlier child exits, later dependents restart too
  {ok, {{rest_for_one, 3, 5},
        [Registry, Workers, Dispatcher]}}.`,
    codeCaption: "`rest_for_one` uses child order to express dependencies. A failure near the front restarts the dependents after it.",
    experiment: {
      title: "Make each child exit",
      intro: "Record three PIDs. Crash the dispatcher and registry one at a time, then compare which PIDs change.",
      steps: [
        "Start the supervision tree and record every child PID with `which_children`",
        "Make the last child exit abnormally, then inspect the PIDs again",
        "Make the first child exit abnormally and compare how many PIDs change this time",
      ],
      command: `# List each child name, PID, type, and module
Supervisor.which_children(Jobs.Supervisor)`,
      expected: [
        "When the last child fails, usually only that child restarts",
        "When the first child fails, `rest_for_one` restarts it and every dependent after it",
      ],
      breakIt: "Change the strategy to `one_for_all`, then crash the independent last child. Watch for unnecessary restarts.",
      canProve: "The restart strategy and child order together decide which processes start again.",
      cannotProve: "A new PID shows only that a process restarted. Business state, disk data, and outside actions still need checking.",
    },
    quiz: {
      question: "Which relationship fits `rest_for_one` best?",
      options: [
        "Every child is independent and needs no other child",
        "Later children depend on startup results or state from earlier children",
        "No matter who fails, restart only that one child",
        "Use it by default for every web application",
      ],
      answer: 1,
      explanation: "`rest_for_one` expresses dependency through order. Independent children usually fit `one_for_one`.",
    },
    challenge: {
      title: "Draw a supervision tree",
      brief: "Draw a supervision tree for a task queue. Mark every child's restart type and explain the recovery range.",
      hints: [
        "Find who owns long-lived state first, then draw its dependencies on other processes.",
        "Short tasks and long-lived infrastructure usually should not use identical child specs.",
        "Record who receives the problem after the restart-intensity limit is passed.",
      ],
      acceptance: [
        "Every parent-child relationship has a recovery reason",
        "Restart types match expectations for normal and abnormal exits",
        "The diagram names at least one business error that should not be handled by crashing or automatic retry",
      ],
    },
    takeaways: [
      "A supervision tree first answers: who depends on whom, and where should a failure stop spreading?",
      "“Let it crash” does not ignore expected errors. It hands a local problem that cannot continue to a supervisor.",
      "Restarting a process is only one part of recovery. Data, outside actions, and idempotency still need careful design.",
    ],
    references: [
      { label: "OTP Design Principles", href: "https://www.erlang.org/doc/system/design_principles.html" },
      { label: "Elixir Supervisor", href: "https://hexdocs.pm/elixir/Supervisor.html" },
    ],
  },
  {
    number: "09",
    slug: "state-and-backpressure",
    stage: "concurrency",
    stageLabel: "Capacity",
    title: "Put a limit on concurrency",
    subtitle: "Use a plain function for plain calculation. When work needs concurrency, draw a line around the task count.",
    summary: "Compare plain functions, processes, ETS, and bounded tasks, then set a concurrency limit.",
    duration: "About 5 hours · Try 3 sessions",
    lessons: 3,
    level: "Capacity challenge",
    languages: ["Elixir", "Erlang", "BEAM"],
    why: "Processes are good for owning state, expressing a lifetime, and isolating errors. Plain calculations do not all need GenServer. Unlimited Tasks can exhaust connections and memory. Choose tools by state and capacity.",
    storyBridge: {
      label: "A controlled river gate",
      title: "How wide should the gate be?",
      story: "A river system divides water, releases floods, and limits how much can enter a narrow channel. When too much water arrives, it needs another path.",
      connection: "Bounded concurrency sets the entrance width. Waiting, slowing, or rejecting tells upstream that capacity is short. That is backpressure.",
      boundary: "Software must explicitly choose to wait, reject, or degrade. A river story cannot explain mailboxes, CPU scheduling, or ETS rules.",
    },
    outcomes: [
      "Choose a plain function, process state, or ETS by asking whether state is long-lived and who must read or write it",
      "Limit the number of running tasks and handle timeouts and a waiting queue",
      "Use mailbox length, wait time, and rejection rate to notice when a system cannot keep up",
    ],
    prerequisites: [
      "Know how a GenServer owns state and how a supervision tree watches processes",
      "Run at least one small independent task with Task",
    ],
    concepts: [
      {
        term: "Backpressure",
        definition: "A signal sent upstream when downstream has too little capacity. Upstream can wait, slow down, be rejected, or enter a bounded queue.",
      },
      {
        term: "ETS",
        definition: "A BEAM table that many processes can read and write quickly. It still has an owner, and by default the table disappears when that owner exits.",
      },
      {
        term: "Bounded concurrency",
        definition: "A fixed upper limit on running tasks, making CPU, connection, and memory use easier to control.",
      },
    ],
    elixirCode: `# Check URLs concurrently without passing the chosen limit
urls
|> Task.async_stream(
  &check_url/1,
  # Set the concurrency limit from the scheduler count
  max_concurrency: System.schedulers_online() * 2,
  timeout: 3_000,
  on_timeout: :kill_task,
  ordered: false
)
# Gather each result into success and failure counts
|> Enum.reduce(%{ok: 0, error: 0}, &count_result/2)`,
    erlangCode: `%% The central idea of a fixed-size worker pool
%% Start no more than Limit jobs; the rest wait
run_bounded(Jobs, Limit) ->
  {Running, Pending} = start_first(Jobs, Limit),
  collect(Running, Pending, Limit).

%% When a worker exits, remove it and start one waiting job
collect(Running, Pending, Limit) ->
  receive
    {'DOWN', Ref, process, _Pid, Result} ->
      collect(start_next(remove(Ref, Running), Pending, Limit))
  end.`,
    codeCaption: "Elixir sets the concurrency limit directly. The Erlang outline shows monitors, a running set, and a waiting queue.",
    experiment: {
      title: "Does one plus one need a GenServer?",
      intro: "Run the same independent calculations two ways: calls to one GenServer and direct function calls. Compare time and mailbox length.",
      steps: [
        "Build a Calculator GenServer that does only a small CPU calculation and owns no long-lived state",
        "Call the one server from many Tasks and record total time and mailbox length",
        "Change the calculation to a plain function and measure the same inputs again",
      ],
      command: `# Run the workload and return elapsed microseconds with its result
:timer.tc(fn -> workload.() end)`,
      expected: [
        "One server makes otherwise independent calculations wait in one line",
        "Plain functions can run inside each caller, making it easier for several schedulers to work together",
      ],
      breakIt: "Set `max_concurrency` to the full input count and make every task hold one connection. Record the resource peak.",
      canProve: "Independent calculations with no shared state usually do not need to squeeze through one process.",
      cannotProve: "This does not mean every GenServer is slow. Its main jobs are state, lifetime, and message agreements.",
    },
    quiz: {
      question: "Which job least needs a GenServer?",
      options: [
        "Own connection state that must be updated in order",
        "Maintain a protocol session with a beginning and an end",
        "Add two numbers and return the answer",
        "Coordinate a limited number of database connections",
      ],
      answer: 2,
      explanation: "A pure calculation has no long-lived state or lifecycle, so a plain function is clearer. A process is not merely a function container.",
    },
    challenge: {
      title: "Build a bounded URL checker",
      brief: "Check a group of URLs while limiting concurrency, timeouts, and waiting items. Report success rate, P95 duration, and rejection count.",
      hints: [
        "Write down the largest number of running and waiting tasks before choosing an API.",
        "Count “waited too long” separately from an HTTP error. They are not the same failure.",
        "`ordered: false` lets finished tasks return results without waiting for the slowest earlier task.",
      ],
      acceptance: [
        "Maximum concurrency and maximum waiting count can both be changed",
        "A sudden input spike cannot grow memory forever through an unlimited queue",
        "Results separate ordinary failure, timeout, and rejection because the service was busy",
      ],
    },
    takeaways: [
      "A process expresses who owns state, how long it lives, and where an error should stop.",
      "Asynchronous means the caller need not wait here. It does not mean the task count is bounded.",
      "Backpressure makes “too busy” visible and controls it through waiting, slowing, rejection, or degraded service.",
    ],
    references: [
      { label: "Task.async_stream", href: "https://hexdocs.pm/elixir/Task.html#async_stream/3" },
      { label: "ETS User's Guide", href: "https://www.erlang.org/doc/apps/stdlib/ets.html" },
    ],
  },
  {
    number: "10",
    slug: "distributed-operations",
    stage: "production",
    stageLabel: "Networks",
    title: "When a BEAM node disappears",
    subtitle: "Connecting nodes is only the beginning. Plan for disconnections, late replies, and stale data too.",
    summary: "Connect two nodes, take one offline, and use logs, Telemetry, and Observer to learn what happened.",
    duration: "About 6 hours · Try 4 sessions",
    lessons: 4,
    level: "Network challenge",
    languages: ["BEAM", "OTP"],
    why: "Distributed Erlang makes remote sends look natural, but a network can still delay or disconnect. Node names and cookies only help connections. We must still design consistency, delivery, capacity, and security.",
    storyBridge: {
      label: "A line of signal towers",
      title: "The signal goes dark",
      story: "Signal towers pass an alarm down a long line. In fog, heavy rain, or a broken link, later towers cannot pretend they still have fresh news.",
      connection: "A tower stands for a node. Connections and disconnections appear as `nodeup` and `nodedown`. Logs and Telemetry leave a record.",
      boundary: "BEAM does more than pass a signal one tower at a time. Real networks also drop packets, become half-open, or split. `nodedown` does not explain why a link failed.",
    },
    outcomes: [
      "Start two named BEAM nodes and let them find each other and exchange messages",
      "Explain `nodedown` and separate a remote PID from a registered name that works on only one node",
      "Use contextual logs, Telemetry metrics, and Observer to track mailboxes and delay",
    ],
    prerequisites: [
      "Know how processes communicate, supervision trees recover, and backpressure reports overload",
      "Be able to start a basic OTP Application. You can continue even without making a release yet",
    ],
    concepts: [
      { term: "node", definition: "A BEAM instance taking part in distributed communication, usually named `name@host`. A remote PID also contains its node identity." },
      { term: "cookie", definition: "A shared secret used when nodes connect. It is not a complete security plan and cannot replace encryption, isolation, and access control." },
      { term: "Telemetry", definition: "An event-measurement tool often used by Elixir. Business code emits events; handlers count or export them." },
    ],
    elixirCode: `# Ask the current process to receive node connection events
:net_kernel.monitor_nodes(true)

# Node events arrive like ordinary BEAM messages
receive do
  {:nodeup, node} ->
    # Record the node that just connected
    Logger.info("node connected", node: node)

  {:nodedown, node} ->
    # The application chooses whether to degrade or retry
    Logger.warning("node disconnected", node: node)
end`,
    erlangCode: `%% Ask the current process to receive node connection events
net_kernel:monitor_nodes(true),

%% Node events arrive like ordinary BEAM messages
receive
  {nodeup, Node} ->
    %% Record the node that just connected
    logger:info("node connected", #{node => Node});
  {nodedown, Node} ->
    %% The application chooses whether to degrade or retry
    logger:warning("node disconnected", #{node => Node})
end.`,
    codeCaption: "Connections and disconnections become messages. Agree in advance how to degrade or reject work after `nodedown`.",
    experiment: {
      title: "Take one node offline",
      intro: "Start two local nodes, connect them, then stop one. Watch the event, remote processes, and unfinished requests.",
      steps: [
        "Start `a@127.0.0.1` and `b@127.0.0.1` with the same cookie",
        "From A, `ping` B and turn on `monitor_nodes`",
        "Stop B, record A's event, and see how unfinished requests end",
      ],
      command: `# Try node b; success returns :pong and failure returns :pang
Node.ping(:"b@127.0.0.1")`,
      expected: [
        "After a successful connection, `Node.ping/1` returns `:pong`",
        "After B stops, A receives `nodedown`",
        "BEAM reports the disconnection, but the application still decides whether a request fails, retries later, or uses another path",
      ],
      breakIt: "Give the two nodes different cookies. Confirm that the failure happens during connection rather than in a business handler.",
      canProve: "Node connections and disconnections can be observed and turned into events an application can handle.",
      cannotProve: "Stopping a local node cannot simulate packet loss, long delay, half-open connections, or a network split.",
    },
    quiz: {
      question: "Distributed Erlang makes sending to a remote PID look like a local send. What does it provide automatically?",
      options: [
        "Data that is always strongly consistent across nodes",
        "Exactly-once delivery even when the network disconnects",
        "Similar-looking syntax for local and remote message sends",
        "Complete protection for exposing nodes directly to the public internet",
      ],
      answer: 2,
      explanation: "Similar syntax does not remove the network. Consistency, retries, partitions, and security still need separate design.",
    },
    challenge: {
      title: "Draw a node-status map",
      brief: "Report scheduler use, memory, and important mailboxes regularly. Keep the last value after a disconnect and mark it `stale`.",
      hints: [
        "Add a sample time to every metric. A number without its time can mislead.",
        "Keep the last real data after disconnection and mark it clearly as `stale`.",
        "Watch the trend of a growing mailbox, not only one number at one instant.",
      ],
      acceptance: [
        "A disconnected node does not appear as “every metric is a healthy zero”",
        "Logs show which node, process, and request/reference each event belongs to",
        "Reporting resumes after reconnection without registering the same service twice",
      ],
    },
    takeaways: [
      "A remote send looks like a local send for convenience. The network has not disappeared.",
      "Disconnections, timeouts, and stale data belong in the agreement before trouble begins.",
      "Besides “the process is alive,” mailbox size, delay, restart count, and rejection rate say more about real health.",
    ],
    references: [
      { label: "Distributed Erlang", href: "https://www.erlang.org/doc/system/distributed.html" },
      { label: "Elixir Logger", href: "https://hexdocs.pm/logger/Logger.html" },
      { label: "Telemetry", href: "https://hexdocs.pm/telemetry/" },
    ],
  },
  {
    number: "11",
    slug: "interoperability",
    stage: "production",
    stageLabel: "Bridge",
    title: "Two-language partners",
    subtitle: "Calling each other inside one BEAM is easy. Agree on the exchanged data first.",
    summary: "Let an Elixir API and Erlang worker cooperate while handling data formats and error boundaries.",
    duration: "About 4 hours · Try 3 sessions",
    lessons: 3,
    level: "Two-language challenge",
    languages: ["Elixir", "Erlang"],
    why: "The two languages can call each other directly inside one BEAM, but text, records, and structs have different shapes. Keep conversions at the boundary and agree on success and failure terms.",
    storyBridge: {
      label: "Two writers share a book",
      title: "Write one book together",
      story: "Two writers share a book in different writing styles. Their prose may differ, but names, dates, and chapter numbers must agree.",
      connection: "Each language writes one part. An adapter brings binaries, charlists, records, maps, and error formats into agreement.",
      boundary: "Natural language has no program type rules. This story cannot explain exceptions, Unicode, or the tuple positions inside a record.",
    },
    outcomes: [
      "Call Erlang from Elixir and call Elixir from Erlang with the correct module atom",
      "Convert Elixir Strings, binaries, and charlists explicitly at the boundary",
      "Turn exceptions and differing returns into stable results that both sides can pattern match",
    ],
    prerequisites: [
      "Finish the shared-terms station and know that `:ok` and `ok` name the same atom",
      "Use Mix and Rebar3 to run a small project and its tests",
    ],
    concepts: [
      { term: "charlist", definition: "A list of integers that are character code points, common in Erlang APIs. An Elixir String is usually a UTF-8 binary." },
      { term: "record", definition: "Erlang expands a record into a tuple at compile time. Across languages, use public functions or maps instead of depending on tuple positions." },
      { term: "exception boundary", definition: "The agreement for exceptions, exits, and throws in both languages. The boundary turns them into stable error tuples." },
    ],
    elixirCode: `# The Elixir API validates input and converts boundary data
defmodule Scheduler do
  @spec submit(binary(), map()) ::
          {:ok, reference()} | {:error, atom()}
  def submit(queue, payload) when is_binary(queue) do
    # The Erlang worker expects a charlist and a key-value list
    :job_worker.submit(
      String.to_charlist(queue),
      Map.to_list(payload)
    )
  catch
    # Turn an exit across the boundary into a stable error tuple
    :exit, reason -> {:error, normalize_exit(reason)}
  end
end`,
    erlangCode: `%% The Erlang worker receives already converted boundary data
-module(job_worker).
-export([submit/2, call_elixir/1]).

%% The guard clearly requires Queue and Payload to be lists
submit(Queue, Payload)
    when is_list(Queue), is_list(Payload) ->
  {ok, make_ref()}.

%% An Elixir module name is a prefixed atom in Erlang
call_elixir(Value) ->
  'Elixir.Scheduler':normalize(Value).`,
    codeCaption: "Keep conversion at the edge. Use tagged tuples in the core protocol so charlists do not spread through the project.",
    experiment: {
      title: "Why do the two versions of jobs not match?",
      intro: "First pass an Elixir String to a worker that accepts only a charlist. Then convert it in an adapter and add tests.",
      steps: [
        "Pass `\"jobs\"` from Elixir and record what the guard or function clause tells you",
        "Use `String.to_charlist/1` in the adapter before calling the Erlang worker",
        "Add a round-trip test with a non-ASCII queue name and confirm that the text stays unchanged",
      ],
      command: `# Run only the ExUnit file for the language boundary
mix test test/interoperability_test.exs`,
      expected: [
        "A binary and a charlist match different guards",
        "After an explicit boundary conversion, both sides meet the agreement",
        "A Unicode test catches code that wrongly treats text as single bytes",
      ],
      breakIt: "Make Elixir read an Erlang record by tuple position, then add a field to the record. Watch the coupling break.",
      canProve: "Explicit text conversion at the boundary keeps the String, binary, and charlist agreement consistent.",
      cannotProve: "One successful path cannot show that every success, failure, and edge return from a third-party library uses the same text format.",
    },
    quiz: {
      question: "Which return agreement is usually most stable for long-term work between the two languages?",
      options: [
        "Guess every tuple position in a private record",
        "Use simple tagged terms such as `{ok, Value}` or `{error, Reason}`",
        "Let every exception cross the boundary without normalization",
        "Turn every value into printable text",
      ],
      answer: 1,
      explanation: "Simple, matchable terms are easy to test. Private records change, while turning everything into text loses structure.",
    },
    challenge: {
      title: "Share one task queue",
      brief: "Let Elixir provide the API and validation while an Erlang gen_server owns the queue. Tests must truly cross the language boundary.",
      hints: [
        "Write a few concrete success and failure terms before building the modules.",
        "Keep all text and error conversion inside one thin adapter module.",
        "Let ExUnit call the Erlang worker, and let EUnit call the Elixir normalize function.",
      ],
      acceptance: [
        "Each language has one clear, real responsibility",
        "Binary, charlist, and exception conversions stay at the boundary",
        "Two-way tests fail at once if either side breaks a return shape",
      ],
    },
    takeaways: [
      "Sharing BEAM makes calls easy. A clear data agreement keeps long-term cooperation easy too.",
      "Text forms, records, and exceptions cause the most confusion and need careful boundary handling.",
      "An adapter should be thin, focused, and genuinely tested from both directions.",
    ],
    references: [
      { label: "Erlang libraries from Elixir", href: "https://hexdocs.pm/elixir/erlang-libraries.html" },
      { label: "Strings and binaries", href: "https://hexdocs.pm/elixir/binaries-strings-and-charlists.html" },
    ],
  },
  {
    number: "12",
    slug: "reliable-scheduler",
    stage: "production",
    stageLabel: "Project",
    title: "A reliable task team",
    subtitle: "Bring functions, processes, supervision trees, two languages, and capacity rules together in your own project.",
    summary: "Use Elixir at the entrance and Erlang for scheduling to build a bounded task system with retries.",
    duration: "About 10 hours · Try 6 sessions",
    lessons: 4,
    level: "Capstone project",
    languages: ["Elixir", "Erlang", "OTP"],
    why: "The final project joins the earlier tools. We will fill the queue, fail a task, delay a message, and disconnect a node, then check state, retries, recovery, and rejection rules.",
    storyBridge: {
      label: "A supply convoy",
      title: "There are only so many wagons",
      story: "Imagine a task system as a supply convoy. Each batch is recorded, wagons are limited, and extra orders must wait. Sending the same order twice may also deliver the same batch twice.",
      connection: "Wagons are workers. Waiting supplies form a bounded queue. A repeated order is a retry. A batch mark is an idempotency key. The duty log is a runbook.",
      boundary: "Software handles messages and outside services, not a real convoy. An idempotency key also cannot promise exactly-once behavior across nodes by itself.",
    },
    outcomes: [
      "Write down rules that must always hold before arranging processes, queues, and supervision trees",
      "Give Erlang and Elixir clear, real responsibilities inside one release",
      "Create small failures on purpose and check how the system recovers, rejects work, or leaves clues",
    ],
    prerequisites: [
      "Finish modules 00–11 and keep the queue and supervision exercises from earlier stations",
      "Use reference material to write a GenServer, gen_server, and Supervisor",
    ],
    concepts: [
      { term: "at-least-once", definition: "A task is tried at least once and may run more than once. Use an idempotency key or deduplication record to control repeated effects." },
      { term: "bounded queue", definition: "A waiting queue with fixed capacity. When it is full, the system must wait, reject, or degrade." },
      { term: "runbook", definition: "Operating instructions: which logs and metrics to inspect, how to judge a problem, and which safe actions to take." },
    ],
    elixirCode: `# The Elixir layer validates input and shapes public results
defmodule Scheduler.API do
  def submit(payload, opts \\ []) do
    # A task is accepted only if validation and enqueueing both succeed
    with :ok <- validate(payload),
         {:ok, id} <- :scheduler_core.enqueue(payload, opts) do
      {:accepted, id}
    else
      # Reject clearly when the queue is full instead of taking more memory
      {:error, :queue_full} -> {:rejected, :busy}
      {:error, reason} -> {:rejected, reason}
    end
  end
end`,
    erlangCode: `%% The Erlang core owns the queue, capacity, and scheduler state
handle_call({enqueue, Job, Opts}, _From,
            State = #state{queued = Queue, max = Max}) ->
  %% Check for space in the bounded queue before adding a job
  case queue:len(Queue) < Max of
    true ->
      {Id, Next} = add_job(Job, Opts, State),
      {reply, {ok, Id}, dispatch(Next)};
    false ->
      %% Keep the old state and return the reason when the queue is full
      {reply, {error, queue_full}, State}
  end.`,
    codeCaption: "Elixir owns the API and validation. Erlang owns the queue and scheduler state. A full queue is rejected clearly.",
    experiment: {
      title: "Run four failure drills",
      intro: "Creating a problem on purpose is called fault injection. First write the expected result for a worker exit, a bad message, a timeout, and a disconnection.",
      steps: [
        "Make a running worker exit and check the retry count and capacity count",
        "Send a message outside the agreement and confirm that the service continues while leaving a log or Telemetry event",
        "Let a task pass its timeout and inspect isolation, cancellation rules, and a late result",
        "Disconnect a remote node and inspect the stale marker and state after reconnection",
      ],
      command: `# Run only fault_injection tests and show their progress
mix test --only fault_injection --trace`,
      expected: [
        "Processes that must stay alive remain under a supervision tree",
        "A failed task retries only within its limit and never loops forever",
        "Queue length and running count eventually return to a consistent state",
        "Every rejection, recovery, or final stop leaves evidence in structured logs or metrics",
      ],
      breakIt: "Remove the retry limit and keep failing a task. Watch a retry storm make the problem larger.",
      canProve: "For these four named surprises, the system follows its written rules to recover, reject, or stop retrying.",
      cannotProve: "Four drills cannot cover every failure or prove exactly-once delivery, cross-node consistency, or no repeated outside action.",
    },
    quiz: {
      question: "Before automatically retrying a failed task, what should you decide first?",
      options: [
        "Which color the submit button should use",
        "Whether the task is idempotent and how many attempts are allowed",
        "Whether the worker must use Elixir or Erlang",
        "Whether to place the entire payload in every log",
      ],
      answer: 1,
      explanation: "A retry can repeat an outside action. Decide the idempotency key, backoff, attempt limit, and final failure destination together.",
    },
    challenge: {
      title: "Explain the task team",
      brief: "Gather the source, supervision tree, message agreement, capacity plan, failure record, release, and a one-page runbook. Then explain three important choices.",
      hints: [
        "Name at least one thing this version does not guarantee. That is honest engineering, not lost points.",
        "Besides a successful submit, demonstrate `queue_full` so the audience sees the system admit that it is too busy.",
        "When writing the runbook, begin with what a user would notice and work backward to the signals an operator needs.",
      ],
      acceptance: [
        "Elixir and Erlang each have one real responsibility with a clear reason",
        "Concurrency, queue size, timeout, and retry all have explicit limits",
        "ExUnit and EUnit both truly cross the language boundary",
        "Another student can start the release and perform one safe check from the runbook",
      ],
    },
    takeaways: [
      "A reliable project states its invariants, capacity, and failure choices before arranging process structure.",
      "Retries can multiply outside effects, so idempotency, backoff, and an attempt limit belong together.",
      "Maintainability is not a few extra log lines at the end. Leave useful evidence in the message agreement and record it in the runbook.",
    ],
    references: [
      { label: "Mix and OTP", href: "https://hexdocs.pm/elixir/introduction-to-mix.html" },
      { label: "Erlang Applications", href: "https://www.erlang.org/doc/system/applications.html" },
      { label: "Elixir Releases", href: "https://hexdocs.pm/mix/Mix.Tasks.Release.html" },
    ],
  },
];
