import express from 'express';
import fs from 'fs/promises';
import ejs from 'ejs';
import { loadMovie, loadMovies } from './movies.js';
import { renderMarkdown } from './markdown.js';
import { loadMovieReviews } from './movieReviews.js';
import { getUpcomingScreenings } from './screeningsFromAPI.js';
import { getUpcomingMovieScreenings } from './upcomingScreeningsFromApi.js';
import cmsAdapter from './cmsAdapter.js';

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/static', express.static('./static'));

app.get('/', async (req, res) => {
  res.render('index');
});

app.get('/om-oss', async (req, res) => {
  res.render('om-oss');
});

app.get('/biljetter', async (req, res) => {
  res.render('biljetter');
});

app.get('/evenemang', async (req, res) => {
  res.render('evenemang');
});

app.get('/filmer', async (req, res) => {
  const movies = await loadMovies();
  res.render('filmer', { movies });
});

app.get('/filmer/:movieId', async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const movie = await loadMovie(movieId);

    res.render('film', { movie, renderMarkdown });
  } catch (error) {
    if (error.message === 'Movie not found') {
      res.status(404).render('filmer404');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

app.get('/api/screenings', async (req, res) => {
  const upcomingScreenings = await getUpcomingScreenings(cmsAdapter);
  res.send(upcomingScreenings);
});

app.get('/api/movies/:movieID/screenings', async (req, res) => {
  try {
    const movieId = req.params.movieID;
    const upcomingMovieScreenings = await getUpcomingMovieScreenings(
      cmsAdapter,
      movieId
    );
    res.json(upcomingMovieScreenings);
  } catch (error) {
    console.error('Could not fetch upcoming movie screening:', error);
    res
      .status(500)
      .json({ error: 'Got an error when trying to fetch upcoming screenings' });
  }
});

app.get('/api/movies/:movieId/reviews', async (req, res) => {
  const movieId = req.params.movieId;
  const page = req.query.page || 1;

  try {
    const reviews = await loadMovieReviews(movieId, page);
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error loading reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('*', (req, res) => {
  res.status(404).render('404.ejs');
});

export default app;
