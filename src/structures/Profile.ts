import $ from 'cheerio';
import PartialTrack from './PartialTrack';
import { FRHD } from '..';

export default class Profile {
    public username: string;
    public subscribers: number;
    public description: string | null;
    public avatar: string;
    public points: number;
    public completed: number;
    public rated: number;
    public comments: number;
    public created: number;
    public headGear: number;
    public mobile: {
        level: number | null;
        raceWins: number | null;
        headGear: number | null;
    };
    public tracks: PartialTrack[];
    public history: PartialTrack[];
    public friends: {
        username: string;
        avatar: string;
        fetch: () => Promise<Profile | undefined>;
    }[];
    constructor(api: FRHD, data: string) {
        const scrape = (x: string) => $(x, data);
        const parseTrack = (d: CheerioElement) => new PartialTrack(api, d);
        const stats = Array.from(scrape('.stat > .val'), d => d.children[0]);

        this.username = scrape('.profile-username > h3')[0].children[0].data!;
        this.subscribers = parseInt(scrape('#subscribe_to_author_count')[0]?.children[0].data || '0');
        this.description = scrape('.profile-blurb')[0]?.children[0].data || null;
        this.avatar = scrape('.profile-image > img')[0].attribs.src;
        this.points = parseInt(stats[0].data!);
        this.completed = parseInt(stats[1].data!);
        this.rated = parseInt(stats[2].data!);
        this.comments = parseInt(stats[3].data!);
        this.created = parseInt(stats[4].data!);
        this.headGear = parseInt(stats[5].data!.split('/')[0]);
        this.mobile = {
            level: parseInt(stats[6].data!) || null,
            raceWins: parseInt(stats[7].data!) || null,
            headGear: parseInt(stats[8].data!.split('/')[0]) || null,
        };
        this.tracks = scrape('#created_tracks > .left-menu-only-full-listing > .track-list')[0]
            .children.filter(d => d.name === 'li')
            .filter(d => d.children[1])
            .map(d => parseTrack(d));
        this.history = scrape('#profile_recently_played > .left-menu-only-full-listing > .track-list')[0]
            .children.filter(d => d.name === 'li')
            .map(d => parseTrack(d));
        this.friends = Array
            .from(scrape('.friend-list > li'), d => ({
                username: d.children[3]?.children[1].children[0].data!,
                avatar: d.children[1]?.children[1].attribs.src!,
                fetch: () => api.fetchProfile(d.children[3].children[1].children[0].data!),
            }))
            .filter(d => d.username);
    }
};