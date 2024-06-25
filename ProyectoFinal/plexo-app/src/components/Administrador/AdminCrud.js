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
  const handleDelete = async (productId) => {
    try {
      const response = await api.delete(`${api}products/${productId}`);
      console.log(response);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return handleDelete;
};
