import fetch from 'node-fetch';

export async function submitReview() {
  const form = document.querySelector('.review__form');
  const formData = new FormData(form);

  fetch('/api/movies/${formData.movie_id}/reviews', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((error) => {
      console.error('Error', error.message);
    });
}
