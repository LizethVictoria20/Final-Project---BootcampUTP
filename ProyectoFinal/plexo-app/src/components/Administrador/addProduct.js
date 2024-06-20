import axios from "axios";
// import { useEffect } from "react";

export function Login(){
    // const urlAcess = 'https://final-project-bootcamputp.onrender.com/api/auth/login'
    

    const AddProduct = (url) => {
        axios.post(url, {

        })
    }
    // useEffect(() => {
    //     LoginAdmin(urlAcess)
    //  });  
}

export function Add() {
    const UrlPostProducts = 'https://final-project-bootcamputp.onrender.com/api/products'
    const AddProduct = async(url) => {

        try {
            const response = await axios.post(url, {
                "name": "Prueba Post",
                "description": "Una cómoda camiseta de algodón 100% perfecta para el uso diario.",
                "price": 19.99,
                "stock": 150,
                "image_url": "https://hmcolombia.vtexassets.com/arquivos/ids/3299034/Camiseta-en-algodon-pima-Slim-Fit---Blanco---H-M-CO.jpg?v=638371012387000000",
                "category_id": 1
            });
            return console.log('Respuesta del servidor:', response.data);
            
        } catch (error) {
            console.error('Error enviando la respuesta', error);
        }
    }
    // useEffect(() => {
    //     AddProduct(UrlPostProducts)
    //  });
}

 