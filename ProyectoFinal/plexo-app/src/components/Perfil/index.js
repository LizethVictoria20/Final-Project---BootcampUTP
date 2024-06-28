import { React, useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import Navbar from "../Navbar/index";
import api from "../../http/index";
import "./style-perfil.css";

function Perfil() {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    mail: "",
    username: "",
    password: "",
  });

  const GetUser = () => {
    api
      .get("users/loginuser")
      .then((response) => {
        setUser(response.data);
        setFormData({
          name: response.data.first_name,
          lastname: response.data.last_name,
          mail: response.data.email,
          username: response.data.username,
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  useEffect(() => {
    GetUser();
  }, []);

  const handleLogout = async () => {
    window.location.reload(true);
    const response = await api.get("auth/logout");
    console.log(response);
  };
  return (
    <>
      <div className="profile-container">
        <div className="myprofile-header">
          <h2>My Profile</h2>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12 button-container">
            <button className="btn-custom mb-2 bg-white button-perfil">
              <Link to="/historial">
                <GiShoppingBag className="iconos" color="#7429BA" /> My Shopping
              </Link>
            </button>

            <button className="btn-custom mb-2 bg-white button-perfil">
              <Link to="/settingUserPlexo">
                <MdAdminPanelSettings className="iconos" color="#7429BA" />{" "}
                Account Settings
              </Link>
            </button>

            <button
              className="btn-custom mb-2 bg-white button-perfil"
              onClick={handleLogout}
            >
              <Link to="/">
                <BiLogOut className="iconos" color="#7429BA" /> Logout
              </Link>
            </button>
          </div>
          <div className="col-md-8 ">
            <div className="profile-section profile-form">
              <form className="container-form">
                <img
                  src={user.image}
                  alt="Imagen de perfil"
                  className="image-profile-perfil"
                />
                <div className="form-group form-info">
                  <label className="label-custom">
                    <b>Name: </b>
                  </label>
                  <div className="form-value">{user.first_name}</div>
                </div>
                <div className="form-group form-info">
                  <label className="label-custom">
                    <b>Last Name:</b>
                  </label>
                  <div className="form-value">{user.last_name}</div>
                </div>
                <div className="form-group form-info">
                  <label className="label-custom">
                    <b>Username:</b>
                  </label>
                  <div className="form-value">{user.username}</div>
                </div>
                <div className="form-group form-info">
                  <label className="label-custom">
                    <b>Email:</b>
                  </label>
                  <div className="form-value">{user.email}</div>
                </div>
                <div className="form-group form-info">
                  <label className="label-custom">
                    <b>Password:</b>
                  </label>
                  <div className="form-value">***********</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
