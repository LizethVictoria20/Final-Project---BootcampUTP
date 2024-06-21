import Stripe from "stripe";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import CartItem from "../models/CartItem.js";
import Cart from "../models/Cart.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const openStripePaymentLink = async (req, res) => {
  try {
    const { cart_id } = req.body;
    const url =
      process.env.NODE_ENV === "production"
        ? process.env.PROD_URL
        : process.env.DEV_URL;

    const cartItems = await CartItem.findAll({
      where: {
        cart_id: cart_id,
      },
    });

    const cart = await Cart.findByPk(cart_id);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const userID = cart.user_id;

    const results = await Promise.all(
      cartItems.map(async (cartItem) => {
        const product = await Product.findByPk(cartItem.product_id);
        if (!product) {
          return { success: false, error: "Product not found" };
        }
        return {
          success: true,
          product: product.dataValues,
          quantity: cartItem.quantity,
        };
      })
    );

    const lineItems = results
      .filter((result) => result.success)
      .map((result) => ({
        price_data: {
          product_data: {
            name: result.product.name,
            description: result.product.description,
            images: [result.product.image_url],
          },
          currency: "usd",
          unit_amount: result.product.price * 100,
        },
        quantity: result.quantity,
      }));

    const totalPrice = lineItems.reduce(
      (total, item) => total + item.price_data.unit_amount * item.quantity,
      0
    );

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${url}/api/payment/success/?totalPrice=${
        totalPrice / 100
      }&userID=${userID}`,
      cancel_url: `${url}/api/payment/cancel`,
    });

    return res.json(session);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the payment session" });
  }
};
