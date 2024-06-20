import Axios from "axios";
import { useState, useEffect } from "react";
import Card from "../Card/index";
import Navbar from "../Navbar/index";

function Catalogo() {
  const [product, setProduct] = useState([]);

  const getProducts = async () => {
    try {
      const response = await Axios.get(
        "https://final-project-bootcamputp.onrender.com/api/products"
      ).then((data) => {
        setProduct(data);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Navbar />
      <Card product={product} />
    </>
  );
}

export default Catalogo;
