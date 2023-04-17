import {Vector} from "../primitives/vector.js";
import {Ray} from "../primitives/ray";
import {Screen} from "./screen";

export class Camera {
    private readonly _origin: Vector;
    private readonly _direction: Vector;

    constructor(origin: Vector, direction: Vector) {
        this._origin = origin;
        this._direction = direction.normalize();
    }

    public getRay(screen: Screen, x: number, y: number): Ray {
        const screenPos: Vector = screen.getPoint(x, y);

        const rayDirection: Vector = screenPos.subtract(this._origin);
        const rayDirNormalize: number = rayDirection.length();

        return new Ray(this._origin, new Vector(rayDirection.x / rayDirNormalize, rayDirection.y / rayDirNormalize, rayDirection.z / rayDirNormalize));
    }

    get origin(): Vector {
        return this._origin;
    }

    get direction(): Vector {
        return this._direction;
    }
}