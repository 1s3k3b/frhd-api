import { Shape, Cube, Vertex, Parser, Element } from '../src';

class Triangle extends Shape {
    constructor(center: Vertex, side: number, fov = 200) {
        const d = side / 2;
        const vertices = [
            new Vertex(center.x - d, center.y - d, center.z - d),
            new Vertex(center.x + d, center.y - d, center.z - d),
            new Vertex(center.x + d, center.y + d, center.z - d),
            new Vertex(center.x - d, center.y + d, center.z - d),
            new Vertex(center.x - d, center.y + d, center.z + d),
        ];
        super(center, vertices, [
            [vertices[4], vertices[0], vertices[2], vertices[4]],
            [vertices[4], vertices[2], vertices[2], vertices[4]],
            [vertices[4], vertices[2], vertices[3], vertices[4]],
            [vertices[2], vertices[3], vertices[0], vertices[4]],
        ], fov);
    }
}

const animate = (count: number, xDiff: number, ...objects: Shape[]) => {
    const parser = new Parser();
    const physics: Element<0>[] = [];
    const scenery: Element<1>[] = [];
    const powerups: Element<2>[] = [];
    for (let i = 0; i < count; i++) {
        objects.forEach((x, j) => {
            x.rotate(x.center, 10 * Math.PI / 360, 10 * Math.PI / 360);
            physics.push({ type: 0, x: i * xDiff - 40, y: 50, x2: i * xDiff + 40, y2: 50 });
            scenery.push(...parser.parse(`#${x.getCode(i * xDiff + (j - 1) * 500, (j - 1) * 500)}#`).scenery);
            powerups.push({ type: 2, powerupTypeRaw: 'W', x: i * xDiff, y: 0, x2: (i + 1) * xDiff, y2: 0 });
        });
    }
    return parser.toCode({ physics, scenery, powerups });
};

console.log(animate(
    30,
    3000,
    new Cube(new Vertex(0, 11, 0), 10, 100),
    new Cube(new Vertex(0, 11, 0), 10, 200),
    new Triangle(new Vertex(0, 11, 0), 10, 100),
));