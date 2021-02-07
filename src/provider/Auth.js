import React, { useEffect, useState, useContext } from 'react';
import Loading from '../components/Loading/Loading';
import firebaseApp from '../firebase/firebaseApp';

export const AuthContext = React.createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  // Need pending to check auth state before rendering route
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <Loading description="Checking authentication..." />;
  }

  return (
    <AuthContext.Provider value={{ currentUser, setLoading, setLoadingText }}>
      {loading && <Loading description={loadingText} />}
      {children}
    </AuthContext.Provider>
  );
};
