import axios from "axios";
import { useState, useEffect } from "react";
const urlProduct = 'https://final-project-bootcamputp.onrender.com/api/products'
export const AddProduct = async() =>{
    try {
        const response = axios.post(urlProduct, {
            "name": "prueba5",
            "description": "probandoDesdeElFront",
            "price": 10,
            "stock": 50,
            "image_url": "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8c3a4cc503fb4bd8920074f18cc26441_9366/Tenis_Grand_Court_2.0_Blanco_ID4474_01_standard.jpg",
            "category_id": 2
            
        });
            return response.data
        } catch (error) {
            console.error('Error Añadiendo Productos', error)

        }
}


export const DeleteProduct = (product_id) => {
    const [products, setProducts] = useState([]);
    const [deleteProductId, setDeleteProductId] = useState('');
  
    // Función para manejar la eliminación de un producto
    const handleDelete = async (productId) => {
      try {
        // Realiza la solicitud DELETE
        await axios.delete(`https://final-project-bootcamputp.onrender.com/api/products/${productId}`);
  
        // Actualiza el estado de productos después de eliminar el producto
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
  
        // Limpia el estado de deleteProductId después de eliminar
        setDeleteProductId('');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };
}