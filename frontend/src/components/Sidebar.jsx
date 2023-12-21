import React from "react";

const Sidebar = () => {
  return (
    <div id="sideDrawer">
      <div className="sideLinkDiv">
        <i className="fa-solid fa-table-cells-large sideIcon"></i>
        <p className="sideLinkDivp">Home</p>
      </div>
      <div className="sideLinkDiv">
        <i className="fa-solid fa-house-chimney sideIcon"></i>
        <p className="sideLinkDivp">Properties</p>
      </div>
      <div className="sideLinkDiv">
        <i className="fa-solid fa-video sideIcon"></i>
        <p className="sideLinkDivp">Videocalls</p>
      </div>
      <div className="sideLinkDiv">
        <i className="fa-solid fa-chart-pie sideIcon"></i>
        <p className="sideLinkDivp">Analytics</p>
      </div>
      <div className="sideLinkDiv">
        <i className="fa-regular fa-circle-question sideIcon"></i>
        <p className="sideLinkDivp">Help</p>
      </div>
    </div>
  );
};

export default Sidebar;
