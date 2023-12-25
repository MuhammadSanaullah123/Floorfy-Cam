import React from "react";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const currentPage = window.location.pathname;
  return (
    <div id="sideDrawer">
      <div
        className={`sideLinkDiv ${
          currentPage === "/home" ? "sideLinkDivSelected" : "sideLinkDiv"
        }`}
        onClick={() => navigate("/home")}
      >
        <i
          className={`fa-solid fa-table-cells-large  ${
            currentPage === "/home" ? "sideIconSelected" : "sideIcon"
          }`}
        ></i>
        <p
          className={`${
            currentPage === "/home" ? "sideLinkDivpSelected" : "sideLinkDivp"
          }`}
        >
          Home
        </p>
      </div>

      <div
        className={`sideLinkDiv ${
          currentPage === "/properties" ? "sideLinkDivSelected" : "sideLinkDiv"
        }`}
        onClick={() => navigate("/properties#active")}
      >
        <i
          className={`fa-solid fa-house-chimney  ${
            currentPage === "/properties" ? "sideIconSelected" : "sideIcon"
          }`}
        ></i>
        <p
          className={`${
            currentPage === "/properties"
              ? "sideLinkDivpSelected"
              : "sideLinkDivp"
          }`}
        >
          Properties
        </p>
      </div>

      <div
        className={`sideLinkDiv ${
          currentPage === "/videocalls" ? "sideLinkDivSelected" : "sideLinkDiv"
        }`}
        onClick={() => navigate("/videocalls#videocalls")}
      >
        <i
          className={`fa-solid fa-video  ${
            currentPage === "/videocalls" ? "sideIconSelected" : "sideIcon"
          }`}
        ></i>
        <p
          className={`${
            currentPage === "/videocalls"
              ? "sideLinkDivpSelected"
              : "sideLinkDivp"
          }`}
        >
          Videocalls
        </p>
      </div>

      <div
        className={`sideLinkDiv ${
          currentPage === "/analytics" ? "sideLinkDivSelected" : "sideLinkDiv"
        }`}
        onClick={() => navigate("/analytics")}
      >
        <i
          className={`fa-solid fa-chart-pie  ${
            currentPage === "/analytics" ? "sideIconSelected" : "sideIcon"
          }`}
        ></i>
        <p
          className={`${
            currentPage === "/analytics"
              ? "sideLinkDivpSelected"
              : "sideLinkDivp"
          }`}
        >
          Analytics
        </p>
      </div>

      <div
        className={`sideLinkDiv ${
          currentPage === "/help" ? "sideLinkDivSelected" : "sideLinkDiv"
        }`}
        onClick={() => navigate("/help")}
      >
        <i
          className={`fa-regular fa-circle-question  ${
            currentPage === "/help" ? "sideIconSelected" : "sideIcon"
          }`}
        ></i>
        <p
          className={`${
            currentPage === "/help" ? "sideLinkDivpSelected" : "sideLinkDivp"
          }`}
        >
          Help
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
