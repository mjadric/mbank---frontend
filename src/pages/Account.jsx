import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/NavBar';

const AccountForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://mbank---backend.azurewebsites.net/account', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUserData(response.data.data.user);
          setPhoneNumber(response.data.data.user.phoneNumber || ''); 
        } else {
          console.error('Error fetching user data:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const isValid = validatePhoneNumber(value);
    setIsPhoneNumberValid(isValid);
    setPhoneNumber(value);
    setShowMessage(false); // Sakrij poruku kad korisnik promijeni broj mobitela
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  };

  const saveChanges = async () => {
    if (!isPhoneNumberValid) {
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        'https://mbank---backend.azurewebsites.net/update-phone-number',
        {
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        setShowMessage(true); 
      } else {
        console.error('Error saving account data:', response.data.error);
      }
    } catch (error) {
      console.error('Error saving account data:', error);
    }
  };

  return (
    <div>
      <Navbar 
        elements={[
          { to: '/homepage', label: 'Home' },
          { to: '/card', label: 'Cards' },
          { to: '/maketransaction', label: 'Make Transaction' },
          { to: '/alltransactions', label: 'Transactions' }
        ]} 
        showLogout={true} 
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="container rounded bg-white mt-5">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-center">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">First Name</label>
                    <input type="text" className="form-control" value={userData.firstName} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Last Name</label>
                    <input type="text" className="form-control" value={userData.lastName} readOnly />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Email</label>
                    <input type="email" className="form-control" value={userData.email} readOnly />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Mobile Number</label>
                    <input
                      type="tel"
                      className={`bg-light form-control ${isPhoneNumberValid ? '' : 'is-invalid'}`}
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />   
                    {!isPhoneNumberValid && (
                      <div className="invalid-feedback">Please enter a valid phone number</div>
                    )}
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button className="btn btn-primary mr-3" onClick={saveChanges}>
                    Save Changes
                  </button>
                </div>
                {showMessage && (
                  <div className="mt-3 alert alert-success text-center">Phone number successfully updated!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;
