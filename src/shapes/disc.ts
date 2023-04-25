import {ShapeBase} from "./shape";
import {Point} from "../primitives/point";
import {Vector} from "../primitives/vector";
import {Ray} from "../primitives/ray";
import {MathUtils} from "../utils/math-utils";

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

    public getNormal(intersectionPoint: Point): Vector {
        return this._normal;
    }

    move(dx: number, dy: number, dz: number): Disc {
        const translationMatrix = MathUtils.getTranslationMatrix(dx, dy, dz);
        const newCenter = this._center.transform(translationMatrix);
        return new Disc(newCenter, this._normal, this._radius);
    }

    scale(sx: number, sy: number, sz: number): Disc {
        const scalingMatrix = MathUtils.getScalingMatrix(sx, sy, sz);
        const newCenter = this._center.transform(scalingMatrix);
        const newNormal = this._normal.transform(scalingMatrix);
        return new Disc(newCenter, newNormal, this._radius);
    }

    rotateX(theta: number): Disc {
        const rotationMatrix = MathUtils.getRotationXMatrix(theta);
        const newCenter = this._center.transform(rotationMatrix);
        const newNormal = this._normal.transform(rotationMatrix);
        return new Disc(newCenter, newNormal, this._radius);
    }

    rotateY(theta: number): Disc {
        const rotationMatrix = MathUtils.getRotationYMatrix(theta);
        const newCenter = this._center.transform(rotationMatrix);
        const newNormal = this._normal.transform(rotationMatrix);
        return new Disc(newCenter, newNormal, this._radius);
    }

    rotateZ(theta: number): Disc {
        const rotationMatrix = MathUtils.getRotationZMatrix(theta);
        const newCenter = this._center.transform(rotationMatrix);
        const newNormal = this._normal.transform(rotationMatrix);
        return new Disc(newCenter, newNormal, this._radius);
    }

    get center(): Vector {
        return this._center;
    }

    get radius(): number {
        return this._radius;
    }
}