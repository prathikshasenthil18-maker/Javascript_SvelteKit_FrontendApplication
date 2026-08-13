export function slugify(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function padSku(sku, width = 8) {
  return String(sku ?? "").padStart(width, "0");
}
