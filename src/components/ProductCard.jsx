import { useContext, useState } from "react";
import ShopContext from "../contexts/ShopContext.jsx";
import PropTypes from "prop-types";

function ProductCard({ product }) {
  const { addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState("1");

  function handleDecrease() {
    setQuantity((currentQuantity) =>
      String(Math.max(1, (Number.parseInt(currentQuantity, 10) || 1) - 1)),
    );
  }

  function handleIncrease() {
    setQuantity((currentQuantity) =>
      String((Number.parseInt(currentQuantity, 10) || 1) + 1),
    );
  }

  function handleChange(event) {
    const { value } = event.target;

    if (value === "" || /^[1-9]\d*$/.test(value)) {
      setQuantity(value);
    }
  }

  function handleAddToCart() {
    const nextQuantity = Number.parseInt(quantity, 10) || 1;

    addToCart(product, nextQuantity);
  }

  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />

      <div className="product-content">
        <h2>{product.title}</h2>
        <p className="product-price">${product.price.toFixed(2)}</p>

        <div className="quantity-controls">
          <button
            type="button"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
          >
            -
          </button>

          <input
            type="text"
            inputMode="numeric"
            value={quantity}
            onChange={handleChange}
            aria-label="Quantity"
          />

          <button
            type="button"
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="add-to-cart-button"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
