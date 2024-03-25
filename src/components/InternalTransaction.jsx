import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InternalTransaction = ({ updateData }) => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transferData, setTransferData] = useState({
    accountFrom: '',
    accountTo: '',
    amount: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserAccounts = async () => {
      try {
        const response = await axios.get('https://mbank-backend.azurewebsites.net/account', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserAccounts(response.data.data.accounts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user accounts:', error);
        setError('Error fetching user accounts');
        setLoading(false);
      }
    };

    fetchUserAccounts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData({
      ...transferData,
      [name]: name === 'amount' ? parseInt(value) : value
    });
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    const { accountFrom, accountTo, amount } = transferData;
  
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Amount must be a positive number');
      setSuccessMessage('');
      return;
    }
  
    try {
      const response = await axios.post('https://mbank-backend.azurewebsites.net/transactions/internal-transfer', transferData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      updateData();
    } catch (error) {
      setErrorMessage(error.response.data.error || 'Error processing internal transfer');
      setSuccessMessage('');
    }
  };
  

  return (
    <div className="container-lg mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Internal Transaction</h2>
              <form onSubmit={handleTransferSubmit}>
              <div className="form-group">
                  <label>From Account:</label>
                  <select className="form-control" name="accountFrom" value={transferData.accountFrom} onChange={handleInputChange}>
                    <option value="">Select initial account</option>
                    {userAccounts.map(account => (
                      <option key={account.accountNumber} value={account.accountNumber}>{account.accountNumber}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>To Account:</label>
                  <select className="form-control" name="accountTo" value={transferData.accountTo} onChange={handleInputChange}>
                    <option value="">Select destination account</option>
                    {userAccounts.map(account => (
                      <option key={account.accountNumber} value={account.accountNumber}>{account.accountNumber}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Amount:</label>
                  <input className="form-control" type="number" name="amount" value={transferData.amount} onChange={handleInputChange} />
                </div>
                <button className="btn btn-primary" type="submit">Transfer</button>
              </form>
              {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
              {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalTransaction;
