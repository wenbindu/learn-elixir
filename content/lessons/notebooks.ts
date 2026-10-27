import { scratchNotebooks } from "./notebooks-scratch";
import { foundationNotebooks } from "./notebooks-foundation";
import { intermediateNotebooks } from "./notebooks-intermediate";
import { projectNotebooks } from "./notebooks-project";
import type { LessonMetadata } from "../../app/lesson-metadata";

export const elixirNotebooks = [...scratchNotebooks, ...foundationNotebooks, ...intermediateNotebooks, ...projectNotebooks];

export function getElixirNotebook(slug: string) {
  return elixirNotebooks.find((notebook) => notebook.slug === slug);
}

export function notebookMetadata(slug: string, title: string): LessonMetadata | undefined {
  const notebook = getElixirNotebook(slug);
  if (!notebook) return undefined;
  return {
    id: slug, title, core_concept: notebook.core, prerequisites: notebook.prerequisites,
    reused_in: elixirNotebooks.filter((candidate) => candidate.slug !== slug && candidate.prerequisites.some((concept) => notebook.core.includes(concept))).map((candidate) => candidate.slug),
    related: [], project_contribution: notebook.contribution, ability_after: notebook.ability,
    depth_pages: [`/from-scratch/elixir/${slug}/deeper`],
  };
}
