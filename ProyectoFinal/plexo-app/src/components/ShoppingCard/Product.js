import React from "react";
import "./ShoppingCart.css";

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

export default Product;
