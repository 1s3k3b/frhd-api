import { FRHD, Parser } from '../src/';
const api = new FRHD();

api.fetchProfile('Crypt').then(console.log);
api.fetchTrack('153371').then(console.log);
api.scrapeTrack('153371-shadowland').then(console.log);
api.fetchTrending().then(console.log);
api.fetchFeatured().then(console.log);
api.fetchLeaderboard().then(console.log);
api.search('Shadowland').then(console.log);
api.fetchNew().then(console.log);
api.fetchHot().then(console.log);
api.fetchBiggest().then(console.log);
api.fetchHighestRated().then(console.log);
api.fetchShuffled().then(console.log);
console.log(new Parser().parse('-7l v -7c 15 -6r 1i -6a 1t -5o 28 -56 2i -4k 2r -41 33 -3e 3a -2r 3g -28 3m -1k 3r -10 3v -c 42 8 44 t 45 1i 46 27 46 2s 44 3i 42 48 40 4u 3s 5l 3o 6b 3i 72 3c 7p 35 8h 2t 99 2l a1 2b ap 21 bi 1m ca 1a d3 t dg m,-1b 1k 4c 28#-1u 1u 4b 2l#W 15 36 17 63,T 3q 32,T c8 5'));