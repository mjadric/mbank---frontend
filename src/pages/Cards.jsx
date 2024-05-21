import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/NavBar';

const CreditCard = () => {
  const [userData, setUserData] = useState(null);
  const [creditCards, setCreditCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://bank.westeurope.cloudapp.azure.com/card', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        if (data.success) {
          setUserData(data.data.user);
          setCreditCards(data.data.creditCards);
        } else {
          setError('Error fetching card data');
        }
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      }
    };

    fetchCardData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData || creditCards.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar 
        elements={[
          { to: '/homepage', label: 'Home' },
          { to: '/account', label: 'Account' },
          { to: '/maketransaction', label: 'Make Transaction' },
          { to: '/alltransactions', label: 'Transactions' },
        ]} 
        showLogout={true} 
      />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>User Information</h2>
            <p>
              First Name: <input type="text" value={userData.firstName} readOnly />
            </p>
            <p>
              Last Name: <input type="text" value={userData.lastName} readOnly />
            </p>
            <p>
              Email: <input type="email" value={userData.email} readOnly />
            </p>
          </div>
          <div className="col-md-6">
            <h2>Credit Cards</h2>
            {creditCards.map(card => (
              <div key={card._id} className="mb-3 shadow p-3">
                <div className="card p-3">
                  <div
                    number={card.creditCardNumber}
                    name={`${userData.firstName} ${userData.lastName}`}
                    expiry={card.expiryDate || '01/23'} 
                    focused={null}
                  />
                  <div className="mt-3">
                    <p>Card Number: {card.creditCardNumber}</p>
                    <p>Card Limit: {card.cardLimit}</p>
                    <p>Expiry Date: {new Date(card.expiryDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
