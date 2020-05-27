import { FRHD } from '..';
import Profile from './Profile';

export default class LeaderboardEntry {
    private _api!: FRHD;
    public rank: number;
    public username: string;
    public points: number;
    public profile?: Profile | null;
    constructor(api: FRHD, d: CheerioElement) {
        Object.defineProperty(this, '_api', { value: api });
        this.rank = parseInt(d.children[1].children[0].data!);
        this.username = d.children[5].children[1].children[0].data!;
        this.points = parseInt(d.children[7].children[1].data!);
        this.profile = api.profiles?.get(this.username) || null;
    }
    async fetchProfile() {
        this.profile = this.profile || await this._api.fetchProfile(this.username);
        return this.profile;
    }
};