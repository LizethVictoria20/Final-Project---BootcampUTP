import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 60000);
  
      return () => clearTimeout(timeoutId);
    }, []);

return (
    <div id="payment-success-container" className="d-flex justify-content-center align-items-center vh-100">
        <div id="payment-success-card" className="card p-4 position-relative">
            <button id="exit-button" className="btn btn-link position-absolute top-0 start-0 m-2" onClick={() => window.location.href = '/'}>
                <span>Salir</span> <i className="bi bi-arrow-left"></i>
            </button>

            <div id="payment-success-body" className="card-body text-center">
                <img
                    id="payment-success-logo"
                    src="https://i.ibb.co/R4NNzs0/plexologo-removebg-preview.png"
                    alt="PLEXO STORE Logo"
                    className="mb-4"
                />
                <h2 id="payment-success-title" className="card-title mb-4">¡Gracias por tu compra!</h2>
                <p id="payment-success-message1" className="card-text mb-4">
                    Queremos agradecerte sinceramente por tu reciente compra en nuestra tienda.
                    Nos sentimos honrados de que hayas elegido nuestros productos y servicios.
                </p>
                <p id="payment-success-message2" className="card-text">
                    Esperamos que disfrutes de tu compra y que vuelvas a visitarnos pronto.
                    ¡Gracias por ser parte de la familia <strong>PLEXO</strong>!
                </p>
            </div>
        </div>
    </div>
);
};

export default PaymentSuccess;