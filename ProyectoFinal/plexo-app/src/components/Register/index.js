import Axios from "axios";
import "./style-register.css";
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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!firstName.trim()) errors.firstName = "El nombre es obligatorio";
    if (!lastName.trim()) errors.lastName = "El apellido es obligatorio";
    if (!userName.trim())
      errors.userName = "El nombre de usuario es obligatorio";
    if (!userEmail.trim()) {
      errors.userEmail = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      errors.userEmail = "El correo electrónico no es válido";
    }
    if (!userPassword.trim()) {
      errors.userPassword = "La contraseña es obligatoria";
    } else if (!/^(?=.*[0-9])[A-Za-z0-9]{6,}$/.test(userPassword)) {
      errors.userPassword =
        "The password must be at least 6 characters, contain at least one number, and have no special characters";
    }
    if (userPassword !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
    return errors;
  };

  const postNewUser = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await Axios.post(
        "https://final-project-bootcamputp.onrender.com/api/auth/register",
        {
          username: userName,
          email: userEmail,
          password: userPassword,
          first_name: firstName,
          last_name: lastName,
        }
      );

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
      window.alert("Registro fallido");
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
              {errors.firstName && (
                <div className="text-danger">{errors.firstName}</div>
              )}
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
              {errors.lastName && (
                <div className="text-danger">{errors.lastName}</div>
              )}
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Username"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
              {errors.userName && (
                <div className="text-danger">{errors.userName}</div>
              )}
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="example@plexo.com"
                value={userEmail}
                onChange={(event) => setEmail(event.target.value)}
              />
              {errors.userEmail && (
                <div className="text-danger">{errors.userEmail}</div>
              )}
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
              {errors.userPassword && (
                <div className="text-danger">{errors.userPassword}</div>
              )}
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
              {errors.confirmPassword && (
                <div className="text-danger">{errors.confirmPassword}</div>
              )}
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
