import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, addToCart, onSelectProduct }) => {
  return (
    <div className="product-card">
      <img
  src={product.imageUrl}
  alt={product.name}
  className="product-image"
/>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button
        className="btn-add-cart"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
      {onSelectProduct && (
        <button
          className="btn-view-details"
          onClick={() => onSelectProduct(product)}
        >
          View Details
        </button>
      )}
    </div>
  );
};

export default ProductCard;
