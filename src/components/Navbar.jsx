import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    cookies.remove('jwt_token');
    navigate('/login'); // Redirect to login after logging out
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
            <li><Link to="/user-list">Social Pond</Link></li>
            <li><Link to="/user-profile">Profile</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
