declare enum Types {
    PHYSICS = 0,
    SCENERY = 1,
    POWERUP = 2,
    VEHICLE_POWERUP = 3
}
declare enum Vehicles {
    HELI = 0,
    TRUCK = 1,
    BALLOON = 2,
    BLOB = 3
}
declare const powerupTypes: {
    T: string;
    C: string;
    B: string;
    G: string;
    S: string;
    O: string;
    A: string;
    W: string;
    V: string;
};
interface Element<T extends Types> {
    type: T;
    x: number;
    y: number;
    x2?: number;
    y2?: number;
    powerupTypeRaw: keyof typeof powerupTypes;
    powerupType: typeof powerupTypes[keyof typeof powerupTypes];
    vehicleTypeRaw?: Vehicles;
    vehicleType?: typeof Vehicles[Vehicles];
    deg?: number;
    duration?: number;
    curve?: boolean;
    coords?: number[][];
}
export declare class Parsed {
    protected parser: Parser;
    code: string;
    physics: Element<0>[];
    scenery: Element<1>[];
    powerups: Element<2>[];
    constructor(parser: Parser, code: string, physics: Element<0>[], scenery: Element<1>[], powerups: Element<2>[]);
    move(x?: number, y?: number): string;
    merge(x: string): string;
    merge(x: Parsed): Parsed;
}
export default class Parser {
    parse(code: string): Parsed;
    toCode({ physics, scenery, powerups }: {
        physics: Element<0>[];
        scenery: Element<1>[];
        powerups: Element<2>[];
    }): string;
    private _encodePos;
    private _decodePos;
}
export {};
