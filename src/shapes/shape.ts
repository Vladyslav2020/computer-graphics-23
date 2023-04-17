import {Ray} from "../primitives/ray";
import {Point} from "../primitives/point";

export interface Shape {
    hasIntersection(ray: Ray): boolean;

    getIntersection(ray: Ray): Point[];
}

export abstract class ShapeBase implements Shape {
    hasIntersection(ray: Ray): boolean {
        return this.getIntersection(ray).length > 0;
    }

    abstract getIntersection(ray: Ray): Point[];
}
