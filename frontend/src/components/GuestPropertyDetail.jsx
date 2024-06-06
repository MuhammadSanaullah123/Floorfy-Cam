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
const GuestPropertyDetail = () => {
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

  const handleGetProperty = async () => {
    let id = window.location.pathname.split("/")[3];

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
              >
                <option>
                  {values.type.charAt(0).toUpperCase() + values.type.slice(1)}
                </option>
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
              >
                <option>
                  {values.adType.charAt(0).toUpperCase() +
                    values.adType.slice(1)}
                </option>
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
              >
                <option>
                  {values.areaUnit === "meters"
                    ? "Square meters (m²)"
                    : "Square feet (ft²)"}{" "}
                </option>
              </select>
            </span>
            <span className="span1">
              <p>Surface</p>
              <input
                type="text"
                name="surface"
                placeholder="123"
                value={values.surface}
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
              >
                <option>{values.coin.toUpperCase()}</option>
              </select>
            </span>
            <span className="span1">
              <p>Price</p>
              <input
                type="text"
                name="price"
                placeholder="100"
                value={values.price}
              />
            </span>
          </div>
          <span
            className="textareaspan"
            style={{
              marginBottom: "20px",
            }}
          >
            <p>Property description </p>
            <textarea
              name="description"
              id="descriptionArea"
              cols="30"
              rows="10"
              placeholder=" Beautiful home in xyz..."
              value={values.description}
            ></textarea>
          </span>
        </div>

        <div className="propertyDetailDiv2">
          <Map setValues={setValues} values={values} />
        </div>
      </div>
    </div>
  );
};

export default GuestPropertyDetail;
