import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Navbar'; // Asumiendo que tienes un componente Navbar
import './styles.css'; // Asumiendo que tienes un archivo de estilos CSS


// Componente para mostrar la información de un producto
const Product = ({ product, index, increment, decrement }) => (
  <div className="product">
    <div className="product-info">
      <div className="product-image">
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="texto-producto">
        <h3>{product.name}</h3>
        <p>Descripción: {product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Stock: {product.stock}</p>
      </div>
    </div>
    <div className="product-controls">
      <button onClick={() => decrement(index)}>-</button>
      <span>{product.quantity}</span>
      <button onClick={() => increment(index)}>+</button>
    </div>
  </div>
);

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);

  // Función para obtener la lista de productos
  const fetchProducts = async (token) => {
    try {
      const response = await axios.get('https://final-project-bootcamputp.onrender.com/api/products');
      const productsWithQuantity = response.data.map(product => ({ ...product, quantity: 1 }));
      setProducts(productsWithQuantity);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  fetchProducts();

  // Funciones para incrementar y decrementar la cantidad de productos
  const incrementQuantity = (index) => {
    const newProducts = [...products];
    newProducts[index].quantity += 1;
    setProducts(newProducts);
  };

  const decrementQuantity = (index) => {
    const newProducts = [...products];
    if (newProducts[index].quantity > 1) {
      newProducts[index].quantity -= 1;
      setProducts(newProducts);
    }
  };

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    const subtotal = products.reduce((acc, product) => acc + parseFloat(product.price) * product.quantity, 0);
    const tax = subtotal * 0.19;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <>
      <Navbar />
      <div className="cart-container d-flex justify-content-between">
        <div className="products-container">
          {products.map((product, index) => (
            <Product
              key={index}
              product={product}
              index={index}
              increment={incrementQuantity}
              decrement={decrementQuantity}
            />
          ))}
        </div>
        <div className="summary">
          <p>
            Cantidad de productos: {products.reduce((acc, product) => acc + product.quantity, 0)}
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
