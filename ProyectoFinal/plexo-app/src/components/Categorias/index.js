import React, { useState, useEffect } from "react";
import api from "../../http/index";

const ProductFilter = () => {
  const [products, setProducts] = useState([]);
  const [firstNames, setFirstNames] = useState([]);
  const [selectedFirstName, setSelectedFirstName] = useState("");

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await api.get("products");
        const productsData = response.data;
        setProducts(productsData);

        const uniqueFirstNames = [
          ...new Set(productsData.map((product) => product.name.split(" ")[0])),
        ];
        setFirstNames(uniqueFirstNames);
      } catch (error) {
        console.error("Error de la petición:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFirstNameChange = (firstName) => {
    setSelectedFirstName(firstName);
  };

  const getFilteredProducts = () => {
    if (!selectedFirstName) {
      return products;
    }
    return products.filter(
      (product) => product.name.split(" ")[0] === selectedFirstName
    );
  };

  return (
    <div>
      <h1>Product Filter</h1>

      <div>
        <button onClick={() => handleFirstNameChange("")}>All Products</button>
        {firstNames.map((firstName) => (
          <button
            key={firstName}
            onClick={() => handleFirstNameChange(firstName)}
          >
            {firstName}
          </button>
        ))}
      </div>

      <ul>
        {getFilteredProducts().map((product) => (
          <li key={product.product_id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <img src={product.image_url} alt={product.name} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFilter;
