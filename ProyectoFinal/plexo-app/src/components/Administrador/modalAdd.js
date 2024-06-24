import React, { useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import { addProduct } from './AdminCrud'; // Asegúrate de que este archivo tenga la función addProduct exportada correctamente
import './stylesheet.css';

function ModalComponentAdd({ onProductAdded }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImage_url] = useState('');
  const [stock, setStock] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [errors, setErrors] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validate = () => {
    const errors = {};
    if (!name.trim()) errors.name = "El nombre es obligatorio";
    if (!price) {
      errors.price = "El precio es obligatorio";
    } else if (isNaN(price) || parseFloat(price) <= 0) {
      errors.price = "Debe ser un número positivo";
    }
    if (!description.trim()) {
      errors.description = "La descripción es obligatoria";
    } else if (description.length < 10) {
      errors.description = "Debe tener 10 caracteres";
    }
    if (!image_url.trim()) {
      errors.image_url = "La URL de la imagen es obligatoria";
    } else if (!image_url.startsWith('http')) {
      errors.image_url = "Ingrese una direccion valida";
    }
    if (!stock) {
      errors.stock = "El stock es obligatorio";
    } else if (isNaN(stock) || parseInt(stock, 10) < 0) {
      errors.stock = "Debe ser un número entero no negativo";
    }
    if (!category_id) {
      errors.category_id = "La categoría es obligatoria";
    } else if (isNaN(category_id) || parseInt(category_id, 10) <= 0) {
      errors.category_id = "Debe ser un número entero positivo";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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

      // Reinicia los estados
      setName('');
      setPrice('');
      setDescription('');
      setImage_url('');
      setStock('');
      setCategory_id('');
      setErrors({});
      handleClose();
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      alert('No se pudo agregar el producto. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <>
      <button className="btn btn_admin" onClick={handleShow}>
        <FaCirclePlus size="30px" />
      </button>

      {show && (
        <div className="modal-backdrop">
          <div className="custom-modal">
            <div className="modal-header text-center">
              <h5 className="modal-title text-black">Nuevo Producto</h5>
              <button type="button" className="close-button" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column align-items-center">
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="URL de la imagen"
                      value={image_url}
                      onChange={(e) => setImage_url(e.target.value)}
                      required
                    />
                    {errors.image_url && (
                      <div className="text-danger">{errors.image_url}</div>
                    )}
                  </div>
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre del producto"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
                  <div className="mb-3 w-100">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Precio del producto"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                    {errors.price && (
                      <div className="text-danger">{errors.price}</div>
                    )}
                  </div>
                  <div className="mb-3 w-100">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Cantidad en stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                    {errors.stock && (
                      <div className="text-danger">{errors.stock}</div>
                    )}
                  </div>
                  <div className="mb-3 w-100">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="ID de la categoría"
                      value={category_id}
                      onChange={(e) => setCategory_id(e.target.value)}
                      required
                    />
                    {errors.category_id && (
                      <div className="text-danger">{errors.category_id}</div>
                    )}
                  </div>
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Descripción del producto"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    {errors.description && (
                      <div className="text-danger">{errors.description}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary btn-purple text-white">Agregar Producto</button>
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
