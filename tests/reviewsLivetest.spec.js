import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';

describe('Pagination test for Pulp Fiction page', () => {
  test('should return paginated reviews for a movie with pageSize: 5', async () => {
    const movieId = 8;
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

describe('Pagination test for Encanto page', () => {
  test('should return paginated reviews for a movie with pageSize: 5', async () => {
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

describe('Pagination test for Isle of dogs page', () => {
  test('should return paginated reviews for a movie with pageSize: 5', async () => {
    const movieId = 1;
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

describe('Pagination test for Min granne Totoro page', () => {
  test('should return paginated reviews for a movie with pageSize: 5', async () => {
    const movieId = 4;
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

describe('Pagination test for The Shawshank Redemption page', () => {
  test('should return paginated reviews for a movie with pageSize: 5', async () => {
    const movieId = 3;
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

describe('Pagination test for Forrest Gump page', () => {
  test('should return paginated reviews for a movie with pageSize: 5', async () => {
    const movieId = 6;
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

describe('Pagination test for The Muppets page', () => {
  test('should return paginated reviews for a movie with pageSize: 5', async () => {
    const movieId = 5;
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

describe('Pagination test with mockData', () => {
  test('should return paginated reviews for a movie with pageSize: 5', async () => {
    const movieId = 5;
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
