import { render, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('should render without crash', () => {
  render(<App />);
});
