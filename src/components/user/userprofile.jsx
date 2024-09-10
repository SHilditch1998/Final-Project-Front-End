import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import readcookie from "../../utils/readcookie";
import HabitTracker from "../Habits/HabitTracker";
import '../../App.css';
import '../../index.css';

const UserProfile = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [status, setStatus] = useState(0);
  const [gifSrc, setGifSrc] = useState("ducky.gif");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = readcookie("jwt_token");
      if (!token) {
        setError("You must be logged in to view this page.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5003/Friends/List", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
  
        const output = await response.json();
        console.log('API Output:', output);
        const output2 = output.ListAccounts[2]
        if (response.ok) {
          console.log(output);
          
          const fetchedUsername = output2.username || 'Username not found';
          setUsername(fetchedUsername);
          setAvatar(output2.avatar || '');
          setStatus(output2.status || 0);
          setError(null);
        } else {
          setError(output2.message || "Failed to fetch user data.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("There was an error fetching the user data.");
      }
    };
  
    fetchUserData();
  }, []);
    

  const handleGifClick = () => {
    setGifSrc("heart.gif");

    setTimeout(() => {
      setGifSrc("ducky.gif");
    }, 2000);
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      <div className="user-profile">
        <div className="user-info">
          <div className="avatar-box light-box">
            <h1>{username}</h1>
            {avatar && <img src={avatar} alt="User Avatar" width="100" />}
            <div>
              <img
                className="ducky1"
                src={gifSrc}
                alt="User Avatar"
                onClick={handleGifClick}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <div className="status-bar">
              <label>Progress: </label>
              <progress value={status} min="0" max="100"></progress>
            </div>
            <ul className="change-account">
              <li><Link to="/update-user">Update Account</Link></li>
              <li><Link to="/delete-user">Delete Account</Link></li>
            </ul>
          </div>
        </div>

        <div className="user-data">
          {/* Pass username as prop to HabitTracker */}
          <HabitTracker username={username} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
