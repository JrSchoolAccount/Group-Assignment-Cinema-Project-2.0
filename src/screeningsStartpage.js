// Show 10 screenings on start page

export async function getUpcomingScreenings(cmsAdapter) {
  const screenings = await cmsAdapter.loadAllScreenings();
  const startPageScreenings = [];
  const today = new Date();
  screenings.map((screening) => {
    const screening_date = new Date(screening.attributes.start_time);
    function isValidForStarpage(today, date) {
      const differenceInHours = (date - today) / 3600000;
      if (differenceInHours > 0 && differenceInHours < 120)
        startPageScreenings.push(screening);
    }
    isValidForStarpage(today, screening_date);
  });
  
  return startPageScreenings.slice(0, 10);
}
