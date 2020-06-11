import { FRHD } from '../src/';
const api = new FRHD();

api.fetchShuffled().then(console.log);