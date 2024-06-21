
import './stylesheet.css';
import React, { useState } from 'react';
import './stylesheet.css';
import { FaCirclePlus } from "react-icons/fa6";

function ModalComponentEdit() {
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
              <h5 className="modal-title">Editar producto</h5>
              <button type="button" className="close-button" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body">
              <form>
                <div className="d-flex flex-column align-items-center">
                  <div className="mb-3 text-center">
                    <input type="text" className="form-control" placeholder="url" />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Nombre" />
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input type="number" className="form-control" placeholder="Precio" />
                    
                  </div>
                  <div className="mb-3">
                    <textarea className="form-control" rows="3" placeholder="Descripción"></textarea>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleClose}>Agregar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalComponentEdit;
