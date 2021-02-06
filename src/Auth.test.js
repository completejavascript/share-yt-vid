import { render, cleanup } from '@testing-library/react';
import { AuthProvider } from './Auth';

afterEach(cleanup);

test('authProvider should render without crash', () => {
  render(<AuthProvider />);
});
