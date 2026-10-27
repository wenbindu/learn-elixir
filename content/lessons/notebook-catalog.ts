import type { BasicLesson, BasicPathId } from "../../app/basic-path-data";
import type { Locale } from "../../app/i18n/locales";
import { validateLessonMetadata, type LessonMetadata } from "../../app/lesson-metadata";
import { validateNotebooks } from "../../app/notebook-lesson";
import { elixirNotebooks } from "./notebooks";
import { elixirNotebooksEn } from "./notebooks.en";
import { erlangFoundationNotebooks, erlangFoundationNotebooksEn } from "./notebooks-erlang-foundation";
import { erlangAdvancedNotebooks, erlangAdvancedNotebooksEn } from "./notebooks-erlang-advanced";

const notebooks = {
  zh: { elixir: elixirNotebooks, erlang: [...erlangFoundationNotebooks, ...erlangAdvancedNotebooks] },
  en: { elixir: elixirNotebooksEn, erlang: [...erlangFoundationNotebooksEn, ...erlangAdvancedNotebooksEn] },
};

export function getNotebooks(locale: Locale, language: BasicPathId) {
  return notebooks[locale][language];
}

export function getNotebook(locale: Locale, language: BasicPathId, slug: string) {
  return getNotebooks(locale, language).find((notebook) => notebook.slug === slug);
}

export function getNotebookMetadata(locale: Locale, language: BasicPathId, slug: string, title: string): LessonMetadata | undefined {
  const items = getNotebooks(locale, language);
  const index = items.findIndex((notebook) => notebook.slug === slug);
  const notebook = items[index];
  if (!notebook) return undefined;
  return {
    id: slug, title, core_concept: notebook.core, prerequisites: notebook.prerequisites,
    reused_in: items.slice(index + 1).filter((candidate) => candidate.prerequisites.some((concept) => notebook.core.includes(concept))).map((candidate) => candidate.slug),
    related: [], project_contribution: notebook.contribution, ability_after: notebook.ability,
    depth_pages: [`/from-scratch/${language}/${slug}/deeper`],
  };
}

export function withNotebookMetadata(lessons: BasicLesson[], locale: Locale, language: BasicPathId) {
  const result = lessons.map((lesson, index) => ({
    ...lesson,
    number: String(index + 1).padStart(2, "0"),
    metadata: getNotebookMetadata(locale, language, lesson.slug, lesson.title) ?? lesson.metadata,
  }));
  validateNotebooks(getNotebooks(locale, language), result.map((lesson) => lesson.slug));
  validateLessonMetadata(result);
  for (const lesson of result) {
    if (!lesson.metadata) throw new Error(`${locale}/${language}/${lesson.slug}: missing lesson metadata`);
  }
  return result;
}
