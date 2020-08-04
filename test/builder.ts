import { Builder } from '../src';

const builder = new Builder()
    .rect(0, 0, 0, 200, 200)
    .addPhysicsLine(10, 20, 100, 200)
    .addPowerup({ type: 2, powerupType: 'star', powerupTypeRaw: 'T', x: 100, y: 100 });
console.log(builder.toCode());
console.log(builder.parse());