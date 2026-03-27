import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { useReducer } from "react";
import userEvent from "@testing-library/user-event";

import Cart from "./Cart";
import ShopContext from "../contexts/ShopContext.jsx";
import cartReducer from "../reducers/cartReducer.js";

const initialCartItems = [
  {
    id: 1,
    title: "Sample1",
    price: 100,
    image: "https://example.com/img/sample1.png",
    quantity: 2,
  },
  {
    id: 2,
    title: "Sample2",
    price: 10,
    image: "https://example.com/img/sample2.png",
    quantity: 1,
  },
];

function TestShopProvider({ children, initialItems = initialCartItems }) {
  const [cartItems, dispatch] = useReducer(cartReducer, initialItems);

  function increaseCartItemQuantity(productId) {
    dispatch({
      type: "increase_quantity",
      productId,
    });
  }

  function decreaseCartItemQuantity(productId) {
    dispatch({
      type: "decrease_quantity",
      productId,
    });
  }

  function removeFromCart(productId) {
    dispatch({
      type: "remove_item",
      productId,
    });
  }

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        removeFromCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

function renderCart(initialItems) {
  const user = userEvent.setup();

  render(
    <TestShopProvider initialItems={initialItems}>
      <Cart />
    </TestShopProvider>,
  );

  return { user };
}

describe("Cart", () => {
  it("renders cart items and total", () => {
    renderCart();

    expect(screen.getByRole("heading", { name: "Cart" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Sample1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Sample2" }),
    ).toBeInTheDocument();

    const quantityInputs = screen.getAllByRole("textbox", { name: "Quantity" });
    expect(quantityInputs[0]).toHaveValue("2");
    expect(quantityInputs[1]).toHaveValue("1");
    expect(screen.getByText("Total: $210.00")).toBeInTheDocument();
  });

  it("increases item quantity and updates the total", async () => {
    const { user } = renderCart();

    const increaseButtons = screen.getAllByRole("button", {
      name: "Increase quantity",
    });
    await user.click(increaseButtons[0]);

    const quantityInputs = screen.getAllByRole("textbox", { name: "Quantity" });
    expect(quantityInputs[0]).toHaveValue("3");
    expect(screen.getByText("Total: $310.00")).toBeInTheDocument();
  });

  it("decreases item quantity and removes the item at 0", async () => {
    const { user } = renderCart();

    const decreaseButtons = screen.getAllByRole("button", {
      name: "Decrease quantity",
    });

    await user.click(decreaseButtons[1]);

    expect(screen.queryByText("Sample2")).not.toBeInTheDocument();
    expect(screen.getByText("Total: $200.00")).toBeInTheDocument();
  });

  it("removes an item when clicking Remove", async () => {
    const { user } = renderCart();

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    await user.click(removeButtons[0]);

    expect(screen.queryByText("Sample1")).not.toBeInTheDocument();
    expect(screen.getByText("Total: $10.00")).toBeInTheDocument();
  });

  it("renders the empty state when there are no cart items", () => {
    renderCart([]);

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });
});
