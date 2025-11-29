// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Inicializar Express
const app = express();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para servir archivos estáticos desde la carpeta "images"
app.use("/images", express.static(path.join(__dirname, "images")));

// Middleware general
app.use(cors());
app.use(express.json());

// Importar rutas
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("React Store Backend Running ");
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

// Rutas de la API
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
