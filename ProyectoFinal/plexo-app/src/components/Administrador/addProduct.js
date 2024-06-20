import axios from "axios";
// import { useEffect } from "react";

export const login = async () => {
    
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      "https://final-project-bootcamputp.onrender.com/api/auth/login",
      {
        email: "liz@example.com",
        password: "aguapanela987",
      }
    );
    return console.log("Respuesta del servidor:", response.data);
  } catch (error) {
    console.error("Error enviando la respuesta", error);
  }
};

export const AddProduct = async () => {
    try {
      axios.defaults.withCredentials = true; 
      const response = await axios.post(
        "https://final-project-bootcamputp.onrender.com/api/products",
        {
          name : "Royal Shoes",
          description : "Royal shoes for men",
          price : 100,
          stock : 15,
          image_url : "https://static.dafiti.com.co/p/royal-county-of-berkshire-polo-club-6654-5502281-1-catalog-new.jpg",
          category_id : 10
        }
      );
      console.log("Respuesta del servidor:", response.data);
      return response.data; // Devolver la respuesta para manejarla fuera de la función si es necesario
    } catch (error) {
      console.error("Error enviando la respuesta", error);
      throw error; // Propagar el error para manejarlo fuera de la función si es necesario
    }
  };

//     export const DeleteProduct = async() =>{
//     try {
//         const response = await axios.delete(
//             "https://final-project-bootcamputp.onrender.com/api/products",

//         )
//     }
//   }