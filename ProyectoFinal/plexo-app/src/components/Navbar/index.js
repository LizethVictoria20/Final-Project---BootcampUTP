import LogoPurple from "../../assets/images/logo-purple.jpeg";
import { FaShoppingBag } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style-navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white custom-navbar">
      <div className="container-fluid custom-container-nav_bar">
        <div className="d-flex align-items-center custom-img-logo">
          <Link to="/">
            <img src={LogoPurple} alt="Logo" className="custom-navbar-logo" />
          </Link>
        </div>
        <div className="navbar-nav ms-auto custom-items-navbar">
          <li className="nav-item">
            <Link className="nav-link custom-nav-link" to="/shopping-card">
              <FaShoppingBag className="custom-menu-icon" color="#7429BA" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link" to="/login">
              <FaUserCircle className="custom-menu-icon" color="#7429BA" />
            </Link>
          </li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
