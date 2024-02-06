import fetch from 'node-fetch';

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

export async function loadMovieReviews(movieId, page) {
  const res = await fetch(
    `${API_BASE}/reviews?filters[movie]=${movieId}&pagination[pageSize]=5&pagination[page]=${page}`
  );
  const payload = await res.json();

  const reviews = payload.data.map((data) => ({
    id: data.id,
    reviewer: data.attributes.author,
    rating: data.attributes.rating,
    comment: data.attributes.comment,
  }));

  const formattedRes = {
    review: reviews,
    pagination: payload.meta.pagination,
  };

  return formattedRes;
}
