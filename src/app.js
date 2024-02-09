import express from 'express';
import fs from 'fs/promises';
import ejs from 'ejs';
import { loadMovie, loadMovies, loadScreenings } from './movies.js';
import { renderMarkdown } from './markdown.js';
import { loadReviews, createReview } from './movies.js';
import { getUpcomingScreenings } from './screeningsFromAPI.js';
import cmsAdapter from './cmsAdapter.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
    const reviews = await loadReviews(movieId); 
    res.render('film', { movie, reviews, renderMarkdown });
  } catch (error) {
    if (error.message === 'Movie not found') {
      res.status(404).render('filmer404');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

app.post("/movies/:movieId/reviews", async (req, res) => {
  const name = req.body.name;
  const rating = req.body.rating;
  console.log("Rating:", rating);
  await createReview(req.params.movieId, name, req.body.comment, rating);  
 
   res.redirect(`/filmer/${req.params.movieId}`);
});


app.get('/api/screenings', async (req, res) => {
  const upcomingScreenings = await getUpcomingScreenings(cmsAdapter);
  res.send(upcomingScreenings);
});

app.get('/api/movies/:movieID/screenings', async (req, res) => {
  try {
    const movieId = req.params.movieID;
    const screenings = await loadScreenings(movieId);
    const currentTime = new Date().getTime();
    const upcomingScreenings = screenings.data.filter((screening) => {
      return new Date(screening.attributes.start_time).getTime() >= currentTime;
    });

    res.json({ data: upcomingScreenings });
  } catch (error) {
    if (error.message === 'Screening not found') {
      res.status(404).render('screening404');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

app.get('*', (req, res) => {
  res.status(404).render('404.ejs');
});

export default app;
