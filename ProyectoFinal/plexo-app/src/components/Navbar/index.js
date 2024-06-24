import LogoPurple from "../../assets/images/logo-purple.jpeg";
import { FaShoppingBag } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style-navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-main">
      <div className="container-fluid container-nav_bar">
        {/* Desplegable */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="col-7 d-flex align-items-center img-logo">
          <Link to="/">
            <img src={LogoPurple} alt="Logo" className="navbar-logo" />
          </Link>
        </div>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 items-navbar">
            <li className="nav-item">
              <Link className="nav-link" to="/shopping-card">
                <FaShoppingBag color="#7429ba" fontSize="2em" />
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <FaUserCircle color="#7429ba" fontSize="2em" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
