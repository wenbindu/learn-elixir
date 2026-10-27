export type LessonMetadata = {
  id: string;
  title: string;
  core_concept: string[];
  prerequisites: string[];
  reused_in: string[];
  related: string[];
  project_contribution: string;
  ability_after: string;
  depth_pages: string[];
};

type MetadataLesson = {
  number: string;
  slug: string;
  title: string;
  metadata?: LessonMetadata;
};

export function validateLessonMetadata(lessons: MetadataLesson[]) {
  const introduced = new Set<string>();
  const slugs = new Set(lessons.map((lesson) => lesson.slug));

  for (const lesson of lessons) {
    const metadata = lesson.metadata;
    if (!metadata) continue;

    const fail = (reason: string): never => {
      throw new Error(`第 ${lesson.number} 课（${lesson.slug}）元数据错误：${reason}`);
    };

    if (metadata.id !== lesson.slug || metadata.title !== lesson.title) {
      fail("id、title 必须与课程一致");
    }

    for (const field of ["project_contribution", "ability_after"] as const) {
      if (!metadata[field]?.trim()) fail(`${field} 不能为空`);
    }

    for (const field of [
      "core_concept", "prerequisites", "reused_in", "related", "depth_pages",
    ] as const) {
      const values = metadata[field];
      if (!Array.isArray(values) || values.some((value) => !value.trim())) {
        fail(`${field} 必须是非空字符串组成的数组`);
      }
      if (new Set(values).size !== values.length) fail(`${field} 含重复项`);
    }

    if (metadata.core_concept.length < 1 || metadata.core_concept.length > 2) {
      fail("core_concept 必须包含 1 到 2 个概念 id");
    }
    if (metadata.depth_pages.length < 1 || metadata.depth_pages.length > 2) {
      fail("depth_pages 必须包含 1 到 2 个页面");
    }
    for (const concept of metadata.prerequisites) {
      if (!introduced.has(concept)) {
        fail(`前置概念 ${concept} 尚未在更早课程的 core_concept 中出现`);
      }
    }
    for (const slug of metadata.reused_in) {
      const target = lessons.find((candidate) => candidate.slug === slug);
      if (!slugs.has(slug) || !target || Number(target.number) <= Number(lesson.number)) {
        fail(`reused_in 必须指向后面的课程：${slug}`);
      }
    }
    for (const concept of metadata.core_concept) introduced.add(concept);
  }
}
