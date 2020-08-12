import { Client } from '../src';
import { config } from 'dotenv';

config();
const client = new Client(process.env.APP_SIGNED_REQUEST!);

client
    .on('login', () => {
        console.log('Logged in!');
        client
            .subscribe('Crypt')
            .then(console.log)
            .catch(console.error);
        client
            .vote(153371, 1)
            .then(console.log)
            .catch(console.error);
        client
            .fetchSelf()
            .then(console.log)
            .catch(console.error);
    })
    .on('notification', console.log);