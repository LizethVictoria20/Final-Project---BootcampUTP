import { Link } from "react-router-dom";
import "./style-home.css";
import { useState, useEffect } from "react";
import api from "../../http/index";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((response) => {
      const allProducts = response.data;
      setProducts(allProducts)
    });
  }, []);
  return (
    <>
      <div className="hero-banner-container">
        <div>
          <p className="beats-solo">Beats Solo Air</p>
          <h3>Summer Sale</h3>
          <h1>FINE</h1>
          <img
            src="https://cdn.sanity.io/images/vfxfwnaw/production/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp"
            alt="headphones"
            className="hero-banner-image"
          />
          <div>
            <button type="button">Shop Now</button>
          </div>
        </div>
      </div>

      {/* Best seller */}
      <div>
        <div className="products-heading">
          <h2>Best Seller Products</h2>
          <p>speaker There are many variations passages</p>
        </div>

        <div className="products-container">
          {products?.slice(0, 4).map((product) => 
            <>
              <div className="product-card" key={product.product_id}>
                <img 
                src={product.image_url}
                
                className="product-image_home"
                alt={product.name}
                />
                <p className="product-name_header">{product.name}</p>
                <p className="product-price">${product.price}</p>
              </div>
            </>
          )}
         
        </div>
      </div>
    </>
  );
}

export default Home;
