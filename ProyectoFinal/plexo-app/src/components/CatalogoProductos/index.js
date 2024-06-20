import React, { useState, useEffect } from "react";
import axios from "axios";
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
          ...new Set(productsData.map((product) => product.category_id)),
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
      (product) => product.category_id === selectedCategory
    );
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Product Filter</h1>
        <div>
          <button onClick={() => handleCategoryChange("")}>
            All Categories
          </button>
          {categories.map((categoryId) => (
            <button
              key={categoryId}
              onClick={() => handleCategoryChange(categoryId)}
            >
              Category {categoryId}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {getFilteredProducts().length > 0 ? (
            getFilteredProducts().map((product) => (
              <Card key={product.product_id} product={product} />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Catalogo;
