import test from "node:test";
import assert from "node:assert/strict";
import { emptyCart, addLine, cartSubtotal, removeLine } from "../src/lib/domain/cart.js";

test("cart add + subtotal + remove", () => {
  let cart = emptyCart();
  cart = addLine(cart, { sku: "SK-100", qty: 2, unitPrice: 10 });
  cart = addLine(cart, { sku: "SK-100", qty: 1, unitPrice: 10 });
  assert.equal(cartSubtotal(cart), 30);
  cart = removeLine(cart, "SK-100");
  assert.equal(cart.items.length, 0);
});
