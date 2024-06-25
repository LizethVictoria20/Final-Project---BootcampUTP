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

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="myprofile-header">
          <h2>
            <MdAccountCircle color="#7429BA" fontSize="1em" />
            My Profile
          </h2>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12 button-container">
            <button className="btn-custom mb-2 bg-white button-perfil">
              <Link to="/">
                <FaHeart className="iconos" /> My Favourites
              </Link>
            </button>

            <button className="btn-custom mb-2 bg-white button-perfil">
              <Link to="/shopping-card">
                <GiShoppingBag className="iconos" /> My Shopping
              </Link>
            </button>

            <button className="btn-custom mb-2 bg-white button-perfil">
              <Link to="/setting">
                <MdAdminPanelSettings className="iconos" /> Account Settings
              </Link>
            </button>

            <button className="btn-custom mb-2 bg-white button-perfil">
              <Link to="/">
                <BiLogOut className="iconos" /> Logout
              </Link>
            </button>
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="profile-section profile-form">
              <form className="container-form">
                <div className="form-group form-info">
                  <div>{user.first_name}</div>
                </div>
                <div className="form-group form-info">
                  <div>{user.last_name}</div>
                </div>
                <div className="form-group form-info">
                  <div>{user.username}</div>
                </div>
                <div className="form-group form-info">
                  <div>{user.email}</div>
                </div>
                <div className="form-group form-info">
                  <div>***********</div>
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
