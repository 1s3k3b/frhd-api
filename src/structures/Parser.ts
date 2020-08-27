export enum Types {
    PHYSICS,
    SCENERY,
    POWERUP,
    VEHICLE_POWERUP,
}
export enum Vehicles {
    HELI,
    TRUCK,
    BALLOON,
    BLOB,
}
export const powerupTypes = {
    'T': 'star',
    'C': 'checkpoint',
    'B': 'boost',
    'G': 'gravity',
    'S': 'slowmo',
    'O': 'bomb',
    'A': 'anti-gravity',
    'W': 'teleport',
    'V': 'vehicle',
};
export interface Element<T extends Types> {
    type: T;
    x?: number;
    y?: number;
    x2?: number;
    y2?: number;
    powerupTypeRaw?: keyof typeof powerupTypes;
    powerupType?: typeof powerupTypes[keyof typeof powerupTypes];
    vehicleTypeRaw?: Vehicles;
    vehicleType?: typeof Vehicles[Vehicles];
    deg?: number;
    duration?: number;
    curve?: boolean;
    coords?: number[][];
}

const paginate = <T>(a: T[], n: number) => {
    if (a.length <= n) return [a];
    const res = [];
    const maxLen = Math.ceil(a.length / n);
    for (let i = 0; i < maxLen; i++) res[i] = a.slice(i * n, (i + 1) * n);
    return res;
};

export class Parsed {
    constructor(
        protected parser: Parser,
        public code: string,
        public physics: Element<0>[],
        public scenery: Element<1>[],
        public powerups: Element<2>[],
    ) {}
    public move(x: number = 0, y: number = 0) {
        const mapLine = <T extends 0 | 1>(l: Element<T>) => {
            if (l.curve) l.coords = l.coords!.map(([dX, dY]) => [x + dX, y + dY]);
            else {
                l.x! += x;
                l.y! += y;
                l.x2! += x;
                l.y2! += y;
            }
            return l;
        };
        return this.parser.toCode({
            physics: this.physics.map(l => mapLine<0>({ ...l })),
            scenery: this.scenery.map(l => mapLine<1>({ ...l })),
            powerups: this.powerups.map(p => {
                p = { ...p };
                p.x! += x;
                p.y! += y;
                if (p.x2) {
                    p.x2 += x;
                    p.y2! += y;
                }
                return p;
            }),
        });
    }
    public merge(x: string): string;
    public merge(x: Parsed): Parsed;
    public merge(x: Parsed | string): Parsed | string {
        if (x instanceof Parsed) {
            return this.parser.parse(this.parser.toCode({
                physics: [...this.physics, ...x.physics],
                scenery: [...this.scenery, ...x.scenery],
                powerups: [...this.powerups, ...x.powerups],
            }));
        }
        return this.code
            .split('#')
            .map((y, i) => `${y},${(z => z ? `${z.endsWith(',') ? z.slice(0, -1) : z}` : '')(x.split('#')[i])}`)
            .join('#')
            .replace(/,$/g, '')
            .replace(/,#/, '#');
    }
    public curveToStraight(physics = true, scenery = true) {
        const f = <T extends 0 | 1>(l: Element<T>) =>
            l.curve
                ? paginate(l.coords!.flatMap((x, i, a) => i ? [...a[i - 1], ...x] : []), 4)
                    .map(([x, y, x2, y2]) => <Element<T>><unknown>({ x, y, x2, y2 }))
                : l;
        return this.parser.toCode({
            physics: physics ? this.physics.flatMap(f) : this.physics,
            scenery: scenery ? this.scenery.flatMap(f) : this.scenery,
            powerups: this.powerups,
        });
    }
}

export default class Parser {
    public parse(code: string) {
        const split = code.split('#');
        const physics: Element<0>[] = [];
        const scenery: Element<1>[] = [];
        const powerups: Element<2>[] = [];
        for (let i = 0; i < 3; i++) {
            const section = split[i];
            if (i < 2) {
                for (
                    const [ x, y, x2, y2, ...coords ] of section
                        .split(',')
                        .map(x => 
                            x
                                .split(' ')
                                .map(this._decodePos),
                        )
                ) {
                    // @ts-ignore
                    if (x || x === 0) (i ? scenery : physics).push(coords.length ? { type: i, curve: true, coords: [ [x, y], [x2, y2], ...paginate(coords, 2) ] } : { type: i, x, y, x2, y2 });
                }
                continue;
            }
            for (
                const [ t, x, y, x2degT, y2 ] of section
                    .split(',')
                    .map(x =>
                        x
                            .split(' ')
                            .map((y, i) => (i && i !== 3) ? this._decodePos(y) : y)
                    ) as [ keyof typeof powerupTypes, number, number, number | string | undefined, number | undefined ][]
            ) {
                if (!t) break;
                const o: Element<2> = {
                    type: 2,
                    powerupTypeRaw: t,
                    powerupType: powerupTypes[t],
                    x: x,
                    y: y,
                };
                if (['B', 'G'].includes(t)) o.deg = this._decodePos(<string>x2degT);
                if (t === 'W') {
                    o.x2 = parseInt(<string>x2degT, 32);
                    o.y2 = y2;
                }
                if (t === 'V') {
                    o.vehicleTypeRaw = parseInt(<string>x2degT);
                    o.vehicleType = Vehicles[parseInt(<string>x2degT) - 1];
                    o.duration = y2;
                }
                powerups.push(o);
            }
        }
        return new Parsed(this, code, physics, scenery, powerups);
    }
    public toCode({ physics, scenery, powerups }: { physics: Element<0>[], scenery: Element<1>[], powerups: Element<2>[] }) {
        const mapLine = <T extends Types>(o: Element<T>) =>
            (o.curve
                ? o.coords!.map(([x, y]) => this._encodePos(x) + ' ' + this._encodePos(y))
                : [o.x ?? 0, o.y ?? 0, o.x2 ?? 0, o.y2 ?? 0].map(x => this._encodePos(x))
            ).join(' ');
        return `${
            physics
                .map(mapLine)
                .join(',')
        }#${
            scenery
                .map(mapLine)
                .join(',')
        }#${
            powerups.map(o =>
                `${o.powerupTypeRaw} ${this._encodePos(o.x!)} ${this._encodePos(o.y!)}${(x => x ? ' ' + x : '')((!isNaN(+o.x2!) ? this._encodePos(o.x2!) : !isNaN(+o.deg!) ? this._encodePos(o.deg!) : o.vehicleTypeRaw))}${(x => x ? ' ' + x : '')((!isNaN(+o.y2!) ? this._encodePos(o.y2!) : o.duration))}`
            )
        }`;
    }
    private _encodePos(n: number) {
        return n.toString(32);
    }
    private _decodePos(s: string) {
        return parseInt(s, 32);
    }
}