import fetch from 'node-fetch';

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

export async function loadMovies() {
  const res = await fetch(API_BASE + '/movies');
  const payload = await res.json();
  const modifiedArr = payload.data.map((obj) => {
    return {
      id: obj.id,
      ...obj.attributes,
    };
  });
  return modifiedArr;
}

export async function loadMovie(id) {
  try {
    const res = await fetch(API_BASE + '/movies/' + id);

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Movie not found');
      } else {
        throw new Error('Failed to fetch movie');
      }
    }

    const payload = await res.json();

    if (!payload.data) {
      throw new Error('Movie not found');
    }
    const imdbId = payload.data.attributes.imdbId;

    return {
      id: payload.data.id,
      ...payload.data.attributes,
    };
  } catch (error) {
    throw error;
  }
}
