import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AccountSettings.css";
import api from "../../http/index";
import updateUser from "./updateUser.js";

const AccountSettings = () => {
  const [user, setUser] = useState(null);
  const [editableField, setEditableField] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    mail: "",
    username: "",
    password: "",
    profileImageUrl: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState('');


  const GetUser = () => {
    api
      .get("users/loginuser")
      .then((response) => {
        if (response.data) {
          setUser(response.data);
          setFormData({
            name: response.data.first_name || "",
            lastname: response.data.last_name || "",
            mail: response.data.email || "",
            username: response.data.username || "",
            password: "",
            profileImageUrl: response.data.image || "",
          });
          setProfileImage(response.data.image || "");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
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

  const handleSave = async () => {
    if (!formData.password) {
      setErrorMessage("Please enter a password.");
      return;
    }

    setEditableField(null);

    const updatedUser = {
      username: formData.username,
      first_name: formData.name,
      last_name: formData.lastname,
      email: formData.mail,
      password: formData.password,
      image: formData.profileImageUrl,
    };

    try {
      const response = await updateUser(updatedUser);
      if (response.data) {
        setUser(response.data);
        setProfileImage(response.data.image || "");
        setSuccessMessage("Información actualizada exitosamente");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("No se pudo actualizar la información");
    }
  };

  return (
    <div className="account-settings-wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="account-settings-container p-4 bg-white rounded shadow">
        <div className="title-container d-flex align-items-center justify-content-center mb-3">
          <IoShieldCheckmarkSharp className="settingsshield" fontSize="2em" />
          <h2 className="account-settings-title mb-0">Account Settings</h2>
        </div>

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        <div className="profile-picture-container position-relative mb-3">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-picture rounded-circle border border-primary"
          />
          <label
            htmlFor="profileImageUrl"
            className="upload-icon position-absolute top-0 end-0"
          >
            <MdModeEditOutline color="#7429BA" fontSize="1.5em" />
          </label>
        </div>
        <form className="account-settings-form">
          <div className="form-group mb-3">
            <label htmlFor="profileImageUrl">Profile Image URL</label>
            <input
              type="text"
              className="form-control"
              id="profileImageUrl"
              value={formData.profileImageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <div className="input-wrapper d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.name}
                onChange={handleChange}
                disabled={editableField !== "name"}
                placeholder={user ? user.first_name : ""}
              />
              <MdModeEditOutline
                className="edit-icon ms-2"
                onClick={() => handleEditClick("name")}
                color="#7429BA"
                fontSize="1.5em"
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="lastname">Last Name</label>
            <div className="input-wrapper d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                id="lastname"
                value={formData.lastname}
                onChange={handleChange}
                disabled={editableField !== "lastname"}
                placeholder={user ? user.last_name : ""}
              />
              <MdModeEditOutline
                className="edit-icon ms-2"
                onClick={() => handleEditClick("lastname")}
                color="#7429BA"
                fontSize="1.5em"
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="username">User Name</label>
            <div className="input-wrapper d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                id="username"
                value={formData.username}
                onChange={handleChange}
                disabled={editableField !== "username"}
                placeholder={user ? user.username : ""}
              />
              <MdModeEditOutline
                className="edit-icon ms-2"
                onClick={() => handleEditClick("username")}
                color="#7429BA"
                fontSize="1.5em"
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="mail">Mail</label>
            <div className="input-wrapper d-flex align-items-center">
              <input
                type="email"
                className="form-control"
                id="mail"
                value={formData.mail}
                onChange={handleChange}
                disabled={editableField !== "mail"}
                placeholder={user ? user.email : ""}
              />
              <MdModeEditOutline
                className="edit-icon ms-2"
                onClick={() => handleEditClick("mail")}
                color="#7429BA"
                fontSize="1.5em"
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper d-flex align-items-center">
              <input
                type="password"
                className="form-control"
                id="password"
                value={formData.password}
                onChange={handleChange}
                disabled={editableField !== "password"}
                placeholder="***********"
                required
              />
              <MdModeEditOutline
                className="edit-icon ms-2"
                onClick={() => handleEditClick("password")}
                color="#7429BA"
                fontSize="1.5em"
              />
            </div>
          </div>

          <button
            type="button"
            className="btn save-button w-100"
            onClick={handleSave}
          >
            Save
          </button>
        </form>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default AccountSettings;
