import fetch from 'node-fetch';
import { loadMovie } from './movies.js';

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';
const omdbAPI = 'http://www.omdbapi.com';
const API_KEY = 'ffc40a2a';

export async function getMovieRating(id) {
  const res = await fetch(`${API_BASE}/reviews?filters[movie]=${id}`);
  const payload = await res.json();

  if (payload.data.length >= 45) {
    const ratings = payload.data.map((obj) => obj.attributes.rating);
    const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
    const averageRating = totalRating / ratings.length;
    console.log('User Rating:', averageRating.toFixed(1));
    return averageRating.toFixed(1);
  } else {
    const getImdbId = await loadMovie(id);
    const imdbId = getImdbId.imdbId;
    const omdbRes = await fetch(`${omdbAPI}/?apikey=${API_KEY}&i=${imdbId}`);
    const omdbData = await omdbRes.json();
    const imdbRating = parseFloat(omdbData.imdbRating);
    console.log('IMDB Rating:', imdbRating.toFixed(1));
    return imdbRating.toFixed(1);
  }
}
