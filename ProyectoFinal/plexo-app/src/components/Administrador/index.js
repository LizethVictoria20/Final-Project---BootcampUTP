import { useState, useEffect } from "react";
import Navbar from "../Navbar/index";
import axios from "axios";
import { AddProduct, login } from "./addProduct";
import pluscircle from "../../assets/images/plus-circle.png";
import searchcircle from "../../assets/images/search-circle.png";
import pencil from "../../assets/images/pencil.png";
import trash from "../../assets/images/trash.png";
import { Add, Login } from "./addProduct";
import "./stylesheet.css";
import ModalComponent from "./modalAdd";
import api from "../../http";

function Admin() {
  const urlAcess = "auth/login";
  const UrlPostProducts = "products";
  const [productsData, setProductsData] = useState();
  const UrlProducts = "products";

  const GetApiData = async (url) => {
    try {
      const response = await api.get(url);
      console.log(response);
      setProductsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!productsData) {
      console.log("Loadding");
      GetApiData(UrlProducts);
    }
  }, [productsData]);

  return (
    <>
      <Navbar />
        <div className="container_admin">
          <div className="containerElements_admin">
            <div className="productsAddSearch_admin">
              <h1 className="h1_admin">Products</h1>
              <ModalComponent />
              <div className="searchBar_admin">
                <img
                  src={searchcircle}
                  alt="search bar"
                  className="searchImg_admin"
                />
                <input className="Bar_admin" type="search" />
              </div>
            </div>
            <div className="containerProducts_admin">
            hhh
              {productsData && productsData?.map((product) => (
                <div className="product_admin" key={product.product_id}>
                  <img
                    className="img-product_admin"
                    src={product.image_url}
                    alt="img-product"
                  />
                  <h4 className="h4_admin">{product.name}</h4>
                  <h4 className="h4_admin">${product.price}</h4>
                  <h4 className="h4_admin">{product.stock}/u </h4>
                  <div className="buttons_admin">
                    <button className="addItem_admin">
                      <img src={pencil} alt="edit" />
                    </button>
                    <button className="addItem_admin">
                      <img src={trash} alt="trash" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </>
  );
}

export default Admin;
