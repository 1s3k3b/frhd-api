/// <reference types="cheerio" />
import FRHD from '..';
import Profile from './Profile';
export default class Comment {
    private _api;
    authorUsername: string;
    timestamp: string;
    content?: string;
    author: Profile | {
        username: string;
        avatar: string;
        fetch: () => Promise<Profile>;
    };
    constructor(api: FRHD, data: CheerioElement[]);
    fetchAuthor(): Promise<Profile>;
}
