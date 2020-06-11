import { FRHD } from '../src/';
const api = new FRHD();

api.fetchHighestRated().then(console.log);