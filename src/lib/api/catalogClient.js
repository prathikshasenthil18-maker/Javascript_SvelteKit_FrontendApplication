/** Catalog client (static-friendly) — Node 14. */
import { buildQuery } from "./http.js";

export function listPath(params) {
  return `/catalog${buildQuery(params ?? {})}`;
}

export function detailPath(sku) {
  return `/catalog/${encodeURIComponent(String(sku ?? ""))}`;
}

export function normalizeListResponse(payload) {
  const items = Array.isArray(payload?.items) ? payload.items : [];
  return { items, total: Number(payload?.total ?? items.length) };
}
