import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import readcookie from "../../utils/readcookie";

const DeleteUser = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = readcookie("jwt_token");
    
    try {
      const response = await fetch("http://localhost:5003/Account/DeleteDuckling", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const output = await response.json();
      console.log(output.message);
      
      if (response.ok) {
        setMessage("User deleted successfully!");
      } else {
        setMessage(`Error: ${output.message || 'Failed to delete user.'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className= "deletebox">
      <h1 className="delUser">DELETE USER</h1>
      <form onSubmit={submitHandler}>
        <label>Email</label><br />
        <input type='text' name='email' onChange={(event) => setEmail(event.target.value)} /><br /><br />
        <input className="delbtn" type='submit' value="CONFIRM" />
      </form>
      <p style={{ color: message.startsWith('Error') ? 'red' : 'green', fontWeight: 'bold' }}>
      {message}</p>
      <hr />
    </div>
  );
};

export default DeleteUser;