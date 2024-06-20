import { useState, useEffect } from "react";
import Navbar from "../Navbar/index";
import axios from 'axios'
import { add } from "./addProduct"
import "./stylesheet.css"
function Admin() {

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
                  <button className="addItem" ></button>
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
