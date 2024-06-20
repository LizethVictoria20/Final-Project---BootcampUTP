import Axios from "axios";
import Navbar from "../Navbar/index";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Register() {
  const [isRegister, setIsRegister] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const postNewUser = async (event) => {
    event.preventDefault();

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
      ).then((data) => {
        console.log(data);
      });
    } catch (err) {
      console.log(err);
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
                type="Name"
                className="form-control"
                id="firstname"
                aria-describedby="namelHelp"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
              <label className="form-label">Last Name</label>
              <input
                type="Last Name"
                className="form-control"
                id="lastname"
                aria-describedby="namelHelp"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
              <label className="form-label">Username</label>
              <input
                type="Username"
                className="form-control"
                id="name"
                aria-describedby="namelHelp"
                placeholder="Username"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="example@plexo.com"
                value={userEmail}
                onChange={(event) => setEmail(event.target.value)}
              />
              <div id="emailHelp" className="form-text"></div>
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
            {isRegister && (
              <div className="alert alert-success">Register successful!</div>
            )}

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword2"
                placeholder="*******"
                value={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
              />
            </div>
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
