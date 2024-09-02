import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import writecookie from '../../utils/writecookie';

const UpdateUser = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = readcookie("jwt_token");

    try {
      const response = await fetch("INSERT BACKEND URL HERE", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Corrected template literal
        },
        body: JSON.stringify({
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      const output = await response.json();
      if (response.ok) {
        setMessage("User updated successfully!");
      } else {
        setMessage(`Error: ${output.message || 'Failed to update user.'}`); // Corrected error message
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`); // Corrected error message
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={submitHandler}>
        <label>Email</label><br />
        <input type='text' name='email' onChange={(event) => setEmail(event.target.value)} /><br /><br />
        
        <label>Old Password</label><br />
        <input type='password' name='oldPassword' onChange={(event) => setOldPassword(event.target.value)} /><br /><br />
        
        <label>New Password</label><br />
        <input type='password' name='newPassword' onChange={(event) => setNewPassword(event.target.value)} /><br /><br />

        <input type='submit' value="Submit" />
      </form>
      <p>{message}</p>
      <hr />
    </div>
  );
};

export default UpdateUser;
