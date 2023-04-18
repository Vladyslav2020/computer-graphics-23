import {Ray} from "../primitives/ray";
import {Point} from "../primitives/point";
import {Vector} from "../primitives/vector";

export interface Shape {

    hasIntersection(ray: Ray): boolean;

    getNormal(intersectionPoint: Point): Vector;

    getIntersection(ray: Ray): Point[];
}

export abstract class ShapeBase implements Shape {

    hasIntersection(ray: Ray): boolean {
        return this.getIntersection(ray).length > 0;
    }

    abstract getNormal(intersectionPoint: Point): Vector;

    abstract getIntersection(ray: Ray): Point[];
}
