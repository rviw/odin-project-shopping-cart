import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import ShopContext from "./contexts/ShopContext.jsx";

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

  return (
    <ShopContext.Provider value={{ cartItems, addToCart }}>
      <Header />
      <main>
        <Outlet />
      </main>
    </ShopContext.Provider>
  );
}
