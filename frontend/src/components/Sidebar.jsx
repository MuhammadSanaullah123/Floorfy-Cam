import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const currentPage = window.location.pathname;

  /*   useEffect(() => {
    const mobile = window.innerWidth < 768; 
  }, []);
 */
  return (
    <div
      id="sideDrawer"
      style={{
        display: currentPage.split("/")[1] === "guest" && "none",
      }}
    >
      <div
        className={`sideLinkDiv ${
          currentPage === "/home" ? "sideLinkDivSelected" : "sideLinkDiv"
        }`}
        onClick={() => navigate("/home")}
      >
        <i
          className={`fa-solid fa-globe  ${
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
          window.location.hash === `#plugins`
            ? "sideLinkDivSelected"
            : "sideLinkDiv"
        }`}
        onClick={() => navigate("/profile#plugins")}
      >
        <i
          className={`fa-solid fa-puzzle-piece  ${
            window.location.hash === `#plugins`
              ? "sideIconSelected"
              : "sideIcon"
          }`}
        ></i>
        <p
          className={`${
            window.location.hash === `#plugins`
              ? "sideLinkDivpSelected"
              : "sideLinkDivp"
          }`}
        >
          Plugins
        </p>
      </div>

      <div
        className={`sideLinkDiv ${
          currentPage === "/analytics" ? "sideLinkDivSelected" : "sideLinkDiv"
        }`}
        onClick={() => window.location.assign("/analytics")}
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
