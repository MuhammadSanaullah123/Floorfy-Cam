import React, { useState, useCallback, useEffect, useRef } from "react";

//assets
import share from "../assets/share.svg";
import hdimage from "../assets/hdimage.svg";

import floorplan from "../assets/floorplan.svg";
import tour360 from "../assets/360tour.svg";
import virtual_tour from "../assets/virtual_tour.svg";
import render_3D from "../assets/render_3D.svg";
import Camera360 from "../assets/360Camera.svg";
import tripod from "../assets/tripod.svg";
import app from "../assets/app.svg";

//other
import { useDropzone } from "react-dropzone";
//mui
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import TutorialModal from "../components/TutorialModal";
//others
import { toast } from "react-toastify";
//components
import TourDemoDiv from "../components/TourDemoDiv";
//api
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserBasicMutation } from "../slices/usersApiSlice";

import { setAllTour, setTour, clearTour } from "../slices/tourSlice";
import {
  useCreateTourMutation,
  useGetAllTourMutation,
  useGetTourMutation,
} from "../slices/tourApiSlice";
import { Navigate } from "react-router-dom";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: 180,
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#06C15D" : "#308fe8",
  },
}));

const Home = ({ loginComponent }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    address: "",
    country: "",
    city: "",
    virtual_tour: true,
    floor_plan: false,
    dollhouse: false,
    pack: false,
  });
  const [secondStep, setSecondStep] = useState(false);
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState();
  const [updateUserBasic] = useUpdateUserBasicMutation();
  const [createTour] = useCreateTourMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const [basic, setBasic] = useState({
    basic1: false,
    basic2: false,
    basic3: false,
    basic4: false,
    basic5: false,
    basic6: false,
  });
  const [disableDiv, setDisableDiv] = useState(true);
  const [selectedDiv, setSelectedDiv] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  console.log(files);
  const handleInput = (e) => {
    const Value = e.target.value;
    setValues({ ...values, [e.target.name]: Value });
  };
  const handleCheckboxChange = (checkboxName) => {
    setValues((prevValues) => ({
      ...prevValues,
      [checkboxName]: !prevValues[checkboxName],
    }));
  };
  const handleUploadDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleDivClick = (name) => {
    console.log(name);
    setSelectedDiv([...selectedDiv, name]);
    setModalOpen(true);
    setContent(name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImageUrls = await Promise.all(
      files.map(async (file) => {
        const dataImage = new FormData();
        dataImage.append("file", file);
        dataImage.append("upload_preset", "u928wexc");
        dataImage.append("cloud_name", "dihkvficg");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dihkvficg/image/upload",
          {
            method: "post",
            body: dataImage,
          }
        );

        const resData = await res.json();
        return resData.url;
      })
    );
    let data = {
      name: values.name,
      address: values.address,
      city: values.city,
      country: values.country,
      virtual_tour: values.virtual_tour,
      floorplan: values.floor_plan,
      dollhouse: values.dollhouse,
      pack: values.pack,
      images: uploadedImageUrls,
    };

    try {
      const res = await createTour(data).unwrap();

      dispatch(setTour({ ...res }));
      toast.success("Tour Created", { position: "top-center" });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error(error.msg);
    }
  };
  console.log(values);
  const handleBasic = async (e, basic, basicType) => {
    e.preventDefault();

    let data = {
      basicType,
      basic,
      id: userInfo._id,
    };

    try {
      const res = await updateUserBasic(data).unwrap();

      dispatch(setCredentials({ ...res }));
    } catch (error) {
      console.error(error);
      toast.error(error.msg);
    }
  };
  useEffect(() => {
    if (
      values.name &&
      values.city &&
      values.country &&
      values.address &&
      files.length > 0
    ) {
      setSecondStep(true);
    }
  }, [values.address, values.city, values.country, values.name, files]);

  console.log(userInfo);

  return (
    <div id="home">
      <div className="homeDiv1">
        <div className="homeDiv1d1">
          <span className="homeDiv1d1span1">
            <span className="numberDiv">
              <h1>1</h1>
            </span>
            <h3>Create virtual tour</h3>
            <div className="dotted-line"></div>
          </span>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              required
              placeholder="Tour name"
              className="nameInput"
              value={values.name}
              onChange={handleInput}
            />
            <input
              type="text"
              name="address"
              required
              placeholder="Address"
              className="nameInput"
              value={values.address}
              onChange={handleInput}
            />

            <span className="inputSpan2">
              <select
                name="country"
                id="country"
                style={{
                  marginRight: "20px",
                }}
                value={values.country}
                onChange={handleInput}
              >
                <option value="">Country</option>
                <option value="Pakistan">Pakistan</option>
                <option value="KSA">KSA</option>
                <option value="Palestine">Palestine</option>
                <option value="Yemen">Yemen</option>
              </select>
              <input
                type="text"
                name="city"
                required
                placeholder="City"
                value={values.city}
                onChange={handleInput}
              />
            </span>
          </form>

          <div className="uploadDiv" onClick={handleUploadDivClick}>
            {files.length > 0 ? (
              <div className="previewImagesDiv">
                {files.map((file, index) => (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview-${index}`}
                    className="imagePreview"
                    key={index}
                    /*  style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} */
                  />
                ))}
                <div className="paraDiv">
                  {/*  <img src={tour360} className="fa-solid fa-globe" /> */}
                  <p>Drop your 360&deg; photos here</p>
                </div>
              </div>
            ) : (
              <div
                {...getRootProps()}
                style={{
                  outline: "none",
                }}
              >
                <input {...getInputProps()} ref={fileInputRef} />
                {isDragActive ? (
                  <div className="isActiveDiv">
                    <img src={tour360} className="fa-solid fa-globe" />
                    <p>Drop your 360&deg; photos here</p>
                  </div>
                ) : (
                  <div className="isActiveDiv">
                    <img src={tour360} className="fa-solid fa-globe" />

                    <p>Drag your 360&deg; photos here</p>
                    <button>Browse files</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          className="homeDiv1d2"
          style={{
            opacity: `${secondStep ? "1" : "0.5"}`,
          }}
        >
          <span className="homeDiv1d1span1">
            <span className="numberDiv">
              <h1>2</h1>
            </span>
            <h3>Virtualize</h3>
          </span>
          <div className="homeDiv1d3">
            <div className="choiceDiv">
              <Checkbox
                name="virtual_tour"
                disabled={secondStep ? false : true}
                checked={values.virtual_tour}
                onChange={() => handleCheckboxChange("virtual_tour")}
                sx={{
                  "&.Mui-checked": {
                    color: "#ffc600",
                  },
                }}
              />
              <span className="imgSpan">
                <img
                  src={virtual_tour}
                  className="fa-regular fa-circle-play"
                ></img>
              </span>
              <span className="paraSpan">
                <h1>Virtual tour</h1>
                <p>Free</p>
              </span>
            </div>
            <div
              className="hr"
              style={{
                margin: "0 0 10px 0",
              }}
            />
            <div className="choiceDiv">
              <Checkbox
                disabled={secondStep ? false : true}
                checked={values.floor_plan}
                onChange={() => handleCheckboxChange("floor_plan")}
                name="floor_plan"
                sx={{
                  "&.Mui-checked": {
                    color: "#ffc600",
                  },
                }}
              />
              <span className="imgSpan">
                <img
                  src={floorplan}
                  className="fa-regular fa-circle-play"
                ></img>
              </span>
              <span className="paraSpan">
                <h1>Floor plan</h1>
                <p>$15</p>
              </span>
            </div>
            <div className="choiceDiv">
              <Checkbox
                disabled={secondStep ? false : true}
                checked={values.dollhouse}
                onChange={() => handleCheckboxChange("dollhouse")}
                name="dollhouse"
                sx={{
                  "&.Mui-checked": {
                    color: "#ffc600",
                  },
                }}
              />
              <span className="imgSpan">
                <img
                  src={render_3D}
                  className="fa-regular fa-circle-play"
                ></img>
              </span>
              <span className="paraSpan">
                <h1>3D Dollhouse</h1>
                <p>$15</p>
              </span>
            </div>
            <div className="choiceDiv">
              <Checkbox
                disabled={secondStep ? false : true}
                checked={values.pack}
                onChange={() => handleCheckboxChange("pack")}
                name="pack"
                sx={{
                  "&.Mui-checked": {
                    color: "#ffc600",
                  },
                }}
              />
              <span
                className="imgSpan"
                style={{
                  marginRight: "0",
                }}
              >
                <img
                  src={floorplan}
                  className="fa-regular fa-circle-play"
                ></img>
              </span>
              <span className="imgSpan">
                <img
                  src={render_3D}
                  className="fa-regular fa-circle-play"
                ></img>
              </span>
              <span className="paraSpan">
                <h1>Pack offer</h1>
                <p>For only $19</p>
              </span>
            </div>
            <button onClick={handleSubmit} disabled={secondStep ? false : true}>
              Virtualize
            </button>
          </div>
        </div>
      </div>
      <div className="homeDiv2">
        <div className="homeDiv3">
          <h1>LET'S START</h1>
          <div className="homeDiv4">
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<i className="fa-solid fa-angle-down"></i>}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className="accordDiv">
                  <i className="fa-solid fa-graduation-cap"></i>
                  <span className="accordDivSpan">
                    <h1>Basic knowledge</h1>
                    <div className="progressDiv">
                      <BorderLinearProgress
                        variant="determinate"
                        value={33 * 1}
                      />
                      <p>0/3</p>
                    </div>
                  </span>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  className="hr"
                  style={{
                    margin: "0 0 10px 0",
                  }}
                />
                <div
                  className="checklistDiv"
                  style={{
                    marginTop: "10px",
                  }}
                  onClick={(e) => {
                    handleDivClick(1);
                    handleBasic(e, true, "basic1");
                  }}
                >
                  <i
                    className={`fa-solid fa-circle-check ${
                      userInfo?.basic1 ? "fa-circle-check-green" : ""
                    }`}
                  ></i>
                  <h1>How it works</h1>
                  <i className="fa-solid fa-angle-right"></i>
                </div>
                <div
                  className="checklistDiv"
                  onClick={(e) => {
                    handleDivClick(2);
                    handleBasic(e, true, "basic2");
                  }}
                >
                  <i
                    className={`fa-solid fa-circle-check ${
                      userInfo?.basic2 ? "fa-circle-check-green" : ""
                    }`}
                  ></i>
                  <h1>How to take photos?</h1>
                  <i className="fa-solid fa-angle-right"></i>
                </div>
                <div
                  className="checklistDiv"
                  onClick={(e) => {
                    handleDivClick(3);
                    handleBasic(e, true, "basic3");
                  }}
                  style={{
                    marginBottom: "0px",
                  }}
                >
                  <i
                    className={`fa-solid fa-circle-check ${
                      userInfo?.basic3 ? "fa-circle-check-green" : ""
                    }`}
                  ></i>
                  <h1>Request free training</h1>
                  <i className="fa-solid fa-angle-right"></i>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="homeDiv3">
          <h1
            style={{
              visibility: "hidden",
            }}
          >
            LET'S START
          </h1>
          <div className="homeDiv4">
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<i className="fa-solid fa-angle-down"></i>}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className="accordDiv">
                  <i className="fa-solid fa-lock"></i>
                  <span className="accordDivSpan">
                    <h1>Basic knowledge</h1>
                    <div className="progressDiv">
                      <BorderLinearProgress
                        variant="determinate"
                        value={33 * 1}
                      />
                      <p>0/3</p>
                    </div>
                  </span>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  className="hr"
                  style={{
                    margin: "0 0 10px 0",
                  }}
                />
                <div
                  className="checklistDiv"
                  style={{
                    marginTop: "10px",
                  }}
                  onClick={(e) => {
                    handleDivClick(4);
                    handleBasic(e, true, "basic4");
                  }}
                >
                  <i
                    className={`fa-solid fa-circle-check ${
                      userInfo?.basic4 ? "fa-circle-check-green" : ""
                    }`}
                  ></i>
                  <img src={app} alt="" className="checklistImg" />
                  <h1>Cam App</h1>
                  <i className="fa-solid fa-angle-right"></i>
                </div>
                <div
                  className="checklistDiv"
                  onClick={(e) => {
                    handleDivClick(5);
                    handleBasic(e, true, "basic5");
                  }}
                >
                  <i
                    className={`fa-solid fa-circle-check ${
                      userInfo?.basic5 ? "fa-circle-check-green" : ""
                    }`}
                  ></i>
                  <img src={Camera360} alt="" className="checklistImg" />

                  <h1>360º Camera</h1>
                  <i className="fa-solid fa-angle-right"></i>
                </div>
                <div
                  className="checklistDiv"
                  onClick={(e) => {
                    handleDivClick(6);
                    handleBasic(e, true, "basic6");
                  }}
                  style={{
                    marginBottom: "0px",
                  }}
                >
                  <i
                    className={`fa-solid fa-circle-check ${
                      userInfo?.basic6 ? "fa-circle-check-green" : ""
                    }`}
                  ></i>
                  <img src={tripod} alt="" className="checklistImg" />

                  <h1>Tripod</h1>
                  <i className="fa-solid fa-angle-right"></i>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div
          className="homeDiv3 tourhomeDiv3"
          /*    style={{
            width: "36%",
          }} */
        >
          <h1
            style={{
              visibility: "hidden",
            }}
          >
            LET'S START
          </h1>
          <div
            className="homeDiv4"
            style={{
              height: "261px",
            }}
          >
            <div
              id="tourdemodiv"
              className="hometourdemodiv"
              /*      style={{
                width: "100%",
                height: "100%",
              }} */
            >
              <div
                className="upperDiv homeupperDiv"
                /*  style={{
                  height: "200px",
                }} */
              >
                <span className="span1">
                  <h1>3D Tour Demo</h1>
                  <img
                    src={share}
                    className="fa-solid fa-share-nodes icon"
                    alt=""
                  />
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
                  <img src={virtual_tour} alt="" />
                </span>
                <span className="imageSpan">
                  <img src={render_3D} alt="" />
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
          </div>
        </div>

        <TutorialModal
          content={content}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
      {/*  {loginComponent} */}
    </div>
  );
};

export default Home;
