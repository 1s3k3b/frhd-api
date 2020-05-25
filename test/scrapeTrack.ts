import FRHD from '../src/';
const api = new FRHD();

api.scrapeTrack('153371-shadowland').then(console.log);