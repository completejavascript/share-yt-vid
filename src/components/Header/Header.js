import React from 'react';
import Login from '../Login/Login';
import UserAction from '../UserAction/UserAction';
import './Header.scss';

const Header = () => {
  return (
    <header className="header-container">
      <h1 className="title">Funny Movies</h1>
      {/* <Login /> */}
      <UserAction email="test_email@gmail.com" />
    </header>
  );
};

export default Header;
