import fetch from 'node-fetch';
import $ from 'cheerio';

import Profile from './structures/Profile';
import Track from './structures/Track';
import ScrapedTrack from './structures/ScrapedTrack';
import TrackPreview from './structures/TrackPreview';
import LeaderboardEntry from './structures/LeaderboardEntry';
import { FRHDAPIError, ArgumentError } from './errors';

export class FRHD {
    public profiles?: Map<string, Profile>;
    public scrapedTracks?: Map<string, ScrapedTrack>;
    public tracks?: Map<string, Track>;
    public trending?: TrackPreview[][];
    public featured?: TrackPreview[][];
    public leaderboard?: Map<'player' | 'author', LeaderboardEntry[][]>;
    public searches?: Map<string, TrackPreview[]>;
    public hot?: TrackPreview[];
    public new?: TrackPreview[][];
    public biggest?: TrackPreview[][];
    public highestRated?: TrackPreview[][];
    public shuffled?: TrackPreview[][];
    constructor(cache = true) {
        if (cache) {
            this.profiles = new Map();
            this.scrapedTracks = new Map();
            this.tracks = new Map();
            this.trending = [];
            this.featured = [];
            this.leaderboard = new Map([['player', []], ['author', []]]);
            this.searches = new Map();
            this.new = [];
            this.biggest = [];
            this.highestRated = [];
            this.shuffled = [];
        }
    }
    public async fetchProfile(username: string) {
        if (typeof username !== 'string') throw new ArgumentError('INVALID_ARG', 'username', 'string', username);
        if (/^https:\/\/freeriderhd\.com\/u\//.test(username)) username = username.slice('https://freeriderhd.com/u/'.length);
        if (this.profiles?.has(username)) return this.profiles.get(username);

        const r = await fetch('https://www.freeriderhd.com/u/' + username, {});
        if (!r.ok) throw new FRHDAPIError('NOT_FOUND', 'Profile', username);
        const d = new Profile(this, await r.text());
        this.profiles?.set(d.username, d);
        return d;
    }
    public async scrapeTrack(name: string, author?: Profile) {
        if (typeof name !== 'string') throw new ArgumentError('INVALID_ARG', 'name', 'string', name);
        if (Array.from(arguments).length > 1 && !(author instanceof Profile)) throw new ArgumentError('INVALID_ARG', 'author', 'Profile', author as unknown as string);
        if (/^https:\/\/www\.freeriderhd\.com\/t\//.test(name)) name = name.slice('https://www.freeriderhd.com/t/'.length);
        if (this.scrapedTracks?.has(name.toLowerCase())) return this.scrapedTracks.get(name.toLowerCase());

        const r = await fetch('https://www.freeriderhd.com/t/' + name, {});
        if (!r.ok) throw new FRHDAPIError('NOT_FOUND', 'Track', name);
        const d = new ScrapedTrack(this, await r.text(), name, author);
        this.scrapedTracks?.set(name.toLowerCase(), d);
        return d;
    }
    public async fetchTrack(id: string, { raw = false, author }: { raw: boolean, author?: Profile } = { raw: false }): Promise<typeof raw extends true ? any : Track> {
        if (typeof id !== 'string') throw new ArgumentError('INVALID_ARG', 'id', 'string', id);
        id = (id.match(/\d+/) || [])[0];
        if (this.tracks?.has(id)) return this.tracks.get(id)!;

        const r = await fetch(`http://cdn.freeriderhd.com/free_rider_hd/tracks/prd/${id}/track-data-v1.js`, {});
        if (!r.ok) throw new FRHDAPIError('NOT_FOUND', 'Track', id);
        const parsed = JSON.parse((await r.text()).slice(2, -2));
        const d = new Track(this, parsed, author);
        this.tracks?.set(id, d);
        return raw ? parsed : d;
    }
    public async fetchTrending(page = 1) {
        if (typeof page !== 'number') throw new ArgumentError('INVALID_ARG', 'page', 'number', page);
        if (this.trending?.[page]) return this.trending[page];

        const r = await fetch(`https://www.freeriderhd.com/trending/${page}`, {});
        if (!r.ok) throw new FRHDAPIError('WENT_WRONG');
        const data = Array.from($('.track-list > li > div', await r.text()), d => new TrackPreview(this, d)).filter(x => x.preview);
        if (this.trending) this.trending[page] = data;
        return data;
    }
    public async fetchFeatured(page = 1) {
        if (typeof page !== 'number') throw new ArgumentError('INVALID_ARG', 'page', 'number', page);
        if (this.featured?.[page]) return this.featured[page];

        const r = await fetch(`https://www.freeriderhd.com/featured/${page}`, {});
        if (!r.ok) throw new FRHDAPIError('WENT_WRONG');
        const data = Array.from($('.track-list > li > div', await r.text()), d => new TrackPreview(this, d)).filter(x => x.preview);
        if (this.featured) this.featured[page] = data;
        return data;
    }
    public async fetchHot() {
        if (this.hot) return this.hot;

        const r = await fetch('https://www.freeriderhd.com/hot');
        if (!r.ok) throw new FRHDAPIError('WENT_WRONG');
        const data = Array.from($('.track-list > li > div', await r.text()), d => new TrackPreview(this, d)).filter(x => x.preview);
        this.hot = data;
        return data;
    }
    public async fetchNew(page = 1) {
        if (typeof page !== 'number') throw new ArgumentError('INVALID_ARG', 'page', 'number', page);
        if (this.new?.[page]) return this.new[page];

        const r = await fetch(`https://www.freeriderhd.com/recently-added/${page}`, {});
        if (!r.ok) throw new FRHDAPIError('WENT_WRONG');
        const data = Array.from($('.track-list > li > div', await r.text()), d => new TrackPreview(this, d)).filter(x => x.preview);
        if (this.new) this.new[page] = data;
        return data;
    }
    public async fetchBiggest(page = 1) {
        if (typeof page !== 'number') throw new ArgumentError('INVALID_ARG', 'page', 'number', page);
        if (this.biggest?.[page]) return this.biggest[page];

        const r = await fetch(`https://www.freeriderhd.com/biggest/${page}`, {});
        if (!r.ok) throw new FRHDAPIError('WENT_WRONG');
        const data = Array.from($('.track-list > li > div', await r.text()), d => new TrackPreview(this, d)).filter(x => x.preview);
        if (this.biggest) this.biggest[page] = data;
        return data;
    }
    public async fetchHighestRated(page = 1) {
        if (typeof page !== 'number') throw new ArgumentError('INVALID_ARG', 'page', 'number', page);
        if (this.highestRated?.[page]) return this.highestRated[page];

        const r = await fetch(`https://www.freeriderhd.com/highest-rated/${page}`, {});
        if (!r.ok) throw new FRHDAPIError('WENT_WRONG');
        const data = Array.from($('.track-list > li > div', await r.text()), d => new TrackPreview(this, d)).filter(x => x.preview);
        if (this.highestRated) this.highestRated[page] = data;
        return data;
    }
    public async fetchShuffled(page = 1) {
        if (typeof page !== 'number') throw new ArgumentError('INVALID_ARG', 'page', 'number', page);

        const r = await fetch(`https://www.freeriderhd.com/shuffled/${page}`, {});
        if (!r.ok) throw new FRHDAPIError('WENT_WRONG');
        const data = Array.from($('.track-list > li > div', await r.text()), d => new TrackPreview(this, d)).filter(x => x.preview);
        this.shuffled?.push(data);
        return data;
    }
    public async fetchLeaderboard(orderBy: 'player' | 'author' = 'player', page = 1) {
        if (!['player', 'author'].includes(orderBy)) throw new ArgumentError('INVALID_ARG', 'orderBy', '\'player\' | \'author\'', orderBy);
        if (typeof page !== 'number') throw new ArgumentError('INVALID_ARG', 'page', 'number', page);
        if (this.leaderboard?.get(orderBy)![page]) return this.leaderboard!.get(orderBy)![page];

        const r = await fetch(`https://www.freeriderhd.com/leaderboards/${orderBy}/lifetime/${page}`, {});
        if (!r.ok) throw new FRHDAPIError('WENT_WRONG');
        const data = Array.from($('.leaderboard-list > .leaderboard-item', await r.text()), d => new LeaderboardEntry(this, d));
        this.leaderboard?.set(orderBy, ((a: LeaderboardEntry[][]) => {
            a[page] = data;
            return a;
        })(this.leaderboard.get(orderBy)!));
        return data;
    }
    public async search(query: string) {
        if (typeof query !== 'string') throw new ArgumentError('INVALID_ARG', 'query', 'string', query);
        if (this.searches?.has(query)) return this.searches.get(query);

        const r = await fetch(`https://www.freeriderhd.com/search/t/${query}`, {});
        if (!r.ok) throw new FRHDAPIError('WENT_WRONG');
        const data = Array.from($('.track-list > li > div', await r.text()), d => new TrackPreview(this, d));
        this.searches?.set(query, data);
        return data;
    }
};

export { default as Comment } from './structures/Comment';
export { default as PartialTrack } from './structures/PartialTrack';
export { Parsed, default as Parser } from './structures/Parser';
export { default as Builder } from './structures/Builder';
export { LeaderboardEntry, Profile, ScrapedTrack, Track, TrackPreview };