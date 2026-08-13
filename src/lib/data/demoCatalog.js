/** Static demo catalog rows for the SvelteKit UI. */
export const DEMO_PRODUCTS = [
  { sku: "SK-100", title: "Aurora Lamp", price: 49.0, tags: ["home", "light"], active: true },
  { sku: "SK-200", title: "Nimbus Chair", price: 220.0, tags: ["home", "seat"], active: true },
  { sku: "SK-300", title: "Pixel Desk", price: 399.0, tags: ["office"], active: false },
  { sku: "SK-400", title: "Orbit Mug", price: 18.5, tags: ["kitchen", "gift"], active: true },
];

export const DEMO_STOCK = [
  { sku: "SK-100", qty: 12 },
  { sku: "SK-200", qty: 3 },
  { sku: "SK-300", qty: 0 },
  { sku: "SK-400", qty: 40 },
];
