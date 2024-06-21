
import './stylesheet.css';
import React, { useState } from 'react';
import './stylesheet.css';
import { FaCirclePlus } from "react-icons/fa6";

function ModalComponent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
      <FaCirclePlus size="30px" />
      </button>

      {show && (
        <div className="modal-backdrop">
          <div className="custom-modal">
            <div className="modal-header">
              <h5 className="modal-title">Seguro de eliminar?</h5>
              <button type="button" className="close-button" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body">
              
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleClose}>Agregar</button>
              <button type="button" className="btn btn-primary" onClick={handleClose}>eliminar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalComponent;
