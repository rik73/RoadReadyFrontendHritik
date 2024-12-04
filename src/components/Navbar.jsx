import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-2xl font-extrabold text-white bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent"
          >
            RoadReady
          </Link>
        </div>

        {/* Links */}
        <div
          className={`md:flex items-center space-x-6 ${
            isMenuOpen ? 'flex' : 'hidden'
          } flex-col md:flex-row`}
        >
          <Link
            to="/"
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white hover:bg-blue-500 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white hover:bg-blue-500 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white hover:bg-blue-500 transition duration-300"
          >
            Register
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white hover:bg-blue-500 transition duration-300"
          >
            Dashboard
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            &#9776;
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white shadow-md">
          <Link
            to="/"
            className="block px-4 py-2 font-semibold hover:bg-gray-700 transition"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="block px-4 py-2 font-semibold hover:bg-gray-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-4 py-2 font-semibold hover:bg-gray-700 transition"
          >
            Register
          </Link>
          <Link
            to="/dashboard"
            className="block px-4 py-2 font-semibold hover:bg-gray-700 transition"
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
