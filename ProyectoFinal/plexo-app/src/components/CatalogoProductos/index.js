import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Card from "../Card/index";
import Navbar from "../Navbar/index";

const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://final-project-bootcamputp.onrender.com/api/products"
        );
        const productsData = response.data;
        setProducts(productsData);

        const uniqueCategories = [
          ...new Set(productsData.map((product) => product.name.split(" ")[0])),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const getFilteredProducts = () => {
    if (!selectedCategory) {
      return products;
    }
    return products.filter(
      (product) => product.name.split(" ")[0] === selectedCategory
    );
  };

  const [productIds, setProductIds] = useState([]);

  const guardarProducto = (id) => {
    setProductIds((prevProductIds) => [...prevProductIds, id]);
    console.log("array id", productIds )
  };

  return (
    <>
      <Navbar />

      <div className="container text-center container-catalogo">
        <div className="row">
          <div className="col col-lg-2 container-products">
            <div>
              <button
                className="container-categories_btn"
                onClick={() => handleCategoryChange("")}
              >
                <div>
                <p>All categories</p>
                </div>
              </button>
              {categories.map((categoryId) => (
                <button
                  className="container-categories_btn d-flex flex-column"
                  key={categoryId}
                  onClick={() => handleCategoryChange(categoryId)}
                >
                  {categoryId}
                </button>
              ))}
            </div>
          </div>
          <div className="col">
            {" "}
            <div className="container-products d-flex flex-wrap">
              {getFilteredProducts().length > 0 ? (
                getFilteredProducts().map((product) => (
                  <Card key={product.product_id} product={product} guardarProducto={guardarProducto} />
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalogo;
