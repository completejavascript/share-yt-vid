import { render, cleanup, screen } from '@testing-library/react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { AuthProvider } from '../../provider/Auth';
import PrivateRoute from './PrivateRoute';
import Share from '../Share/Share';

afterEach(cleanup);

test('privateRoute should render without crash', async () => {
  render(
    <div data-testid="root">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/share" component={Share} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
  expect(await screen.findByTestId('root')).toBeInTheDocument();
});
