import { describe, test, expect } from '@jest/globals';
import { getUpcomingScreenings } from '../src/screeningsStartpage';
import { jest } from '@jest/globals';

describe('getUpcomingScreenings()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('includes start time within five days', async () => {
    jest.setSystemTime(new Date('2024-02-02T19:00:00.000Z'));
    const data = await getUpcomingScreenings({
      loadAllScreenings: async () => [
        mockScreenings({ start_time: '2024-02-05T19:00:00.000Z' }),
      ],
    });
    expect(data).toHaveLength(1);
  });
  test('excludes start time after five days', async () => {
    jest.setSystemTime(new Date('2024-02-02T19:00:00.000Z'));
    const data = await getUpcomingScreenings({
      loadAllScreenings: async () => [
        mockScreenings({ start_time: '2024-02-14T19:00:00.000Z' }),
      ],
    });
    expect(data).toHaveLength(0);
  });
  test('excludes start time before today', async () => {
    const data = await getUpcomingScreenings({
      loadAllScreenings: async () => [
        mockScreenings({ start_time: '2024-01-14T19:00:00.000Z' }),
      ],
    });
    expect(data).toHaveLength(0);
  });
});

function mockScreenings(attributes) {
  return {
    id: 201,
    attributes: {
      start_time: '2024-02-02T19:00:00.000Z',
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
