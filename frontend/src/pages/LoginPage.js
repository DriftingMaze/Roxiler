import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const token = res.data.token;

      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);

      alert('Login successful');

      if (decoded.role === 'admin') {
        navigate('/admin');  
      } else if (decoded.role === 'owner') {
        navigate('/store-owner');  
      } else {
        navigate('/user-dashboard');  
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <div>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
