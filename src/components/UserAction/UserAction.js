import React, { useCallback } from 'react';
import { useAuthContext } from '../../Auth';
import firebaseApp from '../../firebase';
import './UserAction.scss';

const UserAction = ({ email }) => {
  const { setLoading, setLoadingText } = useAuthContext();

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);
      setLoadingText('Logging out...');
      await firebaseApp.auth().signOut();
    } catch (error) {
      console.log('Logout Error: ', error);
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  }, [setLoading, setLoadingText]);

  return (
    <div className="user-action-container">
      <span className="txt-welcome">Welcome {email}</span>
      <button className="btn-share-movie">Share a movie</button>
      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserAction;