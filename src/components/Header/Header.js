import React from 'react';
import Login from '../Login/Login';
import './Header.scss';

const Header = () => {
  return (
    <header className="header-container">
      <h1 className="title">Funny Movies</h1>
      <Login />
    </header>
  );
};

export default Header;
