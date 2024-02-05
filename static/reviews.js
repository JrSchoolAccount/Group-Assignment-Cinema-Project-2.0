const reviewsContainer = document.querySelector('.container_reviews');
const prevButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');

let currentPage = 1;

const fetchReviews = async (page) => {
  const movieId = window.location.pathname.split('/').pop();
  try {
    const res = await fetch(`/api/movies/${movieId}/reviews?page=${page}`);
    const data = await res.json();

    const reviews = data.attributes;

    renderReviews(reviews);

    prevButton.disabled = page === 1;
    nextButton.disabled = reviews.length < 5;
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

const renderReviews = (reviews) => {
  reviews.forEach((review) => {});
};

fetchReviews(currentPage);
