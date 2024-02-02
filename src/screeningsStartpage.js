// Show 10 screenings on start page

export async function getUpcomingScreenings(cmsAdapter) {
  const screenings = await cmsAdapter.loadAllScreenings();
  const startPageScreenings = [];
  const today = new Date();

  //   const mockScreenings = [
  //     {
  //       id: 201,
  //       attributes: {
  //         start_time: '2024-02-06T19:00:00.000Z',
  //         room: 'Stora salongen',
  //         createdAt: '2023-05-25T13:09:53.589Z',
  //         updatedAt: '2023-05-25T13:09:53.589Z',
  //         movie: {
  //           data: {
  //             id: 4,
  //             attributes: {
  //               title: 'Min granne Totoro',
  //               imdbId: 'tt0096283',
  //               intro:
  //                 'When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.',
  //               image: {
  //                 url: 'https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
  //               },
  //               createdAt: '2023-01-23T09:15:23.153Z',
  //               updatedAt: '2023-01-27T07:12:08.242Z',
  //               publishedAt: '2023-01-23T09:15:43.382Z',
  //             },
  //           },
  //         },
  //       },
  //     },
  //   ];

  screenings.map((screening) => {
    const screening_date = new Date(screening.attributes.start_time);
    function isValidForStarpage(today, date) {
      const differenceInHours = (date - today) / 3600000;
      if (differenceInHours > 0 && differenceInHours < 120)
        startPageScreenings.push(screening);
    }
    isValidForStarpage(today, screening_date);
  });
  console.log(startPageScreenings);
  return startPageScreenings;
}
