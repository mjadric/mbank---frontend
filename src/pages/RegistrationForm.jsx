import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        setError('All fields are required. Please fill out all fields.');
        return;
      }

      const response = await axios.post('https://mbank---backend.azurewebsites.net/register', formData);
      
      if (response.data.message === 'Registration successful.') {
        navigate('/login'); 
      } else {
        setError('Registration failed. Please check your information.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Email address already in use. Please use a different email address.');
      } else {
        setError('Error during registration. Please try again later.');
      }
    }
  };

  return (
    <div className="container-fluid" style={{ background: 'linear-gradient(135deg, #ffffff, #cccccc, #000000)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="col-lg-6">
        <div className="card p-4" style={{ background: '#ffffff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>
          <h3 className="text-center mb-4">Register Here</h3>
          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            <div className="mb-3 w-75">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="firstName" 
                name="firstName" 
                placeholder="First Name" 
                value={formData.firstName}
                onChange={handleInputChange} 
              />
            </div>
            <div className="mb-3 w-75">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="lastName" 
                name="lastName" 
                placeholder="Last Name" 
                value={formData.lastName}
                onChange={handleInputChange} 
              />
            </div>
            <div className="mb-3 w-75">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={handleInputChange} 
              />
            </div>
            <div className="mb-3 w-75">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={handleInputChange} 
              />
            </div>
            {error && <p className="text-danger mb-3">{error}</p>}
            <button type="submit" className="btn btn-primary btn-block mb-3 w-75">Register</button>
          </form>
          <p className="text-center mb-0">Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
