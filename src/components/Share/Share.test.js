import { render, cleanup } from '@testing-library/react';
import Share from './Share';

afterEach(cleanup);

test('share should render without crash', () => {
  render(<Share />);
});
