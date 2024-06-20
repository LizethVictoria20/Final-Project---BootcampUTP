import { useState, useEffect } from "react";
import Navbar from "../Navbar/index";
import axios from 'axios'
import { Add, Login } from "./addProduct";
import "./stylesheet.css"

function Admin() {

  const urlAcess = 'https://final-project-bootcamputp.onrender.com/api/auth/login'
  const UrlPostProducts = 'https://final-project-bootcamputp.onrender.com/api/products'
  const [ productsData, setProductsData] = useState('')
  const UrlProducts = 'https://final-project-bootcamputp.onrender.com/api/products'
  
  const GetApiData = (url) => {
    axios.get(url).then((response) => {
      setProductsData(response.data)
      console.log(productsData);
      
  })
};

useEffect(() => {
  GetApiData(UrlProducts) 
});

  return (
    <>
    
      <Navbar />
      <div className="containerAll">
        <div className="container">
          <div className="containerElements">
                <div className="productsAddSearch">
                  <h1>Productos</h1> 
                  <button className="addItem" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                      </svg>
                      </button>
                  <input className="searchBar"></input>
                </div>
                <div className="containerProducts">{productsData.map(product => (  
                    <div className="product">
                          <img className="img-product" src={product.image_url} alt="img-product"/>
                          <h4>{product.name}</h4>
                          <h4>${product.price}</h4>
                          <h4>{product.stock} </h4>
                          <div className="buttons">
                            <button className="addItem">Edit</button>
                            <button className="addItem">Delete</button>
                          </div>
                    </div>
            ))}</div>
            </div>
        </div>
      </div>
    </>
      
      
  );
}

{/* <p>{product.description}</p> */}
export default Admin;
