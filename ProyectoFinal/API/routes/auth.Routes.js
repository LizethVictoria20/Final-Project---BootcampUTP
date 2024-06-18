import express from "express";
import bcrypt from "bcrypt";
import { sessionChecker } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, first_name, last_name } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El usuario ya está registrado." });
    }

    const newUser = await User.create({
      username,
      email,
      password,
      first_name,
      last_name,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Credenciales inválidas." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    req.session.user = user;
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

router.get("/logout", sessionChecker, async (req, res) => {
  try {
    if (req.session.user) {
      req.session.destroy();
      res.clearCookie("user_sid");
      res.json({ message: "Logout exitoso." });
    } else {
      res.status(401).json({ message: "No hay sesión activa." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

export default router;
