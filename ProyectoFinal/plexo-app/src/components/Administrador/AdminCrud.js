import axios from 'axios';
import { useState } from 'react';

const urlProduct = 'https://final-project-bootcamputp.onrender.com/api/products';

export const addProduct = async (productData) => {
    try {
        const response = await axios.post(urlProduct, productData);
        return response.data;
    } catch (error) {
        console.error('Error añadiendo producto:', error);
        throw error;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const response = await axios.put(`${urlProduct}/${productId}`, productData);
        return response.data;
    } catch (error) {
        console.error('Error actualizando producto:', error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await axios.get(urlProduct);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        throw error;
    }
};


export const DeleteProduct = () => {
    // Suponiendo que quieras manejar un único productId
    const [productId, setProductId] = useState('');
  
    // Función para manejar la eliminación de un producto
    const handleDelete = async (productId) => {
      try {
        // Realiza la solicitud DELETE
        await axios.delete(`https://final-project-bootcamputp.onrender.com/api/products/?id=${productId}`);
  
        // Actualiza el estado de productos después de eliminar el producto (si es necesario)
        // Puedes manejar la actualización del estado aquí si lo deseas
      } catch (error) {
        console.error('Error deleting product:', error);
        // Maneja el error aquí si es necesario
      }
    };
  
    return handleDelete;
  };