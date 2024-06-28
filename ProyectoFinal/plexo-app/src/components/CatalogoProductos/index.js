import React, { useState, useEffect } from "react";
import "./style-catalogo.css";
import Card from "../Card/index";
import api from "../../http/index.js";
import SearchProducts from "../Buscador/index";
import { Link } from "react-router-dom";

const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("products");
        const productsData = response.data;
        setProducts(productsData);
        setFilteredProducts(productsData);

        const responseCategories = await api.get("categories");
        const uniqueCategories = responseCategories.data;
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      const filteredByCategory = products.filter(
        (product) => product.category_id === categoryId
      );
      setFilteredProducts(filteredByCategory);
    } else {
      setFilteredProducts(products);
    }
  };

  const getFilteredProducts = () => {
    if (!selectedCategory) {
      return filteredProducts;
    }
    return filteredProducts.filter(
      (product) => product.category_id === selectedCategory
    );
  };

  return (
    <>
      <div className="container-fluid text-center container-catalogo">
        <div className="search-bar">
          <SearchProducts
            setFilteredProducts={setFilteredProducts}
            products={products}
          />
        </div>
        <div className="row">
          <div className="col-lg-2 col-md-3 mb-4">
            <div className="container-categories d-flex flex-column text-white">
              <button
                id="category_btn"
                className="container-categories-btn btn mb-3 button-all-cateries"
                onClick={() => handleCategoryChange("")}
              >
                All categories
              </button>
              {categories.map((category) => (
                <button
                  id={`category_${category.category_id}`}
                  className={`container-categories-btn btn mb-3 button-cateries text-white ${
                    selectedCategory === category.category_id ? "active" : ""
                  }`}
                  key={category.category_id}
                  onClick={() => handleCategoryChange(category.category_id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          <div className="col">
            <div className="container-products d-flex flex-wrap justify-content-center">
              {getFilteredProducts().length > 0 ? (
                getFilteredProducts().map((product) => (
                  <Link
                    to={`/product/${product.product_id}`}
                    className="card-title-product"
                  >
                    <Card key={product.product_id} product={product} />
                  </Link>
                ))
              ) : (
                <p className="text-light">No products found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalogo;
