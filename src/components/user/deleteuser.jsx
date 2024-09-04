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
          "Authorization": `Bearer ${token}` // Corrected template literal
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
        setMessage(`Error: ${output.message || 'Failed to delete user.'}`); // Corrected error message
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`); // Corrected error message
    }
  };

  return (
    <div>
      <h1 className="delUser">DELETE USER</h1>
      <form onSubmit={submitHandler}>
        <label>Email</label><br />
        <input type='text' name='email' onChange={(event) => setEmail(event.target.value)} /><br /><br />
        <input type='submit' value="Submit" />
      </form>
      <p>{message}</p>
      <hr />
    </div>
  );
};

export default DeleteUser;