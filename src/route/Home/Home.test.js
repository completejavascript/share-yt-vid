import { render, cleanup } from '@testing-library/react';
import Home from './Home';

afterEach(cleanup);

test('home should render without crash', () => {
  const result = render(<Home />);
  const elm = result.container.querySelector('.home-container');
  expect(elm).toBeInTheDocument();
});
