import Navbar from "../Navbar/index";
import "./style.css";
import { Link } from "react-router-dom";


function Login() {
  return (
    <>
      <Navbar />
      <div className="card card-container-login text-dark mx-auto">
        <div className="card-body card-body-login">
          <h5 className="card-title">Welcome Back 👋🏻</h5>
          <p className="card-text">
            Today is a new day. It's your day. You shape it. Sign in to start
            managing your products.
          </p>
          <form>
            <div className="mb-3">
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
                We'll never share your email with anyone else.
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
            <div className='d-flex justify-content-center'>
              <button type="submit" className="btn button-sign_in text-white">
                Sign in
              </button>
            </div>
            <hr/>
            <div id="emailHelp" className="form-text form-text-login">
              <Link className="nav-link-login" to="/register">¿Don't you have an account? <span>Sign up</span></Link>
              </div>
          </form>
        </div>
        </div>
    </>
  );
}

export default Login;
