import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTypeScript } from "../tests/load-typescript.mjs";

const reportUrl = new URL("../docs/bilingual-concept-dependencies.json", import.meta.url);
const usage = "Usage: node scripts/build-concept-review.mjs [--check]";
const compare = (left, right) => left < right ? -1 : left > right ? 1 : 0;
const sorted = (values) => [...values].sort(compare);

function lessonReference(locale, language, lesson) {
  return { slug: lesson.slug, number: lesson.number, title: lesson.title, href: `/${locale}/from-scratch/${language}/${lesson.slug}` };
}

function localizedDepth(locale, href) {
  assert.ok(href.startsWith("/") && !href.startsWith("//"), `Expected a local depth path: ${href}`);
  return `/${locale}${href.replace(/^\/(?:en|zh)(?=\/|$)/, "")}`;
}

export function buildConceptReview(catalogs) {
  const nodes = new Map();
  const edges = new Map();
  const contributions = [];
  const paths = [];
  const seenPaths = new Set();

  function addEdge(type, from, to, evidence) {
    const key = JSON.stringify([type, from, to]);
    if (!edges.has(key)) edges.set(key, { type, from, to, evidence: [] });
    edges.get(key).evidence.push(evidence);
  }

  for (const { locale, paths: basicPaths } of [...catalogs].sort((left, right) => compare(left.locale, right.locale))) {
    for (const path of [...basicPaths].sort((left, right) => compare(left.id, right.id))) {
      const language = path.id;
      const pathKey = `${locale}/${language}`;
      assert.ok(!seenPaths.has(pathKey), `Duplicate path: ${pathKey}`);
      seenPaths.add(pathKey);
      paths.push({ locale, language, lessons: path.lessons.length });
      const lessons = new Map(path.lessons.map((lesson) => [lesson.slug, lesson]));
      assert.equal(lessons.size, path.lessons.length, `${pathKey}: duplicate lesson slug`);
      const contexts = new Map();
      const positions = new Map(path.lessons.map((lesson, index) => [lesson.slug, index]));
      const reference = (lesson) => lessonReference(locale, language, lesson);
      const lookup = (slug) => {
        const lesson = lessons.get(slug);
        assert.ok(lesson?.metadata, `${pathKey}: missing referenced lesson metadata for ${slug}`);
        return lesson;
      };

      for (const [position, lesson] of path.lessons.entries()) {
        const metadata = lesson.metadata;
        const label = `${pathKey}/${lesson.slug}`;
        assert.ok(metadata, `${label}: missing metadata`);
        assert.equal(metadata.id, lesson.slug, label);
        assert.equal(metadata.title, lesson.title, label);
        for (const field of ["core_concept", "prerequisites", "reused_in", "related", "depth_pages"]) {
          assert.ok(Array.isArray(metadata[field]) && metadata[field].every((value) => typeof value === "string" && value.trim()), `${label}: invalid ${field}`);
          assert.equal(new Set(metadata[field]).size, metadata[field].length, `${label}: duplicate ${field}`);
        }
        assert.ok(metadata.core_concept.length >= 1 && metadata.core_concept.length <= 2, `${label}: invalid core count`);
        assert.ok(metadata.depth_pages.length, `${label}: missing depth evidence`);
        assert.ok(typeof metadata.project_contribution === "string" && metadata.project_contribution.trim(), `${label}: missing contribution`);
        const sourceLesson = reference(lesson);
        const depthPages = sorted(metadata.depth_pages).map((href) => ({ declaredPath: href, href: localizedDepth(locale, href) }));

        for (const prerequisite of sorted(metadata.prerequisites)) {
          assert.ok(contexts.has(prerequisite), `${label}: prerequisite ${prerequisite} has no earlier introduction`);
          for (const concept of sorted(metadata.core_concept)) {
            addEdge("prerequisite", prerequisite, concept, {
              locale, language, lesson: sourceLesson, firstLesson: contexts.get(prerequisite).firstLesson,
              fields: ["metadata.prerequisites", "metadata.core_concept"],
            });
          }
        }

        for (const concept of sorted(metadata.core_concept)) {
          if (!nodes.has(concept)) nodes.set(concept, { id: concept, contexts: [] });
          if (!contexts.has(concept)) {
            const context = { locale, language, firstLesson: sourceLesson, coreLessons: [], reusedIn: [], related: [], depthPages: [] };
            contexts.set(concept, context);
            nodes.get(concept).contexts.push(context);
          }
          const context = contexts.get(concept);
          context.coreLessons.push(sourceLesson);
          for (const slug of sorted(metadata.reused_in)) {
            const target = lookup(slug);
            assert.ok(positions.get(slug) > position, `${label}: reused_in must point to a later lesson: ${slug}`);
            context.reusedIn.push({ declaredBy: sourceLesson, lesson: reference(target), field: "metadata.reused_in" });
          }
          for (const slug of sorted(metadata.related)) {
            const target = lookup(slug);
            const relatedLesson = reference(target);
            context.related.push({ declaredBy: sourceLesson, lesson: relatedLesson, field: "metadata.related" });
            for (const relatedConcept of sorted(target.metadata.core_concept)) {
              addEdge("contrast", concept, relatedConcept, { locale, language, lesson: sourceLesson, relatedLesson, field: "metadata.related" });
            }
          }
          for (const depth of depthPages) context.depthPages.push({ lesson: sourceLesson, ...depth, field: "metadata.depth_pages" });
        }

        contributions.push({
          type: "project-application", locale, language, lesson: sourceLesson,
          concepts: sorted(metadata.core_concept), contribution: metadata.project_contribution,
          field: "metadata.project_contribution", depthPages,
        });
      }
    }
  }

  const conceptNodes = [...nodes.values()].sort((left, right) => compare(left.id, right.id));
  const conceptEdges = [...edges.values()].sort((left, right) => compare(left.type, right.type) || compare(left.from, right.from) || compare(left.to, right.to));
  for (const edge of conceptEdges) {
    assert.ok(nodes.has(edge.from) && nodes.has(edge.to), `Unresolved ${edge.type} edge: ${edge.from} -> ${edge.to}`);
  }
  const countEdges = (type) => conceptEdges.filter((edge) => edge.type === type);
  return {
    schemaVersion: 1,
    status: "draft-for-confirmation",
    scope: "Bilingual Elixir and Erlang concept dependencies from getBasicPaths; pending human confirmation.",
    source: "app/i18n/catalog.ts#getBasicPaths",
    generator: "scripts/build-concept-review.mjs",
    semantics: {
      nodes: "Merge exact canonical core_concept IDs across locales and languages; retain the first lesson and all core introductions in each context. Cross-language equivalence still requires confirmation.",
      reusedIn: "Evidence records lesson-level reused_in declarations from each core introduction; they do not independently prove that every co-introduced concept is reused.",
      prerequisite: "Each declared prerequisite points to each core concept of that lesson. Repeated concept pairs share one edge with all locale/language evidence retained.",
      contrast: "Only declared related lesson links produce candidate contrast edges, from the source core concepts to the related lesson core concepts. No reverse or inferred links are added; empty related arrays produce no edges.",
      contributions: "One project-application record per localized lesson, with its exact project_contribution and core concepts. No project name is inferred.",
      depthPages: "Preserve declared paths alongside locale-prefixed URLs, including the start-iex installation guide.",
    },
    counts: {
      locales: new Set(paths.map((path) => path.locale)).size,
      languages: new Set(paths.map((path) => path.language)).size,
      paths: paths.length,
      lessons: contributions.length,
      concepts: conceptNodes.length,
      conceptContexts: conceptNodes.reduce((total, node) => total + node.contexts.length, 0),
      prerequisiteEdges: countEdges("prerequisite").length,
      prerequisiteEvidence: countEdges("prerequisite").reduce((total, edge) => total + edge.evidence.length, 0),
      contrastEdges: countEdges("contrast").length,
      contrastEvidence: countEdges("contrast").reduce((total, edge) => total + edge.evidence.length, 0),
      projectApplications: contributions.length,
    },
    paths, nodes: conceptNodes, edges: conceptEdges, contributions,
  };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === "--help") {
    console.log(`${usage}\nGenerate the confirmation draft; --check verifies exact freshness without writing.`);
    return;
  }
  if (args.length > 1 || args.some((arg) => arg !== "--check")) throw new Error(usage);
  const { getBasicPaths } = await loadTypeScript(new URL("../app/i18n/catalog.ts", import.meta.url));
  const { locales } = await loadTypeScript(new URL("../app/i18n/locales.ts", import.meta.url));
  const report = buildConceptReview(locales.map((locale) => ({ locale, paths: getBasicPaths(locale) })));
  const output = `${JSON.stringify(report, null, 2)}\n`;
  if (args.includes("--check")) {
    const current = await readFile(reportUrl, "utf8").catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (current !== output) throw new Error("Concept draft is missing or stale. Run node scripts/build-concept-review.mjs.");
  } else {
    await writeFile(reportUrl, output);
  }
  const counts = report.counts;
  console.log(`${args.includes("--check") ? "Current" : "Generated"}: ${counts.concepts} concepts; ${counts.prerequisiteEdges} prerequisite edges (${counts.prerequisiteEvidence} evidence records); ${counts.contrastEdges} contrast edges; ${counts.projectApplications} project applications across ${counts.paths} paths / ${counts.locales} locales.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await main();
  } catch (error) {
    console.error(`Concept review: ${error.message}`);
    process.exitCode = 1;
  }
}
