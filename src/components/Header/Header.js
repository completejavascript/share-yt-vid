import React from 'react';
import { useAuthContext } from '../../provider/Auth';
import Login from '../Login/Login';
import UserAction from '../UserAction/UserAction';
import { PATH_HOME } from '../../utils/constants';
import './Header.scss';

const Header = () => {
  const { currentUser } = useAuthContext();

  const handleTitleClick = () => {
    window.location.pathname = PATH_HOME;
  };

  return (
    <header className="header-container">
      <h1 className="title" onClick={handleTitleClick}>
        Funny Movies
      </h1>
      {currentUser ? <UserAction email={currentUser.email} /> : <Login />}
    </header>
  );
};

export default Header;
