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
import Properties from "./userPages/Properties";
const App = () => {
  return (
    <>
      <Router>
        <ToastContainer />
        <Header />
        <Sidebar />

        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Navigate replace to="/home" />} />
          <Route exact path="/properties" element={<Properties />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
