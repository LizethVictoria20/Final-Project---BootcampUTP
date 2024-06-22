import axios from 'axios';


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


export const updateProduct = async (productData) => {
    try {
        const response = await axios.put(`${urlProduct}/${productData.id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Error actualizando producto:', error.response ? error.response.data : error.message);
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

    const handleDelete = async (productId) => {
      try {
        // Realiza la solicitud DELETE
        await axios.delete(`https://final-project-bootcamputp.onrender.com/api/products/?id=${productId}`);
  

      } catch (error) {
        console.error('Error deleting product:', error);
   
      }
    };
  
    return handleDelete;
  };