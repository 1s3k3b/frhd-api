export declare class Vertex {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    project(n?: number): Vertex2D;
    rotate(center: Vertex, theta: number, pi: number): this;
}
export declare class Vertex2D {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export default class Shape {
    center: Vertex;
    vertices: Vertex[];
    faces: Vertex[][];
    fov: number;
    constructor(center: Vertex, vertices: Vertex[], faces: Vertex[][], fov?: number);
    rotate(center: Vertex, theta: number, pi: number): this;
    getCoords(dX?: number, dY?: number, n?: number): number[][];
    getCode(dX?: number, dY?: number, n?: number): string;
}
export declare class Cube extends Shape {
    constructor(center: Vertex, side: number, fov?: number);
}
