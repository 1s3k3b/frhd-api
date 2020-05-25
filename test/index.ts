import FRHD from '../src/';
const api = new FRHD();

api.fetchProfile('Crypt').then(console.log);
api.fetchTrack('153371').then(console.log);
api.scrapeTrack('153371-shadowland').then(console.log);
api.fetchTrending().then(console.log);
api.fetchFeatured().then(console.log);
api.fetchLeaderboard().then(console.log);
api.search('Shadowland').then(console.log);
