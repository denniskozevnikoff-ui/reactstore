// client/src/components/Navbar.jsx
import React from "react";
import "./Navbar.css";

const Navbar = ({ onHome, onCart, onLogin, onSignUp, onLogout, isLoggedIn }) => {
  return (
    <header className="header">
      <div className="logo">ReactStore</div>
      <nav className="nav-buttons">
        <button className="header-button" onClick={onHome}>
          Home
        </button>
        <button className="header-button" onClick={onCart}>
          Cart
        </button>

        {!isLoggedIn && (
          <>
            <button className="header-button" onClick={onLogin}>
              Login
            </button>
            <button className="header-button" onClick={onSignUp}>
              Sign Up
            </button>
          </>
        )}

        {isLoggedIn && (
          <button className="header-button" onClick={onLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
