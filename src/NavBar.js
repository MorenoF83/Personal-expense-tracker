// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import the CSS styles

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage navbar visibility

    const toggleNavbar = () => {
        setIsOpen(!isOpen); // Toggle the state
    };

    return (
        <nav className="navbar">
            <h2 className="logo">Felix Moreno</h2>
            <button className="hamburger" onClick={toggleNavbar}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/chartPage">Chart</Link></li>
                <li><Link to="/summaryPage">Summary</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
