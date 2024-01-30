import fetch from 'node-fetch';

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

export async function loadAllReviews() {
  const res = await fetch(API_BASE + '/reviews');
  const payload = await res.json();
  console.log(payload);
}
