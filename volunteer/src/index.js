import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import reportWebVitals from './reportWebVitals';
import SignUpForm from './volunteer_page/SignUpForm';
import SignInForm from './volunteer_page/SignInForm';
import DonorSignInForm from './donor_page/signin';
import DonorDashboard from './Dashboard/DonorDashboard';
import SendMail from '../src/pages/SendMail';
import AdminMain from '../src/pages/admin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/send-mail" element={<SendMail />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/donor" element={<DonorSignInForm />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/admin" element={ <AdminMain /> } />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();