import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library
import './styles.css'; // Import the CSS styles

// Dummy initial data
export const initialData = [
  { id: uuidv4(), transaction: "Rent", type: "Expense", amount: 1200, date: "2024-01-01" },
  { id: uuidv4(), transaction: "Groceries", type: "Expense", amount: 150, date: "2024-01-05" },
  { id: uuidv4(), transaction: "Utilities", type: "Expense", amount: 200, date: "2024-01-10" },
  { id: uuidv4(), transaction: "Salary", type: "Income", amount: 3500, date: "2024-01-15" },
  { id: uuidv4(), transaction: "Freelance Work", type: "Income", amount: 800, date: "2024-01-20" },
  { id: uuidv4(), transaction: "Car Payment", type: "Expense", amount: 300, date: "2024-01-25" },
  { id: uuidv4(), transaction: "Dining Out", type: "Expense", amount: 75, date: "2024-01-30" },
  { id: uuidv4(), transaction: "Gym Membership", type: "Expense", amount: 50, date: "2024-02-01" },
  { id: uuidv4(), transaction: "Gift for Friend", type: "Expense", amount: 60, date: "2024-02-10" },
  { id: uuidv4(), transaction: "Electricity Bill", type: "Expense", amount: 80, date: "2024-02-15" },
  { id: uuidv4(), transaction: "Side Project Income", type: "Income", amount: 500, date: "2024-02-20" },
  { id: uuidv4(), transaction: "Pet Supplies", type: "Expense", amount: 40, date: "2024-02-25" },
  { id: uuidv4(), transaction: "Consulting Fee", type: "Income", amount: 1200, date: "2024-03-01" },
  { id: uuidv4(), transaction: "Travel Expenses", type: "Expense", amount: 350, date: "2024-03-05" },
  { id: uuidv4(), transaction: "Home Insurance", type: "Expense", amount: 200, date: "2024-03-15" },
  { id: uuidv4(), transaction: "Online Course", type: "Expense", amount: 120, date: "2024-03-20" },
  { id: uuidv4(), transaction: "Savings Account Deposit", type: "Income", amount: 600, date: "2024-03-25" },
  { id: uuidv4(), transaction: "New Laptop", type: "Expense", amount: 1500, date: "2024-03-30" },
  { id: uuidv4(), transaction: "Bonus", type: "Income", amount: 500, date: "2024-04-01" },
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
							
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h4>Add New Transaction</h4>
            <label>
              Transaction Name:
              <input
                type="text"
                name="transaction"
                value={newTransaction.transaction}
                onChange={handleNewTransactionChange}
																				 
              />
            </label>
            <label>
              Transaction Type:
              <select
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
                type="date"
                name="date"
                value={newTransaction.date}
                onChange={handleNewTransactionChange}								 
              />
            </div>
            <button onClick={handleAddTransaction}>
              Add Transaction
            </button>
            <button onClick={closeModal}>Cancel</button>
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

const Row = ({ txn, onDelete, onChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [error, setError] = useState(''); // Error state for validation

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
