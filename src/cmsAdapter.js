import fetch from 'node-fetch';
const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

const cmsAdapter = {
  async loadAllScreenings() {
    const res = await fetch(API_BASE + '/screenings?populate=movie');
    const payload = await res.json();
    return payload.data;
  },
};

export default cmsAdapter;
