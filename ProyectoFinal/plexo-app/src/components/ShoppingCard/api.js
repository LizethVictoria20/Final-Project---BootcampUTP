import api from "../../http";

// Función para obtener el cartId y userId
export const fetchCartId = async () => {
  try {
    const response = await api.get('/carts');
    const cartData = response.data;

    if (cartData && cartData.cart_id) {
      return cartData.cart_id;
    } else {
      throw new Error("Invalid cart data");
    }
  } catch (error) {
    console.error("Error fetching cart ID:", error);
  }
};

// Función para obtener la lista de productos usando el cartId
export const fetchCartItems = async (setProducts, navigate) => {
  try {
    const response = await api.get('/carts/items');
    const cartItemsData = response.data;

    const items = cartItemsData.map(item => ({
      ...item.product,
      quantity: item.quantity
    }));
    setProducts(items);

    if (items.length === 0) {
      alert('El carrito está vacío. Redirigiendo a la página de inicio.');
      navigate('/*'); // Redirige a la página de error
    }
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};

// Función para incrementar la cantidad de productos
export const incrementQuantity = async (productId, products, setProducts) => {
  const newProducts = products.map(product => {
    if (product.product_id === productId) {
      return { ...product, quantity: product.quantity + 1 };
    }
    return product;
  });
  setProducts(newProducts);

  try {
    await api.post('/carts/increment', { productId });
  } catch (error) {
    console.error("Error incrementing quantity:", error);
  }
};

// Función para decrementar la cantidad de productos
export const decrementQuantity = async (productId, products, setProducts) => {
  const newProducts = products.map(product => {
    if (product.product_id === productId && product.quantity > 1) {
      return { ...product, quantity: product.quantity - 1 };
    }
    return product;
  });
  setProducts(newProducts);

  try {
    await api.post('/carts/decrement', { productId });
  } catch (error) {
    console.error("Error decrementing quantity:", error);
  }
};

// Función para calcular el total del carrito
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
