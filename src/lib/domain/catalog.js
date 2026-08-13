/**
 * Domain helpers — Node.js 18 / ES2022 only.
 * Allowed: Object.hasOwn, .at(), Error.cause, ?., ??.
 * Forbidden: toSorted, findLast, Array.prototype.with, Set.intersection, Promise.withResolvers.
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
  return [...(scores ?? [])].sort((a, b) => b - a);
}

export function findLastActive(items) {
  const list = Array.isArray(items) ? items : [];
  for (let i = list.length - 1; i >= 0; i -= 1) {
    if (list[i]?.active) return list[i];
  }
  return null;
}

export function mergeFlags(base, patch) {
  return { ...(base ?? {}), ...(patch ?? {}) };
}
