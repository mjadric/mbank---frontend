import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/NavBar';

const MakeTransaction = () => {
    const [formData, setFormData] = useState({
        accountFrom: '',
        accountTo: '',
        amount: '',
        pin: '',
        transactionType: 'Payment'
    });
    const [userAccounts, setUserAccounts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [amountError, setAmountError] = useState('');

    useEffect(() => {
        const fetchUserAccounts = async () => {
            try {
                const response = await axios.get('https://ebank-server.azurewebsites.net/account', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUserAccounts(response.data.data.accounts);
                if (response.data.data.accounts.length > 0) {
                    setFormData({
                        ...formData,
                        accountFrom: response.data.data.accounts[0].accountNumber
                    });
                }
            } catch (error) {
                error('Error fetching user accounts:', error);
            }
        };

        fetchUserAccounts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!(/^\d*\.?\d*$/.test(value)) || parseFloat(value) <= 0) {
            setAmountError('Please enter a valid positive number');
        } else {
            setAmountError('');
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    
    const handleTransactionTypeChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const amount = parseFloat(formData.amount);
            if (isNaN(amount)) {
                setAmountError('Please enter a valid number');
                return;
            }

            const response = await axios.post('https://ebank-server.azurewebsites.net/transaction', { ...formData, amount }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSuccessMessage(response.data.message);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.response.data.error);
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <Navbar 
                elements={[
                    { to: '/homepage', label: 'Home' },
                    { to: '/account', label: 'Account' },
                    { to: '/card', label: 'Cards' },
                    { to: '/alltransactions', label: 'Transactions' }
                ]} 
                showLogout={true} 
            />
            <div className="container">
                <h2 className="my-4">Make a Transaction</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>From Account:</label>
                        <select className="form-control" name="accountFrom" value={formData.accountFrom} onChange={handleChange}>
                            {userAccounts.map(account => (
                                <option key={account.accountNumber} value={account.accountNumber}>{account.accountNumber}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>To Account:</label>
                        <input type="text" className="form-control" name="accountTo" value={formData.accountTo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Amount:</label>
                        <input type="number" className="form-control" name="amount" value={formData.amount} onChange={handleChange} />
                        {amountError && <div className="text-danger">{amountError}</div>}
                    </div>
                    <div className="form-group">
                        <label>PIN:</label>
                        <input type="password" className="form-control" name="pin" value={formData.pin} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Transaction Type:</label>
                        <select className="form-control" name="transactionType" value={formData.transactionType} onChange={handleTransactionTypeChange}>
                            <option value="Payment">Payment</option>
                            <option value="Transfer">Transfer</option>
                            <option value="Withdrawal">Withdrawal</option>
                            <option value="Deposit">Deposit</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Make Transaction</button>
                </form>
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default MakeTransaction;
