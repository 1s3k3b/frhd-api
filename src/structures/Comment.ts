import FRHD from '..';
import Profile from './Profile';

export default class Comment {
    private _api!: FRHD;
    public authorUsername: string;
    public timestamp: string;
    public content?: string;
    public author: Profile | {
        username: string;
        avatar: string;
        fetch: () => Promise<Profile>;
    };
    constructor(api: FRHD, data: CheerioElement[]) {
        Object.defineProperty(this, '_api', { value: api });
        const content = data[7].children;

        this.authorUsername = content[1].children[0].data!;
        this.timestamp = data[1].children[0].data!;
        if (content[3].children[0].children) this.content = content[3].children[0].children.reduce((a, v) => (a ? a + ' ' : a) + (v.type === 'text' ? v.data : v.children[0].data), '');
        this.author = api.profiles?.get(this.authorUsername) || {
            username: this.authorUsername,
            avatar: data[5].children[1].attribs.src,
            fetch: () => this.fetchAuthor(),
        };
    }
    async fetchAuthor() {
        this.author = (await this._api.fetchProfile(this.authorUsername)) as Profile;
        return this.author;
    }
};