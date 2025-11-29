import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registro de usuario
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validación de usuario existente
    const existingUser = await User.findOne({ email });
    if (existingUser) 
      return res.status(400).json({ message: "Email already used" });

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario (role por defecto "customer")
    const user = await User.create({ 
      username, 
      email, 
      password: hashedPassword, 
      role: role || "customer" 
    });

    res.json({ message: "User registered", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    // Comparar contraseña
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    // Generar token JWT incluyendo el role
    const token = jwt.sign(
      { id: user._id, role: user.role }, // role incluido
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ 
      message: "Login successful", 
      token, 
      user: { id: user._id, username: user.username, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
