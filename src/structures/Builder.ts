import Parser, { Element } from './Parser';

export * from './Parser';
export default class Builder {
    protected readonly parser = new Parser();
    public physics: Element<0>[] = [];
    public scenery: Element<1>[] = [];
    public powerups: Element<2>[] = [];
    constructor(code?: string) {
        if (code) {
            const parsed = this.parser.parse(code);
            for (const k of <const>['physics', 'scenery', 'powerups']) {
                (<Element<0> | Element<1> | Element<2>[]><unknown>this[k]) = <Element<0> | Element<1> | Element<2>[]><unknown>parsed[k];
            }
        }
    }
    public parse() {
        return this.parser.parse(this.toCode());
    }
    public toCode() {
        return this.parser.toCode(this);
    }
    public addPhysicsLine(x: number, y: number, x2: number, y2: number) {
        this.physics.push({ type: 0, x, y, x2, y2 });
        return this;
    }
    public addSceneryLine(x: number, y: number, x2: number, y2: number) {
        this.scenery.push({ type: 1, x, y, x2, y2 });
        return this;
    }
    public rect(type: 0 | 1, x: number, y: number, width: number, height: number, fill?: 0 | 1) {
        const arr = (<Element<typeof type>[]>this[type ? 'scenery' : 'physics']);
        arr.push({ type, x, y, x2: x + width, y2: y });
        arr.push({ type, x, y: y + height, x2: x + width, y2: y + height });
        arr.push({ type, x: x + width, y, x2: x + width, y2: y + height });
        arr.push({ type, x, y, x2: x, y2: y + height });
        if (typeof fill === 'number') {
            for (let i = 0; i < Math.min(width, height); i++) {
                (<Element<typeof fill>[]>this[fill ? 'scenery' : 'physics']).push(width > height ? { type: fill, x, y: y + i, x2: x + width, y2: y + i } : { type: fill, x: x + i, y, x2: x + i, y2: y + height });
            }
        }
        return this;
    }
    public curve(type: 0 | 1, dX: number, dY: number, w: number, h: number, lineLength: number, deg: number) {
        let lastX = 0;
        let lastY = 0;
        for (let i = 0; i <= deg; i += lineLength) {
            const x = lastX + w * Math.cos(i * Math.PI / 180);
            const y = lastY + h * Math.sin(i * Math.PI / 180);
            (<Element<typeof type>[]>this[type ? 'scenery' : 'physics']).push({ type: <0>0, x: lastX + dX, y: lastY + dY, x2: x + dX, y2: y + dY });
            lastX = x;
            lastY = y;
        }
        return this;
    }
    public arc(type: 0 | 1, dX: number, dY: number, r: number, lineLength: number, fill?: 0 | 1) {
        const arr = (<Element<typeof type>[]>this[type ? 'scenery' : 'physics']);
        const oldLines = [...arr];
        this.curve(type, dX, dY, r, r, lineLength, 360);
        if (typeof fill === 'number') {
            const newLines = arr.filter(x => !oldLines.includes(x));
            for (const a of newLines) for (const b of newLines) (<(Element<0> | Element<1>)[]>this[fill ? 'scenery' : 'physics']).push({ type: fill, x: a.x, y: a.y, x2: b.x, y2: b.y });
        }
        return this;
    }
    public addPhysicsCurve(...coords: number[][]) {
        this.physics.push({ type: 0, coords });
        return this;
    }
    public addSceneryCurve(...coords: number[][]) {
        this.scenery.push({ type: 1, coords });
        return this;
    }
    public addPowerup(obj: Element<2>) {
        this.powerups.push(obj);
        return this;
    }
}