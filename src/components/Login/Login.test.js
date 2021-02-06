import { render, cleanup } from '@testing-library/react';
import Login from './Login';

afterEach(cleanup);

test('Login should render without crash', () => {
  render(<Login />);
});
