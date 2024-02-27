// This function prepares the review data
function prepareReviewData(newReview) {
  const date = new Date().toISOString();
  const body = {
    data: {
      comment: 'string',
      rating: 0,
      author: 'string',
      verified: true,
      movie: 'string or id',
      createdAt: date,
      updatedAt: date,
      createdBy: 'string or id',
      updatedBy: 'string or id',
      ...newReview,
    },
  };
  return body;
}

// This async function sends the prepared review data to the server
export async function review(newReview) {
  const reviewBody = prepareReviewData(newReview);
  const jsonData = JSON.stringify(reviewBody);
  const fetchUrl = 'https://plankton-app-xhkom.ondigitalocean.app/api/reviews';

  try {
    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    });

    if (!response.ok) {
      throw new Error('Failed to write data to database');
    }

    const jsonResponse = await response.json();
    console.log('Response from server:', jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error('Error during fetch operation:', error);
    throw error;
  }
}