import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product, quantity) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity }];
    });
  }

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <>
      <Header cartItemsCount={cartItemsCount} />
      <main>
        <Outlet context={{ addToCart }} />
      </main>
    </>
  );
}
