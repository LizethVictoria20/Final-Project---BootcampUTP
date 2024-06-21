import { useState, useEffect } from "react";
import Navbar from "../Navbar/index";
import axios from 'axios';
import pluscircle from "../../assets/images/plus-circle.png";
import searchcircle from "../../assets/images/search-circle.png";
import pencil from "../../assets/images/pencil.png";
import trash from "../../assets/images/trash.png";
import ModalComponent from './modalAdd';
import "./stylesheet.css";

function Admin() {
  const urlAcess = 'https://final-project-bootcamputp.onrender.com/api/auth/login';
  const UrlPostProducts = 'https://final-project-bootcamputp.onrender.com/api/products';
  const [productsData, setProductsData] = useState([]);
  const UrlProducts = 'https://final-project-bootcamputp.onrender.com/api/products';

  const GetApiData = (url) => {
    axios.get(url).then((response) => {
      setProductsData(response.data);
      console.log(productsData);
    });
  };

  useEffect(() => {
    GetApiData(UrlProducts);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="bg-light p-4 shadow rounded custom-container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1>Productos</h1>
            <div className="d-flex">
              <ModalComponent />
              <div className="input-group">
                <span className="input-group-text bg-primary border-0">
                  <img src={searchcircle} alt="search bar" style={{ width: '24px' }} />
                </span>
                <input type="search" className="form-control" placeholder="Buscar" />
              </div>
            </div>
          </div>
          <div className="list-group">
            {productsData.map(product => (
              <div className="list-group-item d-flex justify-content-between align-items-center mb-2 custom-item" key={product.id}>
                <div className="d-flex align-items-center">
                  <img src={product.image_url} alt="product" className="rounded-circle me-3" style={{ width: '50px', height: '50px' }} />
                  <div>
                    <h5 className="mb-1">{product.name}</h5>
                    <small>${product.price}</small>
                    <p className="mb-1">{product.description}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <button className="btn btn-outline-primary me-2">
                    <img src={pencil} alt="edit" style={{ width: '20px' }} />
                  </button>
                  <button className="btn btn-outline-danger">
                    <img src={trash} alt="delete" style={{ width: '20px' }} />
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
