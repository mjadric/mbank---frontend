import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/transactions', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setTransactions(response.data.data);
            } catch (error) {
                console.error('Error fetching recent transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    return (
        <div className="container">
            <h2 className="my-4">Recent Transactions</h2>
            <div className="list-group overflow-auto">
                {transactions.map(transaction => (
                    <div key={transaction._id} className="list-group-item">
                        <div className="row">
                            <div className="col-sm">{transaction.fromUserName} -&gt; {transaction.toUserName}</div>
                            <div className="col-sm text-sm-right">{transaction.transactionType}</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm">
                                <strong>Amount:</strong> {formatCurrency(transaction.amount)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
