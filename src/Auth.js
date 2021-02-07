import React, { useEffect, useState, useContext } from 'react';
import Loading from './components/Loading/Loading';
import firebaseApp from './firebase';

export const AuthContext = React.createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    setLoading(true);
    setLoadingText('Checking authentication...');

    firebaseApp.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      setLoadingText('');
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setLoading, setLoadingText }}>
      {loading && <Loading description={loadingText} />}
      {children}
    </AuthContext.Provider>
  );
};
