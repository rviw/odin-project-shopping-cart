import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import Header from "./Header";
import ShopContext from "../contexts/ShopContext.jsx";

function renderHeader(cartItems = []) {
  render(
    <MemoryRouter>
      <ShopContext.Provider
        value={{
          cartItems,
        }}
      >
        <Header />
      </ShopContext.Provider>
    </MemoryRouter>,
  );
}

describe("Header", () => {
  it("renders the cart item count from context", () => {
    renderHeader([
      { id: 1, quantity: 1 },
      { id: 2, quantity: 2 },
    ]);

    expect(screen.getByRole("link", { name: "Cart (3)" })).toBeInTheDocument();
  });

  it("renders 0 when the cart is empty", () => {
    renderHeader([]);

    expect(screen.getByRole("link", { name: "Cart (0)" })).toBeInTheDocument();
  });
});
