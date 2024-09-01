import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/registerUser';
import Login from './components/login';
import ListUsers from './components/listUsers';
import UpdateUser from './components/updateuser';
import DeleteUser from './components/deleteuser';
import { Link } from 'react-router-dom';

function App() {


  return (
    <Router>
      <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/list-users">List Users</Link></li>
          <li><Link to="/update-user">Update User</Link></li>
          <li><Link to="/delete-user">Delete User</Link></li>
        </ul>
      </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list-users" element={<ListUsers />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/delete-user" element={<DeleteUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;