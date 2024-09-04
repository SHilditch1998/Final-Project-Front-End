import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import Link from react-router-dom
import readcookie from "../../utils/readcookie";
import '../../App.css';
import '../../index.css';

const UserProfile = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [status, setStatus] = useState(0);
  const [graphData, setGraphData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
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
      console.log(output);
      
      if (response.ok) {
        setUsername(output.username);
        setAvatar(output.avatar);
        setStatus(output.status);
        setError(null);
      } else {
        setError(output.message || "Failed to fetch user data.");
      }
    };

    const fetchGraphData = async () => {
      try {
        const response = await fetch("https://pixe.la/v1/users/a-know/graphs/test-graph?date=20240904&mode=long&appearance=light");

        if (!response.ok) {
          throw new Error("Error fetching graph data");
        }
        
        const data = await response.text();
            
        setGraphData(data);
        console.log(data);
        
        
        setErrorMsg("");
      } catch (error) {
        console.error(error.message);
        setErrorMsg("Graph Data Currently Unavailable");
      }
    };

    fetchUserData();
    fetchGraphData();
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
            <div>
              <p>CURRENCY GOES HERE?</p>
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
          <div className="data-box light-box">
            <h3>Your Habits</h3>
            {errorMsg ? (
              <p style={{ color: 'red' }}>{errorMsg}</p>
            ) : (
              graphData && (
                <div>
                  <img src={`data:image/svg+xml;base64,${btoa(graphData)}`} alt="User Habit Tracker Graph" />
                </div>
              )
            )}
            <p>Add task</p>
            <p>Update habits</p>
            <p>Delete Task</p>
          </div>
          <p>add buttons here?</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
