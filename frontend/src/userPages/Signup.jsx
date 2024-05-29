import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//api
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

//mui
import Checkbox from "@mui/material/Checkbox";
//other
import { toast } from "react-toastify";
const Signup = () => {
  const [checkbox, setCheckbox] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup] = useSignupMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    email: "",
    password: "",
    promo: "",
  });
  const handleCheckboxChange = () => {
    setCheckbox(!checkbox);
  };
  const handleInput = (e) => {
    e.preventDefault();
    const Value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: Value,
    });
  };
  console.log(checkbox);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkbox === false) {
      toast.error("Accept Terms & Conditions!");
      return;
    }
    const data = {
      email: values.email,
      password: values.password,
      promo: values.promo,
    };

    try {
      const res = await signup(data).unwrap();
      sessionStorage.setItem("token", res.token);
      toast.success("Account Created", { position: "top-center" });

      dispatch(setCredentials({ ...res }));
    } catch (error) {
      console.log(error);
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });

      /* toast.error(error.data.errors); */
      /*   toast.error(error?.data?.errors || error.error); */
    }
  };
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
    if (userInfo) {
      window.location.assign("/home");
    }
  }, [navigate, userInfo]);
  console.log(values);
  return (
    <div id="signupContainer">
      <div id="leftDiv"></div>
      <div id="signup">
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
          <h1>Create profile</h1>
          <p>You have one tour for free</p>
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

            <p className="promoP">Promotional code</p>
            <input
              type="text"
              name="promo"
              placeholder=""
              value={values.promo}
              onChange={handleInput}
            />

            {/*   <Link>Forgot your password?</Link> */}
            <span className="checkboxSpan">
              <Checkbox
                checked={checkbox}
                onChange={handleCheckboxChange}
                className="checkbox"
                sx={{
                  color: "#00000059",
                  "&.Mui-checked": {
                    color: "#ffc600",
                  },
                  "& .MuiSvgIcon-root": { fontSize: 20 },
                }}
              />
              <p>
                I accept the{" "}
                <Link to="/terms-of-use" target="_blank">
                  Terms of use
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy" target="_blank">
                  privacy policies
                </Link>
              </p>
            </span>
            <button>Create profile</button>
          </form>
          <span
            style={{
              marginBottom: "30px",
            }}
          >
            <p>You have an account?</p>
            <Link to="/login">Log in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
