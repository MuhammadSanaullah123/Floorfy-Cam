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
import Profile from "./userPages/Profile";
import VideoComponent from "./components/VideoComponent";
import Lobby from "./components/Lobby";
import TermsConditions from "./userPages/TermsConditions";
import PrivaryPolicies from "./userPages/PrivaryPolicies";
import store from "./store";
import { Provider } from "react-redux";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <ToastContainer />
          {window.location.pathname !== "/signup" &&
            window.location.pathname !== "/" &&
            window.location.pathname !== "/login" &&
            window.location.pathname !== "/forgot-password" &&
            window.location.pathname !== "/terms-of-use" &&
            window.location.pathname !== "/privacy-policy" &&
            window.location.pathname.split("/")[1] !== "lobby" &&
            window.location.pathname.split("/")[1] !== "video" &&
            window.location.pathname.split("/")[1] !== "reset-password" && (
              <>
                <Header />
                <Sidebar />
              </>
            )}

          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />

            <Route exact path="/" element={<Navigate replace to="/login" />} />
            <Route exact path="/properties" element={<Properties />} />
            <Route
              exact
              path="/property/:id"
              element={<IndividualProperty />}
            />
            <Route exact path="/video/:id" element={<VideoComponent />} />
            <Route exact path="/lobby/:id" element={<Lobby />} />

            <Route exact path="/videocalls" element={<Videocalls />} />
            <Route exact path="/analytics" element={<Analytics />} />
            <Route exact path="/help" element={<Help />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/terms-of-use" element={<TermsConditions />} />
            <Route exact path="/privacy-policy" element={<PrivaryPolicies />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
