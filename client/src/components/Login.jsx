import React, { useState } from "react";
import "./Login.css"; // CSS separado

const Login = ({ onLogin, onShowSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please login to continue</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-wrapper">
            <span className="input-icon">👤</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <span className="input-icon">🔑</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <span className="login-link" onClick={onShowSignUp}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
