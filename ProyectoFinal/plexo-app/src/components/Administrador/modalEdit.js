import React, { useState } from 'react';
import { BiSolidPencil } from "react-icons/bi";
import { updateProduct } from './AdminCrud'; // Asegúrate de que este archivo tenga la función updateProduct exportada correctamente
import './stylesheet.css';

function ModalComponentEdit({ product, onProductUpdated }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImage_url] = useState('');
  const [stock, setStock] = useState('');
  const [category_id, setCategory_id] = useState('');

  // Cuando se monta el componente, inicializamos el estado con los datos del producto si existe
  React.useEffect(() => {
    if (product) {
      console.log(product)
      setName(product.name);
      setPrice(product.price.toString());
      setDescription(product.description);
      setImage_url(product.image_url);
      setStock(product.stock.toString());
      setCategory_id(product.category_id.toString());
    }
  }, [product]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedProduct1 = {
        id: product.product_id,
        name,
        price: parseFloat(price),
        description,
        image_url,
        stock: parseInt(stock, 10),
        category_id: parseInt(category_id, 10),
      };
      console.log(updatedProduct1)
      const response = await updateProduct(updatedProduct1);

      if (onProductUpdated) {
        onProductUpdated(response);
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
      console.error('Error updating product:', error);
    }
  };

  return (
    <>
      
        <BiSolidPencil size="30px" onClick={handleShow} className='btnEdit_admin'/>
      

      {show && (
        <div className="modal-backdrop">
          <div className="custom-modal">
            <div className="modal-header">
              <h5 className="modal-title">Editar producto</h5>
              <button type="button" className="close-button" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column align-items-center">
                  <div className="mb-3 text-center">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="URL"
                      value={image_url}
                      onChange={(e) => setImage_url(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Precio"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Descripción"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Categoría"
                      value={category_id}
                      onChange={(e) => setCategory_id(e.target.value)}
                    />
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
