export async function sendReview(author, rating, comment, movieID) {
  try {
    const url = 'https://plankton-app-xhkom.ondigitalocean.app/api/reviews';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          author,
          rating,
          comment,
          movie: movieID,
        },
      }),
    });

    const data = await response.json();
    return { success: response.ok, data: data };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default { sendReview };
