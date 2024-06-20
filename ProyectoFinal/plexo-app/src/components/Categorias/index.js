import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductFilter = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://final-project-bootcamputp.onrender.com/api/products"
        );
        const productsData = response.data;
        setProducts(productsData);

        // Extract unique categories from products
        const uniqueCategories = [
          ...new Set(productsData.map((product) => product.category_id)),
        ];
        setCategories(uniqueCategories);

        // Set filtered products initially to all products
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category) {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div>
      <h1>Product Filter</h1>

      <label htmlFor="category">Select Category: </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.product_id}>
            <h2>{product.name}</h2>
            <p>Category: {product.category_id}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFilter;
