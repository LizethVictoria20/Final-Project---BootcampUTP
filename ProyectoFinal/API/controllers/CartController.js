import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

export const createCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const existingCart = await Cart.findOne({ where: { user_id: userId } });
    if (existingCart) {
      return res.status(200).json(existingCart);
    }

    const newCart = await Cart.create({ user_id: userId });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartByUserId = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({
      where: { user_id: userId },
    });

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found for this user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addCartItem = async (req, res) => {
  try {
    const { cartId, productName, quantity } = req.body;
    console.log(cartId, productName, quantity);
    const cart = await Cart.findByPk(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = await Product.findOne({ where: { name: productName } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    const newItem = await CartItem.create({
      cart_id: cartId,
      product_id: product.product_id,
      quantity,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getCartItems = async (req, res) => {
  try {
    const { cartId } = req.params;
    const items = await CartItem.findAll({
      where: { cart_id: cartId },
      include: [Product],
    });

    const detailedItems = items.map((item) => ({
      cart_item_id: item.cart_item_id,
      product_name: item.Product.name,
      quantity: item.quantity,
    }));

    res.status(200).json(detailedItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { productName, quantity } = req.body;

    const item = await CartItem.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (productName) {
      const product = await Product.findOne({ where: { name: productName } });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (product.stock <= quantity) {
        return res.status(400).json({ message: "Product out of stock" });
      }
      item.product_id = product.product_id;
    }

    item.quantity = quantity !== undefined ? quantity : item.quantity;

    await item.save();
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
