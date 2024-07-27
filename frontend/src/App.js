import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/RegistrationForm/SignIn/SignIn';
import Registrationform from './components/RegistrationForm/Registration/registrationform';

const App = () => {
  return (
    <div className="App">
        <div className='App-logo'>
        <Router>
      <Routes>
        <Route path="/register" element={<Registrationform />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
        {/* <Registrationform></Registrationform> */}
        

        </div>
    </div>

  )
}

export default App