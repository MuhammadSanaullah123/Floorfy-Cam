import React from "react";

//assets
import propertyimg from "../assets/tourexample.jpg";
//others
import Moment from "react-moment";
const VisitBox = ({ visit, call, visits, page, tourInfo, tour, number }) => {
  return (
    <div id="visitbox">
      {page === "total" ? (
        <img className="propertyimg" src={tour.images[0]} alt="" />
      ) : (
        <img className="propertyimg" src={tourInfo.images[0]} alt="" />
      )}
      <div className="visitboxParentDiv">
        <div className="visitboxd1">
          <h1>{page === "total" ? tour?.name : "vr.camc.sa"}</h1>
          <p>
            {/* 25/12/2023  */}
            {visit === "last" && (
              <Moment format="DD/MM/YYYY">{visits?.date}</Moment>
            )}
          </p>
        </div>
        <div className="visitboxd2">
          <span className="span1">
            {visit === "last" ? (
              <>
                {/*   <i className="fa-regular fa-clock"></i>
                <p>50s</p> */}
              </>
            ) : (
              <>
                <i className="fa-solid fa-trophy"></i>
                <p>{number}</p>
              </>
            )}
          </span>
          <span className="span2">
            {visit === "last" ? (
              <>
                {/*  <i className="fa-solid fa-location-dot"></i>
                <p>Punjab, PK</p> */}
              </>
            ) : (
              <>
                <i className="fa-solid fa-eye"></i>
                <p>{tour?.visited.length} Visits</p>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VisitBox;
