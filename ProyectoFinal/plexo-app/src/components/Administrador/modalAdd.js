import { AddProduct } from './AdminCrud';
import './stylesheet.css';
import React, { useState } from 'react';
import './stylesheet.css';
import { FaCirclePlus } from "react-icons/fa6";
import axios from 'axios';

function ModalComponent() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const AddProductForm = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('')
    const [image_url, setImage_url] = useState('')
    const [stock, setStock] = useState('')
    const [category_id, setCategory_id] = useState('')
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        // Realiza la solicitud POST para agregar un nuevo producto
        const response = await axios.post('https://final-project-bootcamputp.onrender.com/api/products', {
          name,
          price: parseFloat(price)  // Asegura que el precio sea un número (suponiendo que price es un campo numérico)
        });
  
        // Llama a la función de devolución de llamada para manejar la respuesta
        if (onProductAdded) {
          onProductAdded(response.data); // Envia el nuevo producto de vuelta al componente principal
        }
  
        // Limpia el formulario después de agregar el producto
        setName('');
        setPrice('');
        setDescription('');
        setImage_url('');
        setStock('');
        setCategory_id('')
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
      <FaCirclePlus size="30px" />
      </button>

      {show && (
        <div className="modal-backdrop">
          <div className="custom-modal">
            <div className="modal-header">
              <h5 className="modal-title">Nuevo producto</h5>
              <button type="button" className="close-button" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body">
              <form>
                <div className="d-flex flex-column align-items-center">
                  <div className="mb-3 text-center">
                    <input type="text" className="form-control" placeholder="url" 
                      id="url"
                      value={image_url}
                      onChange={(e) => setImage_url(e.target.value)}
                      required/>  
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Nombre" 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required />
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input type="number" className="form-control" placeholder="Precio" 
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required/>
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input type="number" className="form-control" placeholder="Stock" 
                      id="stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required/>
                  </div>
                  <div className="mb-3">
                  <div className="mb-3 d-flex gap-2">
                    <input type="text" className="form-control" placeholder="Description" 
                      id="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required/>
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input type="number" className="form-control" placeholder="Precio" 
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required/>
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input type="number" className="form-control" placeholder="Categoria" 
                      id="category_id"
                      value={category_id}
                      onChange={(e) => setCategory_id(e.target.value)}
                      required/>
                  </div>
                  <button type="submit">Agregar Producto</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={AddProduct}>Agregar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
}


export default ModalComponent;




























// const AddProductForm = ({ onProductAdded }) => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('')
//   const [image_url, setImage_url] = useState('')
//   const [stock, setStock] = useState('')
//   const [category_id, setCategory_id] = useState('')

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // Realiza la solicitud POST para agregar un nuevo producto
//       const response = await axios.post('https://final-project-bootcamputp.onrender.com/api/products', {
//         name,
//         price: parseFloat(price)  // Asegura que el precio sea un número (suponiendo que price es un campo numérico)
//       });

//       // Llama a la función de devolución de llamada para manejar la respuesta
//       if (onProductAdded) {
//         onProductAdded(response.data); // Envia el nuevo producto de vuelta al componente principal
//       }

//       // Limpia el formulario después de agregar el producto
//       setName('');
//       setPrice('');
//       setDescription('');
//       setImage_url('');
//       setStock('');
//       setCategory_id('')
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };


//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Agregar Nuevo Producto</h2>
//       <div>
//         <label htmlFor="name">Nombre:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="description">Description:</label>
//         <input
//           type="text"
//           id="description"
//           value={description}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="price">Precio:</label>
//         <input
//           type="number"
//           id="price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           step="0.01" // Ajusta el paso según tus necesidades (puede ser opcional)
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="stock">Stock:</label>
//         <input
//           type="number"
//           id="stock"
//           value={stock}
//           onChange={(e) => setPrice(e.target.value)}
//           step="0.01" // Ajusta el paso según tus necesidades (puede ser opcional)
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="image_url">Image:</label>
//         <input
//           type="text"
//           id="image_url"
//           value={image_url}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="category_id">category_id:</label>
//         <input
//           type="text"
//           id="category_id"
//           value={category_id}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Agregar Producto</button>
//     </form>
// }