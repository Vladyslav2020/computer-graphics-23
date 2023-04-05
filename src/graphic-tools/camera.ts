import {Vector} from "../primitives/vector.js";
import {Ray} from "../primitives/ray";
import {Screen} from "./screen";
import {MathUtils} from "../shapes/math-utils";

export class Camera {
    private readonly _origin: Vector;
    private readonly _direction: Vector;

    constructor(origin: Vector, direction: Vector) {
        this._origin = origin;
        this._direction = direction.normalize();
    }

    public getRay(screen: Screen, x: number, y: number): Ray {
        const aspectRatio = screen.width / screen.height;
        const fovY = 90;
        const fovX = fovY * aspectRatio;
        const halfFovX = fovX / 2;
        const halfFovY = fovY / 2;

        const tanX = Math.tan(MathUtils.deg2Rad(halfFovX));
        const tanY = Math.tan(MathUtils.deg2Rad(halfFovY));

        const cameraRight = Vector.cross(this._direction, new Vector(0, 1, 0)).normalize();
        const cameraUp = Vector.cross(cameraRight, this._direction).normalize();

        const screenCenter = this._origin.add(this._direction);
        const screenTopLeft = screenCenter
            .add(cameraUp.scale(tanY))
            .add(cameraRight.scale(-tanX * aspectRatio));

        const screenX = screenTopLeft
            .add(cameraRight.scale((x / screen.width) * fovX * aspectRatio * 2));

        const screenPoint = screenX.add(cameraUp.scale((y / screen.height) * fovY * 2));

        const rayDirection = Vector.subtract(screenPoint, this._origin).normalize();

        return new Ray(this._origin, rayDirection);
    }

    get origin(): Vector {
        return this._origin;
    }

    get direction(): Vector {
        return this._direction;
    }
}