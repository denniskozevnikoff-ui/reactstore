import React from "react";
import ProductCard from "./ProductCard";
import products from "../data/products";
import "./ProductList.css";

const ProductList = ({ addToCart, onSelectProduct }) => {
  return (
    <div>
      <h1 className="title">React Store</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
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
