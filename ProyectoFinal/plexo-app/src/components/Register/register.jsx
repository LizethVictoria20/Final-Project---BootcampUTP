import "./style-register.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../ContextUser/context-user.jsx";
import api from "../../http/index.js";

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
    if (!firstName.trim()) errors.firstName = "Name is mandatory";
    if (!lastName.trim()) errors.lastName = "Last name is mandatory";
    if (!userName.trim()) {
      errors.userName = "Username is mandatory";
    } else if (userName.length < 3 || userName.length > 50) {
      errors.userName = "Username must be between 3 and 50 characters";
    }
    if (!userEmail.trim()) {
      errors.userEmail = "Email is mandatory";
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      errors.userEmail = "Email isn't correct";
    }
    if (!userPassword.trim()) {
      errors.userPassword = "Password isn't correct";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword)
    ) {
      errors.userPassword =
        "The password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one number.";
    }
    if (userPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
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
      const response = await api.post("auth/register", {
        username: userName,
        email: userEmail,
        password: userPassword,
        first_name: firstName,
        last_name: lastName,
      });

      if (response.status === 201 || response.status === 200) {
        setIsRegister(true);
        const userRole = response.data.admin;
        console.log(userRole);
        setTimeout(() => {
          if (!userRole) {
            navigate("/loginUserPlexo");
          } else if (userRole) {
            navigate("/admin");
          }
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      window.alert("Register failed");
    }
  };

  return (
    <>
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
                placeholder="*********"
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
                placeholder="********"
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
