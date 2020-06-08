import PartialTrack from './PartialTrack';
import { FRHD } from '..';
export default class Profile {
    username: string;
    subscribers: number;
    description: string | null;
    avatar: string;
    points: number;
    completed: number;
    rated: number;
    comments: number;
    created: number;
    headGear: number;
    mobile: {
        level: number | null;
        raceWins: number | null;
        headGear: number | null;
    };
    tracks: PartialTrack[];
    history: PartialTrack[];
    friends: {
        username: string;
        avatar: string;
        fetch: () => Promise<Profile | undefined>;
    }[];
    constructor(api: FRHD, data: string);
}
