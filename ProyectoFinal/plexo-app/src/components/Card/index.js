import React from "react";
import { CiHeart } from "react-icons/ci";

function Card({ product }) {
  return (
    <div className="container text-center mt-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        <div className="col" key={product.product_id}>
          <div className="card card-container rounded-5 mb-4">
            <img
              src={product.image_url}
              className="card-img-top centered-image rounded-5"
              alt={product.name}
            />
            <div className="card-body text-dark">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.price}</p>
              <div className="icon-container">
                <CiHeart color="#7429ba" fontSize="2em" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
