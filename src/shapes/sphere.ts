import {Point} from "../primitives/point";
import {Ray} from "../primitives/ray";
import {ShapeBase} from "./shape";
import {Vector} from "../primitives/vector";

export class Sphere extends ShapeBase {
    private readonly _center: Vector;
    private readonly _radius: number;

    constructor(center: Vector, radius: number) {
        super();
        this._center = center;
        this._radius = radius;
    }

    getIntersection(ray: Ray): Point[] {
        const centerToOrigin = Vector.of(this._center, ray.origin);
        const a = Vector.dot(ray.direction, ray.direction);
        const b = 2 * Vector.dot(ray.direction, centerToOrigin);
        const c = Vector.dot(centerToOrigin, centerToOrigin) - this._radius ** 2;

        const discriminant = b ** 2 - 4 * a * c;

        if (discriminant < 0) {
            return [];
        }

        const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);

        const intersectionPoints: Point[] = [];

        if (t1 >= 0) {
            intersectionPoints.push(ray.getPoint(t1));
        }

        if (t2 >= 0) {
            intersectionPoints.push(ray.getPoint(t2));
        }

        return intersectionPoints;
    }

    getNormal(intersectionPoint: Point): Vector {
        const centerToIntersection = Vector.of(this._center, Vector.fromPoint(intersectionPoint));
        return centerToIntersection.normalize();
    }

    get center(): Vector {
        return this._center;
    }

    get radius(): number {
        return this._radius;
    }
}