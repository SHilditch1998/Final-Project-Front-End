import './App.css';
import './index.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterUser from './components/user/registerUser';
import Login from './components/user/login';
import ListUsers from './components/user/listUsers';
import UpdateUser from './components/user/updateuser';
import DeleteUser from './components/user/deleteuser';
import UserProfile from './components/user/userprofile';
import Home from './components/Home';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-list" element={<ListUsers />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/delete-user" element={<DeleteUser />} />
      </Routes>
    </Router>
  );
}

export default App;