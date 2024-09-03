import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import writecookie from '../../utils/writecookie';
import readcookie from '../../utils/readcookie'; 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

        <input type='submit' value="Submit" />
      </form>
    </div>
  );
}

export default Login;
