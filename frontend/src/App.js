import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/RegistrationForm/SignIn/SignIn';
import Registrationform from './components/RegistrationForm/Registration/registrationform';
import EduParentDashboard from './components/RegistrationForm/EduParent/EduParentDashboard';

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="App-logo">
          <Routes>
            <Route path="/eduParent" element={<EduParentDashboard />} />
            {/* Fallback route to handle undefined paths */}
            <Route path="*" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
