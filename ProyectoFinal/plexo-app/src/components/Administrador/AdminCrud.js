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

export const DeleteProduct = async (productId) => {
    try {
        await axios.delete(`https://final-project-bootcamputp.onrender.com/api/products/?id=${productId}`);
    } catch (error) {
        console.error('Error eliminando producto:', error);
        throw error;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const response = await axios.put(`/${productId}`, productData);
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

