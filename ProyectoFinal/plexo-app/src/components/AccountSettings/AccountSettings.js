import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AccountSettings.css';

const AccountSettings = () => {
  const [editableField, setEditableField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    mail: '',
    username: '',
    password: ''
  });
  const [profileImage, setProfileImage] = useState('https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg');

  const handleEditClick = (field) => {
    setEditableField(field);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSave = () => {
    setEditableField(null);
    console.log('Saved data:', formData);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="account-settings-wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="account-settings-container p-4 bg-white rounded shadow">
        <div className="title-container d-flex align-items-center justify-content-center mb-3">
          <IoShieldCheckmarkSharp className='settingsshield' fontSize='2em' />
          <h2 className="account-settings-title mb-0">Account Settings</h2>
        </div>
        
        <div className="profile-picture-container position-relative mb-3">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-picture rounded-circle border border-primary"
          />
          <label htmlFor="upload-image" className="upload-icon position-absolute top-0 end-0">
            <MdModeEditOutline color='#7429BA' fontSize='1.5em' />
          </label>
          <input
            type="file"
            id="upload-image"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
        <form className="account-settings-form">
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <div className="input-wrapper d-flex align-items-center">
              <input
                type="text"
                className="form-control-settings"
                id="name"
                value={formData.name}
                onChange={handleChange}
                disabled={editableField !== 'name'}
                placeholder="Name"
              />
              <MdModeEditOutline className="edit-icon ms-2" onClick={() => handleEditClick('name')} color='#7429BA' fontSize='1.5em' />
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
                disabled={editableField !== 'lastname'}
                placeholder="Last Name"
              />
              <MdModeEditOutline className="edit-icon ms-2" onClick={() => handleEditClick('lastname')} color='#7429BA' fontSize='1.5em' />
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
                disabled={editableField !== 'username'}
                placeholder="User Name"
              />
              <MdModeEditOutline className="edit-icon ms-2" onClick={() => handleEditClick('username')} color='#7429BA' fontSize='1.5em' />
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
                disabled={editableField !== 'mail'}
                placeholder="plexostore@examplo.com"
              />
              <MdModeEditOutline className="edit-icon ms-2" onClick={() => handleEditClick('mail')} color='#7429BA' fontSize='1.5em' />
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
                disabled={editableField !== 'password'}
                placeholder="***********"
              />
              <MdModeEditOutline className="edit-icon ms-2" onClick={() => handleEditClick('password')} color='#7429BA' fontSize='1.5em' />
            </div>
          </div>
          <button type="button" className="btn save-button w-100" onClick={handleSave}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
