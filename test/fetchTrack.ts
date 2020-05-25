import FRHD from '../src/';
const api = new FRHD();

api.fetchTrack('153371').then(console.log);