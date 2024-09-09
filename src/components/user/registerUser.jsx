import { useState } from 'react';


const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="reg-container">
      <h1 className="Reg-title">Register</h1>
      <form className="reg-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button className="reg-btn" type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default Register;