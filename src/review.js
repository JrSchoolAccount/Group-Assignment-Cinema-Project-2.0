export async function submitReview(reviewer, rating, reviewText, movieID) {
  try {
    const response = await fetch(
      'https://plankton-app-xhkom.ondigitalocean.app/api/reviews',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            author: reviewer,
            comment: reviewText,
            rating: rating,
            movie: movieID,
          },
        }),
      }
    );

    const reviewData = await response.json();
    console.log('Review Submitted:', reviewData.data);
    return reviewData.data;
  } catch (error) {
    console.error('Error submitting review:', error.message);
    throw error;
  }
}
export default submitReview;
