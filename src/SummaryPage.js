import React, { useState, useEffect } from 'react';
import './styles.css'; // Import the CSS styles

const SummaryPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [groupedData, setGroupedData] = useState({});
    
    // Define all possible transaction types
    const transactionTypes = ['Income', 'Expense', 'Bill', 'Transfer', 'Other'];

    useEffect(() => {
        // Retrieve transactions from localStorage and parse it
        const savedTransactions = localStorage.getItem("transactions");
        const parsedTransactions = savedTransactions ? JSON.parse(savedTransactions) : [];

        // Set the transactions state
        setTransactions(parsedTransactions);
    }, []);

    useEffect(() => {
        const grouped = transactions.reduce((acc, curr) => {
            const { type, amount } = curr;

            if (transactionTypes.includes(type)) {
                if (!acc[type]) {
                    acc[type] = { count: 0, totalAmount: 0 };
                }

                // Convert amount to a number if it's a string
                const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

                // Increment the count of transactions and sum the amount
                acc[type].count += 1;
                acc[type].totalAmount += numericAmount;
            }

            return acc;
        }, {});

        setGroupedData(grouped);
    }, [transactions]);
    
    return (
        <div>
            <h1>Grouped Transactions by Type</h1>
            <div className="summary-container">
            {transactionTypes.map((type) => (
                <div key={type} className="group summary-bubble">
                    <h1>{type}</h1>
                    <p>Number of transactions: {groupedData[type]?.count || 0}</p>
                    <p>Total Net Amount: ${groupedData[type]?.totalAmount?.toFixed(2) || 0}</p>
                </div>
            ))}
            </div>
        </div>
    );
};

export default SummaryPage;
