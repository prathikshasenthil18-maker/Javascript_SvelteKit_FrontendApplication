import test from "node:test";
import assert from "node:assert/strict";
import { applyDiscount, bestPrice, formatMoney } from "../src/lib/domain/pricing.js";

test("pricing helpers", () => {
  assert.equal(applyDiscount(100, 10), 90);
  assert.equal(bestPrice([9, 3, 7]), 3);
  assert.equal(formatMoney(12.5, "USD"), "USD 12.50");
});
