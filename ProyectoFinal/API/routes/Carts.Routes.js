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
router.get("/:cartId/items",authenticateJWT, getCartItems); //Listo
router.put("/items/:itemId",authenticateJWT, updateCartItem); // LIsto

export default router;
