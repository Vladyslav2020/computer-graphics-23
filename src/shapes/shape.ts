import {Ray} from "../primitives/ray";
import {Point} from "../primitives/point";
import {Vector} from "../primitives/vector";
import {Transformable} from "./transformable";

export interface Shape extends Transformable<Shape> {

    hasIntersection(ray: Ray): boolean;

    getNormal(intersectionPoint: Point): Vector;

    getIntersection(ray: Ray): Point | null;
}

export abstract class ShapeBase implements Shape {

    hasIntersection(ray: Ray): boolean {
        return !!this.getIntersection(ray)
    }

    abstract getNormal(intersectionPoint: Point): Vector;

    abstract getIntersection(ray: Ray): Point | null;

    abstract transform(matrix: number[][]): Shape;
}
