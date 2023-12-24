import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div id="loginContainer">
      <div id="leftDiv"></div>
      <div id="login">
        <div className="parentDiv">
          <h1>Log in</h1>
          <p>Hello again!</p>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" />
            <input
              type="password"
              name="password"
              placeholder="Your password"
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
