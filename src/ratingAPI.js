// Get movie rating from API
import fetch from 'node-fetch';
import { loadMovie } from './movies.js';

// https://plankton-app-xhkom.ondigitalocean.app/api/reviews?filters[movie]=1
// http://www.omdbapi.com/?apikey=ffc40a2a&i=tt5104604

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';
const omdbAPI = 'http://www.omdbapi.com';
const API_KEY = 'ffc40a2a';

export async function getMovieRating(id, mockFetch = fetch) {
  const res = await mockFetch(`${API_BASE}/reviews?filters[movie]=${id}`);
  const payload = await res.json();

  if (payload.data.length >= 5) {
    const ratings = payload.data.map((obj) => obj.attributes.rating);
    const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
    const averageRating = totalRating / ratings.length;
    console.log('Rating:', averageRating.toFixed(1));

    return Number(averageRating.toFixed(1));
  } else {
    const getImdbId = await loadMovie(id);
    const imdbId = getImdbId.imdbId;
    const omdbRes = await fetch(`${omdbAPI}/?apikey=${API_KEY}&i=${imdbId}`);
    const omdbData = await omdbRes.json();
    const imdbRating = omdbData.imdbRating;
    console.log('imdb:', imdbRating);
    return Number(imdbRating);
  }
}

//getMovieRating(1);
