/// <reference types="cheerio" />
import FRHD from '..';
import Profile from './Profile';
export default class TrackPreview {
    private _api;
    time?: string | null;
    auto?: boolean;
    holdup?: boolean;
    name?: string;
    authorUsername?: string;
    author?: Profile;
    url: string;
    preview: string;
    constructor(api: FRHD, d: CheerioElement);
    scrape(): Promise<import("./ScrapedTrack").default | undefined>;
    fetch(raw?: boolean): Promise<any>;
    fetchAuthor(): Promise<Profile | undefined>;
}
