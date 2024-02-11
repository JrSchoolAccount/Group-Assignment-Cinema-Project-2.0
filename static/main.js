import { showSlides } from './herobanner.js';
import { renderLatestScreenings } from './latestScreeningsStartpage.js';

// Herobanner slideshow
const heroContainer = document.querySelector('.herobanner_container');

if (heroContainer) {
  showSlides();
}

// Render upcoming screenings on startpage (if startpage is current page)
const isOnStartpage = document.querySelector('.upcomingMovies');
if (isOnStartpage) {
  renderLatestScreenings();
}
