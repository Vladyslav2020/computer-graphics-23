import {Point} from "../primitives/point";
import {ShapeBase} from "./shape";
import {Vector} from "../primitives/vector";
import {Ray} from "../primitives/ray";
import {MathUtils} from "../utils/math-utils";

const ACCURACY = 1e-6;

export class Triangle extends ShapeBase {
    private readonly _vertex1: Vector;
    private readonly _vertex2: Vector;
    private readonly _vertex3: Vector;
    constructor(p1: Vector, p2: Vector, p3: Vector) {
        super();
        this._vertex1 = p1;
        this._vertex2 = p2;
        this._vertex3 = p3;
    }

    getIntersection(ray: Ray): Point | null {
        const edge1 = Vector.of(this._vertex1, this._vertex2);
        const edge2 = Vector.of(this._vertex1, this._vertex3);
        const h = ray.direction.cross(edge2);
        const a = edge1.dot(h);
        if (a > -ACCURACY && a < ACCURACY) {
            return null;
        }
        const f = 1 / a;
        const s = Vector.of(this._vertex1, ray.origin);
        const u = f * s.dot(h);
        if (u < 0 || u > 1) {
            return null;
        }
        const q = s.cross(edge1);
        const v = f * ray.direction.dot(q);
        if (v < 0 || u + v > 1) {
            return null;
        }
        const t = f * edge2.dot(q);
        if (t > ACCURACY) {
            return ray.getPoint(t);
        }
        return null;
    }

    getNormal(intersectionPoint: Point): Vector {
        const edge1 = Vector.of(this._vertex1, this._vertex2);
        const edge2 = Vector.of(this._vertex1, this._vertex3);
        return edge1.cross(edge2).normalize();
    }

    transform(matrix: number[][]): Triangle {
        const rotatedVertex1 = this._vertex1.transform(matrix);
        const rotatedVertex2 = this._vertex2.transform(matrix);
        const rotatedVertex3 = this._vertex3.transform(matrix);
        return new Triangle(rotatedVertex1, rotatedVertex2, rotatedVertex3);
    }

    get vertex1(): Vector {
        return this._vertex1;
    }

    get vertex2(): Vector {
        return this._vertex2;
    }

    get vertex3(): Vector {
        return this._vertex3;
    }
}
