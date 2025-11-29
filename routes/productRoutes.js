const express = require("express");
const router = express.Router();
const { auth, adminOnly } = require("../middleware/authMiddleware"); // asegúrate que la carpeta se llama 'middlewares'
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// Rutas públicas
router.get("/", getProducts);
router.get("/:id", getProduct);

// Rutas protegidas solo para admin
router.post("/", auth, adminOnly, createProduct);
router.put("/:id", auth, adminOnly, updateProduct);
router.delete("/:id", auth, adminOnly, deleteProduct);

module.exports = router;
