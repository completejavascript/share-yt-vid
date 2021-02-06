import { render, cleanup } from '@testing-library/react';
import UserAction from './UserAction';

afterEach(cleanup);

test('UserAction should render without crash', () => {
  render(<UserAction />);
});
