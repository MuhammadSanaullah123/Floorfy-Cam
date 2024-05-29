import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

//assets
import virtual_tour from "../assets/virtual_tour.svg";
import floorplan from "../assets/floorplan.svg";
import logo1 from "../assets/brandlogo1.jpg";
import logo2 from "../assets/brandlogo2.jpg";
import virtual_tour_eg from "../assets/tourexample.jpg";
import floorplan1 from "../assets/floorplan1.jpg";
//others
import { toast } from "react-toastify";
//api
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import InvoiceTable from "../components/InvoiceTable";
//mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";

const Profile = () => {
  const [hashrender, setHashRender] = useState(false);
  const [logo, setLogo] = useState("");
  const [updateUser] = useUpdateUserMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    company_name: userInfo ? userInfo.company_name : "",
    email: userInfo ? userInfo.email : "",
    web: userInfo ? userInfo.web : "",
    coin: userInfo ? userInfo.coin : "",
    phone: userInfo ? userInfo.phone : "",
    contact_name: userInfo ? userInfo.contact_name : "",
    language: userInfo ? userInfo.language : "",
    area_unit: userInfo ? userInfo.area_unit : "",
    image: userInfo ? userInfo.image : "",
    password: "",
    conpassword: "",
  });
  const [billingValues, setBillingValues] = useState({
    name: "",
    businessName: "",
    address: "",
    country: "",
    ID: "",
    city: "",
    zipCode: "",
  });
  const [image, setImage] = useState();
  const [showMore, setShowMore] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [switchValue, setSwitchValue] = useState(false);
  console.log("switchValue", switchValue);
  const handleInput = (e) => {
    const Value = e.target.value;

    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: Value,
    }));
  };
  console.log(values);
  let hash = window.location.hash;

  const hiddenFileInput = useRef(null);

  const handleImageClick = () => {
    hiddenFileInput.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Display a preview of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      // Update the preview image source
      setPreviewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let image_url;

    if (values.password === values.conpassword) {
      if (image) {
        const dataImage = new FormData();
        dataImage.append("file", image);
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
        image_url = resData.url;
      }
      let data;
      if (image) {
        data = {
          email: values.email,
          password: values.password,
          company_name: values.company_name,
          web: values.web,
          coin: values.coin,
          phone: values.phone,
          contact_name: values.contact_name,
          language: values.language,
          area_unit: values.area_unit,
          image: image_url,
        };
      } else {
        data = {
          email: values.email,
          password: values.password,
          company_name: values.company_name,
          web: values.web,
          coin: values.coin,
          phone: values.phone,
          contact_name: values.contact_name,
          language: values.language,
          area_unit: values.area_unit,
          image: values.image,
        };
      }

      try {
        console.log(data);
        const res = await updateUser(data).unwrap();

        toast.success("Profile Updated", { position: "top-center" });
        dispatch(setCredentials({ ...res }));
      } catch (error) {
        console.error(error);
        error.data.errors.forEach((error) => {
          toast.error(error.msg);
        });
      }
    } else {
      toast.error("Passwords do not match");
    }
  };
  const handleBillingInput = (e) => {
    const Value = e.target.value;

    setBillingValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: Value,
    }));
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "6px",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    setValues({
      company_name: userInfo ? userInfo.company_name : "",
      email: userInfo ? userInfo.email : "",
      web: userInfo ? userInfo.web : "",
      coin: userInfo ? userInfo.coin : "",
      phone: userInfo ? userInfo.phone : "",
      contact_name: userInfo ? userInfo.contact_name : "",
      language: userInfo ? userInfo.language : "",
      area_unit: userInfo ? userInfo.area_unit : "",
      image: userInfo ? userInfo.image : "",
      password: "",
      conpassword: "",
    });
  }, [userInfo]);
  let planArr = ["#myplan", "#plans", "#plugins", "#payment"];
  console.log(hashrender);
  return (
    <div id="profile">
      <div className="headerDiv">
        {planArr.includes(hash) ? (
          <>
            <Link to="#myplan" onClick={() => setHashRender(!hashrender)}>
              <p
                className={` ${hash === "#myplan" ? "linkpSelected" : "linkp"}`}
              >
                My plan
              </p>
            </Link>
            <h4>|</h4>
            <Link
              to="#plans"
              onClick={() => setHashRender(!hashrender)}
              style={{
                marginLeft: "0",
              }}
            >
              <p
                className={` ${hash === "#plans" ? "linkpSelected" : "linkp"}`}
              >
                Plans
              </p>
            </Link>
            <h4>|</h4>
            <Link
              to="#plugins"
              onClick={() => setHashRender(!hashrender)}
              style={{
                marginLeft: "0",
              }}
            >
              <p
                className={` ${
                  hash === "#plugins" ? "linkpSelected" : "linkp"
                }`}
              >
                Plugins
              </p>
            </Link>

            <h4>|</h4>
            <Link
              to="#payment"
              onClick={() => setHashRender(!hashrender)}
              style={{
                marginLeft: "0",
              }}
            >
              <p
                className={` ${
                  hash === "#payment" ? "linkpSelected" : "linkp"
                }`}
              >
                Payments and invoices
              </p>
            </Link>
          </>
        ) : (
          <Link to="" onClick={() => setHashRender(!hashrender)}>
            <p className={` ${hash === "" ? "linkpSelected" : "linkp"}`}>
              Profile
            </p>
          </Link>
          /*      <h4>|</h4>
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
      </Link>  */
        )}
      </div>

      {hash === "" && (
        <div className="profileMainDiv">
          <span className="span1">
            <p>Profile data</p>
            <button onClick={handleSubmit}>Save changes</button>
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
                  /*  style={{
                    marginRight: "20px",
                  }} */
                  value={values.coin}
                  onChange={handleInput}
                >
                  <option value="pkr">PKR</option>
                  <option value="aed">AED - Dirham</option>
                  <option value="sar">SAR - Riyal</option>
                </select>
              </span>
              <span>
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleInput}
                />
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
                  name="area_unit"
                  className="selectInput"
                  /*   style={{
                    marginRight: "20px",
                  }} */
                  value={values.area_unit}
                  onChange={handleInput}
                >
                  <option value="feet">Square feet (ft²)</option>
                  <option value="meters">Square meters (m²)</option>
                </select>
              </span>

              <span>
                <p>Confirm Password</p>
                <input
                  type="password"
                  name="conpassword"
                  placeholder="Confirm Password"
                  value={values.conpassword}
                  onChange={handleInput}
                />
              </span>
            </div>

            <div className="logoDiv" onClick={handleImageClick}>
              {previewImage ? (
                <span className="span2">
                  <img src={previewImage} alt="profile" className="userImage" />
                </span>
              ) : values.image ? (
                <span className="span2">
                  <img src={values.image} alt="profile" className="userImage" />
                </span>
              ) : (
                <span className="span2">
                  <p>Your logo here</p>
                </span>
              )}

              <span className="span3" /* onClick={handleImageClick} */>
                <i className="fa-solid fa-upload"></i>
                <p>Upload logo</p>
              </span>
              <input
                id="file-uploader"
                ref={hiddenFileInput}
                style={{ display: "none" }}
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="file-uploader" className="file-label"></label>
            </div>
          </div>

          {/*   <button className="passwordBtn">Change password</button> */}
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
      {hash === "#myplan" && (
        <div className="profilemyPlan">
          <h1 className="profilemyPlanh1"> My account status</h1>
          <div
            className="hr"
            style={{
              marginTop: "15px",
            }}
          />
          <div className="profilemyPlanDiv">
            <div className="profilemyPlanDivd1">
              <p className="profilemyPlanDivd1p1">My plan</p>
              <div className="profilemyPlanDivd1contentDiv">
                <i className="fa-solid fa-cube linkIcon "></i>
                <p className="profilemyPlanDivd1contentDivp1">Small</p>
                <p className="profilemyPlanDivd1contentDivp1">$29 /month</p>
                <span className="profilemyPlanDivd1contentDivSpan">
                  <p>*No commitment</p>
                  <Link>Change</Link>
                </span>
              </div>
            </div>
            <div className="profilemyPlanDivd2">
              <p className="profilemyPlanDivd1p1">Virtual Tours</p>
              <p className="profilemyPlanDivd1p2">1 / 5 active</p>
              <p className="profilemyPlanDivd1p3">State</p>

              <span className="profilemyPlanDivd1contentDivSpan">
                <span className="profilemyPlanDivd1contentDivSpan1">
                  <p className="profilemyPlanDivd1contentDivSpanp">
                    Pending Payment
                  </p>
                </span>

                <Link className="profilemyPlanDivd1contentDivSpana">
                  Retry Payment
                </Link>
              </span>
            </div>
            <div className="profilemyPlanDivd3">
              <p className="profilemyPlanDivd1p1">Payment method</p>
              <span className="profilemyPlanDivd3Span">
                <i className="fa-brands fa-cc-visa"></i>
                <p className="profilemyPlanDivd1p2">
                  Visa finished in **** 6013
                </p>
              </span>
              <Link className="profilemyPlanDivd1a1">Update</Link>

              <p className="profilemyPlanDivd3p4">Subscription period:</p>

              <p className="profilemyPlanDivd3p5">2024/05/18 - 2024/06/18</p>
              <Link className="profilemyPlanDivd1a2">Cancel account</Link>
            </div>
          </div>
        </div>
      )}

      {hash === "#plugins" && (
        <div className="profilePlugins">
          <h1 className="profilePluginsh1">MANAGE PLUGINS</h1>
          <div className="profilePluginsmainDiv">
            <div className="profilePluginsd1">
              <i className="fa-solid fa-gear"></i>
              <span className="profilePluginsd1Span1">
                <span className="profilePluginsd1Span2">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </span>
                <span className="profilePluginsd1Span3">
                  <p className="profilePluginsd1Span3p1">Auto descriptions</p>
                  <p className="profilePluginsd1Span3p2">
                    Our technology quickly generates descriptions of your
                    properties in multiple languages.
                  </p>
                </span>
              </span>

              <span className="profilePluginsd1Span4">
                <span className="profilePluginsd1Span5">
                  <p className="profilePluginsd1Span5p1">FREE</p>
                  <p className="profilePluginsd1Span5p2">
                    $4.90 from May 15, 2024
                  </p>
                </span>
                <button>Deactivate</button>
              </span>
            </div>
            <div className="profilePluginsd1">
              <i className="fa-solid fa-gear"></i>
              <span className="profilePluginsd1Span1">
                <span className="profilePluginsd1Span2">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </span>
                <span className="profilePluginsd1Span3">
                  <p className="profilePluginsd1Span3p1">Auto descriptions</p>
                  <p className="profilePluginsd1Span3p2">
                    Our technology quickly generates descriptions of your
                    properties in multiple languages.
                  </p>
                </span>
              </span>

              <span className="profilePluginsd1Span4">
                <span className="profilePluginsd1Span5">
                  <p className="profilePluginsd1Span5p1">FREE</p>
                  <p className="profilePluginsd1Span5p2">
                    $4.90 from May 15, 2024
                  </p>
                </span>
                <button>Deactivate</button>
              </span>
            </div>
            <div
              className="profilePluginsd1"
              style={{
                opacity: "0.5",
              }}
            >
              <i className="fa-solid fa-gear"></i>
              <span className="profilePluginsd1Span1">
                <span
                  className="profilePluginsd1Span2"
                  style={{
                    backgroundColor: "#8B94A7",
                  }}
                >
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </span>
                <span className="profilePluginsd1Span3">
                  <p className="profilePluginsd1Span3p1">Auto descriptions</p>
                  <p className="profilePluginsd1Span3p2">
                    Our technology quickly generates descriptions of your
                    properties in multiple languages.
                  </p>
                </span>
              </span>

              <span className="profilePluginsd1Span4">
                <span className="profilePluginsd1Span5">
                  {/*  <p className="profilePluginsd1Span5p1">FREE</p>
                  <p className="profilePluginsd1Span5p2">
                    $4.90 from May 15, 2024
                  </p> */}
                  <span className="profilePluginsd1Span6">
                    <i className="fa-solid fa-rocket"></i>
                    <p>Coming soon!</p>
                  </span>
                </span>
                <button
                  style={{
                    backgroundColor: "#8B94A7",
                    color: "#fff",
                    border: "0",
                  }}
                >
                  Activate
                </button>
              </span>
            </div>
          </div>
        </div>
      )}

      {hash === "#plans" && (
        <div className="profilePlans">
          <div className="profilePlansHeader">
            <span
              className="profilePlansHeaderSpan1"
              style={{
                opacity: `${switchValue ? "1" : "0.5"}`,
              }}
            >
              <p className="profilePlansHeaderSpan1p1">Monthly</p>
              <p className="profilePlansHeaderSpan1p2">Without commitment</p>
            </span>
            <Switch
              aria-label="Switch demo"
              defaultChecked
              className="switchInput"
              value={switchValue}
              onChange={() => setSwitchValue(!switchValue)}
            />
            <span
              className="profilePlansHeaderSpan2"
              style={{
                opacity: `${!switchValue ? "1" : "0.5"}`,
              }}
            >
              <p className="profilePlansHeaderSpan1p1">Yearly</p>
              <p className="profilePlansHeaderSpan1p2">
                <i className="fa-solid fa-gift"></i>2 months for free
              </p>
            </span>
          </div>
          <div className="profilePlansMainDiv">
            <div className="profilePlansMainDivd1">
              <span className="profilePlansMainDivd1Span1">
                <p className="profilePlansMainDivd1Span1p1">Small</p>
                <span className="profilePlansMainDivd1Span2">
                  <p>Pending Payment</p>
                </span>
              </span>

              <i className="fa-solid fa-cube"></i>

              <p className="profilePlansMainDivd1p1">
                {switchValue ? "$29 per month" : "$299 per year"}
              </p>
              <p
                className="profilePlansMainDivd1p2"
                style={{
                  visibility: `${switchValue ? "visible" : "hidden"}`,
                }}
              >
                *No commitment
              </p>
              <div
                className="hr"
                style={{
                  margin: "10px 0",
                  background: "rgb(255,255,255,0.5)",
                }}
              >
                {" "}
              </div>
              <p className="profilePlansMainDivd1p3">
                <b>5</b> Active virtual tours
              </p>
              <span className="profilePlansMainDivd1span3">
                <i className="fa-solid fa-check"></i>
                <p className="profilePlansMainDivd1span3p1">
                  Automatic tour generation
                </p>
              </span>
              <span className="profilePlansMainDivd1span3">
                <i className="fa-solid fa-check"></i>
                <p className="profilePlansMainDivd1span3p1">
                  Virtual video calls
                </p>
              </span>
              <span className="profilePlansMainDivd1span3">
                <i className="fa-solid fa-check"></i>
                <p className="profilePlansMainDivd1span3p1">
                  Live Open-house event
                </p>
              </span>

              {showMore && (
                <>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Take measures
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Share everywhere
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Information hotspot
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">1 agent</p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      HD photo extraction
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Automatic video
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Face blurring
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Branded watermark
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">Analytics</p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <p className="profilePlansMainDivd1span3p4">x1</p>
                    <p className="profilePlansMainDivd1span3p1">
                      Floorplan +15$
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <p className="profilePlansMainDivd1span3p4">x1</p>
                    <p className="profilePlansMainDivd1span3p1">
                      3D Dollhouse +15$
                    </p>
                  </span>
                </>
              )}
              {showMore ? (
                <p
                  className="profilePlansMainDivd1span3p2"
                  onClick={() => setShowMore(false)}
                >
                  Show less <i className="fa-solid fa-angle-up"></i>
                </p>
              ) : (
                <p
                  className="profilePlansMainDivd1span3p2"
                  onClick={() => setShowMore(true)}
                >
                  Show more <i className="fa-solid fa-angle-down"></i>
                </p>
              )}

              <p className="profilePlansMainDivd1span3p3">Current plan</p>
            </div>

            <div className="profilePlansMainDivd1">
              <span className="profilePlansMainDivd1Span1">
                <p className="profilePlansMainDivd1Span1p1">Medium</p>
                {/*   <span className="profilePlansMainDivd1Span2">
                  <p>Pending Payment</p>
                </span> */}
              </span>
              <span className="profilePlansMainDivd1Span1CubeSpan">
                <i className="fa-solid fa-cube"></i>
                <i className="fa-solid fa-cube"></i>
              </span>

              <p className="profilePlansMainDivd1p1">
                {switchValue ? "$59 per month" : "$588 per year"}
              </p>
              <p
                className="profilePlansMainDivd1p2"
                style={{
                  visibility: `${switchValue ? "visible" : "hidden"}`,
                }}
              >
                *No commitment
              </p>
              <div
                className="hr"
                style={{
                  margin: "10px 0",
                  background: "rgb(255,255,255,0.5)",
                }}
              >
                {" "}
              </div>
              <p className="profilePlansMainDivd1p3">
                <b>20</b> Active virtual tours
              </p>
              <span className="profilePlansMainDivd1span3">
                <i className="fa-solid fa-check"></i>
                <p className="profilePlansMainDivd1span3p1">
                  Automatic tour generation
                </p>
              </span>
              <span className="profilePlansMainDivd1span3">
                <i className="fa-solid fa-check"></i>
                <p className="profilePlansMainDivd1span3p1">
                  Virtual video calls
                </p>
              </span>
              <span className="profilePlansMainDivd1span3">
                <i className="fa-solid fa-check"></i>
                <p className="profilePlansMainDivd1span3p1">
                  Live Open-house event
                </p>
              </span>

              {showMore && (
                <>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Take measures
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Share everywhere
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Information hotspot
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">3 agents</p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      HD photo extraction
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Automatic video
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Face blurring
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Branded watermark
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">Analytics</p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <p className="profilePlansMainDivd1span3p4">x1</p>
                    <p className="profilePlansMainDivd1span3p1">
                      Floorplan +15$
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <p className="profilePlansMainDivd1span3p4">x1</p>
                    <p className="profilePlansMainDivd1span3p1">
                      3D Dollhouse +15$
                    </p>
                  </span>
                </>
              )}
              {showMore ? (
                <p
                  className="profilePlansMainDivd1span3p2"
                  onClick={() => setShowMore(false)}
                >
                  Show less <i className="fa-solid fa-angle-up"></i>
                </p>
              ) : (
                <p
                  className="profilePlansMainDivd1span3p2"
                  onClick={() => setShowMore(true)}
                >
                  Show more <i className="fa-solid fa-angle-down"></i>
                </p>
              )}

              {/*  <p className="profilePlansMainDivd1span3p3">Current plan</p> */}
              <button className="profilePlansMainDivd1Btn">Select</button>
            </div>

            <div className="profilePlansMainDivd1">
              <span className="profilePlansMainDivd1Span1">
                <p className="profilePlansMainDivd1Span1p1">Large</p>
                {/*   <span className="profilePlansMainDivd1Span2">
                  <p>Pending Payment</p>
                </span> */}
              </span>

              <i className="fa-solid fa-cubes"></i>
              <p className="profilePlansMainDivd1p1">
                {" "}
                {switchValue ? "$99 per month" : "$996 per year"}
              </p>
              <p
                className="profilePlansMainDivd1p2"
                style={{
                  visibility: `${switchValue ? "visible" : "hidden"}`,
                }}
              >
                *No commitment
              </p>
              <div
                className="hr"
                style={{
                  margin: "10px 0",
                  background: "rgb(255,255,255,0.5)",
                }}
              >
                {" "}
              </div>
              <p className="profilePlansMainDivd1p3">
                <b>50</b> Active virtual tours
              </p>
              <span className="profilePlansMainDivd1span3">
                <i className="fa-solid fa-check"></i>
                <p className="profilePlansMainDivd1span3p1">
                  Automatic tour generation
                </p>
              </span>
              <span className="profilePlansMainDivd1span3">
                <i className="fa-solid fa-check"></i>
                <p className="profilePlansMainDivd1span3p1">
                  Virtual video calls
                </p>
              </span>
              <span className="profilePlansMainDivd1span3">
                <i className="fa-solid fa-check"></i>
                <p className="profilePlansMainDivd1span3p1">
                  Live Open-house event
                </p>
              </span>

              {showMore && (
                <>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Take measures
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Share everywhere
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Information hotspot
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">5 agents</p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      HD photo extraction
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Automatic video
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Face blurring
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">
                      Branded watermark
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <i className="fa-solid fa-check"></i>
                    <p className="profilePlansMainDivd1span3p1">Analytics</p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <p className="profilePlansMainDivd1span3p4">x1</p>
                    <p className="profilePlansMainDivd1span3p1">
                      Floorplan +15$
                    </p>
                  </span>
                  <span className="profilePlansMainDivd1span3">
                    <p className="profilePlansMainDivd1span3p4">x1</p>
                    <p className="profilePlansMainDivd1span3p1">
                      3D Dollhouse +15$
                    </p>
                  </span>
                </>
              )}
              {showMore ? (
                <p
                  className="profilePlansMainDivd1span3p2"
                  onClick={() => setShowMore(false)}
                >
                  Show less <i className="fa-solid fa-angle-up"></i>
                </p>
              ) : (
                <p
                  className="profilePlansMainDivd1span3p2"
                  onClick={() => setShowMore(true)}
                >
                  Show more <i className="fa-solid fa-angle-down"></i>
                </p>
              )}

              {/*  <p className="profilePlansMainDivd1span3p3">Current plan</p> */}
              <button className="profilePlansMainDivd1Btn">Select</button>
            </div>
          </div>
        </div>
      )}

      {hash === "#payment" && (
        <div className="profilePayment">
          <span className="profilePaymentspan1">
            <h1 className="profilePaymenth1">Check your bills</h1>
            <button onClick={handleOpen}>Modify tax domiciliation</button>
          </span>

          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="billingModal">
              <span className="billingModalSpan">
                <h1>Billing Information</h1>
                <i className="fa-solid fa-xmark" onClick={handleClose}></i>
              </span>
              <div
                className="hr"
                style={{
                  marginTop: "15px",
                }}
              ></div>
              <form action="">
                <div className="inputDiv1">
                  <span className="inputDiv1Span">
                    <p>Name and surname</p>
                    <input
                      type="text"
                      name="name"
                      onChange={handleBillingInput}
                      value={billingValues.name}
                    />
                  </span>
                  <span className="inputDiv1Span">
                    <p>Business name</p>
                    <input
                      type="text"
                      name="businessName"
                      onChange={handleBillingInput}
                      value={billingValues.businessName}
                    />
                  </span>
                </div>
                <div className="inputDiv1">
                  <span className="inputDiv1Span">
                    <p>Billing Address</p>
                    <input
                      type="text"
                      name="address"
                      onChange={handleBillingInput}
                      value={billingValues.address}
                    />
                  </span>
                </div>

                <div className="inputDiv1">
                  <span className="inputDiv1Span">
                    <p>Country</p>
                    <input
                      type="text"
                      name="country"
                      onChange={handleBillingInput}
                      value={billingValues.country}
                    />
                  </span>
                  <span className="inputDiv1Span">
                    <p>CIF/NIF/VAT/TIN</p>
                    <input
                      type="text"
                      name="ID"
                      onChange={handleBillingInput}
                      value={billingValues.ID}
                    />
                  </span>
                </div>

                <div className="inputDiv1">
                  <span className="inputDiv1Span">
                    <p>City</p>
                    <input
                      type="text"
                      name="city"
                      onChange={handleBillingInput}
                      value={billingValues.city}
                    />
                  </span>
                  <span className="inputDiv1Span">
                    <p>Zip Code</p>
                    <input
                      type="text"
                      name="zipCode"
                      onChange={handleBillingInput}
                      value={billingValues.zipCode}
                    />
                  </span>
                </div>
                <button className="saveBillingBtn">Save changes</button>
              </form>
            </Box>
          </Modal>

          <div
            className="hr"
            style={{
              marginTop: "15px",
            }}
          ></div>
          <InvoiceTable />
        </div>
      )}
    </div>
  );
};

export default Profile;
