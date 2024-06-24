import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SearchProducts({ setFilteredProducts, products }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = products.filter((elemento) =>
      elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    setFilteredProducts(resultadoBusqueda);
  };

  return (
    <div>
      <form className="search-form" role="search">
        <input
          className="form-control me-2 search"
          type="search"
          placeholder="Enter your search..."
          aria-label="Search"
          onChange={handleChange}
          value={search}
        />
      </form>
    </div>
  );
}

export default SearchProducts;


// import { useState, useEffect } from "react";
// import Navbar from "../Navbar/index";
// import axios from 'axios';
// import ModalComponentEdit from "./modalEdit";
// import DeleteConfirmationModal from "./modalDelete";
// import "./stylesheet.css";
// import { IoSearchCircle } from "react-icons/io5"; 
// import ModalComponentAdd from "./modalAdd";
// import SearchProducts from "../Buscador";

// function Admin() {
//   const [productsData, setProductsData] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const UrlProducts = 'https://final-project-bootcamputp.onrender.com/api/products';

//   const GetApiData = async (url) => {
//     try {
//       const response = await axios.get(url);
//       setProductsData(response.data);
//       setFilteredProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     GetApiData(UrlProducts);
//   }, []);

//   const handleSearch = (e) => {
//     const terminoBusqueda = e.target.value;
//     setSearch(terminoBusqueda);
//     const resultadoBusqueda = productsData.filter((product) =>
//       product.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
//     );
//     setFilteredProducts(resultadoBusqueda);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5">
//         <div className="bg-light p-4 shadow rounded custom-container">
//           <div className="d-flex justify-content-space-between align-items-center mb-3" id="d-flex">
//             <h1 className="">Productos</h1>
//             <div className="d-flex justify-content-between custom1">
//               <button>
//                 <ModalComponentAdd color="red" />
//               </button>
//               <div className="input-group">
//                 <span className="input-group-text bg-primary border-0">
//                   <IoSearchCircle size="40px" color="white" />
//                 </span>
//                 <input
//                   type="search"
//                   className="form-control"
//                   placeholder="Buscar"
//                   onChange={handleSearch}
//                   value={search}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="list-group">
//             {filteredProducts.map(product => (
//               <div className="list-group-item d-flex justify-content-between align-items-center mb-2 custom-item" key={product.id}>
//                 <div className="d-flex align-items-center">
//                   <img src={product.image_url} alt="product" className="rounded-circle me-3" style={{ width: '50px', height: '50px' }} />
//                   <div className="d-grid template-columns-3fr">
//                     <h5 className="mb-1">{product.name}</h5>
//                     <small>${product.price}</small>
//                     <p className="mb-1">{product.description}</p>
//                   </div>
//                 </div>
//                 <div className="d-flex">
//                   <button className="btn btn-outline-primary me-2">
//                     <ModalComponentEdit />
//                   </button>
//                   <button className="btn btn-outline-danger">
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Admin;

