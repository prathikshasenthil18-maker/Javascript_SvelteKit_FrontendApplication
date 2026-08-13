/** Form / catalog validators — Node 14. */
export function isSku(value) {
  return /^[A-Z0-9][A-Z0-9\-]{1,31}$/.test(String(value ?? ""));
}

export function isEmail(value) {
  const s = String(value ?? "");
  return s.includes("@") && s.indexOf(".") > s.indexOf("@");
}

export function requireFields(obj, fields) {
  const o = obj ?? {};
  return (fields ?? []).filter((f) => o[f] == null || o[f] === "");
}
