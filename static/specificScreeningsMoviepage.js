document.addEventListener('DOMContentLoaded', async () => {
  try {
    const id = window.location.pathname.split('/').pop();
    const movieId = `/api/movies/${id}/screenings`;
    const screeningsResponse = await fetch(movieId);
    const screeningsData = await screeningsResponse.json();

    const screeningsList = document.getElementById('screening-list');
    screeningsList.innerHTML = '';

    if (screeningsData.data.length === 0) {
      const noScreeningsMessage = document.createElement('li');
      noScreeningsMessage.textContent = 'Inga kommande visningar';
      screeningsList.appendChild(noScreeningsMessage);
    } else {
      screeningsData.data.sort((a, b) => {
        const startTimeA = new Date(a.attributes.start_time).getTime();
        const StartTimeB = new Date(b.attributes.start_time).getTime();
        return startTimeA - StartTimeB;
      });
      screeningsData.data.forEach((screening) => {
        const listItem = document.createElement('li');
        const startTime = new Date(screening.attributes.start_time);
        const formatTime = startTime.toLocaleString('sv-SE', {
          timeZone: 'UTC',
        });
        const formattedDateTime = `${formatTime}`;
        listItem.textContent = `Datum: ${formattedDateTime} Plats: ${screening.attributes.room}`;
        screeningsList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error('Error loading screenings:', error);
  }
});
