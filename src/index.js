import React from 'react';
import ReactDOM from 'react-dom';
import './style/normalize.scss';
import './style/reset.scss';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

if (process.env.NODE_ENV === 'production') {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
