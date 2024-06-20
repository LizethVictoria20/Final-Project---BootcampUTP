import { useState, useEffect } from "react";
import Navbar from "../Navbar/index";
import axios from 'axios'
import pluscircle from "../../assets/images/plus-circle.png"
import searchcircle from "../../assets/images/search-circle.png"
import pencil from "../../assets/images/pencil.png"
import trash from "../../assets/images/trash.png"
import { Add, Login } from "./addProduct";
import "./stylesheet.css"
import ModalComponent from './modalAdd';

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
                  <button className="addItem" onClick={ModalComponent}><img src={pluscircle} alt="plus circle"/></button>
                  <input className="searchBar"/>
                </div>
                <div className="containerProducts">{productsData.map(product => (
                    <div className="product">
                          <img className="img-product" src={product.image_url} alt="img-product"/>
                          <h4>{product.name}</h4>
                          <h4>${product.price}</h4>
                          <h4>{product.stock} </h4>
                          <div className="buttons">
                            <button className="addItem"><img src={pencil} alt="edit"/></button>
                            <button className="addItem"><img src={trash} alt="trash"/></button>
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
