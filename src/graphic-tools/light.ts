import {Vector} from "../primitives/vector";
import {RGBColor} from "./pixel";

export class Light {
    private readonly _direction: Vector;
    private readonly _color: RGBColor;

    constructor(direction: Vector, color: RGBColor) {
        this._direction = direction;
        this._color = color;
    }

    get direction(): Vector {
        return this._direction;
    }

    get color(): RGBColor {
        return this._color;
    }
}