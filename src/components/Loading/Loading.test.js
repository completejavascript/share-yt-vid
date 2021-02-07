import { render, cleanup } from '@testing-library/react';
import Loading from './Loading';

afterEach(cleanup);

test('Loading should render without crash', () => {
  const result = render(<Loading />);
  const elm = result.container.querySelector('.loading-container');
  expect(elm).toBeInTheDocument();
});

test('Loading should show description correctly', () => {
  const txtDesc = 'Loading...';
  const result = render(<Loading description={txtDesc} />);
  const el = result.container.querySelector('.description');
  expect(el.textContent).toEqual(txtDesc);
});

test('Loading should not show description when not passing', () => {
  const result = render(<Loading />);
  const el = result.container.querySelector('.description');
  expect(el).toBeNull();
});
