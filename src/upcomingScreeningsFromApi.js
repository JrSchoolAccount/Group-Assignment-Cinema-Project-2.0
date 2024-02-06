export async function getUpcomingMovieScreenings(cmsAdapter, movieId) {
  const screenings = await cmsAdapter.loadUpcomingScreenings(movieId);
  const currentTime = new Date().getTime();
  const upcomingScreenings = screenings.data.filter((screening) => {
    return new Date(screening.attributes.start_time).getTime() >= currentTime;
  });
  return { data: upcomingScreenings };
}
