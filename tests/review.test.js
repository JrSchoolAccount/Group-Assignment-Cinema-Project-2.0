import { expect, test } from '@jest/globals';
import { validateReview } from '../src/validateReview';

test('rejects review without required fields', async() => {
  const review = { title: '', content: '', rating: 3 };
  const result = await validateReview(review);
  expect(result.valid).toBe(false);
  expect(result.error).toBe('All required fields must be filled.');
});

test('rejects review with invalid rating', async() => {
  const review = { title: 'Title', content: 'Content', rating: 6 };
  const result = await validateReview(review);
  expect(result.valid).toBe(false);
  expect(result.error).toBe('Rating must be between 0 and 5.');
});

test('accepts a valid review', async() => {
  const review = { title: 'Title', content: 'Content', rating: 4 };
  const result = await validateReview(review);
  expect(result.valid).toBe(true);
});
