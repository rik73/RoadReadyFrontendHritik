import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-brand">RoadReady</Link>
        </div>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" className="navbar-link">Home</Link></li>
            <li><Link to="/login" className="navbar-link">Login</Link></li>
            <li><Link to="/register" className="navbar-link">Register</Link></li>
            <li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>
          </ul>
        </div>

        <div className="navbar-menu-icon" onClick={toggleMenu}>
          <span className="navbar-hamburger">&#9776;</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
