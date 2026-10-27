import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { loadTypeScript } from "../tests/load-typescript.mjs";

const [elixir, english, foundation, advanced] = await Promise.all([
  "notebooks", "notebooks.en", "notebooks-erlang-foundation", "notebooks-erlang-advanced",
].map((name) => loadTypeScript(new URL(`../content/lessons/${name}.ts`, import.meta.url))));
const { elixirNotebooks } = elixir;
const expectations = [
  ["false", "true"], ["92", "!KeyError"], ["{[1, 2, 3], [2, 3, 4]}", "{[1, 2, 3], [2, 4, 6]}"], ["92", "!MatchError"],
  ['"过关"', '"很稳"'], ["42", "!ArgumentError"], ["9", "9"], ["2", "!UndefinedFunctionError"],
  ["false", "!BadBooleanError"], ["{8, 9}", "{8, 13}"], ["{6, 2}", "{3, 3}"], ["{:error, :invalid_age}", "{:ok, 20}"],
  ["15", "25"], [":invalid", ":allowed"], ['%Book{title: "小城", pages: 1}', "!ArgumentError"], ["0", "1"],
  ["{:error, :division_by_zero}", "{:ok, 4.0}"], ['{:ok, "长安\\n春风"}', "{:error, :enoent}"], ["[10.0]", "!ArithmeticError"], ["2", "!Protocol.UndefinedError"],
  ['"你好，小满"', "!UndefinedFunctionError"], ['"长安"', "2"], ["[{9, 100}, {10, 100}, {11, 90}]", "[{9, 100}, {10, 90}, {11, 90}]"], [":ok", ":ok"],
  ["2", "3"], ['{:ok, ["长安", "春风"]}', "{:error, :invalid_utf8}"], ["%{lines: 2, words: 3}", "!UndefinedFunctionError"], ["true", "!ExUnit.AssertionError"],
  ["1", "0"], ["{true, false}", "{true, true}"],
];
assert.equal(expectations.length, elixirNotebooks.length);
const elixirExpectations = new Map(elixirNotebooks.map((notebook, index) => [notebook.slug, expectations[index]]));
const englishExpectations = {
  "choices-and-guards": ['"Pass"', '"Strong performance"'],
  "structs-and-module-metadata": ['%Book{title: "Small Town", pages: 1}', "!ArgumentError"],
  "files-and-paths": ['{:ok, "☀☂\\n★☆"}', "{:error, :enoent}"],
  "behaviours-and-callbacks": ['"Hello, Xiaoman"', "!UndefinedFunctionError"],
  "typespecs-and-dialyzer": ['"☀☂"', "2"],
  "parse-real-input": ['{:ok, ["☀☂", "★☆"]}', "{:error, :invalid_utf8}"],
};
const elixirEvaluator = `
  [source_path, expected, result_path] = System.argv()
  actual = try do
    {value, _} = Code.eval_string(File.read!(source_path))
    {:value, value}
  rescue
    error -> {:error, error.__struct__}
  end
  matches = case actual do
    {:error, exception} -> expected == "!" <> inspect(exception)
    {:value, value} ->
      if String.starts_with?(expected, "!") do
        false
      else
        {expected_value, _} = Code.eval_string(expected)
        value === expected_value
      end
  end
  File.write!(result_path, if(matches, do: "ok", else: inspect(actual, limit: :infinity)))
`;
const erlangEvaluator = `
  [SourcePath, ExpectedPath, ResultPath, FilesPath, Mode] = init:get_plain_arguments(),
  {ok, [Files]} = file:consult(FilesPath),
  true = code:add_patha("."),
  lists:foreach(fun(Filename) -> {ok, _Module} = c:c(Filename) end, Files),
  case Mode of
    "escript" ->
      [Filename] = Files,
      ok = escript:create("notebook.escript", [shebang, {beam, filename:rootname(Filename) ++ ".beam"}]),
      ok = file:write_file(ResultPath, <<"ok">>);
    "evaluate" ->
      {ok, Source} = file:read_file(SourcePath),
      {ok, Tokens, _} = erl_scan:string(unicode:characters_to_list(Source)),
      Split = fun Loop([], [], Acc) -> lists:reverse(Acc);
        Loop([{dot, Annotation} = Dot | Rest], Current, Acc) ->
          Loop(Rest, [], [{erl_anno:line(Annotation), lists:reverse([Dot | Current])} | Acc]);
        Loop([Token | Rest], Current, Acc) -> Loop(Rest, [Token | Current], Acc)
      end,
      Groups = Split(Tokens, [], []),
      {_, Outcome, Checkpoints} = lists:foldl(fun({Line, Group}, {Bindings, _, Observations}) ->
        {ok, Expressions} = erl_parse:parse_exprs(Group),
        case Expressions of
          [{call, _, {atom, _, f}, []}] -> {erl_eval:new_bindings(), {value, ok}, Observations#{Line => {value, ok}}};
          _ ->
            try erl_eval:exprs(Expressions, Bindings, {value, fun(c, [Module]) -> c:c(Module) end}) of
              {value, Value, NextBindings} ->
                {NextBindings, {value, Value}, Observations#{Line => {value, Value}}}
            catch Class:Reason ->
              {Bindings, {error, Class, Reason}, Observations#{Line => {error, Class, Reason}}}
            end
        end
      end, {erl_eval:new_bindings(), {value, undefined}, #{}}, Groups),
      Actual = case Outcome of
        {value, FinalValue} -> {value, FinalValue, Checkpoints};
        Error -> Error
      end,
      {ok, [Expected]} = file:consult(ExpectedPath),
      Matches = case {Actual, Expected} of
        {{value, Value, Observations}, {value, Wanted, Checks, ExpectedErrors}} ->
          Errors = lists:sort([{Line, ErrorClass, ErrorReason} ||
            {Line, {error, ErrorClass, ErrorReason}} <- maps:to_list(Observations)]),
          Value =:= Wanted andalso Errors =:= ExpectedErrors andalso lists:all(fun({Line, Check}) ->
            maps:find(Line, Observations) =:= {ok, {value, Check}}
          end, Checks);
        {{error, ObservedClass, ObservedReason}, {error, WantedClass, WantedReason}} ->
          ObservedClass =:= WantedClass andalso ObservedReason =:= WantedReason;
        _ -> false
      end,
      Report = case Matches of true -> <<"ok">>; false -> io_lib:format("~tp", [Actual]) end,
      ok = file:write_file(ResultPath, Report)
  end,
  halt().
`;

function checkCoverage(notebooks, checks) {
  const slugs = notebooks.map(({ slug }) => slug);
  assert.equal(new Set(slugs).size, slugs.length, "Duplicate notebook slug");
  assert.equal(new Set(checks.map(({ slug }) => slug)).size, checks.length, "Duplicate expectation slug");
  assert.deepEqual([...slugs].sort(), checks.map(({ slug }) => slug).sort(), "Notebook/expectation coverage differs");
}

const foundationChecks = foundation.erlangFoundationExpectations.map((check) => ({
  ...check,
  mode: check.filename ? "module" : "shell",
  files: check.filename ? [{ name: check.filename }] : [],
}));
const erlangChecks = [...foundationChecks, ...advanced.erlangAdvancedNotebookChecks];
const erlangLocales = {
  zh: [...foundation.erlangFoundationNotebooks, ...advanced.erlangAdvancedNotebooks],
  en: [...foundation.erlangFoundationNotebooksEn, ...advanced.erlangAdvancedNotebooksEn],
};
const elixirLocales = { zh: elixirNotebooks, en: english.elixirNotebooksEn };
for (const notebooks of Object.values(elixirLocales)) {
  checkCoverage(notebooks, elixirNotebooks);
  assert.equal(notebooks.length, 30);
}
for (const notebooks of Object.values(erlangLocales)) {
  checkCoverage(notebooks, erlangChecks);
  assert.equal(notebooks.length, 31);
}
for (const notebook of [...elixirLocales.en, ...erlangLocales.en]) {
  assert.doesNotMatch(JSON.stringify(notebook), /\p{Script=Han}/u, `Chinese content in English notebook: ${notebook.slug}`);
}
const checksBySlug = new Map(erlangChecks.map((check) => [check.slug, check]));

const unicodeWhitespace = [
  0x0009, 0x000a, 0x000b, 0x000c, 0x000d, 0x0020, 0x0085, 0x00a0, 0x1680,
  0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008,
  0x2009, 0x200a, 0x2028, 0x2029, 0x202f, 0x205f, 0x3000,
];
const unicodeLineBreaks = new Set([0x000a, 0x000b, 0x000c, 0x000d, 0x0085, 0x2028, 0x2029]);
assert.equal(new Set(unicodeWhitespace).size, 25);
const allWhitespace = String.fromCodePoint(...unicodeWhitespace);
const countFixtures = unicodeWhitespace.flatMap((point) => {
  const separator = String.fromCodePoint(point);
  const name = `U+${point.toString(16).toUpperCase().padStart(4, "0")}`;
  return [
    { name: `${name}-between`, lines: [`hello${separator}beam`], words: 2 },
    { name: `${name}-edges`, lines: [`${separator}hello${separator}`], words: 1 },
    { name: `${name}-blank`, lines: [separator.repeat(3)], words: 0 },
  ];
});
countFixtures.push(
  { name: "empty-list", lines: [], words: 0 },
  { name: "empty-line", lines: [""], words: 0 },
  { name: "ordinary-ascii", lines: ["hello beam", "again"], words: 3 },
  { name: "repeated-ascii", lines: [" \t hello   beam\t\t again \t"], words: 3 },
  { name: "mixed-all-25", lines: [`one${allWhitespace}two${allWhitespace}three`], words: 3 },
  { name: "all-blank-25", lines: [allWhitespace.repeat(2)], words: 0 },
  { name: "cjk-without-separator", lines: ["长安春风"], words: 1 },
  { name: "cjk-with-separator", lines: ["长安\u3000春风"], words: 2 },
);
const parseFixtures = unicodeWhitespace.flatMap((point) => {
  const separator = String.fromCodePoint(point);
  const name = `U+${point.toString(16).toUpperCase().padStart(4, "0")}`;
  return [
    { name: `${name}-between-and-edges`, text: `${separator}hello${separator}${separator}beam${separator}`, lines: unicodeLineBreaks.has(point) ? ["hello", "beam"] : [`hello${separator}${separator}beam`], words: 2 },
    { name: `${name}-edges`, text: `${separator}hello${separator}`, lines: ["hello"], words: 1 },
    { name: `${name}-blank`, text: separator.repeat(3), lines: [], words: 0 },
  ];
});
parseFixtures.push(
  { name: "empty", text: "", lines: [], words: 0 },
  { name: "ordinary-ascii", text: "hello beam\nagain\n", lines: ["hello beam", "again"], words: 3 },
  { name: "mixed-crlf", text: "\u00a0hello\u202fbeam\u3000\r\n\u3000\t\u00a0\r\n\u202fagain\u3000\n", lines: ["hello\u202fbeam", "again"], words: 3 },
  { name: "repeated-mixed", text: "\u3000one\u00a0\u202f\t two\u3000\u3000three\u202f", lines: ["one\u00a0\u202f\t two\u3000\u3000three"], words: 3 },
  { name: "all-25-around-words", text: `${allWhitespace}hello${allWhitespace}beam${allWhitespace}`, lines: ["hello", "beam"], words: 2 },
  { name: "all-25-blank", text: allWhitespace.repeat(2), lines: [], words: 0 },
  { name: "cjk-without-separator", text: "长安春风\n", lines: ["长安春风"], words: 1 },
  { name: "cjk-with-separator", text: "长安\u3000春风\n", lines: ["长安\u3000春风"], words: 2 },
);
for (const point of [0x200b, 0xfeff, 0x180e, 0x0000, 0x001c, 0x001f]) {
  const character = String.fromCodePoint(point);
  const name = `non-whitespace-U+${point.toString(16).toUpperCase().padStart(4, "0")}`;
  for (const [suffix, text] of [["between", `hello${character}beam`], ["edges", `${character}hello${character}`], ["alone", character]]) {
    countFixtures.push({ name: `${name}-${suffix}`, lines: [text], words: 1 });
    parseFixtures.push({ name: `${name}-${suffix}`, text, lines: [text], words: 1 });
  }
}
const invalidUtf8Fixtures = [
  { name: "invalid-ff", hex: "ff" },
  { name: "truncated-e2", hex: "e2" },
  { name: "lone-continuation", hex: "80" },
  { name: "overlong", hex: "c0af" },
  { name: "surrogate", hex: "eda080" },
  { name: "invalid-after-prefix", hex: "68656c6c6fff" },
];

function binaryTerm(value) {
  return `<<${[...Buffer.from(value)].join(",")}>>`;
}

function linesTerm(lines) {
  return `[${lines.map(binaryTerm).join(",")}]`;
}

function statsFor(fixture) {
  return { lines: fixture.lines.length, words: fixture.words, chars: fixture.lines.reduce((total, line) => total + Array.from(line).length, 0) };
}

function statsTerm(fixture) {
  const { lines, words, chars } = statsFor(fixture);
  return `#{lines => ${lines}, words => ${words}, chars => ${chars}}`;
}

function parserFunction(notebook) {
  const [first, ...body] = notebook.code.split("\n");
  assert.match(first, /^Text = .*,$/);
  assert.ok(body.at(-1).endsWith("."));
  return `fun(Text) -> ${body.join("\n").slice(0, -1)} end`;
}

async function checkUnicodeMatrix(callback, rows, directory) {
  const source = `UnicodeCheck = ${callback},
lists:foreach(fun({Label, Input, Expected}) ->
  Actual = UnicodeCheck(Input),
  case Actual =:= Expected of
    true -> ok;
    false -> erlang:error({unicode_fixture, Label, expected, Expected, actual, Actual})
  end
end, [${rows.join(",\n")}]),
${rows.length}.`;
  await evaluateErlang(source, { value: String(rows.length) }, directory);
  unicodeAssertions += rows.length;
}

async function verifyUnicodeNotebook(notebook, variant, directory, label) {
  if (notebook.slug === "project-brief" || notebook.slug === "types-docs-and-tests" || (notebook.slug === "design-module-api" && variant === "original")) {
    await record(`${label} unicode-word-matrix`, async () => {
      let callback;
      if (notebook.slug === "project-brief") {
        const code = variant === "original" ? notebook.code : notebook.exercise.code;
        assert.equal(code.split("#{lines =>").length, 2);
        assert.ok(code.endsWith("}."));
        callback = `fun(Lines) -> ${code.slice(code.indexOf("#{lines =>"), -1)} end`;
      } else {
        callback = `fun ${notebook.slug === "design-module-api" ? "nb_stats" : "nb_contract"}:count/1`;
      }
      const rows = countFixtures.map((fixture) => `{${binaryTerm(fixture.name)},${linesTerm(fixture.lines)},${statsTerm(fixture)}}`);
      await checkUnicodeMatrix(callback, rows, directory);
    }, true);
  }
  if (notebook.slug === "parse-real-input" && variant === "original") {
    await record(`${label} unicode-parser-matrix`, async () => {
      const rows = parseFixtures.map((fixture) => `{${binaryTerm(fixture.name)},${binaryTerm(fixture.text)},{ok,${linesTerm(fixture.lines)}}}`);
      rows.push(...invalidUtf8Fixtures.map((fixture) => `{${binaryTerm(fixture.name)},${binaryTerm(Buffer.from(fixture.hex, "hex"))},{error,invalid_utf8}}`));
      await checkUnicodeMatrix(parserFunction(notebook), rows, directory);
    }, true);
  }
  if (notebook.slug === "project-acceptance") {
    for (const [index, fixture] of [...parseFixtures, ...invalidUtf8Fixtures].entries()) {
      await record(`${label} unicode-file-${fixture.name}`, async () => {
        const name = `unicode-${index}.txt`;
        const contents = fixture.hex ? Buffer.from(fixture.hex, "hex") : Buffer.from(fixture.text);
        await writeFile(ownedPath(directory, name), contents, { flag: "wx" });
        const result = run("escript", ["notebook.escript", name], directory);
        if (fixture.hex) {
          checkOutput(result, { exitStatus: 1, stdout: "", stderrIncludes: "invalid_utf8\n" });
        } else {
          const { lines, words, chars } = statsFor(fixture);
          checkOutput(result, { exitStatus: 0, stdout: `lines=${lines}\nwords=${words}\nchars=${chars}\n` });
          assert.equal(result.stderr, "");
        }
        assert.deepEqual(await readFile(ownedPath(directory, name)), contents, "CLI modified the input file");
        unicodeAssertions += 1;
      }, true);
    }
  }
}

async function verifyUnicodeDepth(root) {
  const { basicPaths } = await loadTypeScript(new URL("../app/basic-path-data.ts", import.meta.url));
  const lessons = basicPaths.find(({ id }) => id === "erlang").lessons;
  const parser = lessons.find(({ slug }) => slug === "parse-real-input").example.code;
  for (const slug of ["design-module-api", "types-docs-and-tests"]) {
    await record(`erlang/zh/depth/${slug} unicode-source-matrices`, async () => {
      const directory = await mkdtemp(join(root, "depth-unicode-"));
      try {
        const source = lessons.find((lesson) => lesson.slug === slug).example.code;
        assert.match(source, /-module\(trail_stats\)\./);
        assert.match(parser, /-module\(trail_parser\)\./);
        await writeFile(ownedPath(directory, "trail_stats.erl"), source, { flag: "wx" });
        await writeFile(ownedPath(directory, "trail_parser.erl"), parser, { flag: "wx" });
        await writeFile(join(directory, "runner-files.term"), '["trail_parser.erl","trail_stats.erl"].');
        await checkUnicodeMatrix("fun trail_stats:count/1", countFixtures.map((fixture) =>
          `{${binaryTerm(fixture.name)},${linesTerm(fixture.lines)},${statsTerm(fixture)}}`), directory);
        const parserRows = [];
        const integrationRows = [];
        for (const [index, fixture] of [...parseFixtures, ...invalidUtf8Fixtures].entries()) {
          const filename = `depth-input-${index}.txt`;
          const contents = fixture.hex ? Buffer.from(fixture.hex, "hex") : Buffer.from(fixture.text);
          await writeFile(ownedPath(directory, filename), contents, { flag: "wx" });
          const prefix = `{${binaryTerm(fixture.name)},${JSON.stringify(filename)},`;
          parserRows.push(`${prefix}${fixture.hex ? "{error,invalid_utf8}" : `{ok,${linesTerm(fixture.lines)}}`}}`);
          integrationRows.push(`${prefix}${fixture.hex ? "{error,invalid_utf8}" : statsTerm(fixture)}}`);
        }
        parserRows.push('{<<"missing-file">>,"absent.txt",{error,enoent}}');
        await checkUnicodeMatrix("fun trail_parser:read/1", parserRows, directory);
        await checkUnicodeMatrix("fun(Path) -> case trail_parser:read(Path) of {ok, Lines} -> trail_stats:count(Lines); Error -> Error end end", integrationRows, directory);
      } finally {
        await rm(directory, { recursive: true, force: true });
      }
    }, true);
  }
}

function ownedPath(directory, name) {
  assert.ok(name && name === basename(name) && name !== "." && name !== "..", `Invalid fixture filename: ${name}`);
  return join(directory, name);
}

function run(command, args, directory, input) {
  const result = spawnSync(command, args, {
    cwd: directory,
    env: { ...process.env, TMPDIR: directory, TMP: directory, TEMP: directory, ERL_FLAGS: "+S 2:2 +A 1" },
    encoding: "utf8",
    input,
    timeout: 15000,
    maxBuffer: 1024 * 1024,
  });
  if (result.error) throw result.error;
  assert.equal(result.signal, null, `${command} terminated by ${result.signal}`);
  return result;
}

function checkOutput(result, expected) {
  assert.equal(result.status, expected.exitStatus ?? 0, `Unexpected exit status\n${result.stdout}\n${result.stderr}`);
  if (expected.stdout !== undefined) assert.equal(result.stdout, expected.stdout, "stdout differs");
  if (expected.stdoutIncludes !== undefined) assert.ok(result.stdout.includes(expected.stdoutIncludes), `Missing stdout: ${expected.stdoutIncludes}\n${result.stdout}`);
  if (expected.stderrIncludes !== undefined) assert.ok(result.stderr.includes(expected.stderrIncludes), `Missing stderr: ${expected.stderrIncludes}\n${result.stderr}`);
}

async function checkResult(directory) {
  const report = await readFile(join(directory, "runner-result.txt"), "utf8");
  assert.equal(report, "ok", `Unexpected evaluated result: ${report}`);
}

async function verifyElixir(notebook, variant, locale, directory) {
  const expected = (locale === "en" && englishExpectations[notebook.slug] || elixirExpectations.get(notebook.slug))[variant === "exercise" ? 1 : 0];
  const source = join(directory, "runner-source.exs");
  await writeFile(source, variant === "original" ? notebook.code : notebook.exercise.code);
  const result = run("elixir", ["-e", elixirEvaluator, "--", source, expected, join(directory, "runner-result.txt")], directory);
  checkOutput(result, {});
  await checkResult(directory);
  if (notebook.slug === "tooling-and-escripts") {
    const printed = locale === "en"
      ? (variant === "exercise" ? "Hello, Xiaoman" : "Usage: hello_cli NAME")
      : (variant === "exercise" ? "你好，小满" : "用法：hello_cli 名字");
    assert.equal(result.stdout, `${printed}\n`);
  }
  if (notebook.slug === "files-and-paths" && variant === "original") {
    await record(`elixir/${locale}/${notebook.slug} exclusive-write-collision`, async () => {
      const existingPath = ownedPath(directory, "existing.txt");
      const existingContent = Buffer.from("keep existing content\n\u0000\ufffd", "utf8");
      await writeFile(existingPath, existingContent, { flag: "wx" });
      const lines = notebook.code.split("\n");
      assert.ok(lines[0].startsWith("path = Path.join("));
      lines[0] = 'path = Path.join(File.cwd!(), "existing.txt")';
      await writeFile(source, lines.join("\n"));
      const collision = run("elixir", ["-e", elixirEvaluator, "--", source, "{:error, :eexist}", join(directory, "runner-result.txt")], directory);
      checkOutput(collision, {});
      await checkResult(directory);
      assert.deepEqual(await readFile(existingPath), existingContent, "Collision overwrote or removed the existing file");
    }, true);
  }
}

async function prepareErlang(notebook, variant, check, directory) {
  let source = variant === "original" ? notebook.code : notebook.exercise.code;
  if (notebook.slug === "files-and-io") {
    assert.equal(source.split('filename:join("/tmp",').length, 2);
    source = source.replace('filename:join("/tmp",', 'filename:join(".",');
  }
  const files = check.files ?? [];
  const names = new Set();
  for (const file of files) {
    assert.ok(!names.has(file.name), `Duplicate module file: ${file.name}`);
    names.add(file.name);
    let contents = source;
    if (file.lines) {
      const [first, last] = file.lines;
      const lines = source.split("\n");
      assert.ok(Number.isInteger(first) && Number.isInteger(last) && first >= 1 && last >= first && last <= lines.length);
      contents = lines.slice(first - 1, last).join("\n");
    }
    await writeFile(ownedPath(directory, file.name), contents, { flag: "wx" });
  }
  for (const [name, fixture] of Object.entries(check.fixtures ?? {})) {
    const path = ownedPath(directory, name);
    assert.ok(!names.has(name), `Fixture shadows module: ${name}`);
    names.add(name);
    if (fixture.absent) continue;
    const contents = fixture.hex === undefined ? fixture.utf8 : Buffer.from(fixture.hex, "hex");
    await writeFile(path, contents, { flag: "wx" });
  }
  await writeFile(join(directory, "runner-files.term"), `[${files.map(({ name }) => JSON.stringify(name)).join(",")}].`);
  return check.mode === "shell" ? source : (check.run ? `${check.run}.` : notebook.setup);
}

async function evaluateErlang(source, expected, directory, mode = "evaluate") {
  let expectation = "undefined";
  if (expected?.error !== undefined) {
    const error = typeof expected.error === "string" ? { class: "error", reason: expected.error } : expected.error;
    assert.equal(error.class, "error");
    expectation = `{error,error,${error.reason}}`;
  } else if (expected?.value !== undefined) {
    const checkpoints = (expected.checkpoints ?? []).map(({ endingLine, value }) => `{${endingLine},${value}}`).join(",");
    const errors = (expected.commandErrors ?? []).map(({ endingLine, reason }) => `{${endingLine},error,${reason}}`).join(",");
    expectation = `{value,${expected.value},[${checkpoints}],[${errors}]}`;
  } else {
    assert.equal(mode, "escript", "Missing executable value/error expectation");
  }
  await writeFile(join(directory, "runner-source.erl.txt"), source ?? "");
  await writeFile(join(directory, "runner-expected.term"), `${expectation}.`);
  await rm(join(directory, "runner-result.txt"), { force: true });
  const result = run("erl", ["-noshell", "-eval", erlangEvaluator, "-extra",
    join(directory, "runner-source.erl.txt"), join(directory, "runner-expected.term"),
    join(directory, "runner-result.txt"), join(directory, "runner-files.term"), mode,
  ], directory);
  checkOutput(result, {});
  await checkResult(directory);
  if (expected) checkOutput(result, expected);
}

async function verifyErlang(notebook, variant, directory, label) {
  const check = checksBySlug.get(notebook.slug);
  const source = await prepareErlang(notebook, variant, check, directory);
  if (check.mode === "escript") {
    await evaluateErlang(undefined, undefined, directory, "escript");
    checkOutput(run("escript", ["notebook.escript", ...(check.args ?? [])], directory), check[variant]);
  } else {
    await evaluateErlang(source, check[variant], directory);
  }
  await verifyUnicodeNotebook(notebook, variant, directory, label);
  if (notebook.slug === "types-docs-and-tests") {
    await record(`${label} public-edoc`, async () => {
      await evaluateErlang(
        '{nb_contract, Doc} = edoc:get_doc("nb_contract.erl"),\nlength(xmerl_xpath:string("//function[@name=\'count\'][@arity=\'1\']/description", Doc)).',
        { value: "1" }, directory,
      );
    }, true);
  }
  for (const [index, extra] of (check.extraRuns ?? []).entries()) {
    if (variant === "exercise" && extra.variant !== "both") continue;
    await record(`${label} boundary-${index + 1}`, async () => {
      if (check.mode === "escript") {
        checkOutput(run("escript", ["notebook.escript", ...(extra.args ?? check.args ?? [])], directory), extra.expected);
      } else {
        assert.ok(extra.run, "Missing boundary expression");
        await evaluateErlang(`${extra.run}.`, extra.expected, directory);
      }
    }, true);
  }
}

function shellTranscript(source, directory) {
  const result = run("erl", ["-oldshell"], directory, source);
  checkOutput(result, {});
  return `${result.stdout}\n${result.stderr}`.replaceAll("\r", "");
}

async function verifyTeachingRegressions(root) {
  async function regression(label, operation) {
    await record(`erlang/audit/${label}`, async () => {
      const directory = await mkdtemp(join(root, "audit-"));
      try {
        await writeFile(join(directory, "runner-files.term"), "[].");
        await operation(directory);
      } finally {
        await rm(directory, { recursive: true, force: true });
      }
    }, true);
  }
  await regression("shutdown-is-prose-only", async () => {
    for (const notebooks of Object.values(erlangLocales)) {
      for (const notebook of notebooks) {
        for (const code of [notebook.code, notebook.exercise.code]) {
          assert.doesNotMatch(code, /\bq\s*\(/, `${notebook.slug} shuts down the teaching node`);
        }
      }
    }
  });
  await regression("standalone-q-stops-node", async (directory) => {
    const result = run("erl", ["-oldshell", "-eval", 'spawn(fun() -> timer:sleep(60000) end).'], directory,
      'io:format("AUDIT_BEFORE_Q~n", []).\nq().\n');
    checkOutput(result, { stdoutIncludes: "AUDIT_BEFORE_Q\n" });
    assert.doesNotMatch(`${result.stdout}\n${result.stderr}`, /\*\* exception|syntax error/);
  });
  await regression("period-commands-continue-after-error", async (directory) => {
    const source = 'Count = 2.\nCount = 3.\nCount.';
    await evaluateErlang(source, {
      value: "2", checkpoints: [{ endingLine: 1, value: "2" }, { endingLine: 3, value: "2" }],
      commandErrors: [{ endingLine: 2, reason: "{badmatch,3}" }],
    }, directory);
    await assert.rejects(evaluateErlang(source, { value: "2" }, directory), /Unexpected evaluated result/);
    await assert.rejects(evaluateErlang(source, { error: "{badmatch,3}" }, directory), /Unexpected evaluated result/);
    const transcript = shellTranscript(`${source}\nio:format("AUDIT_BINDING=~p~n", [Count]).\ninit:stop().\n`, directory);
    assert.match(transcript, /no match of right hand side value 3/);
    assert.match(transcript, /AUDIT_BINDING=2\n/);
    const atomic = 'Count = 2, Count = 3.\nCount.';
    await evaluateErlang(atomic, { error: "{unbound,'Count'}" }, directory);
    const atomicTranscript = shellTranscript(`${atomic}\nio:format("AUDIT_ALIVE~n", []).\ninit:stop().\n`, directory);
    assert.match(atomicTranscript, /variable 'Count' is unbound/);
    assert.match(atomicTranscript, /AUDIT_ALIVE\n/);
  });
  for (const [locale, notebooks] of Object.entries(erlangLocales)) {
    const matching = notebooks.find(({ slug }) => slug === "variables-and-matching");
    for (const variant of ["original", "exercise"]) {
      await regression(`${locale}/matching-${variant}-real-shell`, async (directory) => {
        const source = variant === "original" ? matching.code : matching.exercise.code;
        assert.match(source, /^f\(\)\.\n[^]*,\n[^]*,\nCount = [23],\n\{Count, Name\}\.$/);
        const transcript = shellTranscript(`${source}\nio:format("AUDIT_ALIVE~n", []).\ninit:stop().\n`, directory);
        assert.match(transcript, /AUDIT_ALIVE\n/);
        if (variant === "original") {
          assert.match(transcript, /\{2,<<"report">>\}/);
          assert.doesNotMatch(transcript, /\*\* exception/);
        } else {
          assert.match(transcript, /no match of right hand side value 3/);
          assert.equal(transcript.match(/\*\* exception/g)?.length, 1);
          assert.doesNotMatch(transcript, /\{2,<<"report">>\}/);
        }
      });
    }
    for (const check of foundationChecks.filter(({ mode }) => mode === "module")) {
      const notebook = notebooks.find(({ slug }) => slug === check.slug);
      await regression(`${locale}/${check.slug}-failed-recompile`, async (directory) => {
        await prepareErlang(notebook, "original", check, directory);
        const moduleName = basename(check.filename, ".erl");
        const guard = `{ok, ${moduleName}} = c(${moduleName}),`;
        assert.ok(notebook.setup.startsWith(guard), "Compile and invocation must share a guarded command");
        const broken = Buffer.from(`-module(${moduleName}).\nbroken( ->.\n`).toString("base64");
        const unguarded = notebook.setup.replace(guard, `c(${moduleName}),`);
        const source = `{ok, ${moduleName}} = c(${moduleName}).
ok = file:write_file("${check.filename}", base64:decode("${broken}")).
io:format("AUDIT_GUARDED_BEGIN~n", []).
${notebook.setup}
io:format("AUDIT_GUARDED_END~n", []).
${unguarded}
io:format("AUDIT_CONTROL_END~n", []).
init:stop().
`;
        const transcript = shellTranscript(source, directory);
        const guarded = transcript.split("AUDIT_GUARDED_BEGIN\n")[1]?.split("AUDIT_GUARDED_END\n")[0];
        const control = transcript.split("AUDIT_GUARDED_END\n")[1]?.split("AUDIT_CONTROL_END\n")[0];
        assert.ok(guarded && control, transcript);
        assert.match(guarded, /no match of right hand side value error/);
        const expected = check.original.value.replaceAll(/\s/g, "");
        assert.ok(!guarded.replaceAll(/\s/g, "").includes(expected), "Guarded setup invoked stale code");
        assert.ok(control.replaceAll(/\s/g, "").includes(expected), "Negative control must demonstrate the loaded stale code");
      });
    }
  }
}

let failures = 0;
let mainCases = 0;
let boundaryCases = 0;
let unicodeAssertions = 0;
async function record(label, operation, boundary = false) {
  if (boundary) boundaryCases += 1;
  else mainCases += 1;
  try {
    await operation();
    console.log(`PASS ${label}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${label}: ${error.message}`);
  }
}

const root = await mkdtemp(join(tmpdir(), "beam-notebook-checks-"));
try {
  await verifyTeachingRegressions(root);
  await verifyUnicodeDepth(root);
  for (const [language, locales] of Object.entries({ elixir: elixirLocales, erlang: erlangLocales })) {
    for (const [locale, notebooks] of Object.entries(locales)) {
      for (const notebook of notebooks) {
        for (const variant of ["original", "exercise"]) {
          const label = `${language}/${locale}/${notebook.slug} ${variant}`;
          await record(label, async () => {
            const directory = await mkdtemp(join(root, "case-"));
            try {
              if (language === "elixir") await verifyElixir(notebook, variant, locale, directory);
              else await verifyErlang(notebook, variant, directory, label);
            } finally {
              await rm(directory, { recursive: true, force: true });
            }
          });
        }
      }
    }
  }
} finally {
  await rm(root, { recursive: true, force: true });
}
assert.equal(mainCases, 244, "Expected all four routes' code/exercise cases");
console.log(`${mainCases} code/exercise cases; ${boundaryCases} boundary checks; ${unicodeAssertions} Unicode fixture assertions; ${failures} failures.`);
if (failures) process.exitCode = 1;
