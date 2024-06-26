import React, { useState, useEffect } from "react";
import ModalComponentEdit from "./modalEdit";
import "./stylesheet.css";
import { IoSearchCircle } from "react-icons/io5";
import ModalComponentAdd from "./modalAdd";
import { DeleteProduct, updateProduct } from "./AdminCrud";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../http/index";

function Admin() {
  const deleteProduct = DeleteProduct();

  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const GetApiData = async () => {
    try {
      const response = await api.get("products");
      setProductsData(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      setErrorMessage("Error fetching products: " + error.response.data.message);
    }
  };

  useEffect(() => {
    GetApiData();
  }, []);

  const handleProductUpdated = async () => {
    try {
      await GetApiData();
      setSuccessMessage("Product updated successfully");
    } catch (error) {
      setErrorMessage("Error updating product: " + error.response.data.message);
    }
  };

  const handleDeleteClick = async (productId) => {
    try {
      await deleteProduct(productId);
      await GetApiData();
      setSuccessMessage("Product deleted successfully");
    } catch (error) {
      setErrorMessage("Error deleting product: " + error.response.data.message);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    const filteredResults = productsData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filteredResults);
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await api.post("products", newProduct);
      if (response.status === 201) {
        await GetApiData();
        setSuccessMessage("Product added successfully");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        await GetApiData();
        return setSuccessMessage("Product added successfully");
      }else{
        setErrorMessage("Error adding product: " + error.response.data.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="p-4 shadow rounded containerAll_admin">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
          <h1 className="h1_admin">Productos</h1>
          <div className="d-flex flex-column flex-md-row align-items-center gap-3">
            <ModalComponentAdd color="red" onProductAdded={handleAddProduct} />
            <div className="d-flex align-items-center">
              <IoSearchCircle size="40px" color="white" className="addItem_admin" />
              <input
                type="text"
                className="form-control"
                placeholder="Buscar..."
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="list-group">
          {filteredProducts.map((product) => (
            <div
              className="list-group-item d-flex justify-content-between align-items-center mb-2 custom-item productUp_admin flex-column flex-md-row"
              key={product.product_id}
            >
              <div className="d-flex align-items-center mb-2 mb-md-0">
                <img
                  src={product.image_url}
                  alt="product"
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="d-grid gap-2">
                  <h5 className="mb-1">{product.name}</h5>
                  <small>${product.price}</small>
                  <p className="mb-1">{product.description}</p>
                </div>
              </div>
              <div className="d-flex">
                <ModalComponentEdit product={product} onProductUpdated={handleProductUpdated} errorMessage={errorMessage} />
                <button
                  className="btn btn-outline-danger ms-2"
                  onClick={() => handleDeleteClick(product.product_id)}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
