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
  const upcomingMovies = document.querySelector('.upcomingMovies');
  const screeningsDOMHeadline = document.createElement('h2');
  screeningsDOMHeadline.innerText = 'Nästkommande visningar på Bio Regna';
  upcomingMovies.append(screeningsDOMHeadline);

  const months = [
    'januari',
    'februari',
    'mars',
    'april',
    'maj',
    'juni',
    'juli',
    'augusti',
    'september',
    'oktober',
    'november',
    'december',
  ];

  // Create date category array
  const screeningDateCategories = [];

  for (let i = 0; i < payload.length; i++) {
    const screeningDate = new Date(payload[i].attributes.start_time);
    const screeningDateArray = [
      screeningDate.getDate(),
      screeningDate.getMonth(),
      screeningDate.getFullYear(),
    ];
    if (
      JSON.stringify(
        screeningDateCategories[screeningDateCategories.length - 1]
      ) != JSON.stringify(screeningDateArray)
    ) {
      screeningDateCategories.push(screeningDateArray);
    }
  }

  // Check which screenings belong to which date category and render it there
  screeningDateCategories.forEach((screeningDay) => {
    const dateHeadline = document.createElement('h2');
    // Create two digit versions of months and days to compare with current date
    const screeningDayTwodigit =
      JSON.stringify(screeningDay[0]).length == 1
        ? `0${screeningDay[0]}`
        : screeningDay[0];
    const screeningMonthTwodigit =
      JSON.stringify(screeningDay[1]).length == 1
        ? `0${screeningDay[1] + 1}`
        : screeningDay[0] + 1;
    // Compare with current date to display "today" or "tomorrow" in screenings
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (
      today.toJSON().slice(0, 10) ==
      `${screeningDay[2]}-${screeningMonthTwodigit}-${screeningDayTwodigit}`
    ) {
      dateHeadline.innerText = 'Idag';
    } else if (
      tomorrow.toJSON().slice(0, 10) ==
      `${screeningDay[2]}-${screeningMonthTwodigit}-${screeningDayTwodigit}`
    ) {
      dateHeadline.innerText = 'Imorgon';
    } else {
      const headlineMonth = months[screeningDay[1]];
      dateHeadline.innerText = `${screeningDay[0]} ${headlineMonth}`;
    }
    upcomingMovies.append(dateHeadline);

    for (let i = 0; i < payload.length; i++) {
      const screeningDate = new Date(payload[i].attributes.start_time);
      const screeningDateArray = [
        screeningDate.getDate(),
        screeningDate.getMonth(),
        screeningDate.getFullYear(),
      ];
      if (JSON.stringify(screeningDay) == JSON.stringify(screeningDateArray)) {
        const screeningTime =
          JSON.stringify(screeningDate.getUTCMinutes()).length == 1
            ? `0${screeningDate.getUTCMinutes()}`
            : screeningDate.getUTCMinutes();
        const screeningDOMListItem = document.createElement('li');

        screeningDOMListItem.innerText = `Klockan ${screeningDate.getUTCHours()}:${screeningTime} - ${
          payload[i].attributes.movie.data.attributes.title
        } i ${payload[i].attributes.room}`;
        dateHeadline.append(screeningDOMListItem);
      }
    }
  });
}

renderScreenings();
