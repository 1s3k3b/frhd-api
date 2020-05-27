import { FRHD } from '..';
import Profile from './Profile';

export default class TrackPreview {
    private _api!: FRHD;
    public time?: string | null;
    public auto?: boolean;
    public holdup?: boolean;
    public name?: string;
    public authorUsername?: string;
    public author?: Profile;
    public url: string;
    public preview: string;
    constructor(api: FRHD, d: CheerioElement) {
        Object.defineProperty(this, 'api', { value: api });
        if (d.children[1].children[5]) {
            const time = d.children[1].children[5].children[0].data!.trim();
            const timeKey = /AUTO/i.test(time) ? 'auto' : /HOLDUP/i.test(time) ? 'holdup' : null;
            this.time = /\d/.test(time) ? time : null;
            this.auto = timeKey === 'auto';
            this.holdup = timeKey === 'holdup';
        }

        if (d.children[3]) {
            this.name = d.children[3].children[1].children[0].data;
            this.authorUsername = d.children[3].children[5].children[0].data;
        }
        this.preview = d.children[1].children[1].attribs.src;
        this.url = d.children[1].attribs.href;
    }
    public scrape() {
        return this._api.scrapeTrack(this.url, this.author);
    }
    public fetch(raw = false) {
        return this._api.fetchTrack(this.url, { author: this.author!, raw });
    }
    public async fetchAuthor() {
        this.author = this.author || await this._api.fetchProfile(this.authorUsername!);
        return this.author;
    }
};