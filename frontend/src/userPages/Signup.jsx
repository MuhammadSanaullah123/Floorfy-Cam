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
  useEffect(() => {
    if (userInfo) {
      window.location.assign("/home");
    }
  }, [navigate, userInfo]);
  return (
    <div id="signupContainer">
      <div id="leftDiv"></div>
      <div id="signup">
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
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={values.password}
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
                I accept the <Link>Terms of use</Link> and{" "}
                <Link>privacy policies</Link>
              </p>
            </span>
            <button>Create profile</button>
          </form>
          <span>
            <p>You have an account?</p>
            <Link to="/login">Log in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
