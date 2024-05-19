import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/NavBar';

const AllTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('all'); 
    const [filterTime, setFilterTime] = useState('all'); 
    const [filterTransactionType, setFilterTransactionType] = useState('all'); 

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://bank.westeurope.cloudapp.azure.com/transactions/all', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    params: {
                        filterType,
                        filterTime,
                        filterTransactionType
                    }
                });
                setTransactions(response.data.data.reverse()); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setError('Error fetching transactions');
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [filterType, filterTime, filterTransactionType]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar 
        elements={[
          { to: '/homepage', label: 'Home' },
          { to: '/account', label: 'Account' },
          { to: '/card', label: 'Cards' },
          { to: '/maketransaction', label: 'Make Transaction' }
        ]} 
        showLogout={true} 
      />
            <h2>All Transactions</h2>
            <div>
                <label>Filter by:</label>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="form-control">
                    <option value="all">All</option>
                    <option value="time">Time</option>
                    <option value="type">Transaction Type</option>
                </select>

                {filterType === 'time' && (
                    <select value={filterTime} onChange={(e) => setFilterTime(e.target.value)} className="form-control">
                        <option value="all">All</option>
                        <option value="day">Last 24 hours</option>
                        <option value="week">Last 7 days</option>
                    </select>
                )}

                {filterType === 'type' && (
                    <select value={filterTransactionType} onChange={(e) => setFilterTransactionType(e.target.value)} className="form-control">
                        <option value="all">All</option>
                        <option value="Transfer">Transfer</option>
                        <option value="Payment">Payment</option>
                        <option value="Deposit">Deposit</option>
                        <option value="Withdrawal">Withdrawal</option>
                    </select>
                )}
            </div>

            {transactions.length === 0 ? (
                <div>No transactions available.</div>
            ) : (
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Transaction ID</th>
                            <th>From Account</th>
                            <th>To Account</th>
                            <th>Amount</th>
                            <th>Transaction Type</th>
                            <th>From User</th>
                            <th>To User</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction._id}>
                                <td>{transaction.transactionID}</td>
                                <td>{transaction.accountFrom}</td>
                                <td>{transaction.accountTo}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.transactionType}</td>
                                <td>{transaction.fromUserName}</td>
                                <td>{transaction.toUserName}</td>
                                <td>{transaction.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllTransactions;
