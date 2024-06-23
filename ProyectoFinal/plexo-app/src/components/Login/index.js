import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import Navbar from "../Navbar";

function Login() {
  const [userEmail, setuserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const PostData = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await Axios.post(
        "https://final-project-bootcamputp.onrender.com/api/auth/login",
        {
          email: userEmail,
          password: password,
        }
      );
      if (response.status === 200) {
        setIsLogged(true);
        console.log("Login successful");
        const userRole = response.data.admin;
        if (userRole === false) {
          navigate("/");
        } else if (userRole === true) {
          navigate("/admin");
        }
        console.log(userRole);
      } else {
        setIsLogged(false);
      }
    } catch (err) {
      setIsLogged(false);
      console.error("Login failed: ", err);
    }
  };

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
          <form onSubmit={PostData}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="example@plexo.com"
                value={userEmail}
                onChange={(e) => setuserEmail(e.target.value)}
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {isLogged && (
              <div className="alert alert-success">Login successful!</div>
            )}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn button-sign_in text-white">
                Sign in
              </button>
            </div>
            <hr />
            <div id="emailHelp" className="form-text form-text-login">
              ¿Don't you have an account?{" "}
              <span>
                {" "}
                <Link className="nav-link-login" to="/register">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
