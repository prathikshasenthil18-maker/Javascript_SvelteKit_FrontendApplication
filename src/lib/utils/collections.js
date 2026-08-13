export function unique(list) {
  return [...new Set(list ?? [])];
}

export function groupBy(list, keyFn) {
  const out = Object.create(null);
  for (const item of list ?? []) {
    const key = String(keyFn(item));
    if (!out[key]) out[key] = [];
    out[key].push(item);
  }
  return out;
}

export function chunk(list, size = 10) {
  const arr = list ?? [];
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
