import React, { useState } from "react";
import api from "../../http/index.js";
import "./style-card.css";
import { FaPlusCircle } from "react-icons/fa";

function Card({ product }) {
  const [display, setDisplay] = useState("block"); // Estado inicial puede ser "block", "none" o "inline-block"

  const handleAddToCart = () => {
    api.post("carts/items", { productName: product.name, quantity: 1 });
    setDisplay("none"); // Cambia a "none" para ocultar el ícono de más después de hacer clic
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="card card-container rounded-5 mb-4 w-75">
        <img
          src={product.image_url}
          className="card-img-top centered-image rounded-5 mx-auto"
          alt={product.name}
        />
        <div className="card-body text-dark">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">${product.price}</p>
          <div className="d-flex justify-content-center icon-container">
            <FaPlusCircle
              fontSize="1.9em"
              style={{ cursor: "pointer", display: display }}
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
