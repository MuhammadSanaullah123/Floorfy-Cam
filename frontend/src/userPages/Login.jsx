import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//api
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, useAuthMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
//others
import { toast } from "react-toastify";
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [login] = useLoginMutation();
  const [auth] = useAuthMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const handleInput = (e) => {
    e.preventDefault();
    const Value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: Value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: values.email,
      password: values.password,
    };
    try {
      const res = await login(data).unwrap();
      sessionStorage.setItem("token", res.token);

      toast.success("Login Successful", { position: "top-center" });
      dispatch(setCredentials({ ...res }));
      /*       navigate("/home"); */
    } catch (error) {
      console.error(error);
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  const handleAuth = async () => {
    try {
      const res = await auth().unwrap();
      console.log("INSIDE HANDLE AUTH");
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  console.log(userInfo);
  const handleShowPassword = () => {
    var temp = document.getElementById("password");
    var icon = document.getElementById("eyeIcon");

    if (temp.type === "password") {
      temp.type = "text";
      icon.className = "fa-regular fa-eye-slash";
    } else {
      temp.type = "password";
      icon.className = "fa-regular fa-eye";
    }
  };
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    localStorage.setItem("language", selectedLanguage);
  };
  useEffect(() => {
    if (userInfo && userInfo?.role === "user") {
      window.location.assign("/home");
      console.log("useruseffect");
    }
    if (userInfo && userInfo?.role === "admin") {
      window.location.assign("/admin/dashboard");
      console.log("adminuseffect");
    }
    if (sessionStorage.userInfo) {
      handleAuth();
    }
  }, [userInfo]);
  return (
    <div id="loginContainer">
      <div id="leftDiv"></div>
      <div id="login">
        <div className="langDiv">
          <i className="fa-solid fa-globe"></i>
          <select
            name="language"
            className="languageInput"
            value={values.type}
            onChange={handleLanguageChange}
          >
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>
        <div className="parentDiv">
          <h1>Log in</h1>
          <p>Hello again!</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleInput}
            />
            <span className="passwordSpan">
              <div className="inputContainer">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  value={values.password}
                  onChange={handleInput}
                />
                <i
                  className="fa-regular fa-eye"
                  id="eyeIcon"
                  onClick={handleShowPassword}
                ></i>
              </div>
            </span>

            <Link>Forgot your password?</Link>
            <button>Log in</button>
          </form>

          <span
            style={{
              marginBottom: "30px",
            }}
          >
            <p>¿Do not have an account? </p>
            <Link to="/signup">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
