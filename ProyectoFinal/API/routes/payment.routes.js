import express from 'express';
import dotenv from 'dotenv';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import CartItem from '../models/CartItem.js';
dotenv.config();

const paymentRouter = express.Router();

// Ruta para el éxito del pago (ruta base /api/payment/success)
paymentRouter.post('/success', async (req, res) => {
  try {
    const { totalPrice, userID} = req.query;
    if(!totalPrice || !userID){
        return res.status(400).json({ message: 'Invalid request' });
    }
    // Obtener los carritos activos del usuario
    const Carts = await Cart.find({
      where: {
        user_id: userID,
      },
      raw: true
    });

    console.log(Carts)

    if (!Carts) {
      return res.status(404).json({ message: 'No hay carrito para ese usuario' });
    }
    const activeCarts = await CartItem.findAll(Cart.cart_id)
      
    console.log(activeCarts)

    // Verificar si hay suficiente inventario para los productos de los carritos activos
    const inventory = await Promise.all(
      activeCarts.map(async (cart) => {
        const product = await Product.findByPk(cart.productID);
        return product;
      })
    );

    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i].quantity < activeCarts[i].quantity) {
        return res.status(400).json({ message: 'Not enough stock' });
      }
    }

    // Crear la orden
    await Order.create({
      user_id: userID,
      total: totalPrice,
    });

    // Actualizar el inventario
    for (let i = 0; i < inventory.length; i++) {
      await Product.update(
        { quantity: inventory[i].quantity - activeCarts[i].quantity },
        {
          where: { productID: activeCarts[i].productID },
        }
      );
    }

    // Actualizar el estado del carrito
    // await Cart.destroy({where: activeCarts.cart_id});
    
    return res.redirect(`https://store-angular-wheat.vercel.app/paymentStatus/${userID}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating the order' });
  }
});

// Ruta para la cancelación del pago (ruta base /api/payment/cancel)
paymentRouter.get('/cancel', (req, res) => {
  res.status(200).json({ message: 'Payment cancelled' });
});

export default paymentRouter;
