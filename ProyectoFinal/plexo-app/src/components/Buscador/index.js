import React, { useEffect, useState } from "react";
import "./style-buscador.css";

function SearchProducts({ setFilteredProducts, products }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = products.filter((elemento) =>
      elemento.name
        .toString()
        .toLowerCase()
        .includes(terminoBusqueda.toLowerCase())
    );
    setFilteredProducts(resultadoBusqueda);
  };

  return (
    <>
      <form className="search-form" role="search">
        <input
          className="search search-field-products"
          type="search"
          placeholder="Enter your search..."
          aria-label="Search"
          onChange={handleChange}
          value={search}
        />
      </form>
    </>
  );
}

export default SearchProducts;
