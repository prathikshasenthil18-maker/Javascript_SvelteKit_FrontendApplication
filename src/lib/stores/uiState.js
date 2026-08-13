/** Simple UI state module (no Svelte store runtime required) — Node 18. */
let state = { drawerOpen: false, theme: "dark", query: "" };

export function getUiState() {
  return { ...state };
}

export function setUiState(patch) {
  state = { ...state, ...(patch ?? {}) };
  return getUiState();
}

export function toggleDrawer() {
  return setUiState({ drawerOpen: !state.drawerOpen });
}
