import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Administrador";
import Card from "./components/Card";
import Catalogo from "./components/CatalogoProductos";
import Footer from "./components/Footer";
import Gmail from "./components/Gmail";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import ShoppingCart from "./components/ShoppingCard/ShoppingCart";
import Perfil from "./components/Perfil";
import NotFound from "./components/Error/NotFound";
import Shipping from "./components/Shipping";
import Setting from "./components/AccountSettings/AccountSettings";
import PaymentSuccess from "./components/PaymentSuccess/PaymentSuccess.js";
import PaymentFailed from "./components/PaymentFailed/PaymentFailed.js";
import Product from "./components/Products/index";
import ProductoDescripcion from "./components/Products/ProductoDescripcion";
// import Product from "./components/Products";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/card" element={<Card />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/gmail" element={<Gmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shopping-card" element={<ShoppingCart />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<PaymentFailed />} />
        <Route path="/product" element={<Product />} />
        <Route exact path="/product" element={Product} />
        <Route
          exact
          path="/product/:product_id"
          element={ProductoDescripcion}
        />
      </Routes>
    </Router>
  );
}

export default App;
