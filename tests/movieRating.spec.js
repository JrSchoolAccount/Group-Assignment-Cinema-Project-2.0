import { jest } from '@jest/globals';
import { getMovieRating } from '../src/ratingAPI';

describe('getMovieRating()', () => {
  test('should return the average rating when there are 5 or more reviews', async () => {
    const mockData = {
      data: [
        { attributes: { rating: 4 } },
        { attributes: { rating: 5 } },
        { attributes: { rating: 3 } },
        { attributes: { rating: 4 } },
        { attributes: { rating: 5 } },
      ],
    };

    const mockFetch = jest.fn().mockResolvedValueOnce({
      json: async () => mockData,
    });

    const movieId = 0;
    const expectedAverageRating = 4.2;

    const averageRating = await getMovieRating(movieId, mockFetch);

    expect(averageRating).toBe(expectedAverageRating);
  });
});
