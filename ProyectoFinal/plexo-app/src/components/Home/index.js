import { Link } from "react-router-dom";
import "./style-home.css";
import Home1 from "../../assets/images/home1.png";
import Home2 from "../../assets/images/home2.png";
import Product from "../../assets/images/product.png";
import Product1 from "../../assets/images/product1.png";
import Product2 from "../../assets/images/product2.png";

function Home() {
  return (
    <>
      <div className="container-sm container-home1 rounded-4 mb-4">
        <Link to="/catalogoPlexo">
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
            <Link to="https://plexoshop.vercel.app/product/195">
              <img src={Product} alt="" />
            </Link>
          </div>
          <div className="col col-catalogo">
            <Link to="https://plexoshop.vercel.app/product/196">
              <img src={Product1} alt="" />
            </Link>{" "}
          </div>
          <div className="col col-catalogo">
            <Link to="https://plexoshop.vercel.app/product/194">
              <img src={Product2} alt="" />
            </Link>
          </div>
          <div className="col col-catalogo">
            <Link to="https://plexoshop.vercel.app/product/195">
              <img src={Product} alt="" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container-sm container-home rounded-4 mb-4">
        <Link to="/catalogoPlexo">
          <img src={Home2} alt="" />
        </Link>
      </div>
    </>
  );
}

export default Home;
