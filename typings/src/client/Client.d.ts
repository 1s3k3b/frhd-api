/// <reference types="node" />
import { EventEmitter } from 'events';
export default class Client extends EventEmitter {
    token: string;
    constructor(token: string, notificationInterval?: number);
    request(path: string, body?: string, method?: string): Promise<any>;
    subscribe(username: string): Promise<any>;
    comment(track: number, data: string): Promise<any>;
    vote(track: number, type: -1 | 0 | 1): Promise<any>;
    addFriend(username: string): Promise<any>;
    acceptFriend(username: string): Promise<any>;
    fetchSelf(): Promise<{
        user: any;
        user_stats: any;
    }>;
}
