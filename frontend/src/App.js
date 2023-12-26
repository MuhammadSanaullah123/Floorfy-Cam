import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./userPages/Home";
import Login from "./userPages/Login";
import Signup from "./userPages/Signup";
import Properties from "./userPages/Properties";
import Videocalls from "./userPages/Videocalls";
import Analytics from "./userPages/Analytics";
import Help from "./userPages/Help";
import IndividualProperty from "./userPages/IndividualProperty";
const App = () => {
  return (
    <>
      <Router>
        <ToastContainer />
        {window.location.pathname !== "/signup" &&
          window.location.pathname !== "/" &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/forgot-password" &&
          window.location.pathname.split("/")[1] !== "reset-password" && (
            <>
              <Header />
              <Sidebar />
            </>
          )}
        {/*   {window.location.pathname !== "/signup" &&
          window.location.pathname !== "/" &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/forgot-password" &&
          window.location.pathname.split("/")[1] !== "reset-password" && (
            <>
              <Sidebar />
            </>
          )} */}
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />

          <Route exact path="/" element={<Navigate replace to="/login" />} />
          <Route exact path="/properties" element={<Properties />} />
          <Route exact path="/property/:id" element={<IndividualProperty />} />

          <Route exact path="/videocalls" element={<Videocalls />} />
          <Route exact path="/analytics" element={<Analytics />} />
          <Route exact path="/help" element={<Help />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
