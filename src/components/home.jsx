import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import writecookie from '../utils/writecookie';
import readcookie from '../utils/readcookie'; 

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = readcookie('jwt_token');

  const submitHandler = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("INSERT BACKEND URL HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const output = await response.json();
      if (output.token) {
        writecookie("jwt_token", output.token, 14);
        navigate('/user-profile'); // Redirect to the profile page after login
      } else {
        console.error('Login failed:', output.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="title-box">
        <div className="title">
          <h1>WADDLES</h1>
          <img className="duck" src="/waddles-icon.png" alt="Waddles Icon"/>
          <h2>Your new favourite habit-tracker</h2>
        </div>
      </div>

      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <label>Email</label><br />
          <input 
            type='text' 
            name='email' 
            value={email}
            onChange={(event) => setEmail(event.target.value)} 
          /><br /><br />
          
          <label>Password</label><br />
          <input 
            type='password' 
            name='password' 
            value={password}
            onChange={(event) => setPassword(event.target.value)} 
          /><br /><br />

          <input type='submit' value="Submit" className= "login-btn"/>
        </form>
      </div>
    </div>
  );
};

export default Home;
