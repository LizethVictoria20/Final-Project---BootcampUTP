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

export const deleteProduct = async (productId) => {
    try {
        await axios.delete(`${urlProduct}/${productId}`);
    } catch (error) {
        console.error('Error eliminando producto:', error);
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