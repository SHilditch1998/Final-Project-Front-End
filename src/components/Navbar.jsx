import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {

    cookies.remove('jwt_token');
  
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
        <li className="nav-item">
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register-user">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/user-list">List of Ducks</Link></li>
            <li className="dropdown">
              <button onClick={toggleDropdown} className="dropbtn">
                Account
              </button>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <Link to="/user-profile">Profile</Link>
                  <Link to="/update-user">Update Account</Link>
                  <Link to="/delete-user">Delete Account</Link>
                </div>
              )}
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

