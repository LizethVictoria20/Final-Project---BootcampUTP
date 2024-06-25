import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import "./style-product.css";
function ProductoDescripcion() {
  const { product_id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://backendtienda-9e0n.onrender.com/api/products/${product_id}`
      )
      .then((response) => {
        console.log(response.data.product);
        setProducto(response.data.product);
      })
      .catch((error) => {
        console.error("Error fetching producto:", error);
      });
  }, [product_id]);

  if (!producto) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container container-productos">
        <div className="row mb-4">
          <div className="col-md-6 ">
            <img
              src={producto.image_url || ""}
              className="container-img-product"
              alt={producto.name || ""}
            />
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center text-white">
            <h1 className="product-name">
              {producto.name || "Name not available"}
            </h1>
            <h5 className="product-stars">★★★★☆</h5>
            <h6 className="details">Details: </h6>
            <p className="product-description">
              {producto.name}
              {producto.description || "Description not available"}
            </p>
            <h4>${producto.price || "Price not available"}</h4>

            <div className="mt-3 d-flex align-items-center">
              <div className="d-flex align-items-center"></div>
            </div>

            <div className="mt-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductoDescripcion;
