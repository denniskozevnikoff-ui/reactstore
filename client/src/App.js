import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProductDetail from "./components/ProductDetail";
import AddProduct from "./components/AddProduct";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [viewCart, setViewCart] = useState(false);
  const [viewCheckout, setViewCheckout] = useState(false);
  const [viewSignUp, setViewSignUp] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewAddProduct, setViewAddProduct] = useState(false);

 
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const addToCart = (product) => {
  setCartItems((prev) => {
    const exist = prev.find((item) => item._id === product._id); 
    if (exist) {
      return prev.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prev, { ...product, quantity: 1 }];
    }
  });
  alert(`${product.name} added to the cart`);
};


  const removeFromCart = (id) => {
  setCartItems((prev) => prev.filter((item) => item._id !== id));
};


  const goToHome = () => {
    setViewCart(false);
    setViewCheckout(false);
    setViewSignUp(false);
    setViewLogin(false);
    setViewAddProduct(false);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    goToHome();
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header style={headerStyle}>
        <h2 style={{ cursor: "pointer" }} onClick={goToHome}>
          Electronic Store
        </h2>

        <div style={{ display: "flex", gap: "10px" }}>
          {!selectedProduct && !viewCheckout && !viewAddProduct && (
            <>
              <button
                className="header-button"
                onClick={() => setViewCart(!viewCart)}
              >
                {viewCart ? "Back to Products" : `Cart (${cartItems.length})`}
              </button>

              {!user ? (
                <>
                  <button className="header-button" onClick={() => setViewSignUp(true)}>
                    Sign Up
                  </button>
                  <button className="header-button" onClick={() => setViewLogin(true)}>
                    Login
                  </button>
                </>
              ) : (
                <>
                  <span style={{ alignSelf: "center" }}>Hello, User!</span>
                  <button className="header-button" onClick={handleLogout}>
                    Logout
                  </button>

                  {/* Solo si es admin, mostramos Add Product */}
                  <button className="header-button" onClick={() => setViewAddProduct(true)}>
                    Add Product
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </header>

      {/* Main */}
      <main>
        {viewAddProduct ? (
          <AddProduct
            onProductAdded={(p) => {
              alert("Product added!");
              setViewAddProduct(false);
            }}
          />
        ) : selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            addToCart={addToCart}
            goBack={() => setSelectedProduct(null)}
          />
        ) : viewLogin ? (
          <Login
            onLogin={(data) => {
              setUser({ token: data.token });
              setViewLogin(false);
              goToHome();
            }}
            onShowSignUp={showSignUp}
          />
        ) : viewSignUp ? (
          <SignUp
            onSignUp={(data) => {
              alert("Sign up successful! Please login.");
              setViewSignUp(false);
              setViewLogin(true); 
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
