import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

//assets
import virtual_tour from "../assets/virtual_tour.svg";
import dollhouse from "../assets/render_3D.svg";
import floorplan from "../assets/floorplan.svg";
import hdimages from "../assets/hdimage.svg";
import videosimg from "../assets/videos_icon.svg";
import floorplan1 from "../assets/floorplan1.jpg";
import floorplan2 from "../assets/floorplan2.jpg";

//components
import GuestPropertyDetail from "../components/GuestPropertyDetail";
import PropertyStatistics from "../components/PropertyStatistics";
//mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
//others
import Cookies from "universal-cookie";
//api
import { useDispatch, useSelector } from "react-redux";
import { setTour } from "../slices/tourSlice";
import {
  useGetTourMutation,
  useUpdateTourImagesMutation,
  useDeleteTourImagesMutation,
  useUpdateTourVisitMutation,
} from "../slices/tourApiSlice";
//others
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
const GuestPropertyPage = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies(null, { path: "/" });
  const [open, setOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(false);

  const handleOpen = (image) => {
    setEnlargedImage(image);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [hashrender, setHashRender] = useState(false);
  const [content, setContent] = useState("virtual_tour");
  const [getTour] = useGetTourMutation();
  const [updateTourImages] = useUpdateTourImagesMutation();
  const [deleteTourImage] = useDeleteTourImagesMutation();
  const [updateTourVisit] = useUpdateTourVisitMutation();

  const { tourInfo } = useSelector((state) => state.tour);

  let hash = window.location.hash;
  console.log(tourInfo);
  const handleGetTour = async () => {
    try {
      let id = window.location.pathname.split("/")[3];
      const res = await getTour(id).unwrap();

      dispatch(setTour({ ...res }));
    } catch (error) {
      console.error(error);
      toast.error(error.msg);
    }
  };
  const handleTourVisit = async () => {
    try {
      let id = window.location.pathname.split("/")[3];
      let data = {
        id,
      };
      const res = await updateTourVisit(data).unwrap();

      dispatch(setTour({ ...res }));
    } catch (error) {
      console.error(error);
      toast.error(error.msg);
    }
  };
  const fileInputRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  console.log("uploadedImages", uploadedImages);
  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    // You can perform additional validation or processing here if needed
    setUploadedImages(files);
    handleUploadCloudinary(files);
  };
  const handleUploadCloudinary = async (files) => {
    let image_url_arr = [];
    console.log("files", files);
    for (let i = 0; i < files.length; i++) {
      const dataForm = new FormData();
      dataForm.append("file", files[i]);
      dataForm.append("upload_preset", "u928wexc");
      dataForm.append("cloud_name", "dihkvficg");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dihkvficg/image/upload",
        {
          method: "post",
          body: dataForm,
        }
      );

      const resData = await res.json();
      const image_url = resData.url;
      image_url_arr.push(image_url);
    }

    try {
      let id = window.location.pathname.split("/")[3];
      let data = {
        id,
        images: image_url_arr,
      };

      const res = await updateTourImages(data).unwrap();

      dispatch(setTour({ ...res }));
    } catch (error) {
      console.error(error);
      toast.error(error.msg);
    }
  };

  const handleDeleteImage = async (image) => {
    try {
      let id = window.location.pathname.split("/")[3];
      let data = {
        id,
        image,
      };

      const res = await deleteTourImage(data).unwrap();

      dispatch(setTour({ ...res }));
    } catch (error) {
      console.error(error);
      toast.error(error.msg);
    }
  };

  /*   const downloadImage = () => {
    tourInfo?.images?.map((image) => saveAs(`${image}`, "image.jpg"));
  }; */
  const downloadImage = () => {
    tourInfo?.images?.map((image) => {
      // Add fl_attachment transformation parameter before saveAs
      const modifiedImageUrl = image
        .replace("http://", "https://")
        .replace("/upload/", "/upload/fl_attachment/");
      console.log(modifiedImageUrl);
      saveAs(modifiedImageUrl, "image.jpg");
    });
  };
  const handleVideoDownload = () => {
    // Create a link element
    const link = document.createElement("a");
    link.href =
      "https://floorfycdn.com/img/user/91927/video_1987195.mp4?t=1716556011";
    link.download = "video.mp4";
    document.body.appendChild(link);
    // Trigger the click event on the link
    link.click();
    // Clean up
    document.body.removeChild(link);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #fff",
    borderRadius: "8px",
    boxShadow: 24,
    padding: "2px",
    width: "95%",
    height: "90%",
  };
  useEffect(() => {
    handleGetTour();
    let id = window.location.pathname.split("/")[3];
    if (!cookies.get("visited")) {
      cookies.set("visited", [id]);
      handleTourVisit();
    } else {
      let visited = cookies.get("visited");
      if (!visited.includes(id)) {
        visited.push(id);
        cookies.set("visited", visited);
        handleTourVisit();
      }
    }
  }, []);

  return (
    <div
      id="individualproperty"
      style={{
        marginLeft: "1em",
      }}
    >
      <span className="span1">
        <p className="p1">Properties</p>
        <i className="fa-solid fa-angle-right"></i>
        <h1 className="h1">{tourInfo?.name}</h1>
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

        <div className="callDiv">
          <span className="span2">
            <i className="fa-regular fa-copy"></i>
            <p>Copy tour link</p>
          </span>
          {/* <span className="span2">
            <i className="fa-regular fa-flag"></i>
            <p>Report bug</p>
          </span> */}
        </div>
      </div>
      <div className="headerDiv headerDivMobile">
        <div className="callDivmobile">
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
                  src="https://tool.camc.sa/cms4vr/link/6645cbc90a479"
                  frameborder="0"
                  allowvr="yes"
                  allow="vr; xr; accelerometer; magnetometer; gyroscope; autoplay; "
                  allowfullscreen="true"
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                  width="100%"
                  height="100%"
                  title="Virtual Tour"
                  style={{
                    minHeight: "480px",
                  }}
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
                  {/* <span>
                    <i className="fa-solid fa-upload"></i>
                    <p>Upload</p>
                  </span>
                  <span style={{ width: "115px" }}>
                    <i className="fa-solid fa-download"></i>
                    <p>Download</p>
                  </span> */}
                </div>
                <div className="contentfloorplanDiv2">
                  <div
                    className="floorplan1"
                    onClick={() => handleOpen(floorplan1)}
                  >
                    <img src={floorplan1} alt="" />
                  </div>
                  <div
                    className="floorplan2"
                    onClick={() => handleOpen(floorplan1)}
                  >
                    <img src={floorplan2} alt="" />
                  </div>
                </div>
              </div>
            )}
            {content === "images" && (
              <div className="contentimagesDiv">
                <div className="contentimagesDiv1">
                  {/* <span>
                    <i className="fa-solid fa-camera"></i>
                    <p>Capture</p>
                  </span> */}

                  <span onClick={downloadImage}>
                    <i className="fa-solid fa-download"></i>
                    <p>Download</p>
                  </span>
                </div>
                <div className="contentimagesDiv2">
                  {tourInfo?.images?.map((image, index) => (
                    <>
                      <div className="singleimgContainer" key={index}>
                        {/*  <i
                          className="fa-solid fa-up-right-and-down-left-from-center"
                          onClick={() => handleOpen(image)}
                        ></i> */}

                        <img
                          src={image}
                          alt=""
                          className="singleImg"
                          onClick={() => handleOpen(image)}
                        />
                        <i
                          className="fa-solid fa-circle-xmark deleteIcon"
                          onClick={() => handleDeleteImage(image)}
                        ></i>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            )}
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className="imageModal">
                <i className="fa-solid fa-xmark" onClick={handleClose}></i>
                <div className="imgDiv">
                  <img src={enlargedImage} alt="" />
                </div>
              </Box>
            </Modal>
            {content === "videos" && (
              <>
                <div className="contentvideosDiv1">
                  <span onClick={handleVideoDownload}>
                    <i className="fa-solid fa-download"></i>
                    <p>Download</p>
                  </span>
                </div>
                <div className="contentvideosDiv">
                  <div className="contentvideosDiv2">
                    <video controls autoPlay={false} className="videoElement">
                      <source
                        src="https://floorfycdn.com/img/user/91927/video_1987195.mp4?t=1716556011"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {hash === "#details" && <GuestPropertyDetail />}
      {hash === "#statistics" && <PropertyStatistics />}
    </div>
  );
};

export default GuestPropertyPage;
