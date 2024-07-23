import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//api
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginMutation,
  useAuthMutation,
  useGetResetCodeMutation,
} from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

//others
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
  });

  const [getResetCode] = useGetResetCodeMutation();

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
    };
    try {
      const res = await getResetCode(data).unwrap();
      toast.success(`${res.message}`, { position: "top-center" });
      setValues({
        email: "",
      });
    } catch (error) {
      toast.error(error.data.msg);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    localStorage.setItem("language", selectedLanguage);
  };

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
          <h1>Password Reset</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleInput}
            />

            <button>Send</button>
          </form>

          {/*      <span
            style={{
              marginBottom: "30px",
            }}
          >
            <p>¿Do not have an account? </p>
            <Link to="/signup">Sign up</Link>
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
