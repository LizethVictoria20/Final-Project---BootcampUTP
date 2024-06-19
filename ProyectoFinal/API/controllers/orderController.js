import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";

// Crear una nueva orden
export const createOrder = async (req, res) => {
  try {
    const userId = await req.user.userId;
    const total = req.body.total;
    const newOrder = await Order.create({ user_id: userId, total });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una orden por ID
export const getOrder = async (req, res) => {
  try {
    const userId = await req.user.userId;
    const orders = await Order.findAll({
      where: { user_id: userId },
    });
    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "No orders found for this user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una orden
export const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findByPk(orderId);
        
        if (order) {
            if (order.status === "pending") {
                order.status = "success";
            } else if (order.status === "success") {
                order.status = "pending";
            }
            await order.save();
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: "Orden no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Agregar un elemento a una orden
export const addOrderItem = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { productId, quantity, price } = req.body;
    const newItem = await OrderItem.create({
      order_id: orderId,
      product_id: productId,
      quantity,
      price,
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener elementos de una orden
export const getOrderItems = async (req, res) => {
  try {
    const { orderId } = req.params;
    const items = await OrderItem.findAll({
      where: { order_id: orderId },
      include: [Product],
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un elemento de una orden
export const updateOrderItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity, price } = req.body;
    const item = await OrderItem.findByPk(itemId);
    if (item) {
      item.quantity = quantity !== undefined ? quantity : item.quantity;
      item.price = price !== undefined ? price : item.price;
      await item.save();
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Order item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
