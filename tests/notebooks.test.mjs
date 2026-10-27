import assert from "node:assert/strict";
import { test } from "node:test";
import { loadTypeScript } from "./load-typescript.mjs";

const { getNotebook, getNotebooks } = await loadTypeScript(new URL("../content/lessons/notebook-catalog.ts", import.meta.url));
const { validateNotebooks, defineNotebook } = await loadTypeScript(new URL("../app/notebook-lesson.ts", import.meta.url));
const { getBasicPaths } = await loadTypeScript(new URL("../app/i18n/catalog.ts", import.meta.url));
const elixir = getBasicPaths("zh").find((path) => path.id === "elixir");
const elixirNotebooks = getNotebooks("zh", "elixir");
const order = elixir.lessons.map((lesson) => lesson.slug);

function stringEntries(value, prefix = "") {
  if (typeof value === "string") return [[prefix, value]];
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, item]) => stringEntries(item, `${prefix}.${key}`));
}

test("covers all generic Elixir and Erlang notebooks in both locales", () => {
  let count = 0;
  for (const locale of ["zh", "en"]) {
    for (const path of getBasicPaths(locale)) {
      const lessonOrder = path.lessons.map((lesson) => lesson.slug);
      const notebooks = getNotebooks(locale, path.id);
      assert.equal(path.lessons.length, path.id === "elixir" ? 32 : 31, `${locale}/${path.id}`);
      assert.deepEqual(notebooks.map((item) => item.slug), path.id === "elixir" ? lessonOrder.slice(2) : lessonOrder);
      assert.doesNotThrow(() => validateNotebooks(notebooks, lessonOrder), `${locale}/${path.id}`);
      assert.equal(getNotebook(locale, path.id, "not-a-lesson"), undefined);
      for (const notebook of notebooks) {
        count += 1;
        const label = `${locale}/${path.id}/${notebook.slug}`;
        assert.deepEqual(getNotebook(locale, path.id, notebook.slug), notebook, label);
        assert.equal(notebook.takeaways.length, 3, label);
        assert.equal(notebook.exercise.hints.length, 2, label);
        assert.notEqual(notebook.code, notebook.exercise.code, label);
        assert.equal(notebook.review === null, path.id === "erlang" && notebook.slug === lessonOrder[0], label);
        if (notebook.environment !== undefined) assert.ok(notebook.environment.trim(), label);
        if (notebook.setup !== undefined) assert.ok(notebook.setup.trim(), label);
        for (const [field, text] of stringEntries(notebook)) {
          assert.ok(text.trim(), `${label}:${field} must not be empty`);
          if (locale === "en") assert.doesNotMatch(text, /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/u, `${label}:${field}`);
        }
      }
    }
  }
  assert.equal(count, 122);
});

test("keeps concept IDs and exercise structure stable across notebook translations", () => {
  for (const language of ["elixir", "erlang"]) {
    const chinese = getNotebooks("zh", language);
    const english = getNotebooks("en", language);
    assert.deepEqual(english.map((item) => item.slug), chinese.map((item) => item.slug));
    for (const original of chinese) {
      const translated = getNotebook("en", language, original.slug);
      const label = `${language}/${original.slug}`;
      for (const field of ["core", "prerequisites"]) {
        assert.deepEqual(translated[field], original[field], `${label}:${field}`);
        for (const identifier of translated[field]) assert.match(identifier, /^[a-z][a-z0-9-]*$/, label);
      }
      assert.equal(translated.review?.slug, original.review?.slug, label);
      assert.equal(translated.exercise.correct, original.exercise.correct, label);
      assert.equal(translated.exercise.choices.length, original.exercise.choices.length, label);
      for (const field of ["notes", "trace"]) assert.deepEqual(translated[field].map((item) => item.lines), original[field].map((item) => item.lines), `${label}:${field}`);
    }
  }
});

test("rejects missing line notes, long explanations, future review and ambiguous edits", () => {
  const first = structuredClone(elixirNotebooks[0]);
  first.notes = first.notes.slice(1);
  assert.throws(() => validateNotebooks([first], order), /缺少批注/);
  const future = structuredClone(elixirNotebooks[0]);
  future.review.slug = "project-acceptance";
  assert.throws(() => validateNotebooks([future], order), /更早课程/);
  const long = structuredClone(elixirNotebooks[0]);
  long.trace[0].explanation = "长".repeat(201);
  assert.throws(() => validateNotebooks([long], order), /200 字/);
  assert.throws(() => defineNotebook({ ...elixirNotebooks[0], exercise: { ...elixirNotebooks[0].exercise, replace: ["不存在", "新内容"] } }), /唯一的一处/);
});

test("keeps every original lesson field available for the depth pages", () => {
  for (const locale of ["zh", "en"]) {
    for (const path of getBasicPaths(locale)) {
      for (const lesson of path.lessons) {
        if (path.id === "elixir" && ["start-iex", "meet-iex"].includes(lesson.slug)) continue;
        const label = `${locale}/${path.id}/${lesson.slug}`;
        for (const field of ["plain", "concepts", "symbols", "steps", "takeaways"]) assert.ok(lesson[field].length, `${label}:${field}`);
        assert.ok(lesson.example.code, label);
        assert.ok(lesson.practice.starter, label);
        assert.ok(lesson.practice.answer, label);
        assert.ok(lesson.check.answer, label);
        assert.ok(lesson.metadata.depth_pages.includes(`/from-scratch/${path.id}/${lesson.slug}/deeper`), label);
      }
    }
  }
});

test("permits a null review only on the first Erlang lesson", () => {
  for (const locale of ["zh", "en"]) {
    for (const path of getBasicPaths(locale)) {
      const lessonOrder = path.lessons.map((lesson) => lesson.slug);
      for (const notebook of getNotebooks(locale, path.id)) {
        const withoutReview = { ...notebook, review: null };
        if (path.id === "erlang" && notebook.slug === lessonOrder[0]) assert.doesNotThrow(() => validateNotebooks([withoutReview], lessonOrder));
        else assert.throws(() => validateNotebooks([withoutReview], lessonOrder), /更早课程/);
      }
    }
  }
});

test("rejects duplicate or unknown notebooks, invalid line references and invalid prediction answers", () => {
  const path = getBasicPaths("en").find((item) => item.id === "erlang");
  const lessonOrder = path.lessons.map((lesson) => lesson.slug);
  const notebook = getNotebooks("en", "erlang")[0];
  assert.throws(() => validateNotebooks([notebook, notebook], lessonOrder), /重复/);
  assert.throws(() => validateNotebooks([{ ...notebook, slug: "not-a-lesson" }], lessonOrder), /课程不存在/);
  for (const field of ["notes", "trace"]) {
    const invalid = structuredClone(notebook);
    invalid[field][0].lines.push(notebook.code.split("\n").length + 1);
    assert.throws(() => validateNotebooks([invalid], lessonOrder), /行号越界/);
  }
  const invalid = structuredClone(notebook);
  invalid.exercise.correct = invalid.exercise.choices.length;
  assert.throws(() => validateNotebooks([invalid], lessonOrder), /答案无效/);
});
