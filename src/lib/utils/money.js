export function toCents(amount) {
  return Math.round(Number(amount) * 100);
}

export function fromCents(cents) {
  return Math.round(Number(cents)) / 100;
}

export function sumCents(values) {
  return fromCents((values ?? []).reduce((s, v) => s + toCents(v), 0));
}
