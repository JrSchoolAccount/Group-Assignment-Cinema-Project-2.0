import { jest } from '@jest/globals';
import fetch from 'node-fetch';
import { getMovieRating } from '../src/ratingAPI';

// Mock fetch
jest.mock('node-fetch');

describe('getMovieRating() when there are less than 5 reviews', () => {
  test('should return the IMDb rating', async () => {
    // Ange vilket movieId som ska användas
    const movieId = 1;
    // Mocka betygsdata för färre än 5 betyg, för att testa att funktionen fungerar och välje "else" i If-satsen.
    const mockReviews = {
      data: [
        { attributes: { rating: 4 } },
        { attributes: { rating: 4 } },
        { attributes: { rating: 4 } },
        { attributes: { rating: 4 } },
      ],
    };

    const fetchMock = jest.requireActual('node-fetch'); // Hämta den faktiska implementationen av fetch
    fetchMock.mockResolvedValueOnce({
      json: async () => mockReviews,
    });

    // Mocka loadMovie-funktionen för att returnera ett specifikt IMDb-ID
    jest.mock('../src/movies', () => ({
      loadMovie: jest.fn().mockResolvedValue({ imdbId: 'tt5104604' }),
    }));

    // Mocka omdbRes för att returnera mockOmdbRes
    const mockOmdbRes = {
      imdbRating: 8.5,
    };

    fetch.mockResolvedValueOnce({
      json: async () => mockOmdbRes,
    });

    const expectedImdbRating = 8.5; // Testets förväntade IMDb-betyg

    // Kör funktionen och få det faktiska betyget
    const imdbRating = await getMovieRating(movieId);

    // Jämför det faktiska betyget med det förväntade
    expect(imdbRating).toBe(expectedImdbRating);
  });
});
