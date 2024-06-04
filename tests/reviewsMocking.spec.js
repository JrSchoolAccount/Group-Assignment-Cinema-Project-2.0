import { jest } from '@jest/globals';
import { loadMovieReviews } from '../src/movieReviews';

jest.spyOn(global, 'fetch').mockResolvedValue({
  json: async () => ({
    reviews: {
      review: [
        { id: 1, reviewer: null, rating: 4, comment: 'Very nice movie' },
        { id: 2, reviewer: null, rating: 4, comment: 'Very nice movie' },
        { id: 3, reviewer: null, rating: 4, comment: 'Very nice movie' },
        { id: 4, reviewer: null, rating: 4, comment: 'Very nice movie' },
        { id: 5, reviewer: null, rating: 4, comment: 'Very nice movie' },
        { id: 6, reviewer: null, rating: 4, comment: 'Very nice movie' },
        { id: 7, reviewer: null, rating: 4, comment: 'Very nice movie' },
      ],
      pagination: { page: 1, pageSize: 5 },
    },
  }),
});

describe('loadMovieReviews()', () => {
  test('should return formatted response with pageSize equal to 5', async () => {
    const movieId = 1;
    const page = 1;

    const result = await loadMovieReviews(movieId, page);

    expect(result.pagination.pageSize).toBe(5);
    expect(result.review.length).toBe(5);
  });
});
