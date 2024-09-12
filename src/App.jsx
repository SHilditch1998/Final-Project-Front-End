import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterUser from './components/user/registerUser';
import Login from './components/user/login';
import ListUsers from './components/user/listUsers';
import UpdateUser from './components/user/updateuser';
import DeleteUser from './components/user/deleteuser';
import UserProfile from './components/user/userprofile';
import Home from './components/home';
import ProtectedRoute from './components/user/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-user" element={<RegisterUser />} />
        {/* Protect these routes */}
        <Route path="/user-list" element={<ProtectedRoute element={ListUsers} />} />
        <Route path="/user-profile" element={<ProtectedRoute element={UserProfile} />} />
        <Route path="/update-user" element={<ProtectedRoute element={UpdateUser} />} />
        <Route path="/delete-user" element={<ProtectedRoute element={DeleteUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
