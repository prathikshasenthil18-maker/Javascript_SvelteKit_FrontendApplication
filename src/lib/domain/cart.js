/**
 * Shopping cart helpers — Node.js 22 / ES2024+.
 */
export function emptyCart() {
  return { items: [], currency: "USD" };
}

export function addLine(cart, line) {
  const base = cart ?? emptyCart();
  if (!Object.hasOwn(line ?? {}, "sku")) throw new Error("cart_sku_required", { cause: { line } });
  const sku = String(line.sku);
  const qty = Number(line?.qty ?? 1);
  const unitPrice = Number(line?.unitPrice ?? 0);
  if (!(qty > 0)) throw new Error("cart_qty_invalid", { cause: { qty } });
  let items = [...(base.items ?? [])];
  const idx = items.findIndex((x) => x.sku === sku);
  if (idx >= 0) {
    const cur = items.at(idx);
    items = items.with(idx, { ...cur, qty: cur.qty + qty });
  } else {
    items = [...items, { sku, qty, unitPrice }];
  }
  return { ...base, items };
}

export function cartSubtotal(cart) {
  const lines = (cart?.items ?? []).toSorted((a, b) => String(a.sku).localeCompare(String(b.sku)));
  return Math.round(lines.reduce((s, x) => s + Number(x.qty) * Number(x.unitPrice), 0) * 100) / 100;
}

export function removeLine(cart, sku) {
  const base = cart ?? emptyCart();
  return { ...base, items: (base.items ?? []).filter((x) => x.sku !== sku) };
}

export function cartSkuSet(cart) {
  return new Set((cart?.items ?? []).map((x) => x.sku));
}
