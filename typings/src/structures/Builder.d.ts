import Parser, { Element } from './Parser';
export * from './Parser';
export default class Builder {
    protected readonly parser: Parser;
    physics: Element<0>[];
    scenery: Element<1>[];
    powerups: Element<2>[];
    constructor(code?: string);
    parse(): import("./Parser").Parsed;
    toCode(): string;
    addPhysicsLine(x: number, y: number, x2: number, y2: number): this;
    addSceneryLine(x: number, y: number, x2: number, y2: number): this;
    rect(type: 0 | 1, x: number, y: number, width: number, height: number): this;
    addPhysicsCurve(...coords: number[][]): this;
    addSceneryCurve(...coords: number[][]): this;
    addPowerup(obj: Element<2>): this;
}
