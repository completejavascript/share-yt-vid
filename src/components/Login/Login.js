import React from 'react';
import './Login.scss';

const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <input name="submit" type="submit" value="Login / Register" />
      </form>
    </div>
  );
};

export default Login;
