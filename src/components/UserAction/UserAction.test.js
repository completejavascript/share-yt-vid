import { render, cleanup } from '@testing-library/react';
import UserAction from './UserAction';

afterEach(cleanup);

test('UserAction should render without crash', () => {
  const result = render(<UserAction />);
  const elm = result.container.querySelector('.user-action-container');
  expect(elm).toBeInTheDocument();
});

test("UserAction should show authorized user's email", () => {
  const email = 'email_test@gmail.com';
  const result = render(<UserAction email={email} />);
  const elm = result.container.querySelector('.txt-welcome');
  expect(elm).not.toBeNull();
  expect(elm.textContent).toBe(`Welcome ${email}`);
});

test('UserAction should show empty user email when not passing', () => {
  const result = render(<UserAction />);
  const elm = result.container.querySelector('.txt-welcome');
  expect(elm).not.toBeNull();
  expect(elm.textContent).toBe(`Welcome `);
});
