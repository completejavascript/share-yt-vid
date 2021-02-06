import { render, cleanup } from '@testing-library/react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import Share from './components/Share/Share';

afterEach(cleanup);

test('privateRoute should render without crash', () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/share" component={Share} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
});
