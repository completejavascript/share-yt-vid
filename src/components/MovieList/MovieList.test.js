import { render, cleanup } from '@testing-library/react';
import MovieList from './MovieList';

afterEach(cleanup);

test('MovieList should render without crash', () => {
  const result = render(<MovieList />);
  const elm = result.container.querySelector('.movie-list-container');
  expect(elm).toBeInTheDocument();
});
