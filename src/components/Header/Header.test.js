import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../provider/Auth';
import Header from './Header';

afterEach(cleanup);

const setUpNotLogin = () => {
  return render(
    <AuthContext.Provider
      value={{
        currentUser: null,
        setLoading: jest.fn(),
        setLoadingText: jest.fn(),
      }}
    >
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

const setUpLogin = () => {
  return render(
    <AuthContext.Provider
      value={{
        currentUser: {},
        setLoading: jest.fn(),
        setLoadingText: jest.fn(),
      }}
    >
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

test('Header render without crash', async () => {
  const result = setUpNotLogin();
  const elm = result.container.querySelector('.header-container');
  expect(elm).toBeInTheDocument();
});

test('Header show correct title', () => {
  const result = setUpNotLogin();
  const elm = result.container.querySelector('.title');
  expect(elm.textContent).toBe('Funny Movies');
});

test('Header show login', () => {
  const result = setUpNotLogin();
  const elm = result.container.querySelector('.login-container');
  expect(elm).toBeInTheDocument();
});

test('Header show userAction', () => {
  const result = setUpLogin();
  const elm = result.container.querySelector('.user-action-container');
  expect(elm).toBeInTheDocument();
});

test('Header show userAction after login/register success', () => {
  const result = setUpNotLogin();

  // Firstly, display loign
  const container = result.container;
  const loginElm = result.container.querySelector('.login-container');
  expect(loginElm).toBeInTheDocument();

  const inputEmail = container.querySelector('input[type="email"]');
  const inputPassword = container.querySelector('input[type="password"]');
  const inputSubmit = container.querySelector('input[type="submit"]');

  fireEvent.change(inputEmail, { target: { value: 'test_email1@gmail.com' } });
  fireEvent.change(inputPassword, { target: { value: 'abc123451' } });
  expect(inputSubmit).not.toBeDisabled();

  fireEvent.submit(inputSubmit);

  // After login success
  const actionElm = result.container.querySelector('.user-action-container');
  waitFor(() => expect(actionElm).toBeInTheDocument());
});
