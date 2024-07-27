import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import SignUpForm from "./volunteer_page/SignUpForm";
import SignInForm from "./volunteer_page/SignInForm";
import DonorSignInForm from "./donor_page/signin";
import DonorDashboard from "./Dashboard/DonorDashboard";
import DonorDashboardNew from "./Dashboard/DonorDashboardNew";
import StoreManager from "./StoreManagerDashboard/StoreManagerDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import RegisterStoreManager from "./StoreManagerDashboard/RegisterStoreManger";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreManager></StoreManager>
  </React.StrictMode>
);

reportWebVitals();
