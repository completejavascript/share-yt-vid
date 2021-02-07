import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../../provider/Auth';
import { PATH_HOME } from '../../utils/constants';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={PATH_HOME} />
        )
      }
    />
  );
};

export default PrivateRoute;
