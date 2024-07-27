import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../volunteer_page/SignInForm.css';

function DonorSignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email === 'admin@gmail.com' && password === 'admin') {
      navigate('/donor-dashboard', { state: { donorId: '66a50d11a02dadd800ffda42' } });
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default DonorSignInForm;