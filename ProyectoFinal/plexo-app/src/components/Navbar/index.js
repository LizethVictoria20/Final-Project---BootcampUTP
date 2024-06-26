import LogoPurple from "../../assets/images/logo-purple.jpeg";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "./style-navbar.css";
import { UserContext } from "../ContextUser/context-user.jsx";

function Navbar({ admin }) {
  // Paso el contexto al estado
  const { authState } = useContext(UserContext);
  const { role } = authState;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white custom-navbar">
      <div className="container-fluid custom-container-nav_bar">
        <div className="d-flex align-items-center custom-img-logo">
          <Link to="/">
            <img src={LogoPurple} alt="Logo" className="custom-navbar-logo" />
          </Link>
        </div>
        <div className="navbar-nav ms-auto custom-items-navbar">
          {!authState.isAuthenticated && (
            <>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
          {authState.isAuthenticated && !authState.isAdmin && (
            <>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/perfil">
                  Perfil
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/cart">
                  Cart
                  <CiShoppingCart />
                </Link>
              </li>
            </>
          )}
          {authState.isAuthenticated && authState.isAdmin && (
            <>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/admin">
                  Admin Panel
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/cart">
                  Carrito
                </Link>
              </li>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
