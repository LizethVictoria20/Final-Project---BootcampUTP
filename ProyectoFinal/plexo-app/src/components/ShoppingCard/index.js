import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./styles.css";
import api from "../../http";

// Componente para mostrar la información de un producto
const Product = ({ product, increment, decrement }) => (
  <div className="product">
    <div className="product-info">
      <div className="product-image">
        <img
          src={product.image_url}
          alt={product.name}
          className="img-shopping"
        />
      </div>
      <div className="texto-producto">
        <h3>{product.name}</h3>
        <p>Descripción: {product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Stock: {product.stock}</p>
      </div>
    </div>
    <div className="product-controls">
      <button onClick={() => decrement(product.product_id)}>-</button>
      <span>{product.quantity}</span>
      <button onClick={() => increment(product.product_id)}>+</button>
    </div>
  </div>
);

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Función para obtener el cartId y userId
  const fetchCartId = async () => {
    try {
      const response = await api.get('/carts');
      const cartData = response.data;

      if (cartData && cartData.cart_id) {
        return cartData.cart_id;
      } else {
        throw new Error("Invalid cart data");
      }
    } catch (error) {
      console.error("Error fetching cart ID:", error);
    }
  };

  // Función para obtener la lista de productos usando el cartId
  const fetchCartItems = async () => {
    try {
      const response = await api.get('/carts/items');
      const cartItemsData = response.data;

      const items = cartItemsData.map(item => ({
        ...item.product,
        quantity: item.quantity
      }));
      setProducts(items);

      if (items.length === 0) {
        alert('El carrito está vacío. Redirigiendo a la página de inicio.');
        navigate('/*'); // Redirige a la página de error
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Funciones para incrementar y decrementar la cantidad de productos
  const incrementQuantity = async (productId) => {
    const newProducts = products.map(product => {
      if (product.product_id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setProducts(newProducts);

    try {
      await api.post('/carts/increment', { productId });
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  const decrementQuantity = async (productId) => {
    const newProducts = products.map(product => {
      if (product.product_id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setProducts(newProducts);

    try {
      await api.post('/carts/decrement', { productId });
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    if (!products.length) {
      return { subtotal: 0, tax: 0, total: 0 };
    }

    const subtotal = products.reduce(
      (acc, product) => acc + parseFloat(product.price) * product.quantity,
      0
    );
    const tax = subtotal * 0.19;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotal();

  // useEffect para cargar el carrito del usuario al montar el componente
  useEffect(() => {
    const fetchCartData = async () => {
      const cartId = await fetchCartId();
      if (cartId) {
        await fetchCartItems();
      } else {
        alert('No se pudo obtener el carrito. Redirigiendo a la página de inicio.');
        navigate('/*'); // Redirige a la página de error
      }
    };

    fetchCartData();
  }, []);

  return (
    <>
      <Navbar />
      <button onClick={async () => console.log(await api.get('/carts'))}>carts</button>
      <button onClick={async () => console.log(await api.get('/users'))}>users</button>
      <button onClick={async () => console.log(await api.get('/auth/logout'))}>logout</button>
      <button onClick={async () => console.log(await api.get('/users/loginuser'))}>user.data</button>
      <button onClick={async () => console.log(await api.get('/carts/items'))}>carts.items</button>

      <div className="cart-container d-flex justify-content-between">
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product.product_id}
              product={product}
              increment={incrementQuantity}
              decrement={decrementQuantity}
            />
          ))}
        </div>
        <div className="summary">
          <p>
            Cantidad de productos:{" "}
            {products.reduce((acc, product) => acc + product.quantity, 0)}
          </p>
          <p>Valor: ${subtotal.toFixed(2)}</p>
          <p>Impuesto 19%: ${tax.toFixed(2)}</p>
          <p>Envío: GRATIS</p>
          <p>Total: ${total.toFixed(2)}</p>
          <button className="confirm-button">CONFIRMAR COMPRA</button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
