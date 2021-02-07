import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { addNotiError } from '../../utils/notification';
import { PATH_SHARE } from '../../utils/constants';
import firebaseApp from '../../firebase/firebaseApp';
import './UserAction.scss';

const UserAction = ({ email }) => {
  const handleLogout = useCallback(async () => {
    try {
      await firebaseApp.auth().signOut();
    } catch (error) {
      console.log('Logout Error: ', error);
      addNotiError({
        title: 'Logout Error',
        message: error.message,
      });
    }
  }, []);

  return (
    <div className="user-action-container">
      <span className="txt-welcome">Welcome {email}</span>
      <button
        className="btn-share-movie"
        disabled={window.location.pathname === PATH_SHARE}
      >
        {window.location.pathname === PATH_SHARE ? (
          'Share a movie'
        ) : (
          <Link to={PATH_SHARE}>Share a movie</Link>
        )}
      </button>
      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserAction;
