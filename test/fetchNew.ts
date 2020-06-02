import { FRHD } from '../src/';
const api = new FRHD();

api.fetchNew().then(console.log);