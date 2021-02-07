import React, { useCallback } from 'react';
import { useAuthContext } from '../../Auth';
import useInput from '../../hooks/useInput';
import firebaseApp from '../../firebase';
import './Login.scss';

const Login = () => {
  const { setLoading, setLoadingText } = useAuthContext();

  const { value: email, handleOnChange: handleSetEmail } = useInput('');
  const { value: password, handleOnChange: handleSetPassword } = useInput('');

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      setLoading(true);
      setLoadingText('Logging in...');
      try {
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
        <input
          autoFocus
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleSetEmail}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleSetPassword}
        />
        <input
          name="submit"
          type="submit"
          value="Login / Register"
          disabled={!email || !password}
        />
      </form>
    </div>
  );
};

export default Login;
