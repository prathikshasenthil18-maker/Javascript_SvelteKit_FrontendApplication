/** Catalog pricing — Node 14. */
export function applyDiscount(price, pct = 0) {
  const p = Number(price);
  const d = Number(pct);
  if (!(p >= 0)) throw new Error("price_invalid");
  if (d < 0 || d > 100) throw new Error("discount_invalid");
  return Math.round(p * (1 - d / 100) * 100) / 100;
}

export function taxInclusive(net, rate = 0) {
  return Math.round(Number(net) * (1 + Number(rate)) * 100) / 100;
}

export function bestPrice(prices) {
  const list = prices ?? [];
  if (!list.length) return null;
  return Math.min(...list.map(Number));
}

export function formatMoney(amount, currency = "USD") {
  return `${currency} ${(Math.round(Number(amount) * 100) / 100).toFixed(2)}`;
}
