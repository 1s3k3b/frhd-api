import { FRHD } from '..';
import Profile from './Profile';
import Comment from './Comment';
export default class ScrapedTrack {
    slug: string;
    private _api;
    authorUsername: string;
    author: Profile | {
        username: string;
        subscribers: number;
        avatar: string;
        fetch: () => Promise<Profile>;
    };
    id: number;
    title: string;
    rating: number;
    votes: string;
    likes: string;
    dislikes: string;
    description: string;
    playersCompleted: number;
    averageTime: string;
    completionRate: number;
    size: string;
    comments: Comment[];
    constructor(api: FRHD, data: string, slug: string, author?: Profile);
    fetchAuthor(): Promise<Profile>;
    fetchLeaderboard(): Promise<any>;
}
