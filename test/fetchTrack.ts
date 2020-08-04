import { FRHD } from '../src/';
const api = new FRHD();

api.fetchTrack('153371').then(async x => console.log(x, await x.fetchLeaderboard()));