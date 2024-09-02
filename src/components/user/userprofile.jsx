import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import readcookie from "../../utils/readcookie";

const UserProfile = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [status, setStatus] = useState(0);
  const [graphData, setGraphData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [gifSrc, setGifSrc] = useState("ducky.gif"); // State for the gif source

  useEffect(() => {
    const fetchUserData = async () => {
      const token = readcookie("jwt_token");
      if (!token) {
        setError("You must be logged in to view this page.");
        return;
      }

      const response = await fetch("INSERT BACKEND URL HERE", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const output = await response.json();
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
        const response = await fetch("https://pixe.la/v1/users/a-know/graphs/test-graph.html");

        if (!response.ok) {
          throw new Error("Error fetching graph data");
        }

        const data = await response.json();
        setGraphData(data);
        setErrorMsg("");
      } catch (error) {
        console.error(error.message);
        setErrorMsg("Graph Data Currently Unavailable");
      }
    };

    fetchUserData();
    fetchGraphData();
  }, []);

  // Handle gif click
  const handleGifClick = () => {
    setGifSrc("heart.gif"); // Change to heart.gif on click

    // Revert back to ducky.gif after 2 seconds
    setTimeout(() => {
      setGifSrc("ducky.gif");
    }, 2000); // Adjust the duration as needed
  };

  return (
    <div>
      <h1>{username}</h1>
      {avatar && <img src={avatar} alt="User Avatar" width="100" />}
      <div>
        <img
          className="ducky1"
          src={gifSrc}
          alt="User Avatar"
          onClick={handleGifClick}
          style={{ cursor: 'pointer' }} // Optional: Show a pointer cursor to indicate it's clickable
        />
      </div>
      <div>
        <label>Status:</label>
        <progress value={status} min="0" max="100"></progress>
      </div>

      <div>
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
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && <h1>Please login to proceed</h1>}
    </div>
  );
};

export default UserProfile;
