import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";
import ShopContext from "../contexts/ShopContext.jsx";

const product = {
  id: 1,
  title: "Sample",
  price: 100,
  image: "https://example.com/img/sample.png",
};

function renderProductCard() {
  const addToCart = vi.fn();
  const user = userEvent.setup();

  render(
    <ShopContext.Provider value={{ cartItems: [], addToCart }}>
      <ProductCard product={product} />
    </ShopContext.Provider>,
  );

  return { user, addToCart };
}

describe("ProductCard", () => {
  it("starts with quantity 1", () => {
    renderProductCard();

    expect(screen.getByRole("textbox", { name: "Quantity" })).toHaveValue("1");
  });

  it("updates quantity with the + and - buttons", async () => {
    const { user } = renderProductCard();

    const quantityInput = screen.getByRole("textbox", { name: "Quantity" });

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(quantityInput).toHaveValue("2");

    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(quantityInput).toHaveValue("1");

    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(quantityInput).toHaveValue("1");
  });

  it("calls addToCart with the current quantity", async () => {
    const { user, addToCart } = renderProductCard();

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    await user.click(screen.getByRole("button", { name: "Increase quantity" }));

    await user.click(screen.getByRole("button", { name: "Add To Cart" }));

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product, 3);
  });
});
