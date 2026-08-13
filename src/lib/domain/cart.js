/**
 * Shopping cart helpers — Node.js 14.
 */
export function emptyCart() {
  return { items: [], currency: "USD" };
}

export function addLine(cart, line) {
  const base = cart ?? emptyCart();
  const sku = String(line?.sku ?? "");
  const qty = Number(line?.qty ?? 1);
  const unitPrice = Number(line?.unitPrice ?? 0);
  if (!sku) throw new Error("cart_sku_required");
  if (!(qty > 0)) throw new Error("cart_qty_invalid");
  const items = [...(base.items ?? [])];
  const idx = items.findIndex((x) => x.sku === sku);
  if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + qty };
  else items.push({ sku, qty, unitPrice });
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
