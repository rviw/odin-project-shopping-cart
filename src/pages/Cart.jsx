import { useContext } from "react";
import ShopContext from "../contexts/ShopContext.jsx";

function Cart() {
  const { cartItems } = useContext(ShopContext);

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
              <h2>{item.title}</h2>
              <p>Quantity: {item.quantity}</p>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
    </section>
  );
}

export default Cart;
