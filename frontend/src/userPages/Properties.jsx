import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//assets
import tour360 from "../assets/360tour.svg";

//mui
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";

//components
import TourDemoDiv from "../components/TourDemoDiv";

const Properties = () => {
  const [hashrender, setHashRender] = useState(false);
  let hash = window.location.hash;
  const navigate = useNavigate();
  return (
    <div id="properties">
      <h1 className="propertiesh1">Properties</h1>
      <div className="headerDiv">
        <Link to="#active" onClick={() => setHashRender(!hashrender)}>
          <p className={` ${hash === "#active" ? "linkpSelected" : "linkp"}`}>
            Active
          </p>
          <span
            className={` ${
              hash === "#active" ? "linkspanSelected" : "linkspan"
            }`}
          >
            1
          </span>
        </Link>
        <h4>|</h4>
        <Link
          to="#archived"
          onClick={() => setHashRender(!hashrender)}
          style={{
            marginLeft: "0",
          }}
        >
          <p className={` ${hash === "#archived" ? "linkpSelected" : "linkp"}`}>
            Archived
          </p>
          <span
            className={` ${
              hash === "#archived" ? "linkspanSelected" : "linkspan"
            }`}
          >
            1
          </span>
        </Link>
        <div className="searchDiv">
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
          <span className="downloadSpan">
            <i className="fa-solid fa-download"></i>
          </span>
        </div>
      </div>
      <div className="headerDiv headerDivMobile">
        <div className="searchDivMobile">
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
          <span className="downloadSpan">
            <i className="fa-solid fa-download"></i>
          </span>
        </div>
      </div>

      <div className="tourDiv">
        <div
          className="newTourDiv"
          onClick={() => navigate("/home")}
          style={{
            display: `${hash === "#active" ? "flex" : "none"}`,
          }}
        >
          <img src={tour360} alt="" className="worldImg" />
          <p>Create new tour</p>
        </div>
        <TourDemoDiv />
        <TourDemoDiv />

        <TourDemoDiv />
      </div>
      <div className="resultDiv">
        <p>Showing 3 results</p>
      </div>
    </div>
  );
};

export default Properties;
