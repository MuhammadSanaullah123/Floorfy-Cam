import React, { useRef, useEffect, useState } from "react";

//api
import { useDispatch, useSelector } from "react-redux";
import { useAuthMutation, useLogoutMutation } from "../slices/usersApiSlice";
import { setCredentials, clearCredentials } from "../slices/authSlice";
//others
import { toast } from "react-toastify";

const Lobby = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const [auth] = useAuthMutation();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const handleAuth = async () => {
    try {
      const res = await auth().unwrap();

      dispatch(setCredentials({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };

  console.log(userInfo);
  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: cameraEnabled,
          audio: microphoneEnabled,
        });

        videoRef.current.srcObject = stream;
        if (cameraEnabled) {
          console.log("BLOCK");
          document.getElementById("videotag").style.display = "block";
        } else {
          console.log("NONE");

          document.getElementById("videotag").style.display = "none";
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setError(
          "Error accessing media devices. Please check camera and microphone permissions."
        );
        // Check camera and microphone permissions
        const cameraPermission = await navigator.permissions.query({
          name: "camera",
        });
        const microphonePermission = await navigator.permissions.query({
          name: "microphone",
        });
        console.log(cameraPermission);
        console.log(microphonePermission);

        if (
          cameraPermission.state === "denied" &&
          microphonePermission.state === "denied"
        ) {
          alert("Please grant camera and microphone permissions");
        } else if (cameraPermission.state === "denied") {
          alert("Please grant camera permission");
        } else if (microphonePermission.state === "denied") {
          alert("Please grant microphone permission");
        }
      }
    };

    startMedia();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [cameraEnabled, microphoneEnabled]);

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled);
  };

  const toggleMicrophone = () => {
    setMicrophoneEnabled(!microphoneEnabled);
  };
  const handleForward = async () => {
    const cameraPermission = await navigator.permissions.query({
      name: "camera",
    });
    const microphonePermission = await navigator.permissions.query({
      name: "microphone",
    });
    console.log(cameraPermission);
    console.log(microphonePermission);

    if (
      cameraPermission.state === "denied" &&
      microphonePermission.state === "denied"
    ) {
      alert("Please grant camera and microphone permissions");
    } else if (cameraPermission.state === "denied") {
      alert("Please grant camera permission");
    } else if (microphonePermission.state === "denied") {
      alert("Please grant microphone permission");
    } else {
      const ID = window.location.pathname.split("/")[2];
      if (userInfo) {
        window.location.assign(
          `/video/${ID}?guest=false&mic=${microphoneEnabled}&cam=${cameraEnabled}`
        );
      } else {
        window.location.assign(
          `/video/${ID}?guest=true&mic=${microphoneEnabled}&cam=${cameraEnabled}`
        );
      }
    }
  };
  useEffect(() => {
    if (sessionStorage.userInfo) {
      handleAuth();
    }
  }, []);
  return (
    <div id="lobby">
      <div className="lobbyDiv1">
        <h1>All ready?</h1>
        <p>Test your camera and microphone before entering</p>
        <div className="cameraDiv">
          {!cameraEnabled && <i className="fa-regular fa-user"></i>}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="videotag"
            id="videotag"
            style={{
              display: cameraEnabled ? "block" : "none",
            }}
          />
        </div>
        <div className="iconDiv">
          <span
            className={`iconSpan ${
              microphoneEnabled ? "" : "iconSpanDisabled"
            } icon`}
            onClick={toggleMicrophone}
          >
            <i className="fa-solid fa-microphone icon"></i>
          </span>
          <span
            className={`iconSpan ${
              cameraEnabled ? "" : "iconSpanDisabled"
            } icon`}
            onClick={toggleCamera}
          >
            <i className="fa-solid fa-video icon"></i>
          </span>
        </div>
        <button onClick={handleForward}>Enter now</button>
      </div>
    </div>
  );
};

export default Lobby;
