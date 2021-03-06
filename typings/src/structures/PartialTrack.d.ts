/// <reference types="cheerio" />
import FRHD from '../client/FRHD';
import Profile from './Profile';
export default class PartialTrack {
    private _api;
    preview: string;
    url: string;
    time: string | null;
    auto: boolean;
    holdup: boolean;
    name: string;
    authorUsername: string;
    author?: Profile;
    constructor(api: FRHD, d: CheerioElement);
    scrape(): Promise<import("./ScrapedTrack").default | undefined>;
    fetch(raw?: boolean): Promise<import("./Track").default>;
    fetchAuthor(): Promise<Profile | undefined>;
}
