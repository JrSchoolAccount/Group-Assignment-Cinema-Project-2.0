import express from 'express';
import fs from 'fs/promises';
import ejs from 'ejs';
import { loadMovie, loadMovies, loadScreenings } from './movies.js';
import { renderMarkdown } from './markdown.js';

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
    const movie = await loadMovie(req.params.movieId);

    const screenings = await loadScreenings(req.params.movieId);
    /*  console.log(screenings); */
    res.render('film', { movie, renderMarkdown });
  } catch (error) {
    if (error.message === 'Movie not found') {
      res.status(404).render('filmer404');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

app.get('api/screenings', async (req, res) => {
  // Placeholder, delete me...
});

app.get('api/movies/:movieID/screenings', async (req, res) => {
  // Placeholder, delete me...
});

app.get('api/movies/:movieID/rating', async (req, res) => {
  // Placeholder, delete me...
});

app.get('api/movies/:movieId/reviews', async (req, res) => {
  // Placeholder, delete me...
});

app.post('api/movies/:movieID/reviews', async (req, res) => {
  // Placeholder, delete me...
});

app.get('*', (req, res) => {
  res.status(404).render('404.ejs');
});

export default app;
