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
const App = () => {
  return (
    <>
      <Router>
        <ToastContainer />
        <Header />
        <Routes>
          {/* User Routes */}

          {/*          <Route exact path="/user/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
