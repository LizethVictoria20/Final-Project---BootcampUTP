import React, { useState, useEffect } from "react";
import "./styles.css";

const Product = ({ product, index, increment, decrement }) => (
  <div className="product">
    <div className="product-info">
      <div className="product-image"></div>
      <div>
        <h3>{product.name}</h3>
        <p>Información del producto: {product.info}</p>
        <p>Talla: {product.size}</p>
        <p>Color: {product.color}</p>
      </div>
    </div>
    <div className="product-controls">
      <button onClick={() => decrement(index)}>-</button>
      <span>{product.quantity}</span>
      <button onClick={() => increment(index)}>+</button>
    </div>
    <p className="product-price">Valor: ${product.price}</p>
  </div>
);

const ShoppingCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const initialProducts = [
        {
          name: "NOMBRE DEL PRODUCTO 1",
          info: "Información del producto 1",
          size: "S",
          color: "Negro",
          price: 5000,
          quantity: 1,
          image: "",
        },
        {
          name: "NOMBRE DEL PRODUCTO 2",
          info: "Información del producto 2",
          size: "M",
          color: "Azul",
          price: 7000,
          quantity: 1,
          image: "",
        },
        {
          name: "NOMBRE DEL PRODUCTO 3",
          info: "Información del producto 3",
          size: "L",
          color: "Rojo",
          price: 6000,
          quantity: 1,
          image: "",
        },
      ];
      setProducts(initialProducts);
    }, 2000);
  }, []);

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

  const calculateTotal = () => {
    const subtotal = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    const tax = subtotal * 0.19;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <div className="cart-container">
      {products.length === 0 ? (
        <p>Cargando productos...</p>
      ) : (
        <>
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
              Cantidad de productos:{" "}
              {products.reduce((acc, product) => acc + product.quantity, 0)}
            </p>
            <p>Valor: ${subtotal}</p>
            <p>Impuesto 19%: ${tax.toFixed(2)}</p>
            <p>Envío: GRATIS</p>
            <p>Total: ${total.toFixed(2)}</p>
            <button className="confirm-button">CONFIRMAR COMPRA</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCard;
