import {Ray} from "../primitives/ray";
import {Point} from "../primitives/point";
import {Vector} from "../primitives/vector";

export interface Shape {

    hasIntersection(ray: Ray): boolean;

    getNormal(intersectionPoint: Point): Vector;

    getIntersection(ray: Ray): Point | null;

    transform(matrix: number[][]): Shape;

    move(dx: number, dy: number, dz: number): Shape;

    scale(sx: number, sy: number, sz: number): Shape;

    rotateX(theta: number): Shape;

    rotateY(theta: number): Shape;

    rotateZ(theta: number): Shape;
}

export abstract class ShapeBase implements Shape {

    hasIntersection(ray: Ray): boolean {
        return !!this.getIntersection(ray)
    }

    abstract getNormal(intersectionPoint: Point): Vector;

    abstract getIntersection(ray: Ray): Point | null;

    abstract transform(matrix: number[][]): Shape;

    abstract move(dx: number, dy: number, dz: number): Shape;

    abstract scale(sx: number, sy: number, sz: number): Shape;

    abstract rotateX(theta: number): Shape;

    abstract rotateY(theta: number): Shape;

    abstract rotateZ(theta: number): Shape;
}
