import { FRHD } from '..';
import Profile from './Profile';

export default class PartialTrack {
    private _api!: FRHD;
    public preview: string;
    public url: string;
    public time: string | null;
    public auto: boolean;
    public holdup: boolean;
    public name: string;
    public authorUsername: string;
    public author?: Profile;
    constructor(api: FRHD, d: CheerioElement) {
        Object.defineProperty(this, '_api', { value: api });
        const children = d.children[1].children.filter(c => c.type === 'tag');
        const time = children[0].children[5].children[0].data!.trim();
        const timeKey = /AUTO/i.test(time) ? 'auto' : /HOLDUP/i.test(time) ? 'holdup' : null;

        this.preview = children[0].children[1].attribs.src;
        this.url = children[1].children[1].attribs.href;
        this.time = /\d/.test(time) ? time : null;
        this.auto = timeKey === 'auto';
        this.holdup = timeKey === 'holdup';
        this.name = children[1].children[1].children[0].data!;
        this.authorUsername = children[1].children[5].children[0].data!;
    }
    scrape() {
        return this.author ? this._api.scrapeTrack(this.url, this.author) : this._api.scrapeTrack(this.url);
    }
    fetch(raw = false) {
        return this._api.fetchTrack(this.url, { author: this.author, raw });
    }
    async fetchAuthor() {
        this.author = this.author || await this._api.fetchProfile(this.authorUsername);
        return this.author;
    }
};