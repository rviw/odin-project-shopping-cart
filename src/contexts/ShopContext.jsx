import { createContext } from "react";

const ShopContext = createContext({
  cartItems: [],
  addToCart: () => {},
});

export default ShopContext;
