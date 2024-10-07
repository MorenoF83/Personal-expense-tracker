//SummaryPage.js
import React, { useState, useEffect } from 'react';
import './styles.css'; // Import the CSS styles
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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
    
    console.log(groupedData)
    // Initialize two separate maps
    const countMap = {};
    const amountMap = {};

    Object.keys(groupedData).forEach((key) => {
        countMap[key] = groupedData[key].count;          // Assign count
        amountMap[key] = groupedData[key].totalAmount;   // Assign totalAmount
    });

    return (
        <div>
            <h1>Grouped Transactions by Type</h1>
            <div className="bar-container">
               <div className='summary-bubble'>
                    <DoughnutChartNumbers dataMap={countMap}/>
                </div>
                <div className='summary-bubble'>
                    <DoughnutChartAmount dataMap={amountMap}/>
                </div> 
            </div>
            
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

const DoughnutChartNumbers = ({ dataMap }) => {
    // Prepare the data for the doughnut chart
    const data = {
        labels: Object.keys(dataMap), // Transaction types as labels
        datasets: [
            {
                label: 'Transaction Distribution',
                data: Object.values(dataMap), // Corresponding amounts as data
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 2,
            },
        ],
    };

    // Define the chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Transaction Types Distribution Count',
            },
        },
    };

    return <Doughnut data={data} options={options} />;
};

const DoughnutChartAmount = ({ dataMap }) => {
    // Prepare the data for the doughnut chart
    const data = {
        labels: Object.keys(dataMap), // Transaction types as labels
        datasets: [
            {
                label: 'Transaction Distribution',
                data: Object.values(dataMap), // Corresponding amounts as data
                backgroundColor: [
                    'rgba(255, 159, 64, 0.6)', 
                    'rgba(255, 205, 86, 0.6)', 
                    'rgba(100, 221, 23, 0.6)',  
                    'rgba(233, 30, 99, 0.6)',  
                    'rgba(30, 136, 229, 0.6)', 
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 2,
            },
        ],
    };

    // Define the chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Transaction Types Amount',
            },
        },
    };

    return <Doughnut data={data} options={options} />;
};

export default SummaryPage;
