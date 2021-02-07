import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './provider/Auth';
import PrivateRoute from './route/PrivateRoute/PrivateRoute';
import Home from './route/Home/Home';
import Share from './route/Share/Share';
import { PATH_HOME, PATH_SHARE } from './utils/constants';
import './App.scss';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const App = () => {
  return (
    <React.Fragment>
      <ReactNotification />
      <div className="app-container">
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <PrivateRoute exact path={PATH_SHARE} component={Share} />
              <Route exact path={PATH_HOME} component={Home} />
              <Route path="*">
                <Redirect to={PATH_HOME} />
              </Route>
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </React.Fragment>
  );
};

export default App;
