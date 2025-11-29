import React from "react";
import "./ProductDetail.css";

const ProductDetail = ({ product, addToCart, goBack }) => {
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="product-detail-container">
      <button className="btn-back" onClick={goBack}>
        ← Back
      </button>

      <div className="product-detail-card">
        <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <button className="btn-add" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
