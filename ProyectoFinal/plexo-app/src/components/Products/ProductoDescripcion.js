import React, { useState, useEffect } from "react";
import api from "../../http/index";
import { useParams } from "react-router-dom";
import "./style-product.css";
import { FaPlusCircle } from "react-icons/fa";

function ProductoDescripcion() {
  const { product_id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    api
      .get(`products/${product_id}`)
      .then((response) => {
        console.log(response.data.product);
        setProducto(response.data.product);
      })
      .catch((error) => {
        console.error("Error fetching producto:", error);
      });
  }, [product_id]);

  if (!producto) return <div>Loading...</div>;
  const handleAddToCart = () => {
    api.post("carts/items", { productName: producto.name, quantity: 1 });
  };
  return (
    <>
      <div className="container container-productos">
        <div className="row mb-4 bg-white container-products-description mx-auto">
          <div className="col-md-6 ">
            <img
              src={producto.image_url || ""}
              className="container-img-product"
              alt={producto.name || ""}
            />
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center text-black">
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
            <div className="mt-3">
              <div className="d-flex gap-3">
                <FaPlusCircle
                  fontSize="1.9em"
                  color="black"
                  style={{ cursor: "pointer" }}
                  onClick={handleAddToCart}
                />
                <p className="text-black">Agregar al carrito</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductoDescripcion;
