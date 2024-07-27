import React, {useState} from 'react';
import './SignIn.css';

const SignIn = () => {
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
         
      <button type="submit">Register</button>
    
    
    </form>
    </div>

  );
};


export default SignIn