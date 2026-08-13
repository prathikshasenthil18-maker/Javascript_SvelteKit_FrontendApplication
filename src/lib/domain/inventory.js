/** Inventory levels for catalog SKUs — Node 22. */
export function stockMap(rows) {
  const map = Object.create(null);
  for (const r of rows ?? []) {
    if (!Object.hasOwn(r ?? {}, "sku")) continue;
    map[String(r.sku)] = Number(r?.qty ?? 0);
  }
  return map;
}

export function isInStock(map, sku, need = 1) {
  return Number(map?.[sku] ?? 0) >= Number(need);
}

export function deplete(map, sku, qty = 1) {
  const next = { ...(map ?? {}) };
  const have = Number(next[sku] ?? 0);
  if (have < qty) throw new Error("insufficient_stock", { cause: { sku, have, qty } });
  next[sku] = have - qty;
  return next;
}

export function lowStockSkus(map, threshold = 5) {
  return Object.keys(map ?? {})
    .filter((k) => Number(map[k]) <= threshold)
    .toSorted();
}

export function findLastLow(map, threshold = 5) {
  const keys = Object.keys(map ?? {}).toSorted();
  return keys.findLast((k) => Number(map[k]) <= threshold) ?? null;
}
