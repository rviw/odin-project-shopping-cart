import { createContext } from "react";

const ShopContext = createContext({
  cartItems: [],
  addToCart: () => {},
  increaseCartItemQuantity: () => {},
  decreaseCartItemQuantity: () => {},
  removeFromCart: () => {},
});

export default ShopContext;
