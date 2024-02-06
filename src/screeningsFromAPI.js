export async function getUpcomingScreenings(cmsAdapter) {
  const screenings = await cmsAdapter.loadAllScreenings();
  const startPageScreenings = [];
  const today = new Date();
  screenings.map((screening) => {
    const screening_date = new Date(screening.attributes.start_time);
    const differenceInHours = (screening_date - today) / 3600000; // kan göras med GetDate?
    if (differenceInHours > 0 && differenceInHours < 120)
      startPageScreenings.push(screening);
  });

  return startPageScreenings.slice(0, 10);
}
