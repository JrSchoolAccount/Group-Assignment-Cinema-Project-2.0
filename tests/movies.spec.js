import { expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';

test('Pulp Fiction page shows movie title', async () => {
  const response = await request(app)
    .get('/filmer/8')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200);

  expect(response.text).toMatch('Pulp Fiction');
});

test('Encanto page shows movie title', async () => {
  const response = await request(app)
    .get('/filmer/2')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200);

  expect(response.text).toMatch('Encanto');
});

test('Isle of dogs page shows movie title', async () => {
  const response = await request(app)
    .get('/filmer/1')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200);

  expect(response.text).toMatch('Isle of dogs');
});

test('Min granne Totoro page shows movie title', async () => {
  const response = await request(app)
    .get('/filmer/4')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200);

  expect(response.text).toMatch('Min granne Totoro');
});

test('The Shawshank Redemption page shows movie title', async () => {
  const response = await request(app)
    .get('/filmer/3')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200);

  expect(response.text).toMatch('The Shawshank Redemption');
});

test('Forrest Gump page shows movie title', async () => {
  const response = await request(app)
    .get('/filmer/6')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200);

  expect(response.text).toMatch('Forrest Gump');
});

test('The Muppets page shows movie title', async () => {
  const response = await request(app)
    .get('/filmer/5')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200);

  expect(response.text).toMatch('The Muppets');
});

test('Id not found respond with 404', async () => {
  const response = await request(app)
    .get('/filmer/1337')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(404);

  expect(response.text).toMatch('404');
});
