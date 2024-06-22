import { useState, useEffect } from "react";
import Navbar from "../Navbar/index";
import axios from 'axios';
import ModalComponentEdit from "./modalEdit";
import "./stylesheet.css";
import { IoSearchCircle } from "react-icons/io5"; 
import ModalComponentAdd from "./modalAdd";
import { DeleteProduct } from "./AdminCrud";

function Admin() {
  const deleteProduct = DeleteProduct();

  const handleDeleteClick = async (productId) => {
    await deleteProduct(productId);
    // Refresh the product list after deletion
    GetApiData(UrlProducts);
  };

  // get
  const [productsData, setProductsData] = useState([]);
  const UrlProducts = 'https://final-project-bootcamputp.onrender.com/api/products';

  const GetApiData = (url) => {
    axios.get(url).then((response) => {
      setProductsData(response.data);
    });
  };

  useEffect(() => {
    GetApiData(UrlProducts);
  }, []); // Added empty dependency array to run only on mount

  const handleProductUpdated = () => {
    // Refresh the product list after an update
    GetApiData(UrlProducts);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="bg-light p-4 shadow rounded custom-container">
          <div className="d-flex justify-content-space-between align-items-center mb-3" id="d-flex">
            <h1 className="">Productos</h1>
            <div className="d-flex justify-content-between custom1">
              <button>
                <ModalComponentAdd color="red" onProductAdded={handleProductUpdated} />
              </button>
              <div className="input-group">
                <span className="input-group-text bg-primary border-0">
                  <IoSearchCircle size="40px" color="white" />
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
                  <div className="d-grid template-columns-3fr">
                    <h5 className="mb-1">{product.name}</h5>
                    <small>${product.price}</small>
                    <p className="mb-1">{product.description}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <button className="btn btn-outline-primary me-2">
                    <ModalComponentEdit product={product} onProductUpdated={handleProductUpdated} />
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => handleDeleteClick(product.product_id)}>
                    Delete
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
