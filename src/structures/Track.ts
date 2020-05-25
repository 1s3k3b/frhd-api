import FRHD from '..';
import Profile from './Profile';

export default class Track {
    private _api!: FRHD;
    public id: string;
    public title: string;
    public description: string;
    public authorUsername: string;
    public author: Profile | null;
    public url: string;
    public defaultVehicle: string;
    public vehicles: ('MTB' | 'BMX')[];
    public size: number;
    public featured: boolean;
    public authorIsUser: boolean;
    public powerups: { [key in 'star' | 'checkpoint' | 'boost' | 'gravity' | 'slowmo' | 'bomb' | 'heli']: number };
    constructor(api: FRHD, data: { [key: string]: any }, author?: Profile) {
        Object.defineProperty(this, 'api', { value: api });
        this.id = data.id;
        this.title = data.title;
        this.description = data.descr;
        this.authorUsername = data.author;
        this.author = author || api.profiles?.get(data.author) || null;
        this.url = 'https://www.freeriderhd.com/t/' + data.url;
        this.defaultVehicle = data.vehicle;
        this.vehicles = data.vehicles;
        this.size = data.size;
        this.featured = !!data.featured;
        this.authorIsUser = data.author_is_user;
        this.powerups = Object.fromEntries(
            Object
                .entries(data.pwrups)
                .map(([k, v]) => [({
                    'gls': 'star',
                    'chkpts': 'checkpoint',
                    'bsts': 'boost',
                    'grvty': 'gravity',
                    'slwmtn': 'slowmo',
                    'bmbs': 'bomb',
                    'heli': 'heli',
                } as { [key in typeof k]: string })[k], v]),
        ) as { [key in 'star' | 'checkpoint' | 'boost' | 'gravity' | 'slowmo' | 'bomb' | 'heli']: number };
    }
    async fetchAuthor() {
        this.author = this.author || await this._api.fetchProfile(this.authorUsername) || null;
        return this.author;
    }
};