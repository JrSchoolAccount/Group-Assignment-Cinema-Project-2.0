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
      ],
    };

    jest.fn().mockResolvedValueOnce({
      json: async () => mockData,
    });

    const movieId = 1;
    const expectedAverageRating = 4.2;

    const averageRating = await getMovieRating(movieId);

    expect(averageRating).toBe(expectedAverageRating);
  });
});
/*

describe('getMovieRating()', () => {
  test('should return the average rating when there are 5 or more reviews', async () => {
    const mockData = {
      data: [
        { attributes: { rating: 4 } },
        { attributes: { rating: 5 } },
        { attributes: { rating: 3 } },
        { attributes: { rating: 4 } },
      ],
    };

    const mockFetch = jest.fn().mockResolvedValueOnce({
      json: async () => mockData,
    });

    // Mocka omdbRes för att returnera det förväntade omdbData-objektet
    const omdbData = { imdbRating: 8.5 }; // Ange det förväntade imdbRating-värdet
    const omdbRes = { json: async () => omdbData }; // Skapa en mock för omdbRes

    jest.spyOn(global, 'fetch').mockResolvedValueOnce(omdbRes); // Mocka fetch globalt

    const movieId = 1;
    const expectedAverageRating = 5.2;

    const averageRating = await getMovieRating(movieId, mockFetch);

    expect(averageRating).toBe(expectedAverageRating);
  });
});
*/
