import { validateYoutubeUrl } from './helpers';

test('validateYoutubeUrl should work', () => {
  expect(validateYoutubeUrl).toBeInstanceOf(Function);

  expect(validateYoutubeUrl()).toBe(false);
  expect(validateYoutubeUrl(null)).toBe(false);
  expect(validateYoutubeUrl(undefined)).toBe(false);
  expect(validateYoutubeUrl('')).toBe(false);
  expect(validateYoutubeUrl(false)).toBe(false);
  expect(validateYoutubeUrl(true)).toBe(false);

  expect(validateYoutubeUrl('http://youtu.be/')).toBe(false);
  expect(validateYoutubeUrl('youtube awesome')).toBe(false);
  expect(validateYoutubeUrl('youtube/aykbvusadf')).toBe(false);
  expect(validateYoutubeUrl('http://youtube/aykbvusadf')).toBe(false);

  expect(validateYoutubeUrl('http://youtu.be/aykbvusadf')).toBe(true);
  expect(validateYoutubeUrl('https://youtu.be/aykbvusadf/')).toBe(true);
  expect(validateYoutubeUrl('www.youtube.com/aykbvusadf/')).toBe(true);
  expect(validateYoutubeUrl('youtu.be/aykbvusadf')).toBe(true);
  expect(validateYoutubeUrl('youtube.com/watch?v=aykbvusadf')).toBe(true);
  expect(validateYoutubeUrl('http://youtu.be/-aykbvusadf')).toBe(true);
  expect(validateYoutubeUrl('https://www.youtube.com/watch?v=aykbvusadf')).toBe(
    true
  );
  expect(validateYoutubeUrl('http://www.youtube.com/watch?v=aykbvusadf')).toBe(
    true
  );
  expect(validateYoutubeUrl('http://www.youtube.com/watch?v=-aykbvusadf')).toBe(
    true
  );
  expect(
    validateYoutubeUrl(
      'http://www.youtube.com/v/-aykbvusadf?version=3&autohide=1'
    )
  ).toBe(true);
  expect(
    validateYoutubeUrl(
      'http://www.youtube.com/oembed?url=http%3A//www.youtube.com/watch?v%3D-aykbvusadf&format=json'
    )
  ).toBe(true);
});
