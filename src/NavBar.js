// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); 

    const toggleNavbar = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <nav className="navbar">
            <h2>Felix Moreno</h2>
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
