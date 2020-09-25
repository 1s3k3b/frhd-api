import { FRHD } from '../src/';
const api = new FRHD();

api.fetchTrack('52143').then(async x => console.log(x, await x.fetchLeaderboard()));
api.fetchTrack('52143', { raw: true }).then(console.log);
api.fetchTrack('52143').then(console.log);
api.fetchTrack('52143', { raw: true }).then(console.log);