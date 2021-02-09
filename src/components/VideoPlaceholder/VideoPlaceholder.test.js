import { render, cleanup } from '@testing-library/react';
import VideoPlaceholder from './VideoPlaceholder';

afterEach(cleanup);

test('VideoPlaceholder should render without crash', () => {
  const result = render(<VideoPlaceholder />);
  const elm = result.container.querySelector('.placeholder-container');
  expect(elm).toBeInTheDocument();
});
