import {Point} from "../primitives/point";
import {Vector} from "../primitives/vector";
import {Ray} from "../primitives/ray";
import {ShapeBase} from "./shape";
import {MathUtils} from "../utils/math-utils";

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

    move(dx: number, dy: number, dz: number): Plane {
        const translationMatrix = MathUtils.getTranslationMatrix(dx, dy, dz);
        const newOrigin = this._origin.transform(translationMatrix);
        return new Plane(this._normal, newOrigin);
    }

    scale(sx: number, sy: number, sz: number): Plane {
        const scalingMatrix = MathUtils.getScalingMatrix(sx, sy, sz);
        const newNormal = this._normal.transform(scalingMatrix);
        return new Plane(newNormal, this._origin);
    }

    rotateX(theta: number): Plane {
        const rotationMatrix = MathUtils.getRotationXMatrix(theta);
        const newNormal = this._normal.transform(rotationMatrix);
        return new Plane(newNormal, this._origin);
    }

    rotateY(theta: number): Plane {
        const rotationMatrix = MathUtils.getRotationYMatrix(theta);
        const newNormal = this._normal.transform(rotationMatrix);
        return new Plane(newNormal, this._origin);
    }

    rotateZ(theta: number): Plane {
        const rotationMatrix = MathUtils.getRotationZMatrix(theta);
        const newNormal = this._normal.transform(rotationMatrix);
        return new Plane(newNormal, this._origin);
    }

    get origin(): Vector {
        return this._origin;
    }
}
