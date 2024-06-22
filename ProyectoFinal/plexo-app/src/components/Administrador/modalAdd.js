import React, { useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import { addProduct } from './AdminCrud'; // Ensure this file has the addProduct function exported correctly
import './stylesheet.css';

function ModalComponentAdd({ onProductAdded }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImage_url] = useState('');
  const [stock, setStock] = useState('');
  const [category_id, setCategory_id] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newProduct = {
        name,
        price: parseFloat(price),
        description,
        image_url,
        stock: parseInt(stock, 10),
        category_id: parseInt(category_id, 10),
      };

      const response = await addProduct(newProduct);

      if (onProductAdded) {
        onProductAdded(response);
      }

      // Clear the form
      setName('');
      setPrice('');
      setDescription('');
      setImage_url('');
      setStock('');
      setCategory_id('');
      handleClose();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
      <button className="btn  btn_admin" onClick={handleShow}>
        <FaCirclePlus size="30px" />
      </button>

      {show && (
        <div className="modal-backdrop">
          <div className="custom-modal">
            <div className="modal-header text-center">
              <h5 className="modal-title text-black">New Product</h5>
              <button type="button" className="close-button" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body  ">
              
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column align-items-center">
                  <div className="mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="URL"
                      value={image_url}
                      onChange={(e) => setImage_url(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Precio"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 d-flex gap-2 inputStyle_admin">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Categoría"
                      value={category_id}
                      onChange={(e) => setCategory_id(e.target.value)}
                      required
                    />
                    
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Descripción"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className=" btn btn-primary btn-purple text-white">Agregar Producto</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalComponentAdd;
