import { FRHD } from '../src/';
const api = new FRHD();

api.fetchProfile('isekeb').then(console.log);
api.fetchProfile('Mra').then(console.log);