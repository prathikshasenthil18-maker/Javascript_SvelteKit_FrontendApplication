const FLAGS = {
  searchV2: true,
  cartDrawer: true,
  analytics: true,
};

export function flag(name) {
  return Boolean(FLAGS[name]);
}

export function allFlags() {
  return { ...FLAGS };
}
