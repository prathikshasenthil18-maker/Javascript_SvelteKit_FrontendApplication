  <script>
import {
  normalizeSku,
  pickLastTag,
  sortScoresDesc,
  findLastActive,
  mergeFlags,
} from "$lib/domain/catalog.js";
import { emptyCart, addLine, cartSubtotal } from "$lib/domain/cart.js";
import { stockMap, isInStock, lowStockSkus } from "$lib/domain/inventory.js";
import { applyDiscount, formatMoney, bestPrice } from "$lib/domain/pricing.js";
import { rankProducts } from "$lib/domain/search.js";
import { listPath } from "$lib/api/catalogClient.js";
import { breadcrumbsFor } from "$lib/navigation/breadcrumbs.js";
import { flag } from "$lib/config/featureFlags.js";
import { DEMO_PRODUCTS, DEMO_STOCK } from "$lib/data/demoCatalog.js";
import { APPLICATION, BRANCH, CUSTOMER_VERSION, SYNTAX_LABEL } from "$lib/version.js";

const sku = normalizeSku({ sku: "sk-100" });
const tag = pickLastTag(["alpha", "beta", "ga"]);
const scores = sortScoresDesc([3, 9, 1]);
const active = findLastActive([
  { id: 1, active: false },
  { id: 2, active: true },
  { id: 3, active: false },
]);
const flags = mergeFlags({ dark: false }, { dark: true, dense: true });
let cart = emptyCart();
cart = addLine(cart, { sku: "SK-100", qty: 2, unitPrice: 49 });
cart = addLine(cart, { sku: "SK-400", qty: 1, unitPrice: 18.5 });
const subtotal = cartSubtotal(cart);
const stock = stockMap(DEMO_STOCK);
const lampInStock = isInStock(stock, "SK-100", 1);
const low = lowStockSkus(stock, 5);
const sale = formatMoney(applyDiscount(49, 10));
const cheapest = bestPrice(DEMO_PRODUCTS.map((p) => p.price));
const hits = rankProducts(DEMO_PRODUCTS, "orbit lamp");
const crumbs = breadcrumbsFor("/catalog/sk-100");
const searchEnabled = flag("searchV2");
const apiPath = listPath({ q: "lamp", limit: 10 });

    const hitTitles = hits.map((p) => p.title).join(", ") || "none";
  </script>

  <main>
    <h1>{APPLICATION}</h1>
    <p>Scenario 1 — Monolithic · {BRANCH} · Customer Version {CUSTOMER_VERSION}</p>
    <p>{SYNTAX_LABEL}</p>
    <div class="card">
      <h2>Domain demo</h2>
      <ul>
        <li>SKU: {sku}</li>
        <li>Last tag: {tag}</li>
        <li>Scores: {scores.join(", ")}</li>
        <li>Last active id: {active?.id ?? "none"}</li>
        <li>Flags: {JSON.stringify(flags)}</li>
        <li>Cart subtotal: {subtotal}</li>
        <li>Lamp in stock: {lampInStock}</li>
        <li>Low stock: {low.join(", ") || "none"}</li>
        <li>Sale price: {sale}</li>
        <li>Cheapest: {cheapest}</li>
        <li>Search hits: {hitTitles}</li>
        <li>Breadcrumbs: {crumbs.map((c) => c.label).join(" > ")}</li>
        <li>Search V2: {searchEnabled}</li>
        <li>API path: {apiPath}</li>
      </ul>
    </div>
  </main>
