import {ShapeBase} from "./shape";
import {Point} from "../primitives/point";
import {Vector} from "../primitives/vector";
import {Ray} from "../primitives/ray";

const ACCURACY = 1e-6;

export class Disc extends ShapeBase {
    private readonly _center: Vector;
    private readonly _normal: Vector;
    private readonly _radius: number;

    constructor(center: Vector, normal: Vector, radius: number) {
        super();
        this._center = center;
        this._normal = normal.normalize();
        this._radius = radius;
    }

    getIntersection(ray: Ray): Point | null {
        const denominator = Vector.dot(this._normal, ray.direction);
        if (Math.abs(denominator) < ACCURACY) {
            return null;
        }
        const t = Vector.dot(this._normal, Vector.of(ray.origin, this._center)) / denominator;
        if (t < 0) {
            return null;
        }
        const Q = ray.getPoint(t);
        const distance = Point.distance(Point.fromVector(this._center), Q);
        if (distance > this._radius) {
            return null;
        }
        return Q;
    }


    get center(): Vector {
        return this._center;
    }

    public getNormal(intersectionPoint: Point): Vector {
        return this._normal;
    }

    get radius(): number {
        return this._radius;
    }
}