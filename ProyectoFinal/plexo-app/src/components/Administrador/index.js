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
import ModalComponentAdd from "./modalAdd";
import ModalComponentEdit from "./modalEdit";

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
      <div className="container mt-5">
        <div className="  p-4 shadow rounded containerAll_admin">
          <div
            className="d-flex justify-content-around align-items-center mb-3 "
            id="d-flex"
          >
            <h1 className="h1_admin">Productos</h1>
            <div className="d-flex justify-content-between custom1 productsAddSearch_admin">
              <ModalComponentAdd
                color="red"
                onProductAdded={handleProductUpdated}
              />
              <div className="input-group  ">
                {/* <IoSearchCircle size="40px" color="white" className="addItem_admin" /> */}
                <input
                  type="search"
                  className=" searchBar_admin"
                  placeholder="Buscar"
                />
              </div>
            </div>
          </div>
          <div className="list-group">
            {productsData.map((product) => (
              <div
                className="list-group-item d-flex justify-content-between align-items-center mb-2 custom-item .container_item productUp_admin"
                key={product.id}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={product.image_url}
                    alt="product"
                    className="rounded-circle me-3"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="d-grid template-columns-3fr product_admin">
                    <h5 className="mb-1">{product.name}</h5>
                    <small>${product.price}</small>
                    <p className="mb-1">{product.description}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <button className="btn btn-outline me-2">
                    <ModalComponentEdit
                      product={product}
                      onProductUpdated={handleProductUpdated}
                    />
                  </button>
                  <button
                    className="btn btn-outline-danger "
                    onClick={() => handleDeleteClick(product.product_id)}
                  >
                    {/* <FaRegTrashAlt /> */}
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
