import React, { useState, useEffect } from "react";

import GoogleMapReact from "google-map-react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
//mui
import Checkbox from "@mui/material/Checkbox";
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

const Map = ({ setValues, handleInput, values }) => {
  const [user, setUser] = useState({
    companylocation: {
      lat: null,
      lng: null,
    },
  });
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
    setValues({ ...values, location: newMarker });

    // Extract information about the marker
    console.log("Latitude:", newMarker.lat);
    console.log("Longitude:", newMarker.lng);
  };

  /*   const [userData, setUserData] = useState(); */
  /*   console.log("likeLikeOO", userDataStore); */

  const [address, setAddress] = useState("");
  /*   console.log(address); */

  const handleAddress = async () => {
    try {
      setKey("AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY");
      const response = await geocode(RequestType.ADDRESS, address.label);

      const { lat, lng } = response.results[0].geometry.location;
      const newMarker = {
        lat: lat,
        lng: lng,
      };

      setMarker(newMarker);

      setMapOptions({
        center: {
          lat: newMarker.lat,
          lng: newMarker.lng,
        },
        zoom: 15,
      });
      console.log("Latitude:", newMarker.lat);
      console.log("Longitude:", newMarker.lng);
      console.log("NNNNNNN");
      console.log(marker);

      setValues({ ...values, address: address, location: newMarker });
    } catch (error) {
      console.error(error);
    }
  };
  const handleLocation = () => {
    const { lat, lng } = marker;

    const updatedLocations = { lat, lng };

    setUser((prevUser) => ({
      ...prevUser,
      companylocation: updatedLocations,
    }));
    /*     setDynamicCenter({ lat, lng }); */
    setMapOptions({
      center: {
        lat: 23.424076, // Default latitude for UAE
        lng: 53.847818, // Default longitude for UAE
      },
      zoom: 7,
    });
    setAddress("");
    // Close the modal or perform any other actions if needed
  };

  useEffect(() => {
    handleAddress();
  }, [address]);
  console.log(
    address
      ? mapOptions.center
      : !address && !user?.companylocation.lat
      ? mapOptions.center
      : user?.companylocation.lat
      ? user.companylocation
      : mapOptions.center
  );
  return (
    <>
      <div className="mapDiv">
        <p>Address</p>
        <GooglePlacesAutocomplete
          id="addressInput"
          selectProps={{
            address,
            onChange: setAddress,
          }}
        />
        <p>Location</p>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY",
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={user?.companylocation ? 15 : defaultProps.zoom}
          center={
            address
              ? mapOptions.center
              : !address && !user?.companylocation.lat
              ? mapOptions.center
              : user?.companylocation.lat
              ? user.companylocation
              : mapOptions.center
          }
          /*    center={
                  user?.companylocation && user?.companylocation.lat
                    ? user.companylocation
                    : mapOptions.center
                } */
          zoom={user?.companylocation?.lat ? 15 : mapOptions.zoom}
          onClick={handleMapClick}
        >
          {marker && <AnyReactComponent lat={marker.lat} lng={marker.lng} />}
        </GoogleMapReact>
        <div
          className="checkboxDiv"
          style={{
            marginTop: "15px",
          }}
        >
          <Checkbox
            name="ishideLocation"
            checked={values.ishideLocation}
            onChange={handleInput}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 18 },
              "&.Mui-checked": {
                color: "#ffc600",
              },
            }}
          />
          <p>Hide the exact location to the users</p>
        </div>
      </div>
    </>
  );
};

export default Map;
