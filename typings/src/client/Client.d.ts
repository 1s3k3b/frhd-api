/// <reference types="node" />
import { EventEmitter } from 'events';
export default class Client extends EventEmitter {
    private readonly token;
    constructor(token: string, notificationInterval?: number);
    encodeHeader(str: string): string;
    request(path: string, body?: string, method?: string): Promise<any>;
    subscribe(username: string): Promise<any>;
    comment(track: number, data: string): Promise<any>;
    vote(track: number, type: -1 | 0 | 1): Promise<any>;
    addFriend(username: string): Promise<any>;
    acceptFriend(username: string): Promise<any>;
    buyHat(): Promise<any>;
    updateForum(password: string): Promise<any>;
    changePassword(oldPass: string, newPass: string): Promise<any>;
    changeAbout(str: string): Promise<any>;
    changeName(str: string): Promise<any>;
    fetchSelf(): Promise<{
        user: any;
        user_stats: any;
    }>;
}
