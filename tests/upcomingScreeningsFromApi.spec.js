import { describe, test, expect, beforeEach } from '@jest/globals';
import { getUpcomingMovieScreenings } from '../src/upcomingScreeningsFromApi';
import { jest } from '@jest/globals';

describe('getUpcomingMovieScreenings()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('only returns upcoming screenings', async () => {
    jest.setSystemTime(new Date('2024-02-02T19:00:00.000Z'));
    const cmsAdapter = {
      loadUpcomingScreenings: async () => ({
        data: [
          mockReviews({ start_time: '2023-06-14T19:00:00.000Z' }),
          mockReviews({ start_time: '2023-06-14T19:00:00.000Z' }),
          mockReviews({ start_time: '2024-06-14T19:00:00.000Z' }),
        ],
      }),
    };

    const { data } = await getUpcomingMovieScreenings(cmsAdapter);

    expect(data).toHaveLength(1);
  });
});

function mockReviews(attributes) {
  return {
    id: 1,
    attributes: {
      start_time: '2023-06-14T19:00:00.000Z',
      room: 'Stora salongen',
      createdAt: '2023-05-25T13:09:53.589Z',
      updatedAt: '2023-05-25T13:09:53.589Z',
      movie: {
        data: {
          id: 4,
          attributes: {
            title: 'Min granne Totoro',
            imdbId: 'tt0096283',
            intro:
              'When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.',
            image: {
              url: 'https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
            },
            createdAt: '2023-01-23T09:15:23.153Z',
            updatedAt: '2023-01-27T07:12:08.242Z',
            publishedAt: '2023-01-23T09:15:43.382Z',
          },
        },
      },
      ...attributes,
    },
  };
}

/* import { describe, test, expect, beforeEach } from '@jest/globals';
import getRecentReviews from '../src/getRecentReviews';
import { getUpcomingMovieScreenings } from '../src/upcomingScreeningsFromApi';
import { jest } from '@jest/globals';

describe('getRecentReviews()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('includes a review with a 3-5 rating', async () => {
    const cmsAdapter = {
      loadAllReviews: async () => [
        mockReviews({ rating: 5 }),
        mockReviews({ rating: 4 }),
        mockReviews({ rating: 3 }),
      ],
    };

    const data = await getRecentReviews(cmsAdapter);

    expect(data).toHaveLength(3);
  });

  test('excludes a review with a 2 rating', async () => {
    const data = await getRecentReviews({
      loadAllReviews: async () => [
        mockReviews({ rating: 0 }),
        mockReviews({ rating: 1 }),
        mockReviews({ rating: 1 }),
      ],
    });

    expect(data).toHaveLength(0);
  });

  test('excludes reviews that are more than 60 days old', async () => {
    jest.setSystemTime(new Date('2023-01-31T13:37:00.000Z'));

    const cmsAdapter = {
      loadAllReviews: async () => [
        mockReviews({ createdAt: '1986-01-01T13:37:00.000Z', rating: 4 }),
        mockReviews({ createdAt: '2023-01-30T13:37:00.000Z', rating: 4 }),
      ],
    };
    const data = await getRecentReviews(cmsAdapter);
    expect(data).toHaveLength(1);
    expect(data[0].attributes.createdAt).toBe('2023-01-30T13:37:00.000Z');
  });
});

function mockReviews(attributes) {
  return {
    id: 1,
    attributes: {
      comment: 'Nice movie',
      rating: 2,
      author: 'Richard',
      verified: true,
      createdAt: '2024-01-01T13:37:00.000Z',
      updatedAt: '2024-01-01T13:37:00.000Z',
      movie: {
        data: {
          id: 1,
          attributes: {
            title: 'Isle of dogs',
            imdbId: 'tt5104604',
            intro:
              'An outbreak of dog flu has spread through the city of **Megasaki, Japan**, and Mayor Kobayashi has demanded all dogs to be sent to Trash Island.',
            image: {
              url: 'https://m.media-amazon.com/images/M/MV5BZDQwOWQ2NmUtZThjZi00MGM0LTkzNDctMzcyMjcyOGI1OGRkXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg',
            },
            createdAt: '2023-01-23T05:58:58.110Z',
            updatedAt: '2023-01-27T07:11:53.523Z',
            publishedAt: '2023-01-23T06:01:31.679Z',
          },
        },
      },
      ...attributes,
    },
  };
} */
