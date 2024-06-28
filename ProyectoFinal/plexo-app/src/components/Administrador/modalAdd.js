import React, { useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import { addProduct } from './AdminCrud';
import './stylesheet.css';

function ModalComponentAdd({ onProductAdded }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [stock, setStock] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleClose = () => {
    setShow(false);
    setErrors({});
    setApiError('');
  };

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

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputFileChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
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
      setImageUrl('');
      setStock('');
      setCategoryId('');
      setErrors({});
      handleClose();
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError('No se pudo agregar el producto. Por favor, inténtelo de nuevo.');
      }
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
              {apiError && <div className="alert alert-danger">{apiError}</div>}
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column align-items-center">
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
                      onChange={(e) => setCategoryId(e.target.value)}
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
                  <div
                    className={`upload-button-container mb-3 w-100 ${dragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <label htmlFor="file-upload" className="upload-label">
                      <div className="upload-design">
                        {preview ? (
                          <img src={preview} alt="Preview" className="preview-image" />
                        ) : (
                          <>
                            <svg viewBox="0 0 640 512" className="upload-icon">
                              {/* <path
                                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                              /> */}
                            </svg>
                            <p>Drag and Drop</p>
                            <p>or</p>
                            <span className="browse-button">Browse file</span>
                          </>
                        )}
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="file-input"
                        onChange={handleInputFileChange}
                      />
                    </label>
                    {errors.image_url && (
                      <div className="text-danger">{errors.image_url}</div>
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
