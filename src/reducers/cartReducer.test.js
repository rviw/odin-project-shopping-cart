import { describe, it, expect } from "vitest";
import cartReducer from "./cartReducer.js";

const product = {
  id: 1,
  title: "Sample",
  price: 100,
  image: "https://example.com/img/sample.png",
};

describe("cartReducer", () => {
  it("adds a new item to the cart", () => {
    const nextState = cartReducer([], {
      type: "add_item",
      product,
      quantity: 2,
    });

    expect(nextState).toEqual([{ ...product, quantity: 2 }]);
  });

  it("increases quantity when adding an existing item", () => {
    const currentState = [{ ...product, quantity: 2 }];

    const nextState = cartReducer(currentState, {
      type: "add_item",
      product,
      quantity: 3,
    });

    expect(nextState).toEqual([{ ...product, quantity: 5 }]);
  });

  it("increases item quantity", () => {
    const currentState = [{ ...product, quantity: 1 }];

    const nextState = cartReducer(currentState, {
      type: "increase_quantity",
      productId: 1,
    });

    expect(nextState).toEqual([{ ...product, quantity: 2 }]);
  });

  it("decreases item quantity", () => {
    const currentState = [{ ...product, quantity: 3 }];

    const nextState = cartReducer(currentState, {
      type: "decrease_quantity",
      productId: 1,
    });

    expect(nextState).toEqual([{ ...product, quantity: 2 }]);
  });

  it("removes an item when quantity becomes 0", () => {
    const currentState = [{ ...product, quantity: 1 }];

    const nextState = cartReducer(currentState, {
      type: "decrease_quantity",
      productId: 1,
    });

    expect(nextState).toEqual([]);
  });

  it("removes an item directly", () => {
    const currentState = [{ ...product, quantity: 3 }];

    const nextState = cartReducer(currentState, {
      type: "remove_item",
      productId: 1,
    });

    expect(nextState).toEqual([]);
  });
});
