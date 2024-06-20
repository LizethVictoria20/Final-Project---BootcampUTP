import z from "zod";
import express from "express";
import Product from "../models/Product.js";
import ProductSchema from "../schemas/ProductShema.js";
import { isAdmin } from "../middleware/authMiddleware.js";
import { authenticateJWT } from "../middleware/jwtMiddleware.js";
import z from 'zod';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", authenticateJWT, isAdmin, async (req, res) => {
  try {
    const productData = ProductSchema.parse(req.body);

    const existingProduct = await Product.findOne({
      where: { name: productData.name },
    });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "El producto con ese nombre ya existe." });
    }

    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Datos de producto inválidos", errors: err.errors });
    } else {
      // Otro tipo de error (por ejemplo, error de base de datos)
      console.error(err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

router.put("/", authenticateJWT, isAdmin, async (req, res) => {
  try {
    const productData = ProductSchema.parse(req.body);
    const updatedProduct = await Product.update(productData, {
      where: { id: req.body.id },
    });
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.errors });
  }
});

router.delete("/", authenticateJWT, isAdmin, async (req, res) => {
  try {
    const id = req.query.id;
    await Product.destroy({ where: { id } });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error deleting product" });
  }
});

export default router;
