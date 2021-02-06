import { render, cleanup } from '@testing-library/react';
import Home from './Home';

afterEach(cleanup);

test('home should render without crash', () => {
  render(<Home />);
});
