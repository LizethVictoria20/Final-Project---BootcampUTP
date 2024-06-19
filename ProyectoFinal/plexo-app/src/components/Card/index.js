import Navbar from "../Navbar/index";
import Product from "../../assets/images/product.jpg";
import './style.css'
import { CiHeart } from "react-icons/ci";


function Card(props) {
  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
          <div className="col">      
            <div className="card rounded-5">
              <img src={Product} className="card-img-top centered-image rounded-5" alt="..." />
              <div className="card-body text-dark">
                <h5 className="card-title">Product name</h5>
                <p className="card-text">$price</p>
                <div className="icon-container">
                  <CiHeart color="#7429ba" fontSize="2em" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;



