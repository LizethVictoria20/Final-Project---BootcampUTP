// src/components/Products/Product.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get("https://final-project-bootcamputp.onrender.com/api/products")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching productos:", error);
      });
  }, []);

  return (
    <div className="productos-container">
      <h2>Productos</h2>
      <ul className="productos-list">
        {productos.map((producto) => (
          <li key={producto.product_id} className="producto-item">
            <Link to={`/product/${producto.product_id}`}>{producto.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
