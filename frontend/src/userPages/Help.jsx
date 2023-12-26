import React from "react";

//other
import YouTube from "react-youtube";
import "react-phone-number-input/style.css";
//assets
import QuestionDiv from "../components/QuestionDiv";

const Help = () => {
  const options = {
    height: "390",
    width: "500",
    borderRadius: "12px",
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };
  return (
    <div id="help">
      <div className="videoParentDiv">
        <div className="videoDiv">
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
        </div>
        <div className="videoDiv">
          <h1>How to virtualize properties</h1>
          <p>
            Learn how to virtualize your properties with the following video or
            the quick guide.
          </p>
          <YouTube
            videoId="p6bT2x7yMUA"
            options={options}
            /*  onReady={this._onReady} */
            id="video"
          />
        </div>
        <div className="videoDiv">
          <h1>PDF manual</h1>
          <p>
            Explore our manual explaining step by step how to virtualize a
            property.
          </p>
          <YouTube
            videoId="p6bT2x7yMUA"
            options={options}
            /*  onReady={this._onReady} */
            id="video"
          />
        </div>
      </div>
      <div className="questionDiv">
        <h1>Frequently asked questions</h1>
        <div
          className="hr"
          style={{
            margin: "20px 0 20px 0",
          }}
        />
        <QuestionDiv />
        {/*  <QuestionDiv />
        <QuestionDiv /> */}
      </div>
    </div>
  );
};

export default Help;
