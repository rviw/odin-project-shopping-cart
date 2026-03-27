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

  function increaseCartItemQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decreaseCartItemQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        removeFromCart,
      }}
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </ShopContext.Provider>
  );
}
