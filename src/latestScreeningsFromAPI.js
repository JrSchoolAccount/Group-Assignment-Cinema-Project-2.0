export async function getLatestScreenings(cmsAdapter) {
  const screenings = await cmsAdapter.loadAllScreenings();
  const startPageScreenings = [];

  const today = new Date();
  screenings.map((screening) => {
    const screening_date = new Date(screening.attributes.start_time);
    const differenceInHours = (screening_date - today) / 3600000; // kan göras med GetDate?
    if (differenceInHours > 0 && differenceInHours < 120)
      startPageScreenings.push(screening);
  });

  const cleanedStartPageScreenings = startPageScreenings
    .slice(0, 10)
    .map((screening) => ({
      id: screening.attributes.movie.data.id,
      start_time: screening.attributes.start_time,
      room: screening.attributes.room,
      movie: screening.attributes.movie.data.attributes.title,
    }));
  return cleanedStartPageScreenings;
}
