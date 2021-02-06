import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './Auth';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? <RouteComponent {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
