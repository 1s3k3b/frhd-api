import { Builder } from '../src';

const builder = new Builder()
    .rect(0, 0, 0, 200, 200)
    .rect(0, 300, 300, 200, 300, 1)
    .rect(0, -300, -300, 300, 200, 0)
    .addPhysicsLine(10, 20, 100, 200)
    .addPowerup({ type: 2, powerupType: 'star', powerupTypeRaw: 'T', x: 100, y: 100 })
    .curve(0, 200, 200, 100, 50, 5, 180)
    .arc(1, 300, -300, 50, 3);
console.log(builder.toCode());
console.log(builder.parse());