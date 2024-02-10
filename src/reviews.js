import fetch from 'node-fetch';

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

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
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throwing the error so it can be caught where the function is called.
  }
}

export default {
  createReview: createReview,
};
