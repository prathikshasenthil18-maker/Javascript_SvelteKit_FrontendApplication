/** Minimal HTTP helpers for static + future API — Node 24. */
export function buildQuery(params) {
  const parts = [];
  for (const [k, v] of Object.entries(params ?? {})) {
    if (v == null) continue;
    parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  }
  return parts.length ? `?${parts.join("&")}` : "";
}

export function jsonHeaders() {
  return { Accept: "application/json", "Content-Type": "application/json" };
}
