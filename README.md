<div align="center"><p><a href="https://nodei.co/npm/frhd-api/"><img src="https://nodei.co/npm/frhd-api.png?downloads=true&stars=true"></a></p><p><a href="https://www.npmjs.com/package/frhd-api"><img src="https://img.shields.io/npm/v/frhd-api.svg?maxAge=3600" alt="Version"></a><a href="https://www.npmjs.com/package/frhd-api"><img src="https://img.shields.io/npm/dt/frhd-api.svg?maxAge=3600" alt="Downloads"></a></p></div>

# Installation
`npm i frhd-api`
**At least Node.js v14 is required**

# About
`frhd-api` is an easy-to-use module which allows you to request data from FRHD with an object oriented style, written in TypeScript.
The library caches every fetched structure, so more structures can be present instead of partial data, but this can be disabled.

# Documentation

For now, [typings](https://github.com/1s3k3b/frhd-api/tree/master/typings)

# Examples

Getting profile info:
```js
const { FRHD } = require('frhd-api');
const api = new FRHD();

api.fetchProfile('Crypt').then(console.log);
```
Output:
```js
Profile {
  username: 'Crypt',
  subscribers: 479,
  avatar: 'https://secure.gravatar.com/avatar/3491bde29efd5fed12c02724210cb508/?s=100&d=mm&r=pg',
  points: 826,
  completed: 104,
  rated: 93,
  comments: 121,
  created: 2,
  headGear: 1,
  mobile: { level: null, raceWins: null, headGear: null },
  tracks: [
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/f/64/336274/250x150-v12.png',
      url: 'https://www.freeriderhd.com/t/336274-untitled',
      time: '0:04.93',
      auto: false,
      holdup: false,
      name: 'Untitled',
      authorUsername: 'Crypt'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/0/de/153371/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/153371-shadowland',
      time: '0:21.73',
      auto: false,
      holdup: false,
      name: 'Shadowland',
      authorUsername: 'Crypt'
    }
  ],
  history: [
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/2/8c/713551/250x150-v12.png',
      url: 'https://www.freeriderhd.com/t/713551-inca',
      time: '0:35.17',
      auto: false,
      holdup: false,
      name: 'Inca',
      authorUsername: 'Cynic'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/b/8c/1001/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/1001-wild-west',
      time: '0:25.73',
      auto: false,
      holdup: false,
      name: 'Wild West',
      authorUsername: 'weewam'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/f/ed/1004/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/1004-mountain-ride',
      time: '0:17.47',
      auto: false,
      holdup: false,
      name: 'Mountain Ride',
      authorUsername: 'Graggen'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/3/1b/1009/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/1009-chillwind-woods',
      time: '0:16.50',
      auto: false,
      holdup: false,
      name: 'Chillwind Woods',
      authorUsername: 'lolz666'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/1/e4/1010/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/1010-contest-entry',
      time: '0:26.93',
      auto: false,
      holdup: false,
      name: 'Contest Entry',
      authorUsername: 'Graggen'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/7/f9/1011/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/1011-blorks-mountain',
      time: '0:29.23',
      auto: false,
      holdup: false,
      name: 'Blorks Mountain',
      authorUsername: 'esklate'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/f/33/1012/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/1012-asteroid-escape',
      time: '0:18.93',
      auto: false,
      holdup: false,
      name: 'Asteroid Escape',
      authorUsername: 'RHINOandBIGBLU3'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/7/66/1014/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/1014-star-wars',
      time: '0:24.77',
      auto: false,
      holdup: false,
      name: 'Star Wars',
      authorUsername: 'Stig'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/0/21/1024/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/1024-the-secret-valley',
      time: '0:28.93',
      auto: false,
      holdup: false,
      name: 'The Secret Valley',
      authorUsername: 'lolz666'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/b/db/1034/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/1034-2012',
      time: '0:47.60',
      auto: false,
      holdup: false,
      name: '2012',
      authorUsername: 'iTzChuckNorris'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/6/d7/1038/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/1038-preview',
      time: '0:20.97',
      auto: false,
      holdup: false,
      name: 'Preview',
      authorUsername: 'lolz666'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/a/0e/1045/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/1045-mountain-level',
      time: '0:55.00',
      auto: false,
      holdup: false,
      name: 'Mountain Level',
      authorUsername: 'RHINO'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/4/ca/1056/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/1056-twisting-nether-2',
      time: '0:21.53',
      auto: false,
      holdup: false,
      name: 'Twisting Nether 2',
      authorUsername: 'iTzChuckNorris'
    },
    PartialTrack {
      preview: 'https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/7/08/1074/250x150-v5.png',
      url: 'https://www.freeriderhd.com/t/1074-contest-entry',
      time: '1:56.00',
      auto: false,
      holdup: false,
      name: 'CONTEST ENTRY',
      authorUsername: 'leboulanger'
    }
  ],
  friends: []
}
```

Getting a track via the JSON API:
```js
const { FRHD } = require('frhd-api');
const api = new FRHD();

api.fetchTrack('153371').then(console.log);
```

Output:
```js
Track {
  id: 153371,
  title: 'Shadowland',
  description: "Detail by me, wheelie by swaggabot. Just can't finish it.",
  authorUsername: 'Crypt',
  author: null,
  url: 'https://www.freeriderhd.com/t/153371-shadowland',
  defaultVehicle: 'BMX',
  vehicles: [ 'MTB', 'BMX' ],
  size: 4992675,
  featured: false,
  authorIsUser: true,
  powerups: { star: 1, checkpoint: 1, boost: 0, gravity: 0, slowmo: 0, bomb: 0 }
}
```

Scraping a track:
```js
const FRHD = require('frhd-api');
const api = new FRHD();

api.scrapeTrack('153371-shadowland').then(console.log);
```

Output:
```js
ScrapedTrack {
  authorUsername: 'Crypt',
  author: {
    username: 'Crypt',
    subscribers: 479,
    avatar: 'https://secure.gravatar.com/avatar/3491bde29efd5fed12c02724210cb508/?s=50&d=mm&r=pg',
    fetch: [Function: fetch]
  },
  title: 'Shadowland',
  rating: 83,
  votes: '1.7k',
  likes: '1.4k',
  dislikes: '298',
  description: "Detail by me, wheelie by swaggabot. Just can't finish it.",
  playersCompleted: 317,
  averageTime: '0:48.23',
  completionRate: 0.01,
  size: '4993K',
  comments: [
    Comment {
      authorUsername: 'ShadowArk',
      timestamp: '2 months ago',
      content: 'mR..A',
      author: [Object]
    },
    Comment {
      authorUsername: 'Radiology',
      timestamp: '3 months ago',
      author: [Object]
    },
    Comment {
      authorUsername: 'murphy_PRO',
      timestamp: '4 months ago',
      author: [Object]
    },
    Comment {
      authorUsername: 'nemisys',
      timestamp: '6 months ago',
      content: 'Swaggabot',
      author: [Object]
    }
  ]
}
```

For more examples, see the [test folder](https://github.com/1s3k3b/frhd-api/tree/master/test)