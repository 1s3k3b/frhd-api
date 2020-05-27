import { FRHD } from '../src/';
const api = new FRHD();

api.fetchLeaderboard().then(console.log);