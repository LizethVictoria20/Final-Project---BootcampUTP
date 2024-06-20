import { useState, useEffect } from "react";
import Navbar from "../Navbar/index";
import axios from 'axios'
import { Add, Login } from "./addProduct";
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
      <Navbar/>
      <h1>Admin</h1>
      <div className="container">{productsData.map(product => (  
          <div className="product">
            <img className="img-product" src={product.image_url} alt="img-product"></img>
            <h4>{product.name}</h4>
            <h4>{product.price}</h4>
            <p>{product.description}</p>
            <button>Edit</button>
            <button>Delete</button>
            <button onClick={Login(urlAcess)}>Login</button>
            <button onClick={Add(UrlPostProducts)}>Agregar</button>
          </div>
      ))}</div>
    </>
  );
}


export default Admin;
