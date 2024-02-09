export async function renderLatestScreenings() {
  const res = await fetch('http://localhost:5080/api/screenings');
  const payload = await res.json();

  // Create headline for "nästkommande visningar"
  const upcomingMovies = document.querySelector('.upcomingMovies');
  const screeningsDOMHeadline = document.createElement('h2');
  screeningsDOMHeadline.innerText = 'Nästkommande visningar på Bio Regna';
  upcomingMovies.append(screeningsDOMHeadline);
  const screeningsDOMList = document.createElement('ul');
  upcomingMovies.append(screeningsDOMList);

  // Create array of months to use later for date categories
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
    const dateHeadline = document.createElement('h3');
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
    screeningsDOMList.append(dateHeadline);

    for (let i = 0; i < payload.length; i++) {
      const screeningDate = new Date(payload[i].attributes.start_time);
      const screeningDateArray = [
        screeningDate.getDate(),
        screeningDate.getMonth(),
        screeningDate.getFullYear(),
      ];
      if (JSON.stringify(screeningDay) == JSON.stringify(screeningDateArray)) {
        const screeningDOMListItem = document.createElement('li');
        //Create Screening Time
        const screeningTime = document.createElement('span');
        screeningTime.className = 'screeningTime';
        const screeningTimeMinutes =
          JSON.stringify(screeningDate.getUTCMinutes()).length == 1
            ? `0${screeningDate.getUTCMinutes()}`
            : screeningDate.getUTCMinutes();
        screeningTime.innerText = `${screeningDate.getUTCHours()}:${screeningTimeMinutes} `;
        screeningDOMListItem.append(screeningTime);
        //Create Screening Movie Title
        const screeningMovie = document.createElement('a');
        screeningMovie.className = 'screeningMovie';
        screeningMovie.setAttribute(
          'href',
          `http://localhost:5080/filmer/${payload[i].attributes.movie.data.id}`
        );
        screeningMovie.innerText =
          payload[i].attributes.movie.data.attributes.title + ' ';
        screeningDOMListItem.append(screeningMovie);
        //Create Screening Room
        const screeningRoom = document.createElement('span');
        screeningRoom.className = 'screeningRoom';
        screeningRoom.innerText = '(' + payload[i].attributes.room + ')';
        screeningDOMListItem.append(screeningRoom);
        screeningsDOMList.append(screeningDOMListItem);
      }
    }
  });
}
