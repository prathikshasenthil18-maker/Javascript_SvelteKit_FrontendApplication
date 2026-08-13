/**
 * Domain helpers — Node.js 12 / ES2019 only.
 * Forbidden: ?., ??, Object.hasOwn, .at(), toSorted, findLast, Error.cause.
 */

export function normalizeSku(raw) {
  raw = raw || {};
  var value = raw.sku != null ? raw.sku : raw.id;
  if (value == null || value === "") {
    throw new Error("sku_or_id_required");
  }
  return String(value).trim().toUpperCase();
}

export function pickLastTag(tags) {
  var list = Array.isArray(tags) ? tags : [];
  if (list.length === 0) return "untagged";
  return list[list.length - 1];
}

export function sortScoresDesc(scores) {
  return (scores || []).slice().sort(function (a, b) { return b - a; });
}

export function findLastActive(items) {
  var list = Array.isArray(items) ? items : [];
  for (var i = list.length - 1; i >= 0; i -= 1) {
    if (list[i] && list[i].active) return list[i];
  }
  return null;
}

export function mergeFlags(base, patch) {
  return Object.assign({}, base || {}, patch || {});
}
