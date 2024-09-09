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
  const [userID, setUserID] = useState('');
  const [gifSrc, setGifSrc] = useState("ducky.gif");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = readcookie("jwt_token");
      if (!token) {
        setError("You must be logged in to view this page.");
        return;
      }

      const response = await fetch("http://localhost:5003/Friends/List", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const output = await response.json();
      console.log('API Output:', output);

      if (response.ok) {
        setUsername(output.username);
        setAvatar(output.avatar);
        setStatus(output.status);
        setUserID(output.userID);
        setError(null);
      } else {
        setError(output.message || "Failed to fetch user data.");
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


  const handleDelete = (habitToDelete) => {
    console.log("Deleting habit:", habitToDelete);
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      <div className="user-profile">
        <div className="user-info">
          <div className="avatar-box light-box">
            <h1>{username}</h1>
            {userID ? (
              <p className="user-id-error">{userID}</p>
            ) : (
              <p className="user-id-error">User ID Not Available</p>
            )}
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
          <HabitTracker onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
