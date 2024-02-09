import fetch from 'node-fetch';
const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

const cmsAdapter = {
  // here adapter can include more properties for other loads as well!
  async loadAllScreenings() {
    const res = await fetch(
      API_BASE + '/screenings?populate=movie&pagination[pageSize]=100'
    );
    const payload = await res.json();
    return payload.data;
  },
  async loadSpecificScreenings(id) {
    const res = await fetch(
      API_BASE + '/screenings?populate=movie&filters[movie]=' + id
    );
    const payload = await res.json();
    return payload;
  },
  async loadAllReviews() {
    const response = await fetch(
      'https://plankton-app-xhkom.ondigitalocean.app/api/reviews?populate=movie'
    );
    const payload = await response.json();
    return payload.data;
  },
};

export default cmsAdapter;
