import React from "react";
import { CiHeart } from "react-icons/ci";
import "./style.css";

function Card({ product }) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3" key={product.product_id}>
      <div className="card card-container rounded-5 mb-4 w-75">
        <img
          src={product.image_url}
          className="card-img-top centered-image rounded-5 mx-auto"
          alt={product.name}
        />
        <div className="card-body text-dark">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">${product.price}</p>
          <div className="icon-container">
            <CiHeart color="#7429ba" fontSize="2em" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
