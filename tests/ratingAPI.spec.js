// Description: Test to get the rating of a movie from the CMS API when there are 5 or more reviews.
import { jest } from '@jest/globals';
import { ratingAPI } from '../src/ratingAPI.js';

jest.mock('../src/movies.js');

describe('getRatingCMS()', () => {
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

    jest
      .spyOn(ratingAPI, 'fetchReviews')
      .mockImplementation(() => Promise.resolve(mockData));

    const movieId = 1;
    const expectedAverageRating = 3;

    const averageRating = await ratingAPI.getMovieRating(movieId);

    expect(averageRating).toBe(expectedAverageRating);
  });
});
