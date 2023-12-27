import React, { useState } from "react";
import { Link } from "react-router-dom";

//assets
import virtual_tour from "../assets/virtual_tour.svg";
import floorplan from "../assets/floorplan.svg";
import logo1 from "../assets/brandlogo1.jpg";
import logo2 from "../assets/brandlogo2.jpg";
import virtual_tour_eg from "../assets/tourexample.jpg";
import floorplan1 from "../assets/floorplan1.jpg";

const Profile = () => {
  const [hashrender, setHashRender] = useState(false);
  const [logo, setLogo] = useState("");

  const [values, setValues] = useState({
    company_name: "",
    email: "",
    web: "",
    coin: "",
    phone: "",
    contact_name: "",
    language: "",
    areaUnit: "",
  });
  const handleInput = (e) => {
    const Value = e.target.value;

    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: Value,
    }));
  };
  console.log(values);
  let hash = window.location.hash;
  return (
    <div id="profile">
      <div className="headerDiv">
        <Link to="" onClick={() => setHashRender(!hashrender)}>
          <p className={` ${hash === "" ? "linkpSelected" : "linkp"}`}>
            Profile
          </p>
        </Link>
        <h4>|</h4>
        <Link
          to="#users"
          onClick={() => setHashRender(!hashrender)}
          style={{
            marginLeft: "0",
          }}
        >
          <p className={` ${hash === "#users" ? "linkpSelected" : "linkp"}`}>
            Manage users
          </p>
        </Link>
        <h4>|</h4>
        <Link
          to="#brand"
          onClick={() => setHashRender(!hashrender)}
          style={{
            marginLeft: "0",
          }}
        >
          <p
            className={` ${
              hash.split("#")[1] === "brand" ? "linkpSelected" : "linkp"
            }`}
          >
            Brand
          </p>
        </Link>
      </div>

      {hash === "" && (
        <div className="profileMainDiv">
          <span className="span1">
            <p>Profile data</p>
            <button>Save changes</button>
          </span>
          <hr
            className="hr"
            style={{
              opacity: "0.5",
            }}
          />
          <div className="profileMainDivd1">
            <div className="profileMainDivinput1">
              <span>
                <p>Company name</p>
                <input
                  type="text"
                  name="company_name"
                  placeholder="New name"
                  value={values.company_name}
                  onChange={handleInput}
                />
              </span>
              <span>
                <p>Email</p>
                <input
                  type="text"
                  name="email"
                  placeholder="xyz@gmail.com"
                  value={values.email}
                  onChange={handleInput}
                />
              </span>
              <span>
                <p>Web</p>
                <input
                  type="text"
                  name="web"
                  placeholder="New web"
                  value={values.web}
                  onChange={handleInput}
                />
              </span>
              <span>
                <p>Coin</p>
                <select
                  name="coin"
                  className="selectInput"
                  style={{
                    marginRight: "20px",
                  }}
                  value={values.coin}
                  onChange={handleInput}
                >
                  <option value="pkr">PKR</option>
                  <option value="aed">AED - Dirham</option>
                  <option value="sar">SAR - Riyal</option>
                </select>
              </span>
            </div>
            <div className="profileMainDivinput2">
              <span>
                <p>Phone</p>
                <input
                  type="text"
                  name="phone"
                  placeholder="New phone"
                  value={values.phone}
                  onChange={handleInput}
                />
              </span>
              <span>
                <p>Contact name</p>
                <input
                  type="text"
                  name="contact_name"
                  placeholder="Contact name"
                  value={values.contact_name}
                  onChange={handleInput}
                />
              </span>
              <span>
                <p>Language</p>
                <select
                  name="language"
                  className="selectInput"
                  /*      style={{
              marginRight: "20px",
            }} */
                  value={values.language}
                  onChange={handleInput}
                >
                  <option value="english">English</option>
                  <option value="italiano">Italiano</option>
                  <option value="deutsch">Deutsch</option>
                </select>
              </span>
              <span>
                <p>Area unit</p>
                <select
                  name="areaUnit"
                  className="selectInput"
                  style={{
                    marginRight: "20px",
                  }}
                  value={values.areaUnit}
                  onChange={handleInput}
                >
                  <option value="feet">Square feet (ft²)</option>
                  <option value="meters">Square meters (m²)</option>
                </select>
              </span>
            </div>

            <div className="logoDiv">
              <span className="span2">
                <p>Your logo here</p>
              </span>
              <span className="span3">
                <i className="fa-solid fa-upload"></i>
                <p>Upload logo</p>
              </span>
            </div>
          </div>

          <button className="passwordBtn">Change password</button>
        </div>
      )}
      {hash === "#users" && (
        <div className="profileUsers">
          <span className="span1">
            <i className="fa-solid fa-users"></i>
          </span>
          <h1>Users not found.</h1>
          <p>Click the button to add more users.</p>
          <button>
            <i className="fa-solid fa-plus"></i>
            <p>Invite a user</p>
          </button>
        </div>
      )}
      {hash.split("#")[1] === "brand" && (
        <div className="profileBrand">
          <h1>Customize your brand</h1>
          <p>
            Add your logo to appear in the virtual tour, videos and generated
            images.
          </p>
          <div className="mainDiv">
            <div className="subheaderDiv">
              <Link
                to="#brand"
                className={` ${hash === "#brand" ? "aSelected" : ""}`}
                onClick={() => setHashRender(!hashrender)}
              >
                <img src={virtual_tour} alt="" />
                <p
                  className={` ${
                    hash === "#brand" ? "linkpSelected" : "linkp"
                  }`}
                >
                  Virtual tours
                </p>
              </Link>

              <Link
                to="#brand#floorplan"
                className={` ${hash === "#brand#floorplan" ? "aSelected" : ""}`}
                onClick={() => setHashRender(!hashrender)}
              >
                <img src={floorplan} alt="" />
                <p
                  className={` ${
                    hash === "#brand#floorplan" ? "linkpSelected" : "linkp"
                  }`}
                >
                  Floorplans
                </p>
              </Link>

              <Link
                to="#brand#photos"
                className={` ${hash === "#brand#photos" ? "aSelected" : ""}`}
                onClick={() => setHashRender(!hashrender)}
              >
                <i className="fa-regular fa-image"></i>
                <p
                  className={` ${
                    hash === "#brand#photos" ? "linkpSelected" : "linkp"
                  }`}
                >
                  Photos
                </p>
              </Link>
              <Link
                to="#brand#videos"
                className={` ${hash === "#brand#videos" ? "aSelected" : ""}`}
                onClick={() => setHashRender(!hashrender)}
              >
                <i className="fa-solid fa-film"></i>
                <p
                  className={` ${
                    hash === "#brand#videos" ? "linkpSelected" : "linkp"
                  }`}
                >
                  Videos
                </p>
              </Link>
              <button>Save changes</button>
            </div>
            <hr
              className="hr"
              style={{
                opacity: "0.8",
                marginTop: "0",
              }}
            />
            {hash === "#brand" && (
              <div className="contentDiv">
                <div className="contentDiv1">
                  <p>WATERMARK ON THE FLOOR</p>
                  <span className="span1">
                    <i className="fa-solid fa-circle-info"></i>
                    <span className="span2">
                      <h1>Required format:</h1>
                      <p>JPG Image. Square shape recommended .</p>
                    </span>
                  </span>
                  <p className="logop">Select a main logo</p>
                  <div className="imageDiv">
                    <span className="addSpan">
                      <i className="fa-solid fa-plus"></i>
                    </span>
                    <span
                      className={`imgSpan ${
                        logo === "logo1" ? "imgSpanSelected" : "imgSpan"
                      }`}
                    >
                      <span
                        className={`imgSpan1 ${
                          logo === "logo1" ? "imgSpan1Selected" : "imgSpan1"
                        }`}
                        onClick={() => setLogo("logo1")}
                      >
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <img src={logo1} alt="" />
                      <i className="fa-solid fa-trash-can"></i>
                    </span>
                    <span
                      className={`imgSpan ${
                        logo === "logo2" ? "imgSpanSelected" : "imgSpan"
                      }`}
                    >
                      <span
                        className={`imgSpan1 ${
                          logo === "logo2" ? "imgSpan1Selected" : "imgSpan1"
                        }`}
                        onClick={() => setLogo("logo2")}
                      >
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <img src={logo2} alt="" />
                      <i className="fa-solid fa-trash-can"></i>
                    </span>
                    <span
                      className={`imgSpan ${
                        logo === "logo2" ? "imgSpanSelected" : "imgSpan"
                      }`}
                    >
                      <span
                        className={`imgSpan1 ${
                          logo === "logo2" ? "imgSpan1Selected" : "imgSpan1"
                        }`}
                        onClick={() => setLogo("logo2")}
                      >
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <img src={logo2} alt="" />
                      <i className="fa-solid fa-trash-can"></i>
                    </span>
                    <span
                      className={`imgSpan ${
                        logo === "logo2" ? "imgSpanSelected" : "imgSpan"
                      }`}
                    >
                      <span
                        className={`imgSpan1 ${
                          logo === "logo2" ? "imgSpan1Selected" : "imgSpan1"
                        }`}
                        onClick={() => setLogo("logo2")}
                      >
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <img src={logo2} alt="" />
                      <i className="fa-solid fa-trash-can"></i>
                    </span>
                    <span
                      className={`imgSpan ${
                        logo === "logo2" ? "imgSpanSelected" : "imgSpan"
                      }`}
                    >
                      <span
                        className={`imgSpan1 ${
                          logo === "logo2" ? "imgSpan1Selected" : "imgSpan1"
                        }`}
                        onClick={() => setLogo("logo2")}
                      >
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <img src={logo2} alt="" />
                      <i className="fa-solid fa-trash-can"></i>
                    </span>
                  </div>
                </div>
                <div className="contentDiv2">
                  <p>Preview</p>
                  <img src={virtual_tour_eg} alt="" />
                </div>
              </div>
            )}

            {hash === "#brand#floorplan" && (
              <div className="contentDiv">
                <div className="contentDiv1">
                  <p>WATERMARK</p>
                  <span className="span1">
                    <i className="fa-solid fa-circle-info"></i>
                    <span className="span2">
                      <h1>Required format:</h1>
                      <p>JPG or PNG image</p>
                    </span>
                  </span>

                  <div className="floorplanimageDiv">
                    <p
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      Logo
                    </p>
                    <span>
                      <i className="fa-solid fa-upload"></i>
                      <p>Browse files</p>
                    </span>
                  </div>
                </div>
                <div className="contentDiv2">
                  <p>Preview</p>
                  <img src={floorplan1} alt="" />
                </div>
              </div>
            )}

            {hash === "#brand#photos" && (
              <div className="contentDiv">
                <div className="contentDiv1">
                  <p>WATERMARK</p>
                  <span className="span1">
                    <i className="fa-solid fa-circle-info"></i>
                    <span className="span2">
                      <h1>Required format:</h1>
                      <p>JPG or PNG image</p>
                    </span>
                  </span>

                  <div className="floorplanimageDiv">
                    <p
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      Logo
                    </p>
                    <span>
                      <i className="fa-solid fa-upload"></i>
                      <p>Browse files</p>
                    </span>
                  </div>
                </div>
                <div className="contentDiv2">
                  <p>Preview</p>
                  <img src={virtual_tour_eg} alt="" />
                </div>
              </div>
            )}

            {hash === "#brand#videos" && (
              <div className="contentDiv">
                <div className="contentDiv1">
                  <p>WATERMARK</p>
                  <span className="span1">
                    <i className="fa-solid fa-circle-info"></i>
                    <span className="span2">
                      <h1>Required format:</h1>
                      <p>JPG or PNG image</p>
                    </span>
                  </span>

                  <div className="floorplanimageDiv">
                    <p
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      Logo
                    </p>
                    <span>
                      <i className="fa-solid fa-upload"></i>
                      <p>Browse files</p>
                    </span>
                  </div>
                </div>
                <div className="contentDiv2">
                  <p>Preview</p>
                  <img src={virtual_tour_eg} alt="" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
