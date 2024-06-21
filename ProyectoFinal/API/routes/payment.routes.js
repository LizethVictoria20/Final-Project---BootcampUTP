import express from "express";
import dotenv from "dotenv";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import CartItem from "../models/CartItem.js";
import { openStripePaymentLink } from "../controllers/pCv2.js";
dotenv.config();

const paymentRouter = express.Router();
paymentRouter.post("/create-checkout-session", openStripePaymentLink);

paymentRouter.get("/success", async (req, res) => {
  try {
    const { totalPrice, userID } = req.query;
    if (!totalPrice || !userID) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const cart = await Cart.findOne({
      where: {
        user_id: userID,
      },
      raw: true,
    });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "No hay carrito para ese usuario" });
    }

    const cartItems = await CartItem.findAll({
      where: {
        cart_id: cart.cart_id,
      },
      raw: true,
    });

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "El carrito está vacío" });
    }

    const inventory = await Promise.all(
      cartItems.map(async (cartItem) => {
        const product = await Product.findByPk(cartItem.product_id);
        return product;
      })
    );

    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i].quantity < cartItems[i].quantity) {
        return res.status(400).json({ message: "Not enough stock" });
      }
    }

    // Crear la orden
    const order = await Order.create({
      user_id: userID,
      total: totalPrice,
    });

    await Promise.all(
      cartItems.map(async (cartItem, index) => {
        await OrderItem.create({
          order_id: order.order_id,
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
          price: inventory[index].price,
        });
      })
    );
    for (let i = 0; i < inventory.length; i++) {
      await Product.update(
        { quantity: inventory[i].quantity - cartItems[i].quantity },
        {
          where: { product_id: cartItems[i].product_id },
        }
      );
    }

    await CartItem.destroy({
      where: { cart_id: cart.cart_id },
    });

    return res.redirect(
      `https://store-angular-wheat.vercel.app/paymentStatus/${userID}`// Cambiar al hosteo de la API
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating the order" });
  }
});

paymentRouter.get("/cancel", (req, res) => {
  res.status(200).json({ message: "Payment cancelled" }); //debería de devolver al carrito otra vez
});

export default paymentRouter;
