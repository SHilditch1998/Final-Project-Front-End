import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import writecookie from '../../utils/writecookie';

const RegisterUser = () => {
  const [userid, setUserid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!userid || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      // Step 1: Register the user
      const response = await fetch("http://localhost:5003/Account/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: userid, email: email, password: password })
      });

      const output = await response.json();
      if (response.ok) {
        console.log("User registered successfully");

        // Step 2: Create a graph for the new user using Pixela API
        const graphResponse = await createGraph(userid);
        if (graphResponse.ok) {
          console.log("Graph created successfully");
          setError(null);

          // Redirect to the user's profile after successful registration and graph creation
          navigate("/profile"); // Static route for the logged-in user's profile
        } else {
          setError("Failed to create graph for the user.");
        }

      } else {
        setError(output.message || "Registration failed.");
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  // Function to create a graph using Pixela API
  const createGraph = async (userId) => {
    const token = "YOUR_PIXELA_TOKEN"; // Replace with your Pixela user token
    const graphUser = "YOUR_PIXELA_USERNAME"; // Replace with Pixela username

    return await fetch(`https://pixe.la/v1/users/${graphUser}/graphs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-USER-TOKEN": token
      },
      body: JSON.stringify({
        id: userId, // Use userid as the graph ID
        name: "User Activity Graph",
        unit: "commit",
        type: "int",
        color: "shibafu" // You can change the color
      })
    });
  };

  return (
    <div>
      <h1 className="Reg-title">Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={submitHandler} className="reg-form">
        <label>User Id</label><br />
        <input type='text' name='userid' onChange={(event) => setUserid(event.target.value)} /><br /><br />
        <label>Email</label><br />
        <input type='text' name='email' onChange={(event) => setEmail(event.target.value)} /><br /><br />
        <label>Password</label><br />
        <input type='password' name='password' onChange={(event) => setPassword(event.target.value)} /><br /><br />
        <input type='submit' value="Submit" className="login-btn" />
      </form>
      <hr />
    </div>
  );
};

export default RegisterUser;
