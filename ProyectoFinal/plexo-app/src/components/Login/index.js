import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../http";

import { useState } from "react";
import Navbar from "../Navbar";

function Login() {
  const [userEmail, setuserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!userEmail) {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      errors.email = "El correo electrónico no es válido";
    }

    if (!password) {
      errors.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return errors;
  };

  const PostData = async (event) => {
    event.preventDefault();
    setError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      window.alert(
        Object.values(validationErrors)
          .map((err) => err)
          .join("\n")
      );
      return;
    }

    try {
      const response = await api.post("auth/login", {
        email: userEmail,
        password: password,
      });
      if (response.status === 200) {
        setIsLogged(true);
        setError(null);
        console.log("Login successful");
        const userRole = response.data.admin;
        if (userRole === false) {
          navigate("/perfil");
        } else if (userRole === true) {
          navigate("/admin");
        }
        console.log(userRole);
      } else {
        setIsLogged(false);
        window.alert("Error desconocido al iniciar sesión");
      }
    } catch (err) {
      setIsLogged(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        window.alert(err.response.data.message);
      } else {
        setError("Error al iniciar sesión. Por favor, intente de nuevo.");
        window.alert("Error al iniciar sesión. Por favor, intente de nuevo.");
      }
      console.error("Login failed: ", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="card card-container-login mx-auto">
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
