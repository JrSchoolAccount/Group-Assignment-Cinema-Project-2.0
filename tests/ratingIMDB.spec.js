// Description: Test to get the rating of a movie from the IMDB API when it's fewer than 5 reviews.
import { jest } from '@jest/globals';
import { ratingAPI } from '../src/ratingAPI.js';

jest.mock('../src/movies.js', () => ({
  ...jest.requireActual('../src/movies.js'),
  loadMovie: () => Promise.resolve({ imdbId: 'tt5104604' }),
}));

describe('getMovieRating()', () => {
  test('should return the IMDB rating when there are less than 5 reviews', async () => {
    const mockData = {
      data: [
        { 'attributes': { 'rating': 1 } },
        { 'attributes': { 'rating': 2 } },
      ],
    };
    const mockedImdbRating = 9.5;
    const expectedImdbRating = 9.5;

    jest
      .spyOn(ratingAPI, 'fetchReviews')
      .mockImplementation(() => Promise.resolve(mockData));
    ratingAPI.fetchImdbRating = jest.fn().mockReturnValue(mockedImdbRating);

    const movieId = 1;

    const imdbRating = await ratingAPI.getMovieRating(movieId);

    expect(imdbRating).toBe(expectedImdbRating);
  });
});
