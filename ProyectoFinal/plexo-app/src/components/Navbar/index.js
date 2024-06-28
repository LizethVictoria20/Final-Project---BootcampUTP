import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "./style-navbar.css";
import { UserContext } from "../ContextUser/context-user.jsx";

function Navbar({ admin }) {
  // Paso el contexto al estado
  const { authState, logout } = useContext(UserContext);
  const { isAdmin } = authState;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white custom-navbar">
      <div className="container-fluid custom-container-nav_bar">
        <div className="d-flex align-items-center custom-img-logo">
          <Link to="/">
            <img src='https://i.ibb.co/D5hj0xf/Logo-PNGplexo.png' alt="Logo" className="custom-navbar-logo" />
          </Link>
        </div>
        <ul className="navbar-nav ms-auto custom-items-navbar">
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
                <Link className="nav-link custom-nav-link" to="/shopping-cart">
                  <CiShoppingCart color="#7429ba" fontSize="2rem" />
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
                <Link className="nav-link custom-nav-link" to="/perfil">
                  Perfil
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/shopping-cart">
                  <CiShoppingCart color="#7429ba" fontSize="2rem" />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
