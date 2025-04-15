import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'; 

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  return (
    <header className="header">
      <h1 className="header-title">Roxiler</h1>
      {token && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
