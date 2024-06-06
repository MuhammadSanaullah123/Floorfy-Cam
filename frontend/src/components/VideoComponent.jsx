import React, { useState, useEffect } from "react";
import OT from "@opentok/client";

//assets
import logo from "../assets/logo2.png";
import virtual_tour from "../assets/virtual_tour.svg";
import floorplan from "../assets/floorplan.svg";
import hdimage from "../assets/hdimage.svg";
import floorplan1 from "../assets/floorplan1.jpg";
import floorplan2 from "../assets/floorplan2.jpg";
import images1 from "../assets/images1.jpg";
import images2 from "../assets/images2.jpg";
import images3 from "../assets/images3.jpg";

//mui
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
//others
import GoogleMapReact from "google-map-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";

import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

const AnyReactComponent = () => (
  <div style={{ width: "30px", height: "30px" }}>
    <i
      className="fa-solid fa-location-dot"
      style={{
        width: "100%",
        height: "100%",
        color: "#ffc600",
        fontSize: "24px",
      }}
    ></i>
  </div>
);

const VideoComponent = () => {
  const APP_ID = process.env.REACT_APP_ID;
  const [uid] = useState(String(Math.floor(Math.random() * 10000)));

  /*  let uid = String(Math.floor(Math.random() * 10000)); */

  let token = null;
  /* let client; */
  const [client, setClient] = useState(
    AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
  );
  const [rtmClient, setrtmClient] = useState();
  const [channel, setChannel] = useState();

  let roomId = window.location.pathname.split("/")[2];
  /*  let localTracks = []; */
  const [localTracks, setLocalTracks] = useState([]);
  const [localScreenTracks, setLocalScreenTracks] = useState();
  const [sharingScreen, setSharingScreen] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState({});

  console.log("remoteUsers", remoteUsers);
  const [camera, setCamera] = useState(true);
  const [mic, setMic] = useState(true);
  const [screen, setScreen] = useState(false);
  const [count, setCount] = useState(0);

  const queryParameters = new URLSearchParams(window.location.search);
  const guest = queryParameters.get("guest");
  const url_cam = queryParameters.get("cam");
  const url_mic = queryParameters.get("mic");
  console.log("clinet,user", client.remoteUsers);

  const joinRoomInit = async () => {
    let rtmClientTemp = await AgoraRTM.createInstance(APP_ID);
    await rtmClientTemp.login({ uid, token });

    let channelTemp = await rtmClientTemp.createChannel(roomId);
    await channelTemp.join();

    channelTemp.on("MemberJoined", handleMemberJoined);
    channelTemp.on("ChannelMessage", handleChannelMessage);

    setChannel(channelTemp);
    /*  let clientTemp = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }); */
    await client.join(APP_ID, roomId, token, uid);

    client.on("user-published", handleUserPublish);

    client.on("user-left", handleUserLeft);

    /* setClient(clientTemp); */
    joinStream(client);
  };

  //when user start videocall
  const joinStream = async (client) => {
    console.log("ONLY FOR FIRST USER");
    console.log(document.getElementsByClassName("hostDiv").length);

    let localTracksTemp = await AgoraRTC.createMicrophoneAndCameraTracks(
      {},
      {
        encoderConfig: {
          width: { min: 640, ideal: 1920, max: 1920 },
          height: { min: 480, ideal: 1080, max: 1080 },
        },
      }
    );
    let player;
    if (guest === "true") {
      player = ` <div class="hostDiv" id="user-container-${uid}" >
      <span class="span1">
      <div class="video-player" id="user-${uid}">
     
      </div>
      </span>
  
     <span class="span2">
     <i class="fa-solid fa-microphone"></i>
     <p>Guest-1</p>
   </span>
    </div>`;
      document
        .getElementById("streams__container")
        .insertAdjacentHTML("beforeend", player);
    } else {
      console.log("INSIDE guest false");

      player = ` <div class="hostDiv user-1-main" id="user-container-${uid}" >
      <span class="span1">
      <div class="video-player" id="user-${uid}">
     
      </div>
      </span>
  
     <span class="span2">
     <i class="fa-solid fa-microphone"></i>
     <p>Agency(You)</p>
   </span>
    </div>`;
      document
        .getElementById("top-container")
        .insertAdjacentHTML("afterbegin", player);
    }

    document
      .getElementById(`user-container-${uid}`)
      .addEventListener("click", expandVideoFrame);

    localTracksTemp[1].play(`user-${uid}`);
    /*     await localTracksTemp[0].setMuted(true); */
    if (url_cam === "false") {
      await localTracksTemp[1].setMuted(true);
      setCamera(false);
    }
    if (url_mic === "false") {
      await localTracksTemp[0].setMuted(true);
      setMic(false);
    }
    await client.publish([localTracksTemp[0], localTracksTemp[1]]);
    /* setClient(clientTemp); */
    setLocalTracks(localTracksTemp);
    if (guest === "true") {
      handleMicReset();
    }
  };

  const switchToCamera = async () => {
    displayFrame = document.getElementById("stream__box");

    let player = ` <div class="hostDiv user-1-main" id="user-container-${uid}" >
<span class="span1">
<div class="video-player" id="user-${uid}">

</div>
</span>

<span class="span2">
<i class="fa-solid fa-microphone"></i>
<p>Agency(You)</p>
</span>
</div>`;

    /* displayFrame
.insertAdjacentHTML("afterbegin", player); */
    document
      .getElementById("top-container")
      .insertAdjacentHTML("afterbegin", player);
    /* displayFrame.insertAdjacentHTML("beforeend", player); */
    /*  document
      .getElementById(`user-container-${uid}`)
      .addEventListener("click", hideDisplayFrame); */
    document
      .getElementById(`user-container-${uid}`)
      .addEventListener("click", expandVideoFrame);
    userIdInDisplayFrame = null;
    displayFrame.style.display = null;
    let localTracksTemp = localTracks;
    await localTracksTemp[0].setMuted(true);
    await localTracksTemp[1].setMuted(true);

    setMic(false);
    setCamera(false);
    setScreen(false);
    setSharingScreen(false);

    localTracksTemp[1].play(`user-${uid}`);

    await client.publish([localTracksTemp[1]]);

    setLocalTracks(localTracksTemp);
  };

  //when another user joins the call
  //others can see the joined user
  const handleUserPublish = async (user, mediaType) => {
    console.log("ONLY FOR SECOND USER");
    console.log("client", client);
    console.log("mediaType", mediaType);

    setRemoteUsers({ ...remoteUsers, [user.uid]: user });
    /*   remoteUsers[user.uid] = user; */
    /* let clientTemp = client; */
    await client.subscribe(user, mediaType);
    /*    setClient(clientTemp); */

    let player = document.getElementById(`user-container-${user.uid}`);
    console.log("player", player);

    if (player === null) {
      console.log("INSIDE player null");
      if (guest === "false") {
        console.log("INSIDE guest false");

        player = ` <div class="hostDiv" id="user-container-${user.uid}">
        <span class="span1">
        <div class="video-player" id="user-${user.uid}">
       
        </div>
        </span>
    
       <span class="span2">
       <i class="fa-solid fa-microphone"></i>
       <p>Guest-1</p>
     </span>
      </div>`;
        document
          .getElementById("streams__container")
          .insertAdjacentHTML("beforeend", player);
      } else {
        console.log("INSIDE guest true");
        console.log(user);
        let person = document.getElementsByClassName("hostDiv user-1-main");
        if (person[0]) {
          player = ` <div class="hostDiv" id="user-container-${user.uid}">
        <span class="span1">
        <div class="video-player" id="user-${user.uid}">
       
        </div>
        </span>
    
       <span class="span2">
       <i class="fa-solid fa-microphone"></i>
       <p>Guest-1</p>
     </span>
      </div>`;
          document
            .getElementById("streams__container")
            .insertAdjacentHTML("beforeend", player);
        } else {
          player = ` <div class="hostDiv user-1-main" id="user-container-${user.uid}">
  <span class="span1">
  <div class="video-player" id="user-${user.uid}">
 
  </div>
  </span>

 <span class="span2">
 <i class="fa-solid fa-microphone"></i>
 <p>Agency</p>
</span>
</div>`;
          document
            .getElementById("top-container")
            .insertAdjacentHTML("afterbegin", player);
        }
      }

      document
        .getElementById(`user-container-${user.uid}`)
        .addEventListener("click", expandVideoFrame);
    }

    if (mediaType === "video") {
      console.log(user);
      user?.videoTrack?.play(`user-${user.uid}`);
    }

    if (mediaType === "audio") {
      console.log(user);

      user?.audioTrack?.play();
    }
    setCount((prev) => prev + 1);
    setUserNames((prev) => [...prev, "Guest-1"]);
  };
  const handleMicReset = async () => {
    const micBtn = document.getElementById("mic-btn");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await micBtn.click();
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for a short delay
    await micBtn.click();
  };
  const handleMemberJoined = async (MemberId) => {
    console.log("A new member has joined the room:", MemberId);

    const micBtn = document.getElementById("mic-btn");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await micBtn.click();
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for a short delay
    await micBtn.click();
  };
  const handleChannelMessage = async (messageData) => {
    console.log("message", messageData);
    let data = JSON.parse(messageData.text);
    console.log("data", data);
    if (guest === "true" && data.screenShare === "true") {
      let hostElement = document.getElementsByClassName("hostDiv user-1-main");
      console.log(hostElement);
      hostElement[0].click();
    }
  };
  const sendMessage = async () => {
    channel.sendMessage({
      text: JSON.stringify({ "type:": "chat", screenShare: "true" }),
    });
  };

  /*   let displayFrame = document.getElementById("stream__box"); */
  let displayFrame;
  let videoFrames = document.getElementsByClassName("hostDiv");
  let userIdInDisplayFrame = null;

  let expandVideoFrame = (e) => {
    displayFrame = document.getElementById("stream__box");
    console.log("EXPAND DISPLAY FRAME IS BEING CALLED");

    let child = displayFrame.children[0];
    if (child) {
      child.removeEventListener("click", hideDisplayFrame);

      child.addEventListener("click", expandVideoFrame);
      console.log(child.classList);
      if (child.classList[1] === "user-1-main") {
        let container = document.getElementById("top-container");
        container.insertBefore(child, container.firstChild);
      } else {
        let container = document.getElementById("streams__container");

        container.insertBefore(child, container.firstChild);
      }
    }
    displayFrame.style.display = "block";
    /*    let currentDiv = e.currentTarget; */
    displayFrame.appendChild(e.currentTarget);
    displayFrame.children[0].removeEventListener("click", expandVideoFrame);

    displayFrame.children[0].addEventListener("click", hideDisplayFrame);
    userIdInDisplayFrame = e.currentTarget.id;
    console.log(displayFrame.children[0]);
    /*   displayFrame.onclick = null; */
  };
  //when user leaves the call
  const handleUserLeft = async (user) => {
    displayFrame = document.getElementById("stream__box");
    setRemoteUsers({ ...remoteUsers, [user.uid]: null });
    /* delete remoteUsers[user.uid]; */
    document.getElementById(`user-container-${user.uid}`).remove();

    if (userIdInDisplayFrame === `user-container-${user.uid}`) {
      displayFrame.style.display = null;
    }
  };
  const hideDisplayFrame = () => {
    displayFrame = document.getElementById("stream__box");
    userIdInDisplayFrame = null;
    displayFrame.style.display = null;
    console.log("HIDE DISPLAY FRAME IS BEING CALLED");
    let child = displayFrame.children[0];
    console.log(child);
    child.removeEventListener("click", hideDisplayFrame);
    child.addEventListener("click", expandVideoFrame);
    if (child.classList[1] === "user-1-main") {
      let container = document.getElementById("top-container");
      container.insertBefore(child, container.firstChild);
    } else {
      let container = document.getElementById("streams__container");

      container.insertBefore(child, container.firstChild);
    }
  };

  const toggleCamera = async (e) => {
    console.log(localTracks);
    let localTracksTemp = localTracks;

    console.log(localTracksTemp);
    if (localTracksTemp[1].muted) {
      await localTracksTemp[1].setMuted(false);
      setCamera(true);
    } else {
      console.log(localTracksTemp);

      await localTracksTemp[1].setMuted(true);
      setCamera(false);
      console.log(localTracksTemp);
    }
    setLocalTracks(localTracksTemp);
  };

  const toggleMic = async (e) => {
    console.log(localTracks);
    let localTracksTemp = localTracks;
    if (localTracksTemp[0].muted) {
      await localTracksTemp[0].setMuted(false);
      setMic(true);
    } else {
      console.log(localTracksTemp);

      await localTracksTemp[0].setMuted(true);
      setMic(false);
      console.log(localTracksTemp);
    }
    setLocalTracks(localTracksTemp);
  };
  const toggleScreen = async (e) => {
    displayFrame = document.getElementById("stream__box");

    /*  let clientTemp = client; */
    if (!sharingScreen) {
      setSharingScreen(true);

      let localScreenTracksTemp = await AgoraRTC.createScreenVideoTrack();
      console.log(displayFrame);
      document.getElementById(`user-container-${uid}`).remove();
      displayFrame.style.display = "block";

      let player = ` <div class="hostDiv user-1-main" id="user-container-${uid}">
      <span class="span1">
      <div class="video-player" id="user-${uid}">
     
      </div>
      </span>
  
     <span class="span2">
     <i class="fa-solid fa-microphone"></i>
     <p>Agency(You)</p>
   </span>
    </div>`;

      displayFrame.insertAdjacentHTML("beforeend", player);

      document
        .getElementById(`user-container-${uid}`)
        .addEventListener("click", hideDisplayFrame);

      userIdInDisplayFrame = `user-container-${uid}`;

      localScreenTracksTemp.play(`user-${uid}`);
      await client.unpublish([localTracks[1]]);
      await client.publish([localScreenTracksTemp]);

      setLocalScreenTracks(localScreenTracksTemp);
      sendMessage();
    } else {
      let localScreenTracksTemp = localScreenTracks;
      setSharingScreen(false);
      document.getElementById(`user-container-${uid}`).remove();

      await client.unpublish([localScreenTracksTemp]);
      localScreenTracksTemp.close();

      setLocalScreenTracks(localScreenTracksTemp);
      switchToCamera();
    }
  };

  const leaveStream = async (e) => {
    e.preventDefault();
    displayFrame = document.getElementById("stream__box");

    for (let i = 0; localTracks.length > i; i++) {
      localTracks[i].stop();
      localTracks[i].close();
    }

    await client.unpublish([localTracks[0], localTracks[1]]);

    if (localScreenTracks) {
      await client.unpublish([localScreenTracks]);
    }
    document.getElementById(`user-container-${uid}`).remove();

    if (userIdInDisplayFrame === `user-container-${uid}`) {
      displayFrame.style.display = null;
    }
    window.open("about:blank", "_self");
    window.close();
  };
  useEffect(() => {
    joinRoomInit();
  }, []);
  /*   useEffect(() => {
    if (sharingScreen) {
      let hostElement = document.getElementsByClassName("hostDiv user-1-main");
      console.log(hostElement);
      hostElement[0].click();
    }
  }, [sharingScreen]); */
  /*   useEffect(() => {
    if (guest === "true") {
      let hostElement = document.getElementsByClassName("hostDiv user-1-main");
      console.log(hostElement);
      hostElement[0].click();
    }
  }, []); */
  const [user, setUser] = useState({
    companylocation: {
      lat: null,
      lng: null,
    },
  });
  const [product, setProduct] = useState("virtual_tour");
  const [marker, setMarker] = useState(null);
  const defaultProps = {
    center: {
      lat: 23.8859, // Default latitude for KSA
      lng: 45.0792, // Default longitude for KSA
    },
    zoom: 6,
  };
  /*   const [dynamicCenter, setDynamicCenter] = useState(defaultProps.center); */
  const [mapOptions, setMapOptions] = useState({
    center: {
      lat: 23.8859, // Default latitude for KSA
      lng: 45.0792, // Default longitude for KSA
    },
    zoom: 6,
  });
  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.lat,
      lng: event.lng,
    };

    setMarker(newMarker);
    /*  setValues({ ...values, location: newMarker }); */

    // Extract information about the marker
    console.log("Latitude:", newMarker.lat);
    console.log("Longitude:", newMarker.lng);
  };
  const handleCopy = () => {
    const temp = window.location.pathname.split("/")[2];
    copy(`${process.env.REACT_APP_BACKEND_URL}/lobby/${temp}`);
    toast.success("Link Copied!", {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
    });
  };
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const handleShowSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  console.log("sidebarOpen", sidebarOpen);

  const [userNames, setUserNames] = useState([]);
  const [userNumber, setUserNumber] = useState(0);

  /*   useEffect(() => {
    console.log("useeffect");
    let temp = [];
    let users = document.getElementsByClassName("hostDiv");
    console.log("users", users);
    for (let i = 0; i < users.length; i++) {
      let name = users[i].querySelector(".span2 p").textContent;
      console.log("name", name);

      temp.push(name);
    }
    setUserNames(temp);
  }, [count, setCount]); */
  useEffect(() => {
    console.log("useeffect");
    let users = document.getElementsByClassName("hostDiv");
    console.log("users", users);
    for (let i = 1; i < users.length; i++) {
      let name = `Guest-${i}`;
      users[i].querySelector(".span2 p").textContent = name;
    }
  }, [count, setCount]);
  console.log("userNames", userNames);
  return (
    <div id="videos">
      <div className="videoheader">
        <span className="logoSpan">
          <img src={logo} alt="" className="logo" />
          <h1>Cam</h1>
          {/*   <span className="infoSpan">
            <i className="fa-solid fa-clock"></i>
            <p>{currentTime}</p>
          </span>
          <span className="infoSpan">
            <i className="fa-solid fa-users"></i>
            <p>0/0</p>
          </span> */}
        </span>

        <button onClick={handleCopy}>
          <i className="fa-solid fa-user-plus"></i>
          <p>Invite</p>
        </button>

        {guest === "false" && (
          <i className="fa-solid fa-bars" onClick={handleShowSideBar}></i>
        )}
      </div>
      <div className="parentDiv">
        {guest === "false" && (
          <div className="leftDiv">
            <h1 className="leftDivh1">Activity</h1>
            <div className="hr" />
            {client?.remoteUsers?.length >= 1 ? (
              client.remoteUsers.map((name, index) => {
                console.log("userNames", userNames);
                return (
                  <span className="activitySpan" key={index}>
                    <p className="activityP">
                      {/* {name} */}
                      {`Guest-${index + 1}`} has joined!
                    </p>
                  </span>
                );
              })
            ) : (
              <>
                <i className="fa-solid fa-bell"></i>
                <p className="leftDivp1">You have no recent activity</p>
              </>
            )}
            <span className="span1">
              <h1 className="leftDivh1">Participants</h1>
              <i className="fa-solid fa-user-plus"></i>
            </span>
            <div
              className="hr"
              style={{
                margin: "10px 0 10px 0",
              }}
            />
            <span className="span2">
              <i className="fa-solid fa-microphone"></i>
              <p>(You)</p>
            </span>
            {client?.remoteUsers?.length >= 1
              ? client.remoteUsers.map((name, index) => {
                  console.log("userNames", userNames);
                  return (
                    <span className="span2">
                      <i className="fa-solid fa-microphone"></i>
                      <p>Guest-{index + 1}</p>
                    </span>
                  );
                })
              : ""}

            <div
              className="hr"
              style={{
                margin: "10px 0 10px 0",
              }}
            />
            {/*  <h1
            className="leftDivh1"
            style={{
              marginBottom: 0,
            }}
          >
            Chat
          </h1>
          <div
            className="hr"
            style={{
              margin: "10px 0 10px 0",
            }}
          />
          <span className="messageSpan">
            <input
              type="text"
              name="message"
              placeholder="Write your message here"
            />
            <span className="sendSpan">
              <i className="fa-solid fa-location-arrow"></i>
            </span>
          </span> */}
          </div>
        )}

        <div className="mainDiv">
          <div className="topDiv" id="top-container">
            {/*   <div
              className="hostDiv"
              id="user-1-main"
              onClick={expandVideoFrame}
            >
              <span className="span1">
                <i className="fa-solid fa-user"></i>
              </span>
              <span className="span2">
                <i className="fa-solid fa-microphone"></i>
                <p>Agency(You)</p>
              </span>
            </div> */}
            <div className="guestDiv" id="streams__container">
              {/*   <div className="hostDiv" id="user-2" onClick={expandVideoFrame}>
                <span className="span1">
                  <i className="fa-solid fa-user"></i>
                </span>
                <span className="span2">
                  <i className="fa-solid fa-microphone"></i>
                  <p>Guest-1</p>
                </span>
              </div>
              <div className="hostDiv" id="user-3" onClick={expandVideoFrame}>
                <span className="span1">
                  <i className="fa-solid fa-user"></i>
                </span>
                <span className="span2">
                  <i className="fa-solid fa-microphone"></i>
                  <p>Guest-2</p>
                </span>
              </div> */}
              {/*  <div className="hostDiv" id="user-4" onClick={expandVideoFrame}>
                <span className="span1">
                  <i className="fa-solid fa-user"></i>
                </span>
                <span className="span2">
                  <i className="fa-solid fa-microphone"></i>
                  <p>Guest-3</p>
                </span>
              </div> */}
            </div>
          </div>
          <div id="stream__box" /*  onClick={hideDisplayFrame} */></div>
          {product === "virtual_tour" && guest === "false" && (
            <div className="contentDiv">
              <iframe
                id="embed_iframe_box"
                src="https://tool.camc.sa/cms4vr/link/6645cbc90a479"
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
          {product === "floorplans" && guest === "false" && (
            <div className="contentDiv">
              <p>Floor plans</p>
              <span className="floorplanDiv">
                <img src={floorplan1} alt="" className="floorplan" />
                <img src={floorplan2} alt="" className="floorplan" />
              </span>
            </div>
          )}
          {product === "images" && guest === "false" && (
            <div className="contentDiv">
              <p>Images</p>
              <span className="imagesDiv">
                <img src={images1} alt="" className="floorplan" />
                <img src={images2} alt="" className="floorplan" />
                <img src={images3} alt="" className="floorplan" />
                <img src={images1} alt="" className="floorplan" />
                <img src={images2} alt="" className="floorplan" />
                <img src={images3} alt="" className="floorplan" />
                <img src={images1} alt="" className="floorplan" />
                <img src={images2} alt="" className="floorplan" />
                <img src={images3} alt="" className="floorplan" />
                <img src={images1} alt="" className="floorplan" />
                <img src={images2} alt="" className="floorplan" />
                <img src={images3} alt="" className="floorplan" />
              </span>
            </div>
          )}

          {product === "google_maps" && guest === "false" && (
            <div className="googlemapDiv">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY",
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={user?.companylocation ? 15 : defaultProps.zoom}
                center={mapOptions.center}
                zoom={user?.companylocation?.lat ? 15 : mapOptions.zoom}
                onClick={handleMapClick}
              >
                {marker && (
                  <AnyReactComponent lat={marker.lat} lng={marker.lng} />
                )}
              </GoogleMapReact>
            </div>
          )}

          <div className="controlDiv">
            <span
              className={`span1 ${!mic && "spanSelected"}`}
              id="mic-btn"
              onClick={toggleMic}
            >
              <i
                className={`fa-solid ${
                  mic ? "fa-microphone" : "fa-microphone-slash"
                } icon`}
              ></i>
            </span>
            {!sharingScreen && (
              <span
                className={`span1 ${!camera && "spanSelected"}`}
                id="camera-btn"
                onClick={toggleCamera}
              >
                <i
                  className={`fa-solid ${
                    camera ? "fa-video" : "fa-video-slash"
                  } icon`}
                ></i>
              </span>
            )}
            {guest === "false" && (
              <span
                className={`span1 ${sharingScreen && "screenSelected"}`}
                id="screen-btn"
                onClick={toggleScreen}
              >
                <i className="fa-solid fa-display icon"></i>
              </span>
            )}

            <span
              className="span1 callLeaveSpan1"
              id="leave-btn"
              onClick={leaveStream}
            >
              <i className="fa-solid fa-phone-slash"></i>
            </span>
          </div>
        </div>
        {guest === "false" && (
          <div
            className="rightDiv"
            style={{
              display: sidebarOpen ? "flex" : "none",
            }}
          >
            <Accordion defaultExpanded={true} className="accordian">
              <AccordionSummary
                expandIcon={<i className="fa-solid fa-angle-down"></i>}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <p>Show</p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="productDiv">
                  <div
                    className={`product ${
                      product === "virtual_tour" && "productSelected"
                    }`}
                    onClick={() => setProduct("virtual_tour")}
                  >
                    <img src={virtual_tour} alt="" className="icon" />
                    <p>Virtual tour</p>
                  </div>
                  <div
                    className={`product ${
                      product === "floorplans" && "productSelected"
                    }`}
                    onClick={() => setProduct("floorplans")}
                  >
                    <img src={floorplan} alt="" className="icon" />
                    <p>Floor plans</p>
                  </div>
                  <div
                    className={`product ${
                      product === "images" && "productSelected"
                    }`}
                    onClick={() => setProduct("images")}
                  >
                    <img src={hdimage} alt="" className="icon" />
                    <p>Images</p>
                  </div>
                  <div
                    className={`product ${
                      product === "google_maps" && "productSelected"
                    }`}
                    onClick={() => setProduct("google_maps")}
                  >
                    <i className="fa-solid fa-location-dot icon"></i>
                    <p>Google Maps</p>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded={false} className="accordian">
              <AccordionSummary
                expandIcon={<i className="fa-solid fa-angle-down"></i>}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <p>Property Information</p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="propertyDiv">
                  <h1>3D Tour Demo</h1>
                  <p>
                    {" "}
                    <b>Price:</b> 850 USD
                  </p>
                  <p>Beautiful house in sight</p>
                  <div className="mapDiv">
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: "AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY",
                      }}
                      defaultCenter={defaultProps.center}
                      defaultZoom={
                        user?.companylocation ? 15 : defaultProps.zoom
                      }
                      center={mapOptions.center}
                      zoom={user?.companylocation?.lat ? 15 : mapOptions.zoom}
                      onClick={handleMapClick}
                    >
                      {marker && (
                        <AnyReactComponent lat={marker.lat} lng={marker.lng} />
                      )}
                    </GoogleMapReact>
                  </div>

                  <span className="span1">
                    <i className="fa-solid fa-location-dot"></i>
                    <p>Pakistan ,Lorem epsum</p>
                  </span>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoComponent;
