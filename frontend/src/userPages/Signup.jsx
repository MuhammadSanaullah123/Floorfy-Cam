import React, { useState } from "react";
import { Link } from "react-router-dom";

//mui
import Checkbox from "@mui/material/Checkbox";

const Signup = () => {
  const [checkbox, setCheckbox] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(checkbox);
  return (
    <div id="signupContainer">
      <div id="leftDiv"></div>
      <div id="signup">
        <div className="parentDiv">
          <h1>Create profile</h1>
          <p>You have one tour for free</p>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" />
            <input
              type="password"
              name="password"
              placeholder="Your password"
            />
            {/*   <Link>Forgot your password?</Link> */}
            <span className="checkboxSpan">
              <Checkbox
                checked={checkbox}
                onChange={() => setCheckbox(!checkbox)}
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
