import { readFile } from "node:fs/promises";
import ts from "typescript";

const modules = new Map();

async function moduleUrl(url) {
  if (modules.has(url.href)) return modules.get(url.href);
  const loading = (async () => {
    const source = await readFile(url, "utf8");
    let compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
    const imports = [...compiled.matchAll(/from\s+["'](\.[^"']+)["']/g)];
    for (const match of imports) {
      const dependency = new URL(`${match[1]}.ts`, url);
      const imported = await moduleUrl(dependency);
      compiled = compiled.replace(match[0], `from "${imported}"`);
    }
    return `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`;
  })();
  modules.set(url.href, loading);
  return loading;
}

export async function loadTypeScript(url) {
  return import(await moduleUrl(url));
}
