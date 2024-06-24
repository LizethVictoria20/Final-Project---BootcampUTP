import React from "react";
import { CiHeart } from "react-icons/ci";
import "./style-card.css";
import { FaCirclePlus } from "react-icons/fa6";


function Card({ product , guardarProducto}) {
  
  // const [productIds, setProductIds] = useState([]);

  // const guardarProducto = (id) => {
  //   // Actualiza el estado para incluir el nuevo ID
  //   setProductIds((prevProductIds) => [...prevProductIds, id]);
  //   console.log("IDs guardados:", productIds);
  // };

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
          <div className="d-flex justify-content-between icon-container">
          <FaCirclePlus fontSize="1.9em" onClick={() => guardarProducto(product.product_id) } />
            <CiHeart color="#7429ba" fontSize="2em" />
          </div>
        </div>
      </div>
    </div>
  );
  
}
export default Card;
