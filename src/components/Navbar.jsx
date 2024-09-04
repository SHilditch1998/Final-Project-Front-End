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
      <div className="navbar-logo">
        <img src="./ducktrack.png" alt="Logo"/> 
      </div>
      <ul className="navbar-links">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/register-user">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/user-list">Social Pond</Link>
        </li>
        <li className="nav-item">
          <Link to="/user-profile">Profile</Link>
        </li>
      </ul>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
