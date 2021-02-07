import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Auth';
import { addNotiError } from '../../notification';
import { PATH_SHARE } from '../../constants';
import firebaseApp from '../../firebase';
import './UserAction.scss';

const UserAction = ({ email }) => {
  const { setLoading, setLoadingText } = useAuthContext();

  const handleLogout = useCallback(async () => {
    setLoading(true);
    setLoadingText('Logging out...');
    try {
      await firebaseApp.auth().signOut();
    } catch (error) {
      console.log('Logout Error: ', error);
      addNotiError({
        title: 'Logout Error',
        message: error.message,
      });
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  }, [setLoading, setLoadingText]);

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
