const form = document.getElementById('review_form');
form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  const reviewData = {
    movie_id: formData.get('movie_id'),
    reviewer_name: formData.get('reviewer_name'),
    rating: formData.get('rating'),
    review_text: formData.get('review_text'),
  };
  try {
    const response = await fetch('/api/movies/:movieID/reviews', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit review');
    }
    const data = await response.json();
    console.log('Data: ', data);
    return data;
  } catch (error) {
    console.error('Error submitting: ');
  }
});
