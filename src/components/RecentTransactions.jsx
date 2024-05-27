import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentTransactions = ({ updateTrigger }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('https://ebank-server.azurewebsites.net/transactions/recent', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setTransactions(response.data.data);
            } catch (error) {
                error('Error fetching recent transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [updateTrigger]); 

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2 className="my-4">Recent Transactions</h2>
            <div className="list-group" style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', background: 'linear-gradient(45deg, #e0eafc, #cfdef3)' }}>
                {transactions.length === 0 ? (
                    <p>No recent transactions.</p>
                ) : (
                    transactions.map(transaction => (
                        <div key={transaction._id} className="list-group-item">
                            <div className="row">
                                <div className="col">{transaction.fromUserName} -&gt; {transaction.toUserName} </div>
                                <div className="col text-end">{transaction.transactionType}</div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Amount:</strong> {formatCurrency(transaction.amount)}
                                </div>
                                <div className="col">
                                    <strong>Date:</strong> {formatDate(transaction.date)}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;
