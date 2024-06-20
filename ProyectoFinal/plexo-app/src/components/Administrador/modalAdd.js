
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
          Contenido del modal
          <button onClick={closeModal}>Cerrar</button>
        </div>
      )}
    </div>
  );
}


export default ModalComponent;
