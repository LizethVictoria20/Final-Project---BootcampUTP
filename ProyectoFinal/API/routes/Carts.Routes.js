import express from "express";
import {
  createCart,
  getCartByUserId,
  addCartItem,
  getCartItems,
  updateCartItem,
} from "../controllers/CartController.js";
import { authenticateJWT } from '../middleware/jwtMiddleware.js'

const router = express.Router();

router.post("/",authenticateJWT, createCart); // Listo
router.get("/",authenticateJWT, getCartByUserId); // Listo
router.post("/items",authenticateJWT, addCartItem); // Listo
router.get("/items",authenticateJWT, getCartItems); //Listo
router.put("/items",authenticateJWT, updateCartItem); // Listo

export default router;
