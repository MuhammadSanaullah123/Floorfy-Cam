import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//api
import { useDispatch, useSelector } from "react-redux";
import { useAuthMutation, useLogoutMutation } from "../slices/usersApiSlice";
import { setCredentials, clearCredentials } from "../slices/authSlice";

//assets
import logo from "../assets/logo2.png";

//mui
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";

//other
import { toast } from "react-toastify";
const Header = () => {
  const [mobile, setMobile] = useState(false);
  const [sideBar, setSideBar] = useState(false);

  const [profile, setProfile] = useState(false);
  /*   useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("upperHeader");
      if (window.scrollY > 0) {
        header.style.boxShadow = "rgb(0 0 0) 0px 2px 4px 1px";
      } else {
        header.style.boxShadow = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); */
  const [auth] = useAuthMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      setProfile(!profile);
      window.location.assign("/login");
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  const { userInfo } = useSelector((state) => state.auth);
  const handleAuth = async () => {
    try {
      const res = await auth().unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  const handleMobile = async () => {
    setMobile(!mobile);
    const sidebar = document.getElementById("sideDrawer");
    if (mobile) {
      sidebar.style.display = "none";
    } else {
      sidebar.style.display = "block";
    }
  };
  useEffect(() => {
    if (sessionStorage.userInfo) {
      handleAuth();
    }
  }, []);
  return (
    <div id="header">
      <div id="upperHeader">
        {!mobile ? (
          <i className="fa-solid fa-bars" onClick={handleMobile}></i>
        ) : (
          <i className="fa-solid fa-xmark fa-bars" onClick={handleMobile}></i>
        )}
        <span className="logoSpan">
          <img src={logo} alt="" className="logo" />
          <h1>Cam</h1>
        </span>

        <OutlinedInput
          id="outlined-adornment-weight"
          className="searchInput"
          placeholder="Ref. property"
          endAdornment={
            <InputAdornment position="end">
              <i className="fa-solid fa-magnifying-glass"></i>
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />
        <div className="profileDiv" onClick={() => setProfile(!profile)}>
          <span className="userSpan">
            <i className="fa-solid fa-user"></i>
          </span>
          <p className="profileDivp1">My Profile</p>
          {profile ? (
            <i className="fa-solid fa-angle-up"></i>
          ) : (
            <i className="fa-solid fa-angle-down"></i>
          )}
          <div
            className="menuDiv"
            style={{
              display: `${profile ? "flex" : "none"}`,
            }}
          >
            <div className="menuDiv1">
              <span className="imgSpan">
                <i className="fa-solid fa-user"></i>
              </span>
              <span className="emailSpan">
                <p>test@gmail.com</p>
                <Link to="/profile">Edit Profile</Link>
              </span>
            </div>
            <div
              className="hr"
              style={{
                margin: "20px 0 20px 0",
              }}
            />
            <div
              className="linkDiv"
              style={{
                marginRight: "5px",
              }}
              onClick={() => navigate("/profile#users")}
            >
              <i className="fa-solid fa-user-plus linkIcon linkIconFlip"></i>
              <p>Manage users</p>
            </div>
            <div className="linkDiv" onClick={() => navigate("/profile#brand")}>
              <i className="fa-solid fa-tag linkIcon linkIconFlip"></i>
              <p>Customize brand</p>
            </div>
            {/*  <div
              className="hr"
              style={{
                margin: "0px 0 15px 0",
              }}
            />

            <div className="linkDiv">
              <i className="fa-solid fa-cube linkIcon"></i>
              <p>My plan</p>
            </div>
            <div className="linkDiv">
              <i className="fa-solid fa-rocket linkIcon"></i>
              <p>Plans</p>
            </div>
            <div className="linkDiv">
              <i className="fa-regular fa-credit-card linkIcon"></i>
              <p>Payments</p>
            </div> */}
            <div
              className="hr"
              style={{
                margin: "0px 0 15px 0",
              }}
            />

            <div
              className="linkDiv"
              style={{
                marginBottom: "0",
              }}
              onClick={handleLogout}
            >
              <i className="fa-solid fa-arrow-right-from-bracket linkIcon"></i>
              <p>Log out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
