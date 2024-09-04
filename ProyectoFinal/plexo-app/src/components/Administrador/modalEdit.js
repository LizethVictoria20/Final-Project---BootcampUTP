import React, { useState, useEffect } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { updateProduct } from "./AdminCrud"; // Asegúrate de importar correctamente tu función de actualización
import "./stylesheet.css";
import api from "../../utils/api.js";

function ModalComponentEdit({ product, onProductUpdated }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [stock, setStock] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [File, setFile] = useState(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price ? product.price.toString() : ""); // Add null check
      setDescription(product.description);
      setImageUrl(product.image_url);
      setStock(product.stock ? product.stock.toString() : ""); // Add null check
      setCategoryId(product.category_id ? product.category_id.toString() : ""); // Add null check
      setPreview(product.image_url);
    }
  }, [product]);

  const handleClose = () => {
    setShow(false);
    setErrors({});
  };

  const handleShow = () => setShow(true);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "El nombre es obligatorio.";
    if (!price || isNaN(price)) newErrors.price = "Debe ser un número válido.";
    if (!description || description.length < 10)
      newErrors.description = "Debe tener al menos 10 caracteres.";
    if (!image_url) newErrors.image_url = "Ingresa una imagen";
    if (!stock || isNaN(stock)) newErrors.stock = "Debe ser un número válido.";
    if (!category_id || isNaN(category_id))
      newErrors.category_id = "Debe ser un número válido.";
    return newErrors;
  };

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
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
    if (File) {
      const formData = new FormData();
      formData.append("image", File);
      console.log(formData);
      try {
        const response = await api.post(`images/users`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setImageUrl(response.data.imagePath);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setErrors({ image_url: "Invalid image format" });
        } else {
          setErrors({ general: "Error uploading image" });
        }
        return;
      }
    }
    try {
      const putProduct = {
        id: product.product_id,
        name,
        price: parseFloat(price), // Add validation for price
        description,
        image_url,
        stock: parseInt(stock, 10), // Add validation for stock
        category_id: parseInt(category_id, 10), // Add validation for category_id
      };

      const response = await updateProduct(putProduct);
      if (response) {
        if (onProductUpdated) {
          onProductUpdated();
        }
        setErrors({});
        handleClose();
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setErrors({ general: "Error al actualizar el producto." });
    }
  };

  return (
    <>
      <BiSolidPencil
        size="30px"
        onClick={handleShow}
        className="btnEdit_admin"
      />
      {show && (
        <div className="modal-backdrop">
          <div className="custom-modal">
            <div className="modal-header">
              <h5 className="modal-title">Editar producto</h5>
              <button
                type="button"
                className="close-button"
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              {errors.general && (
                <div className="alert alert-danger">{errors.general}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column align-items-center">
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
                  <div className="mb-3 w-100">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Precio"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.price && (
                      <div className="text-danger">{errors.price}</div>
                    )}
                  </div>
                  <div className="mb-3 w-100">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                    {errors.stock && (
                      <div className="text-danger">{errors.stock}</div>
                    )}
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Descripción"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                      <div className="text-danger">{errors.description}</div>
                    )}
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Categoría"
                      value={category_id}
                      onChange={(e) => setCategoryId(e.target.value)}
                    />
                    {errors.category_id && (
                      <div className="text-danger">{errors.category_id}</div>
                    )}
                  </div>

                  <div
                    className={`upload-button-container mb-3 w-100 ${
                      dragging ? "dragging" : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <label htmlFor="file-upload" className="upload-label">
                      <div className="upload-design">
                        {preview ? (
                          <img
                            src={preview}
                            alt="Preview"
                            className="preview-image"
                          />
                        ) : (
                          <>
                            <svg viewBox="0 0 640 512" className="upload-icon">
                              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
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

                  <button type="submit" className="btn btn-primary">
                    Actualizar Producto
                  </button>
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
