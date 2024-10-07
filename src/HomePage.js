// HomePage.js
import React, {useState, useEffect } from "react";
import './styles.css'; 
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const HomePage = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [netBalance, setNetBalance] = useState(0);

    useEffect(() => {
        // Retrieve transactions from localStorage and parse it
        const savedTransactions = localStorage.getItem("transactions");
        const parsedTransactions = savedTransactions ? JSON.parse(savedTransactions) : [];

        // Set the transactions state
        setTransactions(parsedTransactions);
    }, []);

    useEffect(() => {
        // Calculate total income (sum of all positive amounts)
        const income = transactions.reduce((acc, curr) => {
            const amount = typeof curr.amount === 'string' ? parseFloat(curr.amount) : curr.amount;
            return curr.amount > 0 ? acc + amount : acc; 
        }, 0);

        // Calculate total expenses (sum of all negative amounts)
        const expenses = transactions.reduce((acc, curr) => {
            const amount = typeof curr.amount === 'string' ? parseFloat(curr.amount) : curr.amount;
            return curr.amount < 0 ? acc + Math.abs(amount) : acc;
        }, 0);

        // Set the calculated values
        setTotalIncome(income);
        setTotalExpenses(expenses);
        setNetBalance(income - expenses);
    }, [transactions]);

    useEffect(() => {
        const balances = {};

        transactions.forEach((txn) => {
            const date = new Date(txn.date);
            const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Example: "2024-01"

            const amount = typeof txn.amount === 'string' ? parseFloat(txn.amount) : txn.amount;

            // If this month already has an entry, add to it; otherwise, create a new entry
            if (balances[month]) {
                balances[month] += amount;
            } else {
                balances[month] = amount;
            }
        });

        // Set the monthly balances in state
        localStorage.setItem("monthlyBal", JSON.stringify(balances));
    }, [transactions]);

    return (
        <div>
            <h1>PERSONAL EXPENSE TRACKER</h1>
            <div>
                <div className="summary-container">
                    <BarChart dataMap={JSON.parse(localStorage.getItem("monthlyBal"))} />
                    <div className="summary-bubble">
                        <h2>Financial Summary</h2>
                        <div className="summary-item">
                            <p>Total Income:</p>
                            <h3>${totalIncome.toFixed(2)}</h3>
                        </div>
                        <div className="summary-item">
                            <p>Total Expenses:</p>
                            <h3>-${totalExpenses.toFixed(2)}</h3>
                        </div>
                        <div className="summary-item">
                            <p>Net:</p>
                            <h3>${netBalance.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BarChart = ({ dataMap }) => {
    const initialYear = dataMap && Object.keys(dataMap).length > 0 ? Object.keys(dataMap)[0].split('-')[0] : '';

    const [selectedYear, setSelectedYear] = useState(initialYear); 

    if (!dataMap || typeof dataMap !== 'object') {
        return <div>No data available</div>;
    }

    const uniqueYears = [...new Set(Object.keys(dataMap).map(key => key.split('-')[0]))];
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: `Amount in ${selectedYear}`,
                data: labels.map((month, index) => {
                    const monthYearKey = `${selectedYear}-${String(index + 1).padStart(2, '0')}`;
                    return dataMap[monthYearKey] || 0;
                }),
                fill: true, // Fill under the line
                borderColor: 'rgb(75, 192, 192)', // Line color
                tension: 0.1, // Line curve tension
                pointBackgroundColor: 'rgb(75, 192, 192)', // Point color
                pointBorderWidth: 1, // Point border width
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
                text: 'Line Chart Example',
            },
        },
    };

    return (
        <div className="summary-bubble" style={{width:'60%'}}>
            <select className='custom-select' value={selectedYear} onChange={handleYearChange}>
                {uniqueYears.map(year => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <Line data={data} options={options} />
        </div>
    );
};

export default HomePage;
