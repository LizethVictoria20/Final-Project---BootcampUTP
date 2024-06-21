import React from "react";
import { FaHeart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import './signin.css';
import Logo from './img/logoTienda.png';

function Perfil() {
    return (
        <div>

            {/* Navbar */}
            <nav className="navbar-custom">

                <div className="nav-icons">
                    <img src={Logo} alt="Logo" />
                </div>


                <div className="nav-links">
                    <a href="#!" className="nav-link">
                        <GiShoppingBag className="icono-shopp" />
                    </a>
                    <a href="#!" className="nav-link">
                        <FaUser className="icono-user" />
                    </a>
                </div>
            </nav>

            {/* Profile Content */}
            <div className="profile-container">
                <div className="myprofile-header">
                    <img src="https://via.placeholder.com/100" alt="Profile Picture" />
                    <h2>My Profile</h2>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-section">
                            <button className="btn btn-custom mb-2">
                                <FaHeart className="dos" />     My Favourites
                            </button>
                            <button className="btn btn-custom mb-2">
                                <GiShoppingBag className="dos"  />    My Shopping
                            </button>
                            <button className="btn btn-custom mb-2">
                                <MdAdminPanelSettings className="iconos" />   Account Settings
                            </button>
                            <button className="btn btn-custom mb-2">
                                <BiSupport className="iconos"  />   Technical Support
                            </button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="profile-section profile-form">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name" className="label-custom">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username" className="label-custom">User Name</label>
                                    <input type="text" className="form-control" id="username" placeholder="User Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address" className="label-custom">Address</label>
                                    <input type="text" className="form-control" id="address" placeholder="Example Address, #00 - 0, Country" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact" className="label-custom">Contact Number</label>
                                    <input type="text" className="form-control" id="contact" placeholder="+0 000 000 000" />
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




