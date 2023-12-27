import React from "react";
import tour_eg from "../assets/tourexample.jpg";
const VideoCallDiv = () => {
  return (
    <div className="videocallsContent">
      <div className="singleCallDiv">
        <img src={tour_eg} alt="" />
        <span className="span1">
          <h1>3D Tour Demo</h1>
          <p>Beautiful house in sitges.</p>
          <span className="span2">
            <span className="smallspan">
              <i className="fa-solid fa-calendar-days"></i>
              <p>27 Dec, 2023</p>
            </span>
            <span className="smallspan">
              <i className="fa-solid fa-house"></i>
              <p>1978430</p>
            </span>
            <span className="smallspan">
              <i className="fa-regular fa-user"></i>
              <p>null</p>
            </span>
            <span className="smallspan">
              <i className="fa-solid fa-users"></i>
              <p>0/6</p>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default VideoCallDiv;
