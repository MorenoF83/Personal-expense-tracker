// HomePage.js
import React, {useState, useEffect } from "react";
import './styles.css'; // Import the CSS styles
import { initialData } from './ChartPage';

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
            return curr.amount > 0 ? acc + amount : acc; // Add only positive amounts
        }, 0);

        // Calculate total expenses (sum of all negative amounts)
        const expenses = transactions.reduce((acc, curr) => {
            const amount = typeof curr.amount === 'string' ? parseFloat(curr.amount) : curr.amount;
            return curr.amount < 0 ? acc + Math.abs(amount) : acc; // Add only negative amounts (as positives)
        }, 0);

        // Set the calculated values
        setTotalIncome(income);
        setTotalExpenses(expenses);
        setNetBalance(income - expenses);
    }, [transactions]);

    return (
        <div className="summary-container">
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
                    <p>Net Balance:</p>
                    <h3>${netBalance.toFixed(2)}</h3>
                </div>
            </div>
        </div>
    );
};

// Inline Styles for simplicity
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px"
  },
  mainContent: {
    textAlign: "center",
    padding: "50px 20px"
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#61dafb",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px"
  },
  footer: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#282c34",
    color: "#fff",
    position: "absolute",
    width: "100%",
    bottom: 0
  }
};

export default HomePage;
