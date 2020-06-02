import { FRHD } from '../src/';
const api = new FRHD();

api.fetchHot().then(console.log);
