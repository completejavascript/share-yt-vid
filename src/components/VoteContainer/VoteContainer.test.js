import { render, cleanup } from '@testing-library/react';
import VoteContainer from './VoteContainer';

afterEach(cleanup);

test('VoteContainer should render without crash', () => {
  const result = render(<VoteContainer />);
  const elm = result.container.querySelector('.vote-container');
  expect(elm).toBeInTheDocument();
});
