import React, { useState, useEffect } from 'react';
import { BiSolidPencil } from "react-icons/bi";
import { updateProduct } from './AdminCrud'; // Asegúrate de importar correctamente tu función de actualización
import './stylesheet.css';

function ModalComponentEdit({ product, onProductUpdated }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [stock, setStock] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(product);
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setDescription(product.description);
      setImageUrl(product.image_url);
      setStock(product.stock.toString());
      setCategoryId(product.category_id.toString());
    }
  }, [product]);

  const handleClose = () => {
    setShow(false);
    setErrors({});
  };

  const handleShow = () => setShow(true);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'El nombre es obligatorio.';
    if (!price || isNaN(price)) newErrors.price = 'Debe ser un número válido.';
    if (!description || description.length < 10) newErrors.description = 'Debe tener al menos 10 caracteres.';
    if (!image_url) newErrors.image_url = 'Ingresa una URL';
    if (!stock || isNaN(stock)) newErrors.stock = 'Debe ser un número válido.';
    if (!category_id || isNaN(category_id)) newErrors.category_id = 'Debe ser un número válido.';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const putProduct = {
        id: product.product_id,
        name,
        price: parseFloat(price),
        description,
        image_url,
        stock: parseInt(stock, 10),
        category_id: parseInt(category_id, 10),
      };

      const response = await updateProduct(putProduct);
      if (response) {
        if (onProductUpdated) {
          onProductUpdated(); // Actualiza la lista de productos en el componente padre Admin
        }
        setErrors({});
        handleClose();
      } 
    } catch (error) {
      console.error('Error updating product:', error);
      setErrors({ general: 'Error al actualizar el producto.' });
    }
  };

  return (
    <>
      <BiSolidPencil size="30px" onClick={handleShow} className='btnEdit_admin' />
      {show && (
        <div className="modal-backdrop">
          <div className="custom-modal">
            <div className="modal-header">
              <h5 className="modal-title">Editar producto</h5>
              <button type="button" className="close-button" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body">
              {errors.general && <div className="alert alert-danger">{errors.general}</div>}
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column align-items-center">
                  <div className="mb-3 w-100 text-center">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="URL"
                      value={image_url}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    {errors.image_url && <div className="text-danger">{errors.image_url}</div>}
                  </div>
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                  </div>
                  <div className="mb-3 w-100">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Precio"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.price && <div className="text-danger">{errors.price}</div>}
                  </div>
                  <div className="mb-3 w-100">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                    {errors.stock && <div className="text-danger">{errors.stock}</div>}
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Descripción"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <div className="text-danger">{errors.description}</div>}
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Categoría"
                      value={category_id}
                      onChange={(e) => setCategoryId(e.target.value)}
                    />
                    {errors.category_id && <div className="text-danger">{errors.category_id}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary">Actualizar Producto</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalComponentEdit;
