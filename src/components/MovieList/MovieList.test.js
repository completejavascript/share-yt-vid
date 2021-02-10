import { render, cleanup } from '@testing-library/react';
import { AuthContext } from '../../provider/Auth';
import MovieList from './MovieList';

afterEach(cleanup);

test('MovieList should render without crash', () => {
  const result = render(
    <AuthContext.Provider
      value={{
        setLoading: jest.fn(),
        setLoadingText: jest.fn(),
      }}
    >
      <MovieList />
    </AuthContext.Provider>
  );
  const elm = result.container.querySelector('.movie-list-container');
  expect(elm).toBeInTheDocument();
});
