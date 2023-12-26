import React, { useState } from "react";

//components
import Map from "./Map";
//mui
import Checkbox from "@mui/material/Checkbox";
const PropertyDetail = () => {
  return (
    <div id="propertyDetail">
      <span className="propertydetailspan1">
        <h1>Internal Details</h1>
        <button>Save</button>
      </span>
      <span className="propertydetailspan2">
        <p>Tour not published</p>
        <span>
          <i className="fa-solid fa-house"></i>
          <p>1978430</p>
        </span>
        <span>
          <i className="fa-regular fa-folder-closed"></i>
          <p>Properties/3D Tour Demo</p>
        </span>
      </span>
      <h1 className="propertydetailh1">Tour details</h1>
      <div className="propertyDetailmainDiv">
        <div className="propertyDetailDiv1">
          <p>Property title</p>
          <input type="text" name="title" placeholder="3D Tour Demo" />
          <div className="selectDiv">
            <span className="span1">
              <p>Property type</p>
              <select
                name="country"
                className="selectInput"
                style={{
                  marginRight: "20px",
                }}
              >
                <option value="house">House</option>
                <option value="flat">Flat</option>
                <option value="aparment">Aparment</option>
                <option value="duplex">Duplex</option>
                <option value="office">Office</option>
              </select>
            </span>
            <span className="span1">
              <p>Area unit</p>
              <select
                name="country"
                className="selectInput"
                style={{
                  marginRight: "20px",
                }}
              >
                <option value="sale">Sale</option>
                <option value="rental">Rental</option>
                <option value="sold out">Sold out</option>
                <option value="rented">Rented</option>
              </select>
            </span>
            <span className="span1">
              <p>Ad type</p>
              <select
                name="country"
                className="selectInput"
                style={{
                  marginRight: "20px",
                }}
              >
                <option value="feet">Square feet (ft²)</option>
                <option value="meters">Square meters (m²)</option>
              </select>
            </span>
            <span className="span1">
              <p>Surface</p>
              <input type="text" name="surface" placeholder="123" />
            </span>
          </div>
          <div className="priceDiv">
            <span className="span1">
              <p>Coin</p>
              <select
                name="country"
                className="selectInput"
                style={{
                  marginRight: "20px",
                }}
              >
                <option value="pkr">PKR</option>
                <option value="aed">AED - Dirham</option>
                <option value="sar">SAR - Riyal</option>
              </select>
            </span>
            <span className="span1">
              <p>Price</p>
              <input type="text" name="price" placeholder="100" />
            </span>
          </div>
          <span className="textareaspan">
            <p>Property description </p>
            <textarea
              name="description"
              id="descriptionArea"
              cols="30"
              rows="10"
              placeholder=" Beautiful home in xyz..."
            ></textarea>
          </span>

          <div className="priceDiv">
            <span className="span1">
              <p>External ID</p>
              <input
                type="text"
                name="email"
                placeholder="xyz@gmail.com"
                style={{
                  marginRight: "20px",
                }}
              />
            </span>
            <span className="span1">
              <p>Agent</p>
              <select name="country" className="selectInput">
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </span>
          </div>

          <div className="checkboxDiv">
            <Checkbox
              defaultChecked
              /*    disabled={disableDiv} */
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 18 },
                "&.Mui-checked": {
                  color: "#ffc600",
                },
              }}
            />
            <p>Show Property Details</p>
          </div>
          <div className="checkboxDiv">
            <Checkbox
              defaultChecked
              /*    disabled={disableDiv} */
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 18 },
                "&.Mui-checked": {
                  color: "#ffc600",
                },
              }}
            />
            <p>Enable watermark</p>
          </div>
        </div>

        <div className="propertyDetailDiv2">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
