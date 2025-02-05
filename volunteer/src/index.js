import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import SignUpForm from "./volunteer_page/SignUpForm";
import SignInForm from "./volunteer_page/SignInForm";
import DonorSignInForm from "./donor_page/signin";
import DonorDashboard from "./Dashboard/DonorDashboard";
import SendMail from "../src/pages/SendMail";
import Adminlogin from "../src/pages/adminlogin";
import Admin from "../src/pages/admin";
import Home from "../src/pages/home";
import StoreManager from "./StoreManagerDashboard/StoreManagerDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VolunteerDash from "./volunteer_page/VolunteerDashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send-mail" element={<SendMail />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/donor" element={<DonorSignInForm />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route
          path="/storemanagerdash"
          element={<StoreManager></StoreManager>}
        ></Route>
        <Route
          path="/volunteerdash"
          element={<VolunteerDash></VolunteerDash>}
        ></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
