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
  clearReviewsContainer();

  reviews.forEach((review) => {
    const name = review.reviewer || '';

    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');

    const reviewHeader = document.createElement('div');
    reviewHeader.classList.add('review_header');

    const reviewerName = document.createElement('p');
    reviewerName.textContent = 'Namn: ' + name;
    reviewerName.classList.add('reviewer_name');

    const reviewRating = document.createElement('p');
    reviewRating.textContent = `Betyg: ${review.rating}`;
    reviewRating.classList.add('review_rating');

    const commentP = document.createElement('p');
    commentP.classList.add('review_comment');
    commentP.textContent = review.comment;

    reviewHeader.appendChild(reviewerName);
    reviewHeader.appendChild(reviewRating);

    reviewDiv.appendChild(reviewHeader);
    reviewDiv.appendChild(commentP);

    reviewsContainer.appendChild(reviewDiv);
  });
};

const clearReviewsContainer = () => {
  while (reviewsContainer.firstChild) {
    reviewsContainer.removeChild(reviewsContainer.firstChild);
  }
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
