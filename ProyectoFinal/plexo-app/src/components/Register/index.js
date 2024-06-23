import Axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Navbar";
import api from "../../http";

function Register() {
  const [isRegister, setIsRegister] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const postNewUser = async (event) => {
    event.preventDefault();
    // Confirmación de password
    if (userPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await api.post("auth/register", {
        username: userName,
        email: userEmail,
        password: userPassword,
        first_name: firstName,
        last_name: lastName,
      });

      if (response.status === 201 || response.status === 200) {
        setIsRegister(true);
        setTimeout(() => {
          const userRole = response.data.admin;
          if (userRole === false) {
            navigate("/perfil");
          } else if (userRole === true) {
            navigate("/admin");
          }
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      alert("Registro fallido");
    }
  };

  return (
    <>
      <Navbar />
      <div className="card card-container-login text-dark mx-auto">
        <div className="card-body card-body-login">
          <h5 className="card-title">Welcome 👋🏻</h5>
          <p className="card-text"></p>
          <form onSubmit={postNewUser}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Username"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="example@plexo.com"
                value={userEmail}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="*******"
                value={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword2"
                placeholder="*******"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            {isRegister && (
              <div className="alert alert-success">Registro exitoso</div>
            )}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn button-sign_in text-white">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
