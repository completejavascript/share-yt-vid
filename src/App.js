import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import Home from './route/Home/Home';
import Share from './route/Share/Share';
import './App.scss';

const App = () => {
  return (
    <div className="app-container">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/share" component={Share} />
            <Route exact path="/" component={Home} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
