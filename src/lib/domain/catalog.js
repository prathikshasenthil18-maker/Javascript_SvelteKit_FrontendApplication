/**
 * Domain helpers — Node.js 20 / ES2023.
 * Uses: findLast, toSorted, Array.prototype.with, Object.hasOwn, .at(), Error.cause.
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

export function replaceFirst(items, next) {
  if (!Array.isArray(items) || items.length === 0) return [next];
  return items.with(0, next);
}

export function mergeFlags(base, patch) {
  return { ...(base ?? {}), ...(patch ?? {}) };
}
