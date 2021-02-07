import { render, cleanup } from '@testing-library/react';
import Login from './Login';

afterEach(cleanup);

test('Login should render without crash', () => {
  const result = render(<Login />);
  const elm = result.container.querySelector('.login-container');
  expect(elm).toBeInTheDocument();
});
