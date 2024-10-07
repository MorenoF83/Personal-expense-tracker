import React, {useState} from 'react';
import './styles.css'; // Import the CSS styles

const Footer = () => {
  return (
    <div>
        {/* Modal for adding a new user */}
        {/* {isModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                width: "300px"
              }}
            >
              <h4>Add New User</h4>
              <label>
                Author:
                <input
                  type="text"
                  name="author"
                  //value={newUser.author}
                  onChange={handleInputChange}
                  style={{ marginBottom: "10px", display: "block", width: "100%" }}
                />
              </label>
              <label>
                Transaction Name:
                <input
                  type="text"
                  name="transName"
                  //value={newUser.email}
                  onChange={handleInputChange}
                  style={{ marginBottom: "10px", display: "block", width: "100%" }}
                />
              </label>
              <label>
                Transaction Type:
                <input
                  type="text"
                  name="transType"
                  //value={newUser.email}
                  onChange={handleInputChange}
                  style={{ marginBottom: "10px", display: "block", width: "100%" }}
                />
              </label>
              <label>
                Date:
                <input
                  type="datetime-local"
                  name="date"
                  //value={newUser.date}
                  onChange={handleInputChange}
                  style={{ marginBottom: "10px", display: "block", width: "100%" }}
                />
              </label>
              <button onClick={handleAddUser} style={{ marginRight: "10px" }}>
                Add User
              </button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        )} */}
    {/* <footer className="footer">
      <button className="add-expense-btn" onClick={openModal}>
        +
      </button>
    </footer> */}
    </div>
  );
};

export default Footer;
