import React from "react";
import { FaHeart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import Navbar from "../Navbar/index";
import "./style.css";

function Perfil() {
  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="myprofile-header">
          <h2><MdAccountCircle color="#7429BA" fontSize="1em"/>My Profile</h2>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12 button-container">
            <button className="btn btn-custom mb-2">
              <FaHeart className="iconos" /> My Favourites
            </button>
            <button className="btn btn-custom mb-2 button-logomyshipping">
              <Link to='/myshipping' className="logo-myshipping">
              <GiShoppingBag className="iconos" /> My Shopping
              </Link>
            </button>
            <button className="btn btn-custom mb-2 button-logo-accountsettings">
              <Link to='/accountsettings' className="logo-accountsettings">
              <MdAdminPanelSettings className="iconos" /> Account Settings
              </Link>
            </button>
            <button className="btn btn-custom mb-2 button-logo-logout">
              <Link to="/" className="logo-logout">
                <BiLogOut className="iconos" /> Logout
              </Link>
            </button>
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="profile-section profile-form">
              <form>
                <div className="form-group">
                  <label htmlFor="name" className="label-custom">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username" className="label-custom">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="User Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address" className="label-custom">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Example Address, #00 - 0, Country"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact" className="label-custom">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact"
                    placeholder="+0 000 000 000"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
