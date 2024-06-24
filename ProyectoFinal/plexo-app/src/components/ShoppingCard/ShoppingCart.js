import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../http";
import Navbar from "../Navbar";
import Product from "./Product";
import "./ShoppingCart.css";
import {
  fetchCartId,
  fetchCartItems,
  incrementQuantity,
  decrementQuantity,
  calculateTotal
} from "./api";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const { subtotal, tax, total } = calculateTotal(products);

  useEffect(() => {
    const fetchCartData = async () => {
      const cartId = await fetchCartId();
      if (cartId) {
        await fetchCartItems(setProducts, navigate);
      } else {
        alert('No se pudo obtener el carrito. Redirigiendo a la página de inicio.');
        navigate('/*'); // Redirige a la página de error
      }
    };

    fetchCartData();
  }, [navigate]);

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
              increment={() => incrementQuantity(product.product_id, products, setProducts)}
              decrement={() => decrementQuantity(product.product_id, products, setProducts)}
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
            <button className="confirm-button">
              <span className="span1"></span>
              <span className="span2"></span>
              <span className="span3"></span>
              <span className="span4"></span>
              CONFIRMAR COMPRA
            </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
