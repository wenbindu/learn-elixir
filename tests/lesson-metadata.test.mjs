import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";
import { loadTypeScript } from "./load-typescript.mjs";

const source = await readFile(new URL("../app/lesson-metadata.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { validateLessonMetadata } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);

function lesson(number, slug, core, prerequisites = []) {
  return {
    number,
    slug,
    title: slug,
    metadata: {
      id: slug,
      title: slug,
      core_concept: core,
      prerequisites,
      reused_in: [],
      related: [],
      project_contribution: "Print the project result.",
      ability_after: "Read a return value.",
      depth_pages: ["/depth"],
    },
  };
}

test("allows a first lesson with no prerequisites and later reuse", () => {
  const first = lesson("01", "meet-iex", ["expression", "return-value"]);
  first.metadata.reused_in = ["values"];
  assert.doesNotThrow(() => validateLessonMetadata([
    first, lesson("02", "values", ["atom"], ["return-value"]),
  ]));
});

test("identifies the lesson and missing prerequisite, including future and self dependencies", () => {
  for (const missing of ["unknown", "return-value", "atom"]) {
    assert.throws(() => validateLessonMetadata([
      lesson("01", "meet-iex", ["expression", "return-value"], [missing]),
      lesson("02", "values", ["atom"]),
    ]), new RegExp(`第 01 课（meet-iex）.*前置概念 ${missing}.*更早课程`));
  }
});

test("does not count unannotated legacy concepts as validated prerequisites", () => {
  assert.throws(() => validateLessonMetadata([
    { number: "01", slug: "legacy", title: "Legacy", concepts: [{ term: "expression" }] },
    lesson("02", "values", ["atom"], ["expression"]),
  ]), /第 02 课（values）.*expression/);
});

test("rejects missing, same-lesson, and backward reuse links", () => {
  for (const target of ["missing", "values", "meet-iex"]) {
    const second = lesson("02", "values", ["atom"]);
    second.metadata.reused_in = [target];
    assert.throws(() => validateLessonMetadata([
      lesson("01", "meet-iex", ["expression"]), second,
    ]), /第 02 课（values）.*reused_in/);
  }
});

test("rejects too many core concepts and incomplete metadata", () => {
  assert.throws(() => validateLessonMetadata([
    lesson("01", "meet-iex", ["expression", "return-value", "atom"]),
  ]), /core_concept/);
  const incomplete = lesson("01", "meet-iex", ["expression"]);
  incomplete.metadata.project_contribution = "";
  assert.throws(() => validateLessonMetadata([incomplete]), /project_contribution/);
});

test("validates metadata and depth destinations for all 126 bilingual lessons", async () => {
  const { getBasicPaths } = await loadTypeScript(new URL("../app/i18n/catalog.ts", import.meta.url));
  const { getNotebook } = await loadTypeScript(new URL("../content/lessons/notebook-catalog.ts", import.meta.url));
  let count = 0;
  let depthPages = 0;
  for (const locale of ["zh", "en"]) {
    const paths = getBasicPaths(locale);
    assert.deepEqual(paths.map((path) => path.id).sort(), ["elixir", "erlang"]);
    for (const path of paths) {
      assert.equal(path.lessons.length, path.id === "elixir" ? 32 : 31, `${locale}/${path.id}`);
      assert.equal(new Set(path.lessons.map((item) => item.slug)).size, path.lessons.length);
      assert.doesNotThrow(() => validateLessonMetadata(path.lessons), `${locale}/${path.id}`);
      for (const [index, lesson] of path.lessons.entries()) {
        count += 1;
        const label = `${locale}/${path.id}/${lesson.slug}`;
        assert.equal(lesson.number, String(index + 1).padStart(2, "0"), label);
        assert.ok(lesson.metadata, label);
        const metadata = lesson.metadata;
        assert.equal(metadata.id, lesson.slug, label);
        assert.equal(metadata.title, lesson.title, label);
        const start = path.id === "elixir" && lesson.slug === "start-iex";
        assert.ok(metadata.depth_pages.includes(start ? "/learn/install-toolchain" : `/from-scratch/${path.id}/${lesson.slug}/deeper`), label);
        if (start) assert.ok(!metadata.depth_pages.some((href) => href.endsWith("/start-iex/deeper")), label);
        else depthPages += 1;
        for (const related of metadata.related) assert.ok(path.lessons.some((item) => item.slug === related), `${label}: ${related}`);
        const notebook = getNotebook(locale, path.id, lesson.slug);
        if (notebook) {
          assert.deepEqual(metadata.core_concept, notebook.core, label);
          assert.deepEqual(metadata.prerequisites, notebook.prerequisites, label);
          assert.equal(metadata.project_contribution, notebook.contribution, label);
          assert.equal(metadata.ability_after, notebook.ability, label);
        }
        if (locale === "en") {
          for (const text of [lesson.title, metadata.project_contribution, metadata.ability_after]) {
            assert.doesNotMatch(text, /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/u, label);
          }
        }
      }
    }
  }
  assert.equal(count, 126);
  assert.equal(depthPages, 124);
});

test("keeps route order and metadata concept IDs identical across locales", async () => {
  const { getBasicPaths } = await loadTypeScript(new URL("../app/i18n/catalog.ts", import.meta.url));
  for (const chinese of getBasicPaths("zh")) {
    const english = getBasicPaths("en").find((path) => path.id === chinese.id);
    assert.ok(english, chinese.id);
    assert.deepEqual(english.lessons.map((item) => item.slug), chinese.lessons.map((item) => item.slug));
    for (const [index, original] of chinese.lessons.entries()) {
      const translated = english.lessons[index];
      for (const field of ["id", "core_concept", "prerequisites", "reused_in", "related", "depth_pages"]) {
        assert.deepEqual(translated.metadata[field], original.metadata[field], `${chinese.id}/${original.slug}:${field}`);
      }
    }
  }
});
