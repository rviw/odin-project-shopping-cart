import { useReducer } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import ShopContext from "./contexts/ShopContext.jsx";
import cartReducer from "./reducers/cartReducer.js";

export default function App() {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  function addToCart(product, quantity) {
    dispatch({
      type: "add_item",
      product,
      quantity,
    });
  }

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
