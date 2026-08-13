/** Frontend session helpers — Node 14. */
export function createSession(userId) {
  return {
    id: `sess_${userId ?? "anon"}_${Date.now()}`,
    userId: userId ?? null,
    createdAt: Date.now(),
    prefs: {},
  };
}

export function setPref(session, key, value) {
  const base = session ?? createSession(null);
  if (!key) throw new Error("pref_key_required");
  return { ...base, prefs: { ...(base.prefs ?? {}), [key]: value } };
}

export function getPref(session, key, fallback) {
  if (Object.prototype.hasOwnProperty.call(session?.prefs ?? {}, key)) return session.prefs[key];
  return fallback;
}
