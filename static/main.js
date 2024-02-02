import { showSlides } from './herobanner.js';

// Herobanner slideshow
const heroContainer = document.querySelector('.herobanner_container');

if (heroContainer) {
  showSlides();
}

// async function fetchScreenings() {
//   const response = await fetch('localhost:5080/api/screenings', {
//     method: 'GET',
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer-when-downgrade', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     // body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }
// await fetchScreenings();

// console.log(fetchScreenings());

async function renderScreenings() {
  const res = await fetch('http://localhost:5080/api/screenings');
  const payload = await res.json();
  // const upcomingMovieTitles = [];
  const upcomingMovies = document.querySelector('.upcomingMovies');
  // upcomingMovies.innerHTML = upcomingMovieTitles;
  const screeningsDOMHeadline = document.createElement('h2');
  screeningsDOMHeadline.innerText = 'Nästkommande visningar på Bio Regna';
  upcomingMovies.append(screeningsDOMHeadline);
  payload.forEach((screening) => {
    const screeningDOMListItem = document.createElement('li');
    const screeningDOMLink = document.createElement('a');
    screeningDOMLink.innerText = `${screening.attributes.movie.data.attributes.title} visas den ${screening.attributes.start_time} i ${screening.attributes.room}`;
    screeningDOMLink.setAttribute(
      'href',
      'http://localhost:5080/filmer/' + screening.attributes.movie.data.id
    );

    // upcomingMovieTitles.push(screening.attributes.movie.data.attributes.title);
    screeningDOMListItem.append(screeningDOMLink);
    upcomingMovies.append(screeningDOMListItem);
  });
}

renderScreenings();
