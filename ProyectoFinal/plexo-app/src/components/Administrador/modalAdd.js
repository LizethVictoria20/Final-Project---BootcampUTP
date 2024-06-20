
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
      <button onClick={openModal} className='addItem_admin'><img src={pluscircle} alt="plus circle"/></button>
      {showModal && (
        <div className="modal_admin">
          <div className="modal-content_admin">
            <span className="close-button_admin" onClick={closeModal}>&times;</span>
            <h1 className='titleh1_admin'>Nuevo Producto</h1>
            <button>Subir Foto</button>
              <div>
                <p className='price_admin'>precio</p>
                <input type='text' placeholder='Precio'/>
              </div>
          </div>
      </div>
      )}
    </div>
  );
}


export default ModalComponent;
