import fetch from 'node-fetch';

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

export async function loadMovieReviews(id, page) {
  const res = await fetch(
    `${API_BASE}/reviews?filters[movie]=${id}&pagination[pagesize]=5&pagination[page]=${page}`
  );
  const payload = await res.json();

  return payload;
}
