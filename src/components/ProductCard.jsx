import PropTypes from "prop-types";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />

      <div className="product-content">
        <h2>{product.title}</h2>
        <p className="product-price">${product.price.toFixed(2)}</p>
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
