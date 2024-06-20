import express from 'express';
import { createOrder, getOrder, updateOrder, addOrderItem, getOrderItems, updateOrderItem } from '../controllers/orderController.js';

const router = express.Router();

// Rutas para las órdenes
router.post('/', createOrder);
router.get('/', getOrder);
router.put('/:orderId', updateOrder);

// Rutas para los elementos de las órdenes
router.post('/:orderId/items', addOrderItem);//no funciona porque no se como pensar en la logica
router.get('/:orderId/items', getOrderItems);
router.put('/:orderId/items/:itemId', updateOrderItem);//no funciona porque no se como pensar en la logica

export default router;