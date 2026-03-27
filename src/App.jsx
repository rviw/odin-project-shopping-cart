import { useReducer } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import ShopContext from "./contexts/ShopContext.jsx";

function cartReducer(cartItems, action) {
  switch (action.type) {
    case "add_item": {
      const { product, quantity } = action;
      const existingItem = cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        return cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...cartItems, { ...product, quantity }];
    }

    case "increase_quantity":
      return cartItems.map((item) =>
        item.id === action.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

    case "decrease_quantity":
      return cartItems
        .map((item) =>
          item.id === action.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);

    case "remove_item":
      return cartItems.filter((item) => item.id !== action.productId);

    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function App() {
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

export default App;
