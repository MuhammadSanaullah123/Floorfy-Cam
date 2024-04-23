import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//assets
import virtual_tour from "../assets/virtual_tour.svg";
import dollhouse from "../assets/render_3D.svg";
import floorplan from "../assets/floorplan.svg";
import hdimages from "../assets/hdimage.svg";
import videosimg from "../assets/videos_icon.svg";
import floorplan1 from "../assets/floorplan1.jpg";
import floorplan2 from "../assets/floorplan2.jpg";
import image1 from "../assets/images1.jpg";
import image2 from "../assets/images2.jpg";
import image3 from "../assets/images3.jpg";
//components
import PropertyDetail from "../components/PropertyDetail";
import PropertyStatistics from "../components/PropertyStatistics";
//api
import { useDispatch, useSelector } from "react-redux";
import { setTour } from "../slices/tourSlice";
import { useGetTourMutation } from "../slices/tourApiSlice";
//others
import { toast } from "react-toastify";
const IndividualProperty = () => {
  const dispatch = useDispatch();

  const [hashrender, setHashRender] = useState(false);
  const [content, setContent] = useState("virtual_tour");
  const [getTour] = useGetTourMutation();
  const { tourInfo } = useSelector((state) => state.tour);

  let hash = window.location.hash;
  console.log(tourInfo);
  const handleGetTour = async () => {
    try {
      let id = window.location.pathname.split("/")[2];
      const res = await getTour(id).unwrap();

      dispatch(setTour({ ...res }));
    } catch (error) {
      console.error(error);
      toast.error(error.msg);
    }
  };
  useEffect(() => {
    handleGetTour();
  }, []);
  return (
    <div id="individualproperty">
      <span className="span1">
        <p className="p1">Properties</p>
        <i className="fa-solid fa-angle-right"></i>
        <h1 className="h1">3D Tour Demo</h1>
      </span>
      <div className="headerDiv">
        <Link to="#content" onClick={() => setHashRender(!hashrender)}>
          <p className={` ${hash === "#content" ? "linkpSelected" : "linkp"}`}>
            Content
          </p>
        </Link>
        <h4>|</h4>
        <Link
          to="#details"
          onClick={() => setHashRender(!hashrender)}
          style={{
            marginLeft: "0",
          }}
        >
          <p className={` ${hash === "#details" ? "linkpSelected" : "linkp"}`}>
            Details
          </p>
        </Link>
        <h4>|</h4>
        <Link
          to="#statistics"
          onClick={() => setHashRender(!hashrender)}
          style={{
            marginLeft: "0",
          }}
        >
          <p
            className={` ${hash === "#statistics" ? "linkpSelected" : "linkp"}`}
          >
            Statistics
          </p>
        </Link>
        <div className="callDiv">
          <span
            className="videocallSpan"
            onClick={() => window.open("/lobby/494e56cb97d21544", "_blank")}
          >
            <i className="fa-solid fa-video"></i>
            <p>{window.screen.width <= "975" ? "Start" : "Start videocall"}</p>
          </span>
          <span className="span2">
            <i className="fa-regular fa-copy"></i>
            <p>Copy tour link</p>
          </span>
          <span className="span2">
            <i className="fa-regular fa-flag"></i>
            <p>Report bug</p>
          </span>
        </div>
      </div>
      <div className="headerDiv headerDivMobile">
        <div className="callDivmobile">
          <span className="videocallSpan">
            <i className="fa-solid fa-video"></i>
            <p>{window.screen.width <= "975" ? "Start" : "Start videocall"}</p>
          </span>
          <span className="span2">
            <i className="fa-regular fa-copy"></i>
            <p>Copy tour link</p>
          </span>
          <span className="span2">
            <i className="fa-regular fa-flag"></i>
            <p>Report bug</p>
          </span>
        </div>
      </div>

      {hash === "#content" && (
        <div className="mainDiv">
          <div className="selectionDiv">
            <span
              className={`span1 ${
                content === "virtual_tour" ? "span1Selected" : "span1"
              }`}
              onClick={() => setContent("virtual_tour")}
            >
              <span className="borderSpan">
                <img src={virtual_tour} alt="" />
              </span>
              <p className={`${content === "virtual_tour" ? "selectedp" : ""}`}>
                Virtual tours
              </p>
            </span>
            <span
              className={`span1 ${
                content === "dollhouse" ? "span1Selected" : "span1"
              }`}
              onClick={() => setContent("dollhouse")}
            >
              <span className="borderSpan">
                <img src={dollhouse} alt="" />
              </span>
              <p className={`${content === "dollhouse" ? "selectedp" : ""}`}>
                3D Dollhouse
              </p>
            </span>
            <span
              className={`span1 ${
                content === "floorplan" ? "span1Selected" : "span1"
              }`}
              onClick={() => setContent("floorplan")}
            >
              <span className="borderSpan">
                <img src={floorplan} alt="" />
              </span>

              <p className={`${content === "floorplan" ? "selectedp" : ""}`}>
                Floorplans
              </p>
            </span>
            <span
              className={`span1 ${
                content === "images" ? "span1Selected" : "span1"
              }`}
              onClick={() => setContent("images")}
            >
              <span className="borderSpan">
                <img src={hdimages} alt="" />
              </span>

              <p className={`${content === "images" ? "selectedp" : ""}`}>
                Images
              </p>
            </span>
            <span
              className={`span1 ${
                content === "videos" ? "span1Selected" : "span1"
              }`}
              onClick={() => setContent("videos")}
            >
              <span className="borderSpan">
                <img src={videosimg} alt="" />
              </span>

              <p className={`${content === "videos" ? "selectedp" : ""}`}>
                Videos
              </p>
            </span>
          </div>
          <div className="contentDiv">
            {content === "virtual_tour" && (
              <div className="contentvirtualtourDiv">
                {/*  <img src={tour_eg} alt="" /> */}
                <iframe
                  id="embed_iframe_box"
                  src="http://13.232.6.248/cms4vr/link/6622a21cde4d3"
                  scrolling="no"
                  frameborder="0"
                  allowvr="yes"
                  allow="vr; xr; accelerometer; magnetometer; gyroscope; autoplay;"
                  allowfullscreen
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                  width="100%"
                  height="100%"
                  title="Virtual Tour"
                ></iframe>
              </div>
            )}
            {content === "dollhouse" && (
              <div className="contentdollhouseDiv">
                <iframe
                  title="Floorfy Viewer"
                  width="100%"
                  height="100%"
                  src="https://floorfy.com/tour/1987195?play=no&galleryOpen=no"
                  frameborder="0"
                  scrolling="no"
                  allowfullscreen="true"
                  webkitallowfullscreen="true"
                  mozallowfullscreen="true"
                ></iframe>
              </div>
            )}
            {content === "floorplan" && (
              <div className="contentfloorplanDiv">
                <div className="contentfloorplanDiv1">
                  <button>Request floorplans</button>
                  <span>
                    <i className="fa-solid fa-upload"></i>
                    <p>Upload</p>
                  </span>
                  <span style={{ width: "115px" }}>
                    <i className="fa-solid fa-download"></i>
                    <p>Download</p>
                  </span>
                </div>
                <div className="contentfloorplanDiv2">
                  <div className="floorplan1">
                    <img src={floorplan1} alt="" />
                  </div>
                  <div className="floorplan2">
                    <img src={floorplan2} alt="" />
                  </div>
                </div>
              </div>
            )}
            {content === "images" && (
              <div className="contentimagesDiv">
                <div className="contentimagesDiv1">
                  <span>
                    <i className="fa-solid fa-camera"></i>
                    <p>Capture</p>
                  </span>
                  <span>
                    <i className="fa-solid fa-upload"></i>
                    <p>Upload</p>
                  </span>
                  <span>
                    <i className="fa-solid fa-download"></i>
                    <p>Download</p>
                  </span>
                </div>
                <div className="contentimagesDiv2">
                  {tourInfo?.images?.map((image, index) => (
                    <img src={image} alt="" key={index} />
                  ))}
                  {/*  <img src={image1} alt="" />
                  <img src={image2} alt="" />
                  <img src={image3} alt="" />
                  <img src={image1} alt="" />
                  <img src={image2} alt="" />
                  <img src={image3} alt="" />
                  <img src={image1} alt="" />
                  <img src={image2} alt="" />
                  <img src={image3} alt="" />
                  <img src={image1} alt="" />
                  <img src={image2} alt="" />
                  <img src={image3} alt="" />
                  <img src={image1} alt="" />
                  <img src={image2} alt="" />
                  <img src={image3} alt="" />
                  <img src={image1} alt="" />
                  <img src={image2} alt="" />
                  <img src={image3} alt="" /> */}
                </div>
              </div>
            )}
            {content === "videos" && (
              <div className="contentvideosDiv">
                <div className="contentvideosDiv1">
                  <span>
                    <i className="fa-solid fa-download"></i>
                    <p>Download</p>
                  </span>
                </div>
                <div className="contentvideosDiv2"></div>
              </div>
            )}
          </div>
        </div>
      )}
      {hash === "#details" && <PropertyDetail />}
      {hash === "#statistics" && <PropertyStatistics />}
    </div>
  );
};

export default IndividualProperty;
