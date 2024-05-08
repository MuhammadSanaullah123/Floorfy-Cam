import React, { useState, useEffect } from "react";

//components
import Map from "./Map";
//mui
import Checkbox from "@mui/material/Checkbox";
//others
import { toast } from "react-toastify";
//api
import { useDispatch, useSelector } from "react-redux";
import { setProperty } from "../slices/propertySlice";
import {
  useUpdatePropertyMutation,
  useGetPropertyMutation,
} from "../slices/propertyApiSlice";
const PropertyDetail = () => {
  const dispatch = useDispatch();
  const { propertyInfo } = useSelector((state) => state.property);

  const [values, setValues] = useState({
    title: propertyInfo?.property_title ? propertyInfo?.property_title : "",
    type: propertyInfo?.property_type ? propertyInfo?.property_type : "",
    adType: propertyInfo?.ad_type ? propertyInfo?.ad_type : "",
    areaUnit: propertyInfo?.area_unit ? propertyInfo?.area_unit : "",
    surface: propertyInfo?.surface ? propertyInfo?.surface : "",
    coin: propertyInfo?.coin ? propertyInfo?.coin : "",
    price: propertyInfo?.price ? propertyInfo?.price : "",
    description: propertyInfo?.description ? propertyInfo?.description : "",
    externalId: propertyInfo?.external_ID ? propertyInfo?.external_ID : "",
    agent: propertyInfo?.agent ? propertyInfo?.agent : "",
    address: propertyInfo?.address ? propertyInfo?.address : "",
    location: propertyInfo?.location ? propertyInfo?.location : {},

    isshowPropertyDetails: propertyInfo?.showDetails
      ? propertyInfo?.showDetails
      : true,
    isenableWaterMark: propertyInfo?.enableWatermark 
      ? propertyInfo?.enableWatermark
      : true,
    ishideLocation: propertyInfo?.hideExactLocation
      ? propertyInfo?.hideExactLocation
      : false,
  });
  const [updateProperty] = useUpdatePropertyMutation();
  const [getProperty] = useGetPropertyMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  console.log(values);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = window.location.pathname.split("/")[2];
    let data = {
      user_id: userInfo._id,
      tour_id: id,
      property_title: values.title,
      property_type: values.type,
      ad_type: values.adType,
      area_unit: values.areaUnit,
      surface: values.surface,
      coin: values.coin,
      price: values.price,
      description: values.description,
      external_ID: values.externalId,
      agent: values.agent,
      address: values.address.label,
      location: values.location,
      showDetails: values.isshowPropertyDetails,
      enableWatermark: values.isenableWaterMark,
      hideExactLocation: values.ishideLocation,
    };

    try {
      const res = await updateProperty(data).unwrap();
      toast.success("Property Updated", { position: "top-center" });

      dispatch(setProperty({ ...res }));
    } catch (error) {
      console.error(error);
      toast.error(error.msg);
    }
  };

  const handleGetProperty = async () => {
    let id = window.location.pathname.split("/")[2];

    try {
      const res = await getProperty(id).unwrap();

      dispatch(setProperty({ ...res }));
    } catch (error) {
      console.error(error);
      toast.error(error.msg);
    }
  };

  useEffect(() => {
    setValues({
      title: propertyInfo?.property_title ? propertyInfo?.property_title : "",
      type: propertyInfo?.property_type ? propertyInfo?.property_type : "",
      adType: propertyInfo?.ad_type ? propertyInfo?.ad_type : "",
      areaUnit: propertyInfo?.area_unit ? propertyInfo?.area_unit : "",
      surface: propertyInfo?.surface ? propertyInfo?.surface : "",
      coin: propertyInfo?.coin ? propertyInfo?.coin : "",
      price: propertyInfo?.price ? propertyInfo?.price : "",
      description: propertyInfo?.description ? propertyInfo?.description : "",
      externalId: propertyInfo?.external_ID ? propertyInfo?.external_ID : "",
      agent: propertyInfo?.agent ? propertyInfo?.agent : "",
      address: propertyInfo?.address ? propertyInfo?.address : "",
      location: propertyInfo?.location ? propertyInfo?.location : {},
      isshowPropertyDetails: propertyInfo?.showDetails
        ? propertyInfo?.showDetails
        : true,
      isenableWaterMark: propertyInfo?.enableWatermark
        ? propertyInfo?.enableWatermark
        : true,
      ishideLocation: propertyInfo?.hideExactLocation
        ? propertyInfo?.hideExactLocation
        : false,
    });
  }, [propertyInfo]);
  useEffect(() => {
    handleGetProperty();
  }, []);

  console.log("propertyInfo", propertyInfo);
  return (
    <div id="propertyDetail">
      <span className="propertydetailspan1">
        <h1>Internal Details</h1>
        <button onClick={handleSubmit}>Save</button>
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
          <input
            type="text"
            name="title"
            placeholder="3D Tour Demo"
            value={values.title}
            onChange={handleInput}
          />
          <div className="selectDiv">
            <span className="span1">
              <p>Property type</p>
              <select
                name="type"
                className="selectInput"
                style={{
                  marginRight: "20px",
                }}
                value={values.type}
                onChange={handleInput}
              >
                <option value="house">House</option>
                <option value="flat">Flat</option>
                <option value="aparment">Aparment</option>
                <option value="duplex">Duplex</option>
                <option value="office">Office</option>
              </select>
            </span>
            <span className="span1">
              <p>Ad type</p>
              <select
                name="adType"
                className="selectInput"
                style={{
                  marginRight: "20px",
                }}
                value={values.adType}
                onChange={handleInput}
              >
                <option value="sale">Sale</option>
                <option value="rental">Rental</option>
                <option value="sold out">Sold out</option>
                <option value="rented">Rented</option>
              </select>
            </span>
            <span className="span1">
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
            <span className="span1">
              <p>Surface</p>
              <input
                type="text"
                name="surface"
                placeholder="123"
                value={values.surface}
                onChange={handleInput}
              />
            </span>
          </div>
          <div className="priceDiv">
            <span className="span1">
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
            <span className="span1">
              <p>Price</p>
              <input
                type="text"
                name="price"
                placeholder="100"
                value={values.price}
                onChange={handleInput}
              />
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
              value={values.description}
              onChange={handleInput}
            ></textarea>
          </span>

          <div className="priceDiv">
            <span className="span1">
              <p>External ID</p>
              <input
                type="text"
                name="externalId"
                placeholder="xyz@gmail.com"
                style={{
                  marginRight: "20px",
                }}
                value={values.email}
                onChange={handleInput}
              />
            </span>
            <span className="span1">
              <p>Agent</p>
              <select
                name="agent"
                className="selectInput"
                value={values.agent}
                onChange={handleInput}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </span>
          </div>

          <div className="checkboxDiv">
            <Checkbox
              name="isshowPropertyDetails"
              checked={values.isshowPropertyDetails}
              onChange={handleCheckboxChange}
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
              name="isenableWaterMark"
              checked={values.isenableWaterMark}
              onChange={handleCheckboxChange}
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
          <Map
            setValues={setValues}
            values={values}
            handleInput={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
