import React, { useState, useEffect } from "react";
import api from "../../http";
import "./style-historial.css"; // Importar el archivo de estilos aquí

const Historial = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Verificar autenticación del usuario
        const responseAuth = await api.get("/users/loginuser");
        if (responseAuth.status !== 200 || !responseAuth.data) {
          throw new Error("Usuario no autenticado");
        }

        // Obtener historial de compras
        const responseHistory = await api.get("/orders");
        if (responseHistory.status === 200) {
          const historyData = responseHistory.data.map(order => ({
            ...order,
            showDetails: false,
            orderDetails: null
          }));
          setHistory(historyData);
        } else {
          throw new Error("Error al obtener el historial de compras");
        }
      } catch (error) {
        console.error("Error al cargar el historial de compras:", error.message);
        setError(
          "Hubo un problema al cargar el historial de compras. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const fetchOrderItems = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}/items`);
      console.log("Productos de la orden", response);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los productos de la orden:", error);
      throw new Error("Error al obtener los productos de la orden");
    }
  };

  const handleViewOrderDetails = async (orderId, index) => {
    try {
      const products = await fetchOrderItems(orderId);
      console.log("Detalles de la orden:", products);
      setHistory(prevHistory => [
        ...prevHistory.slice(0, index),
        {
          ...prevHistory[index],
          orderDetails: products,
          showDetails: true
        },
        ...prevHistory.slice(index + 1)
      ]);
    } catch (error) {
      console.error("Error al cargar los detalles de la orden:", error.message);
      setHistory(prevHistory => [
        ...prevHistory.slice(0, index),
        {
          ...prevHistory[index],
          orderDetails: null,
          showDetails: false
        },
        ...prevHistory.slice(index + 1)
      ]);
      if (error.response && error.response.status === 404) {
        setError("La orden solicitada no fue encontrada.");
      } else {
        setError(
          "Hubo un problema al cargar los detalles de la orden. Por favor, intenta de nuevo más tarde."
        );
      }
    }
  };

  const toggleDetails = async (orderId, index) => {
    const currentDetailsState = history[index].showDetails;
    if (currentDetailsState) {
      setHistory(prevHistory => [
        ...prevHistory.slice(0, index),
        {
          ...prevHistory[index],
          showDetails: false,
          orderDetails: null
        },
        ...prevHistory.slice(index + 1)
      ]);
    } else {
      try {
        await handleViewOrderDetails(orderId, index);
      } catch (error) {
        console.error("Error al cargar los detalles de la orden:", error.message);
        setError(
          "Hubo un problema al cargar los detalles de la orden. Por favor, intenta de nuevo más tarde."
        );
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <>
        <div className="history-container">
          <h2>Historial de Compras</h2>
          <div>{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="history-container">
        <h2>Historial de Compras</h2>
        {history.length === 0 ? (
          <p>No hay compras anteriores.</p>
        ) : (
          <ul className="history-list">
            {history.map((purchase, index) => (
              <li key={purchase.order_id} className="history-item">
                <h3>Compra #{purchase.order_id}</h3>
                <p>Status: {purchase.status}</p>
                <p>Total: ${parseFloat(purchase.total).toFixed(2)}</p>
                <p>User ID: {purchase.user_id}</p>
                <button
                  className="details-button btn"
                  onClick={() => toggleDetails(purchase.order_id, index)}
                >
                  {purchase.showDetails ? "Ocultar Detalles" : "Ver Detalles"}
                </button>
                {/* Renderizado de los productos */}
                {purchase.showDetails && purchase.orderDetails && purchase.orderDetails.length > 0 && (
                  <div className="history-item-details">
                    <h4>Productos de la Orden:</h4>
                    <ul>
                      {purchase.orderDetails.map(item => (
                        <li key={item.order_item_id}>
                          <p>{item.product_name}</p>
                          <p>Precio: ${item.price}</p>
                          <p>Cantidad: {item.quantity}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Historial;
