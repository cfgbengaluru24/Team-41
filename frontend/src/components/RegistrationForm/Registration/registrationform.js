import React, {useState} from 'react';
import './registration.css';
import SignIn from '../SignIn/SignIn';
import { Link } from 'react-router-dom';

const Registrationform = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    password: '',
    state: '',
    city: '',
    

  });



 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="cloth_donors_form">
        <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      
      <div className="cloth_donors_form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="cloth_donors_form-group">
        <label>Phone Number:</label>
      <input 
         type="number"
         name="phone_number"
         value={formData.phone_number}
         onChange={handleChange} />
         </div>
      <div className="cloth_donors_form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="cloth_donors_form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
        <div className="cloth_donors_form-group">
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
    
         <div className="cloth_donors_form-group"> 
      <label>State: </label>
      <input 
         type="text"
         name="state"
         value={formData.state}
         onChange={handleChange} />
         </div>
         <div className="cloth_donors_form-group">
            <label>City: </label>
      <input 
         type="text"
         name="city"
         value={formData.city}
         onChange={handleChange} />
         </div>
         
      <button type="submit">Register</button>
    
    
    </form>

    {/* <p>Account already exists?</p>
     <Link to="/signin">
        <button type="button">Sign In</button>
      </Link>

     */}
  
        </div>
  );
};


export default Registrationform