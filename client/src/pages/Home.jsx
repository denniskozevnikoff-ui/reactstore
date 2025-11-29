import React from "react";
import ProductList from "../components/ProductList";

const Home = ({ addToCart, onSelectProduct }) => {
  return (
    <ProductList 
      addToCart={addToCart} 
      onSelectProduct={onSelectProduct} 
    />
  );
};

export default Home;
