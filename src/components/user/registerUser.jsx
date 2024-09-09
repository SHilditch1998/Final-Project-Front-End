import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, username, email, password } = formData;

    if (!name || !username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Sanitize the username for Pixela
    const sanitizedUsername = username.toLowerCase().replace(/[^a-z0-9]/g, '');

    try {
      // Register the user in your backend
      const response = await fetch('http://localhost:5003/Account/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Create a Pixela graph for the user with the sanitized username
      await createGraph(sanitizedUsername);

    } catch (error) {
      setError(error.message);
    }
  };

  const createGraph = async (userId) => {
    const token = "tokensecret";
    const graphUser = "graphuser"; 

    return await fetch(`https://pixe.la/v1/users/${graphUser}/graphs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-USER-TOKEN": token,
      },
      body: JSON.stringify({
        id: userId,
        name: "User Activity Graph",
        unit: "commit",
        type: "int",
        color: "shibafu",
      }),
    });
  };

  return (
    <div className="reg-container">
      <h1 className="Reg-title">Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
