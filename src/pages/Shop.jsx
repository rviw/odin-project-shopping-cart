import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

function Shop() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load products.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(new Error("Failed to load products."));
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      abortController.abort();
    };
  }, []);

  if (loading) {
    return (
      <section>
        <h1>Shop</h1>
        <p role="status">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1>Shop</h1>
        <p role="alert">{error.message}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Shop</h1>
      <p>Products loaded: {products.length}</p>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Shop;
