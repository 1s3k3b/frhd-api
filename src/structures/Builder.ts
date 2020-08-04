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
    public rect(type: 0 | 1, x: number, y: number, width: number, height: number) {
        const arr = (<Element<typeof type>[]>this[type ? 'scenery' : 'physics']);
        arr.push({ type, x, y, x2: x + width, y2: y });
        arr.push({ type, x, y: y + height, x2: x + width, y2: y + height });
        arr.push({ type, x: x + width, y, x2: x + width, y2: y + height });
        arr.push({ type, x, y, x2: x, y2: y + height });
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