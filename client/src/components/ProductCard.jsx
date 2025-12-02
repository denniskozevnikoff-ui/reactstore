import React from "react";
import "./ProductCard.css";

const backendBaseUrl = "https://reactstore-backend.onrender.com";

const getImageUrl = (url) => {
  if (!url) return "";

  // Case 1: full localhost URL saved in Mongo
  if (url.startsWith("http://localhost:5000")) {
    return url.replace("http://localhost:5000", backendBaseUrl);
  }

  // Case 2: only path like "/images/pc.jpeg"
  if (url.startsWith("/images/")) {
    return `${backendBaseUrl}${url}`;
  }

  // Anything else, just return as-is
  return url;
};

const ProductCard = ({ product, addToCart, onSelectProduct }) => {
  return (
    <div className="product-card">
      <img
        src={getImageUrl(product.imageUrl)}
        alt={product.name}
        className="product-image"
      />

      <h3>{product.name}</h3>
      <p>${product.price}</p>

      <button className="btn-add-cart" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <button
        className="btn-view-details"
        onClick={() => onSelectProduct(product)}
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
