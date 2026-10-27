import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const fontRoot = new URL("public/fonts/lesson-sketch/", root);

test("keeps local handwriting fonts small and retains their licenses", async () => {
  let total = 0;
  for (const [name, hash] of [
    ["excalifont-latin.woff2", "e4423b318e11432aff2e6e865e300b7ca270f92321a3f56632268fede01c1b48"],
    ["comic-shanns-latin.woff2", "fa930fceb529a4b51ba3055d590302722c27704f6a6357495873950136b1e2ea"],
    ["xiaolai-subset.woff2", null],
  ]) {
    const bytes = await readFile(new URL(name, fontRoot));
    assert.equal(bytes.subarray(0, 4).toString(), "wOF2");
    if (hash) assert.equal(createHash("sha256").update(bytes).digest("hex"), hash);
    total += bytes.length;
  }
  assert.ok(total < 300 * 1024, `Font budget exceeded: ${total}`);
  assert.match(await readFile(new URL("OFL.txt", fontRoot), "utf8"), /SIL OPEN FONT LICENSE Version 1.1/);
  assert.match(await readFile(new URL("Comic-Shanns-LICENSE.txt", fontRoot), "utf8"), /Copyright \(c\) 2018 Shannon Miwa/);
});

test("covers Chinese text across the complete bilingual handwritten rollout", async () => {
  const manifest = JSON.parse(await readFile(new URL("coverage.json", fontRoot), "utf8"));
  const characters = new Set(manifest.characters);
  const paths = [
    "app/components/StartIexLesson.tsx", "app/components/MeetIexLesson.tsx",
    "app/components/AnnotatedIexBoard.tsx", "app/components/AnnotatedCodeCanvas.tsx",
    "app/components/LessonNotebook.tsx", "app/components/BasicProgress.tsx",
    "app/basic-path-data.ts", "content/lessons/start-iex.ts", "content/lessons/meet-iex.ts",
    "app/i18n/catalog.ts", "app/notebook-copy.ts",
    ...(await readdir(new URL("app/components/", root))).filter((name) => name.endsWith(".tsx")).map((name) => `app/components/${name}`),
    ...(await readdir(new URL("content/lessons/", root))).filter((name) => name.endsWith(".ts")).map((name) => `content/lessons/${name}`),
  ];
  for (const path of new Set(paths)) {
    const source = await readFile(new URL(path, root), "utf8");
    const missing = [...new Set(source.match(/[\u3000-\u9fff\uf900-\ufaff\uff00-\uffef]/gu) ?? [])].filter(character => !characters.has(character));
    assert.deepEqual(missing, [], `${path}: regenerate the Xiaolai subset`);
  }
});
