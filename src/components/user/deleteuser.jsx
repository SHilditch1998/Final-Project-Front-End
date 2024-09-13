import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import readcookie from "../../utils/readcookie";
import '../../App.css';
import '../../index.css';

const DeleteUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = readcookie("jwt_token");

    try {
      // Step 1: Delete the user account
      const response = await fetch("https://final-project-back-end-production.up.railway.app/Account/DeleteDuckling", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Attempt to read the response as JSON
      let output;
      try {
        output = await response.json();
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        output = { message: "Invalid response from the server" };
      }

      if (response.ok) {
        setMessage("User deleted successfully!");

        // Step 2: Delete the corresponding Pixela graph
   
        const deleteGraphResponse = await deleteGraph(output.userId);
        return await fetch(`https://pixe.la//v1/users/graphuser/graphs/${graphID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-USER-TOKEN": toktokensecreten,
          },
          body: JSON.stringify({
            "token":"tokensecret",
            "username":"graphuser",
            "agreeTermsOfService":"yes",
            "notMinor":"yes",
            "thanksCode":"639becb61a3bd96d9f521acfca7310eba71e465253e685d13c7be213fa5fa940"
          })}) 

        if (deleteGraphResponse.ok === true) {
          setMessage("User and graph deleted successfully!");
        } else {
          setMessage("User deleted, but failed to delete the graph.");
        }

        // Step 3: Log out the user by clearing the token and redirecting after a delay
        eraseCookie("jwt_token"); // Clear the token from the cookies

        // Delay before redirecting
        setTimeout(() => {
          navigate("/login"); // Redirect to login page or home
        }, 3000);
      
        } else {
          setMessage(`Error: ${output.message || 'Failed to delete user.'}`);
        }
        } catch (error) {
          setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={submitHandler} className="deletebox">
      <input
        className="deletebox-input delUser"  // Combined class names here
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        className="deletebox-input delUser"  // Combined class names here
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" className="delbtn">Delete Account</button>
      {message && <p>{message}</p>}
    </form>
  );
  
};

export default DeleteUser;
