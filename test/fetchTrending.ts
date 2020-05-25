import FRHD from '../src/';
const api = new FRHD();

api.fetchTrending().then(console.log);