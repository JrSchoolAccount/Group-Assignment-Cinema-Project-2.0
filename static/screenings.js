document.addEventListener('DOMContentLoaded', async () => {
  try {
    const id = window.location.pathname.split('/').pop();
    const movieId = `/api/movies/${id}/screenings`;
    const screeningsResponse = await fetch(movieId);
    const screeningsData = await screeningsResponse.json();
    console.log('här kommer screeningdata:', screeningsData);

    const screeningsList = document.getElementById('screening-list');
    screeningsList.innerHTML = '';

    screeningsData.data.forEach((screening) => {
      const listItem = document.createElement('li');
      const startTime =
        new Date(screening.attributes.start_time).toLocaleDateString('sv-SE') +
        ', ' +
        new Date(screening.attributes.start_time).toLocaleTimeString('sv-SE');
      listItem.textContent = `Datum: ${screening.attributes.start_time}, Plats: ${screening.attributes.room}`;
      screeningsList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error loading screenings:', error);
  }
});
