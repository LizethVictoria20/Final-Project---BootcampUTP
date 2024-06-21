import z from "zod";
import express from "express";
import Product from "../models/Product.js";
import ProductSchema from "../schemas/ProductShema.js";
import { isAdmin } from "../middleware/authMiddleware.js";
import { authenticateJWT } from "../middleware/jwtMiddleware.js";
import Category from "../models/Category.js";
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

router.post("/", async (req, res) => {
  try {
    // Validar los datos del producto con Zod
    const productData = ProductSchema.parse(req.body);

    // Verificar si existe la categoría
    const category = await Category.findByPk(productData.category_id);
    if (!category) {
      return res
        .status(400)
        .json({ message: "La categoría especificada no existe." });
    }

    // Comprobar si el producto ya existe por su nombre
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
      console.error("Error al crear el producto:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

router.put("/", async (req, res) => {
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

router.delete("/", async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }

    const rowsDeleted = await Product.destroy({
      where: { product_id: id },
    });

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
