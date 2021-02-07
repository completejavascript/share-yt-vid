import React, { useCallback } from 'react';
import { useAuthContext } from '../../provider/Auth';
import { addNotiError } from '../../utils/notification';
import useInput from '../../hooks/useInput';
import firebaseApp from '../../firebase/firebaseApp';
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

      // Try login first
      let error = null;
      try {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
      } catch (err1) {
        console.log('Login error:', err1);
        error = err1;
      }

      // If error = auth/user-not-found -> create new user
      if (error && error.code === 'auth/user-not-found') {
        try {
          await firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
          error = null;
        } catch (err2) {
          console.log('Signup error:', err2);
          error = err2;
        }
      }

      // If still error
      if (error) {
        addNotiError({
          title: 'Login or Register Error',
          message: error.message,
        });
      }

      setLoading(false);
      setLoadingText('');
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
