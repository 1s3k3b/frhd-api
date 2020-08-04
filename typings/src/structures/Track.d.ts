import { FRHD } from '..';
import Profile from './Profile';
export default class Track {
    private _api;
    id: number;
    title: string;
    description: string;
    authorUsername: string;
    author: Profile | null;
    url: string;
    defaultVehicle: string;
    vehicles: ('MTB' | 'BMX')[];
    size: number;
    featured: boolean;
    authorIsUser: boolean;
    powerups: {
        [key in 'star' | 'checkpoint' | 'boost' | 'gravity' | 'slowmo' | 'bomb' | 'heli']: number;
    };
    constructor(api: FRHD, data: {
        [key: string]: any;
    }, author?: Profile);
    fetchAuthor(): Promise<Profile | null>;
    fetchLeaderboard(): Promise<any>;
}
