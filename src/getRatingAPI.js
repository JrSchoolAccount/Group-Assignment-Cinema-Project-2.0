import fetch from 'node-fetch';

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';
const omdbAPI = 'http://www.omdbapi.com';
const API_KEY = 'ffc40a2a';

export async function getMovieRating(id) {
  const res = await fetch(`${API_BASE}/reviews?filters[movie]=${id}`);
  const payload = await res.json();

  const ratings = payload.data.map((obj) => {
    return {
      rating: obj.attributes.rating,
    };
  });
  const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = totalRating / ratings.length;

  console.log('Average Rating:', averageRating.toFixed(1), '/ 10');
}
