import { render, cleanup, screen } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('App should render without crash', async () => {
  render(
    <div data-testid="root">
      <App />
    </div>
  );
  expect(await screen.findByTestId('root')).toBeInTheDocument();
});
