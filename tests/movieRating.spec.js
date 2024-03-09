import { jest } from '@jest/globals';
import { getMovieRating } from '../src/ratingAPI';

describe('getMovieRating()', () => {
  test('should return the average rating when there are 5 or more reviews', async () => {
    const mockData = {
      data: [
        { 'attributes': { 'rating': 4 } },
        { 'attributes': { 'rating': 4 } },
        { 'attributes': { 'rating': 4 } },
        { 'attributes': { 'rating': 4 } },
      ],
    };

    jest.fn().mockResolvedValueOnce({
      json: async () => mockData,
    });
    console.log(mockData);
    const movieId = 1;
    const expectedAverageRating = 4;

    const averageRating = await getMovieRating(movieId, mockData);

    expect(averageRating).toBe(expectedAverageRating);
  });
});
