import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PaymentFailed.css';

const PaymentFailed = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 60000);
  
      return () => clearTimeout(timeoutId);
    }, []);

return (
    <div id="payment-failed-container" className="d-flex justify-content-center align-items-center vh-100">
        <div id="payment-failed-card" className="card p-4 position-relative">
            <button id="exit-button" className="btn btn-link position-absolute top-0 start-0 m-2" onClick={() => window.location.href = '/'}>
                <span>Salir</span> <i className="bi bi-arrow-left"></i>
            </button>

            <div id="payment-failed-body" className="card-body text-center">
                <img
                    id="PlexoStore-logo"
                    src="https://i.ibb.co/R4NNzs0/plexologo-removebg-preview.png"
                    alt="PLEXO STORE Logo"
                    className="mb-4"
                />
                <h2 id="payment-failed-title" className="card-title mb-4">¡Lo Sentimos!</h2>
                <p id="payment-failed-message1" className="card-text mb-4">
                    Queremos informarte que tu reciente intento de compra en nuestra tienda, no se ha completado debido a un problema con el pago.
                </p>
                <p id="payment-failed-message2" className="card-text">
                    Hemos cancelado el pago para este pedido y no se ha realizado ningún cargo en tu cuenta. Te recomendamos verificar la información de pago y volver a intentarlo.
                </p>
            </div>
        </div>
    </div>
);
};

export default PaymentFailed;