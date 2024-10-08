import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../utils/context-user.jsx";
import { CiShoppingBasket } from "react-icons/ci";
import LogoPurple from "../../assets/images/logo-purple.jpeg";
import "./style-navbar.css";

function Navbar({ admin }) {
  const { authState, logout } = useContext(UserContext);
  const { isAdmin } = authState;

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
                <Link className="nav-link custom-nav-link" to="/catalogoPlexo">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/loginUserPlexo">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link custom-nav-link"
                  to="/registerUserPlexo"
                >
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link>
                  <CiShoppingBasket color="#6c6c6c" size={30} />
                </Link>
              </li>
            </>
          )}
          {authState.isAuthenticated && !authState.isAdmin && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link custom-nav-link"
                  to="/perfilUserPlexo"
                >
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
                <Link
                  className="nav-link custom-nav-link"
                  to="/perfilUserPlexo"
                >
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
