import api from "../../http/index";

const urlProduct = `${api}products`;

export const addProduct = async (productData) => {
  try {
    const response = await api.post(urlProduct, productData);
    return response.data;
  } catch (error) {
    console.error("Error añadiendo producto:", error);
    throw error;
  }
};

export const updateProduct = async (productData) => {
  try {
    const response = await api.put(
      `${urlProduct}${productData.id}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error actualizando producto:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const DeleteProduct = () => {
<<<<<<< HEAD
  const handleDelete = async (productId) => {
    try {
      const response = await api.delete(`${api}products/${productId}`);
      console.log(response);
=======

    const handleDelete = async (productId) => {
      try {
        const response = await axios.delete(`${urlProduct}/${productId}`);
        console.log(response);
>>>>>>> 5eb0d4242388a7181cf2f23c46de9717143b7114
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return handleDelete;
};
