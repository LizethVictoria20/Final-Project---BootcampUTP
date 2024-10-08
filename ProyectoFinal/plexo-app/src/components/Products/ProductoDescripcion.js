import React, { useState, useEffect } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import api from "../../utils/api.js";
import "./style-product.css";

function ProductoDescripcion() {
  const { product_id } = useParams();
  const [producto, setProducto] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const GetUser = () => {
    api
      .get("/users/loginuser")
      .then((response) => {
        setIsUser(true);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setIsUser(false);
      });
  };

  const incrementQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };
  const decrementQuantity = () => {
    setQuantity((quantity) => quantity - 1);
  };

  const handleReturn = () => {
    window.history.back();
  };

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        const allProducts = response.data;
        setAllProducts(allProducts);
        console.log(allProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    GetUser();

    api
      .get(`products/${product_id}`)
      .then((response) => {
        setProducto(response.data.product);
      })
      .catch((error) => {
        console.error("Error fetching producto:", error);
      });
  }, [product_id]);

  if (!producto) return <div>Loading...</div>;

  const handleAddToCart = () => {
    if (isUser) {
      api
        .post("carts/items", { productName: producto.name, quantity: 1 })
        .then(() => {
          setMessage("Producto agregado");
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error adding product to cart:", error);
        });
    } else {
      setMessage("Debe iniciar sesión antes de agregar productos al carrito");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };
  console.log(allProducts);
  return (
    <>
      <IoIosArrowBack
        className="back-button"
        color="#7429BA"
        size={60}
        onClick={handleReturn}
      />
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={producto.image_url}
              className="product-detail-image"
              alt={"product"}
            />
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{producto.name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>
            {producto.details}
            {producto.description || "Description not available"}
          </p>
          <p className="price">${producto.price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decrementQuantity}>
                <AiOutlineMinus />
              </span>
              <span className="num">{quantity}</span>
              <span className="plus" onClick={incrementQuantity}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            {showMessage && (
              <div
                className={` ${
                  isUser
                    ? "alert alert-success mt-3 text-black"
                    : "alert alert-warning mt-3 text-black"
                }`}
              >
                {message}
              </div>
            )}
            <button type="button" className="buy-now">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {allProducts?.map((item) => (
              <div className="product-card" key={item.product_id}>
                <img
                  src={item.image_url}
                  width={250}
                  height={250}
                  className="product-image"
                  alt={item.name}
                />
                <p className="product-name">{item.name}</p>
                <p className="product-price">${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="container container-productos">
        <div className="row mb-4 bg-white container-products-description mx-auto">
          <div className="col-md-12 d-flex justify-content-end">
          <button className="btn button-return" onClick={handleReturn}>
          <IoIosReturnLeft color='#7429ba'/>
          </button>
          </div>
          <div className="col-md-6 ">
            <img
              src={producto.image_url || ""}
              className="container-img-product"
              alt={producto.name || ""}
            />
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center text-black">
            <h1 className="product-name">
              {producto.name || "Name not available"}
            </h1>
            <h6 className="details">Details: </h6>
            <p className="product-description">
              {producto.name}
              {producto.description || "Description not available"}
            </p>
            <h4>${producto.price || "Price not available"}</h4>
            <div className="mt-3">
              <div className="d-flex gap-3">
                <FaPlusCircle
                  fontSize="1.9em"
                  color="black"
                  style={{ cursor: "pointer" }}
                  onClick={handleAddToCart}
                />
                <p className="text-black">Agregar al carrito</p>
              </div>
              {showMessage && (
                <div
                  className={` ${
                    isUser
                      ? "alert alert-success mt-3 text-black"
                      : "alert alert-warning mt-3 text-black"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default ProductoDescripcion;
