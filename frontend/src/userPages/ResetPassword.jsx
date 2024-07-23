import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//api
import { useDispatch, useSelector } from "react-redux";
import { useResetPasswordMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
//others
import { toast } from "react-toastify";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    conpassword: "",
  });
  const [resetPassword] = useResetPasswordMutation();
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
    if (values.password !== values.conpassword) {
      toast.error("Passwords do not match");
      return;
    }
    let data = {
      id: window.location.pathname.split("/")[2],
      token: window.location.pathname.split("/")[3],
      conpassword: values.conpassword,
      password: values.password,
    };
    try {
      const res = await resetPassword(data).unwrap();
      sessionStorage.setItem("token", res.token);
      toast.success("Login Successful", { position: "top-center" });
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    localStorage.setItem("language", selectedLanguage);
  };
  useEffect(() => {
    if (userInfo && userInfo?.role === "user") {
      window.location.assign("/home");
    }
  }, [navigate, userInfo]);
  /*
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
  }, [userInfo]); */
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
          <h1>Change Password</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleInput}
              required
            />
            <input
              type="password"
              name="conpassword"
              placeholder="Confirm Password"
              value={values.conpassword}
              onChange={handleInput}
              required
            />
            <button>Submit</button>
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

export default ResetPassword;
