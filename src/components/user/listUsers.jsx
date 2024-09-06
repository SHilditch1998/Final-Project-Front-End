import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import readcookie from "../../utils/readcookie";

const ListUsers = () => {
  const [userList, setUserList] = useState([]);
  const [listOn, setListOn] = useState(false);
  const [error, setError] = useState(null);

  const clickHandler = async () => {
    const token = readcookie("jwt_token");
    if (!token) {
      setError("You must be logged in to view this page.");
      setListOn(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5003/Friends/List", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const output = await response.json();
      console.log(output);

      if (response.ok) {
        setUserList(output.ListAccounts || []);
        setListOn(true);
        setError(null);
      } else {
        setError(output.message || "Failed to fetch user list.");
        setListOn(false);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setListOn(false);
    }
  };

  return (
    <div>
      <h1>Social Pond</h1>
      <button className="list-btn" onClick={clickHandler}>List Users</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <hr />
      {listOn ? (
        Array.isArray(userList) && userList.length > 0 ? (
          userList.map((item, index) => (
            <div key={index}>
              <h2>User: {item.username}</h2>
              <h2>Email: {item.email}</h2><br></br>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )
      ) : (
        <h1>Please login to proceed</h1>
      )}
      <hr />
    </div>
  );
};

export default ListUsers;
