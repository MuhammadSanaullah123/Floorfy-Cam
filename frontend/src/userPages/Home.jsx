import React, { useState, useCallback } from "react";

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

//components
import TourDemoDiv from "../components/TourDemoDiv";

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

const Home = () => {
  const [file, setFile] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState();

  const [disableDiv, setDisableDiv] = useState(true);
  const [selectedDiv, setSelectedDiv] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setFile(file);
      /*       const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {

        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file); */
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  console.log(file);

  const handleDivClick = (name) => {
    console.log(name);
    setSelectedDiv([...selectedDiv, name]);
    setModalOpen(true);
    setContent(name);
  };
  console.log(selectedDiv);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HERERE");
  };
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
            />
            <input
              type="text"
              name="address"
              required
              placeholder="Address"
              className="nameInput"
            />

            <span className="inputSpan2">
              <select
                name="country"
                id="country"
                style={{
                  marginRight: "20px",
                }}
              >
                <option value="">Country</option>
                <option value="Pakistan">Pakistan</option>
                <option value="KSA">KSA</option>
                <option value="Palestine">Palestine</option>
                <option value="Yemen">Yemen</option>
              </select>
              <input type="text" name="city" required placeholder="City" />
            </span>
          </form>

          <div className="uploadDiv">
            <div
              {...getRootProps()}
              style={{
                outline: "none",
              }}
            >
              <input {...getInputProps()} />
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
          </div>
        </div>

        <div className="homeDiv1d2">
          <span className="homeDiv1d1span1">
            <span className="numberDiv">
              <h1>2</h1>
            </span>
            <h3>Virtualize</h3>
          </span>
          <div className="homeDiv1d3">
            <div className="choiceDiv">
              <Checkbox
                defaultChecked
                disabled={disableDiv}
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
                disabled={disableDiv}
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
                disabled={disableDiv}
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
                disabled={disableDiv}
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
            <button onClick={handleSubmit} disabled={disableDiv}>
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
                  onClick={() => handleDivClick(1)}
                >
                  <i
                    className={`fa-solid fa-circle-check ${
                      selectedDiv.includes(1) ? "fa-circle-check-green" : ""
                    }`}
                  ></i>
                  <h1>How it works</h1>
                  <i className="fa-solid fa-angle-right"></i>
                </div>
                <div className="checklistDiv" onClick={() => handleDivClick(2)}>
                  <i
                    className={`fa-solid fa-circle-check ${
                      selectedDiv.includes(2) ? "fa-circle-check-green" : ""
                    }`}
                  ></i>
                  <h1>How to take photos?</h1>
                  <i className="fa-solid fa-angle-right"></i>
                </div>
                <div
                  className="checklistDiv"
                  onClick={() => handleDivClick(3)}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <i
                    className={`fa-solid fa-circle-check ${
                      selectedDiv.includes(3) ? "fa-circle-check-green" : ""
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
                  onClick={() => handleDivClick(4)}
                >
                  <i
                    className={`fa-solid fa-circle-check ${
                      selectedDiv.includes(4) ? "fa-circle-check-green" : ""
                    }`}
                  ></i>
                  <img src={app} alt="" className="checklistImg" />
                  <h1>Cam App</h1>
                  <i className="fa-solid fa-angle-right"></i>
                </div>
                <div className="checklistDiv" onClick={() => handleDivClick(5)}>
                  <i
                    className={`fa-solid fa-circle-check ${
                      selectedDiv.includes(5) ? "fa-circle-check-green" : ""
                    }`}
                  ></i>
                  <img src={Camera360} alt="" className="checklistImg" />

                  <h1>360º Camera</h1>
                  <i className="fa-solid fa-angle-right"></i>
                </div>
                <div
                  className="checklistDiv"
                  onClick={() => handleDivClick(6)}
                  style={{
                    marginBottom: "0px",
                  }}
                >
                  <i
                    className={`fa-solid fa-circle-check ${
                      selectedDiv.includes(6) ? "fa-circle-check-green" : ""
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
          <div className="homeDiv4">
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
    </div>
  );
};

export default Home;
