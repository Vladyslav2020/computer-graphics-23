import {Vector} from "../../primitives/vector";
import {RGBColor} from "../colors";

export class Light {
    private readonly _direction: Vector;
    private readonly _color: RGBColor;

    constructor(direction: Vector, color: RGBColor) {
        this._direction = direction.normalize();
        this._color = color;
    }

    public transform(matrix: number[][]): Light {
        const transformedDirection = this._direction.transform(matrix);
        return new Light(transformedDirection, this._color);
    }

    get direction(): Vector {
        return this._direction;
    }

    get color(): RGBColor {
        return this._color;
    }
}