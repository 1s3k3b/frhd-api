/// <reference types="cheerio" />
import FRHD from '..';
import Profile from './Profile';
export default class LeaderboardEntry {
    private _api;
    rank: number;
    username: string;
    points: number;
    profile?: Profile | null;
    constructor(api: FRHD, d: CheerioElement);
    fetchProfile(): Promise<Profile | undefined>;
}
