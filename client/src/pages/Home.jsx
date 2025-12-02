import React from "react";
import ProductList from "../components/ProductList";

const Home = ({ addToCart, onSelectProduct }) => {
  return (
    <div>
      <p className="ci-note" style={{ 
        textAlign: "center",
        marginTop: "10px",
        color: "#0077ff",
        fontWeight: "bold"
      }}>
      

      <ProductList 
        addToCart={addToCart}
        onSelectProduct={onSelectProduct}
      />
    </div>
  );
};

export default Home;
