import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, username, email, password } = formData;

    // Validate if all fields are filled
    if (!name || !username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Sanitize the username for Pixela (remove any special characters)
    const sanitizedUsername = username.toLowerCase().replace(/[^a-z0-9]/g, '');

    try {
      // Step 1: Register the user in your backend
      const response = await fetch('https://final-project-back-end-production.up.railway.app/Account/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, password }), // Send user data to backend
      });
      console.log(response);
      


      // If registration fails, throw an error
      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Step 2: Create a Pixela graph using the sanitized username
      const graphResponse = await createGraph(sanitizedUsername);

      // Check if the graph creation was successful
      if (!graphResponse.ok) {
        throw new Error('Graph creation failed');
      }

      // If successful, display a success message
      setSuccessMessage('Registration and graph creation successful!');
  console.log("please work");

   navigate(`/user-profile`);  // Redirect to user profile page
     console.log(`/profile/${sanitizedUsername}`);
     

    } catch (error) {
      // Set error message if registration or graph creation fails
      setError(error.message);
    }
  };

  // Function to create a Pixela graph with the sanitized username as graphID
  const createGraph = async (userId) => {
    const token = "tokensecret"; // Replace with your Pixela token
    const graphUser = "graphuser"; // Replace with your Pixela account username

    // Send the request to Pixela to create a graph for the user
    return await fetch(`https://pixe.la/v1/users/${graphUser}/graphs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-USER-TOKEN": token,
      },
      body: JSON.stringify({
        id: userId, // Use the sanitized username as the graph ID
        name: "User Activity Graph",
        unit: "commit", // You can change this to any unit relevant to the app
        type: "int",
        color: "ichou", 
      }),
    });
  };

  return (
    <div className="reg-container">
      <h1 className="Reg-title">Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form className="reg-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button className="reg-btn" type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default Register;
