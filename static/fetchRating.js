const fetchMovieRating = async (movieId) => {
  try {
    const response = await fetch(`/api/filmer/${movieId}/rating`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie rating');
    }
    const data = await response.json();
    const rating = data.rating;
    return rating;
  } catch (error) {
    console.error('Error fetching movie rating:', error);
    throw error;
  }
};

const updateMovieRating = async (movieId) => {
  try {
    const rating = await fetchMovieRating(movieId);
    const ratingElement = document.getElementById('movie_rating');
    ratingElement.textContent = `Betyg: ${rating} av 10`;
  } catch (error) {
    console.error('Error updating movie rating:', error);
  }
};

const movieId = window.location.pathname.split('/').pop();

updateMovieRating(movieId);
