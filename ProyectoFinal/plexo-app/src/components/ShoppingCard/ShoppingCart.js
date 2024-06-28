import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import "./ShoppingCart.css";
import {
  fetchCartId,
  fetchCartItems,
  incrementQuantity as incrementQuantityAPI,
  decrementQuantity as decrementQuantityAPI,
  deleteProduct as deleteProductAPI,
  calculateTotal,
} from "./api";
import api from "../../http";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const { subtotal, tax, total } = calculateTotal(products);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartId = await fetchCartId();
        if (cartId) {
          await fetchCartItems(setProducts, navigate);
        } else {
          alert("No se pudo obtener el carrito. Debes registrarte.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error al obtener los datos del carrito:", error);
        alert(
          "Hubo un problema al cargar los datos del carrito. Por favor, intenta de nuevo más tarde."
        );
      }
    };

    fetchCartData();
  }, [navigate]);

  const increment = async (productId) => {
    try {
      const index = products.findIndex(
        (product) => product.product_id === productId
      );
      if (index !== -1) {
        await incrementQuantityAPI(productId, products, setProducts, index);
      }
    } catch (error) {
      console.error("Error al incrementar la cantidad del producto:", error);
      alert(
        "Hubo un problema al incrementar la cantidad del producto. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  const decrement = async (productId) => {
    try {
      const index = products.findIndex(
        (product) => product.product_id === productId
      );
      if (index !== -1) {
        await decrementQuantityAPI(productId, products, setProducts, index);
      }
    } catch (error) {
      console.error("Error al decrementar la cantidad del producto:", error);
      alert(
        "Hubo un problema al decrementar la cantidad del producto. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  const deleteProduct = async (cartItemId, index) => {
    try {
      await deleteProductAPI(cartItemId, products, setProducts, index);
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
      alert(
        "Hubo un problema al eliminar el producto del carrito. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  async function handleClick() {
    try {
      const response = await api.post("payment/create-checkout-session");
      const { url } = response.data;
      console.log(url);
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-8 col-md-12 mb-4">
            <div className="products-container">
              {products.map((product, index) => (
                <Product
                  key={product.product_id}
                  product={product}
                  index={index}
                  increment={() => increment(product.product_id)}
                  decrement={() => decrement(product.product_id)}
                  deleteProduct={() => deleteProduct(product.cartItemId, index)}
                />
              ))}
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="summary">
              <p>
                Cantidad de productos:{" "}
                {products.reduce((acc, product) => acc + product.quantity, 0)}
              </p>
              <p>Valor: ${subtotal.toFixed(2)}</p>
              <p>Impuesto 19%: ${tax.toFixed(2)}</p>
              <p>Envío: GRATIS</p>
              <p>Total: ${total.toFixed(2)}</p>
              <button className="confirm-button" onClick={handleClick}>
                <span className="span1"></span>
                <span className="span2"></span>
                <span className="span3"></span>
                <span className="span4"></span>
                CONFIRMAR COMPRA
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
