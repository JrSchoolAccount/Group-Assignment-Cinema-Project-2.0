document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('review_form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const movieID = formData.get('movieID');
    const reviewer = formData.get('reviewer');
    const rating = formData.get('rating');
    const reviewText = formData.get('reviewText');

    await fetch(`/api/movies/${movieID}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: reviewer,
        rating: rating,
        comment: reviewText,
      }),
    });
  });
});
