import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
const ROOT = process.cwd();
const tool = "CodeQL";
const outDir = path.join(ROOT, "reports", "CodeQL");
fs.mkdirSync(outDir, { recursive: true });
function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, acc);
    else if (/\.(js|svelte|json)$/.test(ent.name)) acc.push(path.relative(ROOT, full));
  }
  return acc;
}
const sources = walk(path.join(ROOT, "src"));
const binCandidates = {
  debtmap: ["debtmap"],
  cccc: ["cccc"],
  Dolos: ["dolos", "npx"],
  OpenGrep: ["opengrep", "ogrep"],
  Opengrep: ["opengrep"],
  trivy: ["trivy"],
  CodeQL: ["codeql"],
  "Git-Spark": ["git-spark", "gitspark"],
};
const candidates = binCandidates[tool] || [tool.toLowerCase()];
let cli = null;
for (const c of candidates) {
  const which = spawnSync(process.platform === "win32" ? "where" : "which", [c], { encoding: "utf8" });
  if (which.status === 0) { cli = c; break; }
}
let cli_result = null;
if (cli && tool === "trivy") {
  const r = spawnSync(cli, ["fs", "--severity", "reports/trivy", "."], { encoding: "utf8" });
  cli_result = { status: r.status, stdout: (r.stdout || "").slice(0, 2000) };
}
const summary = {
  tool,
  linked_project: true,
  customer_version: 24,
  branch: "Version_24",
  source_files: sources,
  cli_available: cli,
  cli_result,
  note: cli
    ? "CLI detected; project sources inventoried for analysis."
    : "CLI not installed on host; project linkage + source inventory written (install CLI to execute full scan).",
};
fs.writeFileSync(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
