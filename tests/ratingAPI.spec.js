// Working test
import { jest } from '@jest/globals';
import { getMovieRating } from '../src/ratingAPI';

describe('getMovieRating()', () => {
  test('should return the average rating when there are 5 or more reviews', async () => {
    const mockData = {
      data: [
        { 'attributes': { 'rating': 1 } },
        { 'attributes': { 'rating': 2 } },
        { 'attributes': { 'rating': 3 } },
        { 'attributes': { 'rating': 4 } },
        { 'attributes': { 'rating': 5 } },
      ],
    };

    const mockFetch = jest.fn().mockResolvedValueOnce({
      json: async () => mockData,
    });

    const movieId = 1;
    const expectedAverageRating = 3;

    const averageRating = await getMovieRating(movieId, mockFetch);

    expect(averageRating).toBe(expectedAverageRating);
  });
});
