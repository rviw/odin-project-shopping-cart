export default function cartReducer(cartItems, action) {
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
