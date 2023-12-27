import React from "react";
import { useNavigate } from "react-router-dom";
//assets
import share from "../assets/share.svg";
import hdimage from "../assets/hdimage.svg";
import virtualtour from "../assets/virtual_tour.svg";
import render3d from "../assets/render_3D.svg";
import floorplan from "../assets/floorplan.svg";
const TourDemoDiv = () => {
  const navigate = useNavigate();
  return (
    <div id="tourdemodiv" onClick={() => navigate("/property/123#content")}>
      <div className="upperDiv">
        <span className="span1">
          <h1>3D Tour Demo</h1>
          <img src={share} className="fa-solid fa-share-nodes icon" alt="" />
          <i className="fa-solid fa-ellipsis-vertical icon"></i>
        </span>
        <span className="span2">
          <i className="fa-solid fa-location-dot"></i>
          <p>Sitges, España, Passeig de la Ribera</p>
        </span>
        <span className="span3">
          <p>Tour 3D</p>
        </span>
      </div>
      <div className="lowerDiv">
        <span className="imageSpan">
          <img src={virtualtour} alt="" />
        </span>
        <span className="imageSpan">
          <img src={render3d} alt="" />
        </span>
        <span className="imageSpan">
          <img src={floorplan} alt="" />
        </span>
        <span className="imageSpan">
          <img
            src={hdimage}
            alt=""
            style={{
              width: "40px",
            }}
          />
        </span>
        <div className="verticalLine" />
        <span className="startSpan">
          <i className="fa-solid fa-video"></i>
          <p>Start</p>
        </span>
      </div>
    </div>
  );
};

export default TourDemoDiv;
