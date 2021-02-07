import { render, cleanup, screen } from '@testing-library/react';
import { AuthProvider } from './Auth';

afterEach(cleanup);

test('authProvider should render without crash', async () => {
  render(
    <div data-testid="root">
      <AuthProvider />
    </div>
  );
  expect(await screen.findByTestId('root')).toBeInTheDocument();
});
