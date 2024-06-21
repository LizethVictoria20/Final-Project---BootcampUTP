import { useState, useEffect } from "react";
import Navbar from "../Navbar/index";
import axios from 'axios'
import { AddProduct, login } from "./addProduct";
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
  const [ productsData, setProductsData] = useState([])
  const UrlProducts = 'https://final-project-bootcamputp.onrender.com/api/products'

  const GetApiData = (url) => {
    axios.get(url).then((response) => {
      setProductsData(response.data)
      console.log(productsData);
      login()

  })
};

useEffect(() => {
  GetApiData(UrlProducts)
});

  return (
    <>
      <Navbar />
      <div className="containerAll_admin">
        <div className="container_admin">
          <div className="containerElements_admin">
                <div className="productsAddSearch_admin">
                  <h1 className="h1_admin">Products</h1>
                  <ModalComponent/><div className="searchBar_admin">
                    <img src={searchcircle} alt="search bar" className="searchImg_admin" />
                    <input className="Bar_admin" type="search"/>
                  </div>
                </div>
                <div className="containerProducts_admin">{productsData?.map(product => (
                    <div className="product_admin">
                          <img className="img-product_admin" src={product.image_url} alt="img-product"/>
                          <h4 className="h4_admin">{product.name}</h4>
                          <h4 className="h4_admin">${product.price}</h4>
                          <h4 className="h4_admin">{product.stock}/u </h4>
                          <div className="buttons_admin">
                            <button className="addItem_admin"><img src={pencil} alt="edit"/></button>
                            <button className="addItem_admin"><img src={trash} alt="trash"/></button>
                          </div>
                    </div>
            ))}</div>
            </div>
        </div>
      </div> 
    </>

  );
}

export default Admin;
