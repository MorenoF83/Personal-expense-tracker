//ChartPage.js
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid"; 
import './styles.css'; // Import the CSS styles

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

const App = () => {
  // Combine the state variables for transactions and users
  const [list, setList] = useState([]);
  const transactionsRef = useRef([]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to manage new transaction input
  const [newTransaction, setNewTransaction] = useState({
    id: "",
    transaction: "",
    type: "Income",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
  });

  // Load transactions from localStorage or use initial data
  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (savedTransactions && savedTransactions.length > 0) {
      transactionsRef.current = savedTransactions;
    } else {
      transactionsRef.current = initialData;
    }
  }, []);

  // Save transactions to localStorage when 'transactions' state changes
  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (list.length <= 0){
      localStorage.setItem("transactions", JSON.stringify(transactionsRef.current));
      setList(transactionsRef.current);
    } else {
      localStorage.setItem("transactions", JSON.stringify(list));
    }

  }, [list]);

  // Handle new transaction input change
  const handleNewTransactionChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new transaction
  const handleAddTransaction = () => {
    if (newTransaction.transaction && newTransaction.amount) {
      const newTrans = { ...newTransaction, id: uuidv4() };
      setList([...list, newTrans]); // Add new transaction
      closeModal(); // Close modal
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Handle deleting a transaction
  const handleDeleteTransaction = (id) => {
    const updatedTransactions = list.filter((txn) => txn.id !== id);
    setList(updatedTransactions);
  };

  // Handle editing a transaction directly in the table
  const handleTransactionChange = (e, id, field) => {
    const { value } = e.target;
    setList((prevTransactions) =>
      prevTransactions.map((txn) =>
        txn.id === id ? { ...txn, [field]: value } : txn
      )
    );
  };

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal and reset input
  const closeModal = () => {
    setIsModalOpen(false);
    setNewTransaction({
      id: "",
      transaction: "",
      type: "Income",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="App">
      <div>
        <h1>Personal Expense Tracker</h1>
      </div>
			
      {/* Pop-up window */}
      {isModalOpen && (
        <div className="modal fade-in">
          <div className="modal-content">
            <h4>Add New Transaction</h4>
            <label>
              Transaction Name:
              <input
              className="input-custom"
                type="text"
                name="transaction"
                value={newTransaction.transaction}
                onChange={handleNewTransactionChange}
																				 
              />
            </label>
            <label>
              Transaction Type:
              <select
                className="custom-select input-custom "
                name="type"
                value={newTransaction.type}
                onChange={handleNewTransactionChange}									 
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
                <option value="Bill">Bill</option>
                <option value="Transfer">Transfer</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Amount:
            </label>
            <div>
              <input
              className="input-custom"
                type="number"
                name="amount"
                value={newTransaction.amount}
                onChange={handleNewTransactionChange}										 
              />
            </div>
            <label>
              Date:
            </label>
            <div>
              <input
                className="input-custom"
                type="date"
                name="date"
                value={newTransaction.date}
                onChange={handleNewTransactionChange}								 
              />
            </div>
            <button className="button-custom" onClick={handleAddTransaction}>
              Add Transaction
            </button>
            <button className="button-custom" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}

      {/* Transaction table */}
      <div className="container">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Transaction</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th style={{ minWidth: '110px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((txn) => (
                <Row key={txn.id} txn={txn} onDelete={handleDeleteTransaction} onChange={handleTransactionChange} />
              ))}
            </tbody>
          </table>    
        </div>
      </div>
      <footer className="footer">
        <button className="add-expense-btn" onClick={openModal}>+</button>
      </footer>
    </div>
  );
};

//Function to impact row interaction
const Row = ({ txn, onDelete, onChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [error, setError] = useState(''); 

  const onSaveClick = () => {
    if (!txn.transaction || txn.amount == 0 || !txn.date) {
      setError('All fields must be filled in before saving.'); // Set error message
      return; 
    }
    setError('');
    handleSaveClick();
    setIsEditing(false); 
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      <tr 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
      >
        <td>{txn.id}</td>
        <td>
          {isEditing ? (
            <input
              className="input-custom"
              type="text"
              value={txn.transaction}
              onChange={(e) => onChange(e, txn.id, "transaction")}
            />
          ) : (
            <span>{txn.transaction}</span>
          )}
        </td>
        <td>
          {isEditing ? (
            <select
            className="custom-select"
              value={txn.type}
              onChange={(e) => onChange(e, txn.id, "type")}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
              <option value="Bill">Bill</option>
              <option value="Transfer">Transfer</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span>{txn.type}</span>
          )}
        </td>
        <td>
          {isEditing ? (
            <input
              className="input-custom"
              type="number"
              value={txn.amount}
              onChange={(e) => onChange(e, txn.id, "amount")}
            />
          ) : (
            <span>{txn.amount}</span>
          )}
        </td>
        <td>
          {isEditing ? (
            <input
            className="input-custom"
              type="date"
              value={txn.date}
              onChange={(e) => onChange(e, txn.id, "date")}
            />
          ) : (
            <span>{txn.date}</span>
          )}
        </td>
        <td>
          <div className={`action-buttons ${isHovered ? 'visible' : ''}`}>
            {isEditing ? (
              <button onClick={onSaveClick}>Save</button>
            ) : (
              <button onClick={handleEditClick}>Edit</button>
            )}
            <button onClick={() => onDelete(txn.id)}>Delete</button>
          </div>
        </td>
      </tr>

      {/* Show error message if there's an error */}
      {error && (
        <tr>
          <td colSpan="6" style={{ color: 'red', textAlign: 'center' }}>
            {error}
          </td>
        </tr>
      )}
    </>
  );
};

export default App;
