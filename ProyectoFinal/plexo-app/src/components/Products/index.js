import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

    const Products = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1); // Estado para la cantidad de productos

    useEffect(() => {
        fetch("https://final-project-bootcamputp.onrender.com/api/products/4")
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            if (typeof data === "object" && data.product) {
            setProduct(data.product);
            } else {
            throw new Error("Data received is not in expected format");
            }
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching product:", error);
            setError(error);
            setLoading(false);
        });
    }, []);

    const handleDecrease = () => {
        if (quantity > 1) {
        setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
        <div className="container mt-5">
            <div className="row mb-4">
            <div className="col-md-6">
                <img
                src={product.image_url || ""}
                className="img-fluid"
                alt={product.name || ""}
                />
            </div>

            <div className="col-md-6 d-flex flex-column justify-content-center">
                <h1 className="product-name">
                {product.name || "Name not available"}
                </h1>
                <h5 className="product-stars">★★★★☆</h5>
                <h6 className="details">Details: </h6>
                <p className="product-description">
                {product.description || "Description not available"}
                </p>
                <h4>${product.price || "Price not available"}</h4>

                <div className="mt-3 d-flex align-items-center">
                <div className="d-flex align-items-center">
                    <span className="me-2">Quantity:</span>
                    <button
                    className="btn btn-secondary me-2"
                    onClick={handleDecrease}
                    >
                    -
                    </button>
                    {quantity}
                    <button
                    className="btn btn-secondary ms-2"
                    onClick={handleIncrease}
                    >
                    +
                    </button>
                </div>
                </div>

                <div className="mt-3">
                <button className="btn btn-outline-primary me-2">
                    Add to Cart
                </button>
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
            </div>
        </div>
        </>
    );
    };

    export default Products;
