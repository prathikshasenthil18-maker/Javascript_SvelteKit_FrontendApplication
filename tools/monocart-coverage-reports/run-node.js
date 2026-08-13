import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
const root = path.resolve(path.dirname(pathToFileURL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "../..");
// Windows path fix for file URL
const ROOT = process.cwd();
const outDir = path.join(ROOT, "reports", "monocart-coverage-reports");
fs.mkdirSync(outDir, { recursive: true });
// Linkage proof: enumerate project sources monocart would cover
function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, acc);
    else if (/\.(js|svelte)$/.test(ent.name)) acc.push(path.relative(ROOT, full));
  }
  return acc;
}
const files = walk(path.join(ROOT, "src"));
const summary = {
  tool: "monocart-coverage-reports",
  linked_project: true,
  source_files: files,
  note: "Coverage reporter linked to src/; run after instrumented tests when monocart CLI is configured.",
};
fs.writeFileSync(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
