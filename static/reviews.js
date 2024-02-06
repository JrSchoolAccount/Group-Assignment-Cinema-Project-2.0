const reviewsContainer = document.querySelector('.container_reviews');
const prevButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');

let currentPage = 1;
const pageSize = 5;

const fetchReviews = async (page) => {
  const movieId = window.location.pathname.split('/').pop();
  try {
    const res = await fetch(`/api/movies/${movieId}/reviews?page=${page}`);
    const data = await res.json();
    const reviews = data.reviews.review;

    renderReviews(reviews);

    prevButton.disabled = page === 1;
    nextButton.disabled = reviews.length < pageSize;
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

const renderReviews = (reviews) => {
  reviews.forEach((review) => {
    const reviewDiv = document.createElement('div');

    const reviewerP = document.createElement('p');
    const reviewStrong = document.createElement('strong');

    reviewStrong.textContent = 'Namn: ' + review.reviewer;
    reviewerP.appendChild(reviewStrong);
    reviewerP.appendChild(
      document.createTextNode(`- Rating: ${review.rating}`)
    );

    const commentP = document.createElement('p');
    commentP.textContent = 'Kommentar: ' + review.comment;

    reviewDiv.appendChild(reviewerP);
    reviewDiv.appendChild(commentP);

    reviewsContainer.appendChild(reviewDiv);
  });
};

fetchReviews(currentPage);

// Next and previous button event listeners

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchReviews(currentPage);
  }
});

nextButton.addEventListener('click', () => {
  currentPage++;
  fetchReviews(currentPage);
});
