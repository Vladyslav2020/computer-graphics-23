import {Point} from "../primitives/point";
import {Vector} from "../primitives/vector";
import {Ray} from "../primitives/ray";
import {ShapeBase} from "./shape";

const ACCURACY = 1e-6;

export class Plane extends ShapeBase {
    private readonly _normal: Vector;
    private readonly _origin: Vector;

    constructor(normal: Vector, point: Vector) {
        super();
        this._normal = normal.normalize();
        this._origin = point;
    }

    getIntersection(ray: Ray): Point | null {
        const denominator = Vector.dot(ray.direction, this._normal);

        if (denominator > ACCURACY || denominator < -ACCURACY) {
            const diff = Vector.subtract(this._origin, ray.origin);
            const t = Vector.dot(diff, this._normal) / denominator;
            if (t >= 0) {
                return ray.getPoint(t);
            }
        }

        return null;
    }

    public getNormal(intersectionPoint: Point): Vector {
        return this._normal;
    }

    get origin(): Vector {
        return this._origin;
    }
}
