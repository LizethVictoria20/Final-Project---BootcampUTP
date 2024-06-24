import { Link } from "react-router-dom";
import Navbar from "../Navbar/index";
import "./style-home.css";
import Home1 from "../../assets/images/home1.png";
import Home2 from "../../assets/images/home2.png";
import Product from "../../assets/images/product.png";
import Product1 from "../../assets/images/product1.png";
import Product2 from "../../assets/images/product2.png";

function Home() {
  return (
    <>
      <Navbar />
      <div className="container-sm container-home rounded-4 mb-4">
        <Link to="catalogo">
          <img src={Home1} alt="" />
        </Link>
      </div>
      <div>
        <h1 className="text-center fw-bold mb-4 text-white">
          Best Seller Products
        </h1>
      </div>
      <div className="container text-center container-best_seller d-flex flex-wrap justify-content-center">
        <div className="row">
          <div className="col col-catalogo">
            <Link to="catalogo">
              <img src={Product} alt="" />
            </Link>
          </div>
          <div className="col col-catalogo">
            <Link to="catalogo">
              <img src={Product1} alt="" />
            </Link>{" "}
          </div>
          <div className="col col-catalogo">
            <Link to="catalogo">
              <img src={Product2} alt="" />
            </Link>
          </div>
          <div className="col col-catalogo">
            <Link to="catalogo">
              <img src={Product} alt="" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container-sm container-home rounded-4 mb-4">
        <Link to="catalogo">
          <img src={Home2} alt="" />
        </Link>
      </div>
    </>
  );
}

export default Home;
