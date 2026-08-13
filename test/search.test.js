import test from "node:test";
import assert from "node:assert/strict";
import { rankProducts, tokenize } from "../src/lib/domain/search.js";

test("search rank", () => {
  assert.deepEqual(tokenize("Orbit Lamp"), ["orbit", "lamp"]);
  const ranked = rankProducts(
    [
      { sku: "SK-100", title: "Aurora Lamp" },
      { sku: "SK-400", title: "Orbit Mug" },
    ],
    "orbit"
  );
  assert.equal(ranked[0].sku, "SK-400");
});
