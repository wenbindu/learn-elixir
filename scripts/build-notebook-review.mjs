import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { loadTypeScript } from "../tests/load-typescript.mjs";

const root = new URL("../", import.meta.url);
const reportUrl = new URL("docs/notebook-bilingual-review.md", root);
const options = new Set(process.argv.slice(2));
const defaultCatalog = "content/lessons/notebook-catalog.ts";
const usage = `Usage: node scripts/build-notebook-review.mjs [--check] [--catalog=${defaultCatalog}]`;
if (options.has("--help")) {
  console.log(`${usage}\nGenerate the bilingual evidence report, or use --check to verify it is current.\nExit 1 means missing coverage, failed structural checks, or a stale report.\nManual editorial review and declared setup exceptions do not count as structural passes.`);
} else {
  try {
    await main();
  } catch (error) {
    console.error(`Notebook review: ${error.message}`);
    process.exitCode = 1;
  }
}

function cell(value) {
  return String(value ?? "—").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("|", "&#124;").replaceAll("`", "&#96;").replaceAll("\r", "").replaceAll("\n", "<br>");
}

function table(headers, rows) {
  return [`| ${headers.map(cell).join(" | ")} |`, `| ${headers.map(() => "---").join(" | ")} |`, ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`)].join("\n");
}

function strings(value, prefix = "") {
  if (typeof value === "string") return [[prefix, value]];
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, item]) => strings(item, prefix ? `${prefix}.${key}` : key));
}

function nonempty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function count(value) {
  return Array.from(value ?? "").length;
}

function status(failures) {
  return failures.length ? `FAIL: ${failures.join("; ")}` : "PASS";
}

function bannedHits(entries) {
  const pattern = /不是.{0,35}而是|不只是.{0,35}更是|让我们一起|不妨|值得一提|事实上|本质上|赋能|打通|抓手|探索之旅|其实|显然|简单来说|先停十秒|\blet['’]s embark\b|\bit['’]s worth noting\b|\bas a matter of fact\b|\bempower(?:ing|ment)?\b|\bjourney of exploration\b|\bpause for ten seconds\b/iu;
  return entries.flatMap(([field, value]) => {
    const match = value.match(pattern);
    return match ? [`${field}: ${match[0]}`] : [];
  });
}

function notebookProse(notebook) {
  return strings({
    problem: notebook.problem, prediction: notebook.prediction, ability: notebook.ability,
    contribution: notebook.contribution, environment: notebook.environment, setup: notebook.setup,
    notes: notebook.notes.map(({ label, text }) => ({ label, text })),
    trace: notebook.trace.map(({ label, explanation }) => ({ label, explanation })),
    exercise: { task: notebook.exercise.task, choices: notebook.exercise.choices, explanation: notebook.exercise.explanation, hints: notebook.exercise.hints },
    review: notebook.review, takeaways: notebook.takeaways,
  });
}

async function componentEvidence(path) {
  const source = await readFile(new URL(path, root), "utf8");
  const tree = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const pairs = [];
  const declarations = new Map();
  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) declarations.set(node.name.text, node.initializer);
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "text" && node.arguments.length === 2 && node.arguments.every((argument) => ts.isStringLiteralLike(argument))) {
      pairs.push({ zh: node.arguments[0].text, en: node.arguments[1].text, line: tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1 });
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  function literalArray(expression) {
    if (expression && ts.isAsExpression(expression)) return literalArray(expression.expression);
    if (!expression || !ts.isArrayLiteralExpression(expression)) return [];
    return expression.elements.map((element) => {
      if (ts.isStringLiteralLike(element)) return element.text;
      if (ts.isObjectLiteralExpression(element)) {
        const property = element.properties.find((item) => ts.isPropertyAssignment(item) && item.name.getText(tree) === "label");
        if (property && ts.isStringLiteralLike(property.initializer)) return property.initializer.text;
      }
      return "";
    });
  }
  const labels = declarations.get("viewLabels");
  const en = labels && ts.isConditionalExpression(labels) ? literalArray(labels.whenTrue) : [];
  const zh = literalArray(declarations.get("views"));
  return { path, source, pairs, views: { zh, en } };
}

function metadataEvidence(lesson, lessons, notebook) {
  const metadata = lesson.metadata;
  const failures = [];
  if (!metadata) return { failures: ["missing metadata"], detail: "No metadata on the localized basic-path lesson." };
  if (metadata.id !== lesson.slug || metadata.title !== lesson.title) failures.push("metadata id/title differs from the localized lesson");
  for (const field of ["core_concept", "prerequisites", "reused_in", "related", "depth_pages"]) {
    const values = metadata[field];
    if (!Array.isArray(values) || values.some((value) => !nonempty(value)) || new Set(values).size !== values.length) failures.push(`invalid ${field}`);
  }
  if (!Array.isArray(metadata.core_concept) || metadata.core_concept.length < 1 || metadata.core_concept.length > 2) failures.push("core count must be 1–2");
  if (!Array.isArray(metadata.depth_pages) || metadata.depth_pages.length < 1 || metadata.depth_pages.length > 2) failures.push("depth page count must be 1–2");
  for (const field of ["project_contribution", "ability_after"]) if (!nonempty(metadata[field])) failures.push(`missing ${field}`);
  const position = lessons.findIndex((item) => item.slug === lesson.slug);
  const earlier = lessons.slice(0, position);
  const origins = (metadata.prerequisites ?? []).map((concept) => {
    const source = earlier.find((item) => item.metadata?.core_concept?.includes(concept));
    if (!source) failures.push(`prerequisite ${concept} has no earlier core introduction`);
    return `${concept} ← ${source ? `${source.number} ${source.slug}` : "MISSING"}`;
  });
  for (const slug of metadata.reused_in ?? []) if (lessons.findIndex((item) => item.slug === slug) <= position) failures.push(`reuse target is not later: ${slug}`);
  for (const slug of metadata.related ?? []) if (!lessons.some((item) => item.slug === slug)) failures.push(`unknown related lesson: ${slug}`);
  if (notebook) {
    for (const [field, source] of [["core_concept", "core"], ["prerequisites", "prerequisites"], ["project_contribution", "contribution"], ["ability_after", "ability"]]) {
      if (JSON.stringify(metadata[field]) !== JSON.stringify(notebook[source])) failures.push(`metadata ${field} differs from notebook ${source}`);
    }
  }
  return {
    failures,
    detail: `core: ${(metadata.core_concept ?? []).join(", ")}; prerequisites: ${origins.join("; ") || "none"}; reused_in: ${(metadata.reused_in ?? []).join(", ") || "none"}; related: ${(metadata.related ?? []).join(", ") || "none"}; depth_pages: ${(metadata.depth_pages ?? []).join(", ") || "none"}`,
  };
}

function headingEvidence(headings) {
  const generic = /^(?:概述|介绍|总结|知识点|深入理解|小结|overview|introduction|summary|concepts?|conclusion|learn more)$/iu;
  const flags = headings.filter((heading) => !nonempty(heading) || generic.test(heading.trim()));
  const duplicates = headings.filter((heading, index) => headings.indexOf(heading) !== index);
  return `Lexical screen: ${flags.length ? `REVIEW generic/empty: ${flags.join(", ")}` : "no exact generic-heading matches"}; repeated labels: ${[...new Set(duplicates)].join(", ") || "none"}. Specificity: PENDING human review. Actual headings: ${headings.join(" / ")}`;
}

function explanationEvidence(entries) {
  const failures = entries.filter(([, value]) => !nonempty(value) || count(value) > 200).map(([field, value]) => `${field} = ${count(value)} characters`);
  return { failures, detail: `${entries.map(([field, value]) => `${field}: ${count(value)}`).join(", ")}; limit 1–200 Unicode code points per explanation.` };
}

async function main() {
  const catalogOptions = [...options].filter((option) => option.startsWith("--catalog="));
  if (catalogOptions.length > 1 || [...options].some((option) => option !== "--check" && !option.startsWith("--catalog="))) throw new Error(usage);
  const catalogPath = catalogOptions[0]?.slice("--catalog=".length) || defaultCatalog;
  const catalog = await loadTypeScript(new URL(catalogPath, root));
  if (typeof catalog.getNotebooks !== "function" || typeof catalog.getNotebook !== "function") throw new Error(`${catalogPath} is not ready: expected getNotebooks(locale, language) and getNotebook(locale, language, slug). No report was overwritten.`);
  const [basicCatalog, validators, copyModule, startZh, startEn, meetZh, meetEn, startComponent, meetComponent] = await Promise.all([
    loadTypeScript(new URL("app/i18n/catalog.ts", root)),
    loadTypeScript(new URL("app/notebook-lesson.ts", root)),
    loadTypeScript(new URL("app/notebook-copy.ts", root)),
    loadTypeScript(new URL("content/lessons/start-iex.ts", root)),
    loadTypeScript(new URL("content/lessons/start-iex.en.ts", root)),
    loadTypeScript(new URL("content/lessons/meet-iex.ts", root)),
    loadTypeScript(new URL("content/lessons/meet-iex.en.ts", root)),
    componentEvidence("app/components/StartIexLesson.tsx"),
    componentEvidence("app/components/AnnotatedIexBoard.tsx"),
  ]);
  const special = {
    zh: { "start-iex": { lesson: startZh.startIexLesson, metadata: startZh.startIexMetadata }, "meet-iex": { lesson: meetZh.meetIexLesson, metadata: meetZh.meetIexMetadata, activity: meetZh.meetIexActivity } },
    en: { "start-iex": { lesson: startEn.startIexLessonEn, metadata: startEn.startIexMetadataEn }, "meet-iex": { lesson: meetEn.meetIexLessonEn, metadata: meetEn.meetIexMetadataEn, activity: meetEn.meetIexActivityEn } },
  };
  const groups = [];
  const globalFailures = [];
  const fingerprints = [startComponent.source, meetComponent.source];
  for (const locale of ["zh", "en"]) {
    const paths = basicCatalog.getBasicPaths(locale);
    for (const language of ["elixir", "erlang"]) {
      const path = paths.find((item) => item.id === language);
      if (!path) throw new Error(`Missing ${locale}/${language} basic path; no report was overwritten.`);
      const expected = language === "elixir" ? 32 : 31;
      if (path.lessons.length !== expected) globalFailures.push(`${locale}/${language}: expected ${expected} lessons, received ${path.lessons.length}`);
      const notebooks = catalog.getNotebooks(locale, language);
      if (!Array.isArray(notebooks)) throw new Error(`${locale}/${language}: getNotebooks must return an array`);
      const copy = copyModule.notebookCopy(locale, language);
      fingerprints.push(JSON.stringify({ locale, language, lessons: path.lessons, notebooks, copy, special: language === "elixir" ? special[locale] : null }));
      const slugs = notebooks.map((item) => item.slug);
      if (new Set(slugs).size !== slugs.length) globalFailures.push(`${locale}/${language}: duplicate notebook slugs`);
      if (new Set(path.lessons.map((item) => item.slug)).size !== path.lessons.length) globalFailures.push(`${locale}/${language}: duplicate lesson routes`);
      const unknown = slugs.filter((slug) => !path.lessons.some((lesson) => lesson.slug === slug));
      if (unknown.length) globalFailures.push(`${locale}/${language}: unknown notebook slugs: ${unknown.join(", ")}`);
      const expectedOrder = path.lessons.map((item) => item.slug).filter((slug) => slugs.includes(slug));
      if (JSON.stringify(slugs) !== JSON.stringify(expectedOrder)) globalFailures.push(`${locale}/${language}: notebook order differs from the basic path`);
      const rows = path.lessons.map((lesson, index) => {
        const notebook = notebooks.find((item) => item.slug === lesson.slug);
        const lookup = catalog.getNotebook(locale, language, lesson.slug);
        const failures = [];
        if (JSON.stringify(lookup) !== JSON.stringify(notebook)) failures.push("getNotebook/getNotebooks disagree");
        const specialData = language === "elixir" ? special[locale][lesson.slug] : undefined;
        const record = specialData
          ? specialEvidence({ locale, lesson, lessons: path.lessons, data: specialData, component: lesson.slug === "start-iex" ? startComponent : meetComponent })
          : notebookEvidence({ locale, language, lesson, lessons: path.lessons, notebook, copy, validators });
        record.failures.unshift(...failures);
        record.route = `/${locale}/from-scratch/${language}/${lesson.slug}`;
        record.number = lesson.number;
        record.title = lesson.title;
        record.slug = lesson.slug;
        record.index = index;
        return record;
      });
      const depthPages = new Set(path.lessons.flatMap((lesson) => lesson.metadata?.depth_pages ?? []).filter((path) => path.startsWith(`/from-scratch/${language}/`) && path.endsWith("/deeper")).map((path) => `/${locale}${path}`));
      if (depthPages.size !== 31) globalFailures.push(`${locale}/${language}: expected 31 distinct declared lesson depth pages, received ${depthPages.size}`);
      groups.push({ locale, language, expected, rows, notebooks, depthPages });
    }
  }
  for (const language of ["elixir", "erlang"]) {
    const chinese = groups.find((group) => group.locale === "zh" && group.language === language);
    const english = groups.find((group) => group.locale === "en" && group.language === language);
    if (JSON.stringify(chinese.rows.map((row) => row.slug)) !== JSON.stringify(english.rows.map((row) => row.slug))) globalFailures.push(`${language}: bilingual route order differs`);
  }
  const allRows = groups.flatMap((group) => group.rows);
  const depthPageCount = groups.reduce((total, group) => total + group.depthPages.size, 0);
  if (allRows.length !== 126) globalFailures.push(`Expected 126 lesson pages, found ${allRows.length}`);
  const failures = [...globalFailures, ...allRows.flatMap((row) => row.failures.map((failure) => `${row.route}: ${failure}`))];
  const fingerprint = createHash("sha256").update(fingerprints.join("\n")).digest("hex");
  const sections = [
    "# Bilingual notebook evidence review",
    `Generated by \`node scripts/build-notebook-review.mjs${catalogPath === defaultCatalog ? "" : ` --catalog=${catalogPath}`}\`. Do not edit this report by hand. Check freshness with \`--check\`.`,
    `Source snapshot SHA-256: \`${fingerprint}\`. Notebook catalog: \`${catalogPath}\`; lesson order and metadata: \`getBasicPaths(locale)\` from \`app/i18n/catalog.ts\`. Modules are imported through \`tests/load-typescript.mjs\`.`,
    "## Approved layout and evidence boundaries",
    "The latest approved three-view annotated canvas explicitly supersedes the original five-block template. Standard views are Read code / Trace results / Change one thing (读代码 / 看运行过程 / 只改一处). The setup lesson uses Enter IEx / Exit IEx / Try it yourself. Five-block conformity is not an acceptance requirement.",
    "PASS means a stated machine check passed on imported data. It does not mean the page was rendered, arrows or interactions were tested, examples were executed, or the prose passed editorial review. This generator executes no Elixir or Erlang code. Every output below is declared source evidence, not a runtime observation. No external execution report is included.",
    `Coverage counts 126 primary lesson routes: 32 Elixir and 31 Erlang lessons in each of two locales. Metadata declares ${depthPageCount}/124 distinct localized lesson depth-page URLs; the two Elixir setup lessons instead reference /learn/install-toolchain. Depth coverage is derived from metadata, not from building or fetching routes. EXCEPTION is a documented schema difference, never a fabricated PASS. PENDING is an outstanding human judgment.`,
    "The unexpected/error row quotes exercise.output and exercise.explanation verbatim for standard notebooks. Their presence is checked; whether the result is educationally surprising remains a human judgment. Length checks count Unicode code points in every trace explanation and the exercise explanation. Note text and titles are not silently substituted for those fields.",
    "The banned-phrase scan covers lesson titles, notebook prose, labels, choices, hints, review, takeaways, metadata prose, and shared static UI copy. Executable code and output fixtures are excluded. It applies the validator's Chinese pattern plus 先停十秒 and the explicit English patterns listed below. A clean scan cannot prove the absence of all filler. Special component scans include literal text(zh, en) calls; interpolated JSX and browser output are not certified.",
    "English banned patterns: let's embark; it's worth noting; as a matter of fact; empower / empowering / empowerment; journey of exploration; pause for ten seconds. Heading checks report empty or exact generic headings (概述, 介绍, 总结, 知识点, 深入理解, 小结, overview, introduction, summary, concept(s), conclusion, learn more) and duplicates. These lexical signals do not establish specificity.",
    "For each PENDING deletion review, remove the quoted sentence or note and ask which line behavior, reason, boundary, or consequence becomes unavailable. Record that missing information before approving the prose. This report selects evidence but does not invent a human verdict. All per-lesson heading-specificity judgments are also PENDING.",
    "## Coverage and machine checks",
    table(["Locale / language", "Expected routes", "Rows", "Declared depth pages", "Standard notebook evidence", "Separate special evidence", "Rows with failures"], groups.map((group) => [`${group.locale} / ${group.language}`, group.expected, group.rows.length, `${group.depthPages.size}/31`, group.rows.filter((row) => row.kind === "notebook").length, group.rows.filter((row) => row.kind === "special").length, group.rows.filter((row) => row.failures.length).length])),
    `Machine result: **${failures.length ? "FAIL" : "PASS"}**; ${allRows.length}/126 route rows; ${failures.length} failed checks. Manual sentence-deletion and heading-specificity review: **PENDING for every lesson**. Runtime execution: **NOT RUN by this generator**.`,
    "## Exceptions and separate sources",
    "Elixir start-iex and meet-iex are read independently from content/lessons/start-iex.ts, start-iex.en.ts, meet-iex.ts, and meet-iex.en.ts, including their metadata and activity exports. They are not counted as missing generic notebooks. Catalog entries, if any, do not replace the special component evidence. Locale-specific title and metadata are checked against the basic-path lesson; summary differences are recorded as source differences, since the special component owns its page problem.",
    "The first lesson of each language is exempt from an earlier-lesson review. Elixir start-iex is an interactive terminal setup lesson: check.question / check.answer and practice.expected replace generic exercise.output / explanation evidence. It has no generic line-annotation or changed-code requirement. Elixir meet-iex uses practice.answer plus activity.answerExplanation, and its actual earlier-review wording is extracted from AnnotatedIexBoard.tsx. Source-declared view labels and literal copy are inspected, without claiming UI behavior or rendered line coverage.",
    failures.length ? `## Failed checks\n\n${failures.map((failure) => `- ${cell(failure)}`).join("\n")}` : "## Failed checks\n\nNone in the stated machine-check scope.",
  ];
  for (const group of groups) {
    sections.push(`## ${group.locale} / ${group.language}`);
    for (const row of group.rows) {
      sections.push(`### ${cell(row.number)} · ${cell(row.title)}`, `Route: \`${row.route}\` · Source: ${cell(row.source)} · Machine status: ${cell(status(row.failures))}`, table(["Check", "Evidence and scope"], row.evidence));
    }
  }
  const report = `${sections.join("\n\n")}\n`;
  if (options.has("--check")) {
    const current = await readFile(reportUrl, "utf8").catch((error) => {
      if (error.code === "ENOENT") return "";
      throw error;
    });
    if (current !== report) {
      console.error("Notebook review is missing or stale. Run node scripts/build-notebook-review.mjs with the same --catalog option.");
      process.exitCode = 1;
    }
  } else {
    await writeFile(reportUrl, report, "utf8");
    console.log(`Wrote ${fileURLToPath(reportUrl)}`);
  }
  console.log(`${allRows.length}/126 lesson rows; ${failures.length} machine failures; editorial reviews pending; examples not executed.`);
  if (failures.length) {
    failures.forEach((failure) => console.error(failure));
    process.exitCode = 1;
  }
}

function notebookEvidence({ locale, language, lesson, lessons, notebook, copy, validators }) {
  if (!notebook) return { kind: "missing", source: "notebook catalog: missing", failures: ["missing notebook"], evidence: [["Coverage", "FAIL: no notebook data; no prose or validation results fabricated."]] };
  const failures = [];
  try {
    validators.validateNotebooks([notebook], lessons.map((item) => item.slug));
  } catch (error) {
    failures.push(`schema: ${error.message}`);
  }
  const metadata = metadataEvidence(lesson, lessons, notebook);
  failures.push(...metadata.failures);
  const explanations = explanationEvidence([...notebook.trace.map((item, index) => [`trace[${index}]`, item.explanation]), ["exercise", notebook.exercise.explanation]]);
  failures.push(...explanations.failures);
  const prose = [...notebookProse(notebook), ["title", lesson.title], ...strings(lesson.metadata, "metadata"), ...strings(copy, "shared UI")];
  const banned = bannedHits(prose);
  failures.push(...banned.map((hit) => `banned phrase ${hit}`));
  const chinese = locale === "en" ? strings({ notebook, title: lesson.title, metadata: lesson.metadata, copy }).filter(([, value]) => /\p{Script=Han}/u.test(value)).map(([field]) => field) : [];
  failures.push(...chinese.map((field) => `Chinese remains in ${field}`));
  if (!nonempty(notebook.exercise.output)) failures.push("empty exercise output");
  if (copy.views.length !== 3 || copy.views.some((view) => !nonempty(view))) failures.push("expected three named canvas views");
  if ([lesson.title, ...notebook.notes.map((item) => item.label), ...notebook.trace.map((item) => item.label)].some((heading) => !nonempty(heading))) failures.push("empty lesson or annotation heading");
  if (notebook.exercise.hints.length !== 2 || notebook.takeaways.length !== 3) failures.push("expected two hints and three takeaways");
  if (notebook.code === notebook.exercise.code) failures.push("exercise code is unchanged");
  const reviewIndex = notebook.review ? lessons.findIndex((item) => item.slug === notebook.review.slug) : -1;
  const currentIndex = lessons.findIndex((item) => item.slug === lesson.slug);
  const earlier = notebook.review && reviewIndex >= 0 && reviewIndex < currentIndex;
  if (notebook.review && !earlier) failures.push("review is not from an earlier lesson");
  if (!notebook.review && currentIndex !== 0) failures.push("missing earlier review");
  const review = notebook.review ? `${earlier ? "PASS" : "FAIL"}: ${lessons[reviewIndex]?.number ?? "?"} ${notebook.review.slug}; Q: ${notebook.review.question}; A: ${notebook.review.answer}` : currentIndex === 0 ? "EXEMPT: first lesson has no earlier lesson." : "FAIL: missing review.";
  const covered = new Set(notebook.notes.flatMap((note) => note.lines));
  const codeLines = notebook.code.split("\n");
  const nonblank = codeLines.flatMap((line, index) => line.trim() ? [index + 1] : []);
  const sample = notebook.notes[0];
  return {
    kind: "notebook", source: `getNotebooks(${locale}, ${language}) / getNotebook(${locale}, ${language}, ${lesson.slug})`, failures,
    evidence: [
      ["Problem / prediction", `Problem: ${notebook.problem}\nPrediction: ${notebook.prediction}\nMachine check: nonempty source fields; pedagogical specificity requires human review.`],
      ["Unexpected result or error", `exercise.output: ${notebook.exercise.output}\nexercise.explanation: ${notebook.exercise.explanation}\nDeclared result only; error/surprise quality is not machine-certified.`],
      ["Code / annotations / views", `${copy.views.join(" / ")}; code ${codeLines.length} lines; exercise ${notebook.exercise.code.split("\n").length} lines; annotated nonblank lines ${nonblank.filter((line) => covered.has(line)).length}/${nonblank.length}; notes ${notebook.notes.length}; trace steps ${notebook.trace.length}; hints ${notebook.exercise.hints.length}; takeaways ${notebook.takeaways.length}; correct choice index ${notebook.exercise.correct} (zero-based): ${notebook.exercise.choices[notebook.exercise.correct]}. Schema checks line bounds and 1–10 lines. Changed-code inequality is checked; a semantically single edit is not proved.`],
      ["Explanation lengths", `${status(explanations.failures)}: ${explanations.detail}`],
      ["Earlier review", review],
      ["Metadata / dependencies", `${status(metadata.failures)}: ${metadata.detail}`],
      ["Project / ability / environment", `Contribution: ${notebook.contribution}\nAbility: ${notebook.ability}\nEnvironment: ${notebook.environment ?? copy.shell}; setup: ${notebook.setup ?? "no lesson-specific setup"}; shared instruction: ${copy.instruction}`],
      ["Banned phrases / English", `${banned.length ? `FAIL: ${banned.join("; ")}` : `PASS: no listed pattern in ${prose.length} prose strings`}. ${locale === "en" ? chinese.length ? `FAIL: Chinese in ${chinese.join(", ")}` : "PASS: no Chinese in notebook code, output, prose, metadata, or static shared copy." : "Chinese language is intentional."}`],
      ["Heading specificity", headingEvidence([lesson.title, ...notebook.notes.map((item) => item.label), ...notebook.trace.map((item) => item.label), notebook.exercise.task])],
      ["Sentence-deletion review", `PENDING human review. Candidate: ${sample?.text ?? "MISSING"}\nSource: notes[0], lines ${sample?.lines.join(", ") ?? "?"}. Delete it and identify the lost code behavior or consequence. Presence and line linkage alone do not establish necessity.`],
    ],
  };
}

function specialEvidence({ locale, lesson, lessons, data, component }) {
  const failures = [];
  const sourceLesson = data.lesson;
  const setup = lesson.slug === "start-iex";
  const metadata = metadataEvidence(lesson, lessons);
  failures.push(...metadata.failures);
  if (!sourceLesson || sourceLesson.slug !== lesson.slug) throw new Error(`Missing separate ${locale}/${lesson.slug} source export`);
  if (sourceLesson.title !== lesson.title) failures.push("catalog title differs from special translated source");
  if (JSON.stringify(data.metadata) !== JSON.stringify(lesson.metadata)) failures.push("special metadata differs from localized catalog metadata");
  const componentCopy = component.pairs.map((pair) => [`${component.path}:${pair.line}`, pair[locale]]);
  const reviewPair = component.pairs.find((pair) => pair.en.startsWith("Review lesson 01:"));
  const answerPair = component.pairs.find((pair) => pair.en.startsWith("Not yet. Press Ctrl+C again."));
  const traceExplanations = component.pairs.filter((pair) => pair.en.startsWith("IO.puts prints the text, then returns") || pair.en.startsWith("A return value is the result that code hands back."));
  const changeExplanations = component.pairs.filter((pair) => pair.en.startsWith("IO.puts is called:") || pair.en.startsWith("Only the text remains, so IEx displays it."));
  const predictionPair = component.pairs.find((pair) => pair.en === "Will line 1 display one line or two?");
  const entries = setup
    ? [["check.answer", sourceLesson.check.answer], ["practice.answer", sourceLesson.practice.answer], ...sourceLesson.plain.map((value, index) => [`plain[${index}]`, value])]
    : [["activity.answerExplanation", data.activity.answerExplanation], ...traceExplanations.map((pair, index) => [`trace[${index}] component:${pair.line}`, pair[locale]]), ...changeExplanations.map((pair, index) => [`change[${index}] component:${pair.line}`, pair[locale]])];
  const explanations = explanationEvidence(entries);
  failures.push(...explanations.failures);
  if (!setup && (traceExplanations.length !== 2 || changeExplanations.length !== 2 || !predictionPair || !reviewPair || !answerPair)) failures.push("special component prediction/trace/change/review literals changed or are missing; update evidence extraction");
  const prose = [...strings(sourceLesson).filter(([field]) => !["example.code", "practice.starter", ...setup ? [] : ["practice.answer"]].includes(field)), ...strings(data.metadata, "metadata"), ...componentCopy, ...strings(data.activity, "activity").filter(([field]) => !["activity.repair", "activity.transcript", "activity.projectPreview"].includes(field))];
  const banned = bannedHits(prose);
  failures.push(...banned.map((hit) => `banned phrase ${hit}`));
  const chinese = locale === "en" ? [...strings(data), ...componentCopy].filter(([, value]) => /\p{Script=Han}/u.test(value)).map(([field]) => field) : [];
  failures.push(...chinese.map((field) => `Chinese remains in ${field}`));
  const views = component.views[locale];
  if (views.length !== 3 || views.some((value) => !nonempty(value))) failures.push("could not extract three special view labels");
  const position = lessons.findIndex((item) => item.slug === lesson.slug);
  if (setup && position !== 0) failures.push("setup exemption requires first lesson");
  const startIndex = lessons.findIndex((item) => item.slug === "start-iex");
  if (!setup && (startIndex < 0 || startIndex >= position)) failures.push("special review target start-iex is not earlier");
  const review = setup ? "EXEMPT: first lesson; no earlier lesson exists." : `${reviewPair && answerPair && startIndex >= 0 && startIndex < position ? "PASS" : "FAIL"}: start-iex precedes this lesson; ${reviewPair?.[locale] ?? "MISSING QUESTION"}; ${answerPair?.[locale] ?? "MISSING ANSWER"}. Source: ${component.path}:${reviewPair?.line ?? "?"}; target is explicitly mapped from lesson 01.`;
  return {
    kind: "special", failures, source: `content/lessons/${lesson.slug}${locale === "en" ? ".en" : ""}.ts plus ${component.path}`,
    evidence: [
      ["Problem / prediction", `Page problem (lesson.summary): ${sourceLesson.summary}\n${setup ? `Prediction (lesson.check.question): ${sourceLesson.check.question}` : `Component prediction: ${predictionPair?.[locale] ?? "MISSING"}\nImported check.question: ${sourceLesson.check.question}\nActivity problem: ${data.activity.problem}`}\n${lesson.summary === sourceLesson.summary ? "Catalog summary matches the page problem." : `SOURCE DIFFERENCE (not a schema failure): catalog summary = ${lesson.summary}; the special page uses its own problem above.`}`],
      ["Unexpected result or error", setup ? `EXCEPTION: terminal setup has no exercise.output / exercise.explanation. check.answer: ${sourceLesson.check.answer}\npractice.expected: ${sourceLesson.practice.expected}\npractice.answer: ${sourceLesson.practice.answer}` : `Separate-schema equivalent of exercise.output (practice.answer): ${sourceLesson.practice.answer}\nImported explanation (activity.answerExplanation): ${data.activity.answerExplanation}\nActual changed-result component explanation: ${changeExplanations[1]?.[locale] ?? "MISSING"}\nOriginal transcript: ${data.activity.transcript}\nDeclared results; no runtime execution.`],
      ["Code / annotations / views", `${views.join(" / ")}; example: ${sourceLesson.example.code}; ${setup ? "terminal procedure" : "changed code"}: ${sourceLesson.practice.starter}; takeaways: ${sourceLesson.takeaways.length}. ${setup ? "EXCEPTION: setup has no generic annotated code or one-edit exercise." : "Special component supplies annotations and trace steps; generic NotebookLesson line-index coverage is not applicable and rendered coverage is not certified."}`],
      ["Explanation lengths", `${status(explanations.failures)}: ${explanations.detail} Measured separate-source fields, not a fabricated NotebookLesson schema.`],
      ["Earlier review", review],
      ["Metadata / dependencies", `${status(metadata.failures)}: ${metadata.detail}`],
      ["Project / ability / environment", `Contribution: ${data.metadata.project_contribution}\nAbility: ${data.metadata.ability_after}\nEnvironment: ${sourceLesson.example.caption}\nPractice: ${sourceLesson.practice.task}`],
      ["Banned phrases / English", `${banned.length ? `FAIL: ${banned.join("; ")}` : `PASS: no listed pattern in ${prose.length} source prose strings`}. ${locale === "en" ? chinese.length ? `FAIL: Chinese in ${chinese.join(", ")}` : "PASS: no Chinese in separate lesson/activity/metadata exports or extracted English component literals." : "Chinese language is intentional."}`],
      ["Heading specificity", `${headingEvidence([sourceLesson.title, sourceLesson.example.label, ...views])} Special annotation headings with mixed JSX are not certified.`],
      ["Sentence-deletion review", `PENDING human review. Candidate: ${setup ? sourceLesson.plain[2] : data.activity.answerExplanation}\nSource: ${setup ? "lesson.plain[2]" : "activity.answerExplanation"}. Identify which exit-state or printed-value distinction is lost if the sentence is removed.`],
    ],
  };
}
