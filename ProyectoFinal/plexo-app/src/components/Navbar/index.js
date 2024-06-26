import LogoPurple from "../../assets/images/logo-purple.jpeg";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "./style-navbar.css";
import { UserContext } from "../ContextUser/context-user.jsx"; // Asegúrate de que esta ruta sea correcta

function Navbar({ admin }) {
  //Paso el contexto al estado
  const { authState } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white custom-navbar">
      <div className="container-fluid custom-container-nav_bar">
        <div className="d-flex align-items-center custom-img-logo">
          <Link to="/">
            <img src={LogoPurple} alt="Logo" className="custom-navbar-logo" />
          </Link>
        </div>
        <div className="navbar-nav ms-auto custom-items-navbar">
          {!authState.isAuthenticated && !authState.isRegistered && (
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
          {authState.isAuthenticated && authState.isRegistered && (
            <>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/admin">
                  Admin
                </Link>
              </li>
            </>
          )}
          {!authState.isAuthenticated && authState.isRegistered && (
            <>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/admin">
                  AutenNoRgi
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link className="nav-link custom-nav-link" to="/shopping-card">
              <CiShoppingCart className="custom-menu-icon" color="#7429BA" />
            </Link>
          </li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
