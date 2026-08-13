/** Display formatters — Node 16. */
export function titleCase(s) {
  return String(s ?? "").replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

export function truncate(s, max = 40) {
  const str = String(s ?? "");
  if (str.length <= max) return str;
  return `${str.slice(0, Math.max(0, max - 1))}…`;
}

export function joinLabels(labels) {
  return (labels ?? []).join(" · ");
}
