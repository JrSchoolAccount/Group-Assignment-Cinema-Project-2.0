export async function getSpecificScreenings(cmsAdapter, movieId) {
  const screenings = await cmsAdapter.loadSpecificScreenings(movieId);
  const currentTime = new Date().getTime();
  const specificScreenings = screenings.data.filter((screening) => {
    return new Date(screening.attributes.start_time).getTime() >= currentTime;
  });
  return { data: specificScreenings };
}
