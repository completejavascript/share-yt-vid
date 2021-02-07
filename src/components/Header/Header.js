import React from 'react';
import { useAuthContext } from '../../provider/Auth';
import Login from '../Login/Login';
import UserAction from '../UserAction/UserAction';
import './Header.scss';

const Header = () => {
  const { currentUser } = useAuthContext();
  return (
    <header className="header-container">
      <h1 className="title">Funny Movies</h1>
      {currentUser ? <UserAction email={currentUser.email} /> : <Login />}
    </header>
  );
};

export default Header;
