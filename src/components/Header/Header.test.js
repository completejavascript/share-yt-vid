import { render, cleanup } from '@testing-library/react';
import { AuthContext } from '../../Auth';
import Header from './Header';

afterEach(cleanup);

test('Header should render without crash', async () => {
  const result = render(
    <AuthContext.Provider value={{ currentUser: {} }}>
      <Header />
    </AuthContext.Provider>
  );
  const elm = result.container.querySelector('.header-container');
  expect(elm).toBeInTheDocument();
});

test('Header should show correct title', () => {
  const result = render(
    <AuthContext.Provider value={{ currentUser: {} }}>
      <Header />
    </AuthContext.Provider>
  );
  const elm = result.container.querySelector('.title');
  expect(elm.textContent).toBe('Funny Movies');
});

test('Header should show login', () => {
  const result = render(
    <AuthContext.Provider value={{ currentUser: null }}>
      <Header />
    </AuthContext.Provider>
  );
  const elm = result.container.querySelector('.login-container');
  expect(elm).toBeInTheDocument();
});

test('Header should show userAction', () => {
  const result = render(
    <AuthContext.Provider value={{ currentUser: {} }}>
      <Header />
    </AuthContext.Provider>
  );
  const elm = result.container.querySelector('.user-action-container');
  expect(elm).toBeInTheDocument();
});
