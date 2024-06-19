import Navbar from "../Navbar/index";
import "./style.css";
import { Link } from "react-router-dom";


function Register() {
  return (
    <>
      <Navbar />
      <div className="card card-container-login text-dark mx-auto">
        <div className="card-body card-body-login">
          <h5 className="card-title">Welcome 👋🏻</h5>
          <p className="card-text">
          </p>
          <form>
            <div className="mb-3">
            <label className="form-label">
                Name
              </label>
              <input
                type="Name"
                className="form-control"
                id=" "
                aria-describedby="namelHelp"
                placeholder=" "
                />
                <label className="form-label">
                Surname
              </label>
              <input
                type="Name"
                className="form-control"
                id=" "
                aria-describedby="namelHelp"
                placeholder=" "
              />
              <label className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="example@plexo.com"
              />
              <div id="emailHelp" className="form-text">
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                 placeholder="*******"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
              Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                 placeholder="*******"
              />
            </div>
            <div className='d-flex justify-content-center'>
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
