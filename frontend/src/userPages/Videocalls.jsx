import React, { useState } from "react";
import { Link } from "react-router-dom";

//assets
import videocallsimg from "../assets/videocalls.svg";
import openhouseimg from "../assets/openhouse.svg";
//components
import VideoCallDiv from "../components/VideoCallDiv";

const Videocalls = () => {
  const [hashrender, setHashRender] = useState(false);
  let hash = window.location.hash;
  return (
    <div id="videocalls">
      <div className="headerDiv">
        <Link to="#videocalls" onClick={() => setHashRender(!hashrender)}>
          <p
            className={` ${hash === "#videocalls" ? "linkpSelected" : "linkp"}`}
          >
            Video Calls
          </p>
        </Link>
        {/*       <h4>|</h4>
        <Link
          to="#openhouses"
          onClick={() => setHashRender(!hashrender)}
          style={{
            marginLeft: "0",
          }}
        >
          <p
            className={` ${hash === "#openhouses" ? "linkpSelected" : "linkp"}`}
          >
            Open Houses
          </p>
        </Link> */}
      </div>

      {hash === "#videocalls" && <VideoCallDiv />}
      {hash === "#videocalls" && <VideoCallDiv />}
      {hash === "#videocalls" && <VideoCallDiv />}

      {hash === "#openhouses" && <VideoCallDiv />}
      {hash === "#openhouses" && <VideoCallDiv />}
      {hash === "#openhouses" && <VideoCallDiv />}

      {/*  <div className="noContentDiv">
        <img
          src={hash !== "#openhouses" ? videocallsimg : openhouseimg}
          alt=""
        />
        <h1>
          {hash !== "#openhouses"
            ? "You don't have video calls yet"
            : "You don't have Open House records yet"}
        </h1>
        <p>Start one from one of your properties</p>

        <Link to="/properties#active">Go to My Properties</Link>
      </div>
 */}
    </div>
  );
};

export default Videocalls;
