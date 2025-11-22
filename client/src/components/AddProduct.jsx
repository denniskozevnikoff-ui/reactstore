import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(""); // nombre del archivo en /images
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Generar la URL automática para la imagen
      const imageUrl = imageFile ? `http://localhost:5000/images/${imageFile}` : "";

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, description, price, imageUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product added successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setImageFile("");
        onProductAdded && onProductAdded(data);
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2 className="add-product-title">Add New Product</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Image file name (e.g., xbox.jpeg)"
              value={imageFile}
              onChange={(e) => setImageFile(e.target.value)}
            />
          </div>

          <button type="submit" className="add-product-button" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
