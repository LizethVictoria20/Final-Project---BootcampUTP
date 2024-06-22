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


  return (
    <>
      <Navbar />

      <div className="container-fluid text-center container-catalogo">
        <div className="row">
          <div className="col-lg-2">
            <div className="container-categories sticky-top">
              <button
                id="category_btn"
                className="container-categories-btn btn mb-3"
                onClick={() => handleCategoryChange("")}
              >
                All categories
              </button>
              {categories.map((categoryId) => (
                <button
                  id="categories_btn"
                  className={`container-categories-btn btn mb-3 ${selectedCategory === categoryId ? 'active' : ''}`}
                  key={categoryId}
                  onClick={() => handleCategoryChange(categoryId)}
                >
                  {categoryId}
                </button>
              ))}
            </div>
          </div>
          <div className="col">
            <div className="container-products d-flex flex-wrap justify-content-center">
              {getFilteredProducts().length > 0 ? (
                getFilteredProducts().map((product) => (
                  <Card key={product.product_id} product={product} />
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
