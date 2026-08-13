/**
 * Shopping cart helpers — Node.js 18 / ES2022.
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
  const items = [...(base.items ?? [])];
  const idx = items.findIndex((x) => x.sku === sku);
  if (idx >= 0) {
    const cur = items.at(idx);
    items[idx] = { ...cur, qty: cur.qty + qty };
  } else {
    items.push({ sku, qty, unitPrice });
  }
  return { ...base, items };
}

export function cartSubtotal(cart) {
  return Math.round(
    (cart?.items ?? []).reduce((s, x) => s + Number(x.qty) * Number(x.unitPrice), 0) * 100
  ) / 100;
}

export function removeLine(cart, sku) {
  const base = cart ?? emptyCart();
  return { ...base, items: (base.items ?? []).filter((x) => x.sku !== sku) };
}
