import {Point} from "../primitives/point";
import {Ray} from "../primitives/ray";
import {ShapeBase} from "./shape";
import {Vector} from "../primitives/vector";
import {MathUtils} from "../utils/math-utils";

export class Sphere extends ShapeBase {
    private readonly _center: Vector;
    private readonly _radius: number;

    constructor(center: Vector, radius: number) {
        super();
        this._center = center;
        this._radius = radius;
    }

    getIntersection(ray: Ray): Point | null {
        const centerToOrigin = Vector.of(this._center, ray.origin);
        const a = Vector.dot(ray.direction, ray.direction);
        const b = 2 * Vector.dot(ray.direction, centerToOrigin);
        const c = Vector.dot(centerToOrigin, centerToOrigin) - this._radius ** 2;

        const discriminant = b ** 2 - 4 * a * c;

        if (discriminant < 0) {
            return null;
        }

        const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);

        if (t1 >= 0 && t1 <= t2) {
            return ray.getPoint(t1);
        }

        return ray.getPoint(t2);
    }

    getNormal(intersectionPoint: Point): Vector {
        const centerToIntersection = Vector.of(this._center, Vector.fromPoint(intersectionPoint));
        return centerToIntersection.normalize();
    }

    move(dx: number, dy: number, dz: number): Sphere {
        const newCenter = this._center.add(new Vector(dx, dy, dz));
        return new Sphere(newCenter, this._radius);
    }

    scale(sx: number, sy: number, sz: number): Sphere {
        const newRadius = this._radius * Math.max(sx, sy, sz);
        return new Sphere(this._center, newRadius);
    }

    rotateX(theta: number): Sphere {
        const rotationMatrix = MathUtils.getRotationXMatrix(theta);
        const rotatedCenter = this._center.transform(rotationMatrix);
        return new Sphere(rotatedCenter, this._radius);
    }

    rotateY(theta: number): Sphere {
        const rotationMatrix = MathUtils.getRotationYMatrix(theta);
        const rotatedCenter = this._center.transform(rotationMatrix);
        return new Sphere(rotatedCenter, this._radius);
    }

    rotateZ(theta: number): Sphere {
        const rotationMatrix = MathUtils.getRotationZMatrix(theta);
        const rotatedCenter = this._center.transform(rotationMatrix);
        return new Sphere(rotatedCenter, this._radius);
    }

    get center(): Vector {
        return this._center;
    }

    get radius(): number {
        return this._radius;
    }
}