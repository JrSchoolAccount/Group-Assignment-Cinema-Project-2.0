import fetch from 'node-fetch';
import loadMovies from './movies.js';

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';
const omdbAPI = 'http://www.omdbapi.com';
const API_KEY = 'ffc40a2a';

export async function getMovieRating(movie) {
  try {
    const res = await fetch(`${API_BASE}/reviews?filters[movie]=${movie.id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch movie ratings');
    }
    const payload = await res.json();
    return payload;
  } catch (error) {
    throw error;
  }
}
