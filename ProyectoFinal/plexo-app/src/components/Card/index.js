import "./style.css";
import { CiHeart } from "react-icons/ci";
import Navbar from "../Navbar";

function Card({ product }) {
  const productR = product.data;
  return (
    <>
     <Navbar />
      <div className="container text-center mt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
          {productR?.map((data) => (
            <div className="col" key={data.product_id}>
              <div className="card card-container rounded-5 mb-4">
                <img
                  src={data.image_url}
                  className="card-img-top centered-image rounded-5"
                  alt="..."
                />
                <div className="card-body text-dark">
                  <h5 className="card-title">{data.name}</h5>
                  <p className="card-text">{data.price}</p>
                  <div className="icon-container">
                    <CiHeart color="#7429ba" fontSize="2em" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Card;
