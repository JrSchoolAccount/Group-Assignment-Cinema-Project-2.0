const nameE1 = document.getElementById('name');
const commentE1 = document.getElementById('comment');
const ratingE1 = document.getElementById('rating');

const submitE1 = document.getElementById('submit');
submitE1.addEventListener('click', createReview);

// Defines a function to extract the movie ID from the current URL
  function getMovieIdFromUrl() {
    // Obtain the current page's pathname (URL path).
    const pathname = window.location.pathname;
     // Split the pathname into segments using '/' as a delimiter.
    const segments = pathname.split('/');
    // Return the last segment of the path, assuming it's the movie ID.
    return segments.pop();
}
function createReview(event){
  // Prevent the default form submission behavior to handle submission via JavaScript.
  event.preventDefault();
  const movieId = getMovieIdFromUrl();

  let name = nameE1.value;
  let comment = commentE1.value;
  let rating = ratingE1.value;
 
  const data = new URLSearchParams();
  data.append("id", movieId);
  data.append("comment", comment);
  data.append("rating", rating);
  data.append("author", name);

  console.log([...data]);
  
 fetch(`/api/movies/${movieId}/reviews` , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,

    })  
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    })
    .catch((error) => {
      console.error('Error:', error);
      console.error('Status Code:', error.response?.status);       
    });
    clearInputFields();
}

  function clearInputFields() {
    nameE1.value = '';
    commentE1.value = '';
    ratingE1.value = '';
  }

