import { render, cleanup } from '@testing-library/react';
import ShareBox from './ShareBox';

afterEach(cleanup);

test('ShareBox should render without crash', () => {
  const result = render(<ShareBox />);
  const elm = result.container.querySelector('.sharebox-container');
  expect(elm).toBeInTheDocument();
});
