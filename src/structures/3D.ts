const paginate = <T>(a: T[], n: number) => {
    if (a.length <= n) return [a];
    const res = [];
    const maxLen = Math.ceil(a.length / n);
    for (let i = 0; i < maxLen; i++) res[i] = a.slice(i * n, (i + 1) * n);
    return res;
};

export class Vertex {
    constructor(
        public x: number,
        public y: number,
        public z: number,
    ) {}
    public project(n = 200) {
        const r = n / this.y;
        return new Vertex2D(r * this.x, r * this.z);
    }
    public rotate(center: Vertex, theta: number, pi: number) {
        const ct = Math.cos(theta);
        const st = Math.sin(theta);
        const cp = Math.cos(pi);
        const sp = Math.sin(pi);

        const x = this.x - center.x;
        const y = this.y - center.y;
        const z = this.z - center.z;

        this.x = ct * x - st * cp * y + st + sp * z * center.x;
        this.y = st * x + ct * cp * y - ct * sp * z + center.y;
        this.z = sp * y + cp * z + center.z;
        
        return this;
    }
}
export class Vertex2D {
    constructor(
        public x: number,
        public y: number,
    ) {}
}

export default class Shape {
    constructor(
        public center: Vertex,
        public vertices: Vertex[],
        public faces: Vertex[][],
        public fov = 200,
    ) {}
    public rotate(center: Vertex, theta: number, pi: number) {
        this.vertices.forEach(x => x.rotate(center, theta, pi));
        return this;
    }
    public getCoords(dX = 0, dY = 0, n = this.fov) {
        return this.faces.flatMap(face => face.map(f => {
            const p = f.project(n);
            return [p.x + dX, -p.y + dY];
        }));
    }
    public getCode(dX = 0, dY = 0, n = this.fov) {
        return paginate(this
            .getCoords(dX, dY, n).flatMap((x, i, a) => i ? [...a[i - 1], ...x] : []), 4)
            .map(a =>
                a
                    .map(x => x.toString(32))
                    .join(' ')
            )
            .join(',');
    }
}
export class Cube extends Shape {
    constructor(center: Vertex, side: number, fov = 200) {
        const d = side / 2;
        const vertices = [
            new Vertex(center.x - d, center.y - d, center.z + d),
            new Vertex(center.x - d, center.y - d, center.z - d),
            new Vertex(center.x + d, center.y - d, center.z - d),
            new Vertex(center.x + d, center.y - d, center.z + d),
            new Vertex(center.x + d, center.y + d, center.z + d),
            new Vertex(center.x + d, center.y + d, center.z - d),
            new Vertex(center.x - d, center.y + d, center.z - d),
            new Vertex(center.x - d, center.y + d, center.z + d),
        ];
        super(center, vertices, [
            [vertices[0], vertices[1], vertices[2], vertices[3]],
            [vertices[3], vertices[2], vertices[5], vertices[4]],
            [vertices[4], vertices[5], vertices[6], vertices[7]],
            [vertices[7], vertices[0], vertices[3], vertices[4]],
            [vertices[7], vertices[6], vertices[1], vertices[0]],
            [vertices[7], vertices[6], vertices[5], vertices[2]],
        ], fov);
    }
}