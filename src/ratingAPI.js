// Get movie rating from CMS or IMDB
import fetch from 'node-fetch';
import { loadMovie } from './movies.js';

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';
const omdbAPI = 'http://www.omdbapi.com';
const API_KEY = 'ffc40a2a';

export const ratingAPI = {
  fetchReviews: async (id) => {
    const res = await fetch(`${API_BASE}/reviews?filters[movie]=${id}`);
    return res.json();
  },

  calculateAverageRating: async (reviews) => {
    const ratings = reviews.map((obj) => obj.attributes.rating);
    const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
    return Number((totalRating / ratings.length).toFixed(1));
  },

  fetchImdbRating: async (id) => {
    const getImdbId = await loadMovie(id);
    const imdbId = getImdbId.imdbId;
    const omdbRes = await fetch(`${omdbAPI}/?apikey=${API_KEY}&i=${imdbId}`);
    const omdbData = await omdbRes.json();
    return Number(omdbData.imdbRating);
  },

  getMovieRating: async (id) => {
    const payload = await ratingAPI.fetchReviews(id);

    if (payload.data.length >= 5) {
      const averageRating = await ratingAPI.calculateAverageRating(
        payload.data
      );
      return averageRating;
    } else {
      const imdbRating = await ratingAPI.fetchImdbRating(id);
      return imdbRating;
    }
  },
};
