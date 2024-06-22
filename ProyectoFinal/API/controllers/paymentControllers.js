import Stripe from 'stripe';
import dotenv from 'dotenv';
import Product from '../models/Product.js'; // Asegúrate de que las importaciones se alineen con tu estructura de modelos

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Utiliza la clave secreta de Stripe desde las variables de entorno

// Controlador para abrir el enlace de pago de Stripe
const openStripePaymentLink = async (carts, totalPrice, userID) => {
  const url = process.env.NODE_ENV === 'production' ? process.env.PROD_URL : process.env.DEV_URL;

  const products = [];

  // Obtener los productos de los ítems del carrito
  for (const cart of carts) {
    const product = await Product.findByPk(cart.productID);
    console.log(product)
    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    products.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.productName,
          description: product.description,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: cart.quantity,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products,
      mode: 'payment',
      success_url: `${url}/api/payment/success?userID=${userID}&totalPrice=${totalPrice}`,
      cancel_url: `${url}/api/payment/cancel`,
    });

    if (!session) {
      return { success: false, error: 'Error creating the payment link' };
    }

    return { success: true, url: session.url };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Error creating the payment link' };
  }
};

export { openStripePaymentLink };
