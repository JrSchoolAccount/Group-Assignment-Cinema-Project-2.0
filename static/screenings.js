document.addEventListener('DOMContentLoaded', async () => {
  try {
    const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';
    const id = window.location.pathname.split('/').pop();
    const movieId =
      API_BASE + '/screenings?populate=movie&filters[movie]=' + id;

    const screeningsResponse = await fetch(movieId);
    const screeningsData = await screeningsResponse.json();
    console.log('här kommer screeningdata:', screeningsData);

    const screeningsList = document.getElementById('screening-list');
    screeningsList.innerHTML = ''; // Rensa listan först

    screeningsData.data.forEach((screening) => {
      const listItem = document.createElement('li');
      const startTime =
        new Date(screening.attributes.start_time).toLocaleDateString('sv-SE') +
        ', ' +
        new Date(screening.attributes.start_time).toLocaleTimeString('sv-SE');
      listItem.textContent = `Datum: ${startTime}, Plats: ${screening.attributes.room}`;
      screeningsList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error loading screenings:', error);
  }
});
