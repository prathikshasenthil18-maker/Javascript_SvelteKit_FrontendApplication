/**
 * Domain helpers — Node.js 26 / ES2024+.
 * Uses: Promise.withResolvers, Set union/intersection, toSorted, findLast, Object.hasOwn.
 */

export function normalizeSku(raw) {
  const value = raw?.sku ?? raw?.id ?? "";
  if (!Object.hasOwn(raw ?? {}, "sku") && !Object.hasOwn(raw ?? {}, "id")) {
    throw new Error("sku_or_id_required", { cause: { raw } });
  }
  return String(value).trim().toUpperCase();
}

export function pickLastTag(tags) {
  const list = Array.isArray(tags) ? tags : [];
  return list.at(-1) ?? "untagged";
}

export function sortScoresDesc(scores) {
  return (scores ?? []).toSorted((a, b) => b - a);
}

export function findLastActive(items) {
  return (items ?? []).findLast((item) => item?.active) ?? null;
}

export function intersectTags(a, b) {
  const left = new Set(a ?? []);
  const right = new Set(b ?? []);
  if (typeof left.intersection === "function") {
    return [...left.intersection(right)];
  }
  return [...left].filter((x) => right.has(x));
}

export function deferred() {
  return Promise.withResolvers();
}

export function mergeFlags(base, patch) {
  return { ...(base ?? {}), ...(patch ?? {}) };
}
