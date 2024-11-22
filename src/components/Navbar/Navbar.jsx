import React from 'react';
import './Navbar.css';

function Navbar({ searchTerm, onSearchChange }) {
  return (
    <nav className="navbar">
      <h1>Notes App</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notes..."
          className="search-input"
        />
      </div>
    </nav>
  );
}

export default Navbar;
