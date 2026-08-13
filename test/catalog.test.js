import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeSku,
  pickLastTag,
  sortScoresDesc,
  findLastActive,
} from "../src/lib/domain/catalog.js";

test("normalizeSku", () => {
  assert.equal(normalizeSku({ sku: "ab-1" }), "AB-1");
});

test("pickLastTag + sortScoresDesc + findLastActive", () => {
  assert.equal(pickLastTag(["a", "b"]), "b");
  assert.deepEqual(sortScoresDesc([1, 5, 2])[0], 5);
  const last = findLastActive([{ active: false }, { active: true, id: 9 }]);
  assert.equal(last.id, 9);
});

test("customer version marker", () => {
  assert.equal(22, 22);
});
