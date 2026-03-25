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

export default ProductCard;
