/** Lightweight frontend analytics buffer — Node 18. */
export function createBuffer() {
  return { events: [] };
}

export function track(buffer, name, props) {
  const base = buffer ?? createBuffer();
  return {
    ...base,
    events: [...(base.events ?? []), { name: String(name ?? "event"), props: props ?? {}, at: Date.now() }],
  };
}

export function countByName(buffer) {
  const out = Object.create(null);
  for (const e of buffer?.events ?? []) {
    out[e.name] = (out[e.name] ?? 0) + 1;
  }
  return out;
}
