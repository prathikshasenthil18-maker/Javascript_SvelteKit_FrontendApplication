/** Catalog pricing — Node 21. */
export function applyDiscount(price, pct = 0) {
  const p = Number(price);
  const d = Number(pct);
  if (!(p >= 0)) throw new Error("price_invalid", { cause: { price } });
  if (d < 0 || d > 100) throw new Error("discount_invalid", { cause: { pct } });
  return Math.round(p * (1 - d / 100) * 100) / 100;
}

export function taxInclusive(net, rate = 0) {
  return Math.round(Number(net) * (1 + Number(rate)) * 100) / 100;
}

export function bestPrice(prices) {
  const list = (prices ?? []).toSorted((a, b) => Number(a) - Number(b));
  return list.at(0) ?? null;
}

export function formatMoney(amount, currency = "USD") {
  return `${currency} ${(Math.round(Number(amount) * 100) / 100).toFixed(2)}`;
}
