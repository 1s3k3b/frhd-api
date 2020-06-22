enum Types {
    PHYSICS,
    SCENERY,
    POWERUP,
    VEHICLE_POWERUP,
}
enum Vehicles {
    HELI,
    TRUCK,
    BALLOON,
    BLOB,
}
const powerupTypes = {
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
interface Element<T extends Types> {
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
                    if (x) (i ? scenery : physics).push(coords.length ? { type: i, curve: true, coords: [ [x, y], [x2, y2], ...paginate(coords, 2) ] } : { type: i, x, y, x2, y2 });
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
                const o: Element<2> = {
                    type: 2,
                    powerupTypeRaw: t,
                    powerupType: powerupTypes[t],
                    x: x,
                    y: y,
                };
                if (['B', 'G'].includes(t)) o.deg = this._decodePos(<string>x2degT);
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
                : [o.x ?? 0, o.y ?? 0, o.x2 ?? 0, o.y2 ?? 0].map((x, i) => this._encodePos(x))
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
                `${o.powerupTypeRaw} ${this._encodePos(o.x!)} ${this._encodePos(o.y!)}${(x => x ? ' ' + x : '')((o.x2 && this._encodePos(o.x2)) || (o.deg && this._encodePos(o.deg)) || o.vehicleTypeRaw)}${(x => x ? ' ' + x : '')((o.y2 && this._encodePos(o.y2)) || o.duration)}`
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