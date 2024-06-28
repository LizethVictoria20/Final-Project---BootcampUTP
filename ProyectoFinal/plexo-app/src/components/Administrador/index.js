import React, { useState, useEffect } from "react";
import ModalComponentEdit from "./modalEdit";
import "./stylesheet.css";
import { IoSearchCircle } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import ModalComponentAdd from "./modalAdd";
import { DeleteProduct } from "./AdminCrud";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../http/index";

function Admin() {
  const deleteProduct = DeleteProduct();

  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showProducts, setShowProducts] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const GetApiData = async () => {
    try {
      const response = await api.get(showProducts ? "products" : "users");
      const data = response.data;
      if (!showProducts) {
        // Filtra usuarios que no son admin
        const nonAdminUsers = data.filter((user) => !user.admin);
        setProductsData(nonAdminUsers);
        setFilteredProducts(nonAdminUsers);
      } else {
        setProductsData(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      setErrorMessage(
        "Error fetching data: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  useEffect(() => {
    GetApiData();
  }, [showProducts]);

  const handleProductUpdated = async () => {
    try {
      await GetApiData();
      setSuccessMessage("Product updated successfully");
    } catch (error) {
      setErrorMessage(
        "Error updating product: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleDeleteClick = async (productId) => {
    try {
      await deleteProduct(productId);
      await GetApiData();
      setSuccessMessage("Product deleted successfully");
    } catch (error) {
      setErrorMessage(
        "Error deleting product: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    const filteredResults = productsData.filter((data) =>
      (data.name || data.username).toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filteredResults);
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await api.post("products", newProduct);
      if (response.status === 201 || response.status === 400) {
        await GetApiData();
        setSuccessMessage("Product added successfully");
      }
    } catch (error) {
      if (error.status === 400) {
        await GetApiData();
        setSuccessMessage("Product added successfully");
      }
      setErrorMessage(
        "Error adding product: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleShowProducts = () => {
    setShowProducts(true);
  };

  const handleShowUsers = () => {
    setShowProducts(false);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container mt-5">
      <div className="p-4 shadow rounded containerAll_admin">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
          <h1 className="h1_admin">{showProducts ? "Products" : "Users"}</h1>
          <div className="d-flex flex-column flex-md-row align-items-center gap-3">
            <ModalComponentAdd color="red" onProductAdded={handleAddProduct} />
            <div className="d-flex align-items-center">
              <IoSearchCircle
                size="40px"
                color="white"
                className="addItem_admin"
              />
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                className={`btn ${
                  showProducts ? "btn btn-Products" : "btn-secondary"
                }`}
                onClick={handleShowProducts}
              >
                Products
              </button>
              <button
                type="button"
                className={`btn ${
                  showProducts ? "btn-secondary" : "btn btn-Users"
                }`}
                onClick={handleShowUsers}
              >
                Users
              </button>
            </div>
          </div>
        </div>
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <div className="list-group">
          {filteredProducts.map((data) => (
            <div
              className="list-group-item d-flex justify-content-between align-items-center mb-2 custom-item productUp_admin flex-column flex-md-row"
              key={data.product_id || data.user_id}
            >
              <div className="d-flex align-items-center mb-2 mb-md-0">
                {showProducts ? (
                  <img
                    src={data.image_url}
                    alt="product"
                    className="rounded-circle me-3"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  <div>
                    <h2>Username</h2>
                    <span>{data.username}</span>
                  </div>
                )}
                <div className="d-grid gap-2">
                  {showProducts ? (
                    <>
                      <h5 className="mb-1">{data.name}</h5>
                      <small>${data.price}</small>
                      <p className="mb-1">{data.description}</p>
                    </>
                  ) : (
                    <>
                      <h2>Email</h2>
                      <p className="mb-1 mx-4">{data.email}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="d-flex">
                {showProducts ? (
                  <>
                    <ModalComponentEdit
                      product={data}
                      onProductUpdated={handleProductUpdated}
                    />
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteClick(data.product_id)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-outline btn-admin"
                    onClick={async () => {
                      try {
                        const response = await api.put(
                          `users/admin/${data.user_id}`
                        );
                        setSuccessMessage("User role updated successfully");
                      } catch (error) {
                        setErrorMessage(
                          "Error updating user role: " +
                            (error.response?.data?.message || error.message)
                        );
                      }
                    }}
                  >
                    Volver admin
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
