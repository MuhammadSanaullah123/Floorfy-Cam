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
  const [roomId, setRoomId] = useState();
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
  const generateRandomId = () => {
    const characters = "0123456789abcde";
    const length = 16;

    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    setRoomId(randomString);
    return randomString;
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
      }
    };

    startMedia();

    return () => {
      const tracks = videoRef.current.srcObject?.getTracks();
      tracks && tracks.forEach((track) => track.stop());
    };
  }, [cameraEnabled, microphoneEnabled]);

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled);
  };

  const toggleMicrophone = () => {
    setMicrophoneEnabled(!microphoneEnabled);
  };
  const handleForward = () => {
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
