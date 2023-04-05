import {Point} from "./point";
import {Vector} from "./vector";

export class Ray {
    private readonly _origin: Vector;
    private readonly _direction: Vector;

    constructor(origin: Vector, direction: Vector) {
        this._origin = origin;
        this._direction = direction;
    }

    getPoint(t: number): Point {
        const x = this.origin.x + t * this.direction.x;
        const y = this.origin.y + t * this.direction.y;
        const z = this.origin.z + t * this.direction.z;
        return new Point(x, y, z);
    }

    get origin(): Vector {
        return this._origin;
    }

    get direction(): Vector {
        return this._direction;
    }
}