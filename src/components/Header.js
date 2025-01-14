import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="header-button">Home</Link>
        <Link to="/new-video" className="header-button">Nuevo Video</Link>
      </div>
      <div className="header-right">
        <span className="logo">ALURAFLIX</span>
      </div>
    </header>
  );
};

export default Header;