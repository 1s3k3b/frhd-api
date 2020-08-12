import { EventEmitter } from 'events';
import fetch from 'node-fetch';

const interval = (f: () => any, n: number) => f() + setInterval(f, n);

export default class Client extends EventEmitter {
    constructor(public token: string, notificationInterval = 10000) {
        super();
        let logged = false;
        interval(() => 
            this
                .request('/datapoll/poll_request', 'notifications=true')
                .then(async d => {
                    if (!logged) {
                        logged = true;
                        this.emit('login');
                    }
                    this.emit('datapoll', d);
                    if (d.notification_count) {
                        const data = await this.request('/notifications');
                        const notifs = data.notification_days[0].notifications.slice(0, d.notification_count);
                        this.emit('notificationChunk', notifs);
                        for (const n of notifs) this.emit('notification', n);
                    }
                }),
            notificationInterval,
        );
    }
    public request(path: string, body = '', method = 'POST') {
        return fetch(`https://www.freeriderhd.com${path}`, {
            headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: `${body}&ajax=true&app_signed_request=${this.token}`,
            method,
        }).then(d => d.json());
    }
    public async subscribe(username: string) {
        const u = await this.request(`/u/${username}`);
        return this.request('/track_api/subscribe', `sub_uid=${u.user.u_id}&subscribe=1`);
    }
    public comment(track: number, data: string) {
        const encoded = encodeURIComponent(data).replace(/%20/g, '+');
        return this.request('/track_comments/post', `t_id=${track}&msg=${encoded}`);
    }
    public vote(track: number, type: -1 | 0 | 1) {
        return this.request('/track_api/vote', `t_id=${track}&vote=${type}`);
    }
    public addFriend(username: string) {
        return this.request('/friends/send_friend_request', `u_name=${username}`);
    }
    public async acceptFriend(username: string) {
        const u = await this.request(`/u/${username}`);
        return this.request('/friends/respond_to_friend_request', `u_id=${u.user.u_id}&action=accept`);
    }
    public fetchSelf() {
        return this.request('/').then(d => ({ user: d.user, user_stats: d.user_stats }));
    }
}