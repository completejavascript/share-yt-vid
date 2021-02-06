import { render, cleanup } from '@testing-library/react';
import Header from './Header';

afterEach(cleanup);

test('Header should render without crash', () => {
  render(<Header />);
});

test('Header should show correct title', () => {
  const result = render(<Header />);
  const elm = result.container.querySelector('.title');
  expect(elm.textContent).toBe('Funny Movies');
});
