import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableBalance = ({ updateTrigger }) => {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await axios.get('http://bank.westeurope.cloudapp.azure.com/balance', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBalances(response.data.balances);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.error || 'Error fetching balances');
        setLoading(false);
      }
    };

    fetchBalances();
  }, [updateTrigger]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(balance);
  };

  return (
    <div className="mt-5">
      <div className="container">
        <h2 className="mb-4">Available Balances</h2>
        <div className="list-group">
          {balances.map((balance, index) => (
            <div key={index} className="list-group-item bg-light">
              <h5 className="mb-1">{balance.accountType}</h5>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-1 fw-bold">Balance: {formatBalance(balance.balance)}</p>
                <h6 className="mb-1">Account Number: {balance.accountNumber}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableBalance;
