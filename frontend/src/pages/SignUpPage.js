// frontend/src/pages/SignUpPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      localStorage.setItem('token', response.data.token); 
      alert('Sign Up successful!');
      navigate('/user-dashboard');
    } catch (err) {
      alert('Sign Up failed');
    }
  };    

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Sign Up</h2>
      
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>

      <div>
        <button onClick={handleLoginRedirect}>Login</button>
      </div>
    </div>
  );
};

export default SignUpPage;
