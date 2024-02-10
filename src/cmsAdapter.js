import fetch from 'node-fetch';
const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

const cmsAdapter = {
  async loadAllScreenings() {
    const res = await fetch(API_BASE + '/screenings'); // Do initial fetch to find out total number of screenings
    const payload = await res.json();
    const totalAmountOfScreenings = payload.meta.pagination.total;
    const res2 = await fetch(
      // Second fetch that includes all screenings
      API_BASE +
        `/screenings?populate=movie&pagination[pageSize]=${totalAmountOfScreenings}`
    );
    const payload2 = await res2.json();
    return payload2.data;
  },
  async loadSpecificScreenings(id) {
    const res = await fetch(
      API_BASE + '/screenings?populate=movie&filters[movie]=' + id
    );
    const payload = await res.json();
    return payload;
  },
};

export default cmsAdapter;
