import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';

describe('Pagination test', () => {
  it('should return paginated reviews for a movie with pageSize: 5', async () => {
    const movieId = 2;
    const page = 1;

    const res = await request(app)
      .get(`/api/movies/${movieId}/reviews`)
      .query({ page });

    expect(res.status).toBe(200);
    expect(res.body.reviews.pagination).toBeDefined();
    expect(res.body.reviews.pagination.page).toBe(page);
    expect(res.body.reviews.pagination.pageSize).toBe(5);
  });
});
