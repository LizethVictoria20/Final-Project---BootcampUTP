import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import api from "../../utils/api.js";
import updateUser from "../AccountSettings/updateUser";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style-perfil.css";

const EditableField = ({
  id,
  label,
  value,
  onChange,
  editableField,
  onEditClick,
  type = "text",
  placeholder,
}) => (
  <div className="form-group mb-3">
    <label htmlFor={id}>{label}</label>
    <div className="input-wrapper d-flex align-items-center">
      <input
        type={type}
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
        disabled={editableField !== id}
        placeholder={placeholder}
      />
      <MdModeEditOutline
        className="edit-icon mx-2"
        onClick={() => onEditClick(id)}
        color="#7429BA"
        fontSize="1.5em"
      />
    </div>
  </div>
);

const AccountSettings = () => {
  const [user, setUser] = useState(null);
  const [editableField, setEditableField] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // Cambiado a null para mejor manejo de estado
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    mail: "",
    username: "",
    password: "",
    profileImageUrl: null, // Cambiado a null para mejor manejo de estado
  });

  const GetUser = async () => {
    setLoading(true);
    try {
      const response = await api.get("users/loginuser");
      if (response.data) {
        setUser(response.data);
        setFormData({
          name: response.data.first_name || "",
          lastname: response.data.last_name || "",
          mail: response.data.email || "",
          username: response.data.username || "",
          password: "",
          profileImageUrl: response.data.image || null, // Cambiado a null para mejor manejo de estado
        });
        setProfileImage(response.data.image || null); // Cambiado a null para mejor manejo de estado
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setErrorMessage("Error fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  const handleEditClick = (field) => {
    setEditableField(field);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setFormData({
        ...formData,
        profileImageUrl: file, // Guarda el archivo en el estado formData
      });
    }
  };

  const handleSave = async () => {
    if (!formData.password) {
      setErrorMessage("Please enter a password.");
      setSuccessMessage("");
      return;
    }
    setErrorMessage("");
    setEditableField(null);
    setLoading(true);

    const updatedUser = {
      username: formData.username,
      first_name: formData.name,
      last_name: formData.lastname,
      email: formData.mail,
      password: formData.password,
    };

    try {
      let imageUrl = formData.profileImageUrl;
      if (typeof formData.profileImageUrl == "object") {
        console.log("entraste ----------------");
        const imageFormData = new FormData();
        imageFormData.append("image", formData.profileImageUrl);

        try {
          const response = await api.post(`images/users`, imageFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response);
          imageUrl = response.data.imagePath;
          setProfileImage(response.data.imagePath);
        } catch (err) {
          console.error("Error uploading image:", err);
          setErrorMessage("Error uploading image.");
          setLoading(false);
          return;
        }
      }

      updatedUser.image = imageUrl;

      const response = await updateUser(updatedUser); // Asegúrate de que esta función esté correctamente implementada
      if (response.data) {
        setUser(response.data);
        setSuccessMessage("Changes saved successfully!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage("There was an error saving the data.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  const handleLogout = async () => {
    window.location.reload(true);
    const response = await api.get("auth/logout");
    console.log(response);
  };

  return (
    <div className="account-settings-wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="account-settings-container p-4">
        <div className="banner-profile position-relative"></div>
        <img
          src={profileImage || "/default-profile-image.jpg"} // Coloca una imagen predeterminada si profileImage es null
          alt="Profile"
          className="profile-picture rounded-circle shadow"
        />
        <label
          htmlFor="profileImageFile"
          className="upload-icon position-absolute"
        >
          <p className="change-img">Cambiar imagen</p>
        </label>
        <input
          type="file"
          id="profileImageFile"
          className="d-none"
          onChange={handleFileChange}
        />

        <div className="container text-center">
          <div className="title-account_setting">
            <IoShieldCheckmarkSharp className="settingsshield" fontSize="2em" />
            <h2 className="account-settings-title mb-0">Account Settings</h2>
          </div>
          <div className="row container-account">
            <div className="col">
              <div className="col-md-4 col-sm-12 button-container">
                <button className="button-perfil">
                  <Link to="/historial">
                    <GiShoppingBag className="iconos" color="#7429BA" /> My
                    Shopping
                  </Link>
                </button>

                <button className="button-perfil" onClick={handleLogout}>
                  <Link to="/">
                    <BiLogOut className="iconos" color="#7429BA" /> Logout
                  </Link>
                </button>
              </div>
            </div>
            <div className="col order-5">
              <form className="account-settings-form" onSubmit={handleSubmit}>
                <EditableField
                  id="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  editableField={editableField}
                  onEditClick={handleEditClick}
                  placeholder={user ? user.first_name : ""}
                />
                <EditableField
                  id="lastname"
                  label="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  editableField={editableField}
                  onEditClick={handleEditClick}
                  placeholder={user ? user.last_name : ""}
                />
                <EditableField
                  id="username"
                  label="Username"
                  value={formData.username}
                  onChange={handleChange}
                  editableField={editableField}
                  onEditClick={handleEditClick}
                  placeholder={user ? user.username : ""}
                />
                <EditableField
                  id="mail"
                  label="Email"
                  value={formData.mail}
                  onChange={handleChange}
                  editableField={editableField}
                  onEditClick={handleEditClick}
                  type="email"
                  placeholder={user ? user.email : ""}
                />
                <EditableField
                  id="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  editableField="password"
                  onEditClick={handleEditClick}
                  type="password"
                  placeholder="Enter your password"
                />
                <button type="submit" className="btn-save_changes">
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                {successMessage && (
                  <div className="alert alert-success mt-3">
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="alert alert-danger mt-3">{errorMessage}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
