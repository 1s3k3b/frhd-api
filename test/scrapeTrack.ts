import { FRHD } from '../src/';
const api = new FRHD();

api.scrapeTrack('153371-shadowland').then(async x => console.log(x, await x!.fetchLeaderboard()));