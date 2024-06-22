
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
        <div className='backModal_admin'>
            <div className="modal_admin">
              <div className="modal-content_admin">
                
                <h1 className='titleh1_admin'>New Product</h1>
                <p className='modalp_admin'>Name of the Product</p>
                <input type='text' placeholder='Nombre del producto' className='inputStyle_admin'></input>
                <p className='modalp_admin'>price</p>
                <input type='url' placeholder='Url del producto' className='inputStyle_admin'></input>
                  <div className='catprice_admin'>
                      <div>
                        <p className='modalp_admin'> Category</p>
                        <input type='text' placeholder='categoria' className='inputStyle_admin'></input>
                      </div> 
                      <div>
                        <p className='modalp_admin'>price</p>
                        <input type='text' placeholder='Precio' className='inputStyle_admin'/>
                      </div>
                    
                    
                  </div>
                  <textarea className='textArea_admin'></textarea>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default ModalComponent;
