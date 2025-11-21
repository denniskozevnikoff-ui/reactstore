import React, { useState } from "react";
import "./Checkout.css";

const Checkout = ({ cartItems, onConfirm }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    card: "",
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podríamos conectar a un backend en el futuro
    alert(`Thank you for your purchase, ${form.name}! Total: $${total.toFixed(2)}`);
    onConfirm(); // limpiar carrito o regresar a productos
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        <h2>Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="checkout-item">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Shipping & Payment Info</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="card"
          placeholder="Card Number"
          value={form.card}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-confirm">Confirm Purchase</button>
      </form>
    </div>
  );
};

export default Checkout;
