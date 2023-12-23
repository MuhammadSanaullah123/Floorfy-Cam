import React from "react";
//assets
import share from "../assets/share.svg";
import hdimage from "../assets/hdimage.svg";
import virtualtour from "../assets/virtual_tour.svg";
import render3d from "../assets/render_3D.svg";
import floorplan from "../assets/floorplan.svg";
const TourDemoDiv = () => {
  return (
    <div id="tourdemodiv">
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
