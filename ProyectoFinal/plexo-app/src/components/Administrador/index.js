import { useState, useEffect } from "react";
import Navbar from "../Navbar/index";
import axios from 'axios'
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
      <h1>Admin</h1>
      <div className="container">{productsData.map(product => (  
          <div className="product">
            <img className="img-product" src={product.image_url} alt="img-product"></img>
            <h4>{product.name}</h4>
            <h4>{product.price}</h4>
            <p>{product.description}</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
      ))}</div>
    </>
  );
}


export default Admin;
