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

    return {
      id: payload.data.id,
      ...payload.data.attributes,
    };
  } catch (error) {
    throw error;
  }
}

export async function loadReviews(movieId) {
  const res = await fetch(API_BASE + '/reviews?filters[movie]=' + movieId);
  const payload = await res.json();
  const modifiedArr = payload.data.map((obj) => {
    return {
      id: obj.id,
      ...obj.attributes,
    };
  });
  return modifiedArr;
}

export async function createReview(movieId, name, comment, rating) {
  try {    
    const response = await fetch(API_BASE + '/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          author: name,
          comment: comment,
          rating: rating, 
          movie: movieId,
        },
      }),
    });
    const data = await response.json();
    // Handle the server's response.
    console.log('Success:', data);
    // If you need to update the DOM or perform actions after the fetch, consider returning the data here and handling the DOM updates where this function is called.
    return data; // You might return the response data to handle it outside (e.g., updating DOM or showing a message).
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throwing the error so it can be caught where the function is called.
  }
}

export default {
  createReview: createReview,
  loadReviews: loadReviews,
};
