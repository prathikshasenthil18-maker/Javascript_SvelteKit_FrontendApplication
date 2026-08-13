<script>
  import {
    normalizeSku,
    pickLastTag,
    sortScoresDesc,
    findLastActive,
    mergeFlags,
  } from "$lib/domain/catalog.js";
  import { APPLICATION, BRANCH, CUSTOMER_VERSION, SYNTAX_LABEL } from "$lib/version.js";

  const sku = normalizeSku({ sku: "sk-100" });
  const tag = pickLastTag(["alpha", "beta", "ga"]);
  const scores = sortScoresDesc([3, 9, 1]);
  const active = findLastActive([
    { id: 1, active: false },
    { id: 2, active: true },
    { id: 3, active: false },
  ]);
  const flags = mergeFlags({ dark: false }, { dark: true, dense: true });
</script>

<main>
  <h1>{APPLICATION}</h1>
  <p>Scenario 1 — Monolithic · {BRANCH} · Customer Version {CUSTOMER_VERSION}</p>
  <p>{SYNTAX_LABEL}</p>
  <div class="card">
    <h2>Domain demo</h2>
    <ul>
      <li>SKU: {sku}</li>
      <li>Last tag: {tag}</li>
      <li>Scores: {scores.join(", ")}</li>
      <li>Last active id: {active?.id ?? "none"}</li>
      <li>Flags: {JSON.stringify(flags)}</li>
    </ul>
  </div>
</main>
