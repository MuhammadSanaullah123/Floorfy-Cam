import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//assets
import share from "../assets/share.svg";
import hdimage from "../assets/hdimage.svg";
import virtualtour from "../assets/virtual_tour.svg";
import render3d from "../assets/render_3D.svg";
import floorplan from "../assets/floorplan.svg";
//api
import { useArchiveTourMutation } from "../slices/tourApiSlice";
import { setAllTour, setTour, clearTour } from "../slices/tourSlice";
import { useDispatch, useSelector } from "react-redux";
//others
import copy from "copy-to-clipboard";

import { toast } from "react-toastify";
const TourDemoDiv = ({ tour }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuShow, setMenuShow] = useState(false);
  const [archiveTour] = useArchiveTourMutation();

  const handleArchive = async (e) => {
    e.stopPropagation();
    try {
      let data = {
        id: tour._id,
      };
      const res = await archiveTour(data);
      /*    dispatch(setAllTour({ ...res })); */
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error.msg);
    }
  };
  const handleCopy = (e) => {
    e.stopPropagation();
    copy(
      `${process.env.REACT_APP_BACKEND_URL}/guest/property/${tour?._id}#content`
    );
    toast.success("Link Copied!", {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
    });
    setMenuShow(false);
  };
  const handleNavigate = () => {
    navigate(`/property/${tour._id}#content`);
  };
  const handleMenuShow = (e) => {
    e.stopPropagation();
    setMenuShow(!menuShow);
  };
  return (
    <div id="tourdemodiv" onClick={handleNavigate}>
      <div className="upperDiv">
        <img src={tour.images[0]} alt="" className="tourimage" />
        <span className="span1">
          <h1>{tour.name}</h1>
          <img
            src={share}
            className="fa-solid fa-share-nodes icon"
            alt=""
            /*   onClick={handleArchive} */
            onClick={handleCopy}
          />
          <span className="menuSpan" onClick={handleMenuShow}>
            <i className="fa-solid fa-ellipsis-vertical icon"></i>
          </span>

          <span
            className="subMenuSpan"
            style={{
              display: menuShow ? "flex" : "none",
            }}
          >
            <span className="subMenuSpanIcon" onClick={handleCopy}>
              <i className="fa-regular fa-copy subMenuIcon"></i>
              <p className="subMenuSpanP">Copy tour link</p>
            </span>
            <span className="subMenuSpanIcon" /* onClick={handleNavigate} */>
              <i className="fa-solid fa-globe subMenuIcon"></i>
              <p className="subMenuSpanP">Open tour</p>
            </span>
            <span
              className="subMenuSpanIcon"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/property/${tour._id}#details`);
              }}
            >
              <i className="fa-regular fa-file-lines subMenuIcon"></i>
              <p className="subMenuSpanP">Edit Information</p>
            </span>
            <span
              className="subMenuSpanIcon"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/property/${tour._id}#statistics`);
              }}
            >
              <i className="fa-solid fa-chart-pie subMenuIcon"></i>
              <p className="subMenuSpanP">Analytics</p>
            </span>
            <span className="subMenuSpanIcon" onClick={handleArchive}>
              <i className="fa-solid fa-box-archive subMenuIcon"></i>
              <p className="subMenuSpanP">
                {tour?.archived ? "Unarchive" : "Archive"}
              </p>
            </span>
          </span>
        </span>
        <span className="span2">
          <i className="fa-solid fa-location-dot"></i>
          <p>
            {tour.address},{tour.city}, {tour.country}
          </p>
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
