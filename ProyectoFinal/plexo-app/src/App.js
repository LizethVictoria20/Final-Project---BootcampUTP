import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Administrador";
import Card from "./components/Card";
import Catalogo from "./components/CatalogoProductos";
import Login from "./components/Login/login.jsx";
import Register from "./components/Register/register.jsx";
import ShoppingCart from "./components/ShoppingCard/ShoppingCart";
import Perfil from "./components/Perfil";
import NotFound from "./components/Error/NotFound";
import Shipping from "./components/Shipping";
import Setting from "./components/AccountSettings/AccountSettings";
import PaymentSuccess from "./components/PaymentSuccess/PaymentSuccess.js";
import PaymentFailed from "./components/PaymentFailed/PaymentFailed.js";
import AuthProvider from "./components/ContextUser/context-user.jsx";
import Navbar from "./components/Navbar/index";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/card" element={<Card />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/erro-404" element={<NotFound />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
