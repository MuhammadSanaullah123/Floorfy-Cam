import React, { useState, useEffect } from "react";

//mui
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
//other
import YouTube from "react-youtube";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const TutorialModal = ({ content, modalOpen, setModalOpen }) => {
  const [open, setOpen] = useState(modalOpen);

  const [values, setValues] = useState({
    mobile: null,
    name: "",
  });
  const [cameraAnswer, setCameraAnswer] = useState("");
  const [tripodAnswer, setTripodAnswer] = useState("");

  const [value, setValue] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setModalOpen(false);
  };
  console.log("modalOpen", modalOpen);

  console.log("open", open);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "0",
    borderRadius: "12px",
    boxShadow: 24,
    p: 2,
    display: "flex",
    flexDirection: "column",
  };
  const options = {
    height: "390",
    width: "500",
    borderRadius: "12px",
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };
  const handleInput = (e) => {
    const Value = e.target.value;
    setValues({ ...values, [e.target.name]: Value });
  };
  const handleTrainingSession = () => [];
  const handleAnswer = (modal, answer) => {
    if (modal === "Camera") {
      setCameraAnswer(answer);
    } else {
      setTripodAnswer(answer);
    }
  };
  useEffect(() => {
    setOpen(modalOpen);
  }, [modalOpen]);
  return (
    <div>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="tutorialmodal"
      >
        <Box sx={style}>
          <i className="fa-solid fa-xmark" onClick={handleClose}></i>
          {content === 1 && (
            <>
              <h1>How does it work?</h1>
              <p>
                With the following video or the quick guide, learn how to create
                virtual tours automatically.
              </p>
              <YouTube
                videoId="6K_kspdSTN4"
                options={options}
                /*  onReady={this._onReady} */
                id="video"
              />
            </>
          )}
          {content === 2 && (
            <>
              <h1>How to virtualize properties</h1>
              <p>
                Learn how to virtualize your properties with the following video
                or the quick guide.
              </p>
              <YouTube
                videoId="p6bT2x7yMUA"
                options={options}
                /*  onReady={this._onReady} */
                id="video"
              />
            </>
          )}
          {content === 3 && (
            <>
              <h1>Training</h1>
              <p>We will contact you to coordinate a free training session.</p>
              <form onSubmit={handleTrainingSession}>
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleInput}
                  placeholder="Your name"
                  className="nameInput"
                />
                <p>Phone</p>

                <input
                  type="text"
                  name="mobile"
                  value={values.mobile}
                  onChange={handleInput}
                  placeholder="Phone"
                  className="nameInput"
                />
                {/*  <PhoneInput
                
                  placeholder="Enter phone number"
                  value={values.mobile}
                  name="mobile"
                  onChange={handleInput}
                /> */}
                <button type="submit">Send</button>
              </form>
            </>
          )}
          {content === 4 && (
            <>
              <h1 className="h1">Get our app</h1>
              <p className="p1">Create virtual tours in 10min</p>
              <p className="p2">Send an SMS with the links to our apps.</p>

              <form
                onSubmit={handleTrainingSession}
                className="downloadAppForm"
              >
                <>
                  <input
                    type="text"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleInput}
                    placeholder="Phone"
                    className="nameInput"
                  />
                </>
                {/*  <PhoneInput
                
                  placeholder="Enter phone number"
                  value={values.mobile}
                  name="mobile"
                  onChange={handleInput}
                /> */}
                <button type="submit">Send</button>
              </form>
              <div className="downloadDivParent">
                <div className="downloadDiv">
                  <i className="fa-brands fa-apple"></i>
                  <p>Download on the App Store</p>
                </div>
                <div className="downloadDiv">
                  <i className="fa-brands fa-google-play fa-apple"></i>
                  <p>Download on Google Play</p>
                </div>
              </div>
            </>
          )}
          {content === 5 && (
            <>
              <h1>¿Do you have a 360 camera?</h1>
              <p>You will need one to create virtual tours</p>
              <div className="parentDiv">
                <div
                  className={`${
                    cameraAnswer === "Yes"
                      ? "parentDivChildSelected"
                      : "parentDivChild"
                  }`}
                  onClick={() => handleAnswer("Camera", "Yes")}
                >
                  Yes
                </div>
                <div
                  className={`${
                    cameraAnswer === "No"
                      ? "parentDivChildSelected"
                      : "parentDivChild"
                  }`}
                  onClick={() => handleAnswer("Camera", "No")}
                >
                  No
                </div>
              </div>
            </>
          )}

          {content === 6 && (
            <>
              <h1>Do you have a tripod?</h1>
              <p>You will need a tripod to take the shots correctly.</p>
              <div className="parentDiv">
                <div
                  className={`${
                    tripodAnswer === "Yes"
                      ? "parentDivChildSelected"
                      : "parentDivChild"
                  }`}
                  onClick={() => handleAnswer("Tripod", "Yes")}
                >
                  Yes
                </div>
                <div
                  className={`${
                    tripodAnswer === "No"
                      ? "parentDivChildSelected"
                      : "parentDivChild"
                  }`}
                  onClick={() => handleAnswer("Tripod", "No")}
                >
                  No
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default TutorialModal;
