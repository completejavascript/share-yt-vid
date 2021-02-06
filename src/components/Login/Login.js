import React, { useCallback } from 'react';
import { useAuthContext } from '../../Auth';
import firebaseApp from '../../firebase';
import './Login.scss';

const Login = () => {
  const { setLoading, setLoadingText } = useAuthContext();

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        setLoading(true);
        setLoadingText('Logging in...');
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
      } catch (error) {
        console.log('Login Error:', error);
      } finally {
        setLoading(false);
        setLoadingText('');
      }
    },
    [setLoading, setLoadingText]
  );

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <input name="submit" type="submit" value="Login / Register" />
      </form>
    </div>
  );
};

export default Login;
