import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

const ProductList = ({ addToCart, onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products") 
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>loading Products...</p>;

  return (
    <div>
      <h1 className="title">React Store</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id} 
            product={product}  
            addToCart={addToCart}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
