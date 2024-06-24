import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductoDescripcion() {
  const { product_id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://final-project-bootcamputp.onrender.com/api/products/${product_id}`
      )
      .then((response) => {
        setProducto(response.data);
      })
      .catch((error) => {
        console.error("Error fetching producto:", error);
      });
  }, [product_id]);

  if (!producto) return <div>Loading...</div>;

  return (
    <div className="producto-descripcion">
      <h2>{producto.name}</h2>
      <p>{producto.description}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default ProductoDescripcion;
