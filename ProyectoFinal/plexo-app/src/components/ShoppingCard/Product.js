import React from "react";
import "./ShoppingCart.css";

/**
 * Componente Product que representa un producto individual en el carrito de compras.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.product - El producto a mostrar.
 * @param {Function} props.increment - Función para incrementar la cantidad del producto.
 * @param {Function} props.decrement - Función para decrementar la cantidad del producto.
 * @param {Function} props.deleteProduct - Función para eliminar el producto del carrito.
 * @param {number} props.index - Índice del producto en la lista de productos.
 * @returns {JSX.Element} Un elemento JSX que representa el producto.
 */
const Product = ({ product, increment, decrement, deleteProduct, index }) => (
  <div className="product">
    <div className="product-info">
      <div className="product-image">
        <img
          src={product.image_url}
          alt={product.name}
          className="img-shopping"
        />
      </div>
      <div className="texto-producto text-light">
        <h3>{product.name}</h3>
        <p>Descripción: {product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Stock: {product.stock}</p>
      </div>
    </div>
    <div className="product-controls">
      <button 
        onClick={() => {
          try {
            decrement(product.product_id);
          } catch (error) {
            console.error("Error al decrementar la cantidad:", error);
            alert("Hubo un problema al decrementar la cantidad del producto. Por favor, intenta de nuevo más tarde.");
          }}}
      >-</button>
      <span>{product.quantity}</span>
      <button 
        onClick={() => {
          try {
            increment(product.product_id);
          } catch (error) {
            console.error("Error al incrementar la cantidad:", error);
            alert("Hubo un problema al incrementar la cantidad del producto. Por favor, intenta de nuevo más tarde.");
          }}}
      >+</button>
      <button
        onClick={() => {
          try {
            deleteProduct();
          } catch (error) {
            console.error("Error al eliminar el producto:", error);
            alert("Hubo un problema al eliminar el producto del carrito. Por favor, intenta de nuevo más tarde.");
          }}}
      >Delete</button>
    </div>
  </div>
);

export default Product;
