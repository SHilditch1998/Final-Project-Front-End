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
      const response = await fetch("INSERT BACKEND URL HERE", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const output = await response.json();
      if (response.ok) {
        setUserList(output.userlist);
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
      <h1>List Users</h1>
      <button onClick={clickHandler}>List Users</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <hr />
      {listOn ? (
        userList.map((item, index) => (
          <div key={index}>
            <h2>User ID = {item.username}</h2>
            <h2>Email = {item.email}</h2>
          </div>
        ))
      ) : (
        <h1>Please login to proceed</h1>
      )}
      <hr />
    </div>
  );
};

export default ListUsers;
