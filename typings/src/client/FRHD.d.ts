import Profile from '../structures/Profile';
import Track from '../structures/Track';
import ScrapedTrack from '../structures/ScrapedTrack';
import TrackPreview from '../structures/TrackPreview';
import LeaderboardEntry from '../structures/LeaderboardEntry';
export default class FRHD {
    profiles?: Map<string, Profile>;
    scrapedTracks?: Map<string, ScrapedTrack>;
    tracks?: Map<string, Track>;
    rawTracks?: Map<string, Record<string, any>>;
    trending?: TrackPreview[][];
    featured?: TrackPreview[][];
    leaderboard?: Map<'player' | 'author', LeaderboardEntry[][]>;
    searches?: Map<string, TrackPreview[]>;
    hot?: TrackPreview[];
    new?: TrackPreview[][];
    biggest?: TrackPreview[][];
    highestRated?: TrackPreview[][];
    shuffled?: TrackPreview[][];
    constructor(cache?: boolean);
    fetchProfile(username: string): Promise<Profile | undefined>;
    scrapeTrack(name: string, author?: Profile): Promise<ScrapedTrack | undefined>;
    fetchTrack(id: string, { raw, author }?: {
        raw: boolean;
        author?: Profile;
    }): Promise<typeof raw extends true ? Record<string, any> : Track>;
    fetchTrending(page?: number): Promise<TrackPreview[]>;
    fetchFeatured(page?: number): Promise<TrackPreview[]>;
    fetchHot(): Promise<TrackPreview[]>;
    fetchNew(page?: number): Promise<TrackPreview[]>;
    fetchBiggest(page?: number): Promise<TrackPreview[]>;
    fetchHighestRated(page?: number): Promise<TrackPreview[]>;
    fetchShuffled(page?: number): Promise<TrackPreview[]>;
    fetchLeaderboard(orderBy?: 'player' | 'author', page?: number): Promise<LeaderboardEntry[]>;
    search(query: string): Promise<TrackPreview[] | undefined>;
}
