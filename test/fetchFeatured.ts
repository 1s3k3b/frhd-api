import FRHD from '../src/';
const api = new FRHD();

api.fetchFeatured().then(console.log);