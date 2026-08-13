/** Catalog search — Node 18. */
export function tokenize(q) {
  return String(q ?? "").toLowerCase().trim().split(/\s+/).filter(Boolean);
}

export function scoreProduct(product, tokens) {
  const hay = `${product?.title ?? ""} ${product?.sku ?? ""}`.toLowerCase();
  return (tokens ?? []).reduce((s, t) => (hay.includes(t) ? s + 1 : s), 0);
}

export function rankProducts(products, query) {
  const tokens = tokenize(query);
  return [...(products ?? [])]
    .map((p) => ({ product: p, score: scoreProduct(p, tokens) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.product);
}
