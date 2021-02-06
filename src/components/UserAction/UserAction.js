import React from 'react';
import './UserAction.scss';

const UserAction = ({ email }) => {
  return (
    <div className="user-action-container">
      <span className="txt-welcome">Welcome {email}</span>
      <button className="btn-share-movie">Share a movie</button>
      <button className="btn-logout">Logout</button>
    </div>
  );
};

export default UserAction;
