import {Vector} from "../primitives/vector";

export class Screen {
    private readonly _width: number;
    private readonly _height: number;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    public getPoint(x: number, y: number): Vector {
        const screenCenter: Vector = new Vector(0, 0, 8);
        const screenTopLeft: Vector = new Vector(screenCenter.x - this._width / 2, screenCenter.y - this._height / 2, screenCenter.z);
        const screenXInc: Vector = new Vector(1, 0, 0);
        const screenYInc: Vector = new Vector(0, 1, 0);
        return new Vector(
            screenTopLeft.x + x * screenXInc.x + y * screenYInc.x,
            screenTopLeft.y + x * screenXInc.y + y * screenYInc.y,
            screenTopLeft.z + x * screenXInc.z + y * screenYInc.z,
        );
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }
}
