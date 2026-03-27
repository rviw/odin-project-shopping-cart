import { useContext } from "react";
import ShopContext from "../contexts/ShopContext.jsx";

function Cart() {
  const {
    cartItems,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeFromCart,
  } = useContext(ShopContext);

  if (cartItems.length === 0) {
    return (
      <section>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <section>
      <h1>Cart</h1>

      <div className="cart-list">
        {cartItems.map((item) => (
          <article key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
            />

            <div className="cart-item-content">
              <div className="cart-item-header">
                <div className="cart-item-info">
                  <h2>{item.title}</h2>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>

              <div className="quantity-controls cart-item-quantity-controls">
                <button
                  type="button"
                  onClick={() => decreaseCartItemQuantity(item.id)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>

                <input type="text" value={item.quantity} readOnly aria-label="Quantity" />

                <button
                  type="button"
                  onClick={() => increaseCartItemQuantity(item.id)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
    </section>
  );
}

export default Cart;
