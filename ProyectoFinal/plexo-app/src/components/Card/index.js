import React, { useState } from "react";
import api from "../../http/index.js";
import "./style-card.css";

function Card({ product }) {
  return (
    <div className=" container-general-card">
      <div className="card card-container rounded-5 mb-4 w-85">
        <img
          src={product.image_url}
          className="card-img-top centered-image rounded-5 mx-auto"
          alt={product.name}
        />
        <div className="card-body text-dark">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">${product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
