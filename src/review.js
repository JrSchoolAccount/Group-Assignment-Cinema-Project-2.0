import fetch from 'node-fetch';

export async function submitReview(event) {
  event.preventDefault();

  const form = document.querySelector('.review__form');
  const formData = new FormData(form);

  try {
    const reviewData = {
      movie_id: formData.get('movie_id'),
      reviewer_name: formData.get('reviewer_name'),
      rating: formData.get('rating'),
      review_text: formData.get('review_text'),
    };

    const response = await fetch('/api/movies/${formData.movie_id}/reviews', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(reviewData),
    });

    const resData = await response.json();
    console.log('Whey!' + resData);
  } catch (error) {
    console.log(error(error.message));
  }
  throw error;
}
