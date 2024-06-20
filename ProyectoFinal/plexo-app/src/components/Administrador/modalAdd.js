
import React, { useState } from 'react';
import pluscircle from "../../assets/images/plus-circle.png"


function ModalComponent() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={openModal} className='addItem'><img src={pluscircle} alt="plus circle"/></button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h1 className='titleh1'>Nuevo Producto</h1>
            <button>Subir Foto</button>
              <div>
                <p>precio</p>
                <input type='text' placeholder='Precio'/>
              </div>
          </div>
      </div>
      )}
    </div>
  );
}


export default ModalComponent;
