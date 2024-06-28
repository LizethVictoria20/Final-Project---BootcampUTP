import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AccountSettings.css";
import api from "../../http/index";
import updateUser from "./updateUser.js";

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
  const [profileImage, setProfileImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    mail: "",
    username: "",
    password: "",
    profileImageUrl: "",
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
          profileImageUrl: response.data.image || "",
        });
        setProfileImage(response.data.image || "");
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setFormData({
          ...formData,
          profileImageUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
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
      image: formData.profileImageUrl,
    };

    try {
      const response = await updateUser(updatedUser);
      if (response.data) {
        setUser(response.data);
        setProfileImage(response.data.image || "");
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

  return (
    <div className="account-settings-wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="account-settings-container p-4 bg-white rounded shadow">
        <div className="title-container d-flex align-items-center justify-content-center mb-3">
          <IoShieldCheckmarkSharp className="settingsshield" fontSize="2em" />
          <h2 className="account-settings-title mb-0">Account Settings</h2>
        </div>
        <div className="profile-picture-container position-relative mb-3">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-picture rounded-circle border border-primary"
          />
          <label
            htmlFor="profileImageFile"
            className="upload-icon position-absolute"
          >
            <MdModeEditOutline
              className="edit-icon"
              color="#7429BA"
              fontSize="1.5em"
            />
          </label>
          <input
            type="file"
            id="profileImageFile"
            className="d-none"
            onChange={handleFileChange}
          />
        </div>
        <form className="account-settings-form">
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
            label="User Name"
            value={formData.username}
            onChange={handleChange}
            editableField={editableField}
            onEditClick={handleEditClick}
            placeholder={user ? user.username : ""}
          />
          <EditableField
            id="mail"
            label="Mail"
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
            editableField={editableField}
            onEditClick={handleEditClick}
            type="password"
            placeholder="***********"
          />

          {loading && <div className="alert alert-info">Loading...</div>}
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <button
            type="button"
            className="btn save-button w-100"
            onClick={handleSave}
            disabled={loading}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
