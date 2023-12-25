import React from "react";

//assets
import propertyimg from "../assets/tourexample.jpg";

const VisitBox = ({ visit }) => {
  return (
    <div id="visitbox">
      <img className="propertyimg" src={propertyimg} alt="" />
      <div className="visitboxParentDiv">
        <div className="visitboxd1">
          <h1>3D Tour Demo</h1>
          <p>25/12/2023</p>
        </div>
        <div className="visitboxd2">
          <span className="span1">
            {visit === "last" ? (
              <>
                <i className="fa-regular fa-clock"></i>
                <p>50s</p>
              </>
            ) : (
              <>
                <i className="fa-solid fa-trophy"></i>
                <p>1</p>
              </>
            )}
          </span>
          <span className="span2">
            {visit === "last" ? (
              <>
                <i className="fa-solid fa-location-dot"></i>
                <p>Punjab, PK</p>
              </>
            ) : (
              <>
                <i className="fa-solid fa-eye"></i>
                <p>2 Visits</p>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VisitBox;
