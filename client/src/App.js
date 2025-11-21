import React, { useState } from "react";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProductDetail from "./components/ProductDetail";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [viewCart, setViewCart] = useState(false);
  const [viewCheckout, setViewCheckout] = useState(false);
  const [viewSignUp, setViewSignUp] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.name} added to the cart`);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const goToHome = () => {
    setViewCart(false);
    setViewCheckout(false);
    setViewSignUp(false);
    setViewLogin(false);
    setSelectedProduct(null);
  };

 
  const showSignUp = () => {
    setViewLogin(false);
    setViewSignUp(true);
  };

  
  const showLogin = () => {
    setViewSignUp(false);
    setViewLogin(true);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header style={headerStyle}>
        <h2 style={{ cursor: "pointer" }} onClick={goToHome}>
          Electronic Store
        </h2>

        <div style={{ display: "flex", gap: "10px" }}>
          {!viewSignUp && !viewLogin && !viewCheckout && !selectedProduct && (
            <button
              className="header-button"
              onClick={() => setViewCart(!viewCart)}
            >
              {viewCart ? "Back to Products" : `Cart (${cartItems.length})`}
            </button>
          )}

          {!viewCart && !viewCheckout && !viewLogin && !selectedProduct && (
            <button
              className="header-button"
              onClick={() => setViewSignUp(true)}
            >
              Sign Up
            </button>
          )}

          {!viewCart && !viewCheckout && !viewSignUp && !selectedProduct && (
            <button
              className="header-button"
              onClick={() => setViewLogin(true)}
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main>
        {selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            addToCart={addToCart}
            goBack={() => setSelectedProduct(null)}
          />
        ) : viewLogin ? (
          <Login
            onLogin={(data) => {
              console.log("User logged in:", data);
              setViewLogin(false);
            }}
            onShowSignUp={showSignUp}
          />
        ) : viewSignUp ? (
          <SignUp
            onSignUp={(data) => {
              console.log("User signed up:", data);
              setViewSignUp(false);
            }}
            onShowLogin={showLogin}
          />
        ) : viewCheckout ? (
          <Checkout
            cartItems={cartItems}
            onConfirm={() => {
              setCartItems([]);
              goToHome();
            }}
          />
        ) : viewCart ? (
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            onCheckout={() => setViewCheckout(true)}
          />
        ) : (
          <Home
            addToCart={addToCart}
            onSelectProduct={(product) => setSelectedProduct(product)}
          />
        )}
      </main>
    </div>
  );
}

export default App;

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#eee",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};
