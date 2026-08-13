/** Inventory levels for catalog SKUs — Node 16. */
export function stockMap(rows) {
  const map = Object.create(null);
  for (const r of rows ?? []) {
    const sku = String(r?.sku ?? "");
    if (!sku) continue;
    map[sku] = Number(r?.qty ?? 0);
  }
  return map;
}

export function isInStock(map, sku, need = 1) {
  return Number(map?.[sku] ?? 0) >= Number(need);
}

export function deplete(map, sku, qty = 1) {
  const next = { ...(map ?? {}) };
  const have = Number(next[sku] ?? 0);
  if (have < qty) throw new Error("insufficient_stock");
  next[sku] = have - qty;
  return next;
}

export function lowStockSkus(map, threshold = 5) {
  return Object.keys(map ?? {})
    .filter((k) => Number(map[k]) <= threshold)
    .sort();
}
