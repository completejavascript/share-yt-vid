import { render, cleanup } from '@testing-library/react';
import { AuthContext } from '../../provider/Auth';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

afterEach(cleanup);

test('home should render without crash', () => {
  const result = render(
    <AuthContext.Provider
      value={{
        setLoading: jest.fn(),
        setLoadingText: jest.fn(),
      }}
    >
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </AuthContext.Provider>
  );
  const elm = result.container.querySelector('.home-container');
  expect(elm).toBeInTheDocument();
});
