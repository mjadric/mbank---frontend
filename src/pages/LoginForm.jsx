import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
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

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      
      if (response.data.message === 'Successful login.') {
        localStorage.setItem('token', response.data.token);
        navigate('/homepage'); 
      } else {
        setError('Login failed. Please check your email and password.');
      }
    } catch (error) {
      if (error.response.status === 404) {
        setError("Account doesn't exist.");
      } else if (error.response.status === 401) {
        setError('Incorrect password.');
      } else {
        setError('Error logging in. Please try again later.');
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
    } else {
      handleLogin();
    }
  };
  

  return (
    <div className="container-fluid" style={{ background: 'linear-gradient(135deg, #ffffff, #cccccc, #000000)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="col-lg-6">
        <div className="card p-4" style={{ background: '#ffffff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>
          <h3 className="text-center mb-4">Login Here</h3>
          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            <div className="mb-3 w-75">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="text" 
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
            <button type="submit" className="btn btn-primary btn-block mb-3 w-75">Log In</button>
          </form>
          <p className="text-center mb-0">Don't have an account? <Link to="/registration">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
