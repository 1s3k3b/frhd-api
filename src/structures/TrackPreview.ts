import FRHD from '../client/FRHD';
import Profile from './Profile';

export default class TrackPreview {
    private _api!: FRHD;
    public time?: string;
    public auto?: boolean;
    public holdup?: boolean;
    public name?: string;
    public authorUsername?: string;
    public author?: Profile;
    public featured: boolean;
    public url: string;
    public preview: string;
    constructor(api: FRHD, d: CheerioElement) {
        Object.defineProperty(this, '_api', { value: api });
        if (d.children[1].children[5]) {
            const timeEls = d.children[1].children.slice(5);
            if (timeEls.some(e => e.tagName === 'span' && /(HOLDUP|AUTO)/.test(e.children?.[0]?.data || ''))) {
                this.time = timeEls[2].children[0].data!.trim();
                this.auto = /AUTO/.test(timeEls[0].children[0].data!);
                this.holdup = /HOLDUP/.test(timeEls[0].children[0].data!);
            } else {
                this.time = timeEls[0].children[0].data!.trim();
                this.featured = timeEls.some(e => e.tagName === 'span' && e.attribs.class?.includes('featured'));
                this.auto = false;
                this.holdup = false;
            }
        }

        if (d.children[3]) {
            this.name = d.children[3].children[1].children[0].data;
            this.authorUsername = d.children[3].children[5].children[0].data;
        }
        this.preview = d.children[1].children[1].attribs.src;
        this.url = d.children[1].attribs.href;
        // @ts-ignore
        this.featured = !!this.featured;
    }
    public scrape() {
        return this.author ? this._api.scrapeTrack(this.url, this.author) : this._api.scrapeTrack(this.url);
    }
    public fetch(raw = false) {
        return this._api.fetchTrack(this.url, { author: this.author!, raw });
    }
    public async fetchAuthor() {
        this.author = this.author || await this._api.fetchProfile(this.authorUsername!);
        return this.author;
    }
};