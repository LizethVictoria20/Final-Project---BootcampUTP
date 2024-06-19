import LogoPurple from "../../assets/images/logo-purple.jpeg";
import { FaShoppingBag } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import "./style.css";

function Navbar() {
  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <div className="navbar-header">
          {/* button para menú colapsado */}
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <form className="navbar-form navbar-left">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/">
                <img className="logo-navbar" src={LogoPurple} alt="" />{" "}
              </a>
            </li>
            <li className="dropdown d-flex flex-row">
              <a href="/">
                <FaShoppingBag />
              </a>
              <a href="/"><FaUserCircle /></a>
              <ul className="dropdown-menu">
                <li>
                  <a href="/">Action</a>
                </li>
                <li>
                  <a href="/">Another action</a>
                </li>
                <li>
                  <a href="/">Something else here</a>
                </li>
                <li role="separator" className="divider"></li>
                <li>
                  <a href="/">Separated link</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
