import test from "node:test";
import assert from "node:assert/strict";
import { stockMap, isInStock, lowStockSkus } from "../src/lib/domain/inventory.js";

test("inventory helpers", () => {
  const map = stockMap([
    { sku: "SK-100", qty: 12 },
    { sku: "SK-200", qty: 3 },
  ]);
  assert.equal(isInStock(map, "SK-100", 2), true);
  assert.ok(lowStockSkus(map, 5).includes("SK-200"));
});
