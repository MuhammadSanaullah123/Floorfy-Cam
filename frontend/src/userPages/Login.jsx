import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//api
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
//others
import { toast } from "react-toastify";
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [login] = useLoginMutation();
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
  console.log(userInfo);
  useEffect(() => {
    if (userInfo && userInfo?.role === "user") {
      window.location.assign("/home");
    }
    if (userInfo && userInfo?.role === "admin") {
      window.location.assign("/admin/dashboard");
    }
  }, [navigate, userInfo]);
  console.log(values);
  return (
    <div id="loginContainer">
      <div id="leftDiv"></div>
      <div id="login">
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
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={values.password}
              onChange={handleInput}
            />
            <Link>Forgot your password?</Link>
            <button>Log in</button>
          </form>
          <span>
            <p>¿Do not have an account? </p>
            <Link to="/signup">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
