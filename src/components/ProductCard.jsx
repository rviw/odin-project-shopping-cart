import { useState } from "react";
import PropTypes from "prop-types";

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  function handleDecrease() {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  }

  function handleIncrease() {
    setQuantity((currentQuantity) => currentQuantity + 1);
  }

  function handleChange(event) {
    const nextQuantity = Number(event.target.value);

    if (Number.isNaN(nextQuantity)) {
      setQuantity(1);
      return;
    }

    setQuantity(Math.max(1, nextQuantity));
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
            type="number"
            min="1"
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

        <button type="button" className="add-to-cart-button">
          Add to cart
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
