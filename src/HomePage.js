// HomePage.js
import React, {useState, useEffect } from "react";
import './styles.css'; 
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { v4 as uuidv4 } from "uuid"; 

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// Dummy initial data
export const initialData = [
    { id: uuidv4(), transaction: "Rent", type: "Expense", amount: 1200, date: "2022-04-01" },
    { id: uuidv4(), transaction: "Groceries", type: "Expense", amount: 150, date: "2022-05-05" },
    { id: uuidv4(), transaction: "Utilities Bill", type: "Bill", amount: 200, date: "2022-06-10" },
    { id: uuidv4(), transaction: "Salary", type: "Income", amount: 3500, date: "2022-07-15" },
    { id: uuidv4(), transaction: "Freelance Work", type: "Income", amount: 800, date: "2022-08-20" },
    { id: uuidv4(), transaction: "Car Payment", type: "Expense", amount: 300, date: "2022-09-25" },
    { id: uuidv4(), transaction: "Dining Out", type: "Expense", amount: 75, date: "2022-10-30" },
    { id: uuidv4(), transaction: "Gym Membership", type: "Expense", amount: 50, date: "2022-11-01" },
    { id: uuidv4(), transaction: "Gift for Friend", type: "Other", amount: 60, date: "2022-12-10" },
    { id: uuidv4(), transaction: "Electricity Bill", type: "Bill", amount: 80, date: "2023-01-15" },
    { id: uuidv4(), transaction: "Side Project Income", type: "Income", amount: 500, date: "2023-02-20" },
    { id: uuidv4(), transaction: "Pet Supplies", type: "Expense", amount: 40, date: "2023-03-25" },
    { id: uuidv4(), transaction: "Consulting Fee", type: "Income", amount: 1200, date: "2023-04-01" },
    { id: uuidv4(), transaction: "Travel Expenses", type: "Expense", amount: 350, date: "2023-05-05" },
    { id: uuidv4(), transaction: "Home Insurance", type: "Bill", amount: 200, date: "2023-06-15" },
    { id: uuidv4(), transaction: "Online Course", type: "Other", amount: 120, date: "2023-07-20" },
    { id: uuidv4(), transaction: "Savings Account Deposit", type: "Income", amount: 600, date: "2023-08-25" },
    { id: uuidv4(), transaction: "New Laptop", type: "Expense", amount: 1500, date: "2023-09-30" },
    { id: uuidv4(), transaction: "Bonus", type: "Income", amount: 500, date: "2023-10-01" },
    { id: uuidv4(), transaction: "Stock Purchase", type: "Transfer", amount: -1500, date: "2023-11-01" },
    { id: uuidv4(), transaction: "Gift for Sister", type: "Other", amount: 200, date: "2023-12-05" },
    { id: uuidv4(), transaction: "Mortgage Payment", type: "Expense", amount: 900, date: "2024-01-15" },
    { id: uuidv4(), transaction: "Salary Increase", type: "Income", amount: 4000, date: "2024-02-20" },
    { id: uuidv4(), transaction: "Car Insurance", type: "Bill", amount: 250, date: "2024-03-10" },
    { id: uuidv4(), transaction: "Transfer to Savings", type: "Transfer", amount: -1000, date: "2024-03-25" },
    { id: uuidv4(), transaction: "Vacation Fund", type: "Other", amount: 1200, date: "2024-04-01" },
    { id: uuidv4(), transaction: "Medical Expenses", type: "Expense", amount: 500, date: "2024-05-05" },
    { id: uuidv4(), transaction: "Freelance Payment", type: "Income", amount: 2000, date: "2024-05-15" },
  ];


const HomePage = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [netBalance, setNetBalance] = useState(0);

    useEffect(() => {
        // Retrieve transactions from localStorage and parse them
        const savedTransactions = localStorage.getItem("transactions");
        const parsedTransactions = savedTransactions ? JSON.parse(savedTransactions) : null;
    
        // If localStorage is empty, set an initial value
        if (!parsedTransactions) {
            // Example of an initial dataMap
    
            // Store the initial transactions in localStorage
            localStorage.setItem("transactions", JSON.stringify(initialData));
    
            // Set the transactions state with the initial data
            setTransactions(initialData);
        } else {
            // Set the transactions state with the saved data
            setTransactions(parsedTransactions);
        }
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

            if (JSON.parse(localStorage.getItem("monthlyBal")).length <= 0){
                
            }
            else {
                
            }
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
                    <BarChart dataMap={dataMonthMap} />
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
