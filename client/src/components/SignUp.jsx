import React, { useState } from "react";
import "./SignUp.css";

const SignUp = ({ onSignUp, onShowLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp({ name, email, password });
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Fill in your details to sign up</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-wrapper">
            <span className="input-icon">🧑</span>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <button type="submit" className="signup-button">Sign Up</button>
        </form>

       <p className="signup-footer">
  Already have an account?{" "}
  <span className="signup-link" onClick={onShowLogin}>
    Login
  </span>
</p>

      </div>
    </div>
  );
};

export default SignUp;
