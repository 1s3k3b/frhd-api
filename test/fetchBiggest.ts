import { FRHD } from '../src/';
const api = new FRHD();

api.fetchBiggest().then(console.log);