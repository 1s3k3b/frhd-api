/// <reference types="cheerio" />
import FRHD from '../client/FRHD';
import Profile from './Profile';
export default class TrackPreview {
    private _api;
    time?: string;
    auto?: boolean;
    holdup?: boolean;
    name?: string;
    authorUsername?: string;
    author?: Profile;
    featured: boolean;
    url: string;
    preview: string;
    constructor(api: FRHD, d: CheerioElement);
    scrape(): Promise<import("./ScrapedTrack").default | undefined>;
    fetch(raw?: boolean): Promise<import("./Track").default>;
    fetchAuthor(): Promise<Profile | undefined>;
}
