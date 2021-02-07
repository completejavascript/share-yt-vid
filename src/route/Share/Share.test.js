import { render, cleanup } from '@testing-library/react';
import Share from './Share';

afterEach(cleanup);

test('share should render without crash', () => {
  const result = render(<Share />);
  const elm = result.container.querySelector('.share-container');
  expect(elm).toBeInTheDocument();
});
