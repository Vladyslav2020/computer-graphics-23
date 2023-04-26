import {Vector} from "../../primitives/vector";

export class Screen {
    private readonly _width: number;
    private readonly _height: number;
    private readonly _normal: Vector;
    private readonly _screenXInc: Vector;
    private readonly _screenYInc: Vector;
    private readonly _screenTopLeft: Vector

    constructor(width: number, height: number, origin: Vector, normal: Vector) {
        this._width = width;
        this._height = height;
        this._normal = normal;
        if (this._normal.x === 1) {
            this._screenTopLeft = new Vector(origin.x, origin.y - this._width / 2, origin.z + this._height / 2);
            this._screenXInc = new Vector(0, 1, 0);
            this._screenYInc = new Vector(0, 0, -1);
        } else if (this._normal.y === 1) {
            this._screenTopLeft = new Vector(origin.x - this._width / 2, origin.y, origin.z + this._height / 2);
            this._screenXInc = new Vector(1, 0, 0);
            this._screenYInc = new Vector(0, 0, -1);
        } else {
            this._screenTopLeft = new Vector(origin.x - this._width / 2, origin.y + this._height / 2, origin.z);
            this._screenXInc = new Vector(1, 0, 0);
            this._screenYInc = new Vector(0, -1, 0);
        }
    }

    public getPoint(x: number, y: number): Vector {
        return new Vector(
            this._screenTopLeft.x + x * this._screenXInc.x + y * this._screenYInc.x,
            this._screenTopLeft.y + x * this._screenXInc.y + y * this._screenYInc.y,
            this._screenTopLeft.z + x * this._screenXInc.z + y * this._screenYInc.z,
        );
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }
}
