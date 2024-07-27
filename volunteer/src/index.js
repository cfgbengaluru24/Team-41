import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignUpForm from './volunteer_page/SignUpForm';
import SignInForm from './volunteer_page/SignInForm';
import DonorSignInForm from './donor_page/signin';
import DonorDashboard from './Dashboard/DonorDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/donor" element={<DonorSignInForm />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();