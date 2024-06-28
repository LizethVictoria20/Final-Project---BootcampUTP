import api from "../../http";

/**
 * Función para obtener el cartId y userId.
 * @returns {Promise<string|null>} 
 */
export const fetchCartId = async () => {
  try {
    const response = await api.get('/carts');
    const cartData = response.data;

    if (cartData && cartData.cart_id) {
      return cartData.cart_id;
    } else {
      throw new Error("Datos del carrito inválidos.");
    }
  } catch (error) {
    console.error("Error al obtener el ID del carrito:", error);
    return null; // Retorna null si ocurre un error
  }
};

/**
 * Función para obtener la lista de productos usando el cartId.
 * @param {Function} setProducts - Función para actualizar el estado de los productos.
 * @param {Function} navigate - Función para la navegación.
 */
export const fetchCartItems = async (setProducts, navigate) => {
  try {
    const response = await api.get('/carts/items');
    const cartItemsData = response.data;

    const items = cartItemsData.map(item => ({
      ...item.product,
      quantity: item.quantity,
      cartItemId: item.cart_item_id
    }));
    setProducts(items);

    if (items.length === 0) {
      alert('El carrito está vacío. Redirigiendo a la página de inicio.');
      navigate('/'); // Redirige a la página de inicio
    }
  } catch (error) {
    console.error("Error al obtener los artículos del carrito:", error);
    alert("Hubo un problema al cargar los artículos del carrito. ¿estas seguro que añadiste items al carrito? Por favor, intenta de nuevo más tarde.");
  }
};

/**
 * Función para incrementar la cantidad de productos.
 * @param {string} productId - ID del producto a incrementar.
 * @param {Array} products - Lista de productos actuales.
 * @param {Function} setProducts - Función para actualizar el estado de los productos.
 * @param {number} index - Índice del producto a incrementar.
 */
export const incrementQuantity = async (productId, products, setProducts, index) => {
  try {
    const incrementProduct = products[index].cartItemId;
    await api.patch('/carts/items/add', { cartItemId: incrementProduct });

    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, quantity: product.quantity + 1 } : product
    );
    setProducts(updatedProducts);
  } catch (error) {
    console.error("Error al incrementar la cantidad:", error);
    alert("Hubo un problema al incrementar la cantidad del producto. Por favor, intenta de nuevo más tarde.");
  }
};

/**
 * Función para decrementar la cantidad de productos.
 * @param {string} productId - ID del producto a decrementar.
 * @param {Array} products - Lista de productos actuales.
 * @param {Function} setProducts - Función para actualizar el estado de los productos.
 * @param {number} index - Índice del producto a decrementar.
 */
export const decrementQuantity = async (productId, products, setProducts, index) => {
  try {
    const decrementProduct = products[index].cartItemId;
    await api.patch('/carts/items/minus', { cartItemId: decrementProduct });

    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, quantity: product.quantity - 1 } : product
    );
    setProducts(updatedProducts);
  } catch (error) {
    console.error("Error al decrementar la cantidad:", error);
    alert("Hubo un problema al decrementar la cantidad del producto. Por favor, intenta de nuevo más tarde.");
  }
};

/**
 * Función para eliminar un producto del carrito.
 * @param {string} cartItemId - ID del artículo en el carrito.
 * @param {Array} products - Lista de productos actuales.
 * @param {Function} setProducts - Función para actualizar el estado de los productos.
 * @param {number} index - Índice del producto a eliminar.
 */
export const deleteProduct = async (cartItemId, products, setProducts, index) => {
  try {
    await api.delete('/carts/items', { data: { cartItemId } });
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    alert("Hubo un problema al eliminar el producto. Por favor, intenta de nuevo más tarde.");
  }
};

/**
 * Función para calcular el total del carrito.
 * @param {Array} products - Lista de productos en el carrito.
 * @returns {Object} Objeto con los valores de subtotal, tax y total.
 */
export const calculateTotal = (products) => {
  if (!products.length) {
    return { subtotal: 0, tax: 0, total: 0 };
  }

  const subtotal = products.reduce(
    (acc, product) => acc + parseFloat(product.price) * product.quantity,
    0
  );
  const tax = subtotal * 0.19;
  const total = subtotal + tax;
  return { subtotal, tax, total };
};
