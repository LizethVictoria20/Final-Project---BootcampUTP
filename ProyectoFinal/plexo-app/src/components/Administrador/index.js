import { useState, useEffect } from "react";
import Navbar from "../Navbar/index";
import axios from "axios";
import ModalComponentEdit from "./modalEdit";
import "./stylesheet.css";
import { IoSearchCircle } from "react-icons/io5";
import ModalComponentAdd from "./modalAdd";
import { DeleteProduct } from "./AdminCrud";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../http/index";
import SearchProducts from "../Buscador"; // Importar el componente SearchProducts

function Admin() {
  const deleteProduct = DeleteProduct();

  const handleDeleteClick = async (productId) => {
    await deleteProduct(productId);
    // Refresh the product list after deletion
    GetApiData();
  };

  // get
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");

    const GetApiData = () => {
      api.get("products").then((response) => {
        setProductsData(response.data);
        setFilteredProducts(response.data);  // También actualizar los productos filtrados
      });
  };

  useEffect(() => {
    GetApiData();
  }, []); // Added empty dependency array to run only on mount

  const handleProductUpdated = () => {
    // Refresh the product list after an update
    GetApiData();
  };

  const handleSearch = (e) => {
    const terminoBusqueda = e.target.value;
    setSearch(terminoBusqueda);
    const resultadoBusqueda = productsData.filter((product) =>
      product.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    setFilteredProducts(resultadoBusqueda);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="p-4 shadow rounded containerAll_admin">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
            <h1 className="h1_admin">Productos</h1>
            <div className="d-flex flex-column flex-md-row align-items-center gap-3">
              <ModalComponentAdd
                color="red"
                onProductAdded={handleProductUpdated}
              />
              <div className="d-flex align-items-center">
                <IoSearchCircle
                  size="40px"
                  color="white"
                  className="addItem_admin"
                />
                <SearchProducts
                  products={productsData}
                  setFilteredProducts={setFilteredProducts}
                />
              </div>
            </div>
          </div>
          <div className="list-group">
            {filteredProducts.map((product) => (
              <div
                className="list-group-item d-flex justify-content-between align-items-center mb-2 custom-item productUp_admin flex-column flex-md-row"
                key={product.id}
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
                  <button className="btn btn-outline me-2">
                    <ModalComponentEdit
                      product={product}
                      onProductUpdated={handleProductUpdated}
                    />
                  </button>
                  <button
                    className="btn btn-outline-danger"
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
    </>
  );
}

export default Admin;
