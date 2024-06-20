import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Administrador";
import Card from "./components/Card";
import Catalogo from "./components/CatalogoProductos";
import Footer from "./components/Footer";
import Gmail from "./components/Gmail";
import Login from "./components/Login";
import Register from "./components/Register";
import ShoppingCard from "./components/ShoppingCard";
import NotFound from "./components/Error/NotFound";
import DefaultLayout from "./layouts/DefaultLayout";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <DefaultLayout>
            <Home />
          </DefaultLayout>
          } />
        <Route path="/admin" element={
          <DefaultLayout>
            <Admin />
          </DefaultLayout>
          } />
        <Route path="/card" element={
          <DefaultLayout>
            <Card />
          </DefaultLayout>
          } />
        <Route path="/catalogo" element={
          <DefaultLayout>
            <Catalogo />
          </DefaultLayout>
          } />
        <Route path="/footer" element={
          <DefaultLayout>
            <Footer />
          </DefaultLayout>
          } />
        <Route path="/gmail" element={
          <DefaultLayout>
            <Gmail />
          </DefaultLayout>
          } />
        <Route path="/login" element={
          <DefaultLayout>
            <Login />
          </DefaultLayout>
          } />
        <Route path="/register" element={
          <DefaultLayout>
            <Register />
          </DefaultLayout>
          } />
        <Route path="/shopping-card" element={
          <DefaultLayout>
            <ShoppingCard />
          </DefaultLayout>
          } />
        <Route path="/404" element={
          <DefaultLayout>
            <NotFound />
          </DefaultLayout>
        } />
        <Route path="/*" element={
          <DefaultLayout>
            <NotFound />
          </DefaultLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
