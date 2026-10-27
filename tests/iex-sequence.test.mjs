import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

async function loadSource(pathname) {
  const source = await readFile(new URL(pathname, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
}

test("introduces the actual IEx session prerequisites before the return-value lesson", async () => {
  const { startIexLesson } = await loadSource("../content/lessons/start-iex.ts");
  const { meetIexLesson } = await loadSource("../content/lessons/meet-iex.ts");
  const { validateLessonMetadata } = await loadSource("../app/lesson-metadata.ts");
  assert.equal(startIexLesson.number, "01");
  assert.equal(meetIexLesson.number, "02");
  assert.deepEqual(meetIexLesson.metadata.prerequisites, startIexLesson.metadata.core_concept);
  const later = ["values-and-types", "functions-and-arity", "package-and-observe"].map((slug, index) => ({
    slug, title: slug, number: String(index + 3),
  }));
  assert.doesNotThrow(() => validateLessonMetadata([startIexLesson, meetIexLesson, ...later]));
  assert.throws(() => validateLessonMetadata([meetIexLesson, ...later]), /前置概念 iex-session/);
});

test("introduces the same IEx prerequisites in English lessons 01 and 02", async () => {
  const { startIexLessonEn } = await loadSource("../content/lessons/start-iex.en.ts");
  const { meetIexLessonEn } = await loadSource("../content/lessons/meet-iex.en.ts");
  const { validateLessonMetadata } = await loadSource("../app/lesson-metadata.ts");
  assert.equal(startIexLessonEn.number, "01");
  assert.equal(meetIexLessonEn.number, "02");
  assert.equal(startIexLessonEn.slug, "start-iex");
  assert.equal(meetIexLessonEn.slug, "meet-iex");
  assert.deepEqual(meetIexLessonEn.metadata.prerequisites, startIexLessonEn.metadata.core_concept);
  assert.deepEqual(startIexLessonEn.metadata.depth_pages, ["/learn/install-toolchain"]);
  const later = ["values-and-types", "functions-and-arity", "package-and-observe"].map((slug, index) => ({
    slug, title: slug, number: String(index + 3),
  }));
  assert.doesNotThrow(() => validateLessonMetadata([startIexLessonEn, meetIexLessonEn, ...later]));
  assert.throws(() => validateLessonMetadata([meetIexLessonEn, ...later]), /前置概念 iex-session/);
});

test("preserves the IEx lesson when switching either locale, including trailing slashes", async () => {
  const { localePathname, isPathAvailable } = await loadSource("../app/i18n/locales.ts");
  assert.equal(localePathname("/zh/from-scratch/elixir/start-iex", "en"), "/en/from-scratch/elixir/start-iex");
  assert.equal(localePathname("/zh/from-scratch/elixir/start-iex/", "en"), "/en/from-scratch/elixir/start-iex/");
  assert.equal(localePathname("/zh/from-scratch/elixir/start-iex", "zh"), "/zh/from-scratch/elixir/start-iex");
  assert.equal(localePathname("/zh/from-scratch/elixir/meet-iex", "en"), "/en/from-scratch/elixir/meet-iex");
  assert.equal(localePathname("/en/from-scratch/elixir/start-iex", "zh"), "/zh/from-scratch/elixir/start-iex");
  assert.equal(isPathAvailable("en", "/from-scratch/elixir/start-iex"), true);
  assert.equal(isPathAvailable("zh", "/from-scratch/elixir/start-iex"), true);
  for (const locale of ["zh", "en"]) assert.equal(isPathAvailable(locale, "/from-scratch/elixir/start-iex/"), true);
});
