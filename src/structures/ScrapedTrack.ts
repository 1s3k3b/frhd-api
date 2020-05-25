import $ from 'cheerio';
import FRHD from '..';
import Profile from './Profile';
import Comment from './Comment';

export default class ScrapedTrack {
    private _api!: FRHD;
    public authorUsername: string;
    public author: Profile | {
        username: string;
        subscribers: number;
        avatar: string;
        fetch: () => Promise<Profile>;
    };
    public title: string;
    public rating: number;
    public votes: string;
    public likes: string;
    public dislikes: string;
    public description: string;
    public playersCompleted: number;
    public averageTime: string;
    public completionRate: number;
    public size: string;
    public comments: Comment[];
    constructor(api: FRHD, data: string, author?: Profile) {
        Object.defineProperty(this, '_api', { value: api });
        const scrape = (x: string) => $(x, data);
        const stats = scrape('.stat-container > .num');
        if (author) {
            this.author = author;
            this.authorUsername = author.username;
        } else {
            this.authorUsername = scrape('.panel-padding > a')[1].children[0].data!;
            this.author = api.profiles?.get(this.authorUsername)! || {
                username: this.authorUsername,
                subscribers: parseInt(scrape('#subscribe_to_author_count')[0].children[0].data!),
                avatar: scrape('.track-about-author-img > img')[0].attribs.src,
                fetch: () => this.fetchAuthor(),
            };
        }

        this.title = scrape('.panel-padding > h1')[0].children[0].data!;
        this.rating = parseInt(scrape('#track-vote-percent')[0].children[0].data!);
        this.votes = scrape('#track-votes')[0].children[0].data!;
        this.likes = scrape('#up-votes')[0].children[0].data!;
        this.dislikes = scrape('#dwn-votes')[0].children[0].data!;
        this.description = scrape('.description')[0].children[0].data!;
        this.playersCompleted = parseInt(stats[0].children[0].data!);
        this.averageTime = stats[1].children[0].data!.trim();
        this.completionRate = parseFloat(stats[2].children[0].data!);
        this.size = stats[3].children[0].data!;
        this.comments = Array.from(scrape('.track-comments-list > .track-comment > .track-comment-wrapper'), d => new Comment(api, d.children));
    }
    async fetchAuthor() {
        this.author = (await this._api.fetchProfile(this.authorUsername)) as Profile;
        return this.author;
    }
};